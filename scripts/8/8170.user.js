// FoundMagazine.com Show Comments User Script
// 2007-03-26
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
// select "FoundMagazine.com Show Comments", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FoundMagazine.com Show Comments
// @namespace     http://swanky.de/greasemonkey/
// @description   Automatically displays the comments on this lovely site.
// @source        http://userscripts.org/scripts/show/8170
// @include       http://*.foundmagazine.com/*
// @include       http://foundmagazine.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

if (!/(foundmagazine)/.test(document.referrer)) {
	if (window.location.href.match('/find/')) {
        	window.location.replace(window.location.href.replace('find', 'comments'));
        }
}

var all, element;

all = document.getElementsByTagName('a');

for (i=0; i < all.length; i++) {
	element = all[i];
        if (element.href.indexOf('/find/') != -1) {
        	element.href = element.href.replace ('find', 'comments');
	}
}

// 0.0.1	Initial release.