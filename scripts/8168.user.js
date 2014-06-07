// Sueddeutsche.de Print User Script
// 2007-03-27
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
// select "Sueddeutsche.de Print", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Sueddeutsche.de Print
// @namespace     http://swanky.de/greasemonkey/
// @description   Directly link to the print version of Sueddeutsche Zeitung articles.
// @source        http://userscripts.org/scripts/show/8168
// @include       http://www.sueddeutsche.de/*
// @include       http://sueddeutsche.de/*
// @version       0.0.2
// ==/UserScript==

// Squirrels are your friends!

var all, element;

all = document.getElementsByTagName('a');

for (i=0; i < all.length; i++) {
	element = all[i];
        if (element.href.indexOf("article.html") != -1) {} else {
	        if (element.href.indexOf("/artikel/") != -1) {
		        element.href += "print.html";
		}
        }
}

// 0.0.1	Initial release.
// 0.0.2        Some tweaking.