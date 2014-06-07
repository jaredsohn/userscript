// ==UserScript==
// @name           SVZ - Buschfunk entfernen
// @namespace      DFox
// @description    Entfernt den Buschfunk auf der schuelervz Startseite !
// @include        http://*.schuelervz.net/*
// @include        http://*.studivz.net/*
// ==/UserScript==

var buschfunk = document.getElementById('Mod-Feedbox-Snipplet');
if (buschfunk) 
{
    buschfunk.parentNode.removeChild(buschfunk);
}