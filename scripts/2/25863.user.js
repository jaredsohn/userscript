// ==UserScript==
// @namespace     http://rootshell.be/~grawity/
// @name          MetroLyrics: disable anti-copying
// @description   Disables "lyrics protection" on MetroLyrics.
// @include       http://www.metrolyrics.com/*
// @include       http://metrolyrics.com/*
// ==/UserScript==

var doc = document.getElementById("iframe_lyrics").contentDocument;

doc.oncontextmenu =
doc.onmousedown = 
doc.onclick = 
doc.onselectstart = 
doc.onselect = 
  function () { return true; }