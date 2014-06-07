// ==UserScript==
// @name          التخلص من الإشهار:: FaceBook v1
// @namespace     التخلص من الإشهار
// @description	  v1.0
// @author        remove pub facebook
// @homepage      http://userscripts.org/scripts/show/162288
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = ".UIStandardFrame_FooterAds, .footer_ad, .social_ad, .adcolumn, .sponsors, .sponsor, .ad_capsule, .emu_ad, #adContainer, .bannerAds, #home_sponsor_nile, #pagelet_adbox, #sidebar_ads, #pagelet_netego_ads, .UIStandardFrame_SidebarAds, .adInfo, .emuEvent1, .fbEmuLink, .fbEmuEgoUnitFirst, .fbEmuEgo, .ego_section, #pagelet_ego_pane {display: none !important}\n\n#pagelet_ticker {display: none !important {display: none !important;}";
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
