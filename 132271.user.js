// ==UserScript==
// @name           LJ-cut open in new window
// @namespace      http://livejournal.com/*
// @include        http://livejournal.com/*
// @include        http://*.livejournal.com/*
// ==/UserScript==

links = document.evaluate("//a",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < links.snapshotLength; i++) {
    link = links.snapshotItem(i);
	if (link.href.match("cutid")) {link.target="_blank";}
	if (link.href.match("comments")) {link.target="_blank";}
}

