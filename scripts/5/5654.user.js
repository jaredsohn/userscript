// ==UserScript==
// Written By: http://www.QuinWorks.com
// @name           Windows Live Hotmail Ad Blocker
// @namespace      http://*.*.mail.live.com/*
// @description    Remove ads from Windows Live Mail
// @include        http://*.*.mail.live.com/*
// ==/UserScript==

var css = "@namespace url(http://www.w3.org/1999/xhtml); .cAdBannerContainer, #FooterContainer, #RadAd_Today300, .cRadAds, .cToolsCustomerCommunication, .c120x60CustomerCommContainer, .CustComm_120x60, .dSideAds { display: none !important; }  .TodayDefault, .cContentInner { margin-right: 0px !important; }";
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node); 
    }
}