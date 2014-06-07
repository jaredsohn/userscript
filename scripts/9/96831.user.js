// ==UserScript==
// @name          Tuenti Linker
// @namespace     http://www.idevthingsyoulike.site88.com/
// @description   Habilita la opcion de abrir el un link a la imagen desde el menu "Mas opciones". Desarrolado por Kas
// @include       http://www.tuenti.com/*
// @match 	  http://www.tuenti.com/*
// ==/UserScript==

document.addEventListener('click', function(event) {

var url = window.location.href;
var idimagen = "photo_image_" + url.replace('http://www.tuenti.com/#m=Photo&func=view_photo&collection_key=', '')
var srcimagen = document.getElementById(idimagen).src

var codigokas = ',{"item_id":"copy_photo_link","item_label":"Abrir Link","link_href":"javascript:window.open(' + "'" + srcimagen + "'" + "," + "'Link de la imagen'" + ')","link_class":"download"}]});return false;'

var codigoaborrar = ']});return false;'

var boton = document.getElementById('more_options_button');
var codigobotonoriginal = boton.getAttribute('onclick');

var codigofinal = codigobotonoriginal.replace( codigoaborrar, codigokas )



if (codigobotonoriginal.indexOf("copy_photo_link") < 0) {
boton.setAttribute('onclick', codigofinal);
}


}, true);



