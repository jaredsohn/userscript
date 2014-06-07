// ==UserScript==
// @name         Replace Google Logo into SHGGhettokids Logo
// @namespace     http://www.youtube.com/shgghettokids
// @description   Google Logo mit unserem Suchen Bild ersetzen
// @include      http://*.google.*/*

// Nutze die Google Suche mit einer schönen Grafik von uns
// anstatt dem langweiligen Google Logo.
// Powered by http://www.youtube.com/shgghettokids

// ==/UserScript==
var oldLogo = document.getElementById('logo');
var newLogo = document.createElement('img');
newLogo.id = "SHGGhettokids-Search";
newLogo.border = 'no'
newLogo.src = 'http://www.bilder-hochladen.net/files/hb5g-3.png';
oldLogo.parentNode.replaceChild(newLogo, oldLogo);