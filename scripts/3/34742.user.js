// ==UserScript==
// @name          Ubi Forums Signature Remover
// @namespace     Ubisoft Forums
// @description	  Sets the "display" tag of the signature division to "none" so that no signatures are displayed.
// @author        mblmg
// @homepage      http://userstyles.org/styles/10891
// @include       http://forums*.ubi.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); div.ev_tpc_signature { display:none !important; }";
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