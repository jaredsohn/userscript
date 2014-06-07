// ==UserScript==
// @name           NickEol
// @namespace      nickEol
// @description    Nuestros nicks en Eol para eolianos en G+
// @include        https://plus.google.com/*
// ==/UserScript==

//nombres
var nombre = new Array(2);
nombre[0] = 'nombre en G+';


//nicks
var nick = new Array(2);
nick[0] = 'nick_usuario';


cargarNicks();

function cargarNicks(){
	var aItems = document.getElementsByTagName("A");
	for (var i=0; i<aItems.length; i++) {
		for(var j=0; j<nombre.length; j++){
			if(aItems[i].innerHTML == nombre[j]){
      			var old = aItems[i].innerHTML;
      			aItems[i].innerHTML = old + ' (' + nick[j] + ')';
      		}
		}
	}
}