// ==UserScript==
// @name           Lokalisten
// @author         oiBio
// @description    Ändert den hässlichen weißen Hintergrund in das gute alte Grün
// @include        *lokalisten.de*
// ==/UserScript==
var css = "* { background-color: #669900 !important} ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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


