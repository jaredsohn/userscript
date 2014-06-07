// ==UserScript==
// @name          Remove MyNYTimes banner add
// @namespace     http://nytimes.com
// @description   removes the banner ad atop MyNYTimes
// @include       http://my.nytimes.com/*
// ==/UserScript==

var adElem = document.getElementById("adxLeaderboard");

adElem.parentNode.removeChild(adElem);