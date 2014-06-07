// ==UserScript==
// @name	phpBB No GIF
// @description	Removes offsite .GIF images from pages believed to be phpBB
// @version	0.1
// @date	2006-06-28
// @creator	Alexi Kostibas (alexi@kostibas.com)
// @include	http://*
// 
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------

// Determine if the current page is a phpBB page
function ngIsPhpbb() {
	var links = document.links;
	
	for (x = 0; x < links.length; x++) {
		if (links[x].innerHTML.match("phpBB") != null) {
			if (links[x].target.match("_phpbb") != null) {
				return true;
			}
		}
	}
	
	return false;
}

// Effectively remove all GIFs from the current page
function ngStripGifs() {
	var x;
	
	// Iterate through all images
	for (x = document.images.length - 1; x >= 0; x--) {

		var image = document.images[x];
		var host  = window.location.hostname;
		
		if (image.src.match(".gif") != null) {
			if (image.src.match(host) == null) {
				image.width = 0;
				image.height = 0;
			}
		}
	}
}

if (ngIsPhpbb()) {
	ngStripGifs();
}

