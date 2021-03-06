// ==UserScript==
// @name           Grooveshark no ads
// @namespace      http://listen.grooveshark.com/
// @description    Removes Ads From Grooveshark
// @include        http://listen.grooveshark.com/*
// ==/UserScript==
(function() {
var css= "#capital{display:none !important} #application{margin-right: 0 !important}";
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