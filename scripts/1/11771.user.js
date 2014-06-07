// ==UserScript==
// @name	Yahoo! Fantasy Football URL Target Fixer
// @namespace	http://www.flawlesswalrus.com/
// @include	http://football.fantasysports.yahoo.com/*
// @description	This re-writes Yahoo!'s link targets from "sports" to "_blank".
// ==/UserScript==

/*
Yahoo! Fantasy Football URL Target Fixer.

This re-writes Yahoo!'s link targets from "sports" to "_blank".  This allows the links to open in a new Firefox tab instead of a new window.

Copyright (C) 2007 Dan Russell

This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
This General Public License does not permit incorporating your program into proprietary programs. If your program is a subroutine library, you may consider it more useful to permit linking proprietary applications with the library. If this is what you want to do, use the GNU Library General Public License instead of this License.
*/

var allLinks, thisLink;
allLinks = document.evaluate(
	'//a[@href]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	// do something with thisLink
	if(thisLink.target == "sports"){
		thisLink.target="_blank";
	}
}

