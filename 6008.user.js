// version 1.6
// 14 Mar 2006
// Copyright (c) 2006, Columdrum
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// Agregados algunos apanos, para poner el color de los informes de batalla
// Agregada un poco de compativilidad, para ser portado a otros idiomas

// ==UserScript==
// @name Ogame-ES 2
// @author aTx (Basado en Ogame-ES de columdrum)
// @description  Quita la publicidad (incluida la nueva de comandante Ogame) y colorea mensages
// @include     http://ogame*.de/*
// ==/UserScript==


(function(){

/* Compativilidad con otros idiomas: */
	var comander= 'Comandante';
	var regex1 = /gratis/gi;			//para poder ver la publicidad , si ofrecen el modo comanante gratis por X dias.
	var lng_battle= 'batalla'; 			// para detectar informes de batalla
	var lng_control= 'Control'; 			// para detectar si fue 1 ataque tuyo, o contra ti ( de "Control del espacio")
	var lng_return = 'Retorno de una flota';
	var lng_arrive = 'Llegada a un planeta';
	var lng_spy = 'espionaje';
	var lng_fleet = 'de la flota';  		// parte de "ordenes de la flota"/ "orden de la flota"
	var lng_ally = 'Mensaje circular de tu alianza';
	var lng_round = 'Circular'; 			// resumir el mensage "circular de la alianza XXX por este
	var lng_rownattack = 'return ownattack';
	var lng_rownespionage = 'return ownespionage';
	var lng_owntransport = 'flight owntransport';
	var lng_rowntransport = 'return owntransport';
	var lng_ftransport = 'flight transport';
/*Fin Compativilidad con otros idiomas: */

		var regex3= /<[^>]*>/g;
		var regex2= '<span class="combatreport">';
		var tempooo='';
		var htmldentro;
		var htmldentroanterior;
		var ataque = 0;
		var temp3 = new Array();
		var temp2;
		var bol1;
		var bol2;
		var bol3;
		var ataque;
		var temp5;
		var temp6;
		var temp7;
		var primero;
		var segundo;

		//elimina el iframe de publicidad aleatoria
		var publi = document.getElementsByTagName('iframe');
		for ( i = publi.length - 1; i >= 0; i--){
			publi[i].style['display'] = 'none';
			
			}

		//coloreado en mensages
	if (location.pathname.search('messages.php') != -1 ) {
		var publi = document.getElementsByTagName ('th');
		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML;

			 if( htmldentro.indexOf(regex2) != -1 && htmldentro.indexOf(lng_battle) != -1  ) {
				tempooo = htmldentro;				
				htmldentro = htmldentro.replace(regex3, "");
				temp2 = htmldentro.substring((htmldentro.lastIndexOf('(') +1 ),(htmldentro.length -2));
				temp3 = temp2.split(',');
				temp6 = temp3[0];
				temp7 = temp3[1];
				primero = 1* temp6.substring(2,temp6.length);
				segundo = 1* temp7.substring(2,temp7.length); 
				ataque = false;
				bol1= false;
				bol2 = false;
				bol3 = (segundo == 0);
				bol1 = (primero - segundo) > 10000;
				bol2 = (primero - segundo) < -10000;
				htmldentroanterior = publi[i-1].innerHTML;
				ataque = htmldentroanterior.search(lng_control) != -1;
			        if ((bol1 && ataque) || ( bol2 && !(ataque)) ){
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(235,50,50);\">");
				} else if ((bol3 && !(ataque))||(bol2 && ataque) || (bol1 && !(ataque))) {
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(94,204,126);\">");
				} else {
					tempooo = tempooo.replace(regex2, "<span style=\"color: rgb(234,221,64);\">");
				}
				publi[i].innerHTML = tempooo; 
			} 

			if( (htmldentro.indexOf(lng_return) != -1 ) || (htmldentro.indexOf(lng_arrive) != -1 )) {
				publi[i].style.color="rgb(86,52,248)";
			}
			
			if(htmldentro.indexOf(lng_spy) != -1) {
				publi[i].style.color="rgb(242,204,74)";
			}

			if(htmldentro.search(lng_control) != -1 ) {
				publi[i].style.color="rgb(255,62,62)";
			}
			if(htmldentro.search(lng_fleet) != -1 ) {
				publi[i].style.color="rgb(101,216,118)";
			}
				
			if(htmldentro.search(lng_ally) != -1 ) {
				publi[i].style.color="rgb(72,227,204)";
				publi[i].innerHTML = lng_round;
			}
		}
		// mensages: color de numeros
		var publi = document.getElementsByTagName ('td');
		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML * 1 ;
			if( htmldentro >= 100000 && htmldentro < 5000000) {
				publi[i].style.color="rgb(36,183,0)";
			}
			if( htmldentro >= 500000 && htmldentro < 1000000 ) {
				publi[i].style.color="rgb(239,173,20)";
			}
			if( htmldentro >= 1000000 ) {
				publi[i].style.color="rgb(255,0,0)";
			}
			
		}
	}

	if (location.pathname.search('overview.php') != -1 ) {
		//coloreado vision general
		var publi = document.getElementsByTagName ('span');
		for (var i = publi.length - 1; i >= 0; i--) {
			if( publi[i].className == lng_rownattack) {
				publi[i].style.color="rgb(0,136,0)";
			}
			if( publi[i].className == lng_rownespionage) {
				publi[i].style.color="rgb(176,138,0)";
			}
			if( publi[i].className == lng_owntransport) {
				publi[i].style.color="rgb(71,163,237)";
			}
			if( publi[i].className == lng_rowntransport) {
				publi[i].style.color="rgb(18,114,192)";
			}
			if( publi[i].className == lng_ftransport) {
				publi[i].style.color="rgb(9,187,116)";
			}
		}
		//elimina la publicidad del modo comandante
		var publi = document.getElementsByTagName ('p');
		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML;
			if (publi[i].style && (htmldentro.indexOf(comander) != -1) && (htmldentro.search(regex1) == -1)) {
				publi[i].style['display']='none'; 
			}
		}


		// simplemente abrebia hora del servidor, en hora para solo "gastar" una linea y asi ver mas ^^
		var publi = document.getElementsByTagName ('th');
		for (var i = publi.length - 1; i >= 0; i--) {
			htmldentro = publi[i].innerHTML;
			if(htmldentro.search('Hora del servidor') != -1 ) {
				publi[i].innerHTML = 'Hora';
			}
			
					//elimina la nueva publicidad de comandante
		var publi = document.getElementById('combox_container');
		publi.style['display'] = 'none';
		}
	}

})();
