// ==UserScript==
// @name          Hide YouTube Recommended Channels list
// @namespace     http://userstyles.org
// @description	  This script hides recommended channels list on YouTube.
// @author        zed87
// @homepage      http://userstyles.org/styles/80400
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
//  @run-at        document-start
// ==/UserScript==
(function() {
var css = ".branded-page-related-channels-list\n	{   \n		display: none;\n	}\n\n	.branded-page-related-channels-title\n	{   \n		display: none;\n	}";
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
