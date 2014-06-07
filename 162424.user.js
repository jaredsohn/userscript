// ==UserScript==
// @name        Révéler tous les numéros de tel
// @namespace   http://userscripts.org/scripts/show/162424
// @include     http://www.pagesjaunes.fr/*
// @version     1
// ==/UserScript==


var cache = document.getElementsByClassName("userContactTel");

for (i=0; i < cache.length; i++) {
    cache[i].className += " js_hide";
}

var tel = document.getElementsByClassName("hideTel");

for (i=0; i < tel.length; i++) {
    tel[i].style.display="list-item";
}
