// ==UserScript==
// @name           Googled Scroogle
// @author         Carlton Kenney
// @namespace      http://www.rose-hulman.edu/~kenneycp
// @description    Similar to Google's old look, Bookmarkable SSL Searches, Increased Security, Cache links, and Clickable Links to Bing Images, YouTube, and Google Maps
// @copyright      2011 by Carlton Kenney
// @version        2.01
// @lastupdated    4/26/2011
// @include        https://*scroogle.org/cgi-bin/nbbw*
// @include        http://*scroogle.org/cgi-bin/*
// @include        https://ssl.scroogle.org/*
// ==/UserScript==

/*
Note: This script is highly based on the following:
http://userscripts.org/scripts/show/23529
http://userscripts.org/scripts/show/34293 - Used for getting it to work with Chrome

I originally created the following userscript to use for Firefox, but I got a request to get it to work for Chrome. Here's what I came up with.

Feel free to distribute this or modify it as you would like under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 or later of the License.

*/
if(window.location.href == "http://www.scroogle.org/cgi-bin/scraper.htm"){
	// Remove the random images
	var images = document.getElementsByTagName('img');
	images[0].parentNode.removeChild(images[0]);
	
	// Remove unneeded text and links
	var pText = document.getElementsByTagName('p'); 
	for( var i = 0; i < pText.length; i++ ) {
		pText[i].parentNode.removeChild(pText[i]);
	}
}

// Remove the "Enter your Google search terms:" line
var titleText = document.getElementsByTagName('h3'); 
for( var i = 0; i < titleText.length; i++ ) {
    titleText[i].parentNode.removeChild(titleText[i]);
}

//Check if there is a query
var query = document.getElementsByName("Gw")[0].value;
var forms = document.getElementsByTagName("form");

// Create the scroogle image
var img = document.createElement("img");
img.src = "data:image/png;base64,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%3D%3D";
img.alt = "S C R O O G L E";

// Create a link for the image
var title = document.createElement("a");
title.href = "https://ssl.scroogle.org/";
title.id = "logo";
title.appendChild(img);

// Turn on spellcheck
for (var i = 0; i < forms.length; i++) {
    for (var gw = document.getElementsByName("Gw"), j = 0; j < gw.length; j++) {
      if (j==0) { query = gw[0].value; }
      gw[j].setAttribute("spellcheck", "true");
    }
}

// Make global style changes
GM_addStyle("#toplinks { font-size:0.8em; border: medium solid #C9D7F1; border-width: 0 0 1px; padding-bottom:0.3em; margin-top:-0.4em; text-align:left; }"
 +".gb1 { margin-right:0.8em; }"
 +".gb2 { margin-right:0.8em; font-weight:bold; }" 
 + 'input[type="text"] { width:35em; }'
 + "body { font-family:sans-serif; }" 
 + "body.index { text-align:center; background:white; }");

