// 2012-06-04
// By bfred.it
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name          Great Readability
// @description   Make Readability fit better your wide widescreen to read comfortably far from the screen
// @match         *://www.readability.com/articles/*
// @screenshot    http://f.cl.ly/items/0e0c071f413G0x0f2U0g/Great%20Readability.png
// @version       1.11
// @run-at	document-start
// ==/UserScript==
var css =
".col-x-wide #container { max-width: none !important; } .size-x-large .hentry { font-size: 200%; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}