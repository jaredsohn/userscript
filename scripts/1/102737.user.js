// ==UserScript==
// @name          Livejournal's April Header
// @namespace        ellafun
// @description   Replaces the current Livejournal header with the one that was present during April 2011.
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==
(function() {
var css = "#welcome {color: #ffffff !important;}\#welcome a {text-decoration: none;color: #ffffff !important;}\#navigation {background:#061C43 url(http://l-stat.livejournal.com/img/reskining/2011/april/noncyr/horizon-bg.jpg?v=1) 100% 0 no-repeat !important;}";
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