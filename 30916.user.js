// ==UserScript==
// @name           Delicious 2.0 readability tweaks
// @namespace      http://userscripts.org/scripts/show/30916
// @description    Some readability tweaks to the new Delicious
// @include        http://delicious.com/*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /**/ h4 .taggedlink { font-weight: 900 !important; } .full-url a { color: #888 !important;} h4 .taggedlink:visited { color: #804480 !important; } /**/";
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