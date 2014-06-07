// ==UserScript==
// @name           Scroogle - linkable, pretty, cache++
// @namespace      http://khopis.com/scripts
// @description    Nicer look, bookmarkable, better security, helper links
// @include        https://*scroogle.org/cgi-bin/nbbw*
// @include        http://*scroogle.org/cgi-bin/*
// @include        http://*scroogle.org/scrap*
// @include        https://ssl.scroogle.org/*
// @author         Adam Katz <scriptsATkhopiscom>
// @version        1.7
// @lastupdated    2010-10-06
// @copyright      2008-2010 by Adam Katz
// @license        AGPL v3+
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2008-2010  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==

/*
 * There are three main features provided here:
 *   1. Bookmarkable URLs when in SSL mode.
 *   2. Display beautified, now it looks almost exactly like Google
 *   3. Helper links added for cache, similar links, and history.
 *
 * A quick overview of Scroogle - this is an anonymizer service which
 * prevents Google, Inc. from connecting your searches to you. They wipe
 * logs religiously, there are no cookies, etc. Using SSL also means nobody
 * can read your traffic and note your search queries.
 * Learn more at www.scroogle.org or http://epic.org/privacy/gmail/faq.html
 *
 * If using SSL, further searches should be SSL, and it is safe* to use GET,
 * making searches bookmarkable (see https://ssl.scroogle.org/sslnote.html )
 * If not using SSL, it is not safe to use GET.  We ensure we're using POST
 * for the reasons outlined at http://www.scroogle.org/scget.html
 * (* note:  SSL-to-SSL apparently passes referer data.  This script uses
 *           javascript:location.href='https://...'  as a workaround.)
 *
 * Quick Search and Search Bar options for scroogle
 * are listed at http://userscripts.org/scripts/show/23529
 */

var override = false; // set this to true to always use SSL on refined searches
var query = null;

// fix get/post on forms
var forms = document.getElementsByTagName("form");
for (var i = 0, f; (f = forms[i]); i++) {
  //if ( /\/nbbw(ssl)?\.cgi$/.test(f.action) ) { // just the search box
  if ( f.action.indexOf("/nbbw") !=-1 ) { // just the search box
    for (var gw=document.getElementsByName("Gw"), j=0, g; (g = gw[j]); j++) {
      if (j == 0) { query = g.value; }
      g.setAttribute("spellcheck", "true");
    }
    // GET is safe only with SSL; see https://ssl.scroogle.org/sslnote.html
    if ( override || location.protocol == "https:" ) {
      f.method = "get";
      urlHead = "https://ssl.";

      // BUG in Scroogle site:  GET requests ignore "next 100" option
      // WORKAROUND: force POST requests if (and only if) user asks for next 100
      var next100 = f.getElementsByTagName("input");
      if (next100 && next100.length > 1) {
        next100 = next100[next100.length - 1];
        if (next100.name == "z") {
          f.id = "form2";
          next100.setAttribute("onchange", 'document.getElementById("form2")'
                               + '.method = ( this.checked ? "post" : "get")');
        }
      }
    } else {
      f.method = "post";
      urlHead = "http://www.";
    }
    // i see no difference between nbbw.cgi and nbbwssl.cgi
    f.action = urlHead + "scroogle.org/cgi-bin/nbbw.cgi";
  }
}


