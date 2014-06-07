// ==UserScript==
// @name          TabWidth for gitlab
// @namespace     thedevstop.com
// @description	  Set tab width to 4 in the code viewer
// @author        Joey Robichaud
// @homepage      http://thedevstop.com
// @include       http://git.3-gis.com/*
// ==/UserScript==
(function() {
var css = ".content .lines { tab-size: 4; -moz-tab-size: 4; }\n" +
".content .line_content { tab-size: 4; -moz-tab-size: 4; }";

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