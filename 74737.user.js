// ==UserScript==
// @name          SPP Ranch Filter
// @description	  Only Shows SPP Ranch Posts on SPP Ranch Filtered Page
// @author        Brunner, JoeSimmons & DMaster Moded by WNae
// @include       http://www.facebook.com/home.php?filter=app_169868688162*
// @date          April 2010
// ==/UserScript==
(function () {
	var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"169868688162\"]) {\ndisplay:none !important;\n}";
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
