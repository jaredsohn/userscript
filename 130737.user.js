// ==UserScript==
// @name           HUKD Make comment-actions visible
// @namespace      http://pgregg.com/
// @description    Make the Reply | Report | etc comment bar visible.
// @include        http://www.hotukdeals.com/*
// ==/UserScript==

var snapResults = document.evaluate("//*[@class='comment-actions']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
	elm.style.display="inline";
}


