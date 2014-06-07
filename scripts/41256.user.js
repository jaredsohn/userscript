// ==UserScript==
// @name           Remove Joystiq 3.0 promo marquee
// @namespace      joystiq.com
// @include        http://*.joystiq.com/*
// ==/UserScript==

var promoArea = document.getElementById('promo-area');
if (promoArea) {
    promoArea.parentNode.removeChild(promoArea);
}