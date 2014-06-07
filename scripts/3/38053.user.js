// Script per visualizzare le pagine di badoo
// Creato da Darkbyte (http://www.darkbyte.it)
//
// Versione 1.0
// ============
// 
//
// ==UserScript==
// @name          Badoo
// @namespace     http://www.darkbyte.it/projects/
// @description   Script per sbloccare l'uso delle immagini su badoo
// @include       http://badoo.com/*
// ==/UserScript==

var pwrap = document.getElementById("pwrap");
var pwrap_blur = document.getElementById("pwrap_blur");

if (pwrap && pwrap_blur)
{
  var zoom = document.getElementById("zoom");
  zoom = zoom.parentNode.removeChild(zoom);
  pwrap_blur.parentNode.removeChild(pwrap_blur);
  pwrap.parentNode.appendChild(zoom);
  pwrap.parentNode.removeChild(pwrap);
}