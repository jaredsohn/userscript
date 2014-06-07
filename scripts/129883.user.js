// ==UserScript==
// @name           Medscape - Show All
// @description    Show all parts of a section of article by default
// @include        http://search.medscape.com/reference-search?*
// @include        http://emedicine.medscape.com/article/*
// ==/UserScript==

var allLinks, thisLink;
xpath = '//a[not(contains(@href, "javascript"))]';
allLinks = document.evaluate(xpath,document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.href = thisLink.href + "#showall";
}