// ==UserScript==
// @name          Windows Live not Ads
// @namespace     http://userstyles.org
// @description	  Windows Live not Ads
// @author        HannibalSmith
// @homepage      http://userscripts.org/users/35001
// @include       http://live.com/*
// @include       https://live.com/*
// @include       http://*.live.com/*
// @include       https://*.live.com/*
// @include       http://msn.com/*
// @include       https://msn.com/*
// @include       http://*.msn.com/*
// @include       https://*.msn.com/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); #RadAd_Banner, #RadAd_TodayPage_Banner, tr.adRow, div#AdContainer, #CalendarAdsTopContainer, #pagesuper, #CustComm_120x60, #Ad300x250,.advertisement, #RadAd_Today300, #CustComm_300x125_TodayPage { display: none !important; visibility: hidden !important; } * { font-size-adjust: .6 !important; }";
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
