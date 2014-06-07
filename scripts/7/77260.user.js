// ==UserScript==
// @name          Gelb Spickmich
// @namespace     http://niklaspower.de
// @description	  Dieser Header macht den Spickmich-haeder zu einem Gelben- Haeder
// @author        Sag ich nicht Geheim
// @homepage      http://Niklaspower.de
// @include       http://spickmich.de/*
// @include       https://spickmich.de/*
// @include       http://*.spickmich.de/*
// @include       https://*.spickmich.de/*
// ==/UserScript==
(function() {
var css = "#topDiv{ ERROR NICHT MEHR VERFÜGBAR) !important; }";
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
})();
// JavaScript Document