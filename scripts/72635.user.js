// ==UserScript==
// @name          VAmpire Wars filter
// @description	  Only shows Vampire Wars posts on Vampire Wars filtered page
// @author        JoeSimmons & DMaster Moded by WNae
// @include       http://www.facebook.com/home.php?filter=app_25287267406*
// @date          March 2010
// ==/UserScript==
(function () {
	var css = "#contentArea div[id^=\"div_story_\"]:not([class*=\"25287267406\"]) {\ndisplay:none !important;\n}";
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