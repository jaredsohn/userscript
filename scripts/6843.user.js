// ==UserScript==
// @name          StudiVZ Image Deblocker v1.0
// @namespace     IchBins
// @description   removes transparent gif that blocks saving StudiVZ user images
// @include       http://*.studivz.net/*
// ==/UserScript==
//
//	Based on iMDB Image Deblocker (http://userscripts.org/scripts/show/628)
//	
//	Changelog v1.0:
//	- first release

var images, thisImage;
images = document.getElementsByTagName("img");

for (var i = 0; i < images.length; i++) { 
	thisImage = images[i];
	if (thisImage.getAttribute("id") == "circle") {
		var src = thisImage.getAttribute("pic")
		var newImg = document.createElement("img");
		newImg.setAttribute("src", src);
		thisImage.parentNode.replaceChild(newImg, thisImage);
	}
}