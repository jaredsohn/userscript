// ==UserScript==
// @name          Gmail 3: Hide Footer
// @namespace     http://userstyles.org
// @description	  Hides Footer on Gmail version 
// @author        war59312
// @homepage      http://userstyles.org/styles/15692
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css = "/* * Author: Will (war59312@gmail.com) * Description: Hides Footer on Gmail version 3 */ /* +++ changelog +++ March 6, 2009 - original release */ @namespace url(http://www.w3.org/1999/xhtml); /* HIDE FOOTER */ .nH.l2.ov {display:none !important;}";
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
