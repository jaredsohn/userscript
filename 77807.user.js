// ==UserScript==
// @name          LJ - Header Design Contest
// @description   stay with the April, 2010 header
// @author        daluci
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==
(function() {
var css = "#welcome {color: #369 !important;}\#welcome a {text-decoration: none;color: #114577 !important;}\#navigation {background:#061C43 url(http://l-stat.livejournal.com/img/reskining/april2010/april2010-horizon-bg.jpg) 100% 0 no-repeat !important;}";
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