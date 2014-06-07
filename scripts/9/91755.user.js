// ==UserScript==
// @name           Animextremist click&next
// @namespace      Rutrus|gmail|yahoo-es
// @description    Mejora el visor de viñetas en animextremist.com ; Mejoras de visionado y usabilidad.
// @include        http://www.animextremist.com/mangas-online/*
// @include        http://animextremist.com/mangas-online/*
// ==/UserScript==


var iframe = document.getElementsByTagName("iframe")[0];
var padre = iframe.parentNode;
padre.removeChild(iframe);

var menuSelect = document.getElementsByTagName("div")[0];
menuSelect.style.margin = "50px";
padre = menuSelect.parentNode;
var menuSelect = padre.removeChild(menuSelect);

// Eliminamos tabla vacía
var arrayTable = document.getElementsByTagName("table");
padre = arrayTable[0].parentNode;
padre.removeChild(arrayTable[0]);

var arrayH1 = document.getElementsByTagName("h1");
arrayH1[0].style.display = "none";

var menuNav = document.getElementById("navigation");
var arrayA = menuNav.getElementsByTagName("a");
var puntero, prev, next;
if (arrayA.length == 3){
	puntero = 0;
	prev = arrayA[puntero].href;
	puntero = 2;
	next = arrayA[puntero].href;
} else {
	prev = null;
	puntero = 1;
	next = arrayA[puntero].href;
}

var clic = document.createElement("a");
clic.href = next;
clic.id = "siguiente";

var idPhoto = document.getElementById('photograph'); 
var imagen = idPhoto.getElementsByTagName('img')[0];
imagen.id = "imagen";
imagen.title = "";
clic.appendChild(imagen);
idPhoto.insertBefore(clic,idPhoto.firstChild);
menuNav.appendChild(menuSelect);