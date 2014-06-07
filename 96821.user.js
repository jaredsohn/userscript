// Left mouse clicks are so 1998
// version 1.1
// 2011-02-14
// Link for self: http://userscripts.org/scripts/show/96821
// Idea from: http://userscripts.org/scripts/show/1401
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that opens links after you hover
// over them for a second (without clicking).
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Left mouse clicks are so 1998
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   hover over links for a second to open
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @version       1.1
// @include       *
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

function mouseover() {
	time = 0.9E3; // if 0.9 seconds is too fast for you, modify the value before the "E3"
	link = this;
	if (link.title) { // if the link has a tooltip, give some time to check it out
		time *= 2;
	}
	timeout = window.setTimeout(autoclick, time);
}

function clear() {
	link = null;
	if (timeout) {
		window.clearTimeout(timeout);
	}
}

function autoclick() {
	if (!timeout) { 
		return;
	}
	document.location = link.href;
}


for (i in document.links) {
	l = document.links[i];
	if (l.href && l.href.indexOf('javascript:') == -1 && l.href != document.location + '#') {
                // FIXME see bottom, still sort of a hack, but well...
		l.addEventListener('mouseover', mouseover, true);
		l.addEventListener('mouseout', clear, true); // all events that should stop the mouseover event listener
		l.addEventListener('click', clear, true);
		l.addEventListener('mousedown', clear, true);
		l.addEventListener('mouseup', clear, true);
		l.addEventListener('contextmenu', clear, true);
	}
}

/*
Old changelog
2005-07-08 - 0.2 - MAP - fixed bug opening links that contain images
			filtered out non-followable javascript: links
2005-07-08 - 0.1 - MAP - initial release

New changelog
2011-02-12 - 1.0 - (long name) - now opens in the same window, not in a new tab
				reduced to a second
				added HTTPS support
2011-02-14 - 1.1 - (long name) - if the link has a tooltip, give us a bit more time
				to check it out
				Support for all protocols (not only HTTP/HTTPS) added

TODO: find a way so that we do the onclick event instead of always visiting the href location

XXX: check how to disable this if the element has other event listeners for onmouseover

TODO: achieving jQuery's .live functionality for document.links, just w/o jQuery

*/