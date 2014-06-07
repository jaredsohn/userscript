// ==UserScript==
// @name           IRC-Galerie Downloader
// @namespace   2009-04-03:madkai
// @description    Fügt Download-Button in der dt. IRC-Galerie hinzu
// @include        http://ircgalerie.net/*
// ==/UserScript==

var newElement;
var galtsukuva = document.getElementById('viewimage_image');
var galtsuviewcaption = document.getElementById('viewcaption');
if (galtsukuva) {
	newElement = document.createElement('a');
	newElement.innerHTML = 'Download';
	newElement.href = galtsukuva.src;
	galtsuviewcaption.parentNode.insertBefore(newElement, galtsuviewcaption.nextSibling);
}