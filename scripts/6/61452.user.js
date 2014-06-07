// ==UserScript==
// @name           Disable Metrolyrics & Lyrics.com anti-copy
// @namespace      Disable Metrolyrics & Lyrics.com anti-copy
// @description    Disables MetroLyrics & Lyrics.com anti-copy lyrics protection. Thanks to Lukas for the userscript. Modified by blagus (added Lyrics.com)
// @include        http://www.metrolyrics.com/*
// @include        http://www.lyrics.com/*
// ==/UserScript==
setTimeout("document.oncontextmenu = document.onmousedown = document.onclick = document.onselectstart = document.onselect = null;", 1000);