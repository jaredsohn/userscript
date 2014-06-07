// ==UserScript==
// @name           Go To Pop-Out Video Ustream
// @namespace      http://google.com
// @description    Go Directly to Pop-Out window on Ustream live videos.
// @include        http://ustream.tv/*
// @include        http://www.ustream.tv/*
// ==/UserScript==
// ==/UserScript==

/* code heavily borrowed from Dive Into Greasemonkey - http://diveintogreasemonkey.org/ */

var allLinks, thisLink;
allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink.href = thisLink.href.replace('channel','channel-popup');
}