// ==UserScript==
// @name           Improved Scroogle
// @namespace      namespace
// @description    Fork of existing Scroogle userscripts with minor tweaks
// @include        https://*scroogle.org/cgi-bin/nbbw*
// @include        http://*scroogle.org/cgi-bin/*
// @include        https://ssl.scroogle.org/*
// @author         Adam Katz <scriptsATkhopiscom>, tweaks by icepick
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.3
// @lastupdated    2008-10-22
// ==/UserScript==
/*
 * This script is a fork of Adamn Katz's "Scroogle - bookmarkable, pretty, cache links" userscript
 * available at http://userscripts.org/scripts/show/23529
 *
 * Features include greatly improved aesthetics and functionality increase, in the form of links to caches etc.
 *
 * Current tweaks take the form of functionality /removal/. Marked cap image is removed due to personal preference.
 * Contrary to Scroogle documentation, (at the time of writing) SSL (in Firefox) does not remove the HTTP Referer.
 * GET requests are therefore in my opinion unsafe, so this functionality has been removed.
 * Save a few bytes on PDF image
 * Removed restriction on cache links to "well seeded" items. Side effect of PDF links being available to these domains.
 * Removed "similar pages" link, due to its use of GET
 *
 * Below is the original copyright header:
 *
 * Copyright 2008 by Adam Katz <scriptsATkhopiscom>, AGPL 3+
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */


var query = document.getElementsByName("Gw")[0].value;
var forms = document.getElementsByTagName("form");

// turn on spellcheck
for (var i = 0; i < forms.length; i++) {
    for (var gw = document.getElementsByName("Gw"), j = 0; j < gw.length; j++) {
      if (j==0) { query = gw[0].value; }
      gw[j].setAttribute("spellcheck", "true");
    }
}

// don't do any of this unless the search form exists!
if (query) {

// CSS moved to top so that it looks nicer faster
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
 + "body.index { text-align:center; }"
 + "ul, blockquote { margin:0; padding:0; }"
 + 'P[align="right"] b { font-size:1em; display:block; float:left; }'
 + "#top { margin:4em 0 0 2em; }"
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
 + "#logo img { height:6em!important; margin-top:-1em; }"
 + "#top #logo img { height:10em!important; }"
 + "form { display:inline; }"
 + 'input[type="text"] { width:40em; }'
 + "span.ftype { font-weight:bold; font-size:x-small; color:blue; }"
 + "#title, #title *, center, center * { vertical-align:middle; }"
 + "ul { margin-top:0.25em; margin-bottom:0.75em; }"
 + "div.hit2 { margin-left:2em; }" // indent subsequent hits within a domain
 + ".cache { font-size:0.75em; /* padding-left:4em; */ }"
 + ".cache a { color:#77c; }"
 + ".trans > a { text-decoration:underline; cursor:pointer; }" // not a href
 + "span.trans div { visibility:hidden; position:absolute;"
 + "     padding:0.1em 1em; margin:1.2em 0 0 -0.5em; border:solid 1px #88d;"
 + "     background-color:#eef; -moz-opacity:0.95; -moz-border-radius:4px; }"
 + "span.trans:hover div { display:inline; visibility:visible; }"
 + "span.trans:hover div a { display:block; text-decoration:none; }"
 + "span.trans:hover div a:hover { display:block; text-decoration:underline; }"
 + ".marketWatch { float:right; margin-top:2em; }" // (fix vim's matching bug {)
).replace(/}/g,"}\n  ") ); // make the generated code easier to read


// remove the leading number on each hit, put each result in an ID'd <div>
document.body.innerHTML = document.body.innerHTML.replace(
  /\n(<font face="[^"]*.>)?([0-9]+)\. (<[^\n]+\n(<.font>)?<ul>[^\n]+<.ul>)/mg,
  "\n<div class='result' id='result$2'>$1$3</div>");

// add links to caching sites
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
}


///////////////////////////  everything else is for beautification

// create top image (no SSL version of image available)
var img = document.createElement("img");
img.src = "http://scroogle.org/gifs/";
if (Math.random() > 0.6) {
  img.src += 'gooburns.gif'; // 40% chance of google logo burning/falling down
} else {
  img.src += 'scrooge2.gif'; // 60% chance of scroogle logo
}
img.alt = "S C R O O G L E";

// create top image's link
var title = document.createElement("a");
title.href = "http://scroogle.org";
title.id = "logo";
title.appendChild(img);


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
} catch(e) {
  // put top image at very top of page (we failed to place it above)
  document.body.className += "index";
  document.body.innerHTML = '<div id="top"></div>' + document.body.innerHTML;
  document.getElementById("top").appendChild(title);
}


GM_addStyle("" // I moved this to the end to speed up everything else
 + '.pdf { background:right no-repeat url("data:image/png;base64, ' // PDF icon
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

} // end if (searchExists)