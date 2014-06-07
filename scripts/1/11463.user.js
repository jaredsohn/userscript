// version 1.0
// 2007-08-16
// Copyright (c) 2007, Martin Samuelsson
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
// select "Helgon welcome image rewrite", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Helgon welcome image rewrite
// @namespace     http://www.ch.lugn.nu/greasemonkey/helgonimage
// @description   Makes the login screen on helgon.net always welcoming
// @include       http://*helgon.net/
// ==/UserScript==

window.addEventListener('load', function() { 

	var allImages, thisImage;

	allImages = document.evaluate('//img[@src]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	thisImage = allImages.snapshotItem(0);
	thisImage.src = "picz/Frontperson4.jpg";
	thisImage.alt = "Thrashcan och Vampyrotica";
	thisImage.title = "Thrashcan och Vampyrotica";

}, true);

