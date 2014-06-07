// ==UserScript==
// @name          LJ - Bannering
// @description   go back to the old banner
// @author        daluci
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==
(function() {
var css = "#welcome {color: #ffffff !important;}\#welcome a {text-decoration: none;color: #ffffff !important;}\#navigation {background:#061C43 url(http://i628.photobucket.com/albums/uu3/poutful/backgr.png) 100% 0 repeat !important;}#";
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