/*
    Gmail: Hide Chat and invite boxes but not Docs
    Chris Wood, email: userscripts at gracefool.com
    
    Public Domain - Copy, use, modify, spread...
    Thanks to xarph's "Hide Gmail Chat Box" (http://userscripts.org/scripts/show/45317)
*/

// ==UserScript==
// @name           Hide Gmail Chat Box but not Docs
// @namespace      http://gracefool.com
// @description    In Gmail, hide the Chat and invite boxes on the left sidebar, but don't hide the Google Docs box.
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); /* HIDE INVITE AND CHAT BOXES */ .py, .nH.s { display:none !important; }";
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