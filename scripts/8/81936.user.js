// ==UserScript==
// @name           Big Linx
// @namespace      http://userscripts.org/users/ionbladez
// @author	ionbladez
// @version	2010-07-21
// @description    Make sure you can see your links, and not have them blend in with the rest of the page.
// ==/UserScript==

	// Basically, it just loads itself. Feel free to edit the font size, color, etc. CSS only.
	var fontStyle = 'font-weight: bold !important; font-size: 12pt !important; text-decoration: underline !important;';

	for (var i2 = 0; i2 < document.getElementsByTagName("a").length; i2++) {
	document.getElementsByTagName("a")[i2].setAttribute("style", fontStyle);
	}