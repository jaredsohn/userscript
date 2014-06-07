
// version 0.4 Alpha!
// 2006-06-02
// Copyright (c) 2005, J Vicherek
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "zap2it IMDB", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          zap2it IMDB
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   zap2it tv listings with IMDB links for movies
// @include       http://tvlistings*.zap2it.com/*
// ==/UserScript==

if (!GM_xmlhttpRequest) {
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


if ( window.location.href.indexOf("grid.asp") > 0 ) {
var BRs = xpath("//td[@bgcolor='#99ccff']/b/a/font/br");
//alert("1: window.location: " + window.location.href);
  for (var i = 0; i < BRs.snapshotLength; i++) {
    var br = BRs.snapshotItem(i);
    var movieTitle = br.nextSibling.nodeValue;
    var div = document.createElement('a');
    div.innerHTML = "<a href='http://imdb.com/find?s=all&q=" + movieTitle + "'>IMDB</a>&nbsp;";
    br.parentNode.parentNode.parentNode.insertBefore(div,br.parentNode.parentNode);
  }
}


if ( window.location.href.indexOf("grid_one.asp") > 0 ) {
var BRs = xpath("//a[starts-with(@href,'program.asp')]/font/b");
  for (var i = 0; i < BRs.snapshotLength; i++) {
    var br = BRs.snapshotItem(i);
    var movieTitle = br.textContent;
// GM_log(movieTitle);
    var div = document.createElement('div');
    div.innerHTML = "<a href='http://imdb.com/find?s=all&q=" + movieTitle + "'>IMDB</a><BR>";
    br.parentNode.parentNode.parentNode.insertBefore(div,br.parentNode.parentNode);
  }
}

