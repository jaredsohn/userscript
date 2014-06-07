// ==UserScript==
// @name	Remove Ads/promotions/friend suggestions
// @namespace	WahTaj (noushy)
// @description	Removes Ads/promotions/friend suggestions from new Orkut
// @include	http://*.orkut.*/*
// ==/UserScript==
var cssEdit = ".Gyi8qmpLF, .Gteqr2jDG, .Gteqr2jBZ, .Gteqr2jCR, .GqmuydiFG, .GqmuydiN-, .GqmuydiMS, .listlight.promobg{display: none !important;} .GqmuydiGHB{display:inline !important;}";
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