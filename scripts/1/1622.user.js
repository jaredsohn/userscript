// ==UserScript==
// @name           Tradera thumbnails for all picture listings
// @namespace      http://henrik.nyh.se
// @description    Thumbnail instead of camera icon for all picture listings in Tradera.com search results and categories. Idea inspired by John Plsek's "ebaySearchPictures".
// @include        http://www.tradera.com/*
// ==/UserScript==

/* TODO:
	- if several images, rotate? */

var thumbRE = /http:\/\/images\.tradera\.com\/\d+\/[\d_]+\.jpg/;
// contains() since ends-with() is broken
var imgs = $x("//img[contains(@src, '/itemAreaNoThumb.png') or contains(@src, '/itemAreaNoThumbMini.png') or contains(@src, '/images/icon_pic.gif')]");

imgs.forEach(function(img) {
	
	with (img) {
		removeAttribute('width');
		removeAttribute('height'); 
		style.maxWidth = style.maxHeight = '64px';
	}
	
	(function(img) {
		GM_xmlhttpRequest({
			method:"GET",
			url:img.parentNode.href,
			onload:function(result) {
				img.src = result.responseText.match(thumbRE);
			}
		});
	})(img);
	
});


/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
