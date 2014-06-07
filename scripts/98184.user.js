// ==UserScript==
// @name           Remove Exclamtion Mark From Misson Icon
// @version        0.1
// @namespace      http://www.erepublik.com/en?SeremNaAdmine
// @description    Remove exclamation mark from missions icon
// @include        http://www.erepublik.com/*
// ==/UserScript==

var adSidebar = document.getElementById('point');
if (adSidebar) { adSidebar.parentNode.removeChild(adSidebar); }