// ==UserScript==
// @name Unfuck external links on Wikia
// @namespace http://draconx.ca
// @description Rewrites external links on Wikia to not require you to click through an ad page.
// @include http://*.wikia.com/*
// ==/UserScript==

(function () {
	var links = document.evaluate("//a[@class='external']", document, null,
	                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                              null);
	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		link.href = link.title;
	}
})();
