// ==UserScript==
// @name	Remove Ads/promotions/friend suggestions
// @namespace	Prince
// @description	Removes Ads/promotions/friend suggestions from new Orkut
// @require http://sizzlemctwizzle.com/updater.php?id=75200&days=2
// @include	http://*.orkut.*/*
// ==/UserScript==
var css = "#rhs_ads{display: none !important;}";
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