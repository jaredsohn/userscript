/* vim: ts=4 noet ai :
$Id: $

Binsearch Easy Click - (c) 2006 - 2009 Johannes la Poutre

This script makes every row in a binsearch result page clickable in order to select/deselect the corresponding checkbox.


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

Version 1.04 - 27 April 2009
	Added alias domain binsearch.net to include rules

Version 1.03 - 20 April 2007
	Improvements again by Scott Lees
	- improved the shift-click to select multiple rows 
	- improved color scheme to make selections better stand out

Version 1.02 - 16 April 2007
	Improvements by Scott Lees - thanks!
	- implemented the shift-click to select multiple rows 
	- disabled row-toggling if you click on a link element within the row

Version 1.01 - 20 July 2006
	- improved click handling
	- better css styling

Version 1.00 - 13 April 2006
	- initial release

*/
// ==UserScript==
// @name           Binsearch easyclick
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Extends checkbox clicks to full result row 
// @include        *binsearch.info/*
// @include        *binsearch.net/*
// @version	   1.04
// ==/UserScript==

setRow = function(row, check) {
	row.setAttribute("title", "Click to " + ((check) ? "remove from" : "add to") + " selection");
	row.style.color = ((check) ? "#c00" : ""); // empty string reverts color rather than losing the stripes
	row.style.backgroundColor = ((check) ? "#bcd" : "");
	row.className = (check) ? 'selected' : '';
	row.getElementsByTagName("input")[0].checked = check;
}

function bs_rowsClickable() {
	// add hover effect
	var sty = document.styleSheets[document.styleSheets.length - 1];
	sty.insertRule("form p table tr:hover { background-color: #ffb ! important; }", 0);
	sty.insertRule("form p table tr.selected:hover { background-color: #fd7 ! important; }", 0);

	var rows = document.evaluate("//table//form/p/table/tbody/tr", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);

		r.addEventListener("click", function(evt) {
			if (evt.target.tagName == "A") { return false; } // ignore clicks on anchors
			var inp = this.getElementsByTagName("input");
			if (inp.length == 0) { return; } else { inp = inp[0]; }
			if (evt.target != inp) inp.checked = !inp.checked;
			setRow(this, inp.checked);
			if (evt.shiftKey && unsafeWindow.$last) { // handle shift-clicks
				window.getSelection().removeAllRanges(); // clear selected text
				var shiftRows = document.getElementById('r2').getElementsByTagName("tr");
				s = false;
				counter = 0;
				for (j = 1; j < shiftRows.length; j++) {
					var thisrow = shiftRows[j];
					var thisInp = thisrow.getElementsByTagName("input");
					if (thisInp.length == 0) { continue; } else { thisInp = thisInp[0]; }
					if (thisInp.name == inp.name || thisInp.name == unsafeWindow.$last) {
						setRow(thisrow, inp.checked);
						s = !s;
						if (counter >= 1) { break; }
						counter += 1;
					}
					if (s)
						setRow(thisrow, inp.checked);
				}
			}
			
			unsafeWindow.$last = inp.name; // store clicked row for next time
			
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

// apply
bs_rowsClickable();
// end user script