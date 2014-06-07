// Pirathub's Tracker iMDB search in torrent browser and request browser 1.0

// ==UserScript==
// @name          	Pirattracker iMDB search in torrent browser and request browser.
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Adds a link to a imdb search of the name in the torrent browser and request browser. Version 1.0

// @include       	http://pirattracker.no-ip.org/reqbrowse.php*
// @include       	http://pirattracker.no-ip.org/browse.php*
// ==/UserScript==

/*
Changelog:

2006-10-23
	* Public release

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

var site ;
if (location.href.match(/browse\.php/) || location.href.match(/req\.php/))
	coln = 2;
else if (location.href.match(/requests\.php/))
	coln = 1;
	

var maintablexp = "//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/table[not(@class='main')]";
var maintable = xpathOne(maintablexp);
var firstrow = maintable.getElementsByTagName('tr')[0];
var insertTHBefore = firstrow.getElementsByTagName('td')[coln];
var th_cell = newEl('td');
th_cell.setAttribute('class', 'colhead');
th_cell.innerHTML = '<abbr title="The Internet Movie Database">iMDB</abbr>';
firstrow.insertBefore(th_cell, insertTHBefore);


foreachxp("tbody/tr[position()>1]", function (row) {
	var rowlinks = row.getElementsByTagName('a');

	var imdb_cell = newEl('td');
	imdb_cell.setAttribute('style', 'text-align: center;');
	
	var releasename = rowlinks[coln-1].textContent;
	releasename = releasename.match(/(.*?)\.([0-9]{4}|NORDIC|PAL|D[0-9]+|S[0-9]+|BOXSET|COMPLETE|CUSTOM)/);
	
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
		var iB = getElementsByTagName('td')[coln];
		insertBefore(imdb_cell, iB);
	}
}, maintable);


