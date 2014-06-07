// ==UserScript==
// @name           Remove Link Target
// @creator        kousi
// @description    Removes target attribute completely.
// @version        1.0
// @include        http://*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].removeAttribute("target");
}