// A query takes priority loading styles and changes over home page(s)
if (query) {

// Make CSS changes first to load faster
GM_addStyle( ("\n  " // better spacing, fonts, colors, placement for new items
 + '.result b[style="background-color: rgb(255, 255, 102);"] ' // 1. #ffff66
 +    "{ border-color:#ed5; background-color:#fffbed!important; }"
 + '.result b[style="background-color: rgb(160, 255, 255);"] ' // 2. #a0ffff
 +    "{ border-color:#8ee; background-color:#e8f8ff!important; }"
 + '.result b[style="background-color: rgb(153, 255, 153);"] ' // 3. #99ff99
 +    "{ border-color:#8e8; background-color:#efe!important; }"
 + '.result b[style="background-color: rgb(255, 153, 153);"] ' // 4. #ff9999
 +    "{ border-color:#e88; background-color:#fee!important; }"
 + '.result b[style] { border-style:solid; border-width:1px 0; }'
 + "body { font-family:sans-serif; }"
 + "ul, blockquote { margin:0; padding:0; text-align:left; }"
 + 'P[align="right"] b { font-size:1em; display:block; float:left; }'
 + "#top { margin:4em 0 0 0; text-align:center; }"
 + "center { text-align:left; }"
 + "body.index center { text-align:center; }"
 + ".secondSearch, .searchTitle { "
 + "     display:block; color:#000; background:#ebeff9; border:solid #6b90da; }"
 + ".searchTitle { "
 + "     border-width:1px 0 0 0; line-height:2em; margin-bottom:-2em;"
 + "     font-size:0.8em; padding:0 0.5em; font-weight:bold; }"
 + ".searchTitle div { font-weight:300; }"
 + ".secondSearch { border-width:1px 0; padding:1.5em 0; text-align:center; }"
 + ".right { float:right; }"
 + ".noHits { display:block; margin:3em 0 -2em 0; font-size:1.25em; }"
 + "img { border:none; }"
 + "#logo img { height:3em!important; }"
 + "#top #logo img { height:6em!important; }"
 + "form { display:inline; }"
 + "span.ftype { font-weight:bold; font-size:x-small; color:blue; }"
 + "#title, #title *, center, center * { vertical-align:middle; }"
 + "ul { margin-top:0.25em; margin-bottom:0.75em; }"
 + "div.hit2 { margin-left:2em; }"
 + ".cache { font-size:0.75em; /* padding-left:4em; */ }"
 + ".cache a { color:#77c; }"
 + ".trans > a { text-decoration:underline; cursor:pointer; }"
 + "span.trans div { visibility:hidden; position:absolute;"
 + "     padding:0.1em 1em; margin:1.2em 0 0 -0.5em; border:solid 1px #88d;"
 + "     background-color:#eef; opacity:0.95; -moz-border-radius:4px; }"
 + "span.trans:hover div { display:inline; visibility:visible; }"
 + "span.trans:hover div a { display:block; text-decoration:none; }"
 + "span.trans:hover div a:hover { display:block; text-decoration:underline; }"
 + "h3 { font-size:0.5em; text-align:center; visibility:hidden }"
 + ".marketWatch { float:right; margin-top:2em; }"
).replace(/}/g,"}\n  "));


// Remove the leading number on each hit, put each result in an ID'd <div>
document.body.innerHTML = document.body.innerHTML.replace(
  /\n(<font face="[^"]*.>)?([0-9]+)\. (<[^\n]+\n(<.font>)?<ul>[^\n]+<.ul>)/mg,
  "\n<div class='result' id='result$2'>$1$3</div>");

// Add links to caching sites
function makeCacheLink(href, text, title) {
  var link = document.createElement("a");
  if (href != null) { link.href = href; }
  if (title != null) { link.title = title; }
  link.appendChild(document.createTextNode(text));
  var cache = document.createElement("span");
  cache.appendChild(document.createTextNode(" - "));
  cache.appendChild(link);
  return cache;
}

