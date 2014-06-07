// ==UserScript==
// @name           Binsearch For Dummies
// @namespace      binsearch.info
// @description    Makes binsearch.info easier to use. Includes filtering results that match (german|french|a.b.nl|requires password).
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include        *binsearch.info/*
// @include        *binsearch.net/*
// @version	       1.03
// ==/UserScript==

/* 
Binsearch For Dummies - (c) 2011 Muad'Dib

This script is a combination of several functions to improve using binsearch.info.


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
1.01 - Added mp3.audiobooks, Dutch epub.
1.02 - Added floating buttons for Create NZB and script homepage.
1.03 - Added Episonic Navigation from http://userscripts.org/scripts/review/154478
*/

function episonic() {

	// iframe test
	if (window.self != window.top)
		return;

	var pattern = /\bS(\d\d)E(\d\d)\b/i
		
	var input = $("input[type=text][name=q]");
	var query = input.val();
	var match = query.match(pattern);

	// break if no match for episode in query
	if (!match || match.length != 3)
		return;

	var nextLink = $("<a href='javascript:;'></a>");
	var prevLink = $("<a href='javascript:;'></a>");

	input.after(" ] ");
	input.after(nextLink);
	input.after(" | ");
	input.after(prevLink);
	input.after(" [ ");

	var origEp = match[0];  // full: "s01e05"
	var origS = match[1];   // season: "01"
	var origE = match[2];   // episode: "05"

	var nextE = parseInt(origE, 10) + 1;
	var prevE = parseInt(origE, 10) - 1;

	if (prevE < 0) prevE = 0;
	if (nextE < 10) nextE = "0" + nextE;
	if (prevE < 10) prevE = "0" + prevE;

	prevLink.html("<small>&#9668;</small> s" + origS + "e" + prevE);
	nextLink.html("s" + origS + "e" + nextE + " <small>&#9658;</small>");

	var prevEp = query.replace(origEp, "s" + origS + "e" + prevE);
	var nextEp = query.replace(origEp, "s" + origS + "e" + nextE);

	prevLink.click(function() {
		input.val(prevEp);
		input.parents("form:first").submit();
	});

	nextLink.click(function() {
		input.val(nextEp);
		input.parents("form:first").submit();
	});

}

setRow = function(row, check) {
	row.setAttribute("title", "Click to " + ((check) ? "remove from" : "add to") + " selection");
	row.style.color = ((check) ? "#c00" : ""); // empty string reverts color rather than losing the stripes
	row.style.backgroundColor = ((check) ? "#bcd" : "");
	row.className = (check) ? 'selected' : '';
	row.getElementsByTagName("input")[0].checked = check;
}

function bs_rowsClickable() {

	var langFilterRegex = /(german|french|a.b.nl|requires password|nordic|mp3.audiobooks|Dutch epub)/;

	// add hover effect
	var sty = document.styleSheets[document.styleSheets.length - 1];
	sty.insertRule("form p table tr:hover { background-color: #ffb ! important; }", 0);
	sty.insertRule("form p table tr.selected:hover { background-color: #fd7 ! important; }", 0);

	var rows = document.evaluate("//table//form/p/table/tbody/tr", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < rows.snapshotLength; i++) {
		var r = rows.snapshotItem(i);

		if (langFilterRegex.test(r.innerHTML.toLowerCase()))
		{
			r.parentNode.removeChild(r);
			//r.innerHTML.toLowerCase().match(langFilterRegex)[1];
			continue;
		}
		
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
	
	var chks = document.getElementsByTagName('input');
	var l = chks.length;

	for (var i=0, m=chks.length; i<m; i++)
	{
		var chb = chks[i];
		if (chb.type == 'checkbox' && !isNaN(chb.name))
		{
			var link = document.createElement('span');
			link.innerHTML = '<a href="/?action=nzb&' + chb.name + '=1">download</a> - ';

			var bf = chb.parentNode.parentNode.getElementsByTagName('a');

			if (bf.length)
			{
				bf[0].parentNode.insertBefore(link, bf[0]);
			}
		}
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

if (document.location.href.indexOf('browse.php') > -1 || document.location.href.indexOf('?q=') > -1) {
	newElement = document.createElement('div');
	newElement.setAttribute('id', 'floatingsubmit');
	var theLoc = document.location.href.indexOf('?q=')
	var thisURL =  "/fcgi/nzb.fcgi" + document.location.href.substr(theLoc, document.location.href.length-1)
	newElement.setAttribute('style', 'position:fixed; top: 77px; left:5px; -moz-border-radius: 10px; background-color:#67CDFC; padding:5px; border-color:#0; border-width:10px;');
	newElement.innerHTML = '<input type="button" value="Create NZB" onclick="document.forms[\'r\'].submit();"> <input type="button" value="BFD" onclick="window.open(\'http://userscripts.org/scripts/show/155438\')">';
	document.body.appendChild(newElement);
}
bs_rowsClickable();
episonic();