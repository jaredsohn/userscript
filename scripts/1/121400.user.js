// ==UserScript==
// @name           bbl
// @namespace      
// @description    bb limitieren und auf klick vergroessern. nutzlos fuer jeden ausser mich!
// @include        http://quake.ingame.de/forum/autoforum-416/*
// ==/UserScript==

var e = document.createElement("script");

e.src = 'http://bennorz.de/gm/bildbreitenlimit.js';
e.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(e);