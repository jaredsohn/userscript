// ==UserScript==
// @name          FORUM CAPITALIZATION
// @namespace     http://userstyles.org
// @description	  Makes all text at forum.deviantart.com CAPITAL LETTERS.
// @author        frozenpandaman
// @homepage      http://userstyles.org/styles/12451
// @include       http://forum.deviantart.com/*
// @include       https://forum.deviantart.com/*
// @include       http://*.forum.deviantart.com/*
// @include       https://*.forum.deviantart.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); body { text-transform: uppercase; }";
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
