// ==UserScript==
// @name          Mediafire Cleaner
// @namespace     http://userstyles.org
// @description	  This script cleans mediafire, specifically at the download page into more clean and nice.
// @author        s4nji
// @homepage      http://userstyles.org/styles/35721
// @include       http://mediafire.com/*
// @include       https://mediafire.com/*
// @include       http://*.mediafire.com/*
// @include       https://*.mediafire.com/*
// ==/UserScript==
(function() {
var css = ".footer, #catfish_div, #remove_ads_button2, #remove_ads_button1, div[style='margin: auto; width: 500px;'] {\ndisplay: none; }\n\n#download_visible_wrapper > .ninesixty_container:nth-child(2) {\nmargin-top: 15% !important; }";
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
