// ==UserScript==
// @name           Disable Tumblr Radar
// @namespace      http://userscripts.org/users/462976
// @description    Disables Tumblr Radar, because it, you know, sucks.
// @include        http://www.tumblr.com/*
// ==/UserScript==

var elmDeleted = document.getElementById("tumblr_radar");
elmDeleted.parentNode.removeChild(elmDeleted);
