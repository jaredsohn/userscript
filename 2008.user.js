/* vim: ts=4 noet ai :
$Id: $

Mac World Print Cleanup - (c) 2005 J.Q. la Poutre

This Greasemonkey User Script appends stylesheet rules for printed
media, which make sure that only real content gets printed. Site
navigation, headers and footers, and ads are suppressed.

This benefits not only regular pages, but also the special "printer
friendly" versions (strangely, these contain bloated ads as well).

No change is visible in Firefox after installing the user script. Do a
"print preview" or just make a print in order to see the differences.


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

Version 1.00
    - initial release

      


*/
// ==UserScript==
// @name           Mac World Print Cleanup
// @namespace      http://joe.lapoutre.com/BoT/Javascript/MacWorld
// @description    Sanitizes Mac World styles for print media
// @include        http://www.macworld.com/*
// @exclude        
// @version	       1.00
// ==/UserScript==

function appendStyles() {
	var styleElement = document.createElement('style');
	if (styleElement) {
		styleElement.setAttribute("type", "text/css");
		// rules are for printed output only 
		styleElement.setAttribute("media", "print");
		styleElement.setAttribute("id", "gm_sanitize_styles");
		document.getElementsByTagName('head')[0].appendChild(styleElement);
		// for some reason, document.getElementById doesn't work with insertRule further on...
		var sty = document.styleSheets[document.styleSheets.length - 1];
		sty.insertRule("* { font-size: 10pt ! important; }", 0);
		sty.insertRule("#banner, #nav, #sidebar, #footerAds, #footer, .boxAd, .newsRightAd { display: none ! important; }", 1);
		sty.insertRule("embed, object, iframe { display: none ! important; }", 2);
		sty.insertRule("body { background: none; margin: 10pt; position: relative; }", 3);
		sty.insertRule("#wrapper, #story { width: 100% ! important; }", 4);
		sty.insertRule("div { border: none ! important; }", 5);
		sty.insertRule("#story { position: absolute; top: 0px; left: 0px; width: 100%; background-color: white; overflow: visible; z-index: 10000; margin: 0px; }", 6);
	}
}


appendStyles();
// end user script


