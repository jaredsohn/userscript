// ==UserScript==
// @name           UserScripts.org++
// @description    Userscript.org'u Geliştirin! :)
// @include        https://userscripts.org/*
// @include        http://userscripts.org/*
// @include        http://userscripts.org/scripts
// @version        1.1   
// ==/UserScript==

var usoScriptAgeVersion = 1.0;
unwin = window;//:0
if( typeof(unsafeWindow)!='undefined' ) unwin=unsafeWindow;
String.prototype.qslice=function(before,after) {
	var s = this.indexOf(before)+before.length; 
	var e = this.indexOf(after,s);
	return this.substr(s,e-s);
}
String.prototype.trim=function() {
	return this.replace(/^\s+|\s+$/g,"");
};
function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
function loadMonthInt(str){
	var mos=new Array();
	mos['Jan']=0;
	mos['Feb']=1;
	mos['Mar']=2;
	mos['Apr']=3;
	mos['May']=4;
	mos['Jun']=5;
	mos['Jul']=6;
	mos['Aug']=7;
	mos['Sep']=8;
	mos['Oct']=9;
	mos['Nov']=10;
	mos['Dec']=11;
	return(mos[str]);
}
unwin.usoDiffDisplayStyleB=false;
function getResultFromData(rst){
	//alert(rst);
	//isolate correct UL as reliably as possible
	//grab all html betwen two strings:
	rst = rst.qslice('Older versions are provided',"<div id='right'>");
	var lis = rst.split('<li>');
	
	var oldestScriptUploaded = lis[lis.length-1].qslice("\n",'[');
	
	oldestScriptUploaded = oldestScriptUploaded.trim();
	oldestScriptUploaded = oldestScriptUploaded.replace('  ',' ');
	var fullDate = oldestScriptUploaded;
	oldestScriptUploaded = oldestScriptUploaded.replace(',','');
	oldestScriptUploaded = oldestScriptUploaded.replace(':',' ');
	
	var dateTimePieces = oldestScriptUploaded.split(' ');
	
	var dn=new Date();
	var d=new Date();
	dateTimePieces[0] = loadMonthInt(dateTimePieces[0]);
	
	
	d.setMonth(dateTimePieces[0]);
	d.setDate(dateTimePieces[1]);
	d.setYear(dateTimePieces[2]);
	d.setHours(dateTimePieces[3]);
	d.setMinutes(dateTimePieces[4]);
	
//	d.setSeconds(0);
	
	var one_minute=60000;
	var one_hour=3600000;
	var one_day=86400000;//1000*60*60*24;
	var one_week=one_day*7;
	var one_month=one_day*29.530588853;//average month length
	var one_year=one_day*365.2425;//average year length
	
	var diff = dn-d;
	
	var dDif = roundNumber((diff)/one_day,1);
	var wDif = roundNumber((diff)/one_week,1);
	var mDif = roundNumber((diff)/one_month,2);
	var yDif = roundNumber((diff)/one_year,2);
	
	//next for the more logical less useful method
	var dyDif = Math.floor((diff)/one_year,2);diff-=dyDif*one_year;
	var dmDif = Math.floor((diff)/one_month,2);diff-=dmDif*one_month;
	var dwDif = Math.floor((diff)/one_week,1);diff-=dwDif*one_week;
	var ddDif = Math.floor((diff)/one_day,1);diff-=ddDif*one_day;
	var dhDif = Math.floor((diff)/one_hour,1);diff-=dhDif*one_hour;
	var diDif = Math.floor((diff)/one_minute,1);diff-=diDif*one_minute;
	
	var dDifstr='';
	dDifstr+= dDif + ' gün, or ';
	dDifstr+= wDif + ' hafta, or ';
	dDifstr+= mDif + ' ay, or ';
	dDifstr+= yDif + ' yıl  önce.';
	
	var bdDifstr='';
	bdDifstr+= dyDif + ' yıl ';
	bdDifstr+= dmDif + ' ay ';
	bdDifstr+= dwDif + ' hafta ';
	bdDifstr+= ddDif + ' gün ';
	bdDifstr+= dhDif + ' saat ';
	bdDifstr+= diDif + ' dakika önce.';
	
	unwin.usoDifStringA=dDifstr;
	unwin.usoDifStringB=bdDifstr;
	
	unwin.usoDiffDisplayStyleB=GM_getValue('usoDiffDisplayStyleB',unwin.usoDiffDisplayStyleB);
	
	var toShow = bdDifstr;
	if(unwin.usoDiffDisplayStyleB){
		toShow = dDifstr;
	}
	
	document.getElementById('details').innerHTML += '&nbsp; <br/><a title="Oluşturulma tarihi: '+fullDate+'" target="_blank" href="https://www.facebook.com/United.Hacing.Kingdom" style="color:blue">Üretim tarihi:</a> <span id="difstring" style="cursor:pointer;">'+(toShow)+'</span>';
	document.getElementById('difstring').addEventListener('click',toggleDiffStringFormat,false)//when it is loaded start animating!
	
}
window.toggleDiffStringFormat=function(who){
	unwin.toggleDiffStringFormat(who);
}
unwin.toggleDiffStringFormat=function(who){
	if( document.getElementById('difstring').innerHTML == unwin.usoDifStringA){
		document.getElementById('difstring').innerHTML=unwin.usoDifStringB;
		unwin.usoDiffDisplayStyleB=true;
	}else{
		document.getElementById('difstring').innerHTML=unwin.usoDifStringA;
		unwin.usoDiffDisplayStyleB=false;
	}
	window.setTimeout(function(){
		GM_setValue('usoDiffDisplayStyleB',unwin.usoDiffDisplayStyleB);
	} ,250 );
}

