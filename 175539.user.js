// ==UserScript==
// @name        Remove Ticker YouTube
// @namespace   http://localhost
// @description Removes annoying promotional banner on YouTube.
// @include     http*://*.youtube.*/*
// @version     1.0
// ==/UserScript==
var elmDeleted = document.getElementById("ticker");
	elmDeleted.parentNode.removeChild(elmDeleted);
