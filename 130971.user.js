// ==UserScript==
// @name           Removes trends from Google+
// @namespace      com.mohamedmansour.googleplus.hidetrends
// @description    Removes the trends from Google+
// @version        1.0
// @include        https://plus.google.com/*
// ==/UserScript==

var trendsDOM = document.querySelector('div[componentid="13"]');

if (trendsDOM) {
  trendsDOM.parentNode.removeChild(trendsDOM);
}