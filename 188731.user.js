// ==UserScript==
// @name          gunwoooo
// @namespace     http://userstyles.org
// @description	  Zmienia kolor
// @author        gunwo
// @homepage      http://userstyles.org/styles/80863
// @include       http://www.wykop.pl/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#body-con\n{\nbackground: #FF0000 !important;\n#header-con\n

{\nbackground: #FF0000 !important;\n}";
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