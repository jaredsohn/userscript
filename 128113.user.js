// ==UserScript==
// @name          Sacar el azul feo al boton Taringa Música
// @namespace  asd
// @description   ea
// @require        http://code.jquery.com/jquery-latest.min.js
// @include        *taringa.net*
// ==/UserScript==
jQuery(document).ready(function(){
	$('li#menu-section-musica a').attr ('style','none');
})