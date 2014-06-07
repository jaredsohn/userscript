// ==UserScript==
// @name           Removes suggested followers from Google+
// @namespace      com.mohamedmansour.googleplus.suggestedremove
// @description    Removes the suggested followers from Google+
// @version        1.0
// @include        https://plus.google.com/*
// ==/UserScript==

var suggestedFollow = document.querySelector('div[componentid="4"]');
if (suggestedFollow) {
  suggestedFollow.parentNode.removeChild(suggestedFollow);
}

var suggestedLike = document.querySelector('div[componentid="33"]');
if (suggestedLike) {
  suggestedLike.parentNode.removeChild(suggestedLike);
}