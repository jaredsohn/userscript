// ==UserScript==
// @name           Bushfunk Stop
// @namespace      http://pixonder.de
// @description    entfernt den Bushfunk
// @include	http://*.studivz.net/*
// @include	http://*.studivz.de/*
// @include	http://*.schuelervz.net/*
// @include	http://*.schuelervz.de/*
// @include	http://*.meinvz.net/*
// @include	http://*.meinvz.de/*
// @version        0.2
// Neue Version mit Dank an JakobD (jd-blog.de)
// ==/UserScript==
// Stop-Buschfunk
var buschfunk = document.getElementById('Mod-Feedbox-Snipplet');
if (buschfunk) {
    buschfunk.parentNode.removeChild(buschfunk);
}