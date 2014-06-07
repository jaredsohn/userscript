// ==UserScript==
// @name          Facebook - Remove Highlights and left filters
// @namespace     http://userstyles.org
// @description	  Completely removes the "Highlights" panel in the right sidebar of the new Facebook homepage layout. Ideal for getting your pokes and events back where they should be near the top of the page!
// @author        oilyflutesalad
// @homepage      http://userstyles.org/styles/15902
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "div[class=\"UIHotStream UIStream\"],\n	#home_sidebar > div[class=\"UIHomeBox UITitledBox\"]:not([data-ft]):not([id]),#home_sidebar > div > div[class=\"UIHomeBox UITitledBox\"]:not([data-ft]):not([id])\n	{\n		display:none!important;\n	}\n\n	\n	#home_sponsor_nile, .UIHomeBox_Sponsored\n	{\n		display: none !important;\n	}\n\n	\n	#home_filter_list\n	{\n		display: none !important;\n	}\n\n	\n	#home_left_column, #home_stream\n	{\n		width: 656px !important;\n	}\n\n	\n	#home_left_column #home_stream .UIStream .UIStory h3.UIIntentionalStory_Message\n	{\n		width: 591px !important;\n	}\n\n	\n	#sidebar_ads div\n	{\n		display:none;\n	}";
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
