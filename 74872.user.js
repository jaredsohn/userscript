// ==UserScript==
// @name           Edit URL
// @namespace      http://www.tw.net
// @description    Edit URLs
// @include        http://*.tw.net/*
// ==/UserScript==

var links = document.evaluate("//a[contains(@href, 'roar')]",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i=0; i<links.snapshotLength; i++) {
	var thisLink = links.snapshotItem(i);
	thisLink.href += 'alert("test");';
}