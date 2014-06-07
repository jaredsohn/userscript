// ==UserScript==
// @name           YouTube Disable Auto Play Next
// @namespace      http://YouTube.com/Urgo6667
// @description    Disables the auto playing of the next video
// @description    http://userscripts.org/scripts/show/82537
// @include        http://youtube.*/watch?*
// @include        http://*.youtube.*/watch?*
// @include        http://youtube.*/watch#*
// @include        http://*.youtube.*/watch#*
// ==/UserScript==

GM_addStyle("#quicklist-bar{display: none}");
GM_addStyle("#quicklist-bar-container{display: none}");
GM_addStyle("#quicklist-tray-container{display: none}");

if (/[\?&]videos/i.test(document.location.href)) 
    document.location.replace(document.location.href.replace("videos","stopthedamnautoplay"));

if (/[\?&]list/i.test(document.location.href)) 
    document.location.replace(document.location.href.replace("list","stopthedamnautoplay"));
