/* vim: ts=4 noet ai :
$Id: $

PodSafeNetwork Media links - (c) 2005 - 2009 J.Q. la Poutre

This script appends a "download" link after every "play button"
which links to a downloadable media file (typically a MP3 file).

Download links open in a new window.


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

version 1.02 - 20090608
	- works also if only legacy <embed> elements are used

Version 1.01
    - make download links stand out more

Version 1.00
    - initial release

*/
// ==UserScript==
// @name           PodsafeMediaLinks
// @namespace      http://joe.lapoutre.com/BoT/Javascript
// @description    Adds links to media files besides flash "play" buttons
// @include        *music.podshow.com/*
// @version	       1.02
// ==/UserScript==

function medialinks() {
	var swfString = "button.swf?theFile=";
	var ll = document.evaluate("//object/param[@name='movie'][starts-with(@value, '"+swfString+"')]", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var srcAttr = 'value';
	if (ll.snapshotLength === 0) {
		ll = document.evaluate("//embed[starts-with(@src, '"+swfString+"')]", 
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		srcAttr = 'src';
	}
	for (var i = 0; i < ll.snapshotLength; i++) {
		var l = ll.snapshotItem(i);
		var h = l.getAttribute(srcAttr).substring(swfString.length);
		var a = document.createElement("a");
		a.setAttribute("href", h);
		a.setAttribute("target", "_blank");
		a.setAttribute("title", "Download file: " + h.substring(h.lastIndexOf("/")+1));
		a.style.color = "red";
		a.appendChild(document.createTextNode("download"));
		l.parentNode.parentNode.appendChild(a);
	}
}


medialinks();
// end user script