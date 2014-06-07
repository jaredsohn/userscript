// ==UserScript==
// @name           Epguides.com Search Fixed
// @namespace      http://www.zanloy.com/
// @version        1.1
// @downloadURL    https://zanloy.com/scripts/js/epguides_search_fixed.user.js
// @updateURL      https://zanloy.com/scripts/js/epguides_search_fixed.user.js
// @description    Change the search box to always return the first result.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match          http://www.epguides.com/*
// @match          http://epguides.com/*
// @copyright      2012+, Zan Loy
// ==/UserScript==

// Changelog:
// v1.1: Wrote script using jquery for better results
// v1.0: First Version

$("input[name='btnG']").attr("name","btnI");
