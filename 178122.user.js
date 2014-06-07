// ==UserScript==
// @name          No sugerencias, no publicidad en facebook
// @namespace     http://saadyfernando.com
// @description	  Elimine las sugerencias de amigos, páginas, grupos, encuestas y publicidad de su facebook.
// @author        saadyfernando.com
// @homepage      http://saadyfernando.com
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".ego_section {visibility:hidden;height:0px;}\n#pagelet_pymk_timeline {visibility:hidden;height:0px;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();