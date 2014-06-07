
// AutoClick
// version 0.2 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that opens links in a new tab
// after you hover over them for 1.5 seconds (without clicking).
//
// To install, you need Greasemonkey 0.4 or later.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          AutoClick
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   hover over links for 1.5 seconds to open in a new tab
// @include       http://*
// @exclude       http://mail.google.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

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

function mouseover(event) {
    document._clickTarget = event.currentTarget;
    document._autoclickTimeoutID = window.setTimeout(autoclick, 1500);
}

function mouseout(event) {
    document._clickTarget = null;
    if (document._autoclickTimeoutID) {
	window.clearTimeout(document._autoclickTimeoutID);
    }
}

function clear(elmLink) {
    if (!elmLink) { return; }
    elmLink.removeEventListener('mouseover', mouseover, true);
    elmLink.removeEventListener('mouseout', mouseout, true);
    elmLink.removeEventListener('click', click, true);
}

function click(event) {
    var elmLink = event.currentTarget;
    if (!elmLink) { return false; }
    clear(elmLink);
    mouseout(event);
    return true;
}

function autoclick() {
    if (!document._clickTarget) { return; }
    GM_openInTab(document._clickTarget.href);
    clear(document._clickTarget);
}

if (typeof GM_openInTab != 'undefined') {
    for (var i = document.links.length - 1; i >= 0; i--) {
	var elmLink = document.links[i];
	if (elmLink.href && elmLink.href.indexOf('javascript:') == -1) {
	    elmLink.addEventListener('mouseover', mouseover, true);
	    elmLink.addEventListener('mouseout', mouseout, true);
	    elmLink.addEventListener('click', click, true);
	}
    }
}

//
// ChangeLog
// 2005-07-08 - 0.2 - MAP - fixed bug opening links that contain images
//                          filtered out non-followable javascript: links
// 2005-07-08 - 0.1 - MAP - initial release
//
