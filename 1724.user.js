// ==UserScript==
// @name        3D Gamers - large images
// @namespace   http://www.cs.uni-magdeburg.de/~vlaube/Projekte/GreaseMonkey/
// @description Replaces thumbnails with large images
// @include     http://www.3dgamers.com/*/screenshots/
// @include     http://www.3dgamers.com/screenshots/*
// ==/UserScript==

for (var i=0; i<document.images.length; i++)
{
	// save current image
	var image = document.images[i];
	
	// skip images that are not thumbnail
	if(!image.src.match(/.*thumb_.*/i))
		continue;

	// create and add the new image
	var p = document.createElement("p");
	var newimage = document.createElement("img");
	newimage.src = image.src.replace(/^(.*)thumb_(.*)$/i, "$1$2");
	newimage.style.borderStyle = "none";
	p.appendChild(newimage);
	image.parentNode.appendChild(p);
	
	// remove the old image
	image.parentNode.removeChild(image);
}
