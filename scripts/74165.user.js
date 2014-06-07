// ==UserScript==
// @name          Facebook show only treasure isle
// @namespace     http://userstyles.org
// @description	  Facebook show only farmville on farmville filter feed
// @author        JoeSimmons
// @homepage      http://userstyles.org/styles/26105
// @include       http://www.facebook.com/home.php?filter=app_234860566661*
// ==/UserScript==
(function() {
var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"aid_234860566661\"]) {\ndisplay:none !important;\n}";
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
