// ==UserScript==
// @name           Ask.com link re-writer
// @description    Removes ask.com click tracking
// @include        http://*.ask.com/*q=*
// ==/UserScript==

var allLinks, thisLink;

allLinks = document.evaluate(
    "//a[@class='L4']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.onmousedown = function() { return true; }
}
