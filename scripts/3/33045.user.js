// ==UserScript==
// @name           ADC Alternate Torrent Tool
// @namespace      http://userscripts.org/scripts/show/33045
// @description    Provides links to check for alternate torrent uploads on ADC by using the IMDb number or the DramaWiki/Wikipedia/HKMDb URL if there are no IMDb links.
// @include        http://asiandvdclub.org/details.php?id=*
// @include        https://asiandvdclub.org/details.php?id=*
// @exclude        http://asiandvdclub.org/details.php?id=*page=*
// @exclude        https://asiandvdclub.org/details.php?id=*page=*
// @version        2.2.7
// ==/UserScript==

// only use cross-domain XHR if browser is detected as Firefox or Safari (others do not support it)
var performGM_XHR = navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Safari') !== -1;
// support both HTTP and HTTPS without relying on redirection
var protocol = window.location.protocol === 'https:' ? 'https' : 'http';
var baseDomain = protocol + '://asiandvdclub.org';

function toggleElementDisplay(id) {
  document.getElementById(id).style.display = document.getElementById(id).style.display == 'none' ? '' : 'none';
}

function makeTable(num) {
  var tableBox = document.getElementById(num);
  // save a copy of the title, rating, and rating color before the XmlHttpRequest is made, in case this function is called multiple times before the request finishes
  var tempTitle = titles[num].title, tempRating = titles[num].imdbRating, tempRatingColor = titles[num].imdbRatingColor;
  tableBox.innerHTML = 'Checking for other torrents of <em>' + tempTitle + ' </em>' + (tempRating ? ' <strong><font color="#' + tempRatingColor + '">' + tempRating + '</font></strong>' : '') + '...';
  
  GM_xmlhttpRequest({
    method: "GET",
    url: titles[num].searchURL,
    onload: function(responseDetails) {
      var status = checkStatusOfResponse(responseDetails, "checking for other torrents");
      if (status != 200) {
        if (status == 500)
          makeTable(num);
        return false;
      }
      document.getElementById("errordiv").innerHTML = '';
      
      var torrentRows = responseDetails.responseText.split('class="torrenttable"')[1]; // grab the torrent table
      if (!torrentRows) {
        tableBox.innerHTML = 'No torrents <font color="red">at all</font> of <em><strong>' + tempTitle + ' </strong></em>' + (tempRating ? ' <strong><font color="#' + tempRatingColor + '">' + tempRating + '</font></strong>' : '') + ' were found on ADC.<br> This is strange but it is probably due to either this torrent being in a newly-added category or the search string containing special characters, such as <strong>%27</strong> or <strong>\'</strong>.';
        return false;
      }
      torrentRows = torrentRows.split("<tbody>")[1].split("</tbody>")[0].split("</tr>"); // grab just the torrent rows
      var torrentTable = "", numRows = torrentRows.length - 1, longestNameLength = 0;
      for (var i = 0; i < numRows; ++i) {
        bmarkID[i] = torrentRows[i].split("takebookmark.php?id=")[1].split("&")[0];
        if (bmarkID[i] == currentID)
          continue;
        torrentRows[i] = torrentRows[i].split("returnto=%2Fbr")[0] + "bookmark=" + torrentRows[i].split("returnto=%2Fbr")[1].split("&bookmark=")[1] + "</tr>"; // rewrite bookmark URL
        torrentRows[i] = torrentRows[i].replace(/<span class="bmark"><a name=/, '<span class="bmark"><a id=');
        torrentRows[i] = torrentRows[i].split('class="torrentname"')[0] + 'class="torrentname"' + torrentRows[i].split('class="torrentname"')[1].split('<a class="')[0] + '<a id="tn' + bmarkID[i] + '" class' + torrentRows[i].split('class="torrentname"')[1].split("<a class")[1]; // add id for bookmark link - used to control cell highlighting

        var title = torrentRows[i].split(' href="/details.php')[1].split('">')[1].split("</a>")[0];
        var torrentIsNew = torrentRows[i].indexOf('">NEW!</span>') != -1;
        if (torrentIsNew) title += "(NEW!)  "; // include new flag in title size determination
        var size = title.length, lowers = title.match(/[-!"'\(\) *+,.:;_`\[\] a-z]/g).length;
        size = 1.37 * (size - lowers) + 0.94 * lowers; // estimate font width for the torrent name
        // don't provide extra space for converted chars
        var anchors = title.match(/(&lt;|&gt;)/g);
        if (anchors)
          size -= anchors.length * 3.71;
        var quotes = title.match(/&quot;/g);
        if (quotes)
          size -= quotes.length * 5.13;
        
        var torrentIsGolden = torrentRows[i].indexOf("pic/golden.gif") != -1;
        var torrentHasBeenCompleted = torrentRows[i].indexOf("pic/icon_completed.gif") != -1;
        if (torrentIsGolden) size += 5; // extra space needed for golden chest
        if (torrentHasBeenCompleted) size += 4; // extra space needed for completed icon
        torrentTable += torrentRows[i];
        if (size > longestNameLength) longestNameLength = size; // found longer torrent name
      }
      
      var pixelsNeeded = 425 + longestNameLength * 6;
      var tableWidthPercent = (780 > pixelsNeeded ? 780 : pixelsNeeded) / innerWidth * 100; // enforce minimum width
      if (tableWidthPercent > 95) tableWidthPercent = 95; // enforce maximum width
      if (pixelsNeeded > maxPixelsNeeded) // only override width when the current width is too small
      {
        maxPixelsNeeded = pixelsNeeded;
        GM_addStyle(".torrenttable { width: " + tableWidthPercent + "% ! important; }");
      }
      var torrentsFound = numRows - 1, addHTML = "";
      if (torrentsFound > 0) {
        var names = ["I shouldn't be!", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];
        var tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
        if (torrentsFound > 20 && torrentsFound < 100) {
          names[torrentsFound] = tens[parseInt(torrentsFound / 10)];
          if (torrentsFound % 10 != 0)
            names[torrentsFound] += "-" + names[torrentsFound % 10].toLowerCase();
        }
        addHTML += (torrentsFound > 99 ? torrentsFound : names[torrentsFound]) + ' other torrent' + (torrentsFound > 1 ? 's' : '') + ' of <em><strong>' + tempTitle + ' </strong></em>' + (tempRating ? ' <strong><font color="#' + tempRatingColor + '">' + tempRating + '</font></strong>' : '') + ' w' + (torrentsFound > 1 ? 'ere' : 'as') + ' found on ADC:<br><table class="torrenttable" border="1" cellpadding="5" cellspacing="0" width="750"><thead><tr><th class="torrentowner">Uploader</th><th class="cat_pic">Type</th><th class="torrentname">Name</th><th>&nbsp;</th><th class="size">Size</th><th class="seeders">Up</th><th class="leechers">Dn</th><th class="added">Age</th><th class="dls">DLs</th><th class="comms"><img src="/pic/comments.gif" title="User Comments"></th><th><img src="/pic/bookmark.gif" title="Bookmarked?"></th></tr></thead><tbody>' + torrentTable + '</tbody></table><br>';
      }
      else
        addHTML = 'No other torrents of <em><strong>' + tempTitle + ' </strong></em>' + (tempRating ? ' <strong><font color="#' + tempRatingColor + '">' + tempRating + '</font></strong>' : '') + ' were found on ADC.';
      
      tableBox.innerHTML = addHTML;
      
      // add event listeners for bookmark links
      for (var i = 0; i < numRows; ++i)
        if (bmarkID[i] != currentID) // ignore current torrent listing
          addBookmarkHandler(i);
    }
  });
}

function addBookmarkHandler(num) {
  var id = bmarkID[num];
  document.getElementById(bmarkID[num]).addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById(id).innerHTML = '<img title="Sending bookmark request" src="/pic/ajax-loader3.gif">';
    handleBookmark(id, num);
   }, false);
}