// don't do any of this unless the search form exists!
if (query != null) {

// CSS moved to top so that it looks nicer faster
GM_addStyle( "\n" + // better spacing, fonts, colors, placement for new items
// The following multi-line string requires E4X (not supported in IE or Opera)
// Syntax highlighting is almost certainly going to get broken here ...
<style><![CDATA[

.result b[style="background-color: rgb(255, 255, 102);"]  /* 1. #ffff66 */
   { border-color:#ed5; background-color:#fffbed!important; }
.result b[style="background-color: rgb(160, 255, 255);"]  /* 2. #a0ffff */
   { border-color:#8ee; background-color:#e8f8ff!important; }
.result b[style="background-color: rgb(153, 255, 153);"]  /* 3. #99ff99 */
   { border-color:#8e8; background-color:#efe!important; }
.result b[style="background-color: rgb(255, 153, 153);"]  /* 4. #ff9999 */
   { border-color:#e88; background-color:#fee!important; }
.result b[style] { border-style:solid; border-width:1px 0; }
body { font-family:sans-serif; }
body.index { text-align:center; background:white; }
ul, blockquote { margin:0; padding:0; }
P[align="right"] b { font-size:1em; display:block; float:left; }
#top { margin:4em 0 0 2em; }
center { text-align:left; }
h3 { display:none; } /* now-extraneous "Enter your Google search terms:" */
body.index center { text-align:center; }
.secondSearch, .searchTitle { 
     display:block; color:#000; background:#ebeff9; border:solid #6b90da; }
.searchTitle { 
     border-width:1px 0 0 0; line-height:2em; margin-bottom:-2em;
     font-size:0.8em; padding:0 0.5em; font-weight:bold; }
.searchTitle div { font-weight:300; }
.secondSearch { border-width:1px 0; padding:1.5em 0; text-align:center; }
.right { float:right; }
.noHits { display:block; margin:3em 0 -2em 0; font-size:1.25em; }
font[size="5"] { font-size:1em; color:inherit;
                 display:block; margin-top:0.5em; }
img { border:none; }
a#logo > b { position:relative; margin-right:-0.75em; vertical-align:bottom;
             font:normal 3em Catull, Garamond, Times New Roman, serif;
             color:#07e; font-stretch:expanded; text-shadow:1px 1px 2px #666; }
a#logo, a#logo > b * { text-decoration:none; }
a#logo > b * { vertical-align:bottom; }
a b u   { color:#d30; }
a b u s { color:#fc4; }
a b s   { color:#2c5; }
#logo img { height:5em; margin-top:-1.3em; padding-bottom:0.5em; }
form { display:inline; }
input { font-size:1.25em; }
input[type="text"] { padding-left:0.25em; width:30em; }
span.ftype { font-weight:bold; font-size:x-small; color:blue; }
#title, #title *, center, center * { vertical-align:middle; }
ul { margin-top:0.25em; margin-bottom:0.75em; }
div.hit2 { margin-left:2em; } /* indent subsequent hits within a domain */
.cache { font-size:0.75em; }
.cache a { color:#77c; }
.cache a:visited { color:purple; }
.trans > a { text-decoration:underline; cursor:pointer; } /* not a href */
span.trans div { visibility:hidden; position:absolute;
     padding:0.1em 1em; margin:1.2em 0 0 -0.5em; border:solid 1px #88d;
     background-color:#eef; opacity:0.95; -moz-border-radius:4px; }
span.trans:hover div { display:inline; visibility:visible; }
span.trans:hover div a { display:block; text-decoration:none; }
span.trans:hover div a:hover { display:block; text-decoration:underline; }

]]></style> );



// remove the leading number on each hit, put each result in an ID'd <div>
document.body.innerHTML = document.body.innerHTML.replace(
  /\n(<font face="[^"]*.>)?([0-9]+)\. (<[^\n]+\n(<.font>)?<ul>[^\n]+<.ul>)/mg,
  "\n<div class='result' id='result$2'>$1$3</div>")
  .replace(/<font size="2">"/g, '<font size="2">') // nix leading quote
  .replace(/"<br>/g, "<br>"); // nix trailing quote

// add links to caching sites
function makeCacheLink(href, text, title) {
  var link = document.createElement("a");
  if (href != null) { link.href = href; }
  if (title != null) { link.title = title; }
  link.appendChild(document.createTextNode(text));
  if (r.parentNode.title) {
    link.setAttribute("onclick", 'return confirm("'
    + 'Google thinks this link may be harmful to your computer, '
    + 'which may mean the service you clicked on will also be harmful.  '
    + 'Are you sure you want to view this?")');
  }
  var cache = document.createElement("span");
  cache.appendChild(document.createTextNode(" - "));
  cache.appendChild(link);
  return cache;
}

var results = document.getElementsByTagName("ul");
var links = document.getElementsByTagName("a");
var lastDomain = 'nowhere';
var siteSearch = /(?:^|\s)\+?site:[a-z]/.test(query);
for (var i=0, j=0, r, l, notHTML, hreftmp; (r=results[j]); j++, i++) {
  notHTML = false;
  l = links[i];
  hreftmp = l.href;

  // DANGER, this reverts Google's defanged site URL for cache/related/history!
  if (hreftmp.match(/http:..www\.google\.com\/interstitial\?url=/)) {
    hreftmp = hreftmp.replace(/http:..www\.google\.com\/interstitial\?url=/,'');
    r.parentNode.title = "Warning: this link may endanger your system!";
  }

  // This fixes a bug related to href somehow changing to the last cache link
  const href = hreftmp;

  // privacy workaround for SSL-to-SSL referer issue (see "* note" above)
  if ( href.indexOf("https://") == 0 && location.protocol == "https:" ) {
    try {
      // pin link's color to initial :visited state before altering its href
      l.style.color = getComputedStyle(l,'').
                                   getPropertyValue("color");
      // because this can be used to report your history to a 3rd party,
      // it might be disabled or blocked in the future (thus the try/catch).
      // Learn more at https://bugzilla.mozilla.org/show_bug.cgi?id=147777#c11
    } catch(e) {  } // ignore errors from missing/prohibited call

    l.href = "javascript:location.href='" + href + "'";
  }

  var hrefPath = href.replace(/(?:^https?:..[^\/]+)/,'');
  var hrefDomain = href.replace(/^https?:..([^\/]*).*/,'$1');
  // mark secondary hits for this domain (unless this is a site-specific search)
  if (hrefDomain == lastDomain && ! siteSearch )
    { r.parentNode.className += " hit2"; }
  lastDomain = hrefDomain;

  caches = document.createElement("span");
  caches.className = "cache";
  r.appendChild(caches);

  // items Google Docs can convert to HTML
  if (/(?:\w\.(?:xlsx?|od[st]|[ct]sv|tsb|docx?|rtf|pp[ts]|pdf)$)/i.test(href)) {
    notHTML = true; // for google cache text below
    caches.appendChild( makeCacheLink(
      "https://docs.google.com/viewer?url=" + href,
      "Google Docs", "Render with Google Docs (caches document at Google)") );
      i++; // links[] is dynamic, so we must increment i whenever we add a link
    if ( /(?:\.pdf$)/i.test(href) ) { // PDF files get an icon
      l.className += " pdf";
    }
    var ftype = document.createElement("span");
    ftype.className = "ftype";
    ftype.appendChild( document.createTextNode(
                         href.replace(/^.*\.(...)$/,"[$1] ").toUpperCase() ) );
    l.parentNode.insertBefore(ftype, l);
  }

  // skip scroogle and cache/well-seeded links (is this useful?)
  if (! /\b(?:scroogle.org|google.com|nyud.net)$/.test(hrefDomain) ) {
    caches.appendChild( makeCacheLink( // Coral, the NYU Distribution Network
      "http://" + hrefDomain + ".nyud.net:8080" + hrefPath,
      "CoralCache") );
    i++;

    goog = makeCacheLink( // get Google's cache (since it's their search result)
      "http://www.google.com/search?q=cache:" + href,
      notHTML ? "View as basic HTML" : "Google Cache" ); // differs if not HTML
    if (notHTML) {
      // goog.style.fontWeight = "bold";
      goog.title = "via Google Cache, see also Google Docs link";
    }
    caches.appendChild(goog);
    i++;
  }

  // mimic google's related search ... mostly useless
  // NOTE - this circumvents the POST-based security in non-ssl searches!
  caches.appendChild( makeCacheLink(
    forms[0].action + "?Gw=related:" + href.replace(/^https?:../,''),
    "Similar pages" ) );
  i++;

  caches.appendChild( makeCacheLink(
    "http://web.archive.org/web/*" + href,
    "History") );
  i++;

  var hrefTLD = hrefDomain.replace(/(?:^.*\.)/g,'');
  if (/(?:^..$)/.test(hrefTLD)
      // try to exclude pages already translated into English
      && ! /english/i.test(l.innerHTML)
      && ! /(?:english|[/\.]en\b)/i.test(href) ) {
    var lang = [];
    if (/(?:c[adhim]|fr|b[ef]|m[cg]|ht|lu|ne|sn)/
        .test(hrefTLD)) lang.push("fr");
    if (/(?:a[nw]|nl|be|sr)/.test(hrefTLD)) lang.push("nl");
    if (/(?:cn|hk|tw|m[oy]|sg)/
        .test(hrefTLD)) { lang.push("zh"); lang.push("zt"); }
    if (/(?:d[ek]|at|be|c[hz]|l[iu]|hu|pl)/.test(hrefTLD)) lang.push("de");
    if (/(?:[gt]r|cy|al)/.test(hrefTLD)) lang.push("el"); // greek
    if (/(?:it|s[im]|hr|mc|ch|va)/.test(hrefTLD)) lang.push("it");
    if (/(?:jp|pw)/.test(hrefTLD)) lang.push("jp");
    if (/(?:k[pr])/.test(hrefTLD)) lang.push("ko");
    if (/(?:br|[ps]t|g[qw]|m[oz]|ao|cv|tl)/.test(hrefTLD)) lang.push("pt");
    if (/(?:ru|ua|k[gyz]|[eg]e|l[tv]|az|by|md)/.test(hrefTLD)) lang.push("ru");
    if (/(?:e[cs]|mx|c[loru]|b[oz]|g[qt]|p[ay]|uy|ve|ar|do|hn|ni|sv)/
        .test(hrefTLD)) lang.push("es");

    function langName(code) {
      switch (code) {
        case "de" : return "German";
        case "fr" : return "French";
        case "ru" : return "Russian";
        case "es" : return "Spanish";
        case "jp" : return "Japanese";
        case "zh" : return "Chinese (Simplified)";
        case "zt" : return "Chinese (Traditional)";
        case "it" : return "Italian";
        case "nl" : return "Dutch";
        case "el" : return "Greek";
        case "ko" : return "Korean";
        case "pt" : return "Portuguese";
      }
    }

    if (lang.length >= 1) {
      var translations = makeCacheLink(null, "Translate");
      translations.className = "trans";
      caches.appendChild(translations);
      var trList = document.createElement("div");
      var trTitle = translations.getElementsByTagName("a")[0];
      translations.insertBefore(trList, trTitle);
      for (var k=0, la; (la=lang[k]); k++) {
        var trLink = document.createElement("a");
        trLink.href = "http://babelfish.yahoo.com/translate_url?tt=url&trurl="
          + escape(href) + "&lp=" + la + "_en";
        if (lang.length == 1) { trTitle.href = trLink.href; }
        trLink.appendChild(document.createTextNode("from "+langName(la)));
        trList.appendChild(trLink);
      }
      i += lang.length + 1; // don't forget the top-level Translate link
    }
  }
}


///////////////////////////  everything else is for beautification

// create top image (no SSL version of image available)
var img = document.createElement("img");
img.alt = "Scroogle logo";

// create top image's link
var title = document.createElement("a");
title.href = "http://scroogle.org";
title.id = "logo";
var titleText = document.createElement("b");
titleText.innerHTML = 'S<s>c</s><u><s>r</s>o<s>o</s></u>g<s>l</s><u>e</u>';
title.appendChild(titleText);
title.appendChild(img);



// try placing and messing with specific items
try {
  var bolds = document.getElementsByTagName("b");
  if (bolds.length > 1) {
    var searchTitle = bolds[0];
    var searchTitleText='';
    if (! / results$/.test(searchTitle.innerHTML) ) {
      searchTitle.className = "searchTitle"; // mark search title for CSS
      numResults = document.getElementsByName("n");
      var tot=0;
      for(var t; (t=numResults[tot]); tot++) {
        if(t.checked) {
          tot = t.value;
          if(tot == 1) { tot = 100; } else { tot = tot * 10; }
          if (tot == results.length) { tot = tot + "+"; }
          else tot = results.length;
          break;
        }
      }
      // put count of hits in search title bar
      // TODO: there's some redundant code here...
      var numResults = document.getElementsByClassName("result");
      var lastResult = results.length, firstResult = 1;
      if (numResults && numResults.length > 1) {
        lastResult = numResults[numResults.length-1].id.match(/\d+$/);
        firstResult = numResults[0].id.match(/\d+$/);
        if (lastResult && lastResult > tot.match(/^\d+/)) {
          tot = lastResult + "" + tot.match(/\+$/);
        }
      }
      if (results.length > 0) {
        searchTitleText = '<div class="right">' + 'Results <b>' + firstResult
          + '</b>-<b>' + lastResult + "</b> of <b>" + tot + "</b> for <b>"
          + query + "</b></div>";
        searchTitle.innerHTML = searchTitleText + "Web - Google Search";
      }
      else {
        var size5 = document.evaluate("//font[@size='5']", document, null,
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (size5.snapshotLength == 1) {
          size5 = size5.snapshotItem(0);
          size5.innerHTML = size5.innerHTML.replace(/searchTitle/g,"size5");
        }
        else size5 = false;
      }
    }
    var noHits = bolds[bolds.length-2];
    if ( /no results for this search.$/.test(noHits.innerHTML) ) {
      noHits.className = "noHits"; // mark lack of hits for CSS
      searchTitle.parentNode.insertBefore(title, searchTitle); // add top image
    } else {
      if (forms.length >= 1) {
        var f0 = forms[0];
        f0.parentNode.insertBefore(title, f0); // insert top image
        if (forms.length > 1) {
          var f1 = forms[1];
          f1.className = "secondSearch"; // mark second search box
  
          var pagelinks = document.getElementsByTagName("a");
          var privacy = pagelinks[pagelinks.length-1];
          privacy.href = "http://www.eff.org/issues/privacy";
          privacy.innerHTML = "protect your privacy";
        } else { if (size5) {
          forms[0].appendChild(size5);
        } }
      }
    }
  } else {
  // put top image at very top of page (we failed to place it above)
  document.body.className += "index";
  document.body.innerHTML = '<div id="top"></div>' + document.body.innerHTML;
  document.getElementById("top").appendChild(title);
  }
} catch(e) {
  GM_log(e);  // this shouldn't fire any more...
}

// I moved this to the end to speed up everything else
img.src = "data:image/jpg;base64,"+<base64><![CDATA[
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
]]></base64>;

GM_addStyle(".pdf { background:right no-repeat url(" + (""+<base64><![CDATA[
"data:image/jpg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYP
DQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRo
PDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wA
ARCAAQABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAwQFBv/EACQQAAICAQIGAwEAAAAAA
AAAAAEDAgQFABEGEhQhIjFBcaHR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwX/xAAcEQAABgMAAAAAAAAA
AAAAAAAAAQIRIUESMWH/2gAMAwEAAhEDEQA/AN/i8rlLqGOdeWlUBKUpBAOwG/8ANDwV91BuHx78hAx
kZKchwiJrkIExBO+537feoqMtilUqq7F1i5qMuoq9Mw88uckCREe49dvnT1PK47iHiPEohWW2KpNYRK
qREeG4PlED3+6J9CgomySoomi61D//2Q==" ]]></base64>).replace(/\s/g,'')
+ "); padding-right:20px; }\n");

} // end if (query)