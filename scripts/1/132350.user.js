// ==UserScript==
// @name           multiplayer.it add removal
// @namespace      http://userscripts.org/scripts/show/132350
// @include        http://multiplayer.it/adv/interstitial/*
// ==/UserScript==

var string = window.location.href ;

window.location.href = "http://multiplayer.it/"+string.slice(string.search("next=/") + 6);