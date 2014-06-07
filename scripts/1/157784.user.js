// ==UserScript==
// @name           Dota 2 Wiki Sidebar Remover
// @namespace      underyx
// @description    Removes that god awful sidebar from the Dota 2 Wiki
// @include        http://*.dota2wiki.com/*
// @include        https://*.dota2wiki.com/*
// @match          http://*.dota2wiki.com/*
// @match          https://*.dota2wiki.com/*
// @version        0.1
// ==/UserScript==

GM_addStyle("div#bodyContent2 {margin-right: 0px; min-height: 0px; }");
GM_addStyle("#curse-panel {display: none; }");
