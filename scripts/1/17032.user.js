// ==UserScript==
// @name          Blocket larger thumbnails
// @namespace     http://henrik.nyh.se
// @description   Larger thumbnails (120 rather than 60 pixels in height) in Blocket.se listings.
// @include       http://www.blocket.se/*
// ==/UserScript==

var thumbs_xp = '//td[@class="middle_left"]/parent::tr//a/img';

GM_addStyle(
	".GM_blocket_thumb { height:120px; width:auto; }"
);

$x(thumbs_xp).forEach(function(img) {
	img.src = img.src.replace('/thumbs', '/images');  // Replace thumbs with full images
	img.className = "GM_blocket_thumb";
});

/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
