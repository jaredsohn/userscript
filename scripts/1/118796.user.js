// ==UserScript==
// @name           Runescape Fullscreen April 2012
// @namespace      http://userscripts.org/scripts/review/118796
// @description    This makes runescape playable in fullscreen.
// @include        *http://world*.runescape.com/*
// ==/UserScript==
// Last updated - Sunday April 8th, 2012

if(document.getElementById("top")){ 
var top = document.getElementById("top");
top.parentNode.removeChild(top);
}

if(document.getElementById("bottom")){ 
var bottom = document.getElementById("bottom");
bottom.parentNode.removeChild(bottom);
}