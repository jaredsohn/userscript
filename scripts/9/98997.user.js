// ==UserScript==
// @name          Alternian Tumblr
// @namespace     http://carcinogeneticist.tumblr.com
// @description	  bluh.
// @author        carcinogeneticist
// @include       http://www.tumblr.com/*
// ==/UserScript==
(function() {
var css = "#logo {height: 0 !important;\n	width: 0 !important;\n	padding-left: 230px !important;\n	padding-top: 64px !important;\n	background: url(http://i55.tinypic.com/2vi1d0m.png) no-repeat !important;}";
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
