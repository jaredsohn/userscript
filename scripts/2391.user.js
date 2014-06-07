/* vim: ts=4 noet ai :
$Id: $

CanLII Print Cleanup - (c) 2005 Andy Kaplan-Myrth, and licensed
under the GPL (see below). This script is a modified version of
the Mac World Print Cleanup script by J.Q. la Poutre.

This Greasemonkey User Script appends stylesheet rules for printed
media, which make sure that only real content gets printed. Site
navigation and headers and footers are suppressed. It is designed
to clean up printed cases from CanLII.org.

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
// @name           CanLII Print Cleanup
// @namespace      http://canlii.org
// @description    Sanitizes CanLII styles for print media
// @include        http://canlii.org/*
// @include        http://www.canlii.org/*
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
		sty.insertRule("img, .smallentete, a.reflex-parallel-citations, div.footer {display: none ! important; }", 0);
		sty.insertRule("div.documentcontent {display: block ! important; }", 1);
		sty.insertRule("a.reflex-caselaw, a.reflex-statute {border-bottom: none ! important; color: black ! important; }", 2);
		sty.insertRule("* {font-size: 11pt ! important; font-family: 'Times New Roman' ! important; }", 3);
	}
}


appendStyles();
// end user script



