// ==UserScript==
// @name           Hide Facebook Live Ticker
// @version        1.0
// @author         Kalemi Design
// @description    Get rid of the annoying Facebook Live ticker. Follow us at: https://www.facebook.com/Kalemi.Design
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/* 
// ==/UserScript==

document.getElementById("pagelet_rhc_ticker").style.display = 'none';
document.getElementById("pagelet_ticker").style.height = '0%';
