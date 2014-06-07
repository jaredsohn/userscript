//
// Copyright (c) 2005, Vlajbert
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
// select "AtomFilms Friendly Video", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AtomFilms Friendly Video
// @namespace     http://vlajbert.blogspot.com
// @description   Removes video ads from AtomFilms.com.
// @include       http://www.atomfilms.com/*
// @version       0.0.2
// ==/UserScript==

(function() {
	document.cookie = 'reg_popup=1; expires=Sat, 1 Jan 2050 00:00:00 UTC; path=/; domain=atomfilms.com';
	try {
		clearTimeout( timeout);
		clearTimeout( errorTimeout);
		showContent();
	} catch( e) {}
})();

// 0.0.1	Origional release.
// 0.0.2	Found a far easier way to skip the ad.