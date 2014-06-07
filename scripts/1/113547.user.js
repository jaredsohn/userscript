// ==UserScript==
// @name           View count di youtube nel formato italiano
// @namespace      :) :D
// @description    Modifica il view count alla versione italiana aggiungendo un puntino in alto ogni 3 cifre
// @include        http://*youtube.com/*
// ==/UserScript==

var exibitions = document.getElementsByClassName('watch-view-count');
exibitions[0].children[0].innerHTML = exibitions[0].children[0].innerHTML.split(/(?=(?:\d{3})*$)/).join('&#0729;');