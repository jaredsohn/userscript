// ==UserScript==
// @name          Nasza Klasa - wywalenie sledzia z profilów
// @namespace     http://userstyles.org
// @description	  Usuwa śledzika ze strony PROFILÓW
// @author        misiael
// @homepage      http://userstyles.org/styles/20935
// @include       http://nasza-klasa.pl/*
// @include       https://nasza-klasa.pl/*
// @include       http://*.nasza-klasa.pl/*
// @include       https://*.nasza-klasa.pl/*
// ==/UserScript==
(function() {
var css = "div[id*=\"sledzik_box\"] { display:none !important; }";
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
