// ==UserScript==
// @name           Spiegel.de Panorama Killer
// @namespace      *
// @include        http://www.spiegel.de/*
// ==/UserScript==

var panoramaDiv = document.getElementsByClassName('clearfix module-box panorama')[0];
panoramaDiv.parentNode.removeChild(panoramaDiv);
