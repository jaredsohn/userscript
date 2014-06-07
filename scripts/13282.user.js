// ==UserScript==
// @name				flickr image-src replace v3
// @description			flickr image-src replace v3
// @include				*
// @creator             sfufoet
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/^http:\/\/farm2.static.flickr.com\/(.*)/)) {
		image_element.src = image_element.src.replace("farm2.static.flickr.com","static.flickr.com");
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/farm1.static.flickr.com\/(.*)/)) {
		image_element.src = image_element.src.replace("farm1.static.flickr.com","static.flickr.com");
	}
	if(image_element.src.toLowerCase().match(/^http:\/\/farm3.static.flickr.com\/(.*)/)) {
		image_element.src = image_element.src.replace("http://farm3.static.flickr.com/","http://farm3.static.flickr.yahoo3.akadns.net/");
	}
}

