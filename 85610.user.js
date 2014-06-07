// ==UserScript==
// @name           Fuera Weborama
// @namespace      http://www.vagos.es/ y iespana.es
// @description    Elimina la ventana de publicidad (Weborama) de la derecha proveniente de weborama
// @include        http://web.iespana.es/*
// @include        http://www.vagos.es/*
// ==/UserScript==
elemento = document.getElementById('webo_pub');
while(elemento!=null){
     elemento.parentNode.removeChild(elemento);
     elemento = document.getElementById('webo_pub');
}