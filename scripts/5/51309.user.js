// ==UserScript==
// @name           EDN ImageResizer
// @namespace      funDiva
// @description    On the EDN forums, proportionally reduces image size if width is > 400px.
// @include        http://www.exoticdancernet.com/*
// ==/UserScript==

function resizeImages(maxWidth) {
	var images, idx;
	
	images = document.getElementsByTagName("img");
	
	for(idx=0; idx < images.length; idx++) {
		var image  = images[idx];

		var width = image.width;
		var height = image.height;
		
		if (width > maxWidth) {
			var percent = width/maxWidth;

			image.width = width/percent;
			image.height = height/percent;
		}
	}
}

resizeImages(400);