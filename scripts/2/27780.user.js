// ==UserScript==
// @name           Shut the fuck up about your free apple iphone
// @namespace      http://centsports.com
// @description    turns the volume off on the ad
// @include        http://*.centsports.com/*
// @exclude        http://*.centsports.com/forum/*
// ==/UserScript==



var annoyingAd = document.getElementById('movie');
if (annoyingAd) {
    annoyingAd.parentNode.removeChild(annoyingAd);
}
