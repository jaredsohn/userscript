// ==UserScript==
// @name           PC INpact - bloc "Prix du Net" invisible
// @namespace      *
// @description    Supprime l'affichage du bloc "Prix du Net" de PC INpact (v5)
// @include        http://www.pcinpact.com/*
// ==/UserScript==

var sidebar = document.getElementById('sidebar');
var prixdunet = document.getElementById('prixdunet');

sidebar.removeChild(prixdunet);