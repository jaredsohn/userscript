// ==UserScript==
// @name         Hainholz Logo
// @namespace     http://localhost/
// @description   Google Logo mit beliebigem Bild ersetzen
// @include      http://*.google.*/*
// @version 1.2
// @created 2010-03-21
// @email Info@sempervideo.de
// Bitte die URL unten gegen ein eigenes Bild bzw. die URL des Bildes austauschen.
// Replace URL with URL of your own Picture.
// Replace Height and Width with the appropriate Values of your own Picture.
// Be nice, it is our first Script. Greetz, SemperVideo.de
// ==/UserScript==

var theImage;
theImage = document.getElementById("logo");
if (theImage) {
theImage.height="200";
theImage.width="1200";
theImage.src="http://www.bilder-hochladen.net/files/e9g8-4.jpg";
}