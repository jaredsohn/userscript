// ==UserScript==
// @name          Pictrade DropAds
// @description   removes ads on pictrade
// @include       http://pictrade.info/*
// @include       http://*.pictrade.info/*
// ==/UserScript==

setTimeout('var t = document.getElementById(\'JPopContainter\');t.parentNode.removeChild(t);',1000);