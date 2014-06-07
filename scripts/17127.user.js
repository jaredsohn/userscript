// ==UserScript==
// @name           Google Reader auto-selector
// @namespace      http://www.3greeneggs.com
// @description    Automatically choose to read new feeds in Google Reader, not on the Google Homepage
// @include        http://www.google.com/ig/add?feedurl*
// ==/UserScript==

if (document.title == "Add to Google") { // confirm we're on the right page
    var allLinks, thisLink;
    allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
    thisLink = allLinks.snapshotItem(3);
    location.href = thisLink;
}