var results = document.getElementsByTagName("ul");
var links = document.getElementsByTagName("a");
var lastDomain = 'nowhere';
for (var i=0, j=0; j<results.length; j++, i+=4) {
  var thisI = i;
  var notHTML = false;
  caches = document.createElement("span");
  caches.className = "cache";
  results[j].appendChild(caches);

  href = links[thisI].href;
  var hrefPath = href.replace(/^https?:..[^\/]+/,'');
  var hrefDomain = href.replace(/^https?:../,'').replace(/\/.*$/,'');
  // mark secondary hits for this domain (unless this is a site-specific search)
  if (hrefDomain == lastDomain && ! query.match(/(^|\s)\+?site:[a-z]/) )
    { results[j].parentNode.className += " hit2"; }
  lastDomain = hrefDomain;

  if ( href.match(/\.(rtf|doc|ppt|pdf)$/i) ) {
    notHTML = true; // for google cache text below
    if ( href.match(/\.pdf$/i) ) { // PDFs get an extra cache entry
      pdfmn = makeCacheLink( // PDF->flash converter at Stateless Systems
        "http://pdfmenot.com/view/" + href,
        "PdfMeNot", "View PDF in Flash Applet");
      caches.appendChild(pdfmn);
      links[thisI].className += " pdf";
      i++; // links[] is dynamic, so we must increment i whenever we add a link
    }
    var ftype = document.createElement("span");
    ftype.className = "ftype";
    ftype.appendChild( document.createTextNode(
                         href.replace(/^.*\.(...)$/,"[$1] ").toUpperCase() ) );
    links[thisI].parentNode.insertBefore(ftype, links[thisI]);
  }

  coral = makeCacheLink( // CoralCache, the NYU Distribution Network
    "http://" + hrefDomain + ".nyud.net:8080" + hrefPath,
    "CoralCache");
  caches.appendChild(coral);

    goog = makeCacheLink( // get Google's cache (since it's their search result)
      "http://www.google.com/search?q=cache:" + href,
      notHTML ? "View as HTML" : "Google Cache" ); // text differs if not HTML
    if (notHTML) {
      goog.style.fontWeight = "bold";
      goog.title = "via Google Cache";
    }
    caches.appendChild(goog);

  hist = makeCacheLink(
    "http://web.archive.org/web/*" + href,
    "History");
  caches.appendChild(hist);

  //Translation Stuff
  var hrefTLD = hrefDomain.replace(/^.*\./g,'');
  if (hrefTLD.match(/^..$/)
      // try to exclude pages already translated into English
      && ! links[thisI].innerHTML.match(/english/i)
      && ! href.match(/english|[/\.]en\b/i) ) {
    var lang = [];
    if (hrefTLD.match(/c[adim]|fr|m[cg]|b[ef]|ne|sn|ht|ch|lu/)) lang.push("fr");
    if (hrefTLD.match(/nl|be|sr|a[nw]/)) lang.push("nl");
    if (hrefTLD.match(/cn|tw|hk|m[oy]|sg/)){ lang.push("zh"); lang.push("zt"); }
    if (hrefTLD.match(/at|be|cz|d[ek]|hu|l[iu]|pl|ch/)) lang.push("de");
    if (hrefTLD.match(/al|cy|gr|tr/)) lang.push("el"); // greek
    if (hrefTLD.match(/it|hr|mc|s[im]|ch|va/)) lang.push("it");
    if (hrefTLD.match(/jp|pw/)) lang.push("jp");
    if (hrefTLD.match(/k[pr]/)) lang.push("ko");
    if (hrefTLD.match(/pt|br|[am]o|cv|g[qw]|mz|st|tl/)) lang.push("pt");
    if (hrefTLD.match(/ru|az|by|ee|ge|kz|ky|kg|lv|lt|md|ua/)) lang.push("ru");
    if (hrefTLD.match(/e[cs]|ar|b[oz]|c[loru]|do|sv|g[qt]|hn|mx|ni|p[ay]|uy|ve/
       )) lang.push("es");

    function langName(code) {
      if (code == "fr") return "French";
      if (code == "nl") return "Dutch";
      if (code == "zh") return "Chinese (Simplified)";
      if (code == "zt") return "Chinese (Traditional)";
      if (code == "de") return "German";
      if (code == "el") return "Greek";
      if (code == "it") return "Italian";
      if (code == "jp") return "Japanese";
      if (code == "ko") return "Korean";
      if (code == "pt") return "Portuguese";
      if (code == "ru") return "Russian";
      if (code == "es") return "Spanish";
    }

    if (lang.length >= 1) {
      var translations = makeCacheLink(null, "Translate");
      translations.className = "trans";
      caches.appendChild(translations);
      var trList = document.createElement("div");
      var trTitle = translations.getElementsByTagName("a")[0];
      translations.insertBefore(trList, trTitle);
      for (var k=0; k<lang.length; k++) {
        var translate = lang[k];
        var trLink = document.createElement("a");
        trLink.href = "http://babelfish.yahoo.com/translate_url?tt=url&trurl="
          + escape(href) + "&lp=" + lang[k] + "_en";
        if (lang.length == 1) { trTitle.href = trLink.href; }
        trLink.appendChild(document.createTextNode("from "+langName(lang[k])));
        trList.appendChild(trLink);
      }
      i += lang.length + 1; // don't forget the top-level Translate link
    }
  }
//   results[j].appendChild(caches);
} //End of result changing


