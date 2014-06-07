// ==UserScript==
// @name        Woot Woot
// @version    0.2
// @description Fits video to screen
// @include        http://*.wootly.ch/?*
// @include        http://wootly.ch/?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_addStyle
// ==/UserScript==

$("#mplayer_wrapper").css("position", "fixed").css("top", "0px").css("bottom", "0px").css("left", "0px").css("right", "0px").css("width", "100%").css("height", "100%");