// ==UserScript==
// @name           Force new tab
// @creator        spud
// @description    Always open hyperlinks in a new tab.
// @version        0.1 alpha
// @include        http://*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].target = "_blank";
}