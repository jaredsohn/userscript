// ==UserScript==
// @name          Anti-AdOnNetwork Script
// @namespace     http://stendec.kicks-ass.net/
// @description   Automatically skips past AdOnNetwork pages.
// @include	  http://url.cpvfeed.com/inter/top*
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
    if ( thisLink.target == "_top") { top.location = thisLink.href; }
}