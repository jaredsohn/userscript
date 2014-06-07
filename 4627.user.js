// Bilddagboken accesskeys for navigation 1.1

// ==UserScript==
// @name          	Bilddagboken accesskeys for navigation
// @namespace     	http://determinist.org/greasemonkey/
// @description   	Adds accesskeys for skipping forward/backwards when viewing images. Version 1.1

// @include       	http://*.bilddagboken.se/p/show.html?*
// @include			http://*.bilddagboken.se/p/blogshow.html?t=*&currimg=*
// @include			http://*.bilddagboken.se/p/blogshow.tpl?t=*&currimg=*
// ==/UserScript==
/*

Changelog:

2006-08-02	1.1
* Added support for blogview (min l?slayout)

2006-07-08	1.0
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

const KEY_J = 74;
const KEY_K = 75;

var prevlink, nextlink;

if (document.location.href.match(/bilddagboken\.se\/p\/blogshow\.(html|tpl)\?/)) {
	//blogview
	prevlink = xpathOne("//a[text()='<<']/@href");
	nextlink = xpathOne("//a[text()='>>']/@href");	
	prevlink = (prevlink ? prevlink.nodeValue : false);
	nextlink = (nextlink ? nextlink.nodeValue : false);
}
else {
	//vanligt
	prevlink = unsafeWindow.prevLink();
	nextlink = unsafeWindow.nextLink();
}

foreachxp("//textarea[@name='txt'] | //input[@name='name']", function (el) {
	el.addEventListener('focus', stopListen, true);
	el.addEventListener('blur', startListen, true);
});

startListen();

function keypress_handler(e) {
	code = e.keyCode;
	if (code == KEY_J && prevlink) {
		location.href = prevlink;
	}
	else if (code == KEY_K && nextlink) {
		location.href = nextlink;
	}
}

function stopListen() {
	document.removeEventListener('keydown', keypress_handler, true);
}
function startListen() {
	document.addEventListener('keydown', keypress_handler, true);
}
