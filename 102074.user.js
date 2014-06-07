// Based on contarc's "Google Secure Pro"
// http://userscripts.org/scripts/review/5951
// ==UserScript==
// @name          Secure ISO Hunt
// @description   Forces HTTPS when browsing ISO Hunt.
// @include       http://www.isohunt.com/*
// @include       http://isohunt.com/*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}