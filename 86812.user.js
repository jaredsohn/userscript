// GC-Bookmarks.user.js
// version 0.1 BETA!
// 25.09.2010
// Copyright (c) 2010, neisgei
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
// select "GC-Bookmarks", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name GC Bookmarks
// @namespace http://www.c-dev.ch/
// @description bookmark manager for geocaching.com
// @version 0.1
// @include http://www.geocaching.com/*
// ==/UserScript==

//alert('Hello world!');

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	var Ergebnis = String(thisLink).search(/bookmark/);
	if (Ergebnis != -1)
		GM_log(thisLink);
}
GM_log('END');