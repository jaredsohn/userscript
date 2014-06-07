// Infojobs Patch
// version 0.2 beta!
// 22/08/2006
// Copyright (c) 2006, Javier Pýrez <javier.perez.m@gmail.com> http://javierperez.eu
//
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Infojobs Patch", and click Uninstall.
//
// --------------------------------------------------------------------
//
// BUGS CORREGIDOS:
//	22/08/2006
//	- La ficha de la oferta obtenida no contiene el botýn "Inscrýbete a esta oferta".
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name Infojobs Patch
// @namespace http://javierperez.eu/projects/home/infojobs-patch/
// @description Convierte los enlaces javascript de las býsquedas en Infojobs, en enlaces a url's de sus fichas correspondientes.
// @include http://www.infojobs.net/*
// ==/UserScript==

var INFOJOBSPATCH_VERSION = '0.2 beta';
var INFOJOBSPATCH_HOME = 'http://javierperez.eu/projects/home/infojobs-patch/';

function infojobs_patch() {
	if (document.location.pathname == '/busqueda_ofertas_resultados.cfm') {
		// *** Resultados de la býsqueda ***
		// Se obtienen todos los elementos A (enlaces)
		var a = document.getElementsByTagName('A');
		for (var i=0; i<a.length; i++) {
			// Sýlo se procesan los enlaces javascript que llamen a la funciýn relaunchView
			var data = a[i].href.match(/^javascript:relaunchView\('item_form_codigo','([0-9]*)'\)$/);
			if (data) {
				// Se encontrý el cýdigo de la oferta, y se sustituye el enlace javascript por un enlace normal a su ficha
				a[i].href = "/ver_oferta_inscripcion.cfm?of_codigo=" + data[1];
			}
		}
	} else if (document.location.pathname == '/ver_oferta_inscripcion.cfm' && document.location.search.indexOf('?of_codigo=')!=-1) {
		// *** Ficha de una oferta obtenida mediante Infojobs Patch ***
		// expreg para obtener el cýdigo de la oferta
		
		var data = document.location.search.match(/^\?of_codigo=([0-9]*)$/i);
		if (data) {
			// Se busca el lugar donde insertar el botýn de "Inscrýbete..."
			var spans = document.getElementsByTagName('SPAN');
			for (var i=0; i<spans.length; i++) {
				if (spans[i].className == 'Inscritas') {
					// Se encontrý el elemento donde debe ir el botýn
					// Se crea el enlace con la imagen, y se meten en un contenedor DIV
					// a - enlace con la imagen
					var a = document.createElement('A');
					a.href = "inscripcion_oferta.cfm?id_oferta=" + data[1];
					// img - icono Inscrýbete...
					var img = document.createElement('IMG');
					img.src = "http://media.infojobs.net/inscribirse_01.jpg";
					a.appendChild(img);
					// ajp - link al proyecto
					var ajp = document.createElement('A');
					ajp.href = INFOJOBSPATCH_HOME;
					ajp.appendChild(document.createTextNode('Infojobs Patch '+INFOJOBSPATCH_VERSION));
					// div - contenedor
					var div = document.createElement('DIV');
					div.style.textAlign = 'center';
					div.appendChild(a);
					div.appendChild(document.createElement('BR'));
					div.appendChild(ajp);
					
					// Se inserta en el lugar adecuado
					spans[i].insertBefore(div, spans[i].firstChild);
					// Se finaliza
					break;
				}
			}
		}
	}
}

infojobs_patch();
