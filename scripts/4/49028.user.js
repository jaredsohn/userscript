// ==UserScript==
// @name	Remove Ads from Orkut Pages
// @namespace	Gautam (OrkutPlus.net)
// @description	It removes Orkut ads from Orkut's pages.
// @include	http://*.orkut.*/*
// ==/UserScript==
var css = "#rhs_ads{display: none !important;}";
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