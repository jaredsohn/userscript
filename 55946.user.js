// ==UserScript==
// @name           Gmail Hide Chat, Web Search, Invite Friend and Footer
// @namespace      http://userscripts.org/scripts/admin/55946
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); /* HIDE INVITE AND CHAT BOXES */ .py, .nH.s, .nH.pp.ps { display:none !important; } .nH .pS { display: none !important;} .n6 { display: none !important; }";
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
