// ==UserScript==
// @name          Twitter replies-search 2
// @namespace     http://twitter.com/robotwisdom/
// @description   For each tweet, adds a link to search.twitter.com to find replies to that user
// @include       http://twitter.com/*
// @license     Creative Commons Attribution License
// @version     0.1
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//a[@class='url']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.href = thisDiv.href.replace("twitter.com/", "search.twitter.com/search?q=%40");
}
