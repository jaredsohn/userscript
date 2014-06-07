// Jerusalem Post Print User Script
// 2007-04-27
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
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
// select "jpost.com Print", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Jerusalem Post Print
// @namespace     http://swanky.de/greasemonkey/
// @description   Directly link to the print version of jpost.com articles.
// @source        http://userscripts.org/scripts/show/8878
// @include       http://*.jpost.com/*
// @include       http://jpost.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

var all, element;

all = document.getElementsByTagName('a');

for (i=0; i < all.length; i++) {
	element = all[i];
        if (element.href.indexOf('&pagename=JPost%2FJPArticle%2FShowFull') != -1) {
        	element.href = element.href.replace ('ShowFull', 'Printer');
	}
}