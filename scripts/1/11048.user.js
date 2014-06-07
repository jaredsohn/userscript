// ==UserScript==
// @name           ComicAlert Fix
// @namespace      http://lapino.be
// @description    Fixes comic alert titles
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); .entry-title{display:block !important;} .entry-title-link{display:block !important;}"; 
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}
