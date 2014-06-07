// ==UserScript==
// @name           Hide Google Mail tips
// @namespace      com.google.mail
// @description    Hides the GMail tips at the bottom of the page. When you have a short inbox, the changing tips are distracting. ;)
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==

(function() {
	var css = "div.nH.l2.ov div.nH div.mn {display:none !important;}";

	// Block copied from http://userscripts.org/scripts/show/64138
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
