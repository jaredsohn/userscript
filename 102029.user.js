// Based on contarc's "Google Secure Pro"
// http://userscripts.org/scripts/review/5951
// ==UserScript==
// @name          Secure NZB Matrix
// @description   Forces NZB Matrix to use secure connection.
// @include       http://www.nzbmatrix.com/*
// @include       http://nzbmatrix.com/*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}