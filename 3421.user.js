// ==UserScript==
// @name          Splogcess
// @namespace     http://sniggle.net/
// @description   eliminates the annoying "SUCCESS" alert box at splogreporter.com
// @include       http://splogreporter.com/*
// @include       http://*.splogreporter.com/*
// ==/UserScript==
document.getElementsByTagName('body')[0].setAttribute("onload", "");
