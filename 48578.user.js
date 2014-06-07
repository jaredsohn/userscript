// ==UserScript==
// @name          Inactivos en rojo
// @namespace     Inactivos
// @author        Adelsork (Adaptado a la versión (v 0.84) por Saelos)
// @description	  Muestra en la visión de galaxia los inactivos en rojo.
// @include       http://uni*.ogame.*/index.php?page=galaxy*
// @exclude       http://uni42.ogame.org/*
// @exclude	  http://uni6.ogame.de/*
// ==/UserScript==

var allElements, thisElement;
var cadena, suma;
allElements = document.getElementsByTagName('span');for (var i = 0; i < allElements.length; i++) {thisElement = allElements[i];if (thisElement.className.substring(0,8)=='inactive'){thisElement.style.color = "red";}if (thisElement.className.substring(0,12)=='longinactive'){thisElement.style.color = "red";}}
//Script creado por Adelsork.