// ==UserScript==
// @name           tar.hu design fix
// @namespace      http://persistent.info/greasemonkey
// @include        http://*.tar.hu/*
// @description    This scripts compacts the header of the page to make it more content oriented.
// ==/UserScript==
GM_addStyle("div.magnum { display: none; }");
GM_addStyle("div.main2menuRight { top: 46px; }");
GM_addStyle("p.tarlogo img { width: 30px; height: 30px; }");
GM_addStyle("div.main2top { height: 20px; }");
GM_addStyle("div.quickstat { display: none; }");
GM_addStyle("iframe.adtop { display: none; }");
