// ==UserScript==
// @name          Remove Facebook Ads
// @namespace     sizzlemctwizzle
// @description   Uses a small amount of CSS to remove advertisements
// @require       http://sizzlemctwizzle.com/updater.php?id=46560
// @version       1.5.3
// @unwrap
// @include       http://*.facebook.com/*
// ==/UserScript==
(function() {
var head = document.getElementsByTagName('head')[0], 
    style = document.createElement('style');
if (!head || self.location != top.location) {return}
style.type = 'text/css';
style.textContent = '#right_column { width: 77% !important; }' +
                    ' .ad_capsule, #sidebar_ads, .adcolumn, .emu_sponsor' +
                    ', div[id^="emu_"], .social_ad, .sponsor, .footer_ad,' +
                    ' #home_sponsor, .house_sponsor, #home_sponsor_nile, ' +
                    '.PYMK_Reqs_Sidebar, .LSplitPage_Right { display:' +
                    ' none !important; } #wallpage { width: 700px !important; }' +
                    ' .LSplitView_ContentWithNoLeftColumn, ' +
                    '.FN_feedbackview { width: 100% !important; }';
head.appendChild(style);
})();