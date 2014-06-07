// ==UserScript==
// @name          boobs tumblr logo
// @namespace     http://userstyles.org
// @description	  replaces tumblr logo
// @author        ducktah
// @homepage      http://userstyles.org/styles/72181
// @include       http://www.tumblr.com*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#logo {height: 0 !important;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n	width: 0 !important;\n\n\n\n\n\n\n\n\n\n\n\n	padding-left: 300px !important;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n	padding-top: 70px !important;\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n	background: url(http://i.imgur.com/rm0Ru.png) no-repeat !important;}";
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