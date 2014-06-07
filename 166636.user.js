// ==UserScript==
// @name           Facebook Ticker Remover
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @grant          none
// @version        0.1
// ==/UserScript==

document.getElementById('pagelet_ticker').style.display = 'none';