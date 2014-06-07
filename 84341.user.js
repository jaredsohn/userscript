// ==UserScript==
// @name           Bright.nl novotes
// @namespace      Bright
// @description    Bright zonder votes op comments
// @include        http://www.bright.nl/*
// ==/UserScript==

// ==/UserScript==
var css = ".vud-widget-upanddown { display: none; } ";
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