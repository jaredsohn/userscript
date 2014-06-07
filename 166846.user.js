// ==UserScript==
// @name           CG Unbury Posts
// @namespace      http://chick3n
// @description    Automatically unbury forum posts on Cybergamer
// @include        http://www.cybergamer.com.au/forums/thread/*
// ==/UserScript==

var expandNodes = document.evaluate("//a[contains(@onclick, 'xpand')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var expandLength = new Array(expandNodes.snapshotLength).length;

var buriedNodes = document.evaluate("//div[@style='display:none;']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var buriedLength = new Array(buriedNodes.snapshotLength).length;

for (var x = (expandLength - 1); x>=0; x--) {
	expandNodes.snapshotItem(x).click();
}

for (var x=0; x<buriedLength; x++) {
	buriedNodes.snapshotItem(x).setAttribute('style', 'background:#dcccc2');
}