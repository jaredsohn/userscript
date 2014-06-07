// ==UserScript==
// @name           Mopedarmy Youtube Cleaner
// @namespace      userscripts.org
// @description    We love you Quatto, but my computer hurts
// @version        0.1
// @include        http://mopedarmy.com/*
// @include        http://www.mopedarmy.com/*
// ==/UserScript==

var videos = document.getElementsByTagName("embed");
if (videos.length > 10) for (var count = 0; count < videos.length; count++) videos[count].src='';
for (var count = 0; count < videos.length; count++) if (/.*Sd9Yibf_UXE.*/.test(videos[count].src)) videos[count].src='';