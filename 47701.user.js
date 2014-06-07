// ==UserScript==
// @name          Hacken .cc ADS
// @namespace     http://userstyles.org
// @description	  This is block Ads for Hacken.cc style
// @include       http://hacken.cc/*
// @include       https://hacken.cc/*
// @include       http://*.hacken.cc/*
// @include       https://*.hacken.cc/*
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); div#header, div.ad_text, div[class^=\"ad_\"], div#ad_footerbanner3 + div { display: none !important ;} iframe{display: none !important;}";
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
})();
