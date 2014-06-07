// ==UserScript==
// @name          Schulterglatze - Krit. Wert Hervorhebung
// @author        Schweinebagge
// @include       http://schulterglatze.tld/*
// @include       http://*schulterglatze.tld/*
// ==/UserScript==

(function() {
var css = ".font_krit {\n    font-size: 130% !important;\n    text-shadow: black 0.2em 0.2em 0.4em !important;\n}";
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