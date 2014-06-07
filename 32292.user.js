// ==UserScript==
// @name          Horizontal Scrollbar Remover
// @namespace     http://userstyles.org
// @description	  Do you hate the useless horizontal scrollbar in Ikariam, when you play it using Firefox? This script removes it for you!
// @author        subverted (modified for the horizontall scrollbar in Ikariam by EuroDance)
// @homepage      http://userstyles.org/styles/9425
// @include       http://*.ikariam.*/*
// @exclude       http://board.ikariam.*/*

// ==/UserScript==
(function() {
var css = "body {overflow-x: hidden !important;}";
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