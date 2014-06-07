// ==UserScript==
// @name          Facebook Dark Gray 2011
// @namespace     http://userstyles.org
// @description	  Let's face it. Facebook is UGLY. Let's make it a little less ugly and glaring to your eyes.
// @author        justino
// @homepage      http://userstyles.org/styles/37843
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==
(function() {
var css = "* {\n    background-color: #202020 !important;\n    color: #fff !important;\n    border-color: #112 !important;\n}\n#presence_ui {background:transparent!important;}\n\n.UIWashFrame_SidebarAds\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .feed_item.clearfix.social_ad.social_ad_no_full_clickable\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .UICompatibilityFrame_SidebarAds\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .UIStandardFrame_SidebarAds\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .adcolumn\n\n    {\n\n    display: none !important;\n\n    } \n\n\n\n  .sidebar_item.sponsor\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .feed_item.clearfix.ad_capsule.has_body\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .UIHotStory_First.UIHotStory.UIStory.house_sponsor\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .emu_ad\n\n    {\n\n    display: none !important;\n\n    }\n\n\n\n  .UIHotStory.UIStory.house_sponsor\n\n    {\n\n    display:none!important;\n\n    }\n\n\n\n  .house_sponsor\n\n    {\n\n    display:none!important;\n\n    }\n\n\n\n  .emu_sponsor\n\n    {\n\n    display:none!important;\n\n    }\n\n\n\n  .UIConnectWithFriends.UIHomeBox\n\n    {\n\n    display:none!important;\n\n    }\n\n\n\n  #home_sponsor_nile \n\n    {\n\n    display:none!important;\n\n    }";
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