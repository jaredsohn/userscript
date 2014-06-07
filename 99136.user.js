// ==UserScript==
// @name           Xing Blur Removal
// @namespace      http://example.org/xing
// @description    removes blur from recent visitors listing for non premium members, removes gray overlay on profile pictures if user is not logged in
// @include        http://*.xing.com/*
// @include        https://*.xing.com/*
// @version        16 March 2011
// ==/UserScript==
(function() {
	var css = "";
	css += ".obfuscated-txt .blur { display: none !important; }";
	css += ".obfuscated-img img { opacity: 1 !important; }";
	css += ".obfuscated-img .photo-info { display: none !important; }";
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