// ==UserScript==
// @name           Ars Technica Remove Related Stories
// @namespace      http://arstechnica.com/
// @include        http://arstechnica.com/*
// @include        http://*.arstechnica.com/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='Inset RelatedStories']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
    thisDiv.parentNode.removeChild(thisDiv);
}