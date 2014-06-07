// ==UserScript==
// @name           Munin dynamic image size fixer
// @namespace      http://userscripts.org/users/200448
// @description    Delete height and width from all img tags, giving correct image size on munin sites with dynamic generation of graph images. (graph_strategy cgi)
// @include        http*://*/munin/*
// @include        http*://munin.*/*
// ==/UserScript==
var imgs = document.getElementsByTagName("img");
for (i=0; i<imgs.length; i++) {
  imgs[i].removeAttribute('width');
  imgs[i].removeAttribute('height');
}