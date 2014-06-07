// ==UserScript==
// @name           Autoparse.LnC-Archive.Stories
// @namespace      http://www.lcfanfic.com/
// @include        http://www.lcfanfic.com/*
// ==/UserScript==


var allLinks, thisLink;
allLinks = document.evaluate(
    "//a[@class='lcflink']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisDiv
    var pLink = document.createElement('A');
    thisLink.href='http://www.jagersberger.net/stories/?storyurl='+ thisLink.href;
}