// ==UserScript==
// @name				flickr image-src replace
// @description			replace image-src on flickr
// @include				*
// @creator             terababy
// @namespace           http://terababy.blogspot.com/
// modify by            sfufoet
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/^http:\/\/farm2.static.flickr.com\/(.*)/)) {
		image_element.src = image_element.src.replace("farm2.static.flickr.com","69.147.123.56");
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/farm1.static.flickr.com\/(.*)/)) {
		image_element.src = image_element.src.replace("farm1.static.flickr.com","68.142.213.135");
	}
}