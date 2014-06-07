// ==UserScript==
// @name          Cheezburger Network family cleaner
// @namespace     http://userscripts.org/users/americanjesus
// @description   Removes ads from Cheezburger Network sites
// @author        American_Jesus
// @version       2009.07.21
// @include       http://icanhascheezburger.com/*
// @include       http://ihasahotdog.com/*
// @include       http://roflrazzi.com/*
// @include       http://totallylookslike.com/*
// @include       http://punditkitchen.com/*
// @include       http://graphjam.com/*
// @include       http://onceuponawin.com/*
// @include       http://failblog.org/*
// @include       http://engrishfunny.com/*
// @include       http://www.tofulator.com/*
// ==/UserScript==

(function() {
var css = " #leaderboard, .toprightad, .pane3, .pane1, .suggest, #footer, .templates, .template, #google_ads_div_FB-Bottom-728x90-ROS, #google_ads_div_OW-Bottom-728x90-ROS, #google_ads_div_EF-BTF-728x90, #google_ads_div_PK-Bottom-728x90-ROS, #google_ads_div_TLL-Bottom-728x90-ROS, #google_ads_div_RR-BTF-728x90 { display: none !important; }";

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