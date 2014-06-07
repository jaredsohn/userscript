// ==UserScript==
// @name          Tumblr - Hide Tumblr Tips
// @namespace     http://userstyles.org
// @description	  Blocks Tumblr 'tips' and ads from appearing on the Dashboard or any Tumblr.com page.
// @author        thebadson
// @homepage      http://userstyles.org/styles/22145
// @include       http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = "#tip{\n    display: none;\n  }";
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