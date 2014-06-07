// ==UserScript==
// @name           Grepolis Szövetségi Fórum
// @version        1.0
// @namespace      Grepolis Szövetségi fórum
// @include        http://*.grepolis.*
// @description    Engedélyezi bal oldalt a Szövetségi fórum megjelenítését
// ==/UserScript==

document.getElementById("links").getElementsByTagName("a")[4].innerHTML= "Sz.fórum";