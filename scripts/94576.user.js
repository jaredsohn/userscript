// ==UserScript==
// @name           UsunicieLogoIw
// @namespace      "C:\rexgame bot on.js"
// @description    UsunicieLogoIw
// @include        http://s1.infinite-wars.com/*
// ==/UserScript==

var element = document.getElementById('topmenu');
var rodzic = document.getElementById('topmenu').parentNode;

rodzic.removeChild(element);

element = document.getElementById('ress');
element.style.top = '10px';

element = document.getElementById('main');
element.style.top = '50px';

element = document.getElementById('menu');
element.style.top = '10px';