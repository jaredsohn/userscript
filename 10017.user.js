// ==UserScript==
// @name           Single page NZ Herald stories
// @namespace      http://lieschke.net/projects/greasemonkey/
// @description    Displays NZ Herald stories on a single page. Rewrites NZ Herald story links so they appear on a single page. Detects and reloads stories opened from external links so they display on a single page.
// @include        http://www.nzherald.co.nz/*
// ==/UserScript==

(function() {
	var singlePageLink = document.evaluate('//a[text()="View as one page"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (singlePageLink != null) {
		window.location.replace(singlePageLink.href);
		return;
	}
	var links = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < links.snapshotLength; i++) {
		links.snapshotItem(i).href = links.snapshotItem(i).href.replace(/(.*[article|story].cfm\?c_id=\d+&objectid=\d+)/, '$1&pnum=0');
	}
})();