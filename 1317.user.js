/* vim: ts=4 noet ai :
$Id: $

Annotate Links - (c) 2005 J.Q. la Poutre

A greasemonkey user script which lets you annotate external links on a
web page with a number, referring to a list of corresponding URLs as
endnotes below the page.

This comes in handy whenever you print the page and want to check out a
link afterwards.

Each link is refrenced like this [22], while a list of links is appended
to the bottom of the page, like this:

	22. http://link.to/interesting/external/page.html

These links and refrences are NOT visible in the normal browser view,
but they are printed whenever you print the page.



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
	Version 0.1
	- initial release, based on my similar bookmarklet

	Version 0.2
	- always transform links; invisible on screen
	- printed version shows references and endnotes
	- minor style fixes

BUGS
	Not a bug per se, but the list of referenced links will not
	be correctly positioned at the bottom of the page, if there are 
	absolutely positioned elements on the page.

TODO
	---


*/

// ==UserScript==
// @name          Annotate Links
// @namespace     http://joe.lapoutre.com/BoT/Javascript/AnnotateLinks
// @description   Generates a list of external links as footnote.
// @include       *
// @exclude       
// @version       0.2
// ==/UserScript==
(function() {
// begin user script


function setText(node, txt) {
	var sp = document.createElement('span');
	sp.className = "annlink-inline";
	sp.appendChild(document.createTextNode(txt));
	node.appendChild(sp);
/*
	var n = node.firstChild;
	if (!n) {
		return;
	} if (n.nodeType == 3) {
		var sp = document.createElement('span');
		sp.className = "annlink-inline";
		sp.appendChild(document.createTextNode(txt));
		n.appendChild(sp);
	} else {
		setText(n, txt);
	}
*/
}
function li(txt) {
	var li1 = document.createElement("li");
	tN = document.createTextNode(txt);
	li1.appendChild(tN);
	return li1;
}
function ol(aL) {
	var ol1 = document.createElement("ol");
	ol1.style.textAlign = "left";
	ol1.className = "annlink-block";
	for (var i in aL) {
		ol1.appendChild(li(aL[i]));
	}
	return ol1;
}
function annotate() {
	if (window.annotateLinksDone) return;
	appendStyles();
	var aL = new Array();
	var dL = document.getElementsByTagName("a");
	var j = 1;
	for (var i = 0; i < dL.length; i++) {
		var href = dL[i].getAttribute("href");
		if (href && href.match(/^(http|mailto|ftp)/) && dL[i].firstChild) {
			setText(dL[i], " [" + j++ + "]");
			aL[aL.length] = dL[i].getAttribute("href");
		}
	}
	try {
		var bd = document.getElementsByTagName("body")[0];
		var hr = document.createElement('hr');
		hr.className = "annlink-block";
		bd.appendChild(hr);
		bd.appendChild(ol(aL));
	} catch(e) {
		if (typeof(GM_log) == 'function') GM_log(e.toString(), 2);
	}
	window.annotateLinksDone = true;
};

// -------------------- Stylesheet: display for print media only --------------------
function appendStyles() {
	var styleElement = document.createElement('style');
	if (styleElement) {
		styleElement.type = 'text/css';
		// styleElement.media = 'print';
		styleElement.id = 'annotatelinkstyles';
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule(".annlink-inline { display: none; }", 0);
		sty.insertRule(".annlink-block { display: none; }", 1);
		sty.insertRule("@media print { .annlink-inline { display: inline; }}", 2);
		sty.insertRule("@media print { .annlink-block { display: block; }}", 3);
	}
}


// this fixes a double injection problem with GM 3.x
window.addEventListener("load", function() {
	annotate();
}, false);


/*
// Menu Command:
if (typeof(GM_registerMenuCommand) == 'function') {
	GM_registerMenuCommand("Annotate Links", annotate, {ctrl:true,key:"l"}, "l");
}
*/

// end user script
})();

