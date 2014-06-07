// ==UserScript==

// @name           Expand Operatorchan Images

// @namespace      http://userscripts.org/users/97372

// @description    Expands images by default at this site

// @include        http://operatorchan.org/*
// ==/UserScript==


var ratio;
var image_elements = document.getElementsByTagName('img');
var a_elements = document.getElementsByTagName('a');
for(var i=0; i<image_elements.length; i++) {
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace("thumb","src");
	image_element.src = image_element.src.replace("s.jpg",".jpg");


	var InnerWidth = window.innerWidth;
	var InnerHeight = window.innerHeight;
	if(image_element.src.substring(1,4) != "css" && image_element.src != 

"http://www.operatorchan.org/inc/rotation.php"){
		image_element.removeAttribute('height');
		image_element.removeAttribute('width');
	}
}
