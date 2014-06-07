// ==UserScript==

// @name           Expand FChan Images

// @namespace      http://userscripts.org/users/97372

// @description    Expands images by default at this site

// @include        http://fchan.me/*
// ==/UserScript==


var ratio;
var image_elements = document.getElementsByTagName('img');
for(var i=0; i<image_elements.length; i++) {
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace("ah/thumb","src");
	image_element.src = image_element.src.replace("f/thumb","src");
	image_element.src = image_element.src.replace("m/thumb","src");
	image_element.src = image_element.src.replace("h/thumb","src");
	image_element.src = image_element.src.replace("s/thumb","src");
	image_element.src = image_element.src.replace("toon/thumb","src");
	image_element.src = image_element.src.replace("a/thumb","src");
	image_element.src = image_element.src.replace("c/thumb","src");
	image_element.src = image_element.src.replace("s_","_");
	image_element.src = image_element.src.replace("s.",".");

	var InnerWidth = window.innerWidth;
	var InnerHeight = window.innerHeight;
	if(image_element.src.substring(16,19) != "fcp" && image_element.src != 

"http://fchan.me/random_banner.pl"){

		ratio = Math.min(InnerWidth / image_element.width, InnerHeight / image_element.height);
		image_element.removeAttribute('height');
		image_element.removeAttribute('width');
	}
}
