// ==UserScript==
// @name          Facebook Sidebar Remover
// @namespace     http://userstyles.org
// @description	  This hides the sidebar from your Facebook profile. It's annoying, and I know a lot of people are looking for a viable option to hide it. Please refresh your Facebook page for userstyle to take effect.
// @author        ryanx30
// @homepage      http://userstyles.org/styles/63921
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "#pagelet_sidebar, #pagelet_rhc_ticker, #pagelet_ticker, div.sidebarMode, div.tickerLineToggle, div.canvasTicker\n{\ndisplay: none !important;\n}";
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