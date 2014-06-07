// ==UserScript==
// @name          CollegeHumor Clean 
// @namespace     http://userscripts.org/users/americanjesus
// @description   Removes ads and spam
// @author        American_Jesus
// @version       2009.07.03
// @include       http://www.collegehumor.com/*
// ==/UserScript==

(function() {
var css = " #ad-banner, #billboardAd, .extras_module, #seo_about_text, .columnsRight, .footer_wrap , .banner_footer, .skin { display: none !important; }";
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