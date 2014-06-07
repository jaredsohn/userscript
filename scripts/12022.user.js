// version 0.1
// 5 Abril 2006
// Copyright (c) 2006, sinchar
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Adds ally tags and color in galaxy view
// ==UserScript==
// @name ogame-alianza 
// @author sinchar - modificado por blackraist
// @description Relacion con alianzas Ogame - Ogame ally relations. Se agregan etiquetas y colores a las alianzas en la vista de galaxia.
// @include      http://uni*.ogame.*/game/*
// ==/UserScript==

(function(){

		var listado = new Array;

//Para su correcto funcionamiento se deben indicar las etiquetas, colores y listado de alianzas
//se pueden añaden todas las lineas de etiquetas que necesitemos.

//It is necesary set TAGs, colors and list of alliances
//It is posible add any lines like TAGs we need.

//                          Etiqueta   Color      Lista de alianzas
     listado[0] = new Array ("TAG1",   "green",   "ally1","ally2");
     listado[1] = new Array ("TAG2",   "red",     "ally3");
     listado[2] = new Array ("TAG3",   "lime",    "ally4");
     listado[3] = new Array ("TAG4",   "blue",    "ally5");

//    }

	if (document.baseURI.indexOf("/index.php?page=galaxy") != -1 ) {		
		// busca los enlaces activos
		var pagina = document.getElementsByTagName ('a');
		for (var i = pagina.length - 1; i >= 0; i--) {
			alianza = pagina[i].innerHTML;
			alianzac = alianza + "#";
			// busca y resalta las alianzas
			for (var h = listado.length - 1; h >= 0; h--) {
				for (var j = listado[h].length - 1; j > 1; j--) {
					if(alianzac.search(listado[h][j]+" #") != -1 ) {
						if (listado[h][0]!='') {
							pagina[i].innerHTML = alianza+'('+listado[h][0]+')';
						}
						pagina[i].style.color=listado[h][1];
					}
				}			
			}

		}
	}

}) ();