// ==UserScript==
// @name           Better Game Gen Design
// @namespace      DaMoggen
// @description    Changes http://videogamena.me/
// @include        http://videogamena.me/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = 'body { background-color: white; }.main{ color: black;}'
document.documentElement.appendChild(styleEl);