// Auto-Linker for Debian-News.net 
// 06/05/10
//
// -------------------------------------------------
// 
// This is a Greasemonkey script that automatically
// clicks the 'More here' button on.
//
// -------------------------------------------------
//
// ==UserScript==
// @name           Debian-News Redirect
// @description    auto-jumps to full story link
// @include        http://www.debian-news.net/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2009 Seraphyn

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	
	// If 'Full story' change location
	if ( thisLink.innerHTML == 'here') {
		window.location = thisLink.href;
	}
}

