// ==UserScript==
// @name           Disable Metrolyrics anti-copy
// @namespace      Disable Metrolyrics anti-copy
// @description    Disables MetroLyrics anti-copy lyrics protection. Thanks to Lukas for the userscript
// @include        http://www.metrolyrics.com/*
// ==/UserScript==
setTimeout("document.oncontextmenu = document.onmousedown = document.onclick = document.onselectstart = document.onselect = null;", 1000);