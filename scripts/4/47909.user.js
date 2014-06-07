// ==UserScript==
// @name           SG ImageResizer
// @namespace      TranForsythe
// @description    On the SG forums, proportionally reduces image size if width is > 824px.
// @include        http://shadowgirlscomic.freeforums.org/*
// ==/UserScript==

function resizeImages(maxWidth) {
	var images, idx;
	
	images = document.getElementsByTagName("img");
	
	for(idx=0; idx < images.length; idx++) {
		var image  = images[idx];

		var width = image.width;
		
		if (width > maxWidth) {
			var percent = width/maxWidth;

			image.width = width/percent;
			image.height = image.height/percent;
		}
	}
}

resizeImages(824);