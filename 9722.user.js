// ==UserScript==
// @name				move flickr image to imgred
// @description			move flickr image to imgred
// @include				*
// @creator             sfufoet
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/^http:\/\/farm2.static.flickr.com\/(.*)/)) {
		image_element.src = "http://imgred.com/tn/"+image_element.src
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/farm1.static.flickr.com\/(.*)/)) {
		image_element.src = "http://imgred.com/tn/"+image_element.src
	}
}