// try placing and messing with specific items
try {
  var bolds = document.getElementsByTagName("b");
  var searchTitle = bolds[0];
  var searchTitleText='';
  if (! searchTitle.innerHTML.match(/ results$/) ) {
    searchTitle.className = "searchTitle"; // mark search title for CSS
    numResults = document.getElementsByName("n");
    for(tot=0; tot<numResults.length; tot++) {
      if(numResults[tot].checked) {
        tot = numResults[tot].value;
        if(tot == 1) { tot = 100; } else { tot = tot * 10; }
        if (tot == results.length) { tot = tot + "+"; }
        else tot = results.length;
        break;
      }
    }
    // put count of hits in search title bar
    if (results.length > 0) {
      searchTitleText = '<div class="right">' + "Results <b>1</b>-<b>"
        + results.length + "</b> of <b>" + tot + "</b> for <b>"
        + query + "</b></div>";
    }
    searchTitle.innerHTML = searchTitleText + "Web - Google Search";
  }
  var noHits = bolds[bolds.length-2];
  if ( noHits.innerHTML.match(/no results for this search.$/) ) {
    noHits.className = "noHits"; // mark lack of hits for CSS
    searchTitle.parentNode.insertBefore(title, searchTitle); // add top image
  } else {
    if (forms.length >= 1) {
      forms[0].parentNode.insertBefore(title, forms[0]); // insert top image
      if (forms.length > 1) {
        forms[1].className = "secondSearch"; // mark second search box
      }
    }
  }
}
catch(e) {
  // put top image at very top of page (we failed to place it above)
  document.body.className += "index";
  document.body.innerHTML = '<div id="top"></div>' + document.body.innerHTML;
  document.getElementById("top").appendChild(title);
}

//PDF icon creation
GM_addStyle("" // I moved this to the end to speed up everything else
 + '.pdf { background:right no-repeat url("data:image/png;base64, '
 + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmp"
 + "wYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6"
 + "mAAAF2+SX8VGAAABgFBMVEUAAAAAAAAAAACPj4+oqKjhysbk0M3mq6Hnqp/oZlDoubHo6O"
 + "jp6enp7e7qj4Dq6urq6+vq9fbreGTrpZnr6+vr8PDsx8Ds087s4d/s7e7tgnDttq3tu7Pt"
 + "yMLt6ejt7e3t8PDt8fHueWXu7u7vVjvvYEjvfWrv7u7v7+/v9PXw8PDw9fbw9/fw/P7xUz"
 + "jxalLxfWnx8fHx9fbymIjywLfy5+Ty8fHy8vLy9fXy+fny+/3y/f/zSCrzTzLzz8/z8fDz"
 + "8vLz8/Pz/Pz0KAb0QCH0dl/0inf0tqv03dj0+Pn0+vr0/v/1Uzb1fmn10dH19fX1/Pz1/P"
 + "32ua7209P29vb29/j3Px/3mIf3qZv31NT39/f3+vv3///41db4+Pj4+fn4/f75ycD5///6"
 + "jXz6tKf6xbz62dn66uj6+vr6///7+/v7///81NL8/Pz9/f39///+4OD+/v7+////AAD/CQ"
 + "n/Gxz/KCj/MzP/XV3/mJj/oKD/4uL/4+P/6Oj/7Oz////nk+X3AAAAA3RSTlMAAwjfgB8v"
 + "AAAAxElEQVQYV2NgRgMMzPWVVRXlZaUlxSBQDxKoq62uKchJi40M9rMDC4BAio9pTICXpQ"
 + "5MoCjZWTzB39FQGSpQmJ/qIhHtaK7FAxXIy04Pk/F2MBThhggUZmUm2qrKGUnyi4AF8nKz"
 + "ksI53KQEFRXkwQIaZhb2amwmNvqusppgAS1tXXcVPmExX05WXrCAk4exHpe6VaAoCxCABI"
 + "KUhNitQ/1DBFjq65mZgAIRBtKe8VFRcSIs9cyMDFCng0AGUD0QoHgdCABCdTvSIjwTFQAA"
 + "AABJRU5ErkJggg=="
 + '");   padding-right:20px; }\n'
);

} //end of if(query) statement

else {
  // put top image at very top of page (we failed to place it above)
  document.body.className += "index";
  document.body.innerHTML = '<div id="top"></div>' + document.body.innerHTML;
  document.getElementById("top").appendChild(title);
  
  GM_addStyle("#top { margin:4em 0 0 0; text-align:center; }"
  + "body { font-family:sans-serif; }");
  
  // Autoclick 100 results and then focus on search box
  document.getElementsByName('n')[2].click();
  document.getElementsByName('Gw')[0].focus();
}

// Inserting links onto top of page
var linksdiv = document.createElement('div');
linksdiv.setAttribute('id', 'toplinks');

