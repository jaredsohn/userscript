// script to add ?.jpg to every link (possible "wifi-hack") see http://lifehacker.com/5040118/get-free-airport-wi+fi-with-a-simple-url-hack
// version 0.1

// 04.08.2009
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
// select "JPG-Links", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JPG-Links
// @namespace     http://www.readmore.ch
// @description   script to add ?.jpg to every link
// @include       *
// ==/UserScript==

var allLinks = document.getElementsByTagName('a');
for (var i = 0; i < allLinks.length; i++) {
	if (allLinks[i].href != '') { 
		allLinks[i].href = allLinks[i].href + '?.jpg';
	}
}
