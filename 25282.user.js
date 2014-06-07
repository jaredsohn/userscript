// RedPhotos
// version 0.1 
// 2008-02-15
// Copyright (c) 2008, Jeff Winkler, http://jeffwinkler.net
// Inspired by Michael Roufa's http://userscripts.org/scripts/show/21365
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
// select "RedPhotos", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedPhotos
// @namespace     http://www.jeffwinkler.net/greasemonkey/
// @description   Show photos around a property.
// @include       http://www.redfin.com/stingray/do/printable-listing*
// ==/UserScript==


function show() {
var loc = "http://loc.alize.us/#/geo:" +unsafeWindow.g_listing.latitude +"," +unsafeWindow.g_listing.longitude+ ",16,m/";

	var div = document.createElement('div');
	var anc = document.createElement('a');
	anc.target = '_new';
	anc.href = loc;
	anc.innerHTML = "Photos";
	div.appendChild(anc);
	var sibling = document.getElementById('address_line_2');
	sibling.parentNode.insertBefore(div, sibling.nextSibling);
}

show();