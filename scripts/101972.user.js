// ==UserScript==
// @name           Ad Hider
// @include        *se7ensins*
// @version                1.0
// ==/UserScript==
var aad = document.getElementById('google_ads_div_ATF-LB-Member_ad_container');
aad.parentNode.removeChild(aad);
var pad = document.getElementById('google_ads_div_1st-MR-Gst_ad_container').parentNode.parentNode.parentNode.parentNode;
pad.parentNode.removeChild(pad);
var ttx = document.getElementById('itxttt');
ttx.parentNode.removeChild(ttx);