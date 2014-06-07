// ==UserScript==
// @name           Hide Gmail Chat Box
// @namespace      http://userscripts.org/users/85054
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); /* HIDE INVITE AND CHAT BOXES */ .nH.s { display:none !important; } ";
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
