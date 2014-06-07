// ==UserScript==
// @name           Reddit New Window
// @description    Open Reddit Links in a new window/tab
// @include        http://reddit.com/*
// @include        http://*.reddit.com/
// ==/UserScript==

var requiredLinkPattern = "title";

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);



for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    
    if (thisLink.className.match(requiredLinkPattern) != null) {	
	thisLink.target = "_blank";
    }
}