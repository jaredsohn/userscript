// ==UserScript==
// @name           EPFL sanitize epfhelp
// @namespace      http://userscripts.org/scripts/show/159841
// @description    Automatically log you in when EPFL's tequila login page is displayed.
// @include        https://epfhelp.epfl.ch/*
// @version        0.3
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @grant          none
// @run-at         document-end
// ==/UserScript==


if (document.URL.indexOf('https://epfhelp.epfl.ch/') === 0)
{
	var pdfJSdiv = document.getElementById("file-view");
	if (pdfJSdiv != undefined) {
		pdfJSdiv.parentNode.removeChild(pdfJSdiv);
	}
}
