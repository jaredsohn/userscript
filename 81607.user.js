// ==UserScript==
// @name           Ipernity All Sizes Unblocker
// @namespace      http://www.hannestrapp.de
// @description    removes the invisible image blocking images on ipernity all sizes page. Uses the Flickr Image Unblocker by http://gdorn.nudio.net/greasemonkey
// @version        0.1 (Jan-20-2010)
// @author	       Hannes Trapp - www.hannestrapp.de
// @include        http://www.ipernity.com/doc/*/*/sizes
// @include        http://www.ipernity.com/doc/*/*/sizes/*
// ==/UserScript==

var divs = document.getElementsByTagName("div");

for (var i = 0; i < divs.length; i++)
	if (divs[i].className == 'document') 	//we got our man
		var photodiv = divs[i];

var image_elements = photodiv.getElementsByTagName("img");

for (var i = 0; i < image_elements.length; i++) {

	var image_element = image_elements[i];

	if (image_element.style.display == 'block')
		var blockingimage = image_element;
	else
		if (image_element.width > 239)
			var rightimage = image_element;
}

if (blockingimage)
		blockingimage.src = rightimage.src;