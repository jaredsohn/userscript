// ==UserScript==
// @name           Hide Facebook Ticker
// @namespace      WP
// @include        https://*.facebook.com/*
// @include        http://*.facebook.com/*
// ==/UserScript==

var ticker= document.getElementById('pagelet_rhc_ticker');
var ticker1= document.getElementById('pagelet_ticker');

parentNode.style.display=none;
ticker1.style.display=none;