// ==UserScript==
// @name           Force links to open in same tab
// @creator        Xavi Esteve
// @namespace      http://www.xaviesteve.com
// @description    Firefox, Opera... all nowadays browsers work through tabs, so we should decide whether opening links in a new tab or not.
// @version        0.1 alpha
// @include        http://*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].target = "_top";
}