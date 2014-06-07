// Hello World! example user script
// version 0.1 BETA!
// 2008-10-27
// Copyright (c) 2008, Andy Geers
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
// select "Highlight PDF", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Highlight PDF
// @namespace     http://www.geero.net/
// @description   script highlight links to PDF files
// @include       *
// ==/UserScript==

// Loop over all links on the current page
var links = document.getElementsByTagName("A");
for (var i = 0; i < links.length; i ++) {
	// See if this is a link to a PDF file
	if (links[i].href.substr(-4) == '.pdf') {
		// Highlight this link
		links[i].style.backgroundColor = '#FFFF00';
		links[i].style.borderColor = '#000000';
		links[i].style.borderWIdth = '1px';
	}
}
