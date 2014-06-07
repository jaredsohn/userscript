n.// ==UserScript==

// @name           Expand Paws.ru Images

// @namespace      

// @description    Expands images by default at this site

// @include        http://paws.ru/*
// ==/UserScript==


var ratio;
var image_elements = document.getElementsByTagName('img');
for(var i=0; i<image_elements.length; i++) {
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace("fc/thumb","src");
	image_element.src = image_element.src.replace("f/thumb","src");
	image_element.src = image_element.src.replace("flash/thumb","src");
	image_element.src = image_element.src.replace("paws/thumb","src");
	image_element.src = image_element.src.replace("dis/thumb","src");

	var InnerWidth = window.innerWidth;
	var InnerHeight = window.innerHeight;
	if(image_element.src.substring(16,19) != "fcp" && image_element.src != 

"http://paws.ru/paws_300x1000_2.jpg"){

		ratio = Math.min(InnerWidth / image_element.width, InnerHeight / image_element.height);
		image_element.removeAttribute('height');
		image_element.removeAttribute('width');
	}
}
