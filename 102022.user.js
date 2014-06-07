// Based on contarc's "Google Secure Pro"
// http://userscripts.org/scripts/review/5951
// ==UserScript==
// @name          Secure Newzbin
// @description   Forces Newzbin to use secure connection.
// @include       http://www.newzbin.com/*
// @include       http://newzbin.com/*
// @include       http://docs.newzbin.com/*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,7) == 'http://') { 
window.location.replace(url.replace(url.substring(0,7), 'https://')); 
}