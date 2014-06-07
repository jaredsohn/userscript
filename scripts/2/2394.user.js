// ==UserScript==
// @name          hun videos
// @namespace     http://www.thehun.net/
// @description	  Highlight video links on thehun.net
// @include       http://*.thehun.*/*
// ==/UserScript==
// Notes:
//   * is a wildcard character


const TEXTNODE 		= 3;

// get all of the links in the document
links = document.getElementsByTagName("a");

// if the link is a pr0n link or not
// applied to the link text
// happens to match the date links at the bottom, but that's fine
sexLink = new RegExp("^(January|February|March|April|May|June|July|August|September|October|November|December)");

// ok words - designed to counteract the badlink words, but not good enough to flag
goodLink = new RegExp("(vid|movie|clip)", "i");

// loop through all of the links
for ( var i = 0, link; link = links[i]; i++ ) {

	// the links we care about just have one child (text) node
	var linkTextNode = links[i].childNodes[0];
	if ( linkTextNode.nodeType == TEXTNODE ) {

		// is it a sex link
		if ( sexLink.test(linkTextNode.nodeValue) ) {

			link.target = '_blank';

			// good words exist only to not get blocked by bad words
			if ( goodLink.test(linkTextNode.nodeValue) ) {
				link.style.background = '#FCFCDF';
			}
		}
	}
}

// strip out all of the images
images = document.getElementsByTagName("img");
for ( var i = 0, img; img = images[i]; i++ ) {
	images[i].style.display = "none";
}
