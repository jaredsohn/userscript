// ==UserScript==
// @name           Meebo Clean-Up
// @namespace      http://userscripts.org
// @description    A skin for Gmail
// @author         peterwooley@gmail.com
// @homepage       http://userscripts.org
// @include        http://*.meebo.com/*
// @include        https://*.meebo.com/*

// ==/UserScript==
var css = "@namespace url(http://www.w3.org/1999/xhtml); #consoleAd, .ImBuddyIcon, .ImBuddyIconContainer { display:none; } .meeboGallery { width:0; }";

if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}
}