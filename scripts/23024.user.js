// ==UserScript==
// @name           Reddit TrackMeNot
// @description    Stop Reddit from tracking which links you click
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    
    if (thisLink.className.match("title")) {	
	    thisLink.removeAttribute("onmousedown");
    }
}
