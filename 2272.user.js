//
// ==UserScript==
// @name			MySpace Big Images
// @author			Eric Gregory
// @namespace			http://www.mrericsir.com/stuff/MySpace_BigImages.user.js
// @description			Makes those little tiny thumbnails on MySpace bigger; saves you money on glasses
// @include			http://*.myspace.com/*
// @include			http://myspace.com/*
// ==/UserScript==
//

//
// based on Charlie Cheever's script "FacebookSpyGlass" that can be found here:
// http://www.ccheever.com/userscripts/facebookspyglass.user.js
//

//
// based on Brian Pilnick's script "TheFacebook Image Linker" that can be found here: 
// http://www.andrew.cmu.edu/user/bpilnick/greasemonkey/TheFacebookImageLinker.user.js
//


// declare variables
var smallPhotos, originalImage, bigImage;


// get list of small photos
smallPhotos = document.evaluate("//img[contains(@src, '_s.jpg')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// iterate through list
for (var i = 0; i < smallPhotos .snapshotLength ; ++i ) {

	originalImage = smallPhotos.snapshotItem(i);

	// create a new image
	bigImage = document.createElement("img");

	// replace the relevant filename character
	bigImage .setAttribute("src", originalImage.src.replace("_s.jpg", "_m.jpg") );

	// swap the new image in and the old one out
	// this method also gets rid of width and other tags
	originalImage.parentNode.replaceChild(bigImage, originalImage);
}



