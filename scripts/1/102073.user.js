// Based on contarc's "Google Secure Pro"
// http://userscripts.org/scripts/review/5951
// ==UserScript==
// @name          Secure The Pirate Bay
// @description   Forces The Pirate Bay to use secure connection.
// @include       http://www.thepiratebay.org/*
// @include       http://thepiratebay.org/*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}