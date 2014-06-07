// ==UserScript==
// @name        Mangahere modify
// @namespace   Mangahere modify
// @description More Clean
// @include     http://es.mangahere.com/manga/*
// @include     http://mangahere.com/manga/*
// @grant       none
// ==/UserScript==

v = document.getElementById('viewer');
gp = document.getElementsByClassName('go_page clearfix')[0];

padre = v.parentNode;
abuelo = padre.parentNode;
abuelo.removeChild(padre);
abuelo.appendChild(gp);
abuelo.appendChild(v);