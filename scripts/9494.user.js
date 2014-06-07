// ==UserScript==
// @name          Digg Comment Box Side Bar
// @namespace     http://userscripts.org
// @description	  This script moves the comment box to the right side of the screen.
// @author        picardo edited by JohnTheJohnMan
// @include       http*://*digg.com/*

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #creplyform{ position: fixed !important; bottom: 250px !important; right: 40px !important; z-index:100; } #cforminfo + ol { position: fixed !important; bottom: 5px !important; right: 15px !important; width: 240px; z-index:1000; } #footer, .copyright{ padding-right:355px; z-index:0; } .footer-contents{ position:absolute; bottom:0px; right: 300px; } #contents{ background-color: white; } #sub-nav{ width:80%; } #container{ background-color: white; }";
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