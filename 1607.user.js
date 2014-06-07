/* vim: ts=4 noet ai :
$Id: $

Resize Useit.com - (c) 2005 J.Q. la Poutre

Modify the stylesheet rules of useit.com to use more modestly sized
text styles. This is especially useful if you want to print an article
(admit it, this *could* happen one day)...

LICENSE

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
	Version 1.01
	- initial release, using style sheet manipulation

*/

// ==UserScript==
// @name         Resize useit.com
// @namespace    http://joe.lapoutre.com/BoT/Javascript/ResizeUseitCom
// @description  Modify 'useit.com' to use more modestly sized text styles. 
// @include      http://www.useit.com/*
// @exclude      
// @version      1.01
// ==/UserScript==

/* XPATH Doesn't work, because changing the node set invalidates the iterator
try {
	var paras = document.evaluate("//p", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	var p = paras.iterateNext();
	while (p) {
		p.style.fontSize = "9pt";
	//	p.style.color = "red";
		p = paras.iterateNext();
	}
} catch (e) {
	GM_log(e.toString());
}
*/

function appendStyles() {
	var styleElement = document.createElement('style');
	if (styleElement) {
		styleElement.type = 'text/css';
		// styleElement.media = 'print';
		styleElement.id = "reStyleStyles";
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule("body, p { font-size: 10pt; }", 0);
		sty.insertRule("h1 { font-size: 14pt; }", 1);
		sty.insertRule("h2 { font-size: 12pt; }", 2);
		sty.insertRule("h3 { font-size: 10pt; }", 3);
	}
}

// no need to wait for load event
appendStyles();

// end.
