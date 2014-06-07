// ==UserScript==
// @name				simple facebook large profile thumbnails
// @description			large profile thumbs
// @include				http://www.facebook.com/*
// @creator             yp
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace("/s","/n");
	}