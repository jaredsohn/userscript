// ==UserScript==
// @name           Hide Gmail Invite Box
// @namespace      http://userscripts.org/users/85054
// @description    Hides Gmail Invite Box
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); .nH.pY { display:none !important; }";
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
