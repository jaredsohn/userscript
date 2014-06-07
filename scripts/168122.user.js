// ==UserScript==
// @name          Imgur - Title Bar Scroll
// @namespace     http://userscripts.org/users/518401
// @description	  It makes the title bar scroll with the page.
// @author        Basion
// @include       http://imgur.com/*
// @include       https://imgur.com/*
// @include       http://*.imgur.com/*
// @include       https://*.imgur.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#topbar { position: fixed !important; z-index: 100; top: 0px; width: 100%; } #content { top: 40px !important; } .panel.left { top: 40px !important; } #wrapper { margin-top: 40px !important;} #wrapper #sidenav { margin-top: 10px !important; } #wrapper #content { margin-top: 10px !important; } #clickable-logo { margin-top: 80px !important; }";
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
