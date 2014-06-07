// Globe and Mail Single Page View 1.1
// Based on:
// BostonGlobePrintView
// Version 1.0
// 2005-11-24
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
// select "Globe and Mail Single Page View", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Globe and Mail Single Page View
// @namespace     http://www.nintu.net/
// @description   Loads all Globe & Mail Stories in Single Page View
// @include       http://www.theglobeandmail.com*
// @include       http://theglobeandmail.com*
// @include       http://www.globeandmail.com*
// @include       http://globeandmail.com*
// ==/UserScript==

var all, element;

// Grab all the anchors

all = document.getElementsByTagName('a');

// Append print friendly query string to URL

for (i=0; i < all.length; i++)
	{
	element = all[i];
	if (element.href.indexOf("pageRequested") == -1) {
	if (element.href.indexOf("Story") != -1) {
		element.href += "?pageRequested=all";
		}}
	}
