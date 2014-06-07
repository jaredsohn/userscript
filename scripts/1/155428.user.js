// ==UserScript==
// @name        Federation Tumblr Logo
// @namespace   http://userstyles.org
// @description Restyles the Tumblr logo in Federation font without breaking its link to the dashboard.
// @author      curbro
// @include     http://www.tumblr.com/*
// @version     1
// @run-at      document-start
// ==/UserScript==

(function() {
    var css = ".logo_anchor {height: 0 !important;\n        width: 0 !important;\n	padding-left: 240px !important;\n	padding-top: 70px !important;\n	background: url('http://media.tumblr.com/tumblr_mabc83xBN71qzl38p.png') no-repeat !important;}";
    if (typeof GM_addStyle !== "undefined") {
	GM_addStyle(css);
    } else if (typeof PRO_addStyle !== "undefined") {
	PRO_addStyle(css);
    } else if (typeof addStyle !== "undefined") {
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