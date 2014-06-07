// ==UserScript==
// @name           Spiegel.de Panorama Killer
// @namespace      *
// @include        http://www.spiegel.de/*
// ==/UserScript==

var panoramaDiv = document.getElementById('spRessortBoxNav_panorama');
if (panoramaDiv) {
    panoramaDiv.parentNode.removeChild(panoramaDiv);
}

