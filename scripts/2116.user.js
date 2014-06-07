// ==UserScript==
// @name           Mechanical Turk HIT Auto Accept
// @namespace      http://dunck.us/code/greasemonkey
// @description    Automatically accept HITs on Amazon's Mechanical Turk
// @include        http://www.mturk.com/mturk/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Jeremy Dunck

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/copyleft/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

ls = xpath("//a[starts-with(@href, '/mturk/accept')]");

if (ls.snapshotLength > 0) {
  window.location.href=ls.snapshotItem(0).href;
}