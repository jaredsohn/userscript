// Convert Alt Tags to Title Tags
// Version 1.0
// Thursday, January 31, 2008
// Copyright (c) 2008, Bryan Martinez
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
// select "Convert Alt Tags to Title Tags", and click Uninstall.
//
// --------------------------------------------------------------------
//

// ==UserScript==
// @name           Convert Alt Tags to Title Tags
// @namespace      http://metafourmedia.com/
// @description    Make title tags for all images with alt tags.
// @include        http*
// ==/UserScript==

// First is all images
allImages=document.getElementsByTagName('img');
for (i=0;i<allImages.length;i++) {
	if (allImages[i].alt != '') {
		allImages[i].title = allImages[i].alt;
	}
}
// Next is for image maps
allAreas=document.getElementsByTagName('area');
for (i=0;i<allAreas.length;i++) {
	if (allAreas[i].alt != '') {
		allAreas[i].title = allAreas[i].alt;
	}
}
