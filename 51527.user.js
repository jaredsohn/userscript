// ==UserScript==
// @name          Complete Ad Remover - Warez-BB.org
// @namespace      http://www.warez-bb.org/
// @description	  This script will remove all ads and is an updated script to remove the new attributes used from Warez-BB.org .
// @author        SandeepB
// @homepage      http://userscripts.org/scripts/show/51527
// @include       http://www.warez-bb.org/*
// @include       https://www.warez-bb.org/*
// @include       http://*.www.warez-bb.org/*
// @include       https://*.www.warez-bb.org/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); .footerline { display: none !important; } iframe { display: none !important; } IFRAME { display: none !important; }";
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