// ==UserScript==
// @name				style.com parties photo downloader
// @description			download party photos from style.com
// @include				http://www.style.com/*
// @creator             yp
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	image_element.src = image_element.src.replace("t.jpg","m.jpg");
	}
		

var link_elements = document.getElementsByTagName('a');		
for(var i=0;i<link_elements.length;i++){
	var link_element = link_elements[i];
	link_element.href = link_element.href.replace("scoop","thumb");
	}
