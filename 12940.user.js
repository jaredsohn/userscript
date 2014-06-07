// ==UserScript==

// @name           SmugMug - Big Bulk Caption

// @namespace      http://nimai.smugmug.com

// @description    Enlarges the images in SmugMug's Bulk Caption tool

// @include        http://*.smugmug.com/photos/tools.mg?*&tool=bulkcaption

// ==/UserScript==

var r = /-Th\./;
var images = document.images;
for( i=0; i<images.length; ++i ) {
	var img = images[i];
	if( img.className == 'thumbs' ) {
		img.removeAttribute("width");
		img.removeAttribute("height");
		img.src = img.src.replace( r, "-S." );
	}
}
