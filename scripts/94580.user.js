// ==UserScript==
// @name           Woot Deals No Thumbnails
// @namespace      http://knightknetwork.com
// @description    Removes thumbnails
// @include        http://deals.woot.com/*
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
    '//img[@class="photo"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.src = " "
}