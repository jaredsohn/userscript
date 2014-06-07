// ==UserScript==
// @name           Tradera larger thumbnails
// @namespace      http://www.swedroid.se
// @description    Larger thumbnails at Tradera.com listings (Both in standard and Image view)
// @include        http://www.tradera.com/*
// ==/UserScript==

var thumbs_xp = "//table[@id='tblResult']//a/img";


GM_addStyle(".GM_tradera_thumb { height:auto; width:220px; }");
GM_addStyle(".itemrow .imagecol img { height:auto; width:220px; }");

//The Following removes blue border for highlighted items
GM_addStyle(".bgGalleryExtra { width:auto; border:none; }");
GM_addStyle(".highlight td { border-top:none; border-bottom:none; }");
GM_addStyle(".highlight .imagecol { border-left:none; }");
GM_addStyle(".highlight .timecol { border-right: none; }");


$x(thumbs_xp).forEach(function(img) {
	img.src = img.src.replace('gallery2', 'preview');  // Replace thumbs with full images
	img.className = "GM_tradera_thumb";  // This is for "Image view" listings
});

/* Staple functions */	

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}