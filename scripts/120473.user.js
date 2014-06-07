// ==UserScript==
// @name       twstats link jugadores
// @version    0.2
// @description  Este script sirve para añadir un boton al guerrastribales que linkea a
// @include    *.guerrastribales.es/*info_player*
// @copyright  2011+
// ==/UserScript==



	var url = window.location.href;
	var params = window.location.search;
	var aux1 = new Array();
	var aux2 = new Array();
	var cont = 0;
	var tot = 0;

	
		//eliminamos el primer caracter '?'
		params = params.substr(1);
		//insertamos en un array las parejas nombre=valor
		aux1 = params.split("&");
		tot = aux1.length;
		for (cont = 0; cont < tot; cont++){
			//separo el nombre del valor
			aux2 = aux1[cont].split("=");
                    if(aux2[0]="id"){
                            var id=aux2[1]
                           }}
	var link= "http://es.twstats.com/es6/index.php?page=player&id="+id;
var nombre=document.getElementById("footer_left");
//alert(nombre.innerHTML);
nombre.innerHTML = '<a href="'+link+'" target="_blank">Estad&iacute;sticas</a> -'+nombre.innerHTML;
