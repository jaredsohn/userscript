// ==UserScript==
// @name           Remove Facebook Right-Column
// @version        0.2
// @author         Andras Ora
// @namespace      http://programmingkid.com.com/
// @description    Increase Screen Estate by removing right column on Facebook.
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

(function() {
var css = "#rightCol{display: none;};";
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