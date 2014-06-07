// BostonGlobePrintView
// Version 1.0
// 2005-11-24
// Copyright (c) 2005, Paul Venuti
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
// select "BostonGlobePrintView", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BostonGlobePrintView
// @namespace     http://www.landlordcheck.org/namespace
// @description   Loads all Boston.com stories in print friendly mode
// @include       http://www.boston.com/*
// @include       http://boston.com/*
// ==/UserScript==

var all, element;

// Grab all the anchors

all = document.getElementsByTagName('a');

// Append print friendly query string to URL

for (i=0; i < all.length; i++)
	{
	element = all[i];
	if (element.href.indexOf("articles") != -1) {
		element.href += "?mode=PF";
		}
	}