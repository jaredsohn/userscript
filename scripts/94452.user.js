// ==UserScript==
// @name          Helps blind people on Fluther.
// @namespace     http://userstyles.org
// @description	  When people make the text small this will make it grow when you hover over it.
// @author        johnpowell
// @homepage      http://userstyles.org/styles/42400
// @include       http://www.fluther.com/*
// @include       https://www.fluther.com/*
// @include       http://*.www.fluther.com/*
// @include       https://*.www.fluther.com/*
// ==/UserScript==
(function() {
var css = "small:hover {font-size: 100% !important;}";
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