// ==UserScript==
// @name           Disable LinkBucks
// @description    Prevent the LinkBucks frame from loading.
// @include        http://www.linkbucks.com/*
// @include        http://linkbucks.com/*
// ==/UserScript==

if (location.href.match(/linkbucks\.com\/link\//)) {
	var skipLink = document.getElementById("linkBucksSkip");
	if (skipLink) {
		location.href = skipLink.href;
	}
}

if (location.href.match(/linkbucks\.com\/Frameset\.aspx/)) {
	location.href = unescape(location.href.replace(/.*OrigLink=(.*)&lid=.*/, "$1"));
}
