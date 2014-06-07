// ==UserScript==
// @name          El Norte Sanitize Links
// @namespace     http://dweezil.be/greasemonkey
// @description   Convert Javascript to actual links for ElNorte.com news.
// @include       http://www.elnorte.com/
// @include       http://www.elnorte.com/*
// @include       http://www.elnorte.com/libre/online07/includesportadas/LoMasDestacadoZ7.htm
// ==/UserScript==
//
// Based on Slashdot Link New Window

var allLinks, thisLink, newLink;
var urlTag =  "javascript:window.parent.location.href='../../../";
var urlLong = urlTag.length;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++)
{
    thisLink = allLinks.snapshotItem(i);
    if (thisLink.href.search (urlTag) == 0)
    {
        var newLink = thisLink.href.substring (urlLong, thisLink.href.length - 2);
        thisLink.href = "http://www.elnorte.com/" + newLink;
    }
}
