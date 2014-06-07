// ==UserScript==
// @name          Facebook Feed: Enlarge Text
// @namespace     http://userstyles.org
// @description	  Enlarge Facebook feed comment text to 13px.
// @author        iannnnn
// @homepage      http://iannnnn.com
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".shareSubtext, .text_exposed_root, .UFICommentActorName, .hasCaption, .UFICommentBody, .userContent {font-size:13px !important; line-height: 20px !important;} .text_exposed_link {background:#f0f0f0 !important; padding:5px 8px !important; display:block !important; border-radius:4px !important; } .text_exposed_link a {display:block !important;}";
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
