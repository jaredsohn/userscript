/* vim: ts=4 noet ai :
$Id: squirrelmaileasyclick.user.js 86 2006-10-16 18:33:39Z joe $

Binsearch.info Easy Click - (c) 2006 J.Q. la Poutre

This script makes every row in a Squirrelmail list page clickable
in order to select/deselect the corresponding checkbox.


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

Version 1.01
	- fixed problem with wrapped lines, duh!

Version 1.00
	- initial release, based on binsearcheasyclick

*/
// ==UserScript==
// @name           Squirrelmail easyclick
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Extends checkbox clicks to full table row
// @include        https://webmail.xs4all.nl/src/right_main.php*
// @version	       1.01
// ==/UserScript==


function bs_rowsClickable() {
	var rows = document.evaluate("//tr[td/input[@type='checkbox']]",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);
		r.addEventListener("click", function(evt) {
			var inp = this.getElementsByTagName("input")[0];
			if (evt.target != inp) inp.checked = !inp.checked;
			this.setAttribute("title", "Click to " + 
				((inp.checked) ? "remove from" : "add to") + " selection");
			this.style.color = ((inp.checked) ? "#c00" : "black");
			this.style.backgroundColor = ((inp.checked) ? "#ffc" : "white");
			evt.stopPropagation();
		}, true);
		r.setAttribute("style", "cursor:pointer");
		r.setAttribute("title", "Click to add to selection");
		// remove silly hover effect
		r.removeAttribute("onmouseover");
		r.removeAttribute("onmouseout");
	}
}

// override page function to inverse selected checkboxes,
// simulate mouseclicks by dispatching a click event to every checkbox.
/*
unsafeWindow.inverse = function($f) {
	for ($i=0; $i < $f.elements.length; $i++)
	{
		if ($f.elements[$i].type == "checkbox")
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window,
				0, 0, 0, 0, 0, false, false, false, false, 0, null);
			$f.elements[$i].dispatchEvent(evt);
		}
	}
}
*/

// apply
bs_rowsClickable();

// end user script

