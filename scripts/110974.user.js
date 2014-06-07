// ==UserScript==
// @name           Larger Google Chat Box
// @namespace      http://userscripts.org/users/125059
// @description    Creates a wider and taller Google Chat window
// @include        https://*mail.google.com/*
// @include        https://*google.com/mail*
// ==/UserScript==
(function() {
var css = "html body div.dw div div.nH div.nH div.no div.nn:not(:empty) { width:400px !important; margin-right:5px; }"
		+ "html body div.dw div div.nH div.nH div.no div.nH div.no div.nH div.AD div.nH div.nH div.nH div.nH div.ko { min-height:250px !important; }";

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