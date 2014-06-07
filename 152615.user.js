// ==UserScript==
// @name	CSS: Re-enable Subpixel Antialiasing everywhere
// @description	This will make the text more readable on websites that abuse the setting -webkit-font-smoothing: antialiased;
// @version	2012.11.17
// @run-at	document-start
//
// @copyright	2012+, http://bfred.it
// @license	GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==
var css =
"html, body { -webkit-font-smoothing: subpixel-antialiased !important;}";
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