// Google IG Title Link New Window
// version 1.0
// 2005-09-21
// Copyright (c) 2005, Randall Wald
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Google IG Title Link New Window
// @description Makes the title links on Google IG open in a new window
// @include http://*.google.com/ig
// ==/UserScript==

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@class="mttli"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	thisLink.target = '_blank';
	}
