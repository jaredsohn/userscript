// ==UserScript==
// @name           Remove Runescape Ads (Ingame)
// @namespace      Remove Runescape Ads (Ingame)
// @description    Remove Runescape Ads (Ingame)
// @include        *runescape.com/*
// Author		   Jordy Kroeze
// ==/UserScript==

var tb = document.getElementById('tb');
if (tb) {
    tb.parentNode.removeChild(tb);
}