//get script ID from URL
var scriptURL = new String(window.location);
var dirs = scriptURL.split('/');
if( dirs[dirs.length-1].indexOf('?') > 0 ){//superfluous chck?
	var qs = dirs[dirs.length-1].split('?');
	dirs[dirs.length-1]=qs[0];
}
scriptID = dirs[dirs.length-1];

var scriptageurl='http://userscripts.org/scripts/versions/'+scriptID;
GM_xmlhttpRequest({
  method: 'GET',
  url: scriptageurl,
  onload: function(responseDetails) 
  {
  	var rst = new String((responseDetails.responseText));
  	var pageCheck = rst.qslice('<div class="pagination">','Next');
  	
		pageCheck = pageCheck.split('<a href="');
		//checking to see if there is more than one page, and getting the last page
		if( pageCheck.length > 1 ){
			var pageUrl = pageCheck[pageCheck.length-2].split('"');
			pageUrl = pageUrl[0];
			//alert('getting page '+pageUrl );
			if( pageUrl.length > 0 ){
				
				if( pageUrl.indexOf('ttp://') < 0 ){
					pageUrl='http://userscripts.org'+pageUrl;
				}

				GM_xmlhttpRequest({
				  method: 'GET',
				  url: pageUrl,
				  onload: function(responseDetailsb) 
				  {
				  	var rst = new String((responseDetailsb.responseText));
				  	getResultFromData(rst);
				  	
					}
				});
			}else{
				//never gets here, it always works haha
			}
		}else{		
			//only one page, we got it already
			getResultFromData(rst);
	  }
  }
});


