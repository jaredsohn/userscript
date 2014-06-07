// ==UserScript==
// @name          Mickey Mouse Cursor
// @namespace     http://userstyles.org
// @description	  Mickey hand.
// @author        khstar
// @homepage      http://userstyles.org/styles/65965
// @include       http://www.tumblr.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body, a, a:hover {\n\ncursor: url(http://i135.photobucket.com/albums/q160/khstar/Mickey.png), progress;\n\n}";
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
