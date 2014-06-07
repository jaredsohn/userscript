// ==UserScript==
// @name           MDC: Breadcrumbs fix
// @namespace      http://gecko.535design.com/grease/
// @description    Fixes the sometimes-bizarre breadcrumbs shown on MDC.  e.g. On the page for DOM:document, replaces "Main Page > JS_GetProperty > JS_IdToValue" with "Main Page > DOM > document".
// @include        http://developer.mozilla.org/en/docs/*
// ==/UserScript==

window.addEventListener("load", function() {
	var idx, page, crumb, crumbs = document.evaluate('//div[@class="breadcrumbs"]//a[@class="breadcrumbs"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < crumbs.snapshotLength; i++) {
		crumb = crumbs.snapshotItem(i);
		page = decodeURIComponent(crumb.getAttribute("href").substring(9));

		if (-1 != (idx = page.lastIndexOf(":"))) page = page.substring(idx + 1);

		crumb.innerHTML = page.replace('_', ' ');
	}

	crumb = document.evaluate('//div[@class="breadcrumbs"]//span[@class="breadcrumbs"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

	if (crumb) {
		page = document.evaluate('//h1[@class="firstHeading"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML;

		if (-1 != (idx = page.lastIndexOf(":"))) page = page.substring(idx + 1);

		crumb.innerHTML = page;
	}
}, false);
