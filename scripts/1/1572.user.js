/* vim: ts=4 noet ai :
$Id: $

Nationalevacaturebank Resultaat - (c) 2005-2006 J.Q. la Poutre

Dit script maakt de zoekresultaten van nationalevacaturebank.nl
bruikbaarder door ze schermvullend weer te geven.


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

Version 1.03
	- Changes to keep up with target website
	- small improvements in CSS

Version 1.02
	- bug fix: apply query string removal only to links containing
	  an id code part (like .../012345/...), for next/prev page links

Version 1.01
	- strip links to descriptions from unnecessary query string
	- minor style update
	- tweaked @include regex

Version 1.00
	- initial release


*/
// ==UserScript==
// @name           Nationalevacaturebank Resultaat
// @namespace      http://joe.lapoutre.com/BoT/Javascript/Nationalevacaturebank
// @description    Sanitize search results of Nationalevacaturebank.NL
// @include        *nationalevacaturebank.nl/*/vacature*
// @version	       1.03
// ==/UserScript==

function sanitize() {
	// need to set styles here to override in-line style defs
    var cnt = document.getElementById("content");
    cnt.style.position = "absolute";
    cnt.style.top = "0px";
    cnt.style.left = "0px";
    cnt.style.zIndex = 9999;  // put content on top
    cnt.style.width = "100%";
    cnt.style.height = "100%";
    cnt.style.backgroundColor = "white";
    cnt.style.overflow = "visible";
    appendStyles();
    stripLinks();
}

function appendStyles() {
    var styleElement = document.createElement('style');
    if (styleElement) {
        styleElement.type = 'text/css';
        styleElement.id = 'gm_sanitize_style';
        document.getElementsByTagName('head')[0].appendChild(styleElement);
        var sty = document.styleSheets[document.styleSheets.length - 1];
        sty.insertRule("img, embed, object, #VNUfooterst { display: none; }", 0);
        sty.insertRule("* { font-size: 10pt ! important; }", 0);
		sty.insertRule("#content { position:absolute;top:0;left:0;z-index:9999;background-color:white;overflow:visible; }", 0); 
    }
}

// strip all query information off links to detail pages
function stripLinks() {
	var ll = document.evaluate("//a[contains(@href, '/zoek/vacatures/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < ll.snapshotLength; i++) {
		var l = ll.snapshotItem(i);
		// l.style.color = "blue"; // make 'm stand out more
		href = l.getAttribute("href");
		// leave links alone without numerical code part (.../012345/...)
		if (! href.match(/\/\d+\//)) continue;
		href = href.substring(0, href.indexOf("?")); // strip query string
		l.setAttribute("href", href);
	}
}


sanitize();
// end user script

