// ==UserScript==
// @name         Replace Google Logo
// @namespace     http://localhost/
// @description   Google Logo mit beliebigem Bild ersetzen
// @include      http://*.google.*/*

// Bitte die URL unten gegen ein eigenes Bild bzw. die URL des Bildes austauschen.
// Replace URL with URL of your own Picture.
// Be nice, it is our first Script. Greetz, SemperVideo.de

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "SemperVideo-Logo";
newLogo.border = 'no'
newLogo.src = 'http://www.sempervideo.de/sv-google.jpg';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);