/*
    Gmail: simply Gmail UI including Chat, invite boxes and etc 
    Han Liu , email:iamh4n@gmail.com 
    
    modified from http://userscripts.org/scripts/show/83007
    Public Domain - Copy, use, modify, spread...
    Thanks to xarph's "Hide Gmail Chat Box" (http://userscripts.org/scripts/show/45317)
*/

// ==UserScript==
// @name           Simplify Gmail UI 
// @namespace      http://xh4n.cn
// @description    
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); /* HIDE INVITE AND CHAT BOXES */ .mn, .ma, .nH.pp.ps { display:none !important; }";
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