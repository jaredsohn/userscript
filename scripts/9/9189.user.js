// ==UserScript==
// @name           Hide Read Topics
// @namespace      http://thomasknoll.info
// @description    Hide Read Topics in weknow Forums
// @include        http://weknow.to/forums/
// @include        http://weknow.to/forums/discussions
// @exclude        http://weknow.to/forums/discussion/*

// ==/UserScript==

var allLi, thisLi;
allLi = document.evaluate(
    "//li[not(contains(@class, 'New'))]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLi.snapshotLength; i++) {
    thisLi = allLi.snapshotItem(i);
    thisLi.parentNode.removeChild(thisLi);
}