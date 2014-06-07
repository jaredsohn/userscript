// ==UserScript==
// @name           Remove Img Title and Alt text for eBay etc.
// @namespace      http://userscripts.org/scripts/show/42079
// @description    Remove Img Title and Alt text for eBay etc.
// @include        http://*
// @include        http://forums.ebay.com/*
// ==/UserScript==

/* Remove the alt and title text (useful when disabling images) - method utilized from http://userscripts.org/scripts/review/30956 */

var images = document.images;
var img;
for (var i = 0; i < images.length; ++i)
{
	img = images[i];
	img.title = "";
	img.alt = "";
}