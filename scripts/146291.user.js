// ==UserScript==
// @name          Youtube Ads Remover
// @version       1.0
// @description   Removes youtube ads
// @match         http://www.youtube.com/*
// ==/UserScript==

var ids = ["instream_google_companion_ad_div", "premium-yva", "ad_creative_1", "ad_creative_2", "ad_creative_3", "iyt-login-suggest-box", "homepage-sidebar-ads", "watch-channel-brand-div"];

for (var id in ids)
{
    var ad = document.getElementById(ids[id]);
    
    if (ad && ad.parentNode)
    ad.parentNode.removeChild(ad);
}