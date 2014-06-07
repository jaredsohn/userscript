// ==UserScript==
// @name          GOOGLE INSTANT - center to wide fix
// @namespace     http://userstyles.org
// @description	  a flexible version of google instant that flows to the edges of the screen.
// @author        oronm
// @homepage      http://userstyles.org/styles/37201
// @include       http://google.com/*
// @include       https://google.com/*
// @include       http://*.google.com/*
// @include       https://*.google.com/*
// ==/UserScript==
(function() {
var css = "#cnt, #tsf, .ctr-p {max-width:none !important;}";
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