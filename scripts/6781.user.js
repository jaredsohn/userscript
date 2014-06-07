// Reddit recollapse comments 1.0

// ==UserScript==
// @name          	Reddit recollapse comments
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Adds a link for recollapsing comments. Version 1.0

// @include       	http://reddit.com/info/*/comments*
// @include       	http://*.reddit.com/info/*/comments*

// ==/UserScript==

/*

Changelog:

2006-08-13	1.0
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

function $(id) {
	return document.getElementById(id);
}

foreachxp("//span[starts-with(@id, 'collapse')]", function (sp) {
	var showlink = sp.getElementsByTagName('a')[0];
	showlink.setAttribute('href', 'javascript:;');
	showlink.removeAttribute('onclick');
	showlink.addEventListener('click', toggleComment, true);
});

function toggleComment(e) {
	var trg = e.target;
	var id = trg.parentNode.id.replace('collapse', '');
	
	if (trg.textContent == 'hide comment') {
		trg.textContent = 'show comment';
		hide('body'+id, 'little'+id, 'arrows' + id);
	}
	else {
		trg.textContent = 'hide comment';
		show('body'+id, 'little'+id, 'arrows' + id);
	}
}

//stolen from reddit.js :)
function hide () {for (i = 0; i < arguments.length; i++) {var e = $(arguments[i]); if (e) e.style.display = "none";}}
function show () {for (i = 0; i < arguments.length; i++) {var e = $(arguments[i]); if (e) e.style.display = "";}}