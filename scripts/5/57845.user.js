// ==UserScript==
// @name          Better Facebook tabs
// @namespace     http://userstyles.org
// @description	  Very very simple style. All it does is round the corners on the tabs in you profile
// @author        Metalord
// @homepage      http://userscripts.org/scripts/show/57845
// @include       http://www.facebook.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* For the profile tabs: */ ul#profile_tabs.tabs *{ -moz-border-radius: 10px 10px 0px 0px !important; -webkit-border-radius: 10px 10px 0px 0px !important; } /* For the main page tabs: */ a.HomeTabs_tab, a.newsfeed_plus_link, div.flyout_menu_mask { -moz-border-radius: 10px 10px 0px 0px !important; -webkit-border-radius: 10px 10px 0px 0px !important; }";
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
