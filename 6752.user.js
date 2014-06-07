// ==UserScript==
// @name           Squirrelmail Status
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Set Squirrelmail's Window Title to number of (new/total) messages 
// @include        https://webmail.*/src/left_main.php
// ==/UserScript==
/*

This script updates the site's title with 
number of unread vs. total messages, e.g. (3/243).
This makes sure that you always see your mailbox
status in a Firefox tab, even if the actual page 
is unfocused.

The script extracts the number of unread/total messages from
the content of the left (menu) frame of Squirrelmail and
sets the topmost frame's title to this string.

I'm not sure if this works for any installation of
Squirrelmail, apart from the one used by xs4all.nl for
their customers. YYMV!



LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.00
    - initial release

*/

function setTitle() {
	var res = document.evaluate("//small/font[@color='#000000']", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	try {
		var txt = res.snapshotItem(0).firstChild.nodeValue;
		top.document.title = txt;
	} catch(e) { }
}

setTitle();