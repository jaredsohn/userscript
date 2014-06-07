// ==UserScript==
// @name           Dicfor szótár finomító
// @namespace      dicfor.com
// @description    Szótáras keresésnél kapásból a találatokhoz görget
// @include        http://*.dicfor.com/*
// ==/UserScript==

$ = unsafeWindow.$;
window.addEventListener("load", function(event) { $('results').scrollTo(); }, false);
