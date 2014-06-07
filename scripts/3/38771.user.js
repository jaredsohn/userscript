// ==UserScript==
// @name          El Norte Sanitize Links
// @namespace     http://dweezil.be/greasemonkey
// @description   Convert Javascript to actual links for ElNorte.com and Reforma.com news sites.
// @include       http://www.elnorte.com/*
// @include       http://www.reforma.com/*
// ==/UserScript==
//
// Based on Slashdot Link New Window

var allLinks, thisLink, newLink;
var urlTag =  "javascript:escogerliga";
var urlLong = urlTag.length+6;
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
        var newLink = thisLink.href.substring (urlLong, thisLink.href.length - 3);
        thisLink.href = newLink;
    }
}

