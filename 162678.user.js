// ==UserScript==
// @name        My TWC
// @namespace   http://userscripts.org/users/498057/scripts
// @description Filter The Weather Channel
// @include     http://*.weather.com/*
// @version     2
// @grant		GM_addStyle
// ==/UserScript==

GM_addStyle('body {overflow-x: hidden;}');
GM_addStyle('dt, h3, .wx-label {color: #008 !important}');
GM_addStyle('.wx-timestamp {color: #000 !important}');
GM_addStyle('#wx-header-tools, .wx-desktop-weather-btn, .wx-trending-stories, .wx-social-share-ls-wrapper, .wx-media-player, #wx-rail, #wx-display-mfw-local-alerts, .wx-free-title, #pagelet_mod_1, #pagelet_mod_2, #pagelet_mod_3, #pagelet_mod_4, #pagelet_mod_5, #pagelet_mod_6, #pagelet_mod_7, #pagelet_mod_8, .wx-lifestyles, .wx-cool-tools-nav, .wx-media-top, #wx-footer, #feedbackify {display: none !important}');

//