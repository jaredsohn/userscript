// ==UserScript==
// @name           Ircgalleriadownload
// @namespace      tag:it.org,2008-04-03:furrfu
// @description    Lisää IRC-gallerian kuviin latauslinkki
// @include        http://irc-galleria.net/*
// @include        http://*.irc-galleria.net/*
// ==/UserScript==

var newElement;
var galtsukuva = document.getElementById('viewimage_image');
var galtsuviewcaption = document.getElementById('viewcaption');
if (galtsukuva) {
	newElement = document.createElement('a');
	newElement.innerHTML = 'Lataa';
	newElement.href = galtsukuva.src;
	galtsuviewcaption.parentNode.insertBefore(newElement, galtsuviewcaption.nextSibling);
}