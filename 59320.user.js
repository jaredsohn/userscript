// ==UserScript==
// @name	Remove Ads/promotions/friend suggestions/invite box/last login detail/security tips from Orkut Pages
// @namespace	WahTaj (noushy)
// @description	Removes Ads/promotions/friend suggestions/invite box/last login detail/security tips from Orkut Pages
// @include	http://*.orkut.*/*
// ==/UserScript==
var cssEdit = "#rhs_ads, #friendsSuggestion, #top_ads, #HomePage, #app_content_0{display: none !important;} .sml, .'listlight promobg'{display: none !important;}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(cssEdit);
} else if (typeof addStyle != "undefined") {
	addStyle(cssEdit);
} else {
	var head_var = document.getElementsByTagName("head");
	if (head_var.length > 0) {
		var new_node = document.createElement("style");
		new_node.type = "text/css";
		new_node.appendChild(document.createTextNode(cssEdit));
		head_var[0].appendChild(new_node);
 	}
}