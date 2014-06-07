// ==UserScript==
// @name           Disable Google Black Bar - Techie Buzz
// @namespace      http://userstyles.org
// @description    Hides the annoying Black Bar from Google Search pages. More updates coming soon to replace the current styles with older one
// @include        http://*.google.*/*
// @include        https://*.google.*/*

// ==/UserScript==
(function() {
var css = "#mngb {display:none; visibility:hidden; !important;}\n#gb {display:none; visibility:hidden; !important;}";
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
