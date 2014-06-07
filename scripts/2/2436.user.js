// JavaScript Document
// ==UserScript==
// @name          NYTimes Ad Avoider
// @namespace     http://3greeneggs.com
// @description   Autoscript ads on nytimes.com
// @include       http://www.nytimes.com/*
// @include       http://nytimes.com/*
// ==/UserScript==

// if this page contains an advertisement
if (document.title == "NY Times Advertisement") {
	var allLinks, thisLink;
	allLinks = document.evaluate(
    '//a[@href]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
   	thisLink = allLinks.snapshotItem(0);
	location.href = thisLink;
}