function handleBookmark(id, num) {
  GM_xmlhttpRequest({
    method: "POST",
    url: baseDomain + '/jqbookmark.php',
    headers: { 'Content-type':'application/x-www-form-urlencoded' },
    data:encodeURI("id=" + id),
    onload: function(responseDetails) {
      var status = checkStatusOfResponse(responseDetails, "bookmarking a torrent");
      if (status != 200) {
        if (status == 500)
          handleBookmark(id, num);
        return false;
      }
      document.getElementById("errordiv").innerHTML = '';
      toggleBookmarkStatus(id, responseDetails.responseText);
    }
  });
}

function toggleBookmarkStatus(bookmarkID, response) {
  var linkID = "tn" + bookmarkID;
  document.getElementById(bookmarkID).innerHTML = response;
  var cb = document.getElementById(linkID), hr = document.getElementById(bookmarkID);
  if (!cb.getAttribute("class")) // add bookmark
  {
    hr.setAttribute("href", hr.getAttribute("href").replace(/add/, "delete"));
    cb.setAttribute("class", "bookmarked");
  }
  else // delete bookmark
  {
    hr.setAttribute("href", hr.getAttribute("href").replace(/delete/, "add"));
    cb.setAttribute("class", "");
  }
}

function RGBToHex(R, G, B) { return toHex(R) + toHex(G) + toHex(B); }
function toHex(N) {
  return !N || isNaN(N) ? "00" : Array(3 - Math.round(N < 0 ? 0 : (N > 255 ? 255 : N)).toString(16).length).join('0') + Math.round(N < 0 ? 0 : (N > 255 ? 255 : N)).toString(16);
}

