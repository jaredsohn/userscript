// ==UserScript==
// @name           Flickr image unblocker
// @namespace      http://gdorn.nudio.net/greasemonkey
// @description    A script to remove the invisible image blocking images on flickr
// @include        *flickr.com*
// ==/UserScript==

var divs = document.getElementsByTagName("div");

for (var i = 0; i < divs.length; i++)
	if (divs[i].className == 'photoImgDiv') 	//we got our man
		var photodiv = divs[i];
		
if (!photodiv)
	return;

var image_elements = photodiv.getElementsByTagName("img");

for (var i = 0; i < image_elements.length; i++) {

	var image_element = image_elements[i];

	if (image_element.style.display == 'block')
		var blockingimage = image_element;
	else
		var rightimage = image_element;

}

if (blockingimage)
		blockingimage.src = rightimage.src;
