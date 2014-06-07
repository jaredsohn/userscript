// ==UserScript==
// @name          deviantART: Remove HQ Junk
// @namespace     http://userstyles.org
// @description	  This will simply remove the HQ world tour bits that sit in the message center
// @author        M. J. B.
// @homepage      http://sapphiretiger.deviantart.com
// @include       http://my.deviantart.com/messages/
// ==/UserScript==
(function() {
var css = "#hqz {display: none!important;}";
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
