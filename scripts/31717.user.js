// ==UserScript==
// @name          Stack Overflow External Links
// @namespace     http://www.adamfort.com
// @description   Rewrite Stack Overflow external links to open in a new window.
// @include http://beta.stackoverflow.com/*
// @include http://www.stackoverflow.com/*
// @include http://*.stackoverflow.com/*
// ==/UserScript==

var StackOverflowHost = window.location.host;

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);

	thisLink.target = "_blank"


}