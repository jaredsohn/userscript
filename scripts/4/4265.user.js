// ==UserScript==
// @name          IMDB Flat Board
// @namespace     http://www.devdive.com/
// @description   Replaces links to threads in IMDB message boards to show the "flat" format by default.
// @include       http://imdb.com/*
// @include       http://www.imdb.com/*
// ==/UserScript==

var links, a;
links = document.evaluate(
    "//a[contains(@href, '/board/')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);	
	a.href=a.href.replace("/thread/","/flat/");
	a.href=a.href.replace("/nest/","/flat/");
}