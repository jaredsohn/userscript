// script to add the title attribute to images (based on the alt-attribute)
// version 1.1
// Changes from 1.0:
// -added check for emptiness of the target attribute

// 24.09.2006
// Copyright (c) 2006, Stefan Oderbolz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Image Titles", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Image Title
// @namespace     http://www.readmore.ch
// @description   script to add the title attribute to images (based on the alt-attribute)
// @include       *
// ==/UserScript==

var allImgs = document.getElementsByTagName('img');
for (var i = 0; i < allImgs.length; i++) {
	if (allImgs[i].title == '') { 
		allImgs[i].title = allImgs[i].alt;
	}
}