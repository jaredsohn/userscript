// ==UserScript==
// @name          boardttnews-2-forumttnews
// @author	  		Pepino
// @namespace     
// @description   Replaces board.tt-news.de with forum.tt-news.de
// @include       http://board.tt-news.de/*
// ==/UserScript==

//******************************************************************
// 2007.12.18 - Initial Revision (v0.1)
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
    a.href = a.href.replace("board.tt-news.de","forum.tt-news.de");
    a.href = a.href.replace("tt-news.de//","tt-news.de/");
}
