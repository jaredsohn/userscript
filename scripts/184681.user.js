// ==UserScript==
// @name          OverDrive2BB
// @version       0.93
// @namespace     Nowhere
// @description   Adds textarea with OverDrive libraries in BBCode
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_deleteValue
// @grant         GM_xmlhttpRequest
// @grant         GM_openInTab
// @updateURL     https://userscripts.org/scripts/source/184681.user.js
// @downloadURL   https://userscripts.org/scripts/source/184681.user.js
// @include       http://www.overdrive.com/media/*
// @include       https://www.overdrive.com/media/*
// @include       http://bibliotik.org/requests/create/ebooks*
// @include       https://bibliotik.org/requests/create/ebooks*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// 05/05/12
// ==/UserScript==

//$ = unsafeWindow.jQuery;

if((typeof GM_openInTab) == "undefined") {
    window.GM_openInTab = function(url) { return window.open(url, "_blank"); };
}

function GM_XHR() {
    this.type = null;
    this.url = null;
    this.async = null;
    this.username = null;
    this.password = null;
    this.status = null;
    this.headers = {};
    this.readyState = null;

    this.abort = function() {
        this.readyState = 0;
    };

    this.getAllResponseHeaders = function(name) {
      if (this.readyState!=4) return "";
      return this.responseHeaders;
    };

    this.getResponseHeader = function(name) {
      var regexp = new RegExp('^'+name+': (.*)$','im');
      var match = regexp.exec(this.responseHeaders);
      if (match) { return match[1]; }
      return '';
    };

    this.open = function(type, url, async, username, password) {
        this.type = type ? type : null;
        this.url = url ? url : null;
        this.async = async ? async : null;
        this.username = username ? username : null;
        this.password = password ? password : null;
        this.readyState = 1;
    };
    
    this.setRequestHeader = function(name, value) {
        this.headers[name] = value;
    };

    this.send = function(data) {
        this.data = data;
        var that = this;
        // http://wiki.greasespot.net/GM_xmlhttpRequest
        GM_xmlhttpRequest({
            method: this.type,
            url: this.url,
            headers: this.headers,
            data: this.data,
            onload: function(rsp) {
                // Populate wrapper object with returned data
                // including the Greasemonkey specific "responseHeaders"
                for (var k in rsp) {
                    that[k] = rsp[k];
                }
                // now we call onreadystatechange
                that.onreadystatechange();
            },
            onerror: function(rsp) {
                for (var k in rsp) {
                    that[k] = rsp[k];
                }
            }
        });
    };
};

function sort_by (field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = [-1, 1][+!!reverse];

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 

}

function findUUID(selector, attr, prefix, suffix) {
    var content = $(selector).attr(attr);
    content = content ? content.split(prefix)[1] : content;
    return content ? content.split(suffix)[0] : content; 
}


function assignDefaultSettings() {
    console.log('Assigning default settings');
    GM_setValue('settingsExist', true);
    defaults = {  //Amazon, Google, B&N -- by ISBN
        epub:      [true,   true,   true],
        kindle:    [true,   false,  false],
        pdf:       [false,  true,   false],
        audiobook: [true,   false,  false],
    }
    for (var fmt in defaults) {
        GM_setValue(fmt+'Settings_amazonISBNCheckbox', defaults[fmt][0]);
        GM_setValue(fmt+'Settings_googleISBNCheckbox', defaults[fmt][1]);
        GM_setValue(fmt+'Settings_barnesISBNCheckbox', defaults[fmt][2]);
        GM_setValue(fmt+'Settings_amazonTitleCheckbox', false);
        GM_setValue(fmt+'Settings_barnesTitleCheckbox', false);
    }        
}


function searchOption(fs, legend, checked, href, prepend) {
    // Adding fieldset, checkboxes and labels (links inside labels)
    var
    search    = $(document.createElement('a')),
    checkbox  = $(document.createElement('input')),
    label     = $(document.createElement('label')).css('display','block');

    checkbox.prop('type', 'checkbox').appendTo(label);
    if (checked) checkbox.prop('checked', true);
    search.prop('href', href).text(' '+legend).appendTo(label);
    prepend ? label.prependTo(fs) : label.appendTo(fs);
    return checkbox;
}


