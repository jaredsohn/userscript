// ==UserScript==
// @name           Facebook.com - Hide freinds
// @description    hide friends
// @include        http://facebook.com/*
// @include        http://www.facebook.com/*
// @include        https://facebook.com/*
// @include        https://www.facebook.com/*
// @author         Omdich
// @require        http://userscripts.org/scripts/source/85365.user.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$("#pagelet_rhc_footer").hide();
$("#pagelet_ego_pane_w").hide();
