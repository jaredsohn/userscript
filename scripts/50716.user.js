// ==UserScript==
// @name           Facebook Ad Killer
// @namespace      http://amikrop.gr/code.php
// @description    Hides Facebook sidebar ads
// @include        http://*.facebook.com/*
// ==/UserScript==

var ads;

ads = document.getElementById('sidebar_ads');

if (ads) {
    ads.style.visibility = 'hidden';
}