// Useless Web Text
var webtext = document.createElement('text');
var webcontent = document.createTextNode('Web');
webtext.appendChild(webcontent);
webtext.setAttribute('class', 'gb2');

// Bing Images
var binglink = document.createElement('a');
binglink.href = "http://www.bing.com/images/search?q="+query;
var bingcontent = document.createTextNode('Images');
binglink.appendChild(bingcontent);
binglink.setAttribute('class', 'gb1');

// YouTube
var youtubelink = document.createElement('a');
youtubelink.href = "http://www.youtube.com/results?search_query="+query;
var youtubecontent = document.createTextNode('Videos');
youtubelink.appendChild(youtubecontent);
youtubelink.setAttribute('class', 'gb1');

// Google Maps
var gmapslink = document.createElement('a');
gmapslink.href = "http://maps.google.com/maps?f=q&hl=en&geocode=&q="+query+"&ie=UTF8&z=12&iwloc=addr&om=1";
var gmapscontent = document.createTextNode('Maps');
gmapslink.appendChild(gmapscontent);
gmapslink.setAttribute('class', 'gb1');

// Putting Links Together
linksdiv.appendChild(webtext);
linksdiv.appendChild(binglink);
linksdiv.appendChild(youtubelink);
linksdiv.appendChild(gmapslink);

// Inserting links group
document.body.insertBefore(linksdiv, document.body.firstChild);

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
// This auto update-notification script was made by Seifer
// You can find it at http://userscripts.org/scripts/show/12193
// ========================================================
// === Edit the next four lines to suit your script. ===
scriptName='Googled Scroogle';
scriptId='82914';
scriptVersion=2.00;
scriptUpdateText='Fixed ImageShack hosting issues. The image is now in base64 format in the script.';
// === Stop editing here. ===

var lastCheck = GM_getValue('lastCheck', 0);
var lastVersion = GM_getValue('lastVersion', 0);
var d = new Date();
var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
if (parseInt(navigator.appVersion)>3) {
	if (navigator.appName=="Netscape") {
		winW = window.innerWidth;
		winH = window.innerHeight;
	}
	if (navigator.appName.indexOf("Microsoft")!=-1) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
}
if (currentTime > (lastCheck + 86400)) { //24 hours after last check
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(responseDetails) {
			var text = responseDetails.responseText;
			var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
				var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
				if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
					GM_addStyle('#gm_update_alert {'
				+'	position: fixed;'
				+'	z-index:100000;'
				+'	top: '+((winH/2)-60)+'px;'
				+'	left: '+((winW/2)-275)+'px;'
				+'	width: 550px;'
				+'	background-color: yellow;'
				+'	text-align: center;'
				+'	font-size: 11px;'
				+'	font-family: Tahoma;'
				+'}'
				+'#gm_update_alert_buttons {'
				+'	position: relative;'
				+'	top: -5px;'
				+'	margin: 7px;'
				+'}'
				+'#gm_update_alert_button_close {'
				+'	position: absolute;'
				+'	right: 0px;'
				+'	top: 0px;'
				+'	padding: 3px 5px 3px 5px;'
				+'	border-style: outset;'
				+'	border-width: thin;'
				+'	z-index: inherit;'
				+'	background-color: #FF0000;'
				+'	color: #FFFFFF;'
				+'	cursor:pointer'
				+'}'
				+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
				+'	text-decoration:underline;'
				+'	color: #003399;'
				+'	font-weight: bold;'
				+'	cursor:pointer'
				+'}'
				+'#gm_update_alert_buttons span a:hover  {'
				+'	text-decoration:underline;'
				+'	color: #990033;'
				+'	font-weight: bold;'
				+'	cursor:pointer'
				+'}');
					newversion = document.createElement("div");
					newversion.setAttribute('id', 'gm_update_alert');
					newversion.innerHTML = ''
				+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
				+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
				+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
				+'	<br>'
				+'	<div id="gm_update_alert_button_close">'
				+'		Close</div>'
				+'	<b>What do you want to do?</b><br>'
				+'	<div id="gm_update_alert_buttons">'
				+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
				+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
				document.body.insertBefore(newversion, document.body.firstChild);
				document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
				document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
						document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
				}
			}
	});
}