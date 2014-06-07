// ==UserScript==
// @name          ttnews-2-ttforum
// @author	  Pepino
// @namespace     
// @description   Replaces tt-news.de with tischtennis-forum.de.
// @include       http://*tt-news.de/*
// ==/UserScript==

//******************************************************************
// 2007.04.26 - Initial Revision (v0.1)
//******************************************************************

var links, a;
links = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
    a.href = a.href.replace("tt-news.de","tischtennis-forum.de");
}
