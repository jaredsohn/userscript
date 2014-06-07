// ==UserScript==
// @name          Facebook - Ad Blocker
// @namespace     http://userstyles.org
// @description	  Blocks ads on News Feed
// @author        Matthew Caldwell
// @homepage      http://www.matthew-caldwell.com/
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// 
// ==/UserScript==
(function() {
var css = "#pagelet_ego_pane_w,#pagelet_ego_pane,#pagelet_side_ads,.fbTimelineSideAds,.fbTimelineVerticalAds{display: none;}";
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