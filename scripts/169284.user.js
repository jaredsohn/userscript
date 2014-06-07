// ==UserScript==
// @name        FP Pepper
// @namespace   http://facepunch.com
// @description Changes the new post "checkmark" to the oify pepper (By Maksim aka Steeb)
// @version     1.0
// @include             http://www.facepunch.com/*
// @include             http://facepunch.com/*
// ==/UserScript==
// --------------------------------------------------------------------------------------------------------------------------------
// THESE POSTS ARE GONNA BE HOT.
//

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/fp\/newpost.gif/)) {
		image_element.src = image_element.src.replace("http://facepunch.com/fp/newpost.gif","http://facepunch.com/fp/oify/newpost.gif");
    	}
}