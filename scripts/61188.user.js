// StudiVZ Kontextmenue Freischalter
// mady by Jerk -- Jerkaholic@GoogleMail.com
// ==UserScript==
// @name          StudiVZ Anti-Anti-Rechtsklick
// @description   Lässt Bilder bei StudiVZ wieder ganznormal über Rechtsklick speichern!
// @include       http://www.studivz.net/*
// ==/UserScript==

var theImage;
theImage = document.getElementById('PhotoContainer');
var Attrib = theImage.getElementsByTagName('img')[0];
Attrib.removeAttribute("oncontextmenu");
