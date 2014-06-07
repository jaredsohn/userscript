// ==UserScript==
// @name          DrudgeReport Image Resizer
// @namespace     
// @description	  Prevents the Drudge Report from doing image resizing.
// @include       http://drudgereport.com/*
// @include       http://www.drudgereport.com/*
//
// ==/UserScript==

for (var j = 0; j < document.images.length; j++)
{
	var img = document.images[j];
	img.width = img.naturalWidth;
	img.height = img.naturalHeight;
}
