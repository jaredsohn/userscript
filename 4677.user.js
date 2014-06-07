// SGAE x $$$$
// version 0.1 BETA!
// 2006-07-13
// Copyright (c) 2006, Raúl Muñoz
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name $$$$ por SGAE
// @namespace http://diveintogreasemonkey.org/download/
// @description Change the word "SGAE" x "$$$$"
// @include *
// ==/UserScript==
window.addEventListener(
'load',
function() {
	var allElements, thisElement;
	allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++) {
		thisElement = allElements[i];
		if (thisElement.firstChild) {
			if (thisElement.firstChild.nodeName=="#text")
				thisElement.firstChild.nodeValue = thisElement.firstChild.nodeValue.replace("SGAE","$$$$$$$$");
			}
		}
}
,
true);