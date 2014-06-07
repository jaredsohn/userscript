// ==UserScript==
// @name           Hide Youtube Featured Videos
// @namespace      *
// @description    Hide Youtube Featured Videos
// @include        http://www.youtube.com/*
// ==/UserScript==

var elems = document.getElementsByClassName('watch-promoted-vid');
for (var i = 0; i < elems.length; i++) {
  elems[i].style.display = 'none';
}