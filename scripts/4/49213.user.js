// ==UserScript==
// @name          Gmail 3: Hide Invite Friend & Footer
// @description	  Hide Invite a Friend, and Footer on Gmail version 
// @author        lunigma
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "/* Description: Hides Invite a Friend, and Footer on Gmail version 3 */  @namespace url(http://www.w3.org/1999/xhtml); /* HIDE CHAT AND INVITE BOXES */ .nH.pY { display: none !important; } /* HIDE FOOTER */ .nH.l2.ov {display:none !important;}";
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