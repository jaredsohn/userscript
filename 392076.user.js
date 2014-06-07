// ==UserScript==
// @name           Grepolis - ChatPlus
// @namespace      Grepolis - ChatPlus
// @description    Speichert den Chat Verlauf extern, damit man auch sehen kann was geschrieben wurde, während man nicht im Chat war. Erweitert den Chat zusätzlich um einige nützliche Features.
// @include        http://*.grepolis.*/game*
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://marco93.de/grepolis/chatPlus/chatPlus.js";
newScript.id = "grepolis_tonda_cp";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);