// ==UserScript==
// @name           No Tripod Ads
// @description    Remove the ads on a tripod site.
// @include        http://*.tripod.com/*
// ==/UserScript==

document.getElementById('tb_ad').innerHTML = ''
document.getElementById('tb_ad').style = 'display: none;'
document.getElementById('FooterAd').style = 'display: none;'
document.getElementById('FooterAd').innerHTML = ''