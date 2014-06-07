// ==UserScript==
// @name          IMDB Nested Threads As Default View
// @namespace     http://adudeabides.livejournal.com/
// @description   Links to threads in IMDB message boards are changed to display the "nested" format as the standard view. Less clicking and load-time for your browsing convenience!
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
	a.href=a.href.replace("/thread/","/nest/");
	a.href=a.href.replace("/flat/","/nest/");
	a.href=a.href.replace("/inline/","/nest/");
}
