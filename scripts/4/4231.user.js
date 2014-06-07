
// ==UserScript==
// @name          Flickr Ad Removal
// @namespace     http://www45.desertfox.com/desertfoxbeta/oasis/
// @description	  Gets rid of text ads in Flickr (the ones that show up after using AdBlock to get rid of the graphical ads)
// @include       http://www.flickr.com/*
//
// A product of DesertFox Oasis, a division of Studio 17.
// ==/UserScript==

var paragraphs = document.getElementsByTagName("p");

for (var i = 0; i < paragraphs.length; i++) {
	if (paragraphs[i].innerHTML == "Ads from Yahoo!") {
		paragraphs[i].parentNode.style.display = "none";
	}
}
