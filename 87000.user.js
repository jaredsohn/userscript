// ==UserScript==
// @name           y7tv
// @namespace      userscripts.org
// @description    clean yahoo7 tv guide
// @include        http://au.tv.yahoo.com/tv-guide/*
// ==/UserScript==
GM_addStyle("#ygma, #lightbox_press, #main-nav, #hd, .quick-search, #tvguide-help-text, .genres, .advanced { display:none !important; } ");
GM_addStyle("#tvguide, .hd {padding-top: 0;}");
document.getElementsByTagName("body").item(0).className = "fixed fullscreen";
