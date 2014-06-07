// ==UserScript==
// @name           OGame indicador actividad
// @namespace      http://userscripts.org/users/143231
// @description    OGame, muestra un temporizador en el título de la página indicado la última actividad realizada
// @version        1.2.2
// @author         HoChiChaos
// @include        http://*.ogame.*/game/index.php?*page=*
// @updateURL      http://userscripts.org/scripts/source/149332.meta.js
// @downloadURL    https://userscripts.org/scripts/source/149332.user.js
// @require        http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

(function () {

var dual = false;


if((typeof(oGameVersionCheck) != "undefined")) {
	oGameVersionCheck('OGame indicador actividad','5.99.99.99','http://userscripts.org/scripts/show/149332');
}


var dateActual;
var dateInicial;
var dateActividad;
var titulo;

// jQuery
var unsafe = (typeof unsafeWindow) != "undefined" ? unsafeWindow : window;
var $ = unsafe.jQuery;
if ( !$ ) return;

$('body').ajaxSuccess(function(e,xhr,settings){
	if(settings.url.indexOf("/game/index.php?page=") != -1) {
		dateActividad = new Date();
	}
});



function temporizador( )
{
	dateActual = new Date();
	
	var tiempo1 = getDiff(dateActual, dateInicial);
	var tiempo2 = getDiff(dateActual, dateActividad);
	var dif = Math.abs(tiempo1 - tiempo2);
	
	if(!dual && dif > 10) {
		dual = true;
	}
	
	if(dual && tiempo1 > 60 && tiempo2 > 60 && dif <= 60) {
		dual = false;
	}
	
	if(dual) {
		document.title = "[ " + getStringDiff(tiempo1) + " | " + getStringDiff(tiempo2) + " ] " + titulo;
	}
	else {
		document.title = "[ " + getStringDiff(tiempo1) + " ] " + titulo;
	}

}

function getDiff(date1, date2) {

	var diferencia = date1.getTime() - date2.getTime()  
	var segundos = Math.floor(diferencia / 1000);
	
	return segundos;
}



function getStringDiff(diferencia) {

	var segundos = Math.floor(diferencia % 60);
	var minutos = Math.floor(diferencia / 60) % 60;
	var horas = Math.floor(diferencia / 3600);
	
	
	var tiempo = "";
	
	if(horas == 0 && minutos == 0) {
		tiempo = segundos + "s";
	}
	
	if(horas == 0 && minutos > 0) {
		tiempo = minutos + "m";
	}
	
	if(horas > 0) {
		tiempo = horas + "h " + minutos + "m";
	}
	
	return tiempo;
}


if( location.href.indexOf('/game/index.php?page=') != -1) {
	titulo = document.title;
	dateInicial = new Date();
	dateActividad = new Date();
    var int=setInterval (temporizador, 500);

}


}) ()

