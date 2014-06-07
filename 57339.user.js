// ==UserScript==
// @name           _delete
// @namespace      nk
// @include        http://*nasza-klasa.pl/*
// ==/UserScript==

var syf = document.getElementById('sledzik_box');
if (syf) {
  syf.parentNode.removeChild(syf);
}

var syf = document.getElementById('allegro_box');
if (syf) {
  syf.parentNode.removeChild(syf);
}