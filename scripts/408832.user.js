// ==UserScript==
// @name        Youtube - Show Only Video
// @namespace   http://userscripts.org
// @description Only shows video in youtube and NOTHING else
// @include     http://*.youtube.com/*
// @include     https://*.youtube.com/*
// @require	http://code.jquery.com/jquery-1.11.0.js
// @version     1
// @grant       none
// @downloadURL http://userscripts.org/scripts/source/408832.user.js
// @updateURL   https://userscripts.org/scripts/source/408832.meta.js
// ==/UserScript==
$(function(){
 $("#masthead-positioner,#watch7-main,#footer-container").remove();
});