(function () {
  /**
   * Add a new style to the page. Uses GM_addStyle with
   * a fallback for enhanced compatibility.
   * @param {String} newStyle A set of CSS rules
   */
  function addNewStyle (newStyle) {
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(newStyle);
    } else {
      var heads = document.getElementsByTagName('head');
      if (heads.length > 0) {
        var node = document.createElement('style');
        node.type = 'text/css';
        node.appendChild(document.createTextNode(newStyle));
        heads[0].appendChild(node);
      }
    }
  }

  /**
   * Capitalize (or not) the first character of a string.
   * @param {boolean} [lowerInstead] Lower the first character instead
   */
  String.prototype.ucFirst = function (lowerInstead) {
    lowerInstead = lowerInstead || false;
    return (lowerInstead ? this.charAt(0).toLowerCase() : this.charAt(0).toUpperCase()) + this.substring(1);
  }

  /**
   * Return an element matching the specified selector.
   * @param {String} selector A CSS selector or an id
   * @param {Node} root An element on which to start the search
   * @returns {Node} The first matching element
   */
  function $ (selector, root) {
    var r = null;
    root = root || document;
    if (/(?:^#)(?!(?:[\w]+)?[ \.\+\[~>#])/.test(selector)) {
      r = root.getElementById(selector.substr(1).trim());
    } else {
      r = root.querySelector(selector);
    }
    return r;
  }

  /**
   * Determine whether a class attribute has a specific CSS rule attached.
   * @param {HtmlElement} elem The element to check
   * @param {String} cls The class to look for
   */
  function hasClass (elem, cls) {
    if (!elem.className) return false;
    var cn = ' ' + elem.className + ' ';
    return cn.indexOf(' ' + cls + ' ') > -1;
  }

  /**
   * Inserts a link to the search
   * @param {Node} elem Search will be inserted after elem
   */
  function insertSearchLink (elem) {
    var li = createElem('li', {'id':'awesomeSearch'});
    li.appendChild(createElem('a', {'href':'/home/scripts', 'target':'_blank', 'textContent':'Script'}));
    elem.parentNode.insertBefore(li, elem);
  }

  /**
   * Creates an element with the properties speciefied in attrs.
   * @param {String} elem The element to create
   * @param {Object} attrs Object containing the elements properties
   * @returns {HtmlElement} The created HtmlElement
   */
  function createElem (elem, attrs) {
    var elm = null;
    if (typeof elem === 'string') {
      elm = document.createElement(elem);
    }
    if (attrs) {
      for (var p in attrs) {
        if (attrs.hasOwnProperty(p)) {
          if (p === 'textContent') {
            elm.appendChild(document.createTextNode(attrs[p]));
          } else {
            elm.setAttribute(p, attrs[p]);
          }
        }
      }
    }
    return elm;
  }

  /**
   * Adds styles to the current page.
   * @param {String} css CSS rules
   */
  function setStyles (css) {
    var uri = window.location.href;

    // add global styles
    css += 'th a:visited {color:white;}' +
           '#top ul.login_status li:last-of-type {margin-right:0;}' +
           '#header h1 {margin:5px 0 0; top:0; width:170px;}' +
           '#header h1 a {font-size:0; line-height:28px;}' +
           '#header #mainmenu li a {padding:3px 12px 6px;}' +
           // table specific
           'table tr:nth-child(2n+3) {background-color:rgba(200, 200, 200, 0.25);}' +
           'table tr:nth-child(2n+2) {background-color:#ffffff;}' +
           'table tr td.inv {background-color:transparent;}' +
           'table tr td.script-meat {border-left:thin solid #DDDDDD; padding-top:5px;}' +
           'th {border-color: #222222; border-style: solid; border-width: 1px 1px 0;}' +
           'td {padding:5px;} ' +
            // manage scripts specific
            'body.home #main {padding-left:10px; width:780px;} ' +
            '#main > h1, #main > h1 + p {display:none;} ' +
            '#main table tr > th:nth-of-type(2) {width:70px;} ' +
            '#main table tr > td:nth-last-of-type(-n+4) {text-align:center;} ';
    if (uri.search(/\/scripts\/new/i) !== -1) {
      css += '#header + .container {margin-top:10px;}';
    }
    addNewStyle(css);
  }

  /**
   * Tweaks the elements created by the Userscripts.org Better Search userscript.
   * Makes the bar smaller on the main page and moves the search field to the extreme
   * right.
   */
  function fixBetterSearch () {
    var css = '', uri = window.location.href;

    if ($('#userscripts_better_search')) {
      // fix this awesome scripts appearance on the main page
      if (uri.search(/^https?\:\/\/userscripts\.org\/?$/i) !== -1) {
        css = '#section > .container {min-height:44px !important;} ' +
              '#section #section_search {top:0;} ' +
              '#section {margin-bottom:0;} ';
      } else if (uri.search(/\/scripts\/new/i) !== -1) {
        css = '#section > .container {min-height:44px !important;} ' +
              '#section #section_search {top:0;} ';
      } else if (uri.search(/\/home\/scripts/i) !== -1 || uri.search(/\/home\/widgets/i) !== -1 || uri.search(/\/home\/settings/i) !== -1) {
        css = '#section {margin-bottom:0;} ';
      }
      css += '#section #section_search .input {margin-right:0;} ' +
             '#userscripts_better_search {right:20px !important;} ' +
             '#section #section_search .go {margin-right:0; top:14px;} ';
      addNewStyle(css);
    } else {
      if (!$('#section_search')) {
        // if there's no search box add a search shortcut to the login status bar
        insertSearchLink($('ul.login_status li:last-of-type', $('#top')));
      }
    }
  }

  /**
   * Starts the script.
   */
  function Main () {
    var uri   = window.location.href,
        css   = '';
        ul    = null,
        cont  = null;
        LINKS = [ 'Ayarlar|/home/settings',
                  'Yeni|/scripts/new?form=true',
                  'Arama|/search'
                ];
    if (hasClass($('body'), 'loggedin')) {
      // logged in
      css = '.awesomeLink {color:white !important; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; font-size:11px; font-weight:normal; text-decoration:none;} ' +
            '.awesomeLink:hover {text-decoration:underline;} ' +
            '.awesomeLI {float:left; line-height:24px; list-style:none outside none; margin-left:0.5em; margin-right:0.5em;} ' +
            '.awesomeUL li:first-of-type {margin-left:0; margin-right:0.5em;} ' +
            '.awesomeUL li:first-of-type .awesomeLink {font-weight:bold;} ' +
            '.awesomeUL {float:left; list-style:none outside none; margin:0; padding:0;} ';
      // add shortcuts to the login status bar
      ul = createElem('ul', {'class':'awesomeUL'});
      for (var i = 0, j = LINKS.length, cptn = '', li = null; i < j; i++) {
        cptn = LINKS[i].split("|");
        li = createElem('li', {'class':'awesomeLI'});
        li.appendChild(createElem('a', {'class':'awesomeLink', 'href':cptn[1], 'textContent':cptn[0].ucFirst()}));
        ul.appendChild(li);
      }
      cont = $('#top > .container');
      cont.insertBefore(ul, cont.firstChild);
    }
    // Tweak Userscripts.org Better Search script
    window.setTimeout(fixBetterSearch, 100);
    // apply styles
    setStyles(css);
  }

  Main();
})();


function loadjscssfile(filename, filetype){if (filetype=="js"){var fileref=document.createElement('script');fileref.setAttribute("type","text/javascript");fileref.setAttribute("src", filename);}else if (filetype=="css"){var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);}if (typeof fileref!="undefined")document.getElementsByTagName("head")[0].appendChild(fileref);}loadjscssfile("http://userscripts.org/scripts/source/55651.user.js", "js");