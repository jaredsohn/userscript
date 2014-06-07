// Auto-Linker for fsdaily articles
// 15/06/09
//
// -------------------------------------------------
// 
// This is a Greasemonkey script that automatically
// clicks the 'Full story »' link on fsdaily pages
// to skip the preview and go straight to the full
// article. It's mainly useful for people that follow
// fsDaily's RSS feed and are annoyed with having to
// always click this link to get to the actual article.
// The code used below can easily be adapted to any other
// web page that has a similar preview linking
// system but does not provide elementIDs. For that
// take a look at the 'Digg RSS Redirect'
//
// -------------------------------------------------
//
// ==UserScript==
// @name           fsDaily RSS auto-clicker
// @description    auto-jumps to full story link
// @include        http://www.fsdaily.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2009 Oliver Schmid

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
	if ( thisLink.innerHTML == 'Full story »') {
		window.location = thisLink.href;
	}
}
