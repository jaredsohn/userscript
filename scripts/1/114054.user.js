// ==UserScript==
// @name NFL Fantasy Remove Ads 2012
// @namespace NFLFantasyRemoveAd
// @description This script will remove the ads on nfl's fantasy pages when viewing your live scores.  It helps makes the page "fit" better on your monitor/tablet without having to scroll as much.
// @include http://fantasy.nfl.com/*
// @match http://fantasy.nfl.com/*
// ==/UserScript==


var adSidebar = document.getElementById('subHd');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var adSidebar2 = document.getElementById('teamMatchupTopper');
if (adSidebar2) {
    adSidebar2.parentNode.removeChild(adSidebar2);
}

var adSidebar3 = document.getElementById('gc-notice');
if (adSidebar3) {
    adSidebar3.parentNode.removeChild(adSidebar3);
}

var adSidebar4 = document.getElementById('subHeaderTOPPERcontainer');
if (adSidebar4) {
    adSidebar4.parentNode.removeChild(adSidebar4);
}

