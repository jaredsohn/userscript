// ==UserScript==
// @name           Hide New Facebook ticker stream.
// @namespace      Ryan
// @include        http://*.facebook.com/*
// ==/UserScript==

var ticker= document.getElementById('pagelet_ticker');
ticker.style.display=none;


