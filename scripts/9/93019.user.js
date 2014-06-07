// ==UserScript==
// @name           Hide Jimmy Wales Banner
// @version        0.1
// @author         ArpitNext
// @namespace      http://blog.arpitnext.com/
// @description    Hides Jimmy Wales' banner on Wikipedia
// @include        http://en.wikipedia.org/*
// @include        http://*.wikipedia.org/*
// ==/UserScript==

(function() {
var css = "#JABanner13 {display: none;}";
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