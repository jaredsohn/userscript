// ==UserScript==
// @name          Facebook chat: hide offline people
// @description	  This hides offline users in Facebook chat. That's it, no design change. It's just CSS (since 2011)
// @author        bfredit
// @homepage      http://userscripts.org/scripts/show/112792
// @namespace     http://userscripts.org/scripts/show/112792
// @match         *://*.facebook.com/*
// @version       2013.4.18
// ==/UserScript==
(function() {
var css = "ul.fbChatOrderedList li:not(.active):not(.mobile) {display: none;}";
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