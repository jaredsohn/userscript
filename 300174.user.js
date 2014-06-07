// ==UserScript==
// @name            Ck101 - Remove GamePop
// @namespace       http://tsai.it/project/gmscripts/ck101-remove-gamepop/
// @version         0.1
// @description     A pop window will show every 5 minutes if no keyboard/mouse action happens. The script will remove this feature.
// @match           http://ck101.com/*
// @grant           unsafeWindow
// @copyright       2014+, I-Ta Tsai (http://tsai.it/)
// ==/UserScript==

// Use pre-loaded jQuery by ck101.
var $ = unsafeWindow.jQuery;

$( document ).ready(function() {
  $('.gamePop').remove();
  $('#popupGameAd').remove();
});