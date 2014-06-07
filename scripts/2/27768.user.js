// ==UserScript==
// @name           Verbeterde zoekfunctie (baggerlayout)
// @namespace      Verbeterde zoekfunctie (baggerlayout)
// @description    verwijdert het irritante zoeken-popup-dinges, en vervangt deze door een link naar een fatsoenlijke zoekmachine.
// @include        http://forum.fok.nl/*
// ==/UserScript==

var zoek = document.getElementById("menuTop").getElementsByTagName("a")[4]
zoek.innerHTML='<a href="http://www.thuisserver.net/foksearch">zoeken</a>'
zoek.removeAttribute("onmouseover")