// ==UserScript==
// @name				FAIL image nuke
// @description				yeah, it was cute in 2003
// @include				http://*.scorehero.com/*
*
// @creator             qirex
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/fail/)) {
		image_element.src = image_element.src.replace("http",".");
										
    	}
}