// ==UserScript==
// @author         mungushume
// @version        4.5
// @name           Windows Live Ad Remover
// @namespace      mungushume_@_hotmail_._com
// @description    Remove ads from Windows Live Mail
// @include        http://*.mail.live.com/*
// @include        https://*.mail.live.com/*
// @include        http://mail.live.com/*
// @include        https://mail.live.com/*
// @scriptsource   http://userscripts.org/scripts/show/8228
// ==/UserScript==

// New in v1.1 now removes most ads from the Today page
// New in v2.0 Removes all adds from all pages
// New in v3.0 Completely redesigned to use a style-sheet form of manipulation (less processor hungry)
// BugFix v3.1 Alterations made so the script works with the "Classic" version of windows live
// BugFix v4.0 Alterations made so the script works with some changes in the UK localisation
// BugFix v4.1 More includes added as they seem to have altered some of the url's
// BugFix v4.2 Now removes the ads on the right
// BugFix v4.3 Now removes the ads after sending a mail and also the "Quick Add" panel when writing mails
// BugFix v4.4 Removal of small ad on lhs (after hotmail update approx 2010-07-28)
// BugFix v4.5 Removal of new feature, info pain (!

var css = "@namespace url(http://www.w3.org/1999/xhtml); .cAdBannerContainer, #FooterContainer, #RadAd_Today300, .cRadAds, .cToolsCustomerCommunication, .c120x60CustomerCommContainer, .CustComm_120x60, .dSideAds , #dapIfM0, #RadAd_Banner, #RadAd_TodayPage_Banner, #RadAd_Skyscraper, #IAPWrapper, .SideAdCol, .Crm120Container, #infoPaneContainer { display: none !important; }  .TodayDefault, .cContentInner { margin-right: 0px !important; } #MainContent, #ManagedContentWrapper { right: 0px !important; margin-right: 2px !important ;}";
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