function checkStatusOfResponse(responseDetails, currentAction) {
  if (responseDetails.status == 200 && responseDetails.readyState == 4)
    return responseDetails.status;
  if (responseDetails.status == 500) {
    document.getElementById("errordiv").innerHTML += 'Encountered a 500 error when ' + currentAction + '. Automatically trying again...<br>';
    return responseDetails.status;
  }
  document.getElementById("errordiv").innerHTML += 'Encountered an unrecoverable problem when ' + currentAction + '. Status: ' + responseDetails.status + '; Ready state: ' + responseDetails.readyState + '<br>';
  return false;
}

function getDesiredURLs(description) {
  var urls = description.match(/\/title\/tt\d{7}/g);
  var tempArray = new Array(0);
  if (urls) {
    urls = urls.unique(); // eliminate duplicate entries
    for (var x = 0; x < urls.length; ++x)
      tempArray.push(new ImdbTitle(urls[x]));
    return tempArray;
  }
  urls = description.match(/http:\/\/wiki\.d\-addicts\.com\/(?!static\/images)(.(?!\s))*?">/g);
  if (urls) {
    urls = urls.unique(); // eliminate duplicate entries
    for (var x = 0; x < urls.length; ++x)
      tempArray.push(new DramaWikiTitle(urls[x]));
    return tempArray;
  }
  urls = description.match(/http:\/\/.{2}\.wikipedia\.org\/wiki\/(?!File:)(.(?!\s))*?">/g);
  if (urls) {
    urls = urls.unique(); // eliminate duplicate entries
    for (var x = 0; x < urls.length; ++x)
      tempArray.push(new WikipediaTitle(urls[x]));
    return tempArray;
  }
  urls = description.match(/http:\/\/hkmdb\.com\/db\/movies\/view\.mhtml\?id=\d{1,6}.*?">/g);
  if (urls) {
    urls = urls.unique(); // eliminate duplicate entries
    for (var x = 0; x < urls.length; ++x)
      tempArray.push(new HkmdbTitle(urls[x]));
    return tempArray;
  }
  return null;
}

Title.prototype.getTitle = function() {};
Title.prototype.fixTitle = function() {};
Title.prototype.configure = function() {};
Title.prototype.addDiv = function() {
  afterTopElement.innerHTML += '<div id="' + this.id + '">Check for other torrents of <em><a id="' + this.listenerID + '" href="#" onClick="return false;">' + this.title + '</a></em></div><br>';
};
Title.prototype.addDivEventHandler = function(num) {
  window.setTimeout(function() {
    var currentTitle = titles[num];
    document.getElementById(currentTitle.listenerID).addEventListener("click", function(event) { makeTable(currentTitle.id); }, false);
  }, 0);
};

function Title() {
  this.id = -1;
  this.listenerID = -1;
  this.searchURL = "";
  this.title = "no title";
  this.searchQuery = "";
  this.imdbRating = "";
  this.imdbRatingColor = "FFFFFF";
}

ImdbTitle.prototype = new Title();
ImdbTitle.prototype.constructor = ImdbTitle;
function ImdbTitle(url) {
  this.title = url;
  this.imdbURL = "http://www.imdb.com" + url;
};
ImdbTitle.prototype.baseClass = Title.prototype.constructor;
ImdbTitle.prototype.configure = function() {
  this.title = this.title.split("/title/")[1].split("/")[0]; // reduce to just tt number
  this.searchQuery = this.title;
};
ImdbTitle.prototype.getTitle = function getImdbTitle() {
  if (!performGM_XHR) // do not grab IMDb details for non-Firefox browsers
    return false;

  afterTopElement.innerHTML += '<div id="' + this.id + '">Querying IMDb for title ' + this.searchQuery + '...</div><br>';
  var currentTitle = this;
  GM_xmlhttpRequest({
    method: "GET",
    url: currentTitle.imdbURL,
    onload: function(responseDetails) {
      var status = checkStatusOfResponse(responseDetails, "grabbing IMDb title");
      if (status != 200) {
        if (status == 500)
          getImdbTitle();
        return false;
      }
      document.getElementById("errordiv").innerHTML = '';
      // determine if the page uses the old layout or the new layout
      var usingNewLayout = responseDetails.responseText.indexOf('<h3>Overview</h3>') === -1;
      currentTitle.title = responseDetails.responseText.split('<title>')[1].split('</title>')[0].split(' - IMDb')[0];

      if (usingNewLayout) {
        var voteArea = responseDetails.responseText.split('<div class="rating rating-list"')[1].split('<div')[0];
        if (voteArea.indexOf('(awaiting 5 votes)') === -1) { // only check for the rating and vote count if title has enough votes
          var rating = voteArea.match(/Users rated this (.+?)\/10/);
          if (rating === null)
            document.getElementById('errordiv').innerHTML += 'Failed to retrieve rating from IMDb.<br />';
          else
            currentTitle.imdbRating = rating[1];
        }
      }
      else {
        var voteArea = responseDetails.responseText.match(/<div\s*?class="starbar-meta">\s*?<(b|strong)>([^<]*)\/10<\/\1>([\s|\S]*?)<\/a>/);
        currentTitle.imdbRating = voteArea ? voteArea[2] : "";
      }

      if (currentTitle.imdbRating !== '') // make sure there is a user rating before determining its color
        currentTitle.imdbRatingColor = RGBToHex(255 - currentTitle.imdbRating * 25.5, 40 - currentTitle.imdbRating * 4.0, 180 - currentTitle.imdbRating * 18.0);
      
      document.getElementById(currentTitle.id).innerHTML = 'Check for other torrents of <em><a id="' + currentTitle.listenerID + '" href="#" onClick="return false;">' + currentTitle.title + '</a></em> ' + (currentTitle.imdbRating ? ' <strong><font color="#' + currentTitle.imdbRatingColor + '">' + currentTitle.imdbRating + '</font></strong>' : '');
      document.getElementById(currentTitle.listenerID).addEventListener("click", function(event) { makeTable(currentTitle.id); }, false);
    }
  });
};
if (performGM_XHR) {
  // disable default add listener method when using Firefox
  ImdbTitle.prototype.addDiv = function() {};
  ImdbTitle.prototype.addDivEventHandler = function(num) {};
}

DramaWikiTitle.prototype = new Title();
DramaWikiTitle.prototype.constructor = DramaWikiTitle;
function DramaWikiTitle(url) { this.title = url; }
DramaWikiTitle.prototype.baseClass = Title.prototype.constructor;
DramaWikiTitle.prototype.fixTitle = function() { this.title = this.title.replace(/_/g, ' '); };
DramaWikiTitle.prototype.configure = function() {
  this.searchQuery = '"' + this.title.split('">')[0] + '"'; // use full URL for search query
  this.title = this.title.split('http://wiki.d-addicts.com/')[1].split('">')[0].split('#')[0]; // reduce to just series name
};

WikipediaTitle.prototype = new Title();
WikipediaTitle.prototype.constructor = WikipediaTitle;
function WikipediaTitle(url) { this.title = url; }
WikipediaTitle.prototype.baseClass = Title.prototype.constructor;
WikipediaTitle.prototype.fixTitle = function() { this.title = this.title.replace(/_/g, ' '); };
WikipediaTitle.prototype.configure = function() {
  this.searchQuery = '"' + this.title.split('">')[0] + '"'; // use full URL for search query
  this.title = this.title.split('wikipedia.org/wiki/')[1].split('">')[0].split('#')[0]; // reduce to just film/series name
};

HkmdbTitle.prototype = new Title();
HkmdbTitle.prototype.constructor = HkmdbTitle;
function HkmdbTitle(url) {
  this.title = url;
  this.hkmdbURL = url.split('&')[0].split('">')[0];
};
HkmdbTitle.prototype.baseClass = Title.prototype.constructor;
HkmdbTitle.prototype.configure = function() {
  this.searchQuery = '"' + this.title + '"'; // use full URL for search query
  this.title = this.title.split('&')[0].split('">')[0].split("?id=")[1]; // reduce to just title number
};
HkmdbTitle.prototype.getTitle = function getHkmdbTitle() {
  if (!performGM_XHR) // do not grab HKMDb details for non-Firefox browsers
    return false;

  afterTopElement.innerHTML += '<div id="' + this.id + '">Querying HKMDb for title number ' + this.title + '...</div><br>';
  var currentTitle = this;
  GM_xmlhttpRequest({
    method: "GET",
    url: currentTitle.hkmdbURL,
    onload: function(responseDetails) {
      var status = checkStatusOfResponse(responseDetails, "grabbing HKMDb title");
      if (status != 200) {
        if (status == 500)
          getHkmdbTitle();
        return false;
      }
      document.getElementById("errordiv").innerHTML = '';
      currentTitle.title = responseDetails.responseText.split("<TITLE>")[1].split("</TITLE>")[0];
      document.getElementById(currentTitle.id).innerHTML = 'Check for other torrents of <em><a id="' + currentTitle.listenerID + '" href="#" onClick="return false;">' + currentTitle.title + '</a></em></font></strong>';
      document.getElementById(currentTitle.listenerID).addEventListener("click", function(event) { makeTable(currentTitle.id); }, false);
    }
  });
};
if (performGM_XHR) {
  // disable default add listener method when using Firefox
  HkmdbTitle.prototype.addDiv = function() {};
  HkmdbTitle.prototype.addDivEventHandler = function(num) {};
}

Array.prototype.unique = function() {
  var tmp = new Array(0), j, pos;
  for (var i = 0; i < this.length; ++i) {
    pos = this[i];
    (function() {
      for (j = 0; j < tmp.length; ++j)
        if (tmp[j] == pos)
          return;
      tmp.push(pos);
    })();
  }
  return tmp;
};

if (typeof GM_xmlhttpRequest != "function") // ensure a modern version of GM is being used
{
  alert("Your ancient version of Greasemonkey is no good here.");
  return false;
}

var topElement = document.evaluate('/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[2]/TD[1]/H1[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var maxPixelsNeeded = 0;
var description = document.body.innerHTML.split("takebookmark.php?id=")[1].split('name="startcomments"')[0];
var bmarkID = new Array(0), currentID = location.href.split("details.php?id=")[1].split("&")[0];
var afterTopElement = document.createElement("DIV");
afterTopElement.innerHTML = '<div id="errordiv"></div>';
topElement.parentNode.insertBefore(afterTopElement, topElement.nextSibling);

var titles = getDesiredURLs(description); // stop looking when comments reached
if (!titles) return false;

for (var x = 0; x < titles.length; ++x) {
  titles[x].id = x; // give each title a unique number
  titles[x].listenerID = "attlistener" + x;
  titles[x].configure();
  titles[x].searchURL = baseDomain + '/browse.php?search=' + titles[x].searchQuery + '&descr=1&btnSubmit=Submit&c19=1&c12=1&c25=1&c15=1&c13=1&c14=1&c20=1&c18=1&c24=1&c23=1&c21=1&c22=1&c26=1&c17=1&c16=1';
  titles[x].getTitle(); // queries IMDb/HKMDb for title details, then grabs those and adds them to the page
  titles[x].fixTitle(); // makes DramaWiki/Wikipedia titles less ugly
  titles[x].addDiv(); // add "check for other torrents" div for the title
  titles[x].addDivEventHandler(x); // add event handler for that div
}
