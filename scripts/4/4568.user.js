// Swedvdr iMDB search in requests browser 1.2

// ==UserScript==
// @name          	Swedvdr iMDB search in requests browser
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Adds a link to a imdb search of the name in the request browser. Version 1.2

// @include       	http://swedvdr.org/requests.php*
// @include       	http://www.swedvdr.org/requests.php*
// ==/UserScript==
/*
Changelog:

2007-03-19	1.2
* Removed for browse.php and req.php, it's already there
* Improved the regexes

2006-08-03	1.1
* Now supports req.php, browse.php and requests.php
* Better regexes

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
	var els = xpath(xp, context);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
		//for (var i = 0; (el = els.snapshotItem(i)) && i < 5; i++) {
			fc(el);
		}
	}
}

function xpathOne(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
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

var maintablexp = "//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/table[not(@class='main')]";
var maintable = xpathOne(maintablexp);
var firstrow = maintable.getElementsByTagName('tr')[0];

var th_cell = newEl('td');
th_cell.setAttribute('class', 'colhead');
th_cell.innerHTML = 'iMDB';

var insertHeaderBefore = firstrow.getElementsByTagName('td')[1];
firstrow.insertBefore(th_cell, insertHeaderBefore);

var relNameRegexStoppers = ["[\\d]{4}", "D[\\d]+", "S[\\d]+", 
	"BOXSET", "DISC[\\d]+", "VOL",
	"SASONG\\.[\\d]+", "DVDR", "SWEDISH",
	"COMPLETE", "S[\\d]+D[\\d]+"];

var relNameRegex = new RegExp('(.*?)\\.(' + relNameRegexStoppers.join('\\.|') + '\\.)', 'i');
GM_log(relNameRegex);

foreachxp("tbody/tr[position()>1]", function (row) {
	var rowlinks = row.getElementsByTagName('td');

	var imdb_cell = newEl('td');
	imdb_cell.setAttribute('style', 'text-align: center;');
	
	var releasename = rowlinks[0].textContent;
	releasename = relNameRegex.exec(releasename)
	
	var imdb_img = newEl('img');
	imdb_img.src = 'http://imdb.com/favicon.ico';
	imdb_img.setAttribute('style', 'border: 0');
	
	if (releasename) {
		
		releasename = releasename[1];
		releasename = releasename.replace(/\./g, ' ');

		var imdb_link = newEl('a');
		imdb_link.href = 'http://imdb.com/find?q=' + releasename + ';s=tt';
		
		imdb_cell.appendChild(imdb_link);
		imdb_link.appendChild(imdb_img);
	}
	else {
		imdb_cell.appendChild(imdb_img);
	}
	
	with (row) {
		var insertCellBefore = getElementsByTagName('td')[1];
		insertBefore(imdb_cell, insertCellBefore);
	}

}, maintable);

