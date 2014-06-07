// ==UserScript==
// @name        Spiegel Online Adblock-Hinweis blocken
// @namespace      *
// @description Entfernt die groß rote Bettel-Box, die darum bittet, Adblocker zuzulassen.
// @include        http://www.spiegel.de/*
// @version     1
// ==/UserScript==

var a = document.getElementById('spWrapper')
var child = a.childNodes[0];
child.style.display = 'none';
