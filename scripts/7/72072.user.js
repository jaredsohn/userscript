// ==UserScript==
// @name          Cafe World filter
// @description	  Only shows Cafe World posts on Cafe World filtered page based off the Farmville filter Script
// @author        Erked, JoeSimmons & DMaster
// @include       http://www.facebook.com/home.php?filter=app_101539264719*
// ==/UserScript==
(function () {
	var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"101539264719\"]) {\ndisplay:none !important;\n}";
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