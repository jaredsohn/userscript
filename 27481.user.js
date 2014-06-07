// ==UserScript==
// @name           Google Reader Hide navbar
// @namespace      http://www.netvibes.com/jordi
// @description    Hide the arrow to toggle google reader's navigation bar
// @include        http://www.google.tld/reader/view/*
// @include        https://www.google.tld/reader/view/*
// @include        http²://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

(function() {
var css= "#chrome-lhn-toggle {display:none !important;}";
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
})(); 
