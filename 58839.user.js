// Pre-Wrap v1.0
// By Peter Kaminski <http://peterkaminski.com/>
// License: public domain
// Version history:
// 	1.0: very simple initial version
//
// This Greasemonkey script is handy for pages with pre-formatted text
// with very long lines, e.g., some mailman/pipermail list archive pages.
//
// ==UserScript==
// @name           Pre-Wrap
// @namespace      http://peterkaminski.com/
// @description    (v1.0) Wraps <pre>-formatted text to the width of its container.
// @include        *
// ==/UserScript==

var e = document.getElementsByTagName('pre');
for (i=0; i<e.length; i++) {
	e[i].setAttribute("style","width:95%;white-space:pre-wrap;");
}
