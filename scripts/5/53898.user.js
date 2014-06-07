// ==UserScript==
// @name           BBC Comic Sansify
// @namespace      http://bbc.co.uk/
// @include        http://www.bbc.co.uk/*
// @include        http://bbc.co.uk/*
// @include        http://*.bbc.co.uk/*

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); body, p, div, span, h1, h2, h3, h4, h5, li {font-family: 'Comic Sans MS', 'Lucida Casual' !important;}";

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