// ==UserScript==
// @name           Dave
// @namespace      Dave
// @description    Replaces the word anonymous with the word Dave
// @include        http://boards.4chan.org/*
// ==/UserScript==
var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/Anonymous/g, 'Dave');
}