$(document).ready(function() {

console.log('OverDriveBB loaded');

var windowHostname = window.location.hostname;
var titleReserveID = findUUID('meta[property="og:image"]','content','{','}') ||
                     findUUID('a[href*="samples.overdrive.com/?crid="]','href','?crid=','&');
var  ISBN          = $('td:contains("ISBN:")').next().text();
var  ASIN          = $('td:contains("ASIN:")').next().text();


function executeOverdrive() {

  console.log('executing at overdrive');
  
  // Assigning default settings if none exist (first run)
  if (typeof GM_getValue('settingsExist') === 'undefined')
  {
      assignDefaultSettings();
  }

  var
  // Added elements
  bbcodeLibraries      = $(document.createElement('textarea')).css(
      { margin: '10px 0 10px 10px', 'border-style': 'none', width: '65%',
        height: '150px', resize: 'both', outline: 'none',
        'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif' }
  ),
  actionDiv            = $(document.createElement('div')).css(
      { width: '30%', padding:0, margin: '10px 10px 10px 10px', color: 'black', float: 'right'}
  ),
  backDrop             = $(document.createElement('div')).css(
      { font: '"Helvetica Neue", Helvetica, Arial, sans-serif', display: 'block',
        height: 'auto', overflow:'hidden', 'margin-bottom': '5px', 'margin-top': '15px',
       'background-color': '#F0F0F0', border: '2px solid grey','clear':'both','margin-left':'0',
      }
  ),

  // Checkbox links
  bibliotikRequest     = $(document.createElement('a')),

    // Fieldset with checkboxes and stuff
  selectSearchFieldset = $(document.createElement('fieldset')).css(
      { padding: 'none', border: 'none', 'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif' }
  ),
  selectSearchLegend   = $(document.createElement('legend')),

  // Selected elements from the OverDrive page

  // identificationNumber
  // Replacing >2 spaces with one space character
  authors              = $('.creator a[href^="/creators/"]').map(function(){return $(this).text();}).toArray().join(', '),

  // Publisher often has trailing spaces
  publisher            = $('a[href^="/publishers/"]').first().text(),
  libraryProviders     = $('a.provider'),
  formatID             = $('input[name="FormatID"]').val(),

  title                = $('h1.title').text(),
  subTitle             = $('h2.subtitle').text(),
  formatString         = $('td:contains("Format")').next().text(), // #todo: does nothing on new OD
  // #todo: Implement encodeURIComponent()
  bookTitle            = title,
  // #todo: bookDescription might include other HTML tags that are not replaced. Maybe extract through DOM objects?
  bookDescription      = $('.description').html(),
  pubDetails           = $('.meta-accordion .label:contains("Publication Details")').next(),
  bbCodeString,
  fullTitle,
  ISBNOrASIN = ISBN || ASIN,
  reserveFormats = [];  

  // Quick fix.

  if (authors)
  {
    authors = authors.replace( /  +/g, ' ' );
  }

  if (publisher)
  {
    publisher = publisher.replace(/(^\s+|\s+$)/g, '');
  }

  if (titleReserveID)
  {
    titleReserveID = titleReserveID.replace(/[{}]/g, '');
  }

  if (bookDescription)
  {
    bookDescription = bookDescription
        .replace(/<\/?p>/gi, '\n')
        //.replace(/<\/?div>/gi, '\n')
        .replace(/<br>/gi, '\n')
        .replace(/<br>/gi, '\n')
        .replace(/<ul>/gi, '\n\n')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<li>/gi, 'â€¢ ')
        .replace(/<\/li>/gi, '\n')
        .replace(/<b>/gi, '[b]')
        .replace(/<\/b>/gi, '[/b]')
        .replace(/<i>/gi, '[i]')
        .replace(/<\/i>/gi, '[/i]').trim();
  }

  if (bookTitle)
  {
    bookTitle = bookTitle.replace(/\s/g,"%20");
  }

  // #todo: why not do this earlier..?
  if (subTitle !== '')
  {
    fullTitle = title + ': ' + subTitle;
  }
  else
  {
    fullTitle = title;
  }
  
  if (ISBN) pubDetails.append('<dt>ISBN:</dt><dd>'+ISBN+'</dd>');
  if (ASIN) pubDetails.append('<dt>ASIN:</dt><dd>'+ASIN+'</dd>');

  function setting(cbId) {
    // PDF = 50
    // EPUB = 410
    // Kindle = 420
    // OverDrive MP3 Audiobook = 425
    // OverDrive WMA Audiobook = 25

    if (formatID == 410) // EPUB
    {
        return GM_getValue('epubSettings_'+cbId+'Checkbox') === true;
    }
    else if (formatID == 420) // Kindle
    {
        return GM_getValue('kindleSettings_'+cbId+'Checkbox') === true;
    }
    else if (formatID == 50) // PDF
    {
        return GM_getValue('pdfSettings_'+cbId+'Checkbox') === true;
    }
  // else if (formatID == 425 || formatID == 25) // MP3 || WMA audiobooks
  // {
  //   return GM_getValue('audiobookSettings_'+cbId+'Checkbox') === true);
  // }
    else return false;
  }

  // Links
  if (ISBNOrASIN) {     
      searchOption(selectSearchFieldset, 'Google Books by ID', true,
        'http://books.google.com/books?vid=ISBN' + ISBNOrASIN, true
      );
      searchOption(selectSearchFieldset, 'Barnes & Noble by ID', true,
        'http://www.barnesandnoble.com/s/?store=ebook&keyword=' + ISBNOrASIN, true
      );
      searchOption(selectSearchFieldset, 'Amazon by ID', true,
        (ASIN) ? ('http://amzn.com/093849743X/' + ASIN) :
        ('http://www.amazon.com/s/ref=sr_nr_i_0?rh=k%3A' + ISBN + '%2Ci%3Adigital-text&field-isbn=' + ISBN),
        true
      );
  }

  searchOption(selectSearchFieldset, 'Amazon by title', (!ISBNOrASIN) || setting('amazonTitle'),
      'http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Ddigital-text&field-keywords=' + bookTitle
  );
  searchOption(selectSearchFieldset, 'Barnes & Noble by title', (!ISBNOrASIN) || setting('barnesTitle'),
      'http://www.barnesandnoble.com/s/?store=ebook&keyword=' + bookTitle
  );

  searchOption(selectSearchFieldset, 'Google Books by Title', (!ISBNOrASIN) || setting('googleTitle'),
      'https://www.google.com/search?tbm=bks&q=intitle:"' + bookTitle+'"'
  );


  bibliotikRequest.prop('href', 'http://bibliotik.org/requests/create/ebooks').text('Bibliotik request page');

  
  backDrop.prop('id', 'backDrop').appendTo('header.pageHeader');
  bbcodeLibraries.addClass('bbCode').appendTo(backDrop);
  actionDiv.prop('id', 'actionDiv').appendTo(backDrop);
  selectSearchFieldset.appendTo(actionDiv);
  selectSearchLegend.text('Shop links to include:').appendTo(selectSearchFieldset);

  backDrop.css('height','50px').hover(function(e){
        backDrop.css({height: (e.type!=='mouseleave') ? 'auto' : '50px'});
  });

  $(document.createElement('button')).css(
      {display:'block',  margin: '0px 0px 10px 10px'
  }).prop({
    accesskey : '1',
    id        : 'makeRequest',
    type      : 'button',
    role      : 'button',
    value     : 'Request'
  }).text('Request')
    .prependTo(actionDiv)
    .click(function()
    {
      GM_setValue('passAuthor', authors);
      GM_setValue('passTitle', fullTitle);
      GM_setValue('passPublisher', publisher);
      GM_setValue('passBBCodeString', bbCodeString);
      GM_openInTab('http://bibliotik.org/requests/create/ebooks');
    });


  // Rewrite textarea when user changes checkboxes
  $('#actionDiv input[type="checkbox"]').change(function()
  {
    writeBBCode();
    console.log('changed checkbox');
  });

  // Magic - #todo: split writing and generation?
  function writeBBCode()
  {
    bbcodeLibraries.empty();

    bbCodeString = '';

    bbCodeString += '[url=' + window.location.href + ']Overdrive Listing[/url]';
    if (ISBNOrASIN) bbCodeString+=' ('+ISBNOrASIN+')';
    bbCodeString += '\n\n[b]Overdrive availability (' + libraryProviders.length + ')[/b]\n';

    for (var j = 0; j < libraryProviders.length; j++)
    {
      bbCodeString += '[url=' + libraryProviders[j].href.replace(/[{}]/g, '') + ']' + libraryProviders[j].text + '[/url]\n';
    }

    if ($('#actionDiv input[type="checkbox"]').is(':checked'))
    {   
      bbCodeString += '\n[b]E-book stores[/b]';
      $('#actionDiv input[type="checkbox"]:checked').each(function(){
              bbCodeString += '\n[url='+ $(this).next().prop('href') +
                              ']'+$(this).next().text().trim()+'[/url]';
      });
    }

    if (bookDescription)
    {
      bbCodeString += '\n\n[quote]' + bookDescription  + '\n[/quote]';
    }  
    bbcodeLibraries.text(bbCodeString);
  }

  writeBBCode();

}

function requestFormat(formatCode, value) {
    $('input[name="FormatsField[]"][value="'+formatCode+'"]')
        .prop("checked", value);
}

// @include http://bibliotik.org/requests/create/ebooks* ensures this only runs where it should
function executeBibliotik()
{
  if (typeof GM_getValue('passAuthor') !== 'undefined')
  {
    $('#AuthorsField').val(GM_getValue('passAuthor'));
    $('#TitleField').val(GM_getValue('passTitle'));
    $('#PublishersField').val(GM_getValue('passPublisher'));
    $('#NotesField').val(GM_getValue('passBBCodeString'));
    $('#TagsField').val('overdrive library');

    requestFormat(16, true); // MOBI
    requestFormat(15, true); // EPUB
    requestFormat(21, true); // AZW3

    $('#RetailField').prop("checked", true);    // Retail only

    // Ensure this only runs once by checking typeof
    GM_deleteValue('passAuthor');
  }
}


function addDocNum(lbl, xml, tag, url) {
    dn = xml.find('td:contains("'+tag+'"):last').next().text().trim();
    if (dn) lbl.next().prepend('<dt>'+tag+'</dt><dd><a href="'+url+'">'+dn+'</a></dd>');
    return dn;
}

function fetchISBNorASIN(lbl, fmtCode) {
      console.log("Looking up ISBN/ASIN for format "+fmtCode);
      var url = 'http://www.contentreserve.com/TitleInfo.asp?ID={'+titleReserveID+'}&Format='+fmtCode; 
      return $.ajax({
        url:url,
        success:function(xml){
            xml = $(xml);
            ISBN = addDocNum(lbl, xml, 'ISBN:', url) || ISBN;
            ASIN = addDocNum(lbl, xml, 'ASIN:', url) || ASIN;
            console.log("ASIN:",ASIN," ISBN:", ISBN);
        },
        dataType:'text',
        xhr: function(){return new GM_XHR();}
      });
}

if (windowHostname === 'www.overdrive.com')
{
    // Fetch library list and ISBN/ASIN before adding request box to page
    var todo = [];
    var formatCodes = {WMA:25, MP3:425, EPUB:410, PDF:50, Kindle:420};
    for (var fmt in formatCodes) {
      var lbl = $('.meta-accordion .label:contains("'+fmt+' ")');
      if (lbl.length)
        todo.push(fetchISBNorASIN(lbl,formatCodes[fmt]));
    };
    todo.push(
      $.post(
          'https://www.overdrive.com/_ajax/libraries-for-media?mediaId=' +
          location.pathname.split('/')[2]+'&q='
      ).done(function(libs){
        var libraryProviders = [];
        libs = libs.aaData;
        var all = {}
        for (var i = 0; i<libs.length; i++) all[libs[i].libraryUrl] = libs[i].consortium;
        for (i in all) libraryProviders.push({
          href: "http://" + i + "/ContentDetails.htm?id=" + titleReserveID,
          text: all[i]
        });
        libraryProviders.sort(sort_by('text', true, function(x){return x.toLowerCase()}));
        var liblist = $('<span class="label">Library Availability ('+libraryProviders.length+')</span>');
        liblist.click(function(){
          $(this).parent().hasClass("on") ?
          $(this).parent().removeClass("on") :
          ($(this).parent().addClass("on"), $(this).parent().siblings().removeClass("on"))
        });
        liblist = $('<li class="on"></li>').append(liblist).appendTo('.meta-accordion');
        liblist = $('<ul></ul>').appendTo(liblist);
        for (var j = 0; j < libraryProviders.length; j++) {
          $('<li class="on"></li>').append(
              $('<a class="provider"></a>').prop('href',libraryProviders[j].href).text(libraryProviders[j].text)
          ).appendTo(liblist);
        }
    }));
    console.log(todo.length);
    $.when.apply($,todo).done(executeOverdrive);
};

if (windowHostname === 'bibliotik.org')
{
  executeBibliotik();
}

});