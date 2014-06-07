// Swedvdr Compact List 1.0

// ==UserScript==
// @name          Swedvdr Compact List
// @namespace     http://determinist.org/greasemonkey/
// @description   Squeezes the width of torrentlistings

// @include       http://swedvdr.org/req.php*
// @include		  http://www.swedvdr.org/req.php*
// @include       http://swedvdr.org/browse.php*
// @include		  http://www.swedvdr.org/browse.php*

// ==/UserScript==

/*

Idea by RallyRulle:
http://swedvdr.org/forums.php?action=viewtopic&topicid=7151

Changelog:

2006-12-04	1.0
	* First version
	
*/

/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function foreachxp(xp, fc, context) {
	var els = xpath(xp);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
			fc(el);
		}
	}
}

function xpathOne(query, context) {
	return xpath(query, context).snapshotItem(0);
}

function removeWithXP(query, context) {
	var els, el, i;
	
	els = xpath(query, context);
	for (i = 0; el = els.snapshotItem(i); i++)
		el.parentNode.removeChild(el);
}

function $(id) {
	return document.getElementById(id);
}

function txtNode (txt) {
	return document.createTextNode(txt);
}

function newEl(type) {
	return document.createElement(type);
}

function removeEl(node) {
	node.parentNode.removeChild(node);
}

function markNode(node) {
	node.style.border = "3px solid red ! important";
	node.setAttribute('id', 'marked');
}

function getHeaderIndex(table, headerRegexp) {
	var headerCells = xpath("./*/tr[1]/td", table);

//	GM_log(headerCells.snapshotLength);
	var i;
	for (i = 0; i < headerCells.snapshotLength; i++) {
		var cell = headerCells.snapshotItem(i);
//		GM_log(cell.textContent);
		if (cell.textContent.match(headerRegexp)) {
			break;
		}	
	}

	return (i < headerCells.snapshotLength ? i : false);
}

function getHeader(table, headerRegexp) {
	var idx = getHeaderIndex(table, headerRegexp);
	return (idx ? xpathOne("./*/tr[1]/td[" + (idx+1) + "]", table) : false);
}

function getCellByHeader(row, headerRegexp) {
	var table = xpathOne("./parent::*/parent::table", row);
	var idx = getHeaderIndex(table, headerRegexp);
	return (idx ? xpathOne("./td[" + (idx+1) + "]", row) : false);
}


var maintbl_xpath = "//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/table[not(@class='main')]";
var maintbl = xpathOne(maintbl_xpath);

if (!maintbl) {
	GM_log("fann inte maintabellen, avslutar");
}
else {
	var rows = xpath('./tbody/tr', maintbl);
	
	for (var i = 1; i < rows.snapshotLength; i++) {
		var row = rows.snapshotItem(i);	
		var namecell = getCellByHeader(row, /namn/i);
		var timecell = getCellByHeader(row, /inlagd/i);
		var uploadercell = getCellByHeader(row, /uppladdare/i);

		if (namecell && timecell && uploadercell) {
			namecell.appendChild(newEl('br'));
			var str = 'Uppladdad ';
			str += timecell.textContent.replace(/([\d]{4}-[\d]{2}-[\d]{2})([\d]{2}:[\d]{2}:[\d]{2})/, '$1 kl. $2');
			str += " av ";
			str += uploadercell.innerHTML;
			
			var sp = newEl('span');
			sp.innerHTML = str;
			namecell.appendChild(sp);		
			
			removeEl(timecell);
			removeEl(uploadercell);
		}
	}

	removeEl(getHeader(maintbl, /inlagd/i));
	removeEl(getHeader(maintbl, /uppladdare/i));
}	










