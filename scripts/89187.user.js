// ==UserScript==
// @name           CSFD reklamy
// @namespace      Catfood
// @include        http://www.csfd.cz/*
// @description    Skript pouze zneviditelnuje reklamy, ktere se normalne zobrazuji nad hlavickou a zprava a zleva kolem ni.
// ==/UserScript==

var ad_div = document.getElementById("ads");
ad_div.setAttribute("style", "display:none");