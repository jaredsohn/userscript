
// Zooomr! this photo user script
// version 0.1 BETA!
// 2007-08-20
// Copyright (c) 2007, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Zoom this Zooomr
// @namespace     http://www.entropoli.it/grease/
// @description   Insert a link to big size photo in Zooomr photo page
// @include       http://*zooomr.com*
// ==/UserScript==

	var thisPagePhoto;
	var navbar, newElement;
	var list = document.getElementsByTagName("link");
	for (var i = 0; i < list.length; i++) {
		var img = list[i];
		var href = img.getAttribute("href");
		if (img.rel.match('image_src'))
			thisPagePhoto=href;
	}

	thisPagePhoto = thisPagePhoto.replace('_t.jpg','_b.jpg');
	navbar = document.getElementById('PhotoContainer');

	if (navbar) {
		newElement = document.createElement("a");
		newElement.setAttribute("href", thisPagePhoto);
		newElement.setAttribute("title", "Link to large size image");
		newElement.appendChild(document.createTextNode("LARGE"));
 	 navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
	}