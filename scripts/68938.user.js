// ==UserScript==
// @name         Replace Google Logo
// @namespace     http://localhost/
// @description   Google Logo mit beliebigem Bild ersetzen
// @include      http://*.google.*/*

// Bitte die URL unten gegen ein eigenes Bild bzw. die URL des Bildes austauschen.
// Replace URL with URL of your own Picture.
// Be nice, it is our first Script. Greetz, SemperVideo.de

// ==/UserScript==
var theImage;
theImage = document.getElementById('logo');
if (theImage) {
	theImage.src='http://farm3.static.flickr.com/2796/4355411743_440b6f441e_o.jpg';
}