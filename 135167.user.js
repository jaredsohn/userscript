// ==UserScript==
// @name        Comunio2012 - EuroCopa Script - Beta
// @description Integra las estadisticas de SCRIPT en el juego Comunio2012, con funcionalidad en fase BETA
// @include     http://www*.comunio2012.com/*
// @include     http://comunio2012.com/*
// @exclude     http://www*.comunio2012.com/external/phpBB2*
// @exclude     http://comunio2012.com/external/phpBB2*
// @copyright 	Jomofer-DiegoCom-Anthorlop-erpichi-marioga
// @version	    0.0.3
// @license	http://creativecommons.org/licenses/by-nc-sa/3.0/es/
// ==/UserScript==

//Cambios
//Mostrar busquedas de jugador cuando vienes de comunio stats

//error alineacion ideal con negativos
//mejorar el calculo de fichajes
//mirar poner foto jugador en alineacion
//Ultima alineacion publicada (en desarrollo)
//Noticias en el refresco por ajax, que ponga los puntos links y tal(en desarrollo)
//Administracion de primas(en desarrollo)
//admnistracion de salarios(en desarrollo)
//apartado aceptar ofertas el valor de compra de los jugadores?

//Thanks to Jomofer to allow this script to be mantained!
//Gracias a Anthorlop por las mejoras introducidas: Cálculo de saldo - Próximas jornadas - Estado jugadores
//http://www.greywyvern.com/code/php/binary2base64

//VERSION DEL SCRIPT

var version = "0.0.3";	//Version of the script. For checking for updates
var SCRIPTName = "EuroBETA";
var update;				//Variable for storing the result of checking for updates
var plusPlayer = false;	//Variable to store if we are plusPlayer
var basicPlayer = false;	//Variable to store if we are basicPlayer
var get;				//To store the get function
var getSync;				//To store the get function

////////Player ID//////////////////////
var playerID = new Array;
var playerIDName = new Array;
var playerIDNameEntra = new Array;
var playerIDNameSale = new Array;
var playerIDNamePicas = new Array;
var playerIDNameGoles = new Array;
var playerIDNameTarjetas = new Array;
var playerIDNameMarcador = new Array;
var playerIDNameFoto = new Array;
var playerIDNamePuntos = new Array;
var playerIDNameEstado = new Array;
var playerIDNameUrl = new Array;
var playerIDNameEquipo = new Array;
var playerIDNamePosicion = new Array;
var playerIDNameTotales = new Array;
var playerIDNameMercado = new Array;
var playerIDCpC = new Array;

//var serverScriptBeta = 'http://www.scriptbeta.freeiz.com/scriptbeta/';
//var serverScriptBeta = 'http://www.scriptbeta.freeiz.com/scriptbeta/test/';
//var serverScriptBeta = 'http://www.scriptbeta.nixiweb.com/scriptbeta/test/';

//var serverScriptBeta = 'http://www.scriptbeta.nixiweb.com/scriptbeta/';

//erpichi 20111123 - Diferencia en puntos con los demas jugadores
var userIdDiv = document.getElementById("userid");
var userId = "";
if (userIdDiv != null) {
	userId = userIdDiv.textContent.replace("ID:", "").replace("ES", "").replace( /\s/g, "" );
} else if (document.location.href.indexOf('&userId=') != -1) {
	userId = document.location.href.substring(document.location.href.indexOf('&userId=')).replace('&userId=', "");
}

/////////////////////////////////////////////////////////////////
//FUNCIONALIDADES QUE SE EJECUTAN EN TODO COMUNIO

/////////////////////////////////////////////////////////////////


//Function that hides or shows something
function toggleDisplay( obj ){
	
	if( obj.style.display == "none" ){
		obj.style.display = "block";
	}
	else{
		obj.style.display = "none";
	}
}
	

//Function get (it gets data from other web)
//url--> url of the web
//func--> function to do with the received data

try{
	//Try to assign GM_xmlhttpRequest to get function (firefox and emulated greasemonkey). It can do cross domain!
	get = function(url, func) {
	  GM_xmlhttpRequest({
		method: "GET",
		 url: url,
		 onload: function(xhr) { func(xhr.responseText); }
	  });
	}
}
catch( ex ){
	//If we cant with GM_xmlhttpRequest, assign general request (it cant do cross domain...)
	get = function(url, func) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.send();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			func(xhr.responseText);
		  }
		}
	}
}


try{
	//Try to assign GM_xmlhttpRequest to get function (firefox and emulated greasemonkey). It can do cross domain!
	getSync = function(url, func) {
	  GM_xmlhttpRequest({
		method: "GET",
		 url: url,
		 onload: function(xhr) { func(xhr.responseText); },
		 synchronous: true
	  });
	}
}
catch( ex ){
	//If we cant with GM_xmlhttpRequest, assign general request (it cant do cross domain...)
	getSync = function(url, func) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		xhr.send();
		xhr.onreadystatechange = function() {
		  if (xhr.readyState == 4) {
			func(xhr.responseText);
		  }
		}
	}
}

//erpichi 20111119 - Comprobar actualizacion BETA
function checkUpdateBETA(text) {

	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
	var ini = text.indexOf("@version");	//Search for number of version ( x.x.x )
	ini += ("@version").length;
	var end = text.indexOf( "//", ini );
//	var ini = text.indexOf("<b>Version:</b>");	//Search for number of version ( x.x.x )
//	ini += ("<b>Version:</b>").length;
//	var end = text.indexOf( "<", ini );

	//erpichi 20111119 - Comprobar actualizacion BETA
	//text = text.substring( ini+1, ini+6 );
	text = text.substring( ini+1, end );
	text = text.replace( /\s/g, "" );		//Clear white spaces
	//erpichi 20111114
	var actualizar = false;
	var serverVersion = text.split(".");
	var userVersion = version.split(".");
	//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
	while (serverVersion.length > userVersion.length) {
		userVersion[userVersion.length] = 0;
	} 
	for (var i = 0; i < serverVersion.length && i < userVersion.length; i++) {
		//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
		if (parseInt(serverVersion[i]) > parseInt(userVersion[i])) {
			actualizar = true;
			break;
		} else if (parseInt(serverVersion[i]) < parseInt(userVersion[i])) {
			actualizar = false;
			break;
		}
	}
	if(actualizar) {
		update = '<a target="_blank" href="http://userscripts.org/scripts/show/135167" style="text-decoration: none;">'
			+ '<span class="button01">Probar v' + text + ' BETA</span></a>';
		
		if (document.getElementById("updateVersion") != null) {
			document.getElementById("updateVersion").innerHTML += update;
		}	
	}
}

function checkUpdate(text) {

	//erpichi 20111123 - Comprobar actualizaciones desde meta.js routine
	var ini = text.indexOf("@version");	//Search for number of version ( x.x.x )
	ini += ("@version").length;
	var end = text.indexOf( "//", ini );
//	var ini = text.indexOf("<b>Version:</b>");	//Search for number of version ( x.x.x )
//	ini += ("<b>Version:</b>").length;
//	var end = text.indexOf( "<", ini );

	//erpichi 20111119 - Comprobar actualizacion BETA
	//text = text.substring( ini+1, ini+6 );
	text = text.substring( ini+1, end );
	text = text.replace( /\s/g, "" );		//Clear white spaces
	//erpichi 20111114
	var actualizar = false;
	var serverVersion = text.split(".");
	var userVersion = version.split(".");
	//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
	while (serverVersion.length > userVersion.length) {
		userVersion[userVersion.length] = 0;
	} 
	for (var i = 0; i < serverVersion.length && i < userVersion.length; i++) {
		//erpichi 20111122 - Error al comprobar version como caracter y no como enteros
		if (parseInt(serverVersion[i]) > parseInt(userVersion[i])) {
			actualizar = true;
			break;
		} else if (parseInt(serverVersion[i]) < parseInt(userVersion[i])) {
			actualizar = false;
			break;
		}
	}
}

//erpichi 20111119 - Poner comprobando.. y dejarlo en segundo plano
//Search for status player and change it to SCRIPTPlayer with the number of version of the script
var span = document.getElementsByTagName("span");
for( var i=0; i<span.length; i++){

	//plusplayer?
	if (span[i].textContent == "Plus" ){
		plusPlayer = true;
	}
	//or basic?
	if (span[i].textContent == "basic" ){
		basicPlayer = true;
		span[i].textContent = SCRIPTName + " ";
		
		//add it!
		span[i+1].innerHTML += '<br/><span class="button01"><a target="_blank" href="http://userscripts.org/scripts/show/135167" title="Visitar la página del script">v' + version + '</a></span>';
		document.getElementById('kicker').style.width = '300px';
		document.getElementById('kicker').style.marginLeft = '500px';
		break;
	}
}

//erpichi 20111123 - No hacemos nada si es plus player
if (basicPlayer) {
	if (document.location.href.indexOf('team_news.phtml') != -1) {
		 get( "http://userscripts.org/scripts/source/135167.uset.js", checkUpdate );
	} else {
		
	}
	
} else if (plusPlayer) {
	return;
}
 
 
// Excluimos de la ejecucion del resto del SCRIPT cuando estamos en el foro
// exclude directive only works in FF
 
//erpichi 20111122 - Se cambia match por indexOf, que el match no va bien
if (document.location.href.indexOf('external/phpBB2') != -1) {
    return;
}
if ( document.location.href.indexOf('team_news.phtml?postMessage_x=34') != -1) {
    return;
}

if ( document.location.href.indexOf('team_admin.phtml') != -1) {  return;}
if ( document.location.href.indexOf('undoTransactions.phtml') != -1) {    return;}
if ( document.location.href.indexOf('matrix.phtml') != -1) {    return;}
if ( window.location.href.indexOf( 'postMessage_x' ) != -1) {    return;}
if ( window.location.href.indexOf( 'signup.phtml' ) != -1) {    return;}

//Erpichi 20111123 - En clubinfo no hacemos nada
if(window.location.href.indexOf('clubInfo.phtml') != -1) {return;}

function readScriptData(forzar){
	var scriptDataString = localStorage.getItem("scriptData");
	var scriptVersionString = localStorage.getItem("scriptVersion");
	var scriptActualizadoString = localStorage.getItem("scriptActualizado");
//	alert(scriptDataString);
	if (!forzar
			&& scriptDataString != null && scriptDataString.length > 1
			&& scriptVersionString != null && scriptVersionString.length > 1
			&& scriptActualizadoString != null && scriptActualizadoString.length > 1){
		//updateScriptData(false);
		scriptDataString = scriptDataString.split("/-/");
		for( var i=0; i<scriptDataString.length; i+=21 ){
			if (scriptDataString[i+1] != "-")
				playerID[ scriptDataString[i] ] = scriptDataString[i+1];
			if (scriptDataString[i] != "-")
				playerIDName[ scriptDataString[i+1] ] = scriptDataString[i];
			if (scriptDataString[i+2] != "-")
				playerIDNamePuntos[ scriptDataString[i] ] = scriptDataString[i+2];
			var estadoArray = new Array();
			estadoArray[0] = scriptDataString[i+3];
			estadoArray[1] = scriptDataString[i+4];
			estadoArray[2] = scriptDataString[i+5];
			estadoArray[3] = scriptDataString[i+6];
			estadoArray[4] = scriptDataString[i+7];
			if (scriptDataString[i+3] != "-")
				playerIDNameEstado[ scriptDataString[i] ] = estadoArray;
			if (scriptDataString[i+8] != "-")
				playerIDNameEntra[ scriptDataString[i] ] = scriptDataString[i+8];
			if (scriptDataString[i+9] != "-")
				playerIDNameSale[ scriptDataString[i] ] = scriptDataString[i+9];
			if (scriptDataString[i+10] != "-")
				playerIDNamePicas[ scriptDataString[i] ] = scriptDataString[i+10];
			if (scriptDataString[i+11] != "-")
				playerIDNameGoles[ scriptDataString[i] ] = scriptDataString[i+11];
			if (scriptDataString[i+12] != "-")
				playerIDNameTarjetas[ scriptDataString[i] ] = scriptDataString[i+12];
			if (scriptDataString[i+13] != "-")
				playerIDNameMarcador[ scriptDataString[i] ] = scriptDataString[i+13];
			if (scriptDataString[i+14] != "-")
				playerIDNameFoto[ scriptDataString[i] ] = scriptDataString[i+14];
			if (scriptDataString[i+15] != "-")
				playerIDNameUrl[ scriptDataString[i] ] = scriptDataString[i+15];
			if (scriptDataString[i+16] != "-")
				playerIDNameEquipo[ scriptDataString[i] ] = scriptDataString[i+16];
			if (scriptDataString[i+17] != "-")
				playerIDNamePosicion[ scriptDataString[i] ] = scriptDataString[i+17];
			if (scriptDataString[i+18] != "-")
				playerIDNameTotales[ scriptDataString[i] ] = scriptDataString[i+18];
			if (scriptDataString[i+19] != "-")
				playerIDNameMercado[ scriptDataString[i] ] = scriptDataString[i+19];
			if (scriptDataString[i+20] != "-")
				playerIDCpC[ scriptDataString[i] ] = scriptDataString[i+20];
		}

		var scriptJornadaString = localStorage.getItem("scriptJornada");
		var scriptActualizadoString = localStorage.getItem("scriptActualizado");

		var mostrarCronicas = true;
		
		if (mostrarCronicas) {
			if (scriptJornadaString != null && scriptJornadaString.length > 0) {
				var textoActualizado = "";
				if (scriptActualizadoString != null && scriptActualizadoString.length > 0) {
					textoActualizado = " (" + scriptActualizadoString + ")";
				}
				
				jornadaCronica = "<span class='button01'><a id='reparaDatos' href=\"javascript:\" title='Click para reparar los datos'>Datos actualizados a " + scriptJornadaString + "</a></span>";
				var botonUpdate = document.getElementById("updateVersion");
				if (botonUpdate != null) {
					botonUpdate.innerHTML += jornadaCronica;
				}

				var reparaDatos = document.getElementById("reparaDatos");
				if (reparaDatos != null) {
					reparaDatos.addEventListener( "click", function(){ readScriptData(true);}, true );
				}
			}
		}
	} else {
		localStorage.setItem("scriptData", "");
		localStorage.setItem("scriptVersion", "");
		localStorage.setItem("scriptActualizado", "");
		//updateScriptData(true);
	}
	return;
}

readScriptData(false);

//Erpichi 20111209 - En informacion de jugador no hacemos nada
if(window.location.href.indexOf('/primera_division/') != -1) {
	var playerURL = window.location.href.substr(window.location.href.indexOf('/primera_division/')).replace('/primera_division/','').replace(".html","");

	var playerSplit = playerURL.split("-");
	var player_id = playerSplit[0];
	buscarForo(player_id);
	return;
}

//Erpichi 20111130 - En tradableInfo.phtml no hacemos nada
if(window.location.href.indexOf('tradableInfo.phtml') != -1) {
	var playerURL = "";
	if (window.location.href.indexOf('&') != -1) {
		playerURL = window.location.href.substring(window.location.href.indexOf('tradableInfo.phtml?tid='), window.location.href.indexOf('&')).replace('tradableInfo.phtml?tid=','');
	} else {
		playerURL = window.location.href.substring(window.location.href.indexOf('tradableInfo.phtml?tid=')).replace('tradableInfo.phtml?tid=','');
	}

	var playerSplit = playerURL.split("-");
	var player_id = playerSplit[0];
	buscarForo(player_id);
	return;
}

function buscarForo(idPlayer){
	var playerName = playerIDName[idPlayer];
	var comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
	buscar = '<span class="contenttext" style="background-color: rgb(21, 45, 12); display: inline-block; padding: 0.5em;">'
//		+ '<img src="http://www.comunio.es/tradablePhoto.phtml/l/' + idPlayer + '.gif?pln=1" style="border: medium none; float: left;">'
		+ replaceAll(playerIDNameFoto[playerName], "height='30'", "style='border: medium none; float: left;'")
		+ '<form style="float: left; margin-left: 0.5em;" target="_blank" method="POST" action="' + comunio +'/external/phpBB2/search.php?mode=results">'
		+ '<div style="display:none;">'
		+ '<input type="text" size="30" name="search_keywords" class="textarea" style="width:300px;" value=\'' + playerName + '\'>'
		+ '<input type="radio" checked="checked" value="any" name="search_terms">'
		+ '<input type="radio" value="all" name="search_terms">'
		+ '<input type="text" size="30" name="search_author" class="textarea" style="width:300px;">'
		+ '<select name="search_forum" class="select"><option value="-1">Todos los disponibles</option><option value="5">Reglas del Foro / Forenregeln</option><option value="27">Noticias de la Liga</option><option value="8">Análisis de los partidos</option><option value="28">Equipos de la liga BBVA y jugadores</option><option value="34">Competiciones europeas</option><option value="35">Selecciones</option><option value="36">Otras ligas y competiciones</option><option value="10">Titulares o no. ¿Jugarán?</option><option value="38">Alineaciones </option><option value="39">Fichajes</option><option value="3">Conversación</option><option value="33">Estadísticas</option><option value="13">Bugs, problemas y dudas sobre Comunio:</option><option value="29">Errores de puntuación</option><option value="14">Sugerencias:</option><option value="15">Administración del usuario</option><option value="23">Off Topic ES (español / spanisch)</option><option value="6">Talk</option><option value="7">Spielanalyse</option><option value="17">Suche Mitspieler</option><option value="24">Statistiken</option><option value="2">Feature Requests</option><option value="11">Userverwaltung</option><option value="40">BUGS</option><option value="22">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="search_time" class="select"><option selected="selected" value="0">Todos los mensajes</option><option value="1">1 Día</option><option value="7">7 Días</option><option value="14">2 Semanas</option><option value="30">1 Mes</option><option value="90">3 Meses</option><option value="180">6 Meses</option><option value="364">1 Año</option></select><input type="radio" value="all" name="search_fields"><input type="radio" value="msgonly" name="search_fields"> <input type="radio" checked="checked" value="titleonly" name="search_fields">'
		+ '<select name="search_cat" class="select"><option value="-1">Todos los disponibles</option><option value="3">Reglas del Foro / Forenregeln</option><option value="10">LIGA BBVA</option><option value="2">MÁS FÚTBOL </option><option value="11">DEBATE SOBRE LOS EQUIPOS </option><option value="12">ESTADÍSTICAS </option><option value="6">SOPORTE</option><option value="9">Off Topic ES (español / spanisch)</option><option value="4">Talk (deutsch) / Conversación (aléman)</option><option value="1">Support (deutsch) / Soporte (aléman)</option><option value="8">Off Topic DE (aléman / deutsch)</option></select>'
		+ '<select name="sort_by" class="select"><option value="0">Fecha de publicación</option><option value="1">Asunto del Mensaje</option><option value="2">Título del Tema</option><option value="3">Autor</option><option value="4">Foro</option></select><input type="radio" value="ASC" name="sort_dir"><input type="radio" checked="" value="DESC" name="sort_dir">'
		+ '<input type="radio" value="posts" name="show_results"><input type="radio" checked="checked" value="topics" name="show_results">'
		+ '<select name="return_chars" class="select"><option value="-1">Todos los disponibles</option><option value="0">0</option><option value="25">25</option><option value="50">50</option><option value="100">100</option><option selected="selected" value="200">200</option><option value="300">300</option><option value="400">400</option><option value="500">500</option><option value="600">600</option><option value="700">700</option><option value="800">800</option><option value="900">900</option><option value="1000">1000</option></select>'
		+ '</div>'
		+ '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="submit" value="Buscar en el Foro" class="button">'
		+ '<span class="button01" style="top: -10px; padding-left: 0.5em; font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;"><a href=\'http://www.google.es/search?q=' + playerName + '+comunio&ie=utf-8&oe=utf-8&aq=t\' target="_blank">Buscar en Google</a></span>';	

	buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en NomasKeine" class="button"  onclick="window.open(\'http://www.nomaskeine.com/estadisticas/comunio/jugador/' + idPlayer + '/' + playerName.replace(/\"/g, "&quot;") + '\');return false;">';

	var idPlayerCpC = playerIDCpC[playerName];
	if (idPlayerCpC != "") {
		buscar += '<input style="font-size: 1em;margin-bottom: 0.5em;margin-right: 0.5em;display:block;" type="button" value="Buscar en CpC" class="button"  onclick="window.open(\'http://www.eurocopa.calculapuntoscomunio.com/estadisticas/jugador.php?id=' + idPlayerCpC + '\');return false;">';
		
	}
		buscar += '</form>'
				+ '</span>';

	if (document.getElementById("title") != null) {
		document.getElementById("title").innerHTML += buscar;
	}
//	if (document.getElementById("contentfullsizeib") != null) {
//		document.getElementById("contentfullsizeib").innerHTML = buscar + document.getElementById("contentfullsizeib").innerHTML;
//	}
}

//Erpichi 20120225 - En top jugadores no hacemos nada
if(window.location.href.indexOf('topComs.phtml') != -1) {return;}



//Trim function(Opera doesnt have it)
//http://blog.stevenlevithan.com/archives/faster-trim-javascript
function trim(str){
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	//return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	//return str.replace(/^\s*|\s*$/g,"");
	
//	for(i=0; i<str.length; )
//	{
//		if(str.charAt(i)==" ")
//			str=str.substring(i+1, str.length);
//		else
//			break;
//	}
//
//	for(i=str.length-1; i>=0; i=str.length-1)
//	{
//		if(str.charAt(i)==" ")
//			str=str.substring(0,i);
//		else
//			break;
//	}
//	
//	return str;
}



///////////IMAGES///////////////
var images = new Array;

images['red_light'] ='data:image/gif;base64,R0lGODlhDQANAMIFAP8AAPwDAuUYEq9KOKFWQm2GZm2GZm2GZiH5BAEKAAcALAAAAAANAA0AAAMmeHojIWMtAqoFZN6dz/7MtzXi5ZTWg1bQCkSuQpXdMXOS0jzRkgAAOw==';

images['titular'] ='data:image/gif;base64,R0lGODlhFAATAOZNAL7JuKCwmNXc0WuEX8DLu4SZeqGxmouegYicftrg14KXd83Vyfn6+F14ULvGtaWlpEpoO8LMvL/Kuunp6au5pN/l3eTk4/z8/L+/vcXEwq67p77JuVp2TJaojpytlN3j2lh0S73IuFFvQ6y6pUFhMrnFs/f49kVkNn2TcsLNvczVyJKkibC9qXKJZrG+qsLCwHCIZJepj5+vl52ulens52V/WXKKZ7TAruHh4O3w7GiBW/v8++Xp48bQwaSznPP18qq4o+3w66Kyms3Ny2N9Vuvu6Vt3Tj1dLd3d3EBgMbvHtv3+/f///ztcKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE0ALAAAAAAUABMAAAeWgE2CgkcQASEHADw3Bzokg00NNggaCwI/TJmaTEsVEgYFA0WbpKWaNAmmmxMZOJsCPaqaQw8vmxtKspkWGEiZO0xAMDEBArqZAEQgHIMFx0wKkIIozzLSTQjPJdcrzwvXHc8fSdIGz0En0iPPJiLSLs8MRtIOzxc10inPTC3SKvvRIAFgkCMBARY+AniYIYQCgQgDBAUCADs=';
images['suplente'] ='data:image/gif;base64,R0lGODlhEQATAPeJAAVjpQVlqRZiggVkpgA0WQJDcQRbmAViowVhoQVfnhliegVmqQRfngVgnwVhogVnqgVlpwNVjzlcMANNggVkpzddNCBhagRXkgVenARZlS1eTANQhzpcLARVjwNOgwRWkDlaLRBkkBVIUhZacgRdmzJdQC1VPDpcLSNeXgNMgAVgoARenQxkmCZfWwRfnQE2WQE1WiRgYRRihAA4XwVkpSRgYgNTigA0WgtEXyJTTShfVw9afx9LQztcLC9eRgpcjC5eSAJLfzldMARZlANWjwJAbAE3Xi9eRzhdMwNTiTNdPw9jkBdGSx9hax9LRgQ8XwRXkSVgXzBeRQNRiDdZLglknwRalQxWfwRenBBjjwlkoAE7ZAA1XBBkjypfUwNRhgJIehRjhgZmpgA1WhthdQRWjwVnqyRZUwJEcwVmqgRUjgplnQ5JYxlITCJgZBpJSxdjgBZigClfVgJNgQVbmQRYkQA2XQNSigA3XgA2XCJgZQRZlgZblQRblxVjhBhiewJJewVDbARVjgNUjAE7ZQVnrARalgRYkwVlqDtcKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIkALAAAAAARABMAAAj/ABMJFEjFCZM2b0wMXDgQhAgYY7jceJGD4UIeTwgQ2mKEAA6LiXpIYTMjTxkABQgEgkOmxEI3iMDgSVKgCBo7BcwgYqFEoAYxiLD0KTQI0IENNh4gCiDjRKI4iBwACIDIgJU0BjxESDDVS4U1JFIgGmvoEKIJQeYIMhDAwpEFHegoRVQWUYQJd1ZkAKCgBYUpA6jSNTsWkYoMFAQ0AfBlQOG6hREcAiAgzAE1jskSHssAygEBXRp0KDyYtIs6NP6EwLC5dGEGQxBZ8IPhA2nIYxNcQKSnBp8Ngl2PbUAEgRwhZ64seNzawQ8UEgTqyFIFAqI9uxFB0LJEQ/SBHJD4DIgyYoeCGEAqcBgYEAA7';
images['nojugado'] ='data:image/gif;base64,R0lGODlhGQAZAPf/AEyCpOTj4meFktbUy1N8lRSOC97c2f76+SovNTlqiVJMRE17m6OcmzpzmIJ8ezpFRVedSTs7MzqBr0GBpENedzNzl11bUXRlY117mkKBq1aCnFlrgZm9jTx0k1J8m//6/JPFi/r29kKJtCWVHY28gmlnX0mBnlp1i7KsrEdIRlZhbDNSaFFdZj1VZTdccktUXtfW00RifeTh3jxifI6IhElhbIS6ezVWawKCADKWK0yJskFvkxwmMB+RFjNpg5uVkj10jk5lfPb18y+TIktfbezn5S06RkV0jUVZYkuFrA2GAZ3CkjlvjVtlckFlgoqreRaQDTh1m0VdaklogEmdPcG8ujaBpTdWajpAPTNqilqtVB2PGbjKrVGGqA+KBkZqfjuCpzmcNjp+ojObLDpjgzp7ov33+YexeUZ9nW9sZj9ZbjREUWKFoWtdVXGzZ0Z2m6u/njpZajdheRUMCzN7ohIhDTp8npqPkBeNDjhMXejh33ata/Dt68/XxCCME0KIqFBzlTl5nk90lPv1+KjHnUR5nTBYbUWjQDNhfUhzi0N6pER8o2RZUGNdV0l8n2Vzelt/oiVOcDlRVjRlhGB9lTxoiihAWGGuWYB4daukpUFPV01kdYywfUtodIWzdzMhHh+TGq7LpU58ly9YdgSLADOIrsXQvEWDsy1TbUGKuzhNYUiLuLnNsENvj0BUaWBvf01ZYkVthHm3cD5+nTaRKPzx9kqIrTCZJhSICDd4mdDVxkGSM0KZN0SeOZ3IlpbHkWBygGR9jGx/jEJ8qpCHg//4/HCGmDRvkfDo6fHp7FqgTPHt7zl8mR8eJjx8m3WzbHa4bl6lU16vWVd2hmqyYVF2iTmbL7HOqT93nkF+m3BwaEB8nVdRR1JWTFpVSHCpYrK0tXioZnZsalJneJnDjxmSER+UFjFhePXu8TRjfjRmf2ymXktKQUxzhvTw8UB5ok1qgEN+o0V/psnEwszKyDNJWevr6e3r6u/u7EejPjpabObd2z5caTx5oAAAACxQHyH5BAEAAP8ALAAAAAAZABkAAAj/AP8JHEiwoMGCdfwpXMiwocM6Av11SkTAAxsMzEzkErEIzIRAYJjsmJROzhV/ERNN+AOAzCgrGY51SKDOhSE5alpIibOpBsp//io4ypbOiAonaq7wI7IiCAV4G2IRAGICwE9/iFy44vHpwqsN8DxgaAWg0IQkGVaJEXHq6qNqU5rNMQIpyZth8iaIoAMmXoMdMcjou0pJRwMec3hESoWtnzMflWbcaOFCSo0pwK6+yxDlxpo8lihQWIFECpEmX4KdIKAhm9WITGJcaQHrhYom49oJO8GGzSxbjsSI6ZfhKgvb0wQYW9BFFJouHiB5sFOKjqI3lWJcPWFCwzYraBpI/8j1zrAgQFl8xKn3AEuEq0fK2IkioUwHAB2yzKD9wggWBewo0EgaV1WwwAIJODHFFWtoIskD7FhgATdtXJAGJgyAc9U5qKiyBgIpKKCABYw0UoI2DhDzQyZVwMCHEFelgEU33ihQoTgO3MEACvMYIMM9IXwwSBEDXCVhCZioiEKLAeATZDGDLGMAF55AsMtVNOxIjwz2CHHAAWagI4MpcHASDS9+eLFFDlcF4I4ZHxRTSzJ6DMDFGVRs4QUuoIzRyzdLXHMVMkXsowsrcDyhDC24KNFDGPmEw8ESvpBAxRhXPbEOBLR4oYQSBRwijSzk9BHKHhDcYk45BRRwFQ6w3j2iBTU2gEDILyBc8gwHI5ACxa/m9HCVFtDYQAIHJNjghjV4FOAFHm54MgQePVQrrEAJOaStthAd5O23/wQEADs=';

images['comstats'] ='data:image/gif;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAs7i3AN7h3wDg4d8Ae4B+AAUFBgAHCQkAkJuYAG9ycADAxcMA6+vrAMHFwwAyOjcAwsXDAAsRDwDZ3NoAm6ShAPLz8QCeqacAjZKQALS8uwDLzswAtry7AAQEBADi5eMApK2qAJCbmQBFSEYAu8TBAKSpqACirasA+Pj4AFdaWADn6ecAqLGuAKyurgANEA4A2NvZAMXFxQAzQj8AhpGPABEVFACxurcAnaimAMrNywCKlZIAn6imAAIDAwDLzs4AAwMDAOHk4gAEBwYAj5qYABkeHQCmsa8A09bUAFteXAC/xMMA6vHuAK62tQCFkI0A3N/dACgrKQD18vEAtbq4AIqVkwC1vrsAztHPABcdGwClq6cAGR0bALq/vgAYIR4AqbCtAOnr5gCqtbMA19rYAMPIxwCwtbMAYmdmALa2tgCyurkAipSRAAICAgDK0M0A4OPhAKKrqACOmZcAQUZEAPn6+AAsNDMACAoIAAkKCAD7+/sA0tXTAJSdmgCXoqAArbW0ANre3AASGBcATlhWAPT18wCPlJIAzdDOABkcGgAuMzEAvMLAAL3GwwCptLIA1tnXAJahngCXoZ4AmKGeAISPjQB3enMA8vHxAIiTkACJlY0AAQEBAN/i4ACiqqcAjZiWAKSqpwCmq6oA+vr6ALrCwQDR1NIAqq+tAOrr6QCqs7AAwcbEAJahnwCstLMADRIQAK20swDy8O8ADhsZALO8uQAEAQIAs728ALW9vAADBQUAvMG/AL7BvwBRaGQAqLOxANXY1gCus7EAx8rIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMJN7HQAAAAAAAAAAAAAmT30WAUdaUAAAAAAAAAATOBuCCxxqNWgIAAAAAABNIFhCjBSJiSpEaSMAAAAAkSxRSztskYQ2gWtmAAAAJTlHYRKDYGBgK1YZIk4AADdngkAeJykpY3kabhB6AAAYbWcJhopTMXYoQQdfPAAABgNMQ4tTMTFTdXEtV0YAAAZcMg+QMTEXFww0dGRIAACIWyFzYi4vBQR4b1IzcgAAAIV8H4ACVH6Uj0lwjQAAAACHEV18EVU9XhWOf0UAAAAAAGVlWXxKgHeSLA0AAAAAAAAACjo+DiQkPwAAAAAAAAAAAAAAAAAAAAAAAAAAAPw/AADwDwAA4AcAAMADAADAAwAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAwAMAAMADAADgBwAA8B8AAP//AAA=';
images['comstatsno'] ='data:image/gif;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/mAAD/ugAA/2cAAAAAAAAAAAAAAADLzs7/rrOx/6arqv+kqaj/AAAAAAAAAAAAAAAAAAD/QAAA/9sAAP/2AAD/ugAA//8AAP/5AAD/qpOT0/9iZ2b/usLB/7a8u/+zuLf/ur++/yw0M/+2trb/AAD/QAAA/34AAP/bAAD/2wAAAAAAAP/GAAD//wME+/8KCuz/MzV0/8HGxP/BxcP/u8TB/7zCwP8ZHh3/EhRT/wwM7v8AAP/sAAD/1AAA/3AAAAAAAAAAAEFD7P8GBvL/AwP0/zU46v+1vbz/tLy7/7O8uf+zvLn/sbq3/wYIu/8AAP//Bgb8/wAA/40AAAAAAAAAAAAAAACos7H/iIrb/zU36v8AAP//Mzbo/6m0sv+os7H/rLSz/2Jpz/8EBPz/AwP9/y0v2/8AAAAAAAAAAAAAAADY29n/v8TD/7q/vv9na9L/BAT8/wQF+/81Od3/l6Kg/5eioP8pLOf/AAD//x0f7/+Xn7X/sLWz/wAAAAAAAAAA09bU/83Qzv/BxsT/o6e+/x8h7v8AAfv/AAD1/wEC4f8HCaH/BQX6/xkb7P95grD/m6Sh/6Sqp/8AAAAAAAAAAOLl4//W2df/zdDO/8DFw/+MksH/AADB/wAA9/8AAP//AAD6/wQF+v9KUMT/kJuY/5Sdmv+FkI3/AAAAAAAAAAAHCQn/4OHf/9fa2P/O0c//s728/wAAfv8AAO//AAD+/wAA/v8QEfH/d4CY/4qVkv+OmZf/GR0b/wAAAAAAAAAABwkJ/wkKCP/h5OL/2dza/y06qP8AAOT/AADk/wAA9v8AAPz/BAXs/y8z3P+Ik5D/TlhW/xghHv8AAAAAAAAAAA4bGf8ICgj/5+nn/4eH9/8SE/v/AQH9/wAA5P8CAnP/JSbY/wwM+P8CAv3/LjHa/wQHBv93enP/AAAAAAAAAAAAAAAADRIQ/0VF/f8kJP3/CQn+/xIS/P9xdOL/0dTS/8fKyP9ISeb/BAT8/w0N9v8CA0P/AAAAAAAAAAAAAAAAAAD/jTw8+v8AAP//FRX+/0pK/f+jo/X/4OPh/9zf3f/S1dP/iIrc/woK+/8CAv7/KSro/wAAAAAAAAAAAAD/wQAA//sAAP/xFBT+/4iJ+P/g4fj/+vr6/+nr5v/q6+n/3+Lg/9XY1v9MTev/BQX9/wAA//MAAP+/AAD/GQAA//YAAP/1AAD/2QAA/3Dr6+v/6vHu/ygrKf8LEQ//DRAO/w0QDv/18vH/AAAAAAAA/5QAAP/pAAD/+wAA/8sAAP/hAAD/qQAA/1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/fAAA/+wAAP/ePDwAAAAMAACAAQAAwAEAAMADAACAAQAAgAEAAIABAACAAQAAgAEAAIABAADAAwAAgAMAAAABAAAQEAAAP/wAAA==';
images['cpc'] ='data:image/gif;base64,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';
images['cpcno'] ='data:image/gif;base64,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';

images[':D'] =  	'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///wDywwDuvwDsvgDqvADktwDitgDgtADcsQDarwDYrgDWrADSqQDOpgDKogDIoQDGnwDEngC+mQC8lwC4lAC0kQCyjwCujACqiQCohwCmhQCggQCcfQCafACWeQCOcgCKbwCGbACCaQB+ZQB8ZAB4YP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACcALAAAAAAPAA8AAAZ6wJNQCCgWh8hTcQJpKAxHJEBzoTQVh4IAMAR0NkWJY1EcbIkeAKYCeAASBwCBCwB9OBkLJeJgJBAGUAAhRoWFCUUiAAEBi4yOAA1FI5CMjY8QRSWVj48TdCSLjpcAF1xKJqGjRRsap6iqRh4dr0QAJSMiISBRSUqFSUEAOw==';
images[':)'] =  	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOfoAOjoAOTjAOTkAOPjAODhAODgANzbANrbANvbANjYANTTANTUANHSANLSANHRAM/OAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALy7ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKSkAKOiAKKiAKChAKCgAJydAJycAJqbAJuaAJubAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAPAA8AAAergFKCggCFhYOIUoUjHBUQCoeIADIsJRsUDwsGAwCDAD01LSYfGBEMBwQCnYpAOIUgGhOFCAWdAEhCO4UlHhmFDQmQAEpFPjYuKCIdGRIREA6FS0dCPDEtJyEeGhcWFYVNSkZAOjAtKiMgHx0chVBMAERBOTEuKykAJSS2T0vwPzs2XgBowWIVgCj8DBW6QWPGKkUImSg5MkRIEB8PCQGA4mSJkiSREilSmCgQADs=';
images[':('] =  	'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///y9ekS5cji1aiytWhTx2tzt0tDpzsjpysThvrDhvqzdtqTZrpjZrpTVpozRnoDRnnzNlnTNlnDJjmTFhlzFhljBflDBfky9dkC5bjS1ZiixXhytVhCpTgSlRfShPeiZLdCVJcSRHbiNFayJDaCFBZSA/Yh89XypSfylQfChOeSdMdiZLcyVJcCNFaiFBZB89Xh47W////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADMALAAAAAAPAA8AAAaWwJlQCCgWh8hZMVOJOBRHJCDFATQdgIQBMASwPoDBZfJgAA5bYgjQIWAokMYCgOACSKJVcWCZFBkKUAAlIyxFBBkWRQ8ODUUmeCspBQQCFhQTEhFFJ4QhIB4FGxkYFxYVRTEwLy5GhxoDGXYoJgAuISsfHgAFVUQytC8jLSwrKh8pXL8oMCUkLiIhhkmpJybOUUlKrklBADs=';
images[':o'] =  	'data:image/gif;base64,R0lGODlhDwAPAKIAAP///729vZyc/zExMQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQhDAABACwAAAAADwAPAAAITQADCBRIoGDBgQgDFBTAkOFBhAQaSnQ4MOLEiQQIXsSosOFChxYFfBQwYEDDkh5Dbky5EqPKlhlVGpSYsWNKmRVvekw4EmTCigZrDgwIACH5BCEMAAEALAAAAAAPAA8AAAhWAAMIFEigYMGBCAMUFMCQ4UGEBBpKdDgw4sSJBAg6tChgYUeFDgEAiEhApEWPBAYMIKnyJEePHV9yvCgRJs2GGWcarKkRp82MPWO+TGgzZsKKBoEODAgAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIXgADCBRIoGDBgQgDFBTAkOFBhAQELHQYkcDAigAAYNQokSCBjBk/gjxYEKRJkwZFDhgAcmXIhSJDopQYUWJImxxpNpyo06HChjRr+vy5k2dHgkWFWoQolGLCiykTBgQAIfkEIQwAAQAsAAAAAA8ADwAACFwAAwgUSKBgwYEIAxQUwJDhQYQEGkp0ODCigIUOLRIgeBEAgIgEPIJU2NHjR5MfL4IEMGDAyZYpMYaMKTJjQ4wqb1qcyHPjTpU/N5LUGbQi0ZsJcWZMWNGg0IEBAQAh+QQhDAABACwAAAAADwAPAAAIVgADCBRIoGDBgQgDFBTAkOFBhAQaSnQ4MOLEiQQIOrQoYGFHhQ4BAIhIQKRFjwQGDCCp8iRHjx1fcrwoESbNhhlnGqypEafNjD1jvkxoM2bCigaBDgwIACH5BCEMAAEALAAAAAAPAA8AAAhNAAMIFEigYMGBCAMUFMCQ4UGEBBpKdDgw4sSJBAhexKiw4UKHFgV8FDBgQMOSHkNuTLkSo8qWGVUalJixY0qZFW96TDgSZMKKBmsODAgAOw==';
images[':-?'] =     'data:image/gif;base64,R0lGODlhDwAWAJH/AP//////AAAAAP///yH5BAEAAAMALAAAAAAPABYAQAI/3GSGuSwBoWgv2tuS3jXM+EkOlilaVm7qcbVI11qvhInHfS8vc/b8b1JNhisYhiHphGYxUvOoHCqRzdRBuikAADs=';
images['8)'] =      'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///4MqB48uCHwoB+ZJDOJIDOBHDN5GDN1GDNFCC89CC81BC8pAC8A9Cr48Crw8Cro7Crg6Crc6Cq03Cas2Cak2Cac1CaU0CZoxCJgwCJQvCIcrB4UqB3IkBtlFDNdFDNVEDMhAC8Y/C8Q/C7U6CrM5CrE4Cq84CqI0CaAzCZ4yCZwyCZIuCI0tCIssCH8oB34oB3gmB3YmB////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADQALAAAAAAPAA8AAAaHQJpQCCgWh0hasfQQLT5HJEBlMTUXIEQBMARsVhdThMQIJQxbYotVlDgaxcSBa6xD6nXBC19fKIowHANFFygTRSQjIkUEei0ZKRcUJRIREA9FMzEdLo8qGBUoJyYldDIwAJ0aKykAFxZcSh6neCwrKrGyMjECHC4DLRu5RAAzBDC9UUlKdUlBADs=';
images[':lol:'] =   'data:image/gif;base64,R0lGODlhDwAPAOYVAAAAAHt7AISEAIT//4yMAJSUAJycAKWlAK2tALW1AL21AL29AMbGAM7GAM7OANbWAN7eAOfnAOfvAO/vAPf3AID//wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAID//yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgAVACwAAAAADwAPAAAIjgArCBQIoGDBgQgrFFzAwAEECAcRAjiQgOGDBxEiTAAwEICBAwgYOngAQeNGgh8LMmDwoKBGjgAIFACAAAEABgBIAogAMWaBjwgqNrwIoSUAATIN1FzAsIGDkQWR/jwAUuhKnAACCDDIdeECmFq7FgzKUWGAsFypHihrVisBmT8NsCWYVQBSAhETKuSaMCAAIfkEBQoAFQAsAwADAAsABgAACDcADwAAwMDBg4ETJgxEkACAAwAQIABQaIDhgoIPIkKIYOCARYwZHxSoiGDBRQcoDw5cuZIBg4AAADs=';
images[':x'] =      'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP////IAAO4AAOwAAOoAAOgAAOQAAOAAANwAANoAANgAANQAANIAANAAAM4AAMoAAMgAAMYAAMQAAMIAAMAAAL4AALwAALgAALIAALAAAK4AAKgAAKYAAKQAAKAAAJwAAJoAAJYAAJQAAJIAAI4AAIoAAIYAAIQAAIIAAH4AAHwAAHgAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAC0ALAAAAAAPAA8AAAaBwJZQCCgWh8hW0RJpKA5HJICTATQVgIIAMASAOpoL4AFAGAZbYshTpAAYRQOBCyiJPsWLhFw+QAEmJF8bGBZ7DAsKCUUndh8cGhgVEhAPDg1FKYFGnBMSEUUrKJykFxZ0KqScVUQsqaodHFytKigmJSMiISCzXQArKSe3UUlKnElBADs=';
images[':P'] =      'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOTjAOTkAOLjAOPjAODgANvcANzbANrbANvbANjYANbVANTTANHSANLSAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALu7ALi5ALm5ALi3ALe3ALO0ALOzALGxAK+uAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKKiAKChAKCgAJydAJycAJuaAJubAJeXAJSUAJOTAJKSAI2OAI6OAI2NAIyMAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAE4ALAAAAAAPAA8AAAekgE6CggCFhYOIToUgGRQPCIeIADApIhgTDgoGAwCDADkzhRwVEIUEAp2KOwArJAAXAAwJAAWdAEE9Ny0oIhsWEQ0LB5AART86NCwmHxoWEhAPDYVGhTgvKiUeG7AAFIVIRUAANi4qJyAdABoZhUtHRD6GhiMiIbZKRkMATfsALCopUgFggq8fvxoyYqRSRPCIoR48dCwkBGBJEiNFhERKpEheokAAOw==';
images[':oops:'] =  'data:image/gif;base64,R0lGODlhDwAPALMAAAAAAM7Ozv8AAP///////////////////////////////////////////////////yH5BAEAAAEALAAAAAAPAA8AAAQ1MEgJap04VMH5xUAnelM4jgAlmCG7at3mmSt9inKcz3iM2zQgzOMjDWdC1e0FstUyJUsKEwEAOw==';
images[':cry:'] =   'data:image/gif;base64,R0lGODlhDwAPANUAAAAAAP///2OE/87e/wCa7gCZ7ACX6gCW6ACS4gCR4ACO3ACN2gCM2ACJ1ACI0gCFzgCByACAxgB/xAB8wAB7vgB4ugB3uAB2tgB0tABzsgBysABuqgBrpgBqpABpogBlnABimABhlgBekgBcjgBZigBVhABUggBQfACd8gCU5ACH0ACDygB+wgB6vABxrgBtqABooABkmgBglABbjABXhgBSfgBOeP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADcALAAAAAAPAA8AAAaXwJtQCCgWh8hbkQJxLFJHJOCVaTUXCAMKMAR8OJqW5MFIHAhbYqxTZK0axUOBCxiFYMVW5FFMpKAAJCJfLhYUEQMCDAsKRTR2MC8aFhOJDyoORSaCMR4bGhcULBIREEUnJTMynS8uGBYVLRR0NTQzRkUuGhlcSjY1ADMiIB94HC+9vjUlJCMyITEfyUQAJyY0zVFJSrhJQQA7';
images[':evil:'] = 	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOjoAOTjAOTkAOLjAOPjAODhAODgANzbANrbANvbANjYANTUANHSANLSANHRAM/OAM/PAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL69AL6+AL29ALy7ALu7ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+uAK+vAKqqAKipAKmoAKioAKanAKemAKSkAKOiAKKiAKChAKGhAKCgAJydAJycAJuaAJubAJiXAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAI2NAIyMAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP8AAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFIALAAAAAAPAA8AAAevgFKCggCFhYOIUoUgGhQQCYeIADAqIhkTDwsGAwCDADozACMdFxEMAAQCnYo8NCwAHhgSAAoHBZ0ART83UVEAHAC9DQiQAElCO70mABu9ERAOhUpEPzkvKyUfHBgWFRSFTElDPDYuKyggHh0bGoVPS0hBPTUvLSknJCIhuE5KR4aFWqxQsQoAFCcAkAzxsQMHABkxVik6uCQJESA/euyQSAjAkyZKkhiJlEgRwESBAAA7';
images[':roll:'] = 	'data:image/gif;base64,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';
images[':wink:'] = 	'data:image/gif;base64,R0lGODlhDwAPAOYAAAAAAP////LzAPLyAO7uAOzrAOvrAOfoAOjoAOTjAOTkAOPjAODhAODgANzbANrbANvbANjYANTTANTUANHSANLSANHRAM/OAM/PAM7OAMvLAMjHAMjIAMfHAMbGAMXFAMLCAMDAAL+/AL69AL6+AL29ALy7ALi5ALm5ALi3ALi4ALe3ALS0ALOzALGxAK+uAK+vAKuqAKqqAKipAKmoAKioAKanAKemAKamAKSlAKOiAKKiAKChAKCgAJydAJycAJqbAJuaAJubAJeXAJOUAJSUAJOTAJKSAI+PAI2OAI6OAIqKAIaGAIWEAIGCAIKCAH9/AH19AHl5AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFMALAAAAAAPAA8AAAergFOCggCFhYOIU4UjHBUQCoeIADQtJRsUDwsGAwCDAD43LiYfGBEMBwQCnYpBAC8nIAAThQgFnQBJQzyGHhmFDQmQAEtGPzgwKSIdGRIREA6FTEhDPTMuKCEeGhcWFYVOS0dBOzIuKyMgHx0chVFNAEVCOjMwLCoAJSS3UEzwQDw4YgBw0WIVACn8DBXKYaPGKkUImyxBQmSIkB8PCQGI8oTJEiWREilSmCgQADs=';
images[':zzz:'] = 	'data:image/gif;base64,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';
images[':))'] = 	'data:image/gif;base64,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w8UAxsgAzM0A09QA2t4B4eMA6+0B7vEA8vQA+vsA+/0B/v8AgACAgACABrlAn3BILBqPyKRyyWyCIijV6dD0JVa9bA/XcSwXMa0YNVJqejMMTvXJ7ibJAq7HAtguA142BkFasi12FwR6PTpURyiAgoRaG0gwczgvPDUyWmtIGx5inRsZSB1/nVk5ExxIHBMspD0cFx5IGTQEKjdaNRsGNhhIBTo0FgYZGxYEHDsyfZpZNy4vMTlZFUpgrSkiSwgtYjoaDU0PEiksKBQkVUImJent7u/pDAIKCgzpCgD5AAEh8P5KQQAh+QQJCAA+ACwAAAAAFQAdAIUDAwQLCwsXFxcfIBAoKQQvMAMxMgE3OAc6OwApKRciIiIuLyMqKiovLzgyMjU6Ojc/Pz0/QANDRANNTgNFRglUVQBaXABWVwlERRFaWxReYABnaABzdQB4eQB1dglCQjpMTDg3N0FISEdJSVBSU1JTU11ZWWRmZm6JiwCPkQCTlQGVmAGanACenwifoACjpAKvsQCyswO6vQC/wQDHyQDO0QDU1QDb3QHd4ADj5QDt7gDz9QD3+QD+/wCAAICAAIAGyECfcEgsGo/IpHLJbDqf0Kiw9PlATM4SAUWzzToDpoij65nNt8pycm73doYkIdejXXQqz1nGQGrMLgA3FgRtEkcPMmYvghYFbSklRgc8ZiyNhWc0H0YUOmU4KD0yLmc6NZxFEywcbm0bLyBGGCsWrmY8qyJGJCkRiq4oFSgnRxU1Bip0ZjYbCDeHRws1NRUGGxsVBa0sI0kGOz05MDEy4TUJSwjAZyzpTA4ZLzEtGbtPDQ4hTwwCAP//AvRZAkEBwH8C7klZmCQIACH+UEFuaW1hdGlvbiBieSBDYW1pbGxhIEVyaWtzc29uDQptaWxsYW5AbWlsbGFuLm5ldA0KaHR0cDovL3d3dy5taWxsYW4ubmV0LgFVU1NQQ01UACH/C1BJQU5ZR0lGMi4w/zFzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcMXMuZ2lmATJzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcMnMuZ2lmATNzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcM3MuZ2lmATRzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNHMuZ2lmAUltYWdlIGZyb20gY2xpcGJvYXJkATVzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNXMuZ2lmATZzLmdpZgJDOlxNeSBEb2N1bWVudHNcc21pbGV5czJcNnMuZ2lmAVI3cy5naWYCQzpcTXkgRG9jdW1lbnRzXHNtaWxleXMyXDdzLmdpZgFJbWFnZSBmcm9tIGNsaXBib2FyZAFJbWFnZSBmcm9tIGNsaXBib2FyZAEBADs=';
images[':love:'] = 	'data:image/gif;base64,R0lGODlhGwAcAJH/AP//AP8AAAAAAP///yH/C0FET0JFOklSMS4wAt7tACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFMgADACwAAAAAGwAcAAACR5yPqcvtD6OctNqLs968OwGCGAiUpUgJ5npOKssK0kuedPQCtZ7LTw5b+T5B2LABLOogtOCNeYq1cKbQ7vhTYplJlMW69SgKACH5BAUUAAMALAAABwAWABUAAAJW3HSmyyvxUJvmhQvptFhqxnmVQIpOppDAupKbsyosYILAxNZVLtN8I2iBVDTgbeBDxpRF2IdpCj5/qaOGuksuckKbFtr1Ng/EsQ0X3iyZZkq5pXOXagUAIfkEBTIAAwAsCgAFABEADAAAAiKcjyKj6CZCiPMdKvOyOFfLeB8YShsJjSi0tu7rAAcgyGQBACH5BAVQAAMALAUAAAALAAsAAAIcnGWDqYHiEgyOxmmzwJnurjXgIlrkYTJSpEpqAQA7';
images[':bier:'] = 	'data:image/gif;base64,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';
images[':xx'] = 	'data:image/gif;base64,R0lGODlhGQAUALMMAAAAAMYhAMbn//9CAP9rIf+EQv+UY/+thP/Wxv/nAP//hP///////wAAAAAAAP///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJFAAMACwAAAAAGQAUAAAEi5DJSSsFONttQSlDAHCk5IViSWaaunkFkFbs+IKybQJETwyYTig34X0+PiCtZiIUDIYPpqcsfoamJzS6WPCq2QHWuDV0uxgwAJUyagtn70LNdB/h55/Os2737khJe0BjPnc9aWoiATM8Pj6OQUVMDGuPj2I6lVczlWKYmTQgWJNippIXbJo7LR01EQAAIfkECRQADAAsAAAAABkAFAAABI6QyUkrBTjbbUEpQwBwpOSFYklmmrp5BZBW7PiCsm3C34B1odzEcygePjhazVQ4IBBFTE/HgAVNzid0sThRT1eiFsHlYnxDVIqYPZS7C/SOVW0ai4vjdBgLf+5FMXQmPn5/RjECZhciATM8SDFmX0tVA5Efg3wgM5aXSAOhVHWhnVUAoak/NGqjpy0dNREAACH5BAkKAAwALAAAAAAZABQAAASOkMlJKwU4221BKUMAcKTkheKUYSWzsu73DfDmFUDqHbxMc6fcCMBD8A5BW0i4QziPycoLUzg4Ea+fdCZqXo+z0QW03FmNSKpWhepWj0iBXHOZfqDyhV48BixjeHp7HTR/NzxTfCoiASkxHwACgguKJi8mAzKJWyCOLgOZPqCVJ38qfqCjlZ+Nnqd0HS8RAAAh+QQJCgAMACwAAAAAGQAUAAAElpDJSSsFONttQSlDAHCk5IViNU6ammEXu1qKVwApa7qA4p+42UqI+Xx+oaBOZjw4jy9Y5+OsPmuf5LSK6B4Ahx9Ieylwu4iwr4bKscznaq8WLVtfTg8WQDbBvwIAAoE3PXx8bgw2gAuCC40FPyIBiTY3j40CjWtRM36Xj46HWCCJigMfAKEvfgN9LK4DUiptnjKzPBkRAAAh+QQFCgAMACwAAAAAGQAUAAAEkZDJSSsFONttQSlDAHCk5IViWSVTpqlSIpsfkMJYgjGnPZKZz2eACfk4GOFhOXTtOp+llEkc3i4FKWKrO4BOxopHy5V5iagrbbo9JA49J3bqWvYKgHAraxcABH54eYN6NFl/C4iJXz4Bah41C5KICQNETj97eJKJAjI6PFaZJgORiTk/YGqklk9iaaMtLx1OEQAAOw==';
images[':8))'] = 	'data:image/gif;base64,R0lGODlhEAAQAPcWAAAAAAAAMQAAYwAxMQAxYzEAMTExADExMTExYzFjY2NjAGNjY2NjnGNjzmOcnGOczpyczpzOzsaM/87Ozv//zv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFyAAWACwAAAAAEAAQAAAIigAtCBwIoCCAgQgJApDAUELBhAINNJzoEOGEABQpHhQ4oOCBBgURACDAAIJIgR4PLABgQAGABQsiOAhgYSGAAAc6MgSAYIFIhwsNGJxYsGHRjEiLClXAtKkCCQV21pQgtEKEChUmVBDA0ADKhgUgVKDw4ABYgg0NqJUoFeHCpBBrvt05IK7ChwkDAgAh+QQFBQAWACwKAAQABAAGAAAIFQAFLLCQwEIFCwwsKFwoYKFDCwoCAgAh+QQFBQAWACwCAAEADQAKAAAIMAAtCBxIEADBgwgNIrRQ4SACBgIPCGyIYAHBABMbVqigEOGBhgsJggxJsmRJBQIDAgAh+QQJCgAWACwCAAEADgAJAAAILgAtCBxIsALBgwUHBkA40CDBAw0QVqgA4GBFhw0xHkRgYSJDggA0fuw4MqHAgAAAIfkEBQUAFgAsAgABAA4ACgAACGAALVgAAECCQQkEBSo0cLAhQoUFHRqs8HAgAAQMCB4AIKACBAQLBh44sCCAAQUVUqYEMDDAgQERARyogKAgAAMEIxoEUEHATolAbwJQQLSoAgkFjhbEWSFCygk9DRqwEBAAIfkEBQUAFgAsAgADAA0ACAAACCsAA1gYSHCghIIWDjQYiGDgAgsJEAIYCOBhBAYCETJ8qFFix48gQyJUMDAgACH5BAUKABYALAoABAAEAAIAAAgMAAkwsIDAwgILDgICADs=';
images[':puke:'] = 	'data:image/gif;base64,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';
images['>:)'] = 	'data:image/gif;base64,R0lGODlhDwAPAMQRAEVFRf/qAAAAAP/OAP6dAP/9E/+0AP8AAP/////+k//JAP//x/4qAJaWljMzM/5tA///6wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABEALAAAAAAPAA8AAAVrIABEpGiSkcmY0JIkgyo+RLEURaAPA/GINUBORwT0AA1AoiAg6pqx5C0gaD6bCoJoKThUqV2BwrClHg7Es5gsvBK/Y9Eg4HASHdmRscrvx0o8AgiDgwJHKEYxfEZaKCUABpEGWiOOiCaVKCEAOw==';
images[':clap:'] = 	'data:image/gif;base64,R0lGODlhGQAbALMAAAAAAP//Qv///////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJDwACACwAAAAAGQAbAAAEaVDISau1ANwt8wRBoHEVKHbhSH4pKqpk1grmzNUnHdobrpqwGw+4csGIRSQrR8t4jJiWbPfSMZciqhYYdKVqUx5lygV+hdr0NarextpuNG6nvIC39BXYCU7CxT1wXTdzT0VjfIeKi4wSEQAh+QQJDAACACwAAAAAGQAbAAAEZlDISau9OOutAeCXJwBB8IETaaonOpZeuYIxrMotdsMvz90nlksoIW6MvVwGyfSIUj6oabSbIYs4mRaGC2lrq6+OZSPPdNt01KveKivV9ptidq8tQPsdj3MCf21dgHJDVU8uVE4aEQAh+QQJDwACACwAAAAAGQAbAAAEaVDISau1ANwt8wRBoHEVKHbhSH4pKqpk1grmzNUnHdobrpqwGw+4csGIRSQrR8t4jJiWbPfSMZciqhYYdKVqUx5lygV+hdr0NarextpuNG6nvIC39BXYCU7CxT1wXTdzT0VjfIeKi4wSEQAh+QQJCgACACwAAAAAGQAbAAAEa1DIOQGol+otQAiXB3KkmHXfSUoiGLZq+aXoHG+mhZkrL48cz00jlA0pxSCwY9GxlsSRZZYKQZEpqtaHo06r3pKpOqb9tOjjE51e1djhXjZtPrfm1y75m9fD+35tbkh3LoNBTWqHi4yNjhsRADs=';
images[':schimpf:'] = 'data:image/gif;base64,R0lGODlhFgATALMAAAAAALWUAMalANa1AOe9AO/GAP/WEP/eIf/eOf/nUv/nY//ve//3rf/31v///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJGQAAACwAAAAAFgATAAAEihDISau1L+fLs1pKcmzc9DhNw4DIYTwlcDpPuoiPUcBdg2aLjI7AwygYKcYKYTAMBoEi5fFhAHGPgSB6eSQUiozo9RBspSaEWu0iaLdc2fRAbxYIZnOA+4hLcjoFT3l7PH1SOXcDGnBxhxUPgnp7hSaVU32UUYaHj5AaRYdRlzF/mhqlU6epqqQRAAAh+QQFGQAAACwAAAAAFgATAAAEjRDISau1L+fLs1pKcmzc9DhNw4DIYTwlcDpPuoiPUcBdg2aLjI7AwygYKcYKYTAMBoEi5fFhAHGPgSB6eSQUiozo9RBspSaEWu0iaLfcqexAbxYIZnMgLnlwczoFT3l7aH4wOXcDGnB8MoV9gnp7kCaHU36UUUUZUY59GlKHniQxfZSdaDGZlaYmqBIRAAAh/hqpIDIwMDEgYnkgd3d3LnNwYXNzY2hhdC5kZQA7';
images['*:('] = 	'data:image/gif;base64,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';

images['Croatia'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABChJREFUeNpMk+1LW1ccx7/3Iffm0ZvEmBgfqrUurazphk4Kw4GoUJ2+bOm6t90fMCxsfTHKXuwPGGwr9OVa2Fa6Dsa0QzqZ0ArtUEFDxW62NZqYJrl5Tu7NzX04O0nrugPnHu69v/M95/f9fX7Mg7k5NAfDcWBZFkTXGc7hmHX19l5wdHWN2NzuADFNaLmcXN3dXS/t7NzR8vlFYhhEVxQY9F9r/5EQGAYcy77ji0a/bh8dHXf4/WAJDWoYAA22QGDqBqrJJFLLyyuZR48+pUKbJiGt7XzzQSwLvCCcC09M/OQfGvKyNRWNwzQUk4HBs9CpHl+tw05UuMChb3JyXHC7V+ILCx8Zur7E0Ex4UBHGsqLBs2dv+8KdUl4uYKdXgm1HB2QF6nsiFCcDdZtBRQ0hdNrEQCyO7lDQq42O3o6vrn5gERJjjXKZ83R3X3dLkmRub0Pd28caF8Ca3Y/Miwz+yaj4O6fBHo7B692FfliBtncAY3MTDpaV7H7/dVVVOV6MRKbdPT1jVi4Ho1hCsHaIiNQFUlUQaqRx/M8DmruJWg0o93vQJiYwGFuHSv1qWiJK0hjv803zHVevXvK5XHCIIgSbDQz1bObbb1D/5S46Hj5A6bPPYSSSaP/xB8jT07D6BxD4+S51xIKnUgFJJGAUCpd4lueHWbcbnNMJjudfFfCtCPD+GKr3lmB2hIA2L6oL94B3hyEODoKVJLA0TrDbwasqSKk0zIMQf8vw12Wk73BOTcE5M4O93l6Ebt6EEIlg/8wZHNvagu3ECcCgSNBDaZFaaNDK+VlyJHA0KE+lGzeQnJzEsVgMyv37yF27hr5nz5Cdn4d85UpL5NWZBLquo9FogLdMM8+AhDj2jZbYHYYejULb2ADr84GlHmr0NsLJkxCP9/8XZ5o6NE2lU8vzNUXdOEwXh7waFaCGMwyFa+pDBKfP4cXQaQRv3YJ46hSSNNW+xd+gBsIolus0OxOplIz9gwwUqsG8PfnlbDpnLbCih/ab2ILdyVj4LprFzPx5KL8uwqxW4fnkMnZ/X8VXT5xI1SxUSmXImQTy6X14nOYcl1Ujz5V6faKm6MdqNcqLoqNI1+WiGxQ2WmIZNZPDlmsA329pkBsUEKNBuSqhXJaRzmQfFuTKFxx8IwSMuUbnx7RL7bRzYbPb4PC48GSvjE0+jE1HH54elCG67Ghz0DuzGgRWxctUqlTIFc7TDy/ZJrUU0RhM9SL0YhGNHGykDBdfR9DLwClacAkmOtttCElAoI3A57KQTCaL8fjhRUpwrGn8/2qFJVj1cdonK0TLgjNyEFCh/VSD01aHW9ThEg3k5AyW/ni88viv7XGLWEtNXFrUoOfyax0KF6GgEZ3SYM067cKFUNA30tnhDXg89maV5EQyu/48nr5jqNoiBJ4C+IbBfwUYAMuO+yxmJnjHAAAAAElFTkSuQmCC';
images['Czech Republic'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4NJREFUeNqEVM9rXFUU/u679715M5PJzCRNG6zgJlikJsW2GzHg4KItFJfFgtBFF4IFod1IXLmp+/4JoosWAm4kki6sgUZrFw0Gk4a6MGbykk7s8ObH+3HfvB/39dzRkbQoHt7hXN6997vfOee7l21tbUEbYwyGYSDPc0bxom3blyzLOiOEOEL/kKZpW0r5KAzDxSRJluhfThFZlg33C/xtejH5qUqlcou8QSBD4EPzx5RSJ6MoutLpdFa63e51+rc+mhfFgkmnZUgVzk9OTt4hkNoIQLPUPjpIj4vFIkzTbJCvtFqtywR+V89zNn0acZrNvv3Wie9K5XJNL+acD9loH4EdHmsnxjaBvO953hKl9yePJ2f5IGOLrx2ffv340TqoJi8wOWwjwBFDMtv3/VkC+8qolAsX6tXx+a+X1/DFl/ewve/i/0yD6QN1pBTnidkFPnP2/OfcLMw1D/p4sNnENz9s0AKG0ydexb+Q+oeZNuokiA16vV7Op082brp+PLXvBvBlgo4n8e3qYzzcaGJu5hUcrY/9J1hKse97oA6aoh9EEzEUPKkwoNZps0yB5Z+f4MctBwtXz+GTd2dgEcv8JTAVhsjaLmLXnRAyIlFRrpl6qQ6VCpQM0P50Abt4CkadJAHoMg8/PQyUwi6JcjeJIeRg4ELwY6SE4WzKDEjDxHxvB5817+NN+QyeKJDiTAyLRpupOFBJikil8FUGqZQrpIzWDIu/AWEjIB9PB7jhPMCV1i/UGQ5/Ygq8VIJh27pdoDuBPIoQByEkFdofSMTAmsiS+HbCxIcDbuOd7g4WnJ8w5x8gsEuIq1WIeh28VgUrlobpIUuREUja6cDLFYI0pluR3RaBYSyX42D1o4P1+avuE1SpAD3ThiiVIWo18CliVK/BIFZEESpNkPgBAm4MQWS/u0raXBZne83slN+6dq77+/2WKFZDoj9OKel0GDHSIJxYscoYcgLK4hg+RZ8O7DrNXiSja5RyJj52HiJj7FfHsD6wlLrj5XktpKLWSQJjdgEFqo0oE+g4ddEqIKQOaZC9zY3uwfbO5Zz26l6KyBi9JPldyrnh5/mtfpo0PFo8QfTLBGjTkyLo1ivLRPvpPn77/t7K/ubj62DGOjPYi+8R/pLG+gDsvSAML3Yc59KzJD4z1usfsZw9pFnS7jl7j9rbfywmUi5xyxrqcyTS5wIMANnTusr39ejTAAAAAElFTkSuQmCC';
images['Denmark'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5ZJREFUeNqUlN1LHFcYxp8z58zMftTuuhrFKjRJL0wJxRBLW4oN0iIVch2a0KT3TS+Su972HyjkKv9CEnJXCE0wFxKFUtqEioI1fuzqat017jr7NbMzcz7y7mo0vWtfGGaYmfd3nvd9n3PYzNR1dIJxDstikA2fZb767PLwD9evOAbjrae/5eLdfYRerVp/mX9+sLz2sL1/8AhSmsgPIJXs5gschdEaxlhjA59cuDM8dWky09cPRu/cs+9DZbMwjA0Nfjx2vrW9+932zNxsaf6P25Sz8CZfHEIMuC2+HpmauN83+kHWcV1YjJFMUrhdRrxTBsmFNgausHCaFnLSqdmNX2auykg+YfRNQBkimY+GPh9/kB0ZykSrm+AE4J0VOsmvqpDFEkClH6rW3ZTc8FA2+PTCg8Lc718YYxZFHLR53+iZuz19vZlwpQCzV4Hbn3ujGHKvinhrt6vOSAmjCERASc9px80kB07dPSiVJwXn1nQ6l5uI1ovA3gF0uQJ5euQYFG4UESytgdm8C4FS0NQKRfdIS9jGTGhhTQsrVtfkxjb8UgXY97qlJM6dPQbF1KNwfQuW63RLQ6c8AmndKVHSFRM0vCbSY6MXbScBJ5sBj2KYZgD33JljUGr8PFjSJUX20XjN8Tdbxgj8BmpB/SLbKG6VcrncYDqVPvHCf4yASivkC1hfWytb5mg6DP8/Or2K4xhhGELkv/+pWrMTgymQFzpOaLfx7vQlDNy60f1558efEa7kYaWT3cl1SjNSwcQSXhQg36xhs1Wrisqvz15o8A97jAWbemnQgH2q/0T+n0vw/1qG6M2Qlyzyg4Zuh4haPsrNOkqqBQ/qhYgccc9n/FuXCQhG+62pwRLOMUi8N4BEEILnMt39aGjsiiDhgYdgnyOoETgK74kQ5rE2ap5ET3QSE6TJvNUHQQDTCgiUBaPtoaks1WzB5wYt5SOoV+bJEI9FbLSKgJsSeo58m+mBQtaoLqwzAN6ThiYY78/SvDniKEKLnOCzCN5OodZuBzdprykhD9dfbBj9TRv6fh1x1mm30NtswKWptClZv5OEyqSgyZRBTCAmsb205JXzm1fpVFhkbx8jFE+aRk3WIe/Aq0w6qy/RY7vwEYMnBZyUC+0IvNrdwcrTZ7P/LC3fNsxaYBb793l0WAhbiGC+3Kt7l/nq6pUUt8eD5b9zzGtAMVS94u7z/fzmwzgIHgnHoXPgJF4LMADqAeViZPrI3gAAAABJRU5ErkJggg==';
images['England'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hJREFUeNpcVE1vG1UUPTPvzdiTsWPHjtNCK1HUSlUEiEW3QbIQUiuVJRXthhVsuuI/8AcqIVXiF5TSdaV2gyIorEhRKSRS2tJQxTGYeMZ27PF8vRnOm2TalKu5Gs3Tu+eecz/G2NragjbDMGCaJvI8N/i+XF1YuBJ+/9MF+ONlniFRat/5+KONeZrcSeL4Ls/yJEmglCriJY5MX6a/X6/Xb9QXF7uVSgXhu6tI9z3kKoPpVE9UT596J0qSz3zPWx+NRl/y/qMy3ixByOJiu91ep3erBDGFQNofIH66g/jZDpIXPQiydhwHKysr3U6nsy6EuFgCySNZ7y0tLd2u1WoNLa9wBql/h0h3+zoTMI8gTMEIWXw3aXEc3+73+x9kWfZYUqOgnJuu6zbKOmnXpjwf8e4ekOWQBDKOakkmYDB0Ytu2b/q+35VCykturbampQhLkolZskVMOeEf24V0+/SbL881UK6T8m1XKmtZnl+SRLomyMAoCmbguKX7PpK/B5oGhLuAnCyMY8WVBNIlyJS6Zvxw9YvNhrRX7ekMZkj6WdG9og7Rny+gDqaHgbaFyrkzBNUQeXEWsPX9MMBuGGzJ4NffWyJVsMdTAsXlMBSPYdswxKHUjElmG7+VGNDU5kwW5AlmWdqSKghIjSwIVnTnmBmvK311kOdlLqSFsxny7be8imWdcDJq5gWjTMcnevYXsmAOQzeBNXLPninO80RxSBWShKUIDkht5smTX3/1kMO1yrGAnuay9dqefvI5Zj//AtFYRPX8OZz97hvKtQ4bkabY29uDv7mJVq/30JyH4a3JwQH4hmJXjptwXchOG9apk7De6LDir7SGUQR/NIKOTdL0lpwHwT2Vpg94ZU1r55DB0kXWQHUX1spy4XK5/bLQIZN6w2Hhs+n0Adt/T3LMVRRF17nJP9Ib3DUsNhqocqcM1kUuNSBaTYjmYjHNMZmMfB9DDeR5Y4Je57QrqX8FnJvHPPg0CIJvJ5NJU4M12y0ELFfmVJG7DkCfTFmCOAa3H71ebzQYDK7qWL025dJqsPsE6dJvDD2v2/LaiOMI0hZwKhaqloAajeGNR9h5/nydIMVvxDgaCfm/SXlEmR9Op9PLnu9fmW9vX7DGk+XKP33kT57sW465MQ6CO0kU3eW+vTZ0/wkwAHPjzFxfhB8iAAAAAElFTkSuQmCC';
images['France'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxNJREFUeNqMlMtPE1EUxr97Z0pLa0spRSk+NpoYY4gGohurqRqDhqUSHwv/AFdujHsT96x068IECWsTNCawYGcgISY+QVREsKW0U+g878MzA0SiaDiZk6Y3ub/znW/OGXbu6mOEYRgcjHG4nmCHCumBh/eKg5l0so9zI6+1htBqxf5ZnqrcfzDqLXx/DqV04DgQQkb3TWwGnRNInzh18tDQxTNHSvu7CzBNDmJEoRn2tSVaj6duXbtdeTk+UX09fVcrNbN1n29BOOf9V84fm7h09miJGyYBWKSQzjfTgEHQVvrtLhVLhQtnJ+isn2AbIEkQenqKpw+PHOjuyH6Yt/D52zoY3w7hMBiLki0ugX1bRHuhkO3sOzlC9XokNEzHDYyjh7sedeQybe/m6qjWfWT2tGCnYFRdEwSNBkLfUi3xtng+/6hW/lkyqdplghQ/fWmgXPUiUC6biNr9K6SE+rIAXauBtEFLgRhQVMQwKW4ulR0srTRQqQVorAc42JWidncAEVxbFlC3NvwTAXjggVy6aTZt2ftxvk4QiTVbw/MF0kkTO3HCdrTrUnpgpgmDFDJKOu81rTUv50uG+jqD69NtXxJMYTdB3pPNDDRJOdN2BYSSkCqcBLYrADbVhuUE/fG1AndcfzUIRCR7NxJYIgG0xGhAGQICOCTCU2qVO4437Xo+lJS/S/2LQ2vEO3LguXaoVBI2wRp0z9N6mivhDsvAJpBPHPl/ReFwdu0F6+qE396GejKONXJDaD1MxogxqOYkJTXthcMSmcj+AUI+h4DSymZg7UnBgZ6UWo3RVtL6Ku8OBA2IbBDHplUQZP7f6iT56GfSaKRTBEqj5nuW47p3GGPS3GznDVRwHTp4BtnMQsZRrVZhIEM7Z5BCFr0hv9kkFUnUm0ksvn1bL3/9eoN27Q3b/hmheAHllAg0FDhGaf7zHNxmB2ItccRiMXDDgLBtLFfKmHs1PrH8/sNdzdlMWAR/gMKg74u4YK+vDszOzg5atUpfojWZpzUK21qxfvyYWn7ydNSvrj43EnG9fWx/CTAA8Jag9rs++TsAAAAASUVORK5CYII=';
images['Germany'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzFJREFUeNqUU01rE1EUPW/mTdJmEpNmCipU60orUqS6a2spdmHAtaj4D1wJLv0TrvwLCq66KBjcSA3dFIVSqhhRtBo/kjSdyWRmkvn03um0fuy85HJv3rx73nnn3ieWlpbApqoqhBAIgkAUCoXr09PTN6ampi6XSqXJKIrQ6XS6zWbz1c7OztNut7sWhmHiOA74G5s4BGIQ8otzc3MP5+fnlw3DQJIk8H0fcRwf5bu7u6jX6y/W19fvua67xetHQLxR07RrtVrtyezsbIVPsm0bo9GIGaan8h42KWUK2mg0zNXV1Vv0vZ4CLSws8IfZlZWVlzMzM2Wi/RcIA9A10njI7FCKzc1Na2Nj4wqtbUvL89QL5849qhhGefvtW1iWdQBCxSEBMdhRzjEDZZZqPl+uTE4+2u90luVZRamdMozF9vv36LbbGPT7GA2HqftcTLpwMRdGWUyBmCGxq8Tx4gRQk/elvF36/h2SnFoDEEDMnWBNsphwnnmSrTGIQ/EHRVOI21JxnEtas4kcgaikjeAC1uGwkHLB/8lTdTKN2DRyl9wELsnIsqpMXzHNlM3/GPcxOvCqjFwXMd0d2WD9jzE3qkTAYxE4Xi+KcTwOMur/mIBCvZYQGl1EoZw2Ix2LAD5VeLSH7tGTQeK9joriPPQESswTnh1FUUgNQi9C0XWIsfEMKEIy9ODT0Pr2AK4fwh/itdQfxI/1M7hjlIBigQSUGZggBrJCC1UCpAYrOq2pdEhIvwEG9j7MzypyuxaKX8LHMj6NZxbQ0FQsSjpUEpjUCEnVUxDIE5RXfwPFIQ3sAJafg0VnDVW7oZ7EM0lr0TDBXaL3krxsEIljRYn8uE7PoEzUiA0ICCWSR0sfrtnPYa+votdrWZ7j3+XGySBMJdkeDnDTHeJJ30HFmNBQnshjPClAkgutiFipIIjG4HoB9h0VrdYbs/3z8y0aq22WQh50Jp2zen+AZQJ6uGcnyxO0uVzNYayYh0ZCK7kiwjiPXvsDPr17/qL9beceEdhK9UQG9Eevt0Y+rg5c7/qe2bqhd8LLesmelLkWv7eubX59ZXY/Pg2CcI0ef3I0TGS/BBgAIQsAw57JATMAAAAASUVORK5CYII=';
images['Greece'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA6tJREFUeNpkVE9oE3kUfjPzy2SmmSTTmYnVohAWBEttF/W0kC1x96DQnhaERrBHD548yYJHxcOevC163oPioZeVWmUhsNnDihbi4nbJJhVtt2n+NMm0+TeZf/ver9XK7oPHZDK/9833fe9LhLm5H8DzAkilYnD37rfgOJ5w715hfnw8fiWdNi9ommq5rg+Nxn6zVKq9fvv2nyfv37ee5nLT4a1bX8H+/hCoGBxWGIYQBOGXljV+f2kpk0UAEAQBXDcAxgR8DhMXL56Z/vBhd2l5eS2vquwmni9+nGfIAHw/pKFLlmU+0vWk7vs2VCodGA49UBQGudxZfvX9ACTpC7h27Vy2Vmvmbbu5GImIq5IkArt6dRZKpd2ZkycnHpumnnTdEGX0oN12uGRi5Hkh7yAAfo9MIB5P6I7jPH7+/M3XlcruH0K5/JcUiah5wzAzsiwDoRPDMBSQJUC3O4Lbt3+BZrPP5dMz3/exPQQcQrFYKlSrtSzb2Ohcnp7WM/QmRaFhESWN+BBVr+fCu3cdBOrhncDlEaMg8LEHIMuRzOnT5mV2504hd+pUGQEkePDgO5TgwcLCT1CvD/hQKjUGy8s5lCLD0WKoA9zYPmxubqINtRxrtYbnq9VtZBP9RL1UaiFQn0Zgb28EtH5i8XkdSBdBFEUEdM4TkEE+JJPAqVPRtgCoRTS+CzMzP+KAwIGPiiJBFrTx5S2DaRqDSEQG01S5udQnTmjIUOJAVOTfx+FDPp+uJDEMPRBevXrzp2VZU/F4HAxDOzR49D8p/y2yod1uQ7n8N2auss5w42uuO5qilbZafa6ZMZGnmnPgLI8+Hy4TWbowGPTRQxvPB2vC1NT38zs77s+CoOHBKJdDRsqyCIlEFFmqoOsKjI1FuE+0DGLc6exhJLaQ1RZuNFhg6+vVZ4zJBUUJM4LgczBRlNA3BpomcxACIyAKq+f5EI0ehLLf96BaHRba7d4zdv36OT+dTt6YnZ38VdeNpGlaQH4pioJgEpdK0gQh5LkajRxkY0OttoNBnbBfvkzc2N7u+sKLFyvcWHzTpSAQH8Vicd0wDGSig6qqnBmB0YY8z8VoDNHLNhncaTSqi/j9KvfVcXxuniTB6sOHv2Xz+cr9WCyZnZxMQTo9gVEwMN1xjMcYggICbMPKyu/5Y8fEm4uLM8XRiKLhH/0fEf3BwCva9t43tt2bbzZ3r9Tr9QvHj49biYRKP53m1lbj9cbGzpMg6D6dmzsTHoT0oP4VYAAe9PSnhse0bQAAAABJRU5ErkJggg==';
images['Ireland'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxpJREFUeNqUVEtrFEsU/qqqeyYvMnMnk4zGXPC6MHBFDImIQpC5gkRxLV43Ing3uvJPuHflwvsDorgQF4HoKouAKwNBUIwmKjcanUfP9Dy6q7u6qjzT0aBG8HqKD7pe3znnO6eLnfz3KnomOAcjREnMxgdHzt04ceV8YXB4hgletNYi0bYWNj8+CeYv31OVtQULWCW70IlO7zv4bMYaMMuOHP39z5un/pguT+wdR0a4sDR6ZsFKZqjvkPzrn0uNlftLzRfL160xq1/u820SC87F3NnJ40unDx4rM1fAMtrkjMB3IJhFv8sxNjVXHp06uyS4M/fZD7imSGgcnj0wdXdiZE9+rfUO650PlCZLU90hoXmK5ms43ivkxybyhcljd41lhxNDqYUqEpOl/bdGhvO5583/4KkOBtzsTkpfGyOXorEOdKswhmGoL5vL5Iq3GrVq2SFvZ4hk9mVrC5XYR52Iht1+aGN2EcGQsPWX4O33cKwAlxYuN7N08oxDdnFLNrDV8VFVLbRViFJ/nnzvjggkAwIPLKiDMwFHUoSRpbPsotPV0fSav4mq6aBtIkRGIcsd9Eq+m4jWVEBIwEQCQVNOoOCnHT/uFmKqXZNJSCS0mqRkP6D5Ti8C2/7WFgUnUBESKqkWZnv3FywNkK7FBB4q6alEwdr/cbMXgjtAtebUZwwxaR8oQCp4PIzkiowjKojGz/MRwFAJGCxCZ3LoaAd+BEQaK9xINa+DGCYmam1+QkRi5vbBDk8gzIzCszm0lNNLb54jMYvoqmV0VEpNc5KK7Qj5jVGH26E9iAbG0XBKaLACupovU9UWOdFpyOQaxejDl2nSQlFv/CA6bSyk+xsavIA6H4MXJL4M42vklJLUqTBPqTcukHp3ELA8cyJ4tTqyeXpaBIFOmrSFurRNRCzAu/cvmpXNt3/T8lP29TNCSj9EqMsIzM3EtssbGxtQxRBuNgPXdcGFQCIDeJUq3jx+tFR58+w6kax+kcD5rstWqSlOBV7r3Pqr9fPdmj/TN9BfpN+oJ12tXd180nxw+57ymwsi822NPwkwAE78lNGIAbp5AAAAAElFTkSuQmCC';
images['Italy'] = 	'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAx1JREFUeNqMVEtoE1EUPe/NTJN+k6bRtuIPFESlKBURpEoUQcWtom5cuZCu3Lp049qNrgUXWrouKCJ24VILRajfYkmbxrY2yaSZ//t4X9JKpUW9w4Vh3rvnnXvuecPOProDExbnYJSRiNlAZ++VB2dvX+vryp5gFs9rrSG0+uktLb//dO/+uF9cmNBa6TgIIIRs1ttYD6UVmMaxk3uPPCwcHC7s2bUbbZYDTY8JzdCfSbcf5Teu3pp/9Way/G7qrlZqeqOet0A0OLcuXj58evLC4VMFZltQMN8YJV9Pq7k5ZVnYVxgp7Dt3ZtKiGgJrAUliQmyGRg4cH9udH8h+qS1gtl6mFdZsdQPIYgQKBlkqQxRLyA0OZgeHj48R4yFDxA6S0Do0sP9xX6Y387FaRCVuoN1u+93S5mB0ejxfgnDrSKi4I5XKdOzIP678WC7YRPlSX0/vyFe3hOXIRSVpoMtOQyq5BUhLiXiuiKRag1mNpYCjMaIsfsmmuFkOqijXa1iJ61gTIXakuiH1VkYgGYTrQhKQpnYhEqgkNtxv2p4Mh40uK7KBNRXSKQmNkm3bmvmkgggqimjetIsYmqS9w7Yb+bmYATUdIISgnQIRgentGG3WyyRjzXepkbN9akUIDslVa/V/Yv0MYxHRMit4EEWVhET7B4HfNHh7CqzNMXSaICFNMtKqQkDBVBiFUNQr/gVGpnT6cnByvUBXB0ICa5AUsdJTXEXJM+nHUDHpI9VfwYxBnYF+2P07IbMZNIid32L2jEOoF/CTt/ASY4ymcsbBG0L+yYjDJkbI5+BneuB3dyKAfkuDecHJohKhGEWd3OjSWIMYFoEpqbbgmKsge7rhEYCf7YEbR24YhKN0qrTRKvhA5rpOjJ4jYFlmx6isrqJTkahWi53ZFXkePNLGa3SgNDNTW5or3tCMfWCbfyOkzUtiVkAgH0qsFeZmv0PtjOCk2uA4DulsIfF9LK2sYOY1/UY+fb5LrU5vSGD/4TBgmlo971XqV77NfrvmV9dOpNvTebpG5sr8rC0uvv/45Ol4tFqdsNIpvclS+CXAAOHLr55lFAvsAAAAAElFTkSuQmCC';
images['Netherlands'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAzZJREFUeNqclN9vFFUUx79z586Pndnd6daq2II8NBDUoKRN40sNKy+S1MSnirzwB/SJJ579E3ziTyASXmlCE2PWiFFJaEKaEMGguOx2od3uz+7cnR/3Xs4MW0BjonAmJzdz597P+d5zzh3jyhdfIjPGTDDDgEwTwyoUVoIjh1fL7xxatEvFGS0VwvZeu/Pgj9u79+5fE53uukpTHYUCUqb5fo6JaaWgDeOj2VMffnN4abHqTVcApaHT9Nm3Y/NvH1k89UG/2brw4Ptarf7zrYs0f+dgPz+AmJb12fynp7899P6JKUmRxKNtqDh+Acpca9imieNnqlXH92p31ze+kkm6YTBGIJJNK06++/HS1em52WD0519Qo3ACkQQgl+o5TOnMgZnZ2amjSwtXf//pl08owBaPBkPzrRPHLpeCIBj8dh9qOISOklyJkgRJaMxUJQm9Z3MEInhKQVxmBpSCy+3tVpWXj8+frczNLcd7HahuD0oIqHEMGUdQSZqDtHwGxUSZIpcESyhAISgvl6bKZ/nJSxfPV3wfBceFZXEY9NBR8V+WwQakvtFooNXtnOcm5wu8WITtebA4x6uY5zpwRQj0ewuMok8T/n+p+BdZdGzKV5JMM/06gIPeo70JFSGmCjPqzA5NUVe/OihNE0RjgSiKOlyIaHOn3X8vkQy24+TX5GUzJu9/m6ZDZBVrPdlDo7WLUIhN4/Tq1yt7++q6UyiDcZvuHM/WUeIZip6DcpHcd+E6HCbJltSNIbVHrzfA7pMGdrbrKFjyc751r3mDKneT2eGyaXkwTCeHlfxsZPAL9nNlmVpKb97tSTTCONxHfzC82RLiBrctZO27ZsjRjwbTAe2FY5mkwsIbgYc3Kz6myi58z4ZFirLEOkyAxSZaddGPk3jNtrhk+V3Saksl4pwc93qpoNynA5iI4JgpHK6QiSq5BsqegcDTKDoKzWaz97DePEep28p/Qy+lcEOlUTUdd2vJfhsq6sCQAzA9gmWM4fI0B7d3d/DdD7dqv27erSqtNw6K8c9WvkM39Mxo2F1p1Eercdhb7HcqM02/kJW63Xzcvv3w0eNrYhyt29zSefkm9lSAAQAFXNPYDS7HkAAAAABJRU5ErkJggg==';
images['Poland'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuVJREFUeNqUlM+O01YUxr/7x8ZxkskkA+IZUIUqwXYWIzZFYo2gqtRFl6x4Ad6BFa8AiDUSLCqNWrYgjRAatRsqGMjQjibOxLEd3+t7+a4ZSwFNpfYkR06Oz/3d75x7bLG/v49gQghIKeG9F7zeSJLkZhzHV7XW5xmDtfaoLMuXRVE8McY8ZczziqZp2vUapxaS6d8Ph8P79B1CWvDa/YvOue+qqvp5NpvtZll2l7G97r7uIEqpH7a2th4RstkBgsrgXU743ev1EEXRDn338PDwNuHPw315uuDyeDx+PBgMWkhwglv/9n9wlotN2mQyeUzQZZYNyRpVmqYP+v3+qOtT8E7JuoXYOpAbj9iCB+ydkgxcJ2S7SzoL8K2FjYKqcGWJ21R1XTLwY6fi35ScpayDhc0JIiOKrggGRBT9J8i6KnWOJxtH8EJc0W42nzj23JUrNDrC/zFXLNEcZTDH2URPf7mHEgpJZaCtOyPdt1+sq+UohP9LZ/HeFPhI16vpP8c11EVtHMRZIMlZilg6y29hjjm2gTMWlTOElSjc6ljXpn5lZHTJSQXPBXK9qQHQTyDTFCKJQ2PAZwK+quGWBarFHPkKqCFe6dLahwuJnyLmKMHjbz9oFciNAdR4A2JzCNlLmPAF1CxLmFmGE18htwtY5x/qFfyzzNkXXLwdCH0q04KjkCZQBKgLY0jCZNrjA0XVnGKTL5GrhpAc1Yl/wcfnmabIhuruWOd+t9KPjNMYnkvQI0iMhi1EjUcQwxSeIFPXyNmuBVbIDv6al2V1hyU32oYTAF6fwN0qG/coF3ZzLDTGkUA/4WkmEVQ/htjooeHMFCYipMaHNx+yT2/f3eYMvRZfvUaA5wvf7OTe3p9btXPCHSfKIeVoJTGnuBfDxQpH04/489ffdqdv/rgLIfeEFF+/j8QX32PPri2L/Mbs4P3Nv011dTCfnY8P+jzx5mh+MH15/Pbdk7osn6o49qcCWvsswABJ7lhtHom1mgAAAABJRU5ErkJggg==';
images['Portugal'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA+dJREFUeNpUVN9rHFUU/ubO7OzsDzO7m6T5YQgmDQk0VnHTgJVUYhEM9FFLrYhPhUJf9FX/Cp/6F/hg6aNUGwkYaVATUEyXao3aJJvsTjbZ7O5kdnbn173XM1sD6YUz3Lnc853vnO+cq7z9+ceIl8pUKIqCMOJKMmVcm8sPX78lC0U9kx0QgsM/Pq47z/79zd76637QaDyQUSSDbhdRxHv+Gv5fQggojL1+aXr2yzcvFBfHMyaGnBCEDElAmJoaPvdG8VW3WvnEWv1h9XD9l8+kEJun/j0gISUSmvbeUnHh64uTM7mTwMP+kYXpAwesBySeG90zNBXj71xd1DOZ1Z3vvv0wisJlIgCNCxlfuLgwO3dvbGjE/LtWRjPowuz6ENU2wDkkF2fABAUG8iOjOW/u0r3dn3+6QkRKWtf31Jnxibv9ubz5p7UD23PRjCKca4fgezY5h+RIrKKQLAaNemXgtE/rupkaGLzbPKwtaoyxpX6zsPDP4R4sp4njTgdDpg0zbaOTOYG2rUCxGIQWvcBO0J6TJSAXOFOXNC2h3bTsOiy3gapj4/1XGhg9lGBOG51dH860DtPwYKyrQELEqvTSk5zyI3YyrqGCm5obdItbtV2UyXH+ZQufTh7AWyvCn38Xas6HVlqGM1uH9liH2qT4TPZUUkDBqFiMWAkhi5rdaRcCX8Du+DifOcLjZx5GJkZQvnwbGe6gb+sR9COBYMJHqpYAjFPBKWX6xrDEr8A6JLUXBXTCEXAFP27noFlddEIPru3AcAPIYQ6JM0s+/4u/Ee1DMlLNb1BfD8XHT+pZfDDpoOKW8NbKVzgJ6/DmLQzOS0TfFKCYxIhRc5Kqgiyk4B6BeBINlU8VLnNFvAaq5UHbwMywg+N8hNrm75jYfwp2QQFbH4RhDYHls2DpDJSEDkHj1ApCWGS2EN+rcqrgU0t+BEacmIKNqok6RWHnOa4oGjJ/jMKojUEdzoOZJlgmCyST8AioRorVPA8dzr/QqNsewudrlO5Cr5A0NE+O+oBaCsldFcnBAWAsR0xSVAGNmpJScttoE1DbD+A1m2sU96EGThPJcYc0fESgJgwqYVqj3tHB+tNkJpRcDko2C0lAYRCgTbPlRAKtctnudr07YIyz3uAIWSLJbsANWnCodzwOVTC4ug4vacBPpeETULevDw6l52RfQqVSadV2dm9IRSnFCrIzoi4T2CLawarS8iDcCAcKw5GqoplI4MRIwSHQWr2O0srK6vbGxqIUcjl+w154j+IGo5dtE5G4Gp641/ac8vWn3eZcX8seSFT2EYVR3a5Wf23s7NynB+2BquvytJfi9Z8AAwCNvjR+dmSk9QAAAABJRU5ErkJggg==';
images['Russia'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAupJREFUeNqUVD1v01AUPc9+cZ3YieMEGgZGFlq2irkSrQTswMDCzsRv4Bd06sYPQLCDBEWqxEi3Nl2gVWlTREqcgJ24jj8e57VJVQpCcKWrZ1/fe+65H35ie3sbWoQQJ6rFMIy7tm0/sCzrppTyklIKWZZ9i+P4A/V5kiSvtF+apsjz/CRGYiLamUA3qtXqCnWJIBoQ5763iqKYPz4+fhQEwdpgMHhC2+b0uzEFYdCtZrO53mg0lsjmBEQz1OdUTdNEuVxGq9Vamp2dXef7rTOgCZM53/dfuq7bOB+k9eK7VpYLz/MaTPySpc3pEulTmK5bWa3VHL9UEiiVzDM2F0XbNJBlmbBtiVqt4pfL1mqeJ6bs9cxlz3MW41hgPNYgvwKQ8G+ilMHmS4ShwRhr8fAwX5ZPn8qHV68aODoSCAINJlAUOFM9FA2mz6lNKe1j0CYJaCKOi4dyf99Y2N8Hul2DGcQvAX8XzdycnMWCjCI0NYsoEkgSgX8XMR26BmrK0aggPYXJXv2naNoZNYEcxqqXK3ElVcaffWk2ubalEjkYpyVz2ihS3XUNdKyBejKLo42ayOaVGkHBnlA+Fcl1cFzAcQTssl7O06YnsUI0TBFGX5BmnzHEcEM8w9zt6+i+rjO1SxBJNQipKYi6B6NRh/CpTgXC5JcsRxENEfYH2Am+Yfd7gI9Z9Y6cQ/stE62Ty2KdLKrTPjIQDdZzpcaTBkfXyCnpfnIwY6uAhRQzYX/9Gnpv5XeyZf7HMfB+CPiXiFGTJcw4PkzvMi0tAjWZoYqcLMfjMfrWD3w1bXQ73X44Lh4zTS51zwnU7gP3RsCLHzqMAd7MDMqVCkpUuC6Keh0pf+YROz0gs067HXT39u4zvH12jYhTsHcEWaSuBEot+XT2eJXYBJT84w2C5XwOPn3C7ps3a0dbW08YszkdjTy/XpTNBFiO4vhur9O572TZghOGs7LT0RdbNzw42Bjs7LxIs+yVeWFLfgowAJ2oT87/Y0ZIAAAAAElFTkSuQmCC';
images['Spain'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9hJREFUeNpsVF1vE0cUPbM7u15/xU5sJ06cklKKqhZKpKSoLUqlFIk2Ei+8oIJa9Qfw1Pf+gT72ib8AiKc+pCJVRSOVIoQEBRkaJSjEhNg4sZOsjXfX+zEzvRsnfeqsru5qNPfsueeeWbZ44RLixXQdGmMQUcSMpHUxe+ydy5nKxKyZSRelkOi32237xctHeyurt/vt3UUVRSpwPQghDuo5DpeSEoqx6bGZ6Z/HPv1kPlkYAZMKVAAVH1bvj42fnT31dqv+/eZvd5cbfz34gWqeHtVzKDqjJHTD+Hrqwpc3i6c/yivHRfhqC8oPDoHk4EP0JIj5e1+dn09k0ssvfvn1igjDJcY0cAUBFeDj8c8/u5UtVXLusxqU4wAxSBgBMQgxGoApSPqoVAr54Uq+fObsrY3797/QUqrKK981dcM7dX30RDqn9Z9Bs7rQhA8ZtyOIjQwBGbM6zBSS2IWRgD6JnHbGuh6W6vM8WVILpan0XDrxHAmtSar34PQDpBMuEPkUBABipmKdKEMcvMtIIeVIRCfDuUZdLHCd8avMayKh3mC70UXtOUPHUcilfHww7SBf6AN9EhJyEDFgnKlNzaXskjgBu8o16czowRrWNxtgQYjVvy3sE5nyKFCcsLFvBzhe0YiIOprvwC6UdNrWGGFKzGgQnRE9aqLuj2F/jcNe66CcX0Bh9kfY5jlsOxWqkocAR2C0RQDsEJfmMMIhXQSeB6M1idY/DmrIoeslUfCn0G9MwRJdkqiO/1s0PITUaUDS8TDw9oQZjCmPozgb4jSNvtp6CK96F8V3hxDpQwP+LEWlWuxcyuHBNAMS3I0l9LHHA997LJLyw93xEMWQIV0SOBc64PYW+rkTiMplwCwRUG4AFE9N0tXwHfT6PRpMBD/EY+6F8kZX4NtMYhXHJm2cPK6hFWRRgYleto+3ksw5NEUA2fhCDiwgevDVPmzB0Iu6iJS4we26fmf7j8S9EtuZ6yY40gZIuRW4qQLMdAblnIldqwKWoNY0fmBM33Ow027j5WYK9e3aPZR7d/jKTyNCeNq1mmJ/5qDncjSLDLeQKhWQrIzDnBiFURiGlk0DhoEg8GF3u9ixk1h/stdpvtKv6VZe8Fh1lpBVD/gmgrjpQ8sHKRNqRINeNKAXTMoWMJyBNE34kQU/JfFmvWq3mhtXmIlqrH/8Czqy2VJPqfltGS2/ViHq5J0dzrBncHQsA04qSWGhSS09Wfp9ef3Bw3kpFd38gaH++x+xQTz1Gc67rnOxs7V1uR2Gs0PdbtFsZBBFUdt+XX/U2qjdDj1vkZvmgRGO1r8CDAADaxBDmnMoXwAAAABJRU5ErkJggg==';
images['Sweden'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8BJREFUeNpUVN9PHFUU/u782J1lfwIrLAQbiaYKpDYRU1/QoImhpi82aVMbExPTtz71wTcf/Qd86oP/QCU8GW0Cb8QSE9O0iKQKm4LAsrDL/mKX/TFzZ+Yezwwg9kwmuXNzz3e++33njPjomx8QhK4JOCqKW5dXxa2p7Ruwxm+bfWPTi7vvZ486Fuqtk2q+WHn2Yqe8UG22H3u+oo4t4ftemG/gLBQRBPyrI6OT3+cuz8ySMQQhCG+pHLJ2BIKGhj+YeGNqr9L4aunp5vKv61sPlKK183zjHMTU9bnPpt/58b1JM2PoBfheAUQSexULh51YUAS8AUM3MXdtcjYes5Z/Wln7wnW9Ja4IgxmCnyszV96cH30tmz4+2YBIvITGlIl8lJqvY69F0BhIBWdJcWWFseFs5trU+PxvqxsfEtG60ZNSf/tS7uFgJpV+UWxi1CgDQ/sMRPAVAzVa2KkLZuSCdQlfxUCBNlErls72Jx9WKrVZQ2j69YF0aiZfamGbE6YzJcDNA5KrKxf5w3fx55FiDRiIAvDgDcB8kNNjnvoMC3idgaJ3Cw2Jw5Mutmo65kYOGGiLgUy+BjGjHvbrEqbmhlqq4GagkBVJ1q0TbGh3xc8LN/9KJfUJTbS4koPxdA1jqQYCKQL11so5tF2TNQrST4PCBaFnK5SPJEpl52/j6uDmwEDSQ9xqcTM5gM+y+nqYIPjw9Og/vDiHeDW8HrBj+nip1IChfDt054xCmH4RvCZxsT7lcwHEaY6rwWY9jfVSsp7p6sMxy4emEUYSJxiKtxn8NDFfzcFWFnd+wFJDqBB5odjNlovdAweFI1k3bs5//lxYiQkyY/BlEt99+gu+/XiRHbHgUgT3Fr9GvnkJmRiFY+Sxa7b00O45aDeq8BpFoHv83PCk84jF+RLETR70yDlzwd9aCulEAjktjsG4+A+ozTMWEWx/y0PLlwG7RwaUXIRUK8x6BhRlqUI7GSQOofdjKNUHsmIY6DsD4mLtLsGSClrERVfJFUlq0WCLfB6s+1D+EwgzbXcdvhZvG7GQUaovBjcSRTaucS8JSOkgwirrUR9Fu92Udu8+zxp7ferYOmTvDrq140a1g/2yhmozglbX4isQkgYhEwUGLUI2qtBveCgWi8e7ewd3WIR1nNlwbusS3O5so9Zd3tzxsVUgFBhQ8Bj0UQcJ4SAOiVqljKUnT5d//2Njljs9nPxX/kdnrbImXfqkVOne8KqF27GkO72xtZntqDpWlazul6vPtovlBc92HsMw6f899a8AAwCj0iAB7iTyugAAAABJRU5ErkJggg==';
images['Ukraine'] = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2dJREFUeNpslFuLFEcUx09dunu2Z8bu2V0dlw1IBM0NY1wfXWHIi4LPEiUQyKtPfoh8AJ/8Cio+BkHBwELMQwK7sGwEScTdxNnshdme3p5LX+qWU909YiQFp+vSfX71P6dONfn+hx/BNkppaVIp4rnOjeXF9s3uQutyc85ZVNrAMMkGO3vx+ut+9Hg4yp4orU2aCVBSlv4c6qaNsY+Ln5/t3rt0/nQvaDcsHsEGtNaAr7sXzi19sT8YfffL5t9r66927yJrc+Zfggx+xRm7duXimYfnz5wMs0LDfiRAoJIKVG9kNFDegNVLZ3v+nLf2/Nc/bxVKPqOEAFe6BF5Y+XT50dKpMOgPMpgWBgQCbEgWoky1mVWGKnCsYOnUfPjVJ8uPftt6c9UYvcXzQrKPP1q43wnbwc4hQnIDRQ1RCkCWPSpDiJqt27EU4DX8YCHw7x8OjnqcMnq9E7RWrZJ4ako1uURFUpeqJEqunGfqTKlK4y4yzzCNfJWCuc45d24fjRQM0ykkWQWZ5cT2ZUimmpv3e3wpUH2e29yY23ySk5XtwwKSnEEmaelUOVS9tepACFRDUi8QDI9jGjiqJiucwXCe6AI8yoA5dOZVOxh41wjAhxNVZJDKGCbZ8TzZeP7lfhiYru9l4HAJ/99q8Dt2NR9PDOz0Bbz5SxzwBj2KWhy6LU+C68gPdq52J8SpS84qtjkRWFISVKaAaTSjI55m+Uaa089cFx0wPErfZzgI8bFvonm4wGxAKCjDE51AMh3h1clhmpkNPknlA3dEv3UdzBEj4NgIrCrCEXwCRXTQAjS/BBGQePRTPJgIIQaSMd4AqR7wPIenUWxeEKJXrfRWE2GcoDJ0pCH6ngTCOrUyhscuoRATGI4omoRpGr8w2jzFysZQc3OnEPpnIUyw0CHQbnvQmPOBoRLCQlSGQNLCYnSgkAXEIw7DMf4Rjt8ep2l2Bz9QXMiywLbywnyTZuRhMiGhhQUdB+aaHjheA4u3iSk+gXnxUIFAEMA/u7/Hhwc7twyQLTK7/TYnCHuWjHQvGcO9KFa9DsYfdhg0mg64noswH6+JA0eDPdj+46e1g72XdzH2TULIf/9HpDroTQzz6/FkeiOK+zebbXHZbx0vOk4fL6wcJPHuehxtPxYifcKYa8rKr/3/FWAAXFMRT5+6R3YAAAAASUVORK5CYII=';

images['ha dejado la liga'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
images['imgIcon'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAACXBIWXMAAAp1AAAKdQFKJd39AAABxklEQVR4nK2SsYoTURSGv7hZ9kw3KYQMVmGrSWcKIZZTptw2pWV8A/MIG1AwYJPSUhvBRzBgESsTmzDVMoEt7kXUOXFmjMVskpkk4JJ4uDAc7nwf957/VlarFafV8/6rKvBtcZJofnNbBZLsJEuyzKpArMtTLEC12Dy5rNwDiYDP8/quJUmzu07TfxjE5N8tsrFkabJuK4oO38du3QEcJ3ZxgCi+2246tt12VbWArC1p8nvdXqjGuA61OuA2EEEVz8wsfmxBjaqWEYAHQPZnlS9AxPHU1ESd2UDDcQ0aLAbDLovQM2NQwNotklNVYLncZCSqTD6NiERkpNctBv1wOgqj2bt+N/TtsPvWWsrIZi7ZdlQiWM9OR9NFsIi9j9EzE3raDntjHQbmavNbEdmfLqr4s8DtTFpc0zD1QAPfBwdeq+WLri370y3GJkJw5T5u9TTCAhDaEKNWLWCk2UA4mHSSlM4ys0STvHOJADcihDo0mk033ygiBywidDo++EAeKgBPKdcBS5qWnqyIs8ZVRAqube0gpYzefPi6D9ynDpzlSMtO+Edafv388R8sxn4/RXF+cVbpvXg5v7lNlkde6vzi7PLRw7/Ut/6BfiSHlwAAAABJRU5ErkJggg==';
images['httpIcon'] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAXCAIAAAAZcvF8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGdSURBVEhL7VaxTsMwED23YmSDP0g7IL7A/YKWpRM/gOSOZWFj7MaSjs2GQAxMXUi+gHwBQoKEfgDQCYkFivHZTuI6VUNElQxwipR79vne2e8ih1zN5m8fC6jDGgSA8zqYgZDJw3OTkKPWTpX8l7P5++dXQ1AuKt+4IBa8yF2X/XNv/OTjcYd0xnGS14I5vYMBIYNgM1UEZ8chPTxwdDYL4mih3mY5ZUoLph6w02FKvQxVQeL7Fg9X5jMASqmcoG7EI1f5wphr+D5GUsb0LPPFWhkrvSRTClRiAyrSPLeMyRKZqwwfXZVN1pvUmeS3uCzIFXf+zFm/C+C094tVl5HQ2lO7d4a3nE9wBEAeuJxdBZPhQr3XlOBNsS2j+1DGYB+rRo3HI5PaglnCQu5un4HXU1lNHzvibkQI6XnUPU97CqlvrkPqniS7tqCkFjcIvpZ6TTfKD162gtkSbBXUX5sF1ejF0+tKvYt1Xhsht5l91hbUS9Vdgncodmx795ecpZZ7jy8ivlDvUjnLBf9Vbq339laz+j9GfebVE4vW+AbF9nlh1aMFvQAAAABJRU5ErkJggg==';

/////////////////////////////////////////////////////////

	
	function noAccents( str ){
	
		return str.replace(/Á/g, "A").replace(/É/g, "E").replace(/Í/g, "I").replace(/Ó/g, "O").replace(/Ú/g, "U")
				.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
	}

/*--------------------------------------------------------------*/
// HTML TABLE SORTER
// OBJECT ORIENTED JAVASCRIPT IMPLEMENTATION OF QUICKSORT
// @author	Terrill Dent 
// @source	http://www.terrill.ca
// @date	August 28th, 2006
/*--------------------------------------------------------------*/
function TSorter(){
	var table = Object;
	var trs = Array;
	var ths = Array;
	var curSortCol = Object;
	var prevSortCol = '-1';
	var sortType = Object;

	function get(){}

	function getCell(index){
		return trs[index].cells[curSortCol] 
	}

	/*----------------------INIT------------------------------------*/
	// Initialize the variable
	// @param tableName - the name of the table to be sorted
	/*--------------------------------------------------------------*/
	/*
	this.init = function(tableName)
	{
		table = document.getElementById(tableName);
		ths = table.getElementsByTagName("th");
		for(var i = 0; i < ths.length ; i++)
		{
			ths[i].onclick = function()
			{
				sort(this);
			}
		}
		return true;
	};
	*/
	this.init = function(t){
	
		table = t;
		trs = table.getElementsByTagName("tr");
		ths = trs[0].getElementsByTagName("td");
		
		//Evitamos ordenar en la pagina alineacion
		if (t.parentNode.parentNode.id=="smallcontentright")
		{
			return;
		}
		for(var i = 0; i < ths.length ; i++){
			ths[i].innerHTML = '<a href="JavaScript:;"> ' + ths[i].textContent + '</a>'; 
			ths[i].addEventListener( "click",  function(event){ sort(this); }, true );
		}
		return true;
	};
	this.end = function(t){
	
		table = t;
		trs = table.getElementsByTagName("tr");
		ths = trs[0].getElementsByTagName("td");
		
		//Evitamos ordenar en la pagina alineacion
		if (t.parentNode.parentNode.id=="smallcontentright")
		{
			return;
		}
		for(var i = 0; i < ths.length ; i++){
			ths[i].innerHTML = ths[i].textContent.replace('<a href="JavaScript:;"> ','').replace('</a>', ''); 
			ths[i].removeEventListener( "click",  function(event){ sort(this); }, true );
		}
		return true;
	};
	/*----------------------SORT------------------------------------*/
	// Sorts a particular column. If it has been sorted then call reverse
	// if not, then use quicksort to get it sorted.
	// Sets the arrow direction in the headers.
	// @param oTH - the table header cell (<th>) object that is clicked
	/*--------------------------------------------------------------*/
	function sort(oTH)
	{
		curSortCol = oTH.cellIndex;
		sortType = oTH.abbr;
		trs = table.getElementsByTagName("tr");
		
		
		var trs2 = new Array();
		for( var i=1; i<trs.length; i++ ){
			
			trs2[i-1] = trs[i];
		}
		trs = trs2;
		
		
		if( ths[curSortCol].textContent.indexOf( "Por" ) != -1 ||
			ths[curSortCol].textContent.indexOf( "Nombre" ) != -1 ){
			
			sortType = "link_column";
		}
		else if( ths[curSortCol].textContent.indexOf( "Equipo" ) != -1 ){
				
			sortType = "img";
		}
		else if( ths[curSortCol].textContent.indexOf( "Precio" ) != -1 || 
				 ths[curSortCol].textContent.indexOf( "Valor" ) != -1 ||
				 ths[curSortCol].textContent.indexOf( "Puntos" ) != -1 ){
				 
			sortType = "number";
		}
		else if( ths[curSortCol].textContent.indexOf( "Desde" ) != -1 || 
				 ths[curSortCol].textContent.indexOf( "cambio" ) != -1 ){
				 
			sortType = "date";
		}
		
		//set the get function
		setGet(sortType);

		// it would be nice to remove this to save time,
		// but we need to close any rows that have been expanded
		/*
		for(var j=0; j<trs.length; j++)
		{
			if(trs[j].className == 'detail_row')
			{
				closeDetails(j+2);
			}
		}
		*/

		// if already sorted just reverse
		if(prevSortCol == curSortCol)
		{
			oTH.className = (oTH.className != 'ascend' ? 'ascend' : 'descend' );
			reverseTable();
		}
		// not sorted - call quicksort
		else
		{
			oTH.className = 'ascend';
			//if(ths[prevSortCol].className != 'exc_cell'){ths[prevSortCol].className = '';}
			quicksort(0, trs.length);
		}
		prevSortCol = curSortCol;
		
		if (typeof activarSeguirJugadores != 'function' && typeof cambiarOnblurInputs == 'function') {
			recalcularSaldo();
			cambiarOnblurInputs();
		}
		if (typeof activarSeguirJugadores == 'function') {
			activarSeguirJugadores();
		}
	}
	
	function noAccent( str ){
	
		return str.replace(/Á/g, "A").replace(/É/g, "E").replace(/Í/g, "I").replace(/Ó/g, "O").replace(/Ú/g, "U")
				.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
	}
	
	/*--------------------------------------------------------------*/
	// Sets the GET function so that it doesnt need to be 
	// decided on each call to get() a value.
	// @param: colNum - the column number to be sorted
	/*--------------------------------------------------------------*/
	function setGet(sortType)
	{
		switch(sortType)
		{   
			case "link_column":
				get = function(index){
					/*return  getCell(index).firstChild.firstChild.nodeValue;*/
					return  noAccent( getCell(index).textContent.toLowerCase() );
				};
				break;
			case "img":
				get = function(index){
					//return  getCell(index).innerHTML;
					return  getCell(index).getElementsByTagName("img")[0].alt;
				};
				break;
			case "number":
				get = function(index){
					return  parseInt( getCell(index).textContent.split(".").join(""), 10 );
				};
				break;
			case "date":
				get = function(index){
					return  parseInt( getCell(index).textContent.split(".").reverse().join(""), 10 );
				};
				break;
			default:
				//get = function(index){	return getCell(index).firstChild.nodeValue;};
				get = function(index){	return  noAccent( getCell(index).textContent.toLowerCase() );};
				break;
		};	
	}

	/*-----------------------EXCHANGE-------------------------------*/
	//  A complicated way of exchanging two rows in a table.
	//  Exchanges rows at index i and j
	/*--------------------------------------------------------------*/
	/*
	function exchange(i, j)
	{
		if(i == j+1) {
			table.tBodies[0].insertBefore(trs[i], trs[j]);
		} else if(j == i+1) {
			table.tBodies[0].insertBefore(trs[j], trs[i]);
		} else {
			var tmpNode = table.tBodies[0].replaceChild(trs[i], trs[j]);
			if(typeof(trs[i]) == "undefined") {
				table.appendChild(tmpNode);
			} else {
				table.tBodies[0].insertBefore(tmpNode, trs[i]);
			}
		}
	}
	*/
	function exchange(i, j){
		var temp = trs[i].innerHTML;
		
		trs[i].innerHTML = trs[j].innerHTML;
		trs[j].innerHTML = temp;
	}
	
	/*----------------------REVERSE TABLE----------------------------*/
	//  Reverses a table ordering
	/*--------------------------------------------------------------*/
	function reverseTable()
	{
	/*
		for(var i = 1; i<trs.length; i++)
		{
			table.tBodies[0].insertBefore(trs[i], trs[0]);
		}
	*/

		for(var i = 0; i<trs.length/2; i++){
			exchange(i,trs.length-1-i);
		}
	
	}

	/*----------------------QUICKSORT-------------------------------*/
	// This quicksort implementation is a modified version of this tutorial: 
	// http://www.the-art-of-web.com/javascript/quicksort/
	// @param: lo - the low index of the array to sort
	// @param: hi - the high index of the array to sort
	/*--------------------------------------------------------------*/
	function quicksort(lo, hi)
	{
		if(hi <= lo+1) return;
		 
		if((hi - lo) == 2) {
			if(get(hi-1) > get(lo)) exchange(hi-1, lo);
			return;
		}
		
		var i = lo + 1;
		var j = hi - 1;
		
		if(get(lo) > get(i)) exchange(i, lo);
		if(get(j) > get(lo)) exchange(lo, j);
		if(get(lo) > get(i)) exchange(i, lo);
		
		var pivot = get(lo);
		
		while(true) {
			j--;
			while(pivot > get(j)) j--;
			i++;
			while(get(i) > pivot) i++;
			if(j <= i) break;
			exchange(i, j);
		}
		exchange(lo, j);
		
		if((j-lo) < (hi-j)) {
			quicksort(lo, j);
			quicksort(j+1, hi);
		} else {
			quicksort(j+1, hi);
			quicksort(lo, j);
		}
	}
}
////////////////////////////////////////////////////////////	
/*
function updateScriptData(reload, textData, time){
	if (window.location.href.indexOf("team_news.phtml") != -1
			|| window.location.href.indexOf("standings.phtml") != -1
			|| window.location.href.indexOf("lineup.phtml") != -1
			|| window.location.href.indexOf("exchangemarket.phtml") != -1
			|| window.location.href.indexOf("placeOffers.phtml") != -1
			|| window.location.href.indexOf("putOnExchangemarket.phtml") != -1) {
		if (!textData) {
			var url = serverScriptBeta + 'scriptbetatime.php';
//			alert(url);
			get(url, function(text) {updateScriptData(reload, text, false)});
		} else {
//			alert(textData);
//			alert(textData.indexOf("</jugadores>"));
//			alert(textData.substring(0, textData.indexOf("</jugadores>")));
			if (textData.indexOf("</jugadores>") != -1) {
				textData = textData.substring(0, textData.indexOf("</jugadores>") + "</jugadores>".length);
			}
			if (!time) {
				var xmlJugadores = textData;
//				alert(xmlJugadores);
				var response = StringtoXML(xmlJugadores);
				var actualizadoCronica = response.getElementsByTagName('actualizado');
				if (actualizadoCronica.length == 1) {
					var scriptVersionAntiguo = localStorage.getItem("scriptVersion");
					if (scriptVersionAntiguo == null) {
						scriptVersionAntiguo = "";
						localStorage.setItem("scriptVersion", "");
					}
					if (scriptVersionAntiguo != version) {
						localStorage.setItem("scriptVersion", version);
						localStorage.setItem("scriptActualizado", "");
						scriptVersionAntiguo = "";
					}
					var scriptActualizadoStringAntiguo = localStorage.getItem("scriptActualizado");
					if (scriptActualizadoStringAntiguo == null) {
						scriptActualizadoStringAntiguo = "";
					}
					if (scriptActualizadoStringAntiguo != null
							&& scriptActualizadoStringAntiguo != actualizadoCronica[0].childNodes[0].nodeValue) {
						reload = true;
						var url = serverScriptBeta + 'scriptbeta.php';
						get(url, function(text) {updateScriptData(false, text, true)});
					}
				}
			} else {
				var xmlJugadores = textData;
				var response = StringtoXML(xmlJugadores);

				var jornadaCronica = response.getElementsByTagName('jornada');
				if (jornadaCronica.length == 1) {
					localStorage.setItem("scriptJornada", "Eurocopa 2012");
				}
				var actualizadoCronica = response.getElementsByTagName('actualizado');
				if (actualizadoCronica.length == 1) {
					var scriptActualizadoStringAntiguo = localStorage.getItem("scriptActualizado");

					if (!reload && scriptActualizadoStringAntiguo != null
							&& scriptActualizadoStringAntiguo != actualizadoCronica[0].childNodes[0].nodeValue) {
						reload = true;
//						alert("Actualizando datos a: "+ actualizadoCronica[0].childNodes[0].nodeValue);
					}
					localStorage.setItem("scriptActualizado", actualizadoCronica[0].childNodes[0].nodeValue);
				}
				
				var players = response.getElementsByTagName('jugador');

				var playerString = "";
				
				for (var i=0; i<players.length; i++){

					idNmk = "0";
					name = "-";
					puntos = "-";
					tipobaja = "-";
					descripcionbaja = "-";
					duracionbaja = "-";
					urlbaja = "-";
					fuentebaja = "-";
					entra = "-";
					sale = "-";
					picas = "-";
					goles = "-";
					tarjetas = "-";
					marcador = "-";
					foto = "-";
					url = "-";
					equipo = "-";
					posicion = "-";
					totales = "-";
					mercado = "-";
					idcpc = "0";

					if (players[i].getElementsByTagName("id") && players[i].getElementsByTagName("id").length > 0) {
						idNmk = players[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("nombre") && players[i].getElementsByTagName("nombre").length > 0) {
						name = players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("puntos") && players[i].getElementsByTagName("puntos").length > 0) {
						puntos = players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("tipobaja") && players[i].getElementsByTagName("tipobaja").length > 0) {
						tipobaja = players[i].getElementsByTagName("tipobaja")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("descripcionbaja") && players[i].getElementsByTagName("descripcionbaja").length > 0) {
						descripcionbaja = players[i].getElementsByTagName("descripcionbaja")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("duracionbaja") && players[i].getElementsByTagName("duracionbaja").length > 0) {
						duracionbaja = players[i].getElementsByTagName("duracionbaja")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("urlbaja") && players[i].getElementsByTagName("urlbaja").length > 0) {
						urlbaja = players[i].getElementsByTagName("urlbaja")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("fuentebaja") && players[i].getElementsByTagName("fuentebaja").length > 0) {
						fuentebaja = players[i].getElementsByTagName("fuentebaja")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("entra") && players[i].getElementsByTagName("entra").length > 0) {
						entra = players[i].getElementsByTagName("entra")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("sale") && players[i].getElementsByTagName("sale").length > 0) {
						sale = players[i].getElementsByTagName("sale")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("picas") && players[i].getElementsByTagName("picas").length > 0) {
						picas = players[i].getElementsByTagName("picas")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("goles") && players[i].getElementsByTagName("goles").length > 0) {
						goles = players[i].getElementsByTagName("goles")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("tarjetas") && players[i].getElementsByTagName("tarjetas").length > 0) {
						tarjetas = players[i].getElementsByTagName("tarjetas")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("marcador") && players[i].getElementsByTagName("marcador").length > 0) {
						marcador = players[i].getElementsByTagName("marcador")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("foto") && players[i].getElementsByTagName("foto").length > 0) {
						foto = players[i].getElementsByTagName("foto")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("url") && players[i].getElementsByTagName("url").length > 0) {
						url = players[i].getElementsByTagName("url")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("equipo") && players[i].getElementsByTagName("equipo").length > 0) {
						equipo = players[i].getElementsByTagName("equipo")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("posicion") && players[i].getElementsByTagName("posicion").length > 0) {
						posicion = players[i].getElementsByTagName("posicion")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("totales") && players[i].getElementsByTagName("totales").length > 0) {
						totales = players[i].getElementsByTagName("totales")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("mercado") && players[i].getElementsByTagName("mercado").length > 0) {
						mercado = players[i].getElementsByTagName("mercado")[0].childNodes[0].nodeValue;
					}
					if (players[i].getElementsByTagName("idcpc") && players[i].getElementsByTagName("idcpc").length > 0) {
						idcpc = players[i].getElementsByTagName("idcpc")[0].childNodes[0].nodeValue;
					}
					
					playerString += trim( name ) + "/-/" + idNmk + "/-/" + puntos + "/-/" + tipobaja + "/-/" + descripcionbaja + "/-/" + duracionbaja + "/-/" + urlbaja + "/-/" + fuentebaja + "/-/" + entra + "/-/" + sale + "/-/" + picas + "/-/" + goles + "/-/" + tarjetas + "/-/" + marcador + "/-/" + foto + "/-/" + url + "/-/" + equipo + "/-/" + posicion + "/-/" + totales + "/-/" + mercado + "/-/" + idcpc + "/-/";
					
				}
				localStorage.setItem("scriptData", playerString);
				if (reload) {
					window.location.reload();
				}
			}
		}
	}
}*/

	function StringtoXML(text){
      if (window.ActiveXObject){
        var doc=new ActiveXObject('Microsoft.XMLDOM');
        doc.async='false';
        doc.loadXML(text);
      } else {
        var parser=new DOMParser();
        var doc=parser.parseFromString(text,'text/xml');
      }
      return doc;
  }


function getNoPlayerList(){
	
		var jugadores =new Array();

		var i = 0;
		for (var nombreJug in playerIDNameEstado) {
			if (nombreJug != null && nombreJug.length > 0) {
				var jugador = new Array(4);
			  	jugador[0] = nombreJug;
				jugador[1] = playerIDNameEstado[nombreJug][0];
				jugador[2] = playerIDNameEstado[nombreJug][1];
				jugador[3] = playerIDNameEstado[nombreJug][2] + " Fuente: " + playerIDNameEstado[nombreJug][4];
//				jugador[4] = playerIDNameEstado[nombreJug][3];
//				jugador[5] = playerIDNameEstado[nombreJug][4];
				jugadores[i] = jugador;
				i = i+1;
			}
		}
		
//		for (var i=0; i<players.length; i++){
//			var jugador = new Array(4);
//		  	jugador[0] = players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
//			jugador[1] = players[i].getElementsByTagName("tipobaja")[0].childNodes[0].nodeValue;
//			jugador[2] = players[i].getElementsByTagName("descripcionbaja")[0].childNodes[0].nodeValue;
//			jugador[3] = players[i].getElementsByTagName("duracion")[0].childNodes[0].nodeValue;
//			jugadores[i] = jugador;
//		}
//	}
//		alert(jugadores);
	return jugadores;
}
//diegocom 20111013
function getPointsPlayerList(){


//var invocation = new XMLHttpRequest();
//	var url = 'http://s339418926.mialojamiento.es/comunio/pointplayers.php';
	
//	if( invocation ){
	
//		invocation.open('GET', url, false);
//		invocation.send(); 
//		var response = invocation.responseXML;
//		var players = response.getElementsByTagName('jugador');
		var jugadores =new Array();

//		alert(playerIDNamePuntos);
//		alert(playerIDNamePuntos.length);
//		alert(playerIDNamePuntos[0]);
//		alert(playerIDNamePuntos["Agirretxe"]);
//		alert(playerIDNamePuntos.elements);
		var i = 0;
		for (var nombreJug in playerIDNamePuntos) {
//			alert(nombreJug);
//			alert(playerIDNamePuntos[nombreJug]);
			if (nombreJug != null && nombreJug.length > 0) {
				var jugador = new Array(4);
			  	jugador[0] = nombreJug;    //players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
				jugador[1] = playerIDNamePuntos[nombreJug];    //players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
				jugadores[i] = jugador;
				i = i+1;
			}
		}
//		for (var i=0; i<playerIDNamePuntos.length; i++){
//			var jugador = new Array(4);
//		  	jugador[0] = playerIDNamePuntos[0];    //players[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
//			jugador[1] = playerIDNamePuntos[0];    //players[i].getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
//			jugadores[i] = jugador;
//		}
		
		
//	}
//		alert(jugadores.length);
	return jugadores;
}

function getConv(text){
		
			link3.textContent = link3.textContent.replace( "*", "" );
			
			var td = document.getElementById("convCol");
			var ini = 0;
			var end = 0;
			ini = text.indexOf('<table>', ini);
			end = text.indexOf('</table>', ini);
			td.innerHTML =  text.substring(ini, end);
			//erpichi20111105
			var divs = td.getElementsByTagName("div");
			for(var i = 0; i < divs.length; i++) {
				var div = divs[i];
				if (div.className == "forum_overflow") {
					div.style.display = "inline";
				}
			}
		}

function getJornada(text){
		
			link4.textContent = link4.textContent.replace( "*", "" );
			
			var td = document.getElementById("jornadaCol");
			
			td.innerHTML =  text.substring( text.indexOf('<form name="lineupTip"'), text.indexOf('</form>',text.indexOf('<form name="lineupTip"') + 7) ).replace('Submisión hasta:', 'Fecha Partido').replace('Apuesta', 'Resultado');
			
		}

//erpichi20111105
function getJornadaActual(text){
	var padre = document.getElementById('contentleft');
	var formacion = padre.childNodes[0];

	var div = document.createElement('div');
	var jornada =  text.substring( text.indexOf('<form name="lineupTip"'), text.indexOf('</form>',text.indexOf('<form name="lineupTip"') + 7) ).replace('Submisión hasta:', 'Fecha Partido').replace('Apuesta', 'Resultado');
	div.innerHTML =  jornada;
	var table = div.getElementsByTagName("table")[0];
	var trs = table.getElementsByTagName("tr");
	removeElement(trs[0]);
	//erpichi 20111129 - Mostrar partidos de la jornada cuando tiene menos de 10
	var numPartidos = 0;
	for(var i = 0; i < trs.length; i++) {
		if (trs[i].className == null
				|| trs[i].className == "") {
			numPartidos = i;
			break;
		}
	}
	for(var i = trs.length-1; i >= numPartidos; i--) {
		removeElement(trs[i]);
	}
	var numJornada = trs[0].childNodes[0].textContent;
	for(var i = 0; i < trs.length; i++) {
		removeElement(trs[i].childNodes[0]);
		removeElement(trs[i].childNodes[1]);
		removeElement(trs[i].childNodes[2]);
		removeElement(trs[i].childNodes[3]);
		removeElement(trs[i].childNodes[3]);
		
		var newlink = document.createElement('a');
		newlink.href = "javascript:;";
		newlink.innerHTML = trs[i].childNodes[0].innerHTML;
		newlink.id="foro" + newlink.innerHTML;
		newlink.title = "Ver post oficial " + newlink.innerHTML + " en el foro";
		trs[i].childNodes[0].innerHTML = outerHTML(newlink);
		
		var newlink2 = document.createElement('a');
		newlink2.href = "javascript:;";
		newlink2.innerHTML = trs[i].childNodes[2].innerHTML;
		newlink2.id="foro" + newlink2.innerHTML;
		newlink2.title = "Ver post oficial " + newlink2.innerHTML + " en el foro";
		trs[i].childNodes[2].innerHTML = outerHTML(newlink2);
		
		var newlink3 = document.createElement('a');
		var partido = newlink.innerHTML + "-" + newlink2.innerHTML;
		newlink3.href = "javascript:;";
		newlink3.innerHTML = trs[i].childNodes[3].innerHTML;
		newlink3.id="analisis" + partido;
		newlink3.title = "Ver análisis del partido " + partido + " en el foro";
		trs[i].childNodes[3].innerHTML = outerHTML(newlink3);
	}

	var divTitle = document.createElement('div');
	divTitle.className = "titleboxcontent";
	var titulo = "Partidos " + numJornada + ". jornada";
	var jornadaHidden = "<input type='hidden' id='jornadaHidden' value='" + numJornada + ". jornada'/>";
	divTitle.innerHTML = jornadaHidden + "<div class=\"edgetitle\"><b class=\"top\"><b class=\"e1\"></b><b class=\"e2\"></b><b class=\"e3\"></b><b class=\"e4\"></b><b class=\"e5\"></b><b class=\"e6\"></b><b class=\"e7\"></b><b class=\"e8\"></b><b class=\"e9\"></b><b class=\"e10\"></b><b class=\"e11\"></b></b></div><div class=\"titlecontent\"><h2>&nbsp; <a href=\"javascript:show('preview');\">" + titulo + "</a>&nbsp;</h2></div>";
	padre.insertBefore(divTitle,formacion);
	
	var divPreview = document.createElement('div');
	divPreview.id = "preview";
	divPreview.appendChild(table);
	padre.insertBefore(divPreview,formacion);
	
	var preview = document.getElementById("preview");
	var trsPreview = preview.getElementsByTagName("a");
	for(var i = 0; i < trsPreview.length; i++) {
		var newlink = trsPreview[i];
		if (newlink.id.indexOf("foro") != -1) {
			eval('newlink.addEventListener( "click", function(){get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=28", function(text2) {getURLPostEquipo(text2, "'+newlink.innerHTML+'")}  ); }, true )');
		} else if (newlink.id.indexOf("analisis") != -1) {
			var partido = newlink.id.replace("analisis", "");
			eval('newlink.addEventListener( "click", function(){get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=8", function(text2) {getURLPostPartido(text2, "'+partido+'")}  ); }, true )');
		}
	}
	
	var divSpacer = document.createElement('div');
	divSpacer.className = "spacer10px";
	padre.insertBefore(divSpacer,formacion);
}

//erpichi20111105
function removeElement(node) {
    node.parentNode.removeChild(node);
}

	
function getNoPlayers(text){
	link2.textContent = link2.textContent.replace( "*", "" );
	var td = document.getElementById("injuriedCol");
//			var ini = 0;
//			var end = 0;
//			ini = text.indexOf('<table>', ini);
//			end = text.indexOf('</table>', ini);
//			td.innerHTML =  text.substring(ini, end);
	
	//erpichi20111112
	var tablaResultados =  document.createElement("table");
	var foro = document.createElement("div");
	foro.innerHTML = text;
	var foroDivs = foro.getElementsByTagName("div");
	for(var i = 0; i < foroDivs.length; i++) {
		var divForo = foroDivs[i];
		if (divForo.className == "forum_overflow") {
			divForo.style.display = "inline";
			var trResultados =  document.createElement("tr");
			var tdResultados =  document.createElement("td");
			tdResultados.innerHTML =  divForo.parentNode.innerHTML;
			trResultados.appendChild(tdResultados);
			tablaResultados.appendChild(trResultados);
		}
	}
	td.appendChild(tablaResultados);
	
	//erpichi20111105
//			var divs = td.getElementsByTagName("div");
//			for(var i = 0; i < divs.length; i++) {
//				var div = divs[i];
//				if (div.className == "forum_overflow") {
//					div.style.display = "inline";
//				}
//			}
	
}

	
function getPuntosComunio(text){
	link6.textContent = link6.textContent.replace( "*", "" );
	var td = document.getElementById("puntosComunioCol");
//			var ini = 0;
//			var end = 0;
//			ini = text.indexOf('<table>', ini);
//			end = text.indexOf('</table>', ini);
//			td.innerHTML =  text.substring(ini, end);
	
	//erpichi20111112
	var tablaResultados =  document.createElement("table");
	var foro = document.createElement("div");
	foro.innerHTML = text;
	
	var foroDivs = foro.getElementsByTagName("div");
	for(var i = 0; i < foroDivs.length; i++) {
		var divForo = foroDivs[i];
		if (divForo.id == "title"){
//			var trTitulo =  document.createElement("tr");
//			var tdTitulo =  document.createElement("td");
//			tdTitulo.innerHTML =  divForo.innerHTML;
//			trTitulo.appendChild(tdTitulo);
//			tablaResultados.appendChild(trTitulo);
			document.getElementById("link6").innerHTML += " - " + divForo.innerHTML;;
		}
		if (divForo.className == "forum_overflow") {
			divForo.style.display = "inline";
			var trResultados =  document.createElement("tr");
			var tdResultados =  document.createElement("td");
			tdResultados.innerHTML =  divForo.parentNode.innerHTML;
			trResultados.appendChild(tdResultados);
			tablaResultados.appendChild(trResultados);
		}
	}
	td.appendChild(tablaResultados);
	
	//erpichi20111105
//			var divs = td.getElementsByTagName("div");
//			for(var i = 0; i < divs.length; i++) {
//				var div = divs[i];
//				if (div.className == "forum_overflow") {
//					div.style.display = "inline";
//				}
//			}
	
}
		
function getURLNoPlayers(text){

			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
		
			while( ini != -1 && count < 100 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("lista") != -1 && text.substring( iniTitle, endTitle ).toLowerCase().indexOf("lesionados") != -1 ){
					
					get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getNoPlayers );
					break;
				}
				count++;
			}
			
			if( ini == -1 ){
				get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLConv );
			}

		}
		
function getURLPostEquipo(text, equipo){
			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
			var encontrado = false;
		
			while( ini != -1 && count < 200 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("post oficial") != -1 && noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(equipo.toLowerCase())) != -1 ){
					window.open(window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ));
					encontrado = true;
					break;
				}
				count++;
			}
			
			if( ini == -1 || !encontrado){
				alert("No se ha encontrado el post del equipo: " + equipo + ", se le redirigirá al listado completo.");
				window.open(window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=28');
			}

		}
		
function getURLPostPartido(text, partido){
			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
			var encontrado = false;
		
			while( ini != -1 && count < 200 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				var partidoSplit = partido.split("-");
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("jornada") != -1
						&& noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(partidoSplit[0].toLowerCase())) != -1 
						&& noAccents(text.substring( iniTitle, endTitle ).toLowerCase()).indexOf(noAccents(partidoSplit[1].toLowerCase())) != -1 ){
					window.open(window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ));
					encontrado = true;
					break;
				}
				count++;
			}
			
			if( ini == -1 || !encontrado){
				alert("No se ha encontrado el análisis del partido: " + partido + ", se le redirigirá al listado completo.");
				window.open(window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=8');
			}

		}
		
function getURLPuntosComunio(text){

			var ini = 0;
			var end = 0;
			var iniTitle = 0;
			var endTitle = 0;
			var count = 0;
		
			while( ini != -1 && count < 100 ){
			
				ini = text.indexOf( 'href="viewtopic', end ) + ( ('href="').length );
				end = text.indexOf( '"', ini );
				
				iniTitle = text.indexOf( '>', end ) + 1;
				endTitle = text.indexOf( '</a>', iniTitle );
				if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("puntos") != -1 && text.substring( iniTitle, endTitle ).toLowerCase().indexOf("jornada") != -1 ){
					
					get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getPuntosComunio );
					break;
				}
				count++;
			}
			
			if( ini == -1 ){
				get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=33', getURLPuntosComunio );
			}

		}

//erpichi 20111129 - Buscar los convocados en la pagina que esten
function getURLConv(text, numCount){
	
	if (numCount == null) {
		numCount = 0;
	}

	var ini = 0;
	var end = 0;
	var iniTitle = 0;
	var endTitle = 0;
	var count = 0;
	//erpichi 20111129 - Buscar los convocados en la pagina que esten
	var encontrado = false;

	while( ini != -1 && count < 100 ){
		//erpichi20111128 - Obtener bien las noticias
		ini = text.indexOf( '<tr', end );
		ini = text.indexOf( 'href="viewtopic', ini ) + ( ('href="').length );
		if (text.indexOf( '&', ini ) < text.indexOf( '"', ini )) {
			ini = text.indexOf( 'href="viewtopic', ini ) + ( ('href="').length );
		}
		end = text.indexOf( '"', ini );
		
		iniTitle = text.indexOf( '>', end ) + 1;
		endTitle = text.indexOf( '</a>', iniTitle );
					
		//erpichi20111127 - Evitar que salga otro post antes que ponga convocatoria
		if( text.substring( iniTitle, endTitle ).toLowerCase().indexOf("convocatorias liga bbva") != -1 ){
			//erpichi 20111129 - Buscar los convocados en la pagina que esten
			encontrado = true;
			get( window.location.href.replace("lineup.phtml", "" ) + "external/phpBB2/" + text.substring( ini, end ), getConv );
			break;
		}
		count++;
	}
	//erpichi 20111129 - Buscar los convocados en la pagina que esten
	if (!encontrado) {
		get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27&topicdays=0&start=' + numCount + 50, function(text2) {getURLConv(text2, numCount + 50)} );
	}
}

function getURLJornada(text){
			get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornada );
		}
//erpichi20111105
function getURLJornadaActual(text){
	get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornadaActual );
}
function getURLJornadaAnterior(text){
	get( window.location.href.replace("lineup.phtml", "" ) + "calendarTip.phtml", getJornadaAnterior );
}

//erpichi 20111104
function imprimirAlineacion(){
	var porteros = getAlineacionByPuesto("keeper");
	var defensas = getAlineacionByPuesto("defender");
	var centrocampistas = getAlineacionByPuesto("midfielder");
	var delanteros = getAlineacionByPuesto("striker");
	var alineacion = "";
	var separacionJugador = "; ";
	var separacionPuesto = " - ";
	for(var i = 0; i < porteros.length; i++) {
		alineacion = alineacion + porteros[i];
		if ((i + 1) < porteros.length) {
			alineacion = alineacion + separacionJugador;
		} else {
			alineacion = alineacion + separacionPuesto;
		}
	}
	for(var i = 0; i < defensas.length; i++) {
		alineacion += defensas[i];
		if ((i + 1) < defensas.length) {
			alineacion += separacionJugador;
		} else {
			alineacion += separacionPuesto;
		}
	}
	for(var i = 0; i < centrocampistas.length; i++) {
		alineacion += centrocampistas[i];
		if ((i + 1) < centrocampistas.length) {
			alineacion += separacionJugador;
		} else {
			alineacion += separacionPuesto;
		}
	}
	for(var i = 0; i < delanteros.length; i++) {
		alineacion += delanteros[i];
		if ((i + 1) < delanteros.length) {
			alineacion += separacionJugador;
		}
	}

	return "<b>Alineación:</b> " + alineacion;
}

//erpichi 20111104
function getAlineacionIdealByPuestoAndFormacion(puesto, formacion){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].value != "" && jugadores[j].parentNode.className.indexOf(puesto) != -1) {
	            jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
	            if (jugadorNombre.indexOf("<") != -1) {
	            	jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf("<"));
	            }
	            var jugadorNombreSolo = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
	            var jugadorNombrePuntos = jugadorNombre.substring(jugadorNombre.indexOf(":") + 1);
	            jugadorNombrePuntos = jugadorNombrePuntos.replace("(","");
	            jugadorNombrePuntos = jugadorNombrePuntos.replace(")","");
	            var sinCalificar = false;
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("(","");
		            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace(")","");
		            var sinCalificar2 = false;
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
	           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	}
    while(alineacion.length > formacion) {
    	alineacion.pop();
    }
   // alert(alineacion);
	return alineacion;
}

//erpichi 20111104
function getAlineacionByPuesto(puesto){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].selected && jugadores[j].parentNode.className.indexOf(puesto) != -1) {
              jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
              jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
              alineacion.push(jugadorNombre);
			}
		}
	}
	return alineacion;
}

//diegocom 20111013
function getAlineacion(){
	var alineacion = new Array();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
		var jugadores = trs[i].getElementsByTagName("option");
		for( var j=0; j<jugadores.length; j++ ){
			if (jugadores[j].selected == true)
			{
                //erpichi 20111101
                jugadorNombre = jugadores[j].innerHTML.replace('*','').replace('*','');
                jugadorNombre = jugadorNombre.substring(0,jugadorNombre.indexOf(":"));
				alineacion.push(jugadorNombre);
			}
		}
	}
	return alineacion;
}
    //diegocom 20111013

//erpichi20111106
function replaceAll( text, busca, reemplaza ){
	  while (text.toString().indexOf(busca) != -1)
	      text = text.toString().replace(busca,reemplaza);
	  return text;
	}

//erpichi 20111106		
function calculaPuntosAlineacionClick(enlace){
	var alineacion = enlace.parentNode.parentNode.childNodes[0].textContent;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación:","");
	var alineacionSplit = alineacion.split(";");
	enlace.parentNode.innerHTML = calculaPuntosAlineacion(alineacionSplit, listaJugadores);

}

//erpichi 20111107		
function calculaEstadoAlineacionGeneral(){
	var alineacionObj = document.getElementById("alineacionLine");
	var alineacion = alineacionObj.value;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación:","");
	alineacion = trim(alineacion);
	var alineacionSplit = alineacion.split(";");
	var divResultado = document.getElementById("alineacionLineEstado");
	divResultado.className = "contenttext";
	divResultado.innerHTML = calculaEstadoAlineacion(alineacionSplit, listaJugadoresLesionados).replace("<br/><br/>", "") + "<br/><br/>";

}

//erpichi 20111107		
function calculaPuntosAlineacionGeneral(){
	var alineacionObj = document.getElementById("alineacionLine");
	var alineacion = alineacionObj.value;

	alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
	alineacion = trim(alineacion);
	var alineacionSplit = alineacion.split(";");
	var divResultado = document.getElementById("alineacionLinePuntos");
	divResultado.className = "contenttext";
	divResultado.innerHTML = calculaPuntosAlineacion(alineacionSplit, listaJugadores).replace("<br/><br/>", "") + "<br/><br/>";

}

//erpichi 20111107		
function calculaEstadoAlineacion(alineacion, listaJugadoresLesionados){
	var jugador2 = "";
	var mensajeEstado = '<br/><br/><b>Estado:</b> ';
	var sumaTotalNOK = 0;
//	alert(listaJugadoresLesionados);
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
        var estadoJugador = calculaEstadoJugador(jugadorNombre,listaJugadoresLesionados);
//        alert(jugadorNombre + "-" + estadoJugador);
        if (estadoJugador != "") {
//        	jugadores[j].title = estadoJugador.title;
        	estadoJugador.style.height = "";
        	estadoJugador = outerHTML(estadoJugador);
        	sumaTotalNOK++;
        } else {
        	var image = document.createElement('img');
        	image.title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
        	image.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
        	estadoJugador = outerHTML(image);
        }
        mensajeEstado = mensajeEstado + jugadorNombre + estadoJugador + " - ";
	}
	return mensajeEstado + " <strong>Total bajas: "+sumaTotalNOK+"</strong>";
}

//erpichi 20111106		
function calculaPuntosAlineacion(alineacion, listaJugadores){
	var jugador2 = "";
	var mensajePuntos = '<br/><br/><b>Puntos:</b> ';
	var sumaTotal = 0;
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos = mensajePuntos + jugadorNombre + ": " +listaJugadores[j][1] + "; ";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal = sumaTotal + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0)
		{
		mensajePuntos = mensajePuntos + jugadorNombre + ": s.c.; ";
				
		}
		
	}	
	//Restamos los no convocados
	var numNoConvocados = 11 - alineacion.length;
	if (numNoConvocados > 0 && numNoConvocados > 0 < 11) {
		mensajePuntos = mensajePuntos + "No Convocados(" + numNoConvocados + "): " + (numNoConvocados * -4) + "; ";

		sumaTotal = sumaTotal + (numNoConvocados * -4);
		
	}
		
	return mensajePuntos + " <strong>Total: "+sumaTotal+"</strong>";
}

//diegocom 20111013		
function calculaPuntos(){
	var listaJugadores = getPointsPlayerList();
	var alineacion = getAlineacion();
	var jugador2 = "";
	var mensajePuntos = "";
	var sumaTotal = 0;
	for(var i = 0; i <alineacion.length; i++) {
		jugadorNombre = alineacion[i];
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos = mensajePuntos + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal = sumaTotal + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0)
		{
		mensajePuntos = mensajePuntos + jugadorNombre + ": s.c. <br/>";
				
		}
		
	}	
	document.getElementById("totalPointsCell").innerHTML = mensajePuntos + "<br/><strong>Total: "+sumaTotal+"</strong>";
}

function getAlineacionByFormacion(portero, defensa, centrocampista,delantero) {
	var porteros = getAlineacionIdealByPuestoAndFormacion("keeper",portero);
	var defensas = getAlineacionIdealByPuestoAndFormacion("defender",defensa);
	var centrocampistas = getAlineacionIdealByPuestoAndFormacion("midfielder",centrocampista);
	var delanteros = getAlineacionIdealByPuestoAndFormacion("striker",delantero);
	var alineacion = new Array();
	for (var i = 0; i < porteros.length; i++) {
		alineacion.push(porteros[i]);
	}
	for (var i = 0; i < defensas.length; i++) {
		alineacion.push(defensas[i]);
	}
	for (var i = 0; i < centrocampistas.length; i++) {
		alineacion.push(centrocampistas[i]);
	}
	for (var i = 0; i < delanteros.length; i++) {
		alineacion.push(delanteros[i]);
	}
	return alineacion;
}

//erpichi 20111105		
function calculaPuntosIdeal(){
	var listaJugadores = getPointsPlayerList();
	var jugador2 = "";
	var mensajePuntos = "";
	var sumaTotal = 0;
	//Alineacion 4-4-2
	var alineacion1442 = getAlineacionByFormacion(1,4,4,2);
	var mensajePuntos1442 = "";
	var sumaTotal1442 = 0;
	for(var i = 0; i <alineacion1442.length; i++) {
		jugadorNombre = alineacion1442[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1442 = sumaTotal1442 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": s.c. <br/>";
		}
	}
	mensajePuntos1442 = "<b>Formación:</b> 4-4-2<br/>" + mensajePuntos1442 + "<br/><strong>Total: "+sumaTotal1442+"</strong>";
	if (sumaTotal1442 > sumaTotal) {
		sumaTotal = sumaTotal1442;
		mensajePuntos = mensajePuntos1442;
	}
	//Alineacion 3-4-3
	var alineacion1343 = getAlineacionByFormacion(1,3,4,3);
	var mensajePuntos1343 = "";
	var sumaTotal1343 = 0;
	for(var i = 0; i <alineacion1343.length; i++) {
		jugadorNombre = alineacion1343[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1343 = mensajePuntos1343 + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1343 = sumaTotal1343 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1343 = mensajePuntos1343 + jugadorNombre + ": s.c. <br/>";
		}
	}
	mensajePuntos1343 = "<b>Formación:</b> 3-4-3<br/>" + mensajePuntos1343 + "<br/><strong>Total: "+sumaTotal1343+"</strong>";
	if (sumaTotal1343 > sumaTotal) {
		sumaTotal = sumaTotal1343;
		mensajePuntos = mensajePuntos1343;
	}
	//Alineacion 3-5-2
	var alineacion1352 = getAlineacionByFormacion(1,3,5,2);
	var mensajePuntos1352 = "";
	var sumaTotal1352 = 0;
	for(var i = 0; i <alineacion1352.length; i++) {
		jugadorNombre = alineacion1352[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1352 = mensajePuntos1352 + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1352 = sumaTotal1352 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1352 = mensajePuntos1352 + jugadorNombre + ": s.c. <br/>";
		}
	}
	mensajePuntos1352 = "<b>Formación:</b> 3-5-2<br/>" + mensajePuntos1352 + "<br/><strong>Total: "+sumaTotal1352+"</strong>";
	if (sumaTotal1352 > sumaTotal) {
		sumaTotal = sumaTotal1352;
		mensajePuntos = mensajePuntos1352;
	}
	//Alineacion 4-3-3
	var alineacion1433 = getAlineacionByFormacion(1,4,3,3);
	var mensajePuntos1433 = "";
	var sumaTotal1433 = 0;
	for(var i = 0; i <alineacion1433.length; i++) {
		jugadorNombre = alineacion1433[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1433 = mensajePuntos1433 + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1433 = sumaTotal1433 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1433 = mensajePuntos1433 + jugadorNombre + ": s.c. <br/>";
		}
	}
	mensajePuntos1433 = "<b>Formación:</b> 4-3-3<br/>" + mensajePuntos1433 + "<br/><strong>Total: "+sumaTotal1433+"</strong>";
	if (sumaTotal1433 > sumaTotal) {
		sumaTotal = sumaTotal1433;
		mensajePuntos = mensajePuntos1433;
	}
	//Alineacion 4-5-1
	var alineacion1451 = getAlineacionByFormacion(1,4,5,1);
	var mensajePuntos1451 = "";
	var sumaTotal1451 = 0;
	for(var i = 0; i <alineacion1451.length; i++) {
		jugadorNombre = alineacion1451[i];
		if (jugadorNombre.indexOf(":")) {
			jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
		}
		tienePuntos = 0;
		for (var j = 0; j < listaJugadores.length; j++) {
			//TODO: convertir HTML to char
			jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
			if ( jugador2 == trim(jugadorNombre)) {
				mensajePuntos1451 = mensajePuntos1451 + jugadorNombre + ": " +listaJugadores[j][1] + "<br/>";
				tienePuntos = 1;
				if (listaJugadores[j][1] == parseInt(listaJugadores[j][1])){	
					sumaTotal1451 = sumaTotal1451 + parseInt(listaJugadores[j][1]);
				}
				break;
			}
		}
		if (tienePuntos == 0) {
			mensajePuntos1451 = mensajePuntos1451 + jugadorNombre + ": s.c. <br/>";
		}
	}
	mensajePuntos1451 = "<b>Formación:</b> 4-5-1<br/>" + mensajePuntos1451 + "<br/><strong>Total: "+sumaTotal1451+"</strong>";
	if (sumaTotal1451 > sumaTotal) {
		sumaTotal = sumaTotal1451;
		mensajePuntos = mensajePuntos1451;
	}

	document.getElementById("totalPointsCellIdeal").innerHTML = mensajePuntos;
}


//////////////////////////////////////////////////////////////////

//Commands for team URL	
try{
	GM_registerMenuCommand( "oficial", function(){ GM_setValue( "URLSrc", "oficial" );} ) ; 
	GM_registerMenuCommand( "AS", function(){ GM_setValue( "URLSrc", "AS" );} ); 
}
catch( ex ){
	function GM_getValue(){
		return "oficial";
	}
}

	
/////////////////////////////////////////////////////////////////

//Change size of principal table
var tables = document.getElementsByTagName("table");
for( var i=0; i<tables.length; i++ ){
	if( parseInt( tables[i].style.width.replace("px", ""), 10 ) > 600 ){	//If it has an attribute "width" with more than 600px, it has to be the principal
		tables[i].style.width = "65%";
		break;
	}
}
//////////////////////////////





//////////////////////////////

var thisTable, tables=[], tables1, tables2, tableRows, thisRow;
var playerName, teamName, idTeam, idPlayer;
//erpichi 20111120 - fotos de los jugadores
//var playerNameCol=0;
//var teamNameCol=1;
//var teamTotalesCol=2;
//var pujaCol=8;
//var cellOwnersToConvert = [];
//var ownerCol=6;
var playerNameCol=1;
var teamNameCol=2;
var teamTotalesCol=3;
var pujaCol=9;
var cellOwnersToConvert = [];
var ownerCol=7;

var valorMercadoCol=3;
var precioVentaCol=3;
var fechaVentaCol=5;
var estadoVentaCol=6;
var updated = false;

if( plusPlayer == false ){
//erpichi20111105
function actualizaTextoInformacion() {
	var padre = document.getElementById('contentfullsize');
	padre.innerHTML = padre.innerHTML.replace("You have not saved your lineup yet!", "Tu no has salvado tu alineación aun!");
	var span = padre.getElementsByTagName("span");
	span[0].innerHTML = "Solamente los jugadores alineados recibirán puntos. Una alineación sólo se activa en el siguiente día de alineación y no te olvides de confirmar tú alineación. "
		+ "Solamente las alineaciones publicadas recibirán premios por jugadores en el once ideal. No te olvides de publicar tú alineación. "
		+ "En las versiones SCRIPT, <a href='proDemo.phtml'>Pro Player</a> y <a href='plusDemo.phtml'>Plus Player</a> los números al lado del nombre de los jugadores representan sus puntos en la última jornada. "
		+ "Si un número está entre paréntesis significa que no alineaste este jugador. "
		+ "En la versión SCRIPT si un jugador puede ser baja para el próximo partido "
		+ "se marcará el campo de un color <span style='background-color:lightcoral'>rojizo</span> y aparecerá junto al nombre el icono de la causa de la baja (solo en exploradores compatibles). "
		+ "El valor 's.c' significa que el jugador no calificó en la última jornada. "
		+ "En la lista de tú plantilla, los jugadores que no alineaste en la última jornada aparecerán alineados a la derecha.<br>";
}

//erpichi20111105
function getProximaJornada() {
	get( window.location.href.replace( "lineup.phtml", "" ) + 'calendarTip.phtml', getURLJornadaActual );
}
	
//erpichi20111104
function reactualizaAlineacion(select) {
	alert(select);
}
    //erpichi20111101
function actualizaAlineacion() {
	var listaJugadores = getPointsPlayerList();
	var listaJugadoresLesionados = getNoPlayerList();
	var div = document.getElementById("lineup_bg");
	var table = div.getElementsByTagName("table");
	var trs = table[0].getElementsByTagName("tr");
	for( var i=trs.length-1; i>=0; i-- ){
	  //erpichi20111120 - Actualizar alineacion en onchange
		actualizaAlineacionByTr(trs[i], listaJugadores, listaJugadoresLesionados);
//		var jugadores = trs[i].getElementsByTagName("option");
//		for( var j=0; j<jugadores.length; j++ ){
//        	var select = jugadores[j].parentNode;
//            if(jugadores[j].value != '') {
//                if (startsWith(jugadores[j].innerHTML,'*') && endsWith(jugadores[j].innerHTML,'*')) {
//                    jugadores[j].innerHTML = replaceAll(jugadores[j].innerHTML,'*','');
//                    var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
//                    var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
//                    if (estadoJugador != "") {
//                    	if (jugadores[j].selected) {
//                    		select.style.backgroundColor = "lightCoral";
//                        	select.title = estadoJugador.title;
//                    	}
//                    	jugadores[j].style.backgroundColor = "lightCoral";
//                    	jugadores[j].title = estadoJugador.title;
//                    	estadoJugador = outerHTML(estadoJugador);
//                    }
//                    jugadores[j].innerHTML = jugadores[j].innerHTML + ": " + puntosJugador + estadoJugador;
//                } else {
//                    var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
//                    var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
//                    if (estadoJugador != "") {
//                    	if (jugadores[j].selected) {
//                    		select.style.backgroundColor = "lightCoral";
//                        	select.title = estadoJugador.title;
//                    	}
//                    	jugadores[j].style.backgroundColor = "lightCoral";
//                    	jugadores[j].title = estadoJugador.title;
//                    	estadoJugador = outerHTML(estadoJugador);
//                    }
//                    jugadores[j].innerHTML = jugadores[j].innerHTML + ": (" + puntosJugador + ")" + estadoJugador;
//                }
//            }
//		}
		accionSelects(trs[i], listaJugadores, listaJugadoresLesionados);
	}
}

    //erpichi20111120 - Actualizar alineacion en onchange
function actualizaAlineacionByTr(trActual, listaJugadores, listaJugadoresLesionados) {
	var jugadores = trActual.getElementsByTagName("option");
	for( var j=0; j<jugadores.length; j++ ){
    	var select = jugadores[j].parentNode;
    	var capa = select.parentNode.parentNode;
    	var capaJug = null;
    	var capaJugHijo = null;
		if (capa.tagName == "DIV") {
			capaJug = select.parentNode.nextSibling;
			capaJugHijo = capaJug.childNodes[0];
		}

        if(jugadores[j].value != '') {
            if (jugadores[j].innerHTML.indexOf(":") != -1) {
            	var nombreJugadorOrig = jugadores[j].innerHTML.substring(0, jugadores[j].innerHTML.indexOf(":"));
            	var puntosJugador = jugadores[j].innerHTML.substring(jugadores[j].innerHTML.indexOf(":") + 1);
            	puntosJugador = trim(puntosJugador);
            	if (startsWith(puntosJugador,'(')) {
            		jugadores[j].innerHTML = nombreJugadorOrig;
            	} else {
            		jugadores[j].innerHTML = "*" + nombreJugadorOrig + "*";
            	}
            }
            if (startsWith(jugadores[j].innerHTML,'*') && endsWith(jugadores[j].innerHTML,'*')) {
                jugadores[j].innerHTML = replaceAll(jugadores[j].innerHTML,'*','');
                jugadores[j].innerHTML = trim(jugadores[j].innerHTML);
                var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
                var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
                if (estadoJugador != "") {
                	if (jugadores[j].selected) {
                		select.style.backgroundColor = "lightCoral";
                    	select.title = estadoJugador.title;
                	}
                	jugadores[j].style.backgroundColor = "lightCoral";
                	jugadores[j].title = estadoJugador.title;
                	if (capaJug != null) {
                    	jugadores[j].title = estadoJugador.src;
                	} else {
                    	jugadores[j].title = estadoJugador.title;
                	}
                	estadoJugador = outerHTML(estadoJugador);
                } else {
                	jugadores[j].style.backgroundColor = "#CAE0C5";

                	if (capaJug != null) {
                		var jugSrc = playerIDNameFoto[jugadores[j].innerHTML];
                		var srcIndex = jugSrc.indexOf('src="') + 'src="'.length;
                		jugSrc = jugSrc.substring(srcIndex, jugSrc.indexOf('"', srcIndex));

                    	jugadores[j].title = jugSrc;
                	}
                }
                jugadores[j].innerHTML = jugadores[j].innerHTML + ": " + puntosJugador + estadoJugador;
            } else {
                jugadores[j].innerHTML = trim(jugadores[j].innerHTML);
                var puntosJugador = calculaPuntosJugador(jugadores[j].innerHTML,listaJugadores);
                var estadoJugador = calculaEstadoJugador(jugadores[j].innerHTML,listaJugadoresLesionados);
                if (estadoJugador != "") {
                	if (jugadores[j].selected) {
                		select.style.backgroundColor = "lightCoral";
                    	select.title = estadoJugador.title;
                	}
                	jugadores[j].style.backgroundColor = "lightCoral";
                	if (capaJug != null) {
                    	jugadores[j].title = estadoJugador.src;
                	} else {
                    	jugadores[j].title = estadoJugador.title;
                	}
                	estadoJugador = outerHTML(estadoJugador);
                } else {
                	jugadores[j].style.backgroundColor = "#CAE0C5";

                	if (capaJug != null) {
                		var jugSrc = playerIDNameFoto[jugadores[j].innerHTML];
                		var srcIndex = jugSrc.indexOf('src="') + 'src="'.length;
                		jugSrc = jugSrc.substring(srcIndex, jugSrc.indexOf('"', srcIndex));

                    	jugadores[j].title = jugSrc;
                	}
                }
                jugadores[j].innerHTML = jugadores[j].innerHTML + ": (" + puntosJugador + ")" + estadoJugador;
            }
        }
	}
}
    //erpichi20111103
function accionSelects(parent, listaJugadores, listaJugadoresLesionados) {
	var selects = parent.getElementsByTagName("select");
	for( var j=0; j<selects.length; j++ ){
    	var select = selects[j];
    	select.addEventListener("change", function() {this.style.backgroundColor = "";this.title = "";actualizaAlineacionByTr(parent, listaJugadores, listaJugadoresLesionados);}, false);
    	//jQuery('#lineup_bg select').change(function(event){alert('pepe');})
	}
}

    //erpichi20111101
//erpichi20111120 - que compare mas de un solo caracter
function startsWith(cadena, str){
    if (cadena.length > 0
    		&& cadena.length >= str.length
    		&& cadena.substring(0, str.length) == str) {
    		//&& cadena[0] == str) {
        return true;
     } else {
         return false;
      }
   }
    //erpichi20111101
//erpichi20111120 - que compare mas de un solo caracter
function endsWith(cadena, str){
    if (cadena.length > 0
    		&& cadena.length >= str.length
    		&& cadena.substring(cadena.length - str.length) == str) {
    		//&& cadena[cadena.length - 1] == str) {
        return true;
     } else {
         return false;
      }
   }
    //erpichi20111101
function outerHTML(element){
	var div = document.createElement('div');
	div.appendChild(element);
	return div.innerHTML;
}
		
    //erpichi20111101
function calculaPuntosJugador(jugadorNombre,listaJugadores){
	var jugador2 = "";
	for (var j = 0; j < listaJugadores.length; j++) {
		//TODO: convertir HTML to char
		jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
		if ( jugador2 == trim(jugadorNombre)) {
            return listaJugadores[j][1];
		}
	}
    return "s.c";
}

function calculaConvocadoEuro(jugadorNombre) {
	var response = "";
	var invocation = new XMLHttpRequest();
	var url = 'http://openpstore.org/convocados.txt';
	if( invocation ){
		invocation.open('GET', url, false);
		invocation.send(); 
		response += invocation.responseText;
	}
	return response.indexOf(" "+jugadorNombre);
}

//erpichi20111103
function calculaEstadoScript(jugadorNombre) {
	var image = document.createElement('img');
	var urlBaja = "http://www.eurocopa.calculapuntoscomunio.com/estados/";
    if ( playerIDNameEstado[jugadorNombre]) {
		switch(playerIDNameEstado[jugadorNombre][0]) {   
		case "molestias":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es duda: ' + playerIDNameEstado[jugadorNombre][1] + " - " + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "lesion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
			image.title=jugadorNombre + ' esta lesionado: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "acum_tarjetas":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por acumulación de tarjetas: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "seleccion":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' es baja: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "doble_tarjeta":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
			image.title=jugadorNombre + ' es baja por doble amarilla: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "roja_directa":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
			image.title=jugadorNombre + ' es baja por roja directa: ' + playerIDNameEstado[jugadorNombre][1] + " - "  + playerIDNameEstado[jugadorNombre][2] + " - Fuente: "  + playerIDNameEstado[jugadorNombre][4];
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "vendido":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' ha sido vendido, ¿no?';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			case "no_convocado":
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' no ha sido convocado en la última jornada';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
			default:
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
			image.title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
			urlBaja = playerIDNameEstado[jugadorNombre][3];
			break;
		};	
	    image.title += " - Click aquí para visitar la fuente de la noticia.";
	} else {
		var convocado = calculaConvocadoEuro(jugadorNombre);
		if (convocado > 0) {
			image.title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
			image.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
			image.title += " - Click aquí para ver los lesionados/sancionados en CpC.";
		} else {
			image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
			image.title=jugadorNombre + ' no ha sido convocado en la eurocopa';
		}
	}
    
	return "<a href='javascript:;' onclick=\"window.open('" + urlBaja + "')\" >" + outerHTML(image) + "</a>";
}

//erpichi20111103
function calculaEstadoJugador(jugadorNombre,listaJugadores) {
	var jugador2 = "";
	var image = document.createElement('img');
	image.style.height = "1.1em";
	for (var j = 0; j < listaJugadores.length; j++) {
		//TODO: convertir HTML to char
		jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
//		alert(jugador2 + "-" + jugadorNombre);
	    if ( jugador2 == trim(jugadorNombre)) {
						var convocado = calculaConvocadoEuro(jugadorNombre);
						if (convocado < 0) listaJugadores[j][1] = "eurono_convocado";
			switch(listaJugadores[j][1]) {   
			case "molestias":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' es duda: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "lesion":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
				image.title=jugadorNombre + ' esta lesionado: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "acum_tarjetas":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
				image.title=jugadorNombre + ' es baja por amarillas' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "seleccion":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' es baja: ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "doble_tarjeta":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
				image.title=jugadorNombre + ' es baja por doble amarilla ' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "roja_directa":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
				image.title=jugadorNombre + ' es baja por roja directa' + listaJugadores[j][2] + listaJugadores[j][3];
				break;
				case "vendido":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' ha sido vendido, ¿no?';
				break;
				case "no_convocado":
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
				image.title=jugadorNombre + ' no ha sido convocado en la última jornada';
				break;
				case "eurono_convocado":
				images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
				images[i].title=jugadorNombre + ' no ha sido convocado en la eurocopa';
				break;
				default:
				image.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
				image.title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
				break;
			};	
			return image;
		}
	}
	return "";
}	
 
     // estado de jugadores - by diegocom - 20110812 - ini
     function actualizaEstado()
     {
		var images = document.getElementsByTagName("img");
		var listaJugadores = getNoPlayerList();
		var jugador2 = "";
		
		
		for(var i = 0; i <images.length; i++) {
		if(images[i].id.indexOf('estado') != -1) {
				var idImg = images[i].id;
				var jugadorNombre = idImg.replace('estado','').replace( /\_/g, ' ');
				var jugador = normalize(idImg.replace('estado','').replace( /\_/g, ' '));
				var baja = 0;
				for (var j = 0; j < listaJugadores.length; j++) {
					//TODO: convertir HTML to char
					jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				    if ( jugador2 == jugadorNombre) {
						var convocado = calculaConvocadoEuro(jugadorNombre);
						if (convocado < 0) listaJugadores[j][1] = "eurono_convocado";
						switch(listaJugadores[j][1])
						{   
							case "molestias":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' es duda: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "lesion":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAkQQAAJEEBw7VCmgAAAAd0SU1FB9sDBQEgIoV1w98AAAO5SURBVEjHtVVLaBtXFD1vJI0kj0gUVIdCNTV4FcjCCVmZZBNnVXXT2tUi2GSZBhLIrt0ru0DslpjgdFPIx4KYeNE60qa4MYUa2kUDsQnBoNA4CbZnbDS23vykmdOFLduyLeKm9MKFN/PuO/fdz7tHoL0oAPoA9MeF6P1U17u1jg5NSin/fvOm4pOzACYBTAMI8S8kl0om564MDXGmXKa3vk42GgzrdbLRoGtZfFou8+uhIWrx+ByA3GFAVQBj+VyO7169om9ZtA2DtmnSNU1uGAZd06Q0DNqGQc+y+LZS4Ve5HAGMAYi1BY4IMTVSKLAhJeXyMgPXDRkEXHv5MpwfH+fc+Djni8WwWqmQQRAGrsva0hIbUnK4UKAixM/tHIyNFAqsS0l3dZUMAjIIQgYB71+4wF91nU91nb9ks5wYGGjuk0FAxzTD+paDrQhac5zP5diQks4O8Lb+2NvLFV3niq5zKZvlvbNn99k4phk2pGymKNfsCCWVTN78bnQUXq2GRDp9YNvsXosDwk4cOybcjQ18PzoKLR6/CUBRAPQNDgyc7MxkkDh6FAC492ALmBCbeoAk02l8lMlgKJ8/CaBPAdB/cXAQDd+HEouhzcUOJUosxsD3cXFwEAD6hSrEX+vV6qnA9+FbFqYuX0boOAgdJ6TnKQKAIiU+405AJUUBOjpagCOZDL589AgiFkNEVXEknX4W7cpmu+OaBq9ex+rCAo4vLOD0/lS3Vj8MgVqt5d8zKbH8/Dk+OXMGcU1DVzbbrWiappFEnQSDIIh8aEpIMAw3cUhomqZFpW1LIcSRmBAQkUjEI9FoFm5XQXc7DfZWnYQDIKqqjAkhhBCQti2jrxcXK75tnwoBfNzTg/nz5/FbtdpyK+vFC3zhedvfPyUSSJ840WLT0dnJ4z09IgTg2zZeLy5WAODOTLlM2zD2PYym3tv1iFZ0nffPnWtraxsGZ8plArijAJgsFouIqirCep34cGFYrzOqqig+fAgAkwqA6QcTE/Pm6io8yxL/AVy4liXMtTU8ePx4HsC0AiCsOc63169dg5pKwduTb+xhAm72+74IvWoV8VQK169eRc1xvgEQNnv5yUSp9MPt4WEoicQ+B4lMhn8A+BPA70Ig1dW17QsA3GoVkUQCt2/dwkSpdBdA6aB5/mTkxg02pKS9a57bKyt8Ozu7rc3JGbgu5fIyG1JypFBgRIipLcJpy0R387kc31Uq72Uif4uJ8jtMpB6mOJ+nksm5K5cuvZdDU8lkWw4V/yf7/wPffMCgKaJC2QAAAABJRU5ErkJggg==';	
							images[i].title=jugadorNombre + ' esta lesionado: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "acum_tarjetas":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMENAJPeQAAAF2SURBVEjHrZQ7TsNAFEWPnR8QISFhiTSRoGEDERVFStaQDokGhVWwACrYAF1ENkBDAwpldgENIZCECH9nKDIE/2M7jDSy9eb5zrmeN08D+BpgbNTo2DYGBYamMX4c0j+54FWbDTC2thtD3ThrUj0ABEgXpKOe6h03GscFYYPzwvztaXR1OzvWN2t09N3TJtV9kDYIczGlBdJU0wrF1ZowF9+UdqgbR0a7RbfsuBilalMtql3DdLHxELlep1qhUQZUYkpy2GbShsBCcF26Zd6voDTXp5OOn9BSCzHJkXgKeTxhTpv+eJBwRXKWDaOEBeiIOxRhJtDl/K9/hFZxm/7cKGHOQ5CZ6rAInbfsPAmWs9J5gAy0suDVC9CssBkSigpmrjWR2myjlhPLx8vUvTNcPZFoL91ypPK9XEIxlv1CgqIj1GCLC/kFP5A2/zHGUyb645C7+TejdcU+Z0yue/Q1gMtzDtsturUKe0XE3qdMb3r07595+AF802t8X1+GBwAAAABJRU5ErkJggg==';
							images[i].title=jugadorNombre + ' es baja por amarillas' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "seleccion":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' es baja: ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "doble_tarjeta":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBESEupGYxcAAAIQSURBVDjLpZS/ixNBFIC/2d1EI3ooSCJYKAfaRDlE8EdjczYKdpYWCjaWNnKN2Grh3yBoI9gcdgdX2FgdnGilNoeQ8zwLFeUmuZ0fz2I2m02yu0YdeGwyM3zv2zezT8k6DeK5u7TOdCFS4EA84AAPMnxmc+6X3f7y6eWRy7JMzVDy9sA9OkuPiA+DpFmYwu8s/GjN63f+2Ys3l24+4HUVOKK10CU+CF4XYqcQemotanaio21O1xknCCoAKmzXP8PaT2g2wVsQCz7l7Nr8dem2TuA9eRjDoNf7sGTtkwRMZpJOv/7mD3iq4MoNMAbSNIQxHLqQLpKmi/lcFnu3tri9uno8CQZD4wnb99tw7hr0+0wCiknG/rda7Gm3L2bgMmMDfhA2i1SDypJ4rxLEgNupuAm7wbYKVjXvHMFYJo2HSXZBa4jj2W3TFKwlGFcdngzGwbPY5mBsVoqS6zYshVL1oHLjslJMGCv1D8b54VUYax0+pVnrW394wwQ2lKJ43epsjQHnQGTS2IyeSDDVehpclsTasG/UK7IPJAf68W6idegDVbbWhvXpJmQFbNZ3S0a/H16vzLQEmIONdRuNpKb/aR2sirbO8aeRPF/h8flTHItjFgBVXNzfY66j9XwOzg7mv4fAVWk0RJQSCciZ4iO8iurAA9jEmL+2/A5fVd2Gk8Ay3N8HtwQas0C/wcZDuPMbz+muhLC8QtYAAAAASUVORK5CYII=';
							images[i].title=jugadorNombre + ' es baja por doble amarilla ' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "roja_directa":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAaCAYAAAC3g3x9AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBEMLP9mQWMAAAFDSURBVEjHrZQ9TsNAEEafcWRQUqSxhIXkIim4BAUNUq4AtTuUSyBqOm6RC0BBQ3qukCo0QAI4SMnau6awAo7xz3rNSivPaFffvm9GHgtgBe4BXAhwMVgWLB5hMoJnKwS363lPe0HgMxiAUhDHEEXptyqOYxAC5nO+ptPXmzA8sa8hsMfjc4bD9LIQ6a6K87nj4PT7XWYz1YnAtX0f1ut6ojxdNu/1cMDrAL+vll3WPQNSwbZ027hQ0JQuijKCm017usaWdR7cIWxLV0hoKlTZlKY2S5vSlq7WsknXW1nO5lL+TJ5iy7p0UkKS7IwyM8tx/EeoWFBHSKnKYatnOVenesGqX0+pUnvNLBcUXF8wO22krK2TPmELoazgEiH4j7WAD+7haAUvSVox472E9xGcWQBXcHwKl/twaEL2Bp+3MLmDh28pE7Ug90P0zQAAAABJRU5ErkJggg==';
							images[i].title=jugadorNombre + ' es baja por roja directa' + listaJugadores[j][2] + listaJugadores[j][3];
							break;
							case "vendido":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAdCAYAAABBsffGAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCxQHBigdAwYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA50lEQVRIx9XWsQ3CMBBA0R/rdqDIHinYgD1SsAdLUCDWYAf2SMEOkUzBgSAE5852CtJFkd6XbF9k+McnQhsi9GvAwD4AXc3AEwbaAEitwDsMDAE41QhMYeAowFW/9xqgeQSL4AYGaWCMBYFfMLoc5AZS8AvPCSzBH7gnYIG/cEvACs/iqQBwscLqJDdMgE4DI3Czwov4TAArDBAMR3kD7BLvefjM5rl+FeIZEF1z86CJd0A8gybeyfNMsuRMnjUgXtgTkBzYGpBc2BKQEngpIKVwKkCEgy5NrauFRNhGOFMTngbWvM7JHTvnr26ab9ZuAAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' ha sido vendido, ¿no?';
							break;
							case "no_convocado":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' no ha sido convocado en la última jornada';
							break;
							case "eurono_convocado":
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAEAAAABAABGSOaawAAAAd0SU1FB9sIHQkNMyOBphsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAE7ElEQVQ4y2WTW2xc5RHHf/Odc9Z7za7jyya7JiZuTGwaClVtioREq7wg7EIKrYQgaQKq2uahF1Thl1Rp01Zq1TYRaqEvVSNxCaqACIgiKqUPLUlTFEOimFwlQmw3bnDihPXm7O3s7jnf9GEtXpjHmdHvP6P/jFQcB2AQGEP1g4y1Vx78+te6i+sG7lm3fv2Tk9987EuOMcPGmLQRFhzXfd+Ldb2E1ek7NmxYBqg4TjcQU9Wb4huzFjgjIr0Cpee+OPLXpQceeHhk5M7Ru8fuJZvL4biGaq2KX1oGETLZVRTXFi42U6k/rr77nllnfv4FEekH9olvzL0iMg0oqtRSSZk78Crx4Y3qOR6O60giHuNnU89y9J//AkGN6zAwOCiv7NoV9n5ne9ssLycQQSE0ApfF2nlURUUkVaky8oOduI1AnFhMPMejXgso+3VyfQViyZTUajUxM6dxJyZdp1RKqIiiiqhecja/dSj4tBls7J2dHXOiCDUGp+KTfH8aO/5VYsUBbpXLnL1wiWzPGvrSWXYuzLOrVqNXhMgYxFpB9aY6zmNm5r8f985MTjw6/bs/4FoLqqjjEDvzIasfeQhn4Qq5nl5GR0dw4wm+/9E5tpZLZFUJRTr9qRRXX345efns2UUjVr5BRP7I0pL+Zt1ttFUxqqgI0miQvm+M7MxpfvStLfzq3Ak2X7qINQYAiSK0v58bhw9rY3ws2fL9p92KX3m6tFzhb/v/IvVGnY+TCZ4LmqSsRY1BbIT3xLcJczkKCwu0OmcG1tLato36Mz/BrsmLV/XZ/8pLO91qvT4+c+okQdDAGMM7IpzPpDnlxQhu3uxAazWkVsOuwCSKCHbsoL5vHzaoo2GLmOdx4cL5AXNj6Xp8fm5OO7KKAWZtxNwbB2kNDnbSIiCCqILr4u/ZQ3nvXtoVn1arSdhuEbbbFAtFcTVq05VIYFAsBlBAaZbKSBTxuVCllUoR1Gs4YRtVC2oJ2yHNZhNjo+hKoVAQMS6oYkVYJ8Lo9q14V69+BmHFKMKQvqkp4ocO0RYhikJarTZhGHL92qKaMAj+3deXJ9vdrclsjvvTaf5eCwjq9Y7T1hJmMgSDt+OqggjWGPLPTuEdP07QbNEMmlQrVb4wtH7JuWvTneWK7+8obhzlcceTPbOzZNtt7AosSqX5z+5fcOyuTXjHjlJUJVqppd49Snl8jGZmlVarFVlbKDwvj26ZWO03micmb3w6/MPTMzSN6Uy2sv6bu3/JZdfl+b2/Ja2W96oNetR+JmgzaU6+8TrlWq0twpB58+13Sj89f/G97314hsBxUBEcawnicV7fup1P0mnCoE6iK0ZNhG3JONeNQVQ7b+pXGP7xM7YSBC80E8lFqRjzlMB+BaMieFHEXH8/rz00QbU4QDKeoN1q8dqBFymXl7EifFnhyC2f5srHgDb8QmFiYOF/7xqF76qIQUSNKudWZfTXmzdzLZNRjSINbUhXIkZPby/pVIbcqiwf5br1zyMjdFmLqCJImP1k8RaAVBxnSuH30pH6xxP5vuOXs7mn+vP5oZFNm8jluknEE6TTSdRajDF4nkfMmMXJ3T8/liuVehA5nImiPwGI7zgx4D4BI6rTaWsbdwxv6Onp6xu/fWjo8TX5/JjnxYqe53UZY66J4WQ81nUAMSfuP3Wq/JWDB720ah3Adxz+D4mOTnz6a+8vAAAAAElFTkSuQmCC';
							images[i].title=jugadorNombre + ' no ha sido convocado en la eurocopa';
							break;
							default:
							images[i].src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBQETFL6kM3YAAASQSURBVDjLjZVbiFZlFIaf9e3znt8mcyzHuphGIxNLEzHHoAMVJV5kSRRkWpCOdVlhSRcVXiZddNPMSAcwKAqhQMiCTiaJ2kllPE+WYzjHmvmP+//33t/q4p80UqEF7833rfWud70XawmXibGNOKIsV1gBLFK4BgURRoCDRtiV53w3cxv5perlvw/j6xExrMphC2443+1YIl7HYsz02SAOdnKE9LcfyQa+hzQ5boRXMuWja/rQyxKPdRMDPWq8NeHShyW6Yw3O9GvB+FNwQRwQg50cpvpVL8me91Rs+jHwdFsvpYuIx7qJgE81KNx3xUMv4HcuAvH/ReqD8cA4IHK+sjGwn+L7zyNJcTewsq2X8nnisceBAj1qnO7WB5/Fmz0P8MD4aK4kJ/aRjQwifoQ/dyl+5+IL5KJkZ39hYvtmJEu3J8K663pQAyAF7rTK+sKChXhRC/x5DiaGsEOnKH7Wi5lzPy1r3yN66HWyckJ55xsweQ6Kw1Acxr2ynWld92CVNaHyAIADsGkJ29zIm1vonAfWQJYBSvnnL4mfeBe/cxmN/i9AlXDZGvKJEezgftyoAEkJ6mVcH9KzR8QmacemhbxjxjYwW5W7w9hCI4G8BpKiNkFb2nHb51PZuQV7aDu1T54jPb2fYPlaGoP9zdxGCcqjUKkQtboAXcZjjhGhS8H1Yw8kBclBMjSrYMeOU+xZTXpwB9HNt2GCAGyOGBc0B03AJmBrUBnFt1UQDHC7q9BpXMG0tIDWwLFgLCaIufKelag4aH491YPfYOauwJvTRbJ7G96s2UC9Ca1DMoy4DsZJsRmdRpVQxEAUgzSacOwUcsQX8uIotuVG4hWbSQf20tj3FuEN85oT0oC8BPUxCGMwBiA0RhizVtEggjACWwQnBxdwFVwlGegnfuAl8uGTVHc8w7S77gVHwWRNxeUBCHwIIlQBoWiAw5pbcjulOvRBKuBk4Av4gmYpUphB49BO4ltvQSIX3ByoQH2wKSKMsK6PzRQDp4xVDgiM1sfLEETNccIQvBzcOvg5ausU+x4lOfABeW0SnASYAJ0E323W+SFpNUNUM4W9ZmYfdRHerg0OY9U0k6J4ChGELhJEtG7cQbxic9MmXyHwmtYFEQQh+AG1c38hwreH2xk0U6tiK2l6rvTTEfCDf5G3QFwAEdJf95IPHWv+x/HFpGdHSSfKucBrd78KBqCtl3EDT6Vn/miU9vwAnn/BlrhAsHwp2ek3EfcnvLk3NN+DqNnEC0gGh6gcOoERts7o5Tto2g6ATfnceKyr9x99Ny9VwsLqVbgdMyCICBYvvrBbbQ61KmQZqlD5/gC1Xw5j0LewvHzJfXz6SbgioMvC22qcm6Y9+hjhnXdcdB20VCTZvZvq19+gpVLRCC/mSt/Vfdh/cs4rHtoAntAOdABlMQZn1iywFlurkQ8Nk/1+hvTkCRrHjkK1moiw3TFsuaqHwcuepvFu5isctNpsJnELprUVrZSx5Qpic0UoAz8a2AV8OKOX3y93M88rVuW4MTwCLBBoo1ZxtVapAiMO/CbCUQun2nqp8z/ib4NB+u9/9e+3AAAAAElFTkSuQmCC';
							images[i].title='Es posible que ' + jugadorNombre + ' no pueda jugar el próximo partido. Razon indefinida.';
							break;
						};	
						break;
					}
					else {
						images[i].title='Parece que ' + jugadorNombre + ' no aparece en la zona de lesiones y sanciones.';
						images[i].src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAASCAYAAABfJS4tAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDBBELKcBNIysAAAO8SURBVDjLtdRbaBxlGMbxZ2Z2Z2YPkz0le0gyTROT3cQQmxRTUlNIqbW0tCJRqFKEFkWF2oMFjYgGFC+EWsUq6LVIxRLohUgkmqBNrLapzTnmUEy72aS7SXOY3Z3dnZ2d+T4vRKHQFmnwvX75XT38gf/puA0LJeDxEg6jBZsRw59Ig2wY5tvhrzgod3YceP3tymDl/hvuOaJl88NIoPDAMLcdJZGn5feP7zz5yvN1RxzNZc32tJB6bNwYNUwrGb8Dll6A4NgHQRtA4X6o/1W+pu5J+fTRHacO7Sx7QsgZWRBK0Ojfwi+w0Zab6lzB8s+z+AwkT639RYubyOSw9nHySyzeDfUeRaRxd83n7fWHdtW7GrCixUEpAMrg2tIgJhMjdiRpg4WxAdLLEIoD3o7Ht7Udd4p2W5+1u3ytMvVG/Iw5b6p/g9YAmIo3+a1VtfKH7TUH22RbBVbycVACUEoxdPsKLkx2ITa1nNPjmOKkIwh5axzv7W3dc6rZ32IP2kOcz++qV8XEVkTU37OTWOFD4Krewo7GLQ9/vfuhA00ui5fJmEnkTBWqoeDX2z+ie7YLtyaSqewoztBhnOU8e9Fhr+aOhV0RwcaLyNMMJKsEt8spZ1yJBlbWRkra0FT3aOUn20t3hQVWhEZU5GkOWTONa8pFjMX7ER/XUuo4zpq/4SMkkWQ2ncA37lY8W+A5lEmlqHaH4RE9EK0Cssw6ppXhVZco8eGiJomlFhBKoBMdKV3BvDqLlaUEooPG/HI/7dQu4Tw1kAcAS2YRVx0L2OeNmEWrZgyZ9BJchgS3KMEpOFHidvvsnBMKWUCe5JAhKazr69ANDUzKiuURxJJD9J1cP86DQv93jkTDhJHDkt3LbAv4BQcVCQpcBnkuCY1VwLEEVpYBy5oAa4IwBVhZBvyqk85cUsZu9enHctfxnancOVHOVKBnZzDKuqAIDrapPOgqgo2CswAlgh9BoRxBvhzFfBBuqw8+axBaHGTkl+hIrC93cv0n/GwqMO/VCsIwmMitkuuCh2mu9Ic8DoeN8fIBhEQZpeJmBPgy+LgQFheWzd7eK303e9TXtBgGC2ug941QfhlmegbTBi1Mc5LxSCQY9gddMuO1FkMWq1DGh3F55nL+2x96vp/6KnVi/Som74XeNUIki2g2rY8ZDrW+OlRVKhdVM8WWTRiMDhjnLnSdu9Gb7kz9gTlSeMDIBFpRu+cLZ/enU8/lPxh6Ktnyru0zAI4N91hLYK1g6kPx7Kxvcni2Jzqgn1ajUP4r/BdTV5n5/MpgngAAAABJRU5ErkJggg==';
					}
				}
			}
		}
	 }	

	function actualizaPuntos()
     {
		var divspuntos = document.getElementsByTagName("div");
		var listaJugadores = getPointsPlayerList();
		var jugador2 = "";
		for(var i = 0; i <divspuntos.length; i++) {
		if(divspuntos[i].id.indexOf('puntos') != -1) {
				var idDiv = divspuntos[i].id;
				var jugadorNombre = idDiv.replace('puntos','').replace( /\_/g, ' ');
				var jugador = normalize(idDiv.replace('puntos','').replace( /\_/g, ' '));
				for (var j = 0; j < listaJugadores.length; j++) {
					//TODO: convertir HTML to char
					jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
					if ( jugador2 == jugadorNombre) {
						divspuntos[i].innerHTML=listaJugadores[j][1];
						
					}
				}
			}
		}	
	}
}

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç", 
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};
 
  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );
 
  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }      
      return ret.join( '' );
  }
 
})();

// estado de jugadores - by anthorlop - 20110301 - fin

	//Collect all kinds of tables in one
	tables1 = document.getElementsByClassName("tablecontent03");
	tables2 = document.getElementsByClassName("tablecontent03b");
	
	for( var i=0; i<tables1.length; i++ ){
		tables.push(tables1[i]);
	}
	for( var i=0; i<tables2.length; i++ ){
		tables.push(tables2[i]);
	}	

	//erpichi 20120304 - stats
	if (window.location.href.indexOf( "lineup" ) != -1){
			var objCabecera = document.getElementById("smallcontentright");
			objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2><div id='buscastatsCom' style='display: none;'></div><div id='buscastatsCpC' style='display: none;'></div><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a>";
			var linkStatsCom = document.getElementById("linkStatsCom");
			linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
			var linkStatsCpC = document.getElementById("linkStatsCpC");
			linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
	}
	
	function getStatsCom(tables) {
		
		if (document.getElementById("buscastatsCom") != null) {
			get("http://stats.comunio2012.com/my_team.php", function(text2) {getURLStats(text2, tables)});
		}
		
		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_stats") != -1) {
					tableRows[j].style.display = "";
				} else if (tableRows[j].id.indexOf("no_stats") != -1) {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCpC = "";
		if (document.getElementById("buscastatsCpC") != null) {
			buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
		}
		

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCpC + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ocultar Comunio Stats' alt='Ocultar Comunio Stats' src='" + images['comstatsno'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLNoStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getNoStats(tables, ""); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getNoStatsCom(tables, ""); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
	
	}
	
	function getStatsCpC(tables) {
		var mostrarCpC = true;
		if (document.getElementById("buscastatsCpC") != null) {
			var fechaActualDate = new Date();
			var fechaActual = fechaActualDate.getDate() + "/" + (fechaActualDate.getMonth() +1) + "/" + fechaActualDate.getFullYear();
			var cpcVisitDate = localStorage.getItem("visitDateCpC");
			if (cpcVisitDate == null) {
				cpcVisitDate = "";
			}
			if (cpcVisitDate != fechaActual) {
				if(confirm("Debes conectarte a la página de CpC para disfrutar de las estupendas crónicas que nos ofrece. ¿Quieres abrir CpC en una nueva ventana?")) {
					localStorage.setItem("visitDateCpC", fechaActual);
					window.open("http://www.eurocopa.calculapuntoscomunio.com/");
				} else {
					mostrarCpC = false;
				}
			}
		}
		
		if (mostrarCpC) {
			for( var i=0; i<tables.length; i++ ){
				thisTable = tables[i];
				tableRows = thisTable.getElementsByTagName('td');
				for ( var j = 0; j < tableRows.length; j++ ){
					if (tableRows[j].id.indexOf("si_cronic") != -1) {
						tableRows[j].style.display = "";
					} else if (tableRows[j].id.indexOf("no_cronic") != -1) {
						tableRows[j].style.display = "none";
					}
				}
			}
			
			var buscastatsCom = "";
			if (document.getElementById("buscastatsCom") != null) {
				buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
			}
			

			var objCabecera = document.getElementById("smallcontentright");
			objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ocultar Crónicas de CpC' alt='Ocultar Crónicas de CpC' src='" + images['cpcno'] + "'></a>";
//			var linkStats = document.getElementById("linkStats");
	//
////			linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLNoStats(text2, tables)}); }, true );
//			linkStats.addEventListener( "click", function(){getNoStats(tables, ""); }, true );
			
			var linkStatsCom = document.getElementById("linkStatsCom");
			linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
			var linkStatsCpC = document.getElementById("linkStatsCpC");
			linkStatsCpC.addEventListener( "click", function(){getNoStatsCpC(tables, ""); }, true );
		}
	
	}
	
	function getNoStatsCom(tables, buscastats) {

		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_normal") != -1) {
					tableRows[j].style.display = "";
				} else {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCpC = "";
		if (document.getElementById("buscastatsCpC") != null) {
			buscastatsCpC = "<div id='buscastatsCpC' style='display: none;'></div>";
		}

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastats + buscastatsCpC + "<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getStats(tables); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
	
	}
	
	function getNoStatsCpC(tables, buscastats) {

		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				if (tableRows[j].id.indexOf("si_normal") != -1) {
					tableRows[j].style.display = "";
				} else {
					tableRows[j].style.display = "none";
				}
			}
		}
		
		var buscastatsCom = "";
		if (document.getElementById("buscastatsCom") != null) {
			buscastatsCom = "<div id='buscastatsCom' style='display: none;'></div>";
		}

		var objCabecera = document.getElementById("smallcontentright");
		objCabecera.childNodes[1].childNodes[3].innerHTML = "<h2>Tu plantilla con puntos:</h2>" + buscastatsCom + buscastats +"<a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCom' href='javascript:;' ><img title='Ver Comunio Stats' alt='Ver Comunio Stats' src='" + images['comstats'] + "'></a><a style='float: right;font-size: 0.5em;padding-right: 1em;' id='linkStatsCpC' href='javascript:;' ><img title='Ver Crónicas de CpC' alt='Ver Crónicas de CpC' src='" + images['cpc'] + "'></a>";
//		var linkStats = document.getElementById("linkStats");
//
////		linkStats.addEventListener( "click", function(){get("http://stats.comunio.es/my_team.php", function(text2) {getURLStats(text2, tables)}); }, true );
//		linkStats.addEventListener( "click", function(){getStats(tables); }, true );
		
		var linkStatsCom = document.getElementById("linkStatsCom");
		linkStatsCom.addEventListener( "click", function(){getStatsCom(tables); }, true );
		var linkStatsCpC = document.getElementById("linkStatsCpC");
		linkStatsCpC.addEventListener( "click", function(){getStatsCpC(tables); }, true );
	
	}
	
	function getURLStats(text, tables) {
		if (text.indexOf(">" + userId + "<") == -1) {
			getNoStatsCom(tables, "<div id='buscastatsCom' style='display: none;'></div>");
			if(confirm("Debes logarte en la página de Comunio Stats para disfrutar de las estupendas estadísticas que nos ofrece Comunio. ¿Quieres abrir Comunio Stats en una nueva ventana para logarte?")) {
				window.open("http://stats.comunio2012.com/my_team.php");
			}
			return;
		}
		for( var i=0; i<tables.length; i++ ){
			thisTable = tables[i];
			tableRows = thisTable.getElementsByTagName('td');
			for ( var j = 0; j < tableRows.length; j++ ){
				var jugadorNombre = "";
				if (tableRows[j].id.indexOf("si_statsTrends") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsTrends')).replace('si_statsTrends','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						while (text.charAt(trendIndex) != "<") {
							trendIndex = trendIndex - 1;
						};
						var imgTrend = text.substring(trendIndex, text.indexOf(">", trendIndex) + 1);
						var imgTrendStyle = 'background-image: url("http://comstats.net/images/trends2.png");height: 25px;width: 25px;';
						if(imgTrend.indexOf("trend_5") != -1) {
							imgTrendStyle += "background-position: 0 -275px;";
						} else if(imgTrend.indexOf("trend_4") != -1) {
							imgTrendStyle += "background-position: 0 -250px;";
						} else if(imgTrend.indexOf("trend_3") != -1) {
							imgTrendStyle += "background-position: 0 -225px;";
						} else if(imgTrend.indexOf("trend_2") != -1) {
							imgTrendStyle += "background-position: 0 -200px;";
						} else if(imgTrend.indexOf("trend_1") != -1) {
							imgTrendStyle += "background-position: 0 -175px;";
						} else if(imgTrend.indexOf("trend_0") != -1) {
							imgTrendStyle += "background-position: 0 -150px;";
						} else if(imgTrend.indexOf("trend_-1") != -1) {
							imgTrendStyle += "background-position: 0 -125px;";
						} else if(imgTrend.indexOf("trend_-2") != -1) {
							imgTrendStyle += "background-position: 0 -100px;";
						} else if(imgTrend.indexOf("trend_-3") != -1) {
							imgTrendStyle += "background-position: 0 -75px;";
						} else if(imgTrend.indexOf("trend_-4") != -1) {
							imgTrendStyle += "background-position: 0 -50px;";
						} else if(imgTrend.indexOf("trend_-5") != -1) {
							imgTrendStyle += "background-position: 0 -25px;";
						}
						imgTrend = imgTrend.replace("<img", "<img style='" + imgTrendStyle +"' ");
						tableRows[j].innerHTML = imgTrend;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				} else if (tableRows[j].id.indexOf("si_statsLast") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsLast')).replace('si_statsLast','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						var lastIndex = text.indexOf("schmal", trendIndex);
						while (text.charAt(lastIndex) != "<") {
							lastIndex = lastIndex - 1;
						};
						var imgLast = text.substring(lastIndex, text.indexOf("</td>", lastIndex) + 5);
						imgLast = imgLast.substring(imgLast.indexOf(">") + 1).replace("</td>", "");
						tableRows[j].innerHTML = imgLast;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				} else if (tableRows[j].id.indexOf("si_statsMedia") != -1) {
					jugadorNombre = tableRows[j].id.substring(tableRows[j].id.indexOf('si_statsMedia')).replace('si_statsMedia','').replace( /\_/g, ' ');
					jugadorNombre = replaceAll(jugadorNombre, "&quot;", '"');

					var jugIndex = text.indexOf(jugadorNombre);
					if (jugIndex != -1) {
						var trendIndex = text.indexOf("trend", jugIndex);
						var lastIndex = text.indexOf("schmal", trendIndex);
						while (text.charAt(lastIndex) != "<") {
							lastIndex = lastIndex - 1;
						};
						lastIndex = lastIndex - 1;
						while (text.charAt(lastIndex) != "<") {
							lastIndex = lastIndex - 1;
						};
						lastIndex = lastIndex - 1;
						while (text.charAt(lastIndex) != "<") {
							lastIndex = lastIndex - 1;
						};
						var imgLast = text.substring(lastIndex, text.indexOf("</td>", lastIndex) + 5);
						imgLast = imgLast.substring(imgLast.indexOf(">") + 1).replace("</td>", "");
						tableRows[j].innerHTML = imgLast;
					} else {
						alert("No se encuentra a " + jugadorNombre);
					}
				}
			}
		}
	}

	//Iterate through the tables we have collected
	for( var i=0; i<tables.length; i++ ){
	
		//If we are in the administration page, we dont touch it
		if( window.location.href.indexOf( "administration" ) != -1 ){
			break;
		}
	
		thisTable = tables[i];
		
		//Add sorting capability	
		var Table1Sorter = new TSorter;
		Table1Sorter.init(thisTable);

		//Obtain the rows of the table
		tableRows = thisTable.getElementsByTagName('tr');

		for ( var j = 0; j < tableRows.length; j++ ){
		
			thisRow = tableRows[j];
			//Columns of the row
			var td = thisRow.getElementsByTagName('td');
			
			//erpichi 20111120 - que no modifique nada en la home que falla
			if((thisRow.getAttribute('class') == 'tr1' || thisRow.getAttribute('class') == 'tr2' )
					&& !endsWith(window.location.href, "comunio2012.com/")){		//if it is a player...

				//erpichi 20111120 - Fotos de los jugadores
				var tdNew = document.createElement("TD");
				
				//crear la nueva columna foto del jugador
				tdNew.appendChild(document.createTextNode(''));
				tdNew.align = "center";

				tdNew.innerHTML = '';
				thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
				
				var suplente = true;
				//alert(td[playerNameCol].textContent);
				//+"-"+(startsWith(td[playerNameCol].textContent,'*') && endsWith(td[playerNameCol].textContent,'*')));
                if (startsWith(td[playerNameCol].textContent,'*') && endsWith(td[playerNameCol].textContent,'*')) {
                	suplente = false;
                }
				playerName = td[playerNameCol].textContent.replace( /\*/g, "" );
				
				//erpichi 20111123 - Evitar que si eres plusPlayer se vean mal los equipos
				//teamName = td[teamNameCol].textContent;
				teamName = td[teamNameCol].innerHTML;
				if (startsWith(teamName, "<a")) {
					var divEquipo = document.createElement("div");
					divEquipo.innerHTML = teamName;
					teamName = divEquipo.childNodes[0].title;
				}
				
				//Comunio errors with spaces
				playerName = trim(playerName);
				teamName = trim(teamName);
				////////////////////////////////
		
				//Id number of the player
				idPlayer = playerID[ playerName ];
				
				if( !playerID[ playerName ] && updated == false ){
					updated = true;
					idPlayer = playerID[ playerName ];
				}

				td[playerNameCol].id='si_normal' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
				td[teamTotalesCol].id='si_normalsi_statsno_cronictotales' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );

				td[teamNameCol].id='si_normalno_statsno_cronicequipo' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
				//Image and link of the team
				td[teamNameCol].innerHTML = '<img src="' + images[ teamName ] + '" alt=' +
											teamName +' title=' +teamName + ' border="0" />';
																				
									
				//SCRIPT link					
				td[playerNameCol].innerHTML ='<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
												//erpichi 20111103
												//td[playerNameCol].textContent + '</a>';
												playerName + '</a>';

				var mostrarCambios = true;
				
				if (suplente && window.location.href.indexOf( "lineup" ) != -1) {
					//td[playerNameCol].style.fontSize="smaller";
					td[playerNameCol].style.fontStyle="italic";
					td[playerNameCol].style.textAlign="right";
					td[playerNameCol].style.paddingRight="1em";
					td[playerNameCol].childNodes[0].style.color="DarkSeaGreen";
					
					if (!mostrarCambios) {
						//erpichi 20111206 - Camiseta jugador suplente
						var tdNewSuplente = document.createElement("TD");
						tdNewSuplente.id='si_normalsi_cronicno_statstitular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						//crear la nueva columna camiseta Suplente
						tdNewSuplente.align = "center";
//						alert("<small>" + playerIDNameEntra[playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" )] + '</small>');
//						tdNewSuplente.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es suplente en tu equipo" title="Es suplente en tu equipo" src="i/1/suit.gif">';
						tdNewSuplente.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es suplente en tu equipo" title="Es suplente en tu equipo" src="' + images['suplente'] + '">';
						thisRow.appendChild(tdNewSuplente);
					}
				//erpichi 20111206 - Camiseta jugador titular
				} else if (window.location.href.indexOf( "lineup" ) != -1) {
					//td[playerNameCol].childNodes[0].style.color="lightgray";

					if (!mostrarCambios) {
						var tdNewAlineado = document.createElement("TD");
						tdNewAlineado.id='si_normalsi_cronicno_statstitular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						//crear la nueva columna camiseta Titular
						tdNewAlineado.align = "center";
//						alert("<small>" + playerIDNameEntra[playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" )] + '</small>');
//						tdNewAlineado.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es titular en tu equipo" title="Es titular en tu equipo" src="i/1/whitesuit.gif">';
						tdNewAlineado.innerHTML = '<img id="titular' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" border="0" alt="Es titular en tu equipo" title="Es titular en tu equipo" src="' + images['titular'] + '">';
						thisRow.appendChild(tdNewAlineado);
					}
				}

				// estado de jugadores - by diegocom - 20110820 - ini
				// nueva columna en alineacion
				if (window.location.href.indexOf( "lineup" ) != -1
					|| window.location.href.indexOf( "playerInfo" ) != -1
					|| window.location.href.indexOf( "placeOffers" ) != -1
					|| window.location.href.indexOf( "exchangemarket" ) != -1
					/*&& window.location.href.indexOf( "viewoffers" ) == -1*/) {

					//erpichi 20111120 - Fotos de los jugadores
					/*var tdNew = thisRow.childNodes[0];
					tdNew.id='si_normal' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					//crear la nueva columna foto del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

					tdNew.innerHTML = '<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
//							'<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/m/' + idPlayer + '.gif?pln=1" /></a>';
							playerIDNameFoto[playerName] + '</a>';*/
					
					var tdNew = document.createElement("TD");
					tdNew.id='si_normalno_cronicno_statsestado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
//					tdNew.innerHTML = '<img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" id="estado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" />';
					tdNew.innerHTML = calculaEstadoScript(playerName);
					thisRow.appendChild(tdNew);
					
					/*var tdNew = document.createElement("TD");
					tdNew.id='si_normalsi_cronicno_statspuntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

//					tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >s.c.</div>';
					var puntosScript = "s.c.";
					if (playerIDNamePuntos[playerName]) {
						puntosScript = playerIDNamePuntos[playerName];
					}
					var urlPuntos = "http://www.eurocopa.calculapuntoscomunio.com/puntos/";
					tdNew.innerHTML = "<a  style='text-decoration: none;' title='Click aquí para ver los puntos en CpC.' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + puntosScript + '</div>' + "</a>";
				    
					thisRow.appendChild(tdNew);*/
				}
				// estado de jugadores - by diegocom - - fin
				
				//erpichi20120304 - stats
				if (window.location.href.indexOf( "lineup" ) != -1){
					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicsi_statsMedia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsMedia' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicsi_statsTrends' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsTrends' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					

					var tdNew = document.createElement("TD");
					tdNew.id='no_cronicsi_statsLast' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '<div id="statsLast' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" ><img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" /></div>';
					thisRow.appendChild(tdNew);
					

					var url = playerIDNameUrl[playerName];
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicPicas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgPicas = (playerIDNamePicas[playerName]) ? playerIDNamePicas[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Picas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicPicas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgPicas  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicGoles' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgGoles = (playerIDNameGoles[playerName]) ? playerIDNameGoles[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Goles. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicGoles' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgGoles  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicTarjetas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgTarjetas = (playerIDNameTarjetas[playerName]) ? playerIDNameTarjetas[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Tarjetas. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 1.5em;display:inline-block;" id="cronicTarjetas' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgTarjetas  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
					
					
					var tdNew = document.createElement("TD");
					tdNew.id='no_statssi_cronicMarcador' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					tdNew.style.display = "none";
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					var imgMarcador = (playerIDNameMarcador[playerName]) ? playerIDNameMarcador[playerName]:"-";
					tdNew.innerHTML = "<a style='text-decoration: none;' href='javascript:;' onclick=\"window.open('" + url + "')\" title='Marcador. Click aquí para ver la crónica del partido en CpC.' >" + '<div style="width: 4em;" id="cronicMarcador' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + imgMarcador  + '</div>' + "</a>";
					thisRow.appendChild(tdNew);
				}
				
				//erpichi 201111120 - estado jugador en vender jugadores
				if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {

					//erpichi 20111120 - Fotos de los jugadores
					/*var tdNew = thisRow.childNodes[0];
					
					//crear la nueva columna foto del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";

					tdNew.innerHTML = '<a href="tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + idPlayer + '&userId=' + userId + '\'))" target="_blank" >' +
//							'<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/m/' + idPlayer + '.gif?pln=1" /></a>';
							playerIDNameFoto[playerName] + '</a>';*/
					
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna estado del jugador
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "center";
						
//						tdNew.innerHTML = '<img width="20px" height="20px" title="cargando estado..."  src="data:image/png;base64,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" id="estado' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" />';
						tdNew.innerHTML = calculaEstadoScript(trim(playerName));
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);

						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						var nombreJugadorComprado = trim(playerName).replace(/"/g, "quot").replace( /\ /g, "_" );
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna precio de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="precioCompra" + nombreJugadorComprado;
						//tdNew.id="precioCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = '-';
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna diferencia de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="diferenciaCompra" + nombreJugadorComprado;
						//tdNew.id="diferenciaCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = "-<span id='diferenciaCompraValue" + nombreJugadorComprado + "' style='display: none;'>" + td[valorMercadoCol].textContent +"</span>";
						//tdNew.innerHTML = "-<span id='diferenciaCompraValue" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + "' style='display: none;'>" + td[valorMercadoCol].textContent +"</span>";
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna fecha de la compra
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "right";
						//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
						tdNew.id="fechaCompra" + nombreJugadorComprado;
						//tdNew.id="fechaCompra" + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" );
						tdNew.innerHTML = '-';
						//thisRow.appendChild(tdNew);
						thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
						var tdNew = document.createElement("TD");
						
						//crear la nueva columna puntos del jugador
						tdNew.appendChild(document.createTextNode(''));
						tdNew.align = "center";
						
//						tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >s.c.</div>';
						var puntosScript = "s.c.";
						if (playerIDNamePuntos[trim(playerName)]) {
							puntosScript = playerIDNamePuntos[trim(playerName)];
						}
//						tdNew.innerHTML = '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + puntosScript + '</div>';
						var urlPuntos = "http://www.eurocopa.calculapuntoscomunio.com/puntos/";
						tdNew.innerHTML = "<a style='text-decoration: none;' title='Click aquí para ver los puntos en CpC.' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div id="puntos' + playerName.replace(/"/g, "&quot;").replace( /\ /g, "_" ) + '" >' + puntosScript + '</div>' + "</a>";
					    
						thisRow.appendChild(tdNew);
						//thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
						
					}

				cellOwnersToConvert.push( td[ownerCol] );
			
			} else{	//If not a player, we are in the headings
			
				if( window.location.href.indexOf( "standings" ) != -1 ||	//Standings table--> out (only sorting)
					window.location.href.indexOf( "teamInfo.phtml" ) != -1 ||	//Table with the community players
					window.location.href.indexOf( "team_news" ) != -1) {	//News board table--> out (only sorting)
					break;
				}
				
				//erpichi 201111120 - estado jugador en vender jugadores
				//thisRow = tableRows[0];
				//Columns of the row
				//var tdHeader = thisRow.getElementsByTagName('td');
				for(var k = 0; k < td.length; k++) {
					td[k].align = "center";
				}

				//erpichi 20111120 - Fotos de los jugadores
				if (window.location.href.indexOf( "lineup" ) != -1
						|| window.location.href.indexOf( "playerInfo" ) != -1
						|| window.location.href.indexOf( "placeOffers" ) != -1
						|| window.location.href.indexOf( "exchangemarket" ) != -1
						/*&& window.location.href.indexOf( "viewoffers" ) == -1*/) {

					var tdNew = document.createElement("TD");
					
					//crear la nueva columna fotos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
				}
				//erpichi 201111120 - estado jugador en vender jugadores
				if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {

					//erpichi 20111120 - Fotos de los jugadores

					var tdNew = document.createElement("TD");
					
					//crear la nueva columna fotos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[0]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Estado';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna estado del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Precio de la compra';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Diferencia';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = 'Fecha de la compra';
					//thisRow.appendChild(tdNew);
					thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
					
					var tdNew = document.createElement("TD");
					
					//crear la nueva columna puntos del jugador
					tdNew.appendChild(document.createTextNode(''));
					tdNew.align = "center";
					
					tdNew.innerHTML = '';//'Últimos puntos';
					thisRow.appendChild(tdNew);
					//thisRow.insertBefore(tdNew, thisRow.childNodes[thisRow.childNodes.length -1]);
				}
			
				//Get the number of column
				playerNameCol = 0;
				teamNameCol = 1;
				teamTotalesCol = 2;
				
				for( var k = 0; k < td.length; k++ ){
				
					if( td[k].textContent.indexOf("Nombre") != -1 || td[k].textContent.indexOf("Por") != -1 ){
						playerNameCol = k;
					}
					else if( td[k].textContent.indexOf("Equipo") != -1 ){
						teamNameCol = k;
						teamTotalesCol = k+1;
					}
					else if( td[k].textContent.indexOf("Propietario") != -1 ||
							 td[k].textContent.indexOf("Para") != -1 ||
							 td[k].textContent.indexOf("De") != -1 ){
						
						ownerCol = k;
					}
				}
			}
		}
		
		
	}
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1) {
		function getJugadoresComprados(text) {
			var pujaspos = text.indexOf("Tus pujas:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divPujas";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Efectuada") {
					
					//erpichi 20111124 - Error chaval
//					var pruebaaaa = document.getElementById("pruebaaaa");
//					if (pruebaaaa == null) {
//						pruebaaaa = document.createElement("div");
//						pruebaaaa.id = "pruebaaaa";
//						pruebaaaa.innerHTML = "Jugadores comprados:\n"
//						document.body.appendChild(pruebaaaa);
//					}
//					pruebaaaa = document.getElementById("pruebaaaa");
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("precioCompra" + nombreJugadorComprado) != null
							&& document.getElementById("precioCompra" + nombreJugadorComprado).innerHTML == "-") {
						
						if (document.getElementById("precioCompra" + nombreJugadorComprado) != null) {
							document.getElementById("precioCompra" + nombreJugadorComprado).innerHTML = tdsPujas[precioVentaCol].innerHTML;

							//erpichi 20111124 - Error chaval
//							if (pruebaaaa != null) {
//								pruebaaaa.innerHTML += nombreJugadorComprado + "(ok):"+tdsPujas[precioVentaCol].innerHTML+"\n";
//							}
						} else {
							//erpichi 20111124 - Error chaval
//							if (pruebaaaa != null) {
//								pruebaaaa.innerHTML += nombreJugadorComprado + "(no ok):ERROR\n";
//							}
						}
						if (document.getElementById("diferenciaCompra" + nombreJugadorComprado) != null) {
							var precioMercado = document.getElementById("diferenciaCompraValue" + nombreJugadorComprado).textContent;
							precioMercado = replaceAll(precioMercado, ".", "");
							var precioCompra = tdsPujas[precioVentaCol].textContent;
							precioCompra = replaceAll(precioCompra, ".", "");
							var diferencia =  parseInt(precioMercado) - parseInt(precioCompra);
							if (diferencia > 0) {
								document.getElementById("diferenciaCompra" + nombreJugadorComprado).style.color = "#00FF00";
							} else if (diferencia < 0) {
								document.getElementById("diferenciaCompra" + nombreJugadorComprado).style.color = "RED";
							}
							diferencia = formateaNumero(diferencia, ".", true);
							document.getElementById("diferenciaCompra" + nombreJugadorComprado).innerHTML = diferencia;
						}
						if (document.getElementById("fechaCompra" + nombreJugadorComprado) != null) {
							document.getElementById("fechaCompra" + nombreJugadorComprado).innerHTML = tdsPujas[fechaVentaCol].innerHTML;
						}
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				get( comunio + "/" + hrefSiguientePuja, getJugadoresComprados );
			} else {
				//erpichi 20111124 - Error chaval
//				var pruebaaaa = document.getElementById("pruebaaaa");
//				if (pruebaaaa != null) {
//					alert(pruebaaaa.innerHTML);
//				}
			}
		}
		
		get( window.location.href.replace( "putOnExchangemarket.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresComprados );
	}
	
	//erpichi 20111120 
	function formateaNumero(numero, separador_miles, mostrarPositivos) {
	    numero = parseInt(numero);
	    if(isNaN(numero)){
	        return "";
	    }
	    
	    if (mostrarPositivos && numero <= 0) {
	    	mostrarPositivos = false;
	    }

	    if(separador_miles){
	    	numero = numero.toString();
	        // Añadimos los separadores de miles
	        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
	        while(miles.test(numero)) {
	            numero=numero.replace(miles, "$1" + separador_miles + "$2");
	        }
	    }
	    
	    if (mostrarPositivos) {
	    	numero = "+" + numero;
	    }

	    return numero;
	}
	
	//erpichi 20111112
	if (window.location.href.indexOf( "standings" ) != -1 ) {
		if (document.getElementById("smallcontentrightst") != null){
			document.getElementById("smallcontentrightst").style.fontSize="0.93em";
		}
	}
	// estado de jugadores - by diegocom - 20110820 - ini
	if (window.location.href.indexOf( "lineup" ) != -1 ) {
//		actualizaEstado();
	//erpichi20111105
		getProximaJornada();
	//erpichi20111105
		actualizaTextoInformacion();
    //erpichi20111101
		actualizaAlineacion();
	}
	if (window.location.href.indexOf( "playerInfo" ) != -1 ) {
//		actualizaEstado();
		}
	if (window.location.href.indexOf( "exchangemarket" ) != -1
				/*&& window.location.href.indexOf( "viewoffers" ) == -1*/)
	{
//		actualizaEstado();
	}
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1)
	{
//		actualizaEstado();
	}
	//erpichi 201111120 - fotos de los jugadores y estado
	if (window.location.href.indexOf( "placeOffers" ) != -1)
	{
//		actualizaEstado();
	}
	// estado de jugadores - by diegocom - 20110820 - fin
	
	// puntos  de jugadores - by diegocom - 20111013 - ini
	if (window.location.href.indexOf( "lineup" ) != -1 ) {
//			actualizaPuntos();
	}
	if (window.location.href.indexOf( "playerInfo" ) != -1 ) {
//			actualizaPuntos();
			}
	if (window.location.href.indexOf( "exchangemarket" ) != -1
				/*&& window.location.href.indexOf( "viewoffers" ) == -1*/)
	{
//			actualizaPuntos();
	}
	//erpichi 201111120 - estado jugador en vender jugadores
	if (window.location.href.indexOf( "putOnExchangemarket" ) != -1)
	{
//			actualizaPuntos();
	}
	//erpichi 201111120 - fotos de los jugadores y estado
	if (window.location.href.indexOf( "placeOffers" ) != -1)
	{
//		actualizaPuntos();
	}
	// puntos  de jugadores - by diegocom - 20111013 - fin

// Cálculo de Saldo - by anthorlop - 20110222 - ini
if ((window.location.href.indexOf( "exchangemarket.phtml" ) != -1
		 	&& window.location.href.indexOf( "?" ) == -1)
		 || window.location.href.indexOf( "placeOffers.phtml" ) != -1) {
	var allTablesMercado = document.getElementsByTagName('table');
	var saldoControl = document.createElement('table');
	saldoControl.setAttribute( "style", "width:100%; height:24px;" );
	saldoControl.setAttribute( "cellpadding", "3" );
	saldoControl.setAttribute( "cellspacing", "3" );
	saldoControl.innerHTML = '<tr><td><table style="width:100%; height:1px;" border="0" cellpadding="0" cellspacing="0" class="tableline02"><tr><td><img src="i/i/pxl_transparent.gif" width="1" height="1" border="0" alt="" /></td></tr></table><table style="width:100%; height:20px;" border="0" cellpadding="4" cellspacing="0"><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px;" align="right"><strong>Actual:</strong> <input size="22px" type="text" name="saldoActual" id="saldoActual" readonly="true" style="background-color:transparent;border:0px;color:white;font-size:12px;text-align:right;" /></td></tr></table><table style="width:100%; height:21px;" border="0" cellpadding="4" cellspacing="0"><tr id="abiertoTR" class="tr1" style="display: none;"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Ofertas abiertas:</strong><input size="21px" type="text" name="abierto" id="abierto" readonly="true" style="background-color:transparent;border:0px;color:white;font-size:12px;text-align:right;" value="0"/><input type="hidden" id="abiertoNames" /></td></tr><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Ofrecido:</strong><input size="21px" type="text" name="ofrecido" id="ofrecido" readonly="true" style="background-color:transparent;border:0px;color:white;font-size:12px;text-align:right;" /></td></tr><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px"  align="right"><strong>Vendido:</strong><input size="21px" type="text" name="vendido" id="vendido" readonly="true" style="background-color:transparent;border:0px;color:white;font-size:12px;text-align:right;" value="0 €"/><input type="hidden" id="vendidoNames" /></td></tr></table><table style="width:100%; height:20px;" border="0" cellpadding="4" cellspacing="0"><tr class="tr1"><td class="text" style="white-space:nowrap;font-size:10px" align="right"><img src="i/1/i_balancemoney.png" width="18" height="9" alt="Fondos de la cuenta si se aceptan todas las ofertas" /><strong>Total:</strong> <input size="23px" type="text" name="saldoTotal" id="saldoTotal" readonly="true" style="background-color:transparent;border:0px;color:white;font-size:12px;text-align:right;" /></td></tr></table></td></tr> ';
		
	allTablesMercado[allTablesMercado.length-1].parentNode.insertBefore( saldoControl, allTablesMercado[allTablesMercado.length-1].nextSibling );
	
	function addPuntosMiles(num){
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(num)) {
			num = num.replace(rgx, '$1' + '.' + '$2');
		}
		return num;
	}
	
	function recalcularSaldo(){
		document.getElementById('saldoTotal').value='';
		document.getElementById('ofrecido').value='';
		document.getElementById('saldoActual').value='';
		var vendido = parseInt(replaceAll(document.getElementById('vendido').value, ".", "").replace(' €', ''),10);
		document.getElementById('vendido').value='';
		var abierto = parseInt(replaceAll(document.getElementById('abierto').value, ".", "").replace(' €', ''),10);
		document.getElementById('abierto').value='';
		var ofrecido = 0;
		var inp = document.getElementsByTagName('input');
		for(var i = 0; i <inp.length; i++) {
			if(inp[i].type == 'text') { 
				if (inp[i].value != '') {
					inp[i].value = inp[i].value.replace( /\./g, "" );
					if (!isNaN(inp[i].value)) {
						ofrecido = parseInt(ofrecido,10) + parseInt(inp[i].value,10);
						inp[i].value = addPuntosMiles(inp[i].value);
					} else {
						inp[i].value = '';
					}
					
				}
			}
		}
		var finanzas = document.getElementById("userbudget");
		var saldo = finanzas.textContent;
		saldo = saldo.substring(saldo.indexOf(':')+1,saldo.indexOf('€'));
		saldo = saldo.replace( /\./g, "" );
		var total =  parseInt(saldo) -  parseInt(ofrecido)-  parseInt(abierto) + parseInt(vendido);
		document.getElementById('saldoTotal').value=addPuntosMiles(total+'') + ' €';
		document.getElementById('ofrecido').value=addPuntosMiles(ofrecido+'') + ' €';
		document.getElementById('vendido').value=addPuntosMiles(vendido+'') + ' €';
		document.getElementById('abierto').value=addPuntosMiles(abierto+'') + ' €';
		document.getElementById('saldoActual').value=addPuntosMiles(saldo+'') + ' €';
		if (total < 0) {
			document.getElementById('saldoTotal').style.color = "red";
		} else {
			document.getElementById('saldoTotal').style.color = "#00FF00";
		}
	}
	
	function cambiarOnblurInputs(){
		var inp = document.getElementsByTagName('input');
		for(var i = 0; i <inp.length; i++) {
			if(inp[i].type == 'text') { 
				inp[i].addEventListener("blur", recalcularSaldo, false);
				//inp[i].onblur = function (){recalcularSaldo();}
			}
		}
	}
	
	recalcularSaldo();
	cambiarOnblurInputs();

	//erpichi 20120328 - en calculadora jugadores aceptados
		function getJugadoresVendidos(text) {
			var pujaspos = text.indexOf("Ofertas para ti:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divVentas";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Aceptada") {
					
					//erpichi 20111124 - Error chaval
//					var pruebaaaa = document.getElementById("pruebaaaa");
//					if (pruebaaaa == null) {
//						pruebaaaa = document.createElement("div");
//						pruebaaaa.id = "pruebaaaa";
//						pruebaaaa.innerHTML = "Jugadores comprados:\n"
//						document.body.appendChild(pruebaaaa);
//					}
//					pruebaaaa = document.getElementById("pruebaaaa");
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("vendido") != null
							&& document.getElementById("vendidoNames") != null
							&& document.getElementById("vendidoNames").value.indexOf("//" + nombreJugadorComprado+ "//") == -1) {
						var vendidoTotal = parseInt(replaceAll(document.getElementById('vendido').value, ".", "").replace(' €', ''),10);
						var vendidoTD = parseInt(replaceAll(tdsPujas[precioVentaCol].innerHTML, ".", ""),10);
						document.getElementById('vendido').value = vendidoTotal + vendidoTD;
						document.getElementById("vendidoNames").value += "//" + nombreJugadorComprado+ "//";
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				get( comunio + "/" + hrefSiguientePuja, getJugadoresVendidos );
			} else {
				//erpichi 20111124 - Error chaval
//				var pruebaaaa = document.getElementById("pruebaaaa");
//				if (pruebaaaa != null) {
//					alert(pruebaaaa.innerHTML);
//				}
				
				recalcularSaldo();
				cambiarOnblurInputs();

				if(window.location.href.indexOf( "placeOffers.phtml") != -1) {
					get( window.location.href.replace( "placeOffers.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresAbiertos );
				}
			}
		}
		
		function getJugadoresAbiertos(text) {
			var pujaspos = text.indexOf("Tus pujas:");
			//var table1pos = text.indexOf("<table");
			var table2pos = text.indexOf("<table", pujaspos);
			var tablaPujasHTML = text.substring(table2pos, text.indexOf("</table", table2pos));
			//alert(tablaPujasHTML);
			var divPujas = document.createElement("div");
			divPujas.id="divAbiertos";
			divPujas.style.display="none";
			divPujas.innerHTML = tablaPujasHTML;
			var trsPujas = divPujas.getElementsByTagName("tr");
			for (var i = 0; i < trsPujas.length; i++) {
				var tdsPujas = trsPujas[i].getElementsByTagName("td");
				if (tdsPujas[tdsPujas.length - 1].innerHTML == "Abierta") {
					
					//erpichi 20111124 - Error chaval
//					var pruebaaaa = document.getElementById("pruebaaaa");
//					if (pruebaaaa == null) {
//						pruebaaaa = document.createElement("div");
//						pruebaaaa.id = "pruebaaaa";
//						pruebaaaa.innerHTML = "Jugadores comprados:\n"
//						document.body.appendChild(pruebaaaa);
//					}
//					pruebaaaa = document.getElementById("pruebaaaa");
					
					playerNameColNoScript = 0;
					//erpichi 20111125 - Intentando arreglar nombres raros en vender jugadores
					var nombreJugadorComprado = trim(tdsPujas[playerNameColNoScript].textContent).replace(/"/g, "quot").replace( /\ /g, "_" );
					//var nombreJugadorComprado = tdsPujas[playerNameColNoScript].textContent.replace(/"/g, "&quot;").replace( /\ /g, "_" );
					
					if (document.getElementById("abierto") != null
							&& document.getElementById("abiertoNames") != null
							&& document.getElementById("abiertoNames").value.indexOf("//" + nombreJugadorComprado+ "//") == -1) {
						var abiertoTotal = parseInt(replaceAll(document.getElementById('abierto').value, ".", "").replace(' €', ''),10);
						var abiertoTD = parseInt(replaceAll(tdsPujas[precioVentaCol].innerHTML, ".", ""),10);
						document.getElementById('abierto').value = abiertoTotal + abiertoTD;
						document.getElementById("abiertoNames").value += "//" + nombreJugadorComprado+ "//";
					}
				}
			}

			if (text.indexOf('title="Siguiente"', pujaspos) != -1) {
				var botonSiguientePujasPos = text.indexOf('title="Siguiente"', pujaspos);
				//erpichi 20111125 - En chrome buscar el href del siguiente bien
				while (text.charAt(--botonSiguientePujasPos) != "<");
				
				var hrefSiguientePujaPos = text.indexOf('href=', botonSiguientePujasPos) + 'href="'.length;
				var hrefSiguientePujaPosFin = text.indexOf('"', hrefSiguientePujaPos);
				var hrefSiguientePuja = text.substring(hrefSiguientePujaPos, hrefSiguientePujaPosFin);
				hrefSiguientePuja = replaceAll(hrefSiguientePuja, "&amp;", "&");
				var comunio = window.location.href.substring(0, window.location.href.indexOf("/","http://".length));
				get( comunio + "/" + hrefSiguientePuja, getJugadoresAbiertos );
			} else {
				//erpichi 20111124 - Error chaval
//				var pruebaaaa = document.getElementById("pruebaaaa");
//				if (pruebaaaa != null) {
//					alert(pruebaaaa.innerHTML);
//				}
				
				recalcularSaldo();
				cambiarOnblurInputs();
				document.getElementById("abiertoTR").style.display = "";
			}
		}

		if (window.location.href.indexOf( "exchangemarket.phtml") != -1) {
			get( window.location.href.replace( "exchangemarket.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresVendidos );
		} else if(window.location.href.indexOf( "placeOffers.phtml") != -1) {
			get( window.location.href.replace( "placeOffers.phtml", "" ) + 'exchangemarket.phtml?viewoffers_x=22', getJugadoresVendidos );
		}
}
// Cálculo de Saldo - by anthorlop - 20110222 - fin


	//Add smiles/improve editor if we are writing a message
	if ( window.location.href.indexOf( "postMessage" ) != -1 ){
		
		var newScript = document.createElement("script");
		newScript.innerHTML = "function setText( txt ){" + 
							   "	var text = document.post.message;" +
							   "	var start = text.selectionStart;" +
							   "	var end = text.selectionEnd;" +
							   "	var s1 = text.value.substr(0, start);" +
							   "	var s2 = text.value.substr(end);" +
							   "	var scrollTop = text.scrollTop;" +
							   "	text.value = s1 + txt + s2;" +
							   "	if (start == end)	{" +
							   "		text.selectionStart = s1.length + txt.length;" +
							   "		text.selectionEnd = text.selectionStart;" +
							   "	}" +
							   "	else{" +
							   "		text.selectionStart = s1.length;" +
							   "		text.selectionEnd = s1.length + txt.length;" +
							   "	}" +
							   "	if ( txt.indexOf('[/') != -1 ){" +
							   "		text.selectionStart -= txt.indexOf('[/')+1;" +
							   "		text.selectionEnd = text.selectionStart;" +
							   "	}" +
							   "	text.focus();" +
							   "	text.scrollTop = scrollTop;" +
							   "}";
		document.body.appendChild( newScript );
		


		var newTable1 = document.createElement("table");
		newTable1.setAttribute( "style", "width:100%; height:24px;" );
		newTable1.setAttribute( "cellpadding", "3" );
		newTable1.setAttribute( "cellspacing", "3" );
		newTable1.innerHTML = 	'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':D\');"><img src="' + images[':D'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':)\');"><img src="' + images[':)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':(\');"><img src="' + images[':('] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':o\');"><img src="' + images[':o'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':-?\');"><img src="' + images[':-?'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'8)\');"><img src="' + images['8)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':lol:\');"><img src="' + images[':lol:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':x\');"><img src="' + images[':x'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':P\');"><img src="' + images[':P'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':oops:\');"><img src="' + images[':oops:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':cry:\');"><img src="' + images[':cry:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':evil:\');"><img src="' + images[':evil:'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':roll:\');"><img src="' + images[':roll:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':wink:\');"><img src="' + images[':wink:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':zzz:\');"><img src="' + images[':zzz:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':))\');"><img src="' + images[':))'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':love:\');"><img src="' + images[':love:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'*:(\');"><img src="' + images['*:('] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':xx\');"><img src="' + images[':xx'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':8))\');"><img src="' + images[':8))'] + '" border="0" /></a></td></tr>' +
								
								'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\':puke:\');"><img src="' + images[':puke:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'>:)\');"><img src="' + images['>:)'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':clap:\');"><img src="' + images[':clap:'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\':schimpf:\');"><img src="' + images[':schimpf:'] + '" border="0" /></a></td></tr>';
							
		var newTable2 = document.createElement("table");
		newTable2.setAttribute( "style", "width:100%; height:24px;" );
		newTable2.setAttribute( "cellpadding", "3" );
		newTable2.setAttribute( "cellspacing", "3" );
		newTable2.innerHTML =	'<tr"><td><a href="JavaScript:;" onclick="JavaScript:setText(\':bier:\');"><img src="' + images[':bier:'] + '" border="0" /></a></td></tr>';
									
		var newTable3 = document.createElement("table");
		newTable3.setAttribute( "style", "width:100%; height:24px;" );
		newTable3.setAttribute( "cellpadding", "3" );
		newTable3.setAttribute( "cellspacing", "3" );
		newTable3.innerHTML =	'<tr><td><a href="JavaScript:;" onclick="JavaScript:setText(\'[img][/img]\');"><img src="' + images['imgIcon'] + '" border="0" /></a></td>' +
								'<td><a href="JavaScript:;" onclick="JavaScript:setText(\'http://\');"><img src="' + images['httpIcon'] + '" border="0" /></a></td></tr>';
							

		var allTables = document.getElementsByTagName("table");
		allTables[20].parentNode.insertBefore(newTable1, allTables[20].nextSibling);
		newTable1.parentNode.insertBefore(newTable2, newTable1.nextSibling);
		newTable2.parentNode.insertBefore(newTable3, newTable2.nextSibling);

	}

	//If we are at news page (but not writing a post)...
	if ( window.location.href.indexOf( "news" ) != -1 && window.location.href.indexOf( "edit" ) == -1 ){

		
		//erpichi 20111129  - Mostrar fotos en alineacion ideal
		function showPlayerFotoAlineacionIdeal() {
			//erpichi 20111106
			var padre = document.getElementById("postwrap");
			var divs = padre.getElementsByTagName("div");
			for (var i = 0; i < divs.length; i++) {
				if (divs[i].className == "article_content_text"
						&& divs[i].textContent.indexOf("¡Puntuación total:") != -1) {
					//erpichi 20111130 - Estilo del fondo del 11 ideal igual que la noticia
					var estiloFondo = divs[i].parentNode.className.replace("article_content", "");
					var centerTable = divs[i].getElementsByTagName("center");
					if (centerTable.length == 1) {
						var tableSplit = centerTable[0].innerHTML.split("<br>");
						var tableString = "<table><tbody>";
						for (var j = 0; j < tableSplit.length; j++) {
							if (tableSplit[j].length > 0) {
								//erpichi 20111130 - Estilo del fondo del 11 ideal igual que la noticia
								tableString += '<tr class="tr' + estiloFondo + '">';
								tableString += '<td width="" height="" align="center" style="vertical-align: top;"><table><tbody>';
								var trSplit = tableSplit[j].split(" - ");
								tableString += '<tr>';
								for (var k = 0; k < trSplit.length; k++) {
									tableString += '<td style="border:1px solid black;text-align:center;vertical-align:bottom;">';
									var playerFotoId = trSplit[k].substring(trSplit[k].indexOf("href=\"") + "href=\"".length);
									playerFotoId = playerFotoId.substring(0, playerFotoId.indexOf("\"")).replace( "../primera_division/", "" ).replace( ".html", "" );
									playerFotoId = playerFotoId.split("-")[0];
//									varFotoHTML = '<img style="border:none;" src="http://www.comunio.es/tradablePhoto.phtml/s/' + playerFotoId + '.gif?pln=1">';
									varFotoHTML = replaceAll(playerIDNameFoto[playerIDName[playerFotoId]], "height='30'", "height='50'");
									tableString += varFotoHTML;
									tableString += '</td>';
								}
								tableString += '</tr>';
								tableString += '<tr>';
								for (var k = 0; k < trSplit.length; k++) {
									tableString += '<td class="small" style="border:1px solid black;text-align:center;vertical-align:bottom;font-weight:normal;font-size:10px;">';
									tableString += trSplit[k];
									tableString += '</td>';
								}
								tableString += '</tr>';
								tableString += '</tbody></table></td>';
								tableString += '</tr>';
							}
						}
						tableString += "</tbody></table>";
						centerTable[0].innerHTML = tableString;
					}
				}
			}
		}
		showPlayerFotoAlineacionIdeal();
		
		//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
		function changePlayerLinksToSCRIPT() {
			//Change player links to SCRIPT
			var a = document.getElementsByTagName("a");
			for( var i=0; i<a.length; i++ ){
				
				if( a[i].href.indexOf("/primera_division") != -1 ){
				
					var player = a[i].getAttribute("href").replace( "../primera_division/", "" ).replace( ".html", "" );
					player = player.split("-");
					
					var playerName = trim( a[i].textContent );
					a[i].textContent = playerName;
					var playerId = player[0];
					 
					a[i].setAttribute( "href", 'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId);
					a[i].setAttribute( "onclick", 'return(openSmallWindow(\'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId + '\'))' );
				} else if( a[i].href.indexOf("tradableInfo.phtml") != -1 ){
				
					var playerId = a[i].getAttribute("href").replace( "tradableInfo.phtml?tid=", "" );
					var playerName = trim( a[i].textContent );
					a[i].textContent = playerName;
					 
						a[i].setAttribute( "href", 'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId);
						a[i].setAttribute( "onclick", 'return(openSmallWindow(\'tradableInfo.phtml?tid=' + playerId + '&userId=' + userId + '\'))' );
					
				}
			}
		}
		changePlayerLinksToSCRIPT();
		
		//erpichi 20111120 - filtro noticias
		var separadorFiltroNews = "|";
		var separadorFiltroNewsBody = "#";
		function filtrarNoticias(text, objValue, posNews) {
			var divNews = document.getElementById("postwrap");
			if (posNews == -1) {
				document.getElementById("center").style.height="";
				document.getElementById("news_filter").disabled = true;
				posNews = 0;
				divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>';
				get(window.location.href + "?newsAction=reload&first_news=" + posNews, function(text2) {filtrarNoticias(text2, objValue, posNews);});
			} else {
				var newPosNews = text.substring(0, text.indexOf(";"));
				newPosNews = parseInt(newPosNews);
				text = text.substring(text.indexOf(";") + 1);
				if (newPosNews > 0) {
					//erpichi 20111122 - reiniciar noticias sin filtro
					var llamarSiguiente = true;
					if (objValue == "-1") {
						objValue = "";
						llamarSiguiente = false;
					}
					var divContenedor = document.createElement("div");
					divContenedor.innerHTML = text;
					var divsHijos = divContenedor.childNodes;
					//alert(divsHijos.length);
					for(var i = 0; i < divsHijos.length; i++) {
						//alert();
						if (typeof divsHijos[i].className != 'undefined'
							&& divsHijos[i].className.indexOf("article_header") != -1) {
							var correcto = true;
							var objValueSplit = objValue.split(separadorFiltroNewsBody);
							if (objValueSplit.length > 0) {
								var objValueTitulo = objValueSplit[0];
								var objValueTituloSplit = objValueTitulo.split(separadorFiltroNews);
								for (var j = 0; j < objValueTituloSplit.length; j++) {
									var valueToCompare = objValueTituloSplit[j];
									var negacion = false;
									if (valueToCompare.length > 1 && startsWith(valueToCompare, "!")) {
										negacion = true;
										valueToCompare = valueToCompare.substring(1);
									}
									if (!negacion && divsHijos[i].textContent.indexOf(valueToCompare) == -1) {
										correcto = false;
										break;
									} else if (negacion && divsHijos[i].textContent.indexOf(valueToCompare) != -1) {
										correcto = false;
										break;
									}
								}
							}
							if (correcto && objValueSplit.length > 1) {
								for (var k = i + 2; k < divsHijos.length; k++) {
									if (typeof divsHijos[k].className != 'undefined'
											&& divsHijos[k].className.indexOf("article_content") != -1) {
										var objValueBody = objValueSplit[1];
										var objValueBodySplit = objValueBody.split(separadorFiltroNews);
										for (var j = 0; j < objValueBodySplit.length; j++) {
											var valueToCompare = objValueBodySplit[j];
											var negacion = false;
											if (valueToCompare.length > 1 && startsWith(valueToCompare, "!")) {
												negacion = true;
												valueToCompare = valueToCompare.substring(1);
											}
											//alert(divsHijos[k].textContent + "---" + valueToCompare);
											if (!negacion && divsHijos[k].textContent.indexOf(valueToCompare) == -1) {
												correcto = false;
												break;
											} else if (negacion && divsHijos[k].textContent.indexOf(valueToCompare) != -1) {
												correcto = false;
												break;
											}
										}
									} else if (typeof divsHijos[k].className != 'undefined'
											&& divsHijos[k].className.indexOf("article_header") != -1) {
										break;
									}
								}
							}
							
							if (correcto) {
								if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
									divNews.innerHTML = '';
								}
								divNews.appendChild(divsHijos[i]);
								divNews.appendChild(divsHijos[i + 1]);
								divNews.appendChild(divsHijos[i + 2]);
							}
						}
					}
					//erpichi 20111122 - reiniciar noticias sin filtro
					if (llamarSiguiente) {
						posNews += newPosNews;
						get(window.location.href + "?newsAction=reload&first_news=" + posNews, function(text2) {filtrarNoticias(text2, objValue, posNews);});
					} else {
						if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
							divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">No hay noticias.</div></div>';
						}
						//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
						document.getElementById("news_filter").disabled = false;
						showPlayerFotoAlineacionIdeal();
						changePlayerLinksToSCRIPT();
						showVerAlineacionInNews();
					}
				} else {
					if (divNews.innerHTML == '<div class="barcenter"><div class="bar_content1">Buscando noticias...</div></div>') {
						divNews.innerHTML = '<div class="barcenter"><div class="bar_content1">No hay noticias.</div></div>';
					}
					//erpichi 20111129  - Al filtrar que ponga los datos SCRIPT y puntos
					document.getElementById("news_filter").disabled = false;
					showPlayerFotoAlineacionIdeal();
					changePlayerLinksToSCRIPT();
					showVerAlineacionInNews();
				}
			}
		}
		
		//erpichi 20111122 - reiniciar noticias sin filtro
		function changeFiltroNoticias(objValue) {
			if (objValue != "-1") {
				$(window).unbind("scroll");
			} else {
				var tn_count=0,tn_pos,tn_last=false,tn_load=false;$(window).scroll(function(){var b="display",a="#loadbar";if(tn_last)return false;var d=60,c=$(document).scrollTop();if($(document).scrollTop()+d+$(window).height()-$(document).height()>0&&c>tn_pos&&!tn_load){tn_load=true;$(a).css(b,"inline");tn_count++;$.ajax({type:"POST",url:"team_news.phtml",data:"newsAction=reload&first_news="+10*tn_count,success:function(c){tn_num=parseInt(c.substring(0,c.indexOf(";")));if(!isNaN(tn_num)&&tn_num<10)tn_last=true;$("#postwrap").append(c.substr(c.indexOf(";")+1));$(a).css(b,"none");tn_load=false},error:function(){$(a).css(b,"none");tn_load=false}})}tn_pos=c});
			}
		}
		
		var spans = document.getElementsByClassName("button01");
		for (var i = 0; i < spans.length; i++) {
			if (spans[i].childNodes.length > 0 
					&& spans[i].childNodes[0] != null
					&& spans[i].childNodes[0].textContent == "Enviar E-mail") {
				var filtroSpan = document.createElement("span");
				filtroSpan.innerHTML = '<select size="1" id="news_filter" onchange=\'if (this.value != "-1") {$(window).unbind("scroll");} else {var tn_count=0,tn_pos,tn_last=false,tn_load=false;$(window).scroll(function(){var b="display",a="#loadbar";if(tn_last)return false;var d=60,c=$(document).scrollTop();if($(document).scrollTop()+d+$(window).height()-$(document).height()>0&&c>tn_pos&&!tn_load){tn_load=true;$(a).css(b,"inline");tn_count++;$.ajax({type:"POST",url:"team_news.phtml",data:"newsAction=reload&first_news="+10*tn_count,success:function(c){tn_num=parseInt(c.substring(0,c.indexOf(";")));if(!isNaN(tn_num)&&tn_num<10)tn_last=true;$("#postwrap").append(c.substr(c.indexOf(";")+1));$(a).css(b,"none");tn_load=false},error:function(){$(a).css(b,"none");tn_load=false}})}tn_pos=c});}\'>'
//					+ '<option selected="selected" value="0">Filtro de noticias:</option>'
//					+ '<option value="0">todas las noticias</option>'
//					+ '<option value="2">Noticias internas</option>'
//					+ '<option value="3">Noticias privadas</option>'
//					+ '<option value="4">Fichajes</option>'
//					+ '<option value="5">penas disciplinarias/abonos</option>'
//					+ '<option value="6">System Information</option>'
//					+ '<option value="7">Administración del miembro</option>'
//					+ '<option value="8">Administración de la comunidad</option>'
//					+ '<option value="9">La mejor alineación</option>'
//					+ '<option value="10">Cambiar alineación</option>'
//					+ '<option value="11">Noticias escondidas</option>'
					+ '<option selected="selected" value="-1">Filtro de noticias:</option>'
					+ '<option value="">Todas las noticias</option>'
					+ '<option value="Computer \>">Noticias de Comunio</option>'
					+ '<option value="!Computer \>">Noticias de Usuarios</option>'
					//erpichi 20111122 - filtro puntos 
					+ '<option value="Computer \>|La computación de los puntos ha terminado">Cálculo de puntos</option>'
					+ '<option value="Computer \>|El cálculo de los puntos del juego de apuestas ha finalizado">Cálculo de puntos apuestas</option>'
					+ '<option value="Computer \>|Fichajes">Fichajes</option>'
					+ '<option value="Computer \>#Abono:">Abonos</option>'
					+ '<option value="Computer \>#Pena disciplinaria:">Penas disciplinarias</option>'
					+ '<option value="Computer \>|Once ideal de Comunio2012.com">Once ideal Comunio</option>'
					+ '<option value="Computer \>|La alineación se ha cambiado, la nueva alineación es">Cambiar alineación</option>'
					+ '<option value="!Computer \>|SCRIPT - Alineación">Publicar alineación SCRIPT</option>'
					+ '<option value="!Computer \>#Alineación:">Publicar alineación</option>'
					+ '<option value="!Computer \>|SCRIPT - Puntuación">Publicar puntuación SCRIPT</option>'
					+ '</select>'
				filtroSpan.childNodes[0].addEventListener("change", function() {filtrarNoticias(null, this.value, -1);}, false);
				
				spans[i].parentNode.appendChild(filtroSpan);
			}
		}

		//erpichi 20111106
		var listaJugadores = getPointsPlayerList();
		var listaJugadoresLesionados = getNoPlayerList();
		//erpichi 20111107
		var divMessage = document.getElementById("directMessage");
		var divCalculaAlineacion = document.createElement('div');
		divCalculaAlineacion.style.paddingBottom = "1em";
		divCalculaAlineacion.innerHTML = "<span class=\"contenttext\">Comprueba tu alineación</span>"
			+ "<textarea style=\"height: 4em;\" onchange=\"this.value=this.value.replace(/^\\s\\s*/, '').replace(/\\s\\s*$/, '');\" onblur=\"if(this.value == '') this.value = 'Introduce tu alineación';\" onfocus=\"if(this.value == 'Introduce tu alineación') this.value = '';\" class=\"textarea_news\" id=\"alineacionLine\">Introduce tu alineación</textarea>"
			+ "<div id='alineacionLinePuntos'></div><div id='alineacionLineEstado'></div>"
			+ "<div class=\"titleboxcontent\"><div class=\"edgetitle\"><b class=\"top\"><b class=\"e1\"></b><b class=\"e2\"></b><b class=\"e3\"></b><b class=\"e4\"></b><b class=\"e5\"></b><b class=\"e6\"></b><b class=\"e7\"></b><b class=\"e8\"></b><b class=\"e9\"></b><b class=\"e10\"></b><b class=\"e11\"></b></b></div><div class=\"titlecontent\">"
			+ "<h2><span class=\"button01\"><a id=\"alineacionPuntosGeneral\" title=\"Ver puntos alineación\" href=\"JavaScript:;\">Ver puntos alineación</a></span><span class=\"button01\"><a id=\"alineacionEstadoGeneral\" title=\"Ver estado alineación\" href=\"JavaScript:;\">Ver estado alineación</a></span><span class=\"button01\"><a title=\"Ver 11 ideal en CpC\" href=\"JavaScript:;\" onclick=\"window.open('http://www.eurocopa.calculapuntoscomunio.com/once_ideal/')\">Ver 11 ideal</a></span><span class=\"button01\"><a title=\"Visitar calculapuntoscomunio\" href=\"JavaScript:;\" onclick=\"window.open('http://www.eurocopa.calculapuntoscomunio.com/')\">Visitar CpC</a></span></h2></div></div>";

		divMessage.parentNode.insertBefore(divCalculaAlineacion, divMessage);
		
		var linkPuntosGeneral = document.getElementById('alineacionPuntosGeneral');
		linkPuntosGeneral.addEventListener( "click", function(){ calculaPuntosAlineacionGeneral();}, true );
		
		var linkEstadoGeneral = document.getElementById('alineacionEstadoGeneral');
		linkEstadoGeneral.addEventListener( "click", function(){ calculaEstadoAlineacionGeneral();}, true );
		
		//erpichi 20111129 - Al filtrar que ponga los datos SCRIPT y puntos
		function showVerAlineacionInNews() {
			//erpichi 20111106
			var padre = document.getElementById("postwrap");
			var divs = padre.getElementsByTagName("div");
			var indice = 0;
			for (var i = 0; i < divs.length; i++) {
//				if (divs[i].className == "newsheader"
//						&& divs[i].textContent.indexOf("SCRIPT - Alineación - ") != -1) {
////					var alineacion = divs[i].parentNode.nextSibling.nextSibling.childNodes[0].textContent;
////					alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
////					var alineacionSplit = alineacion.split(";");
////					divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML += calculaPuntosAlineacion(alineacionSplit, listaJugadores, indice);
	//
//					divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML = '<span>' + divs[i].parentNode.nextSibling.nextSibling.childNodes[0].innerHTML + '</span><br/><span style="float:right"><a id="linkPuntos' + indice + '" href="JavaScript:;">Ver Puntos</a></span> ';
//					var linkClick = document.getElementById('linkPuntos' + indice);
//					linkClick.addEventListener( "click", function(){ calculaPuntosAlineacionClick(this);}, true );
//					indice++;
//				}

				//erpichi 20111129 - Solo aparece Ver puntos en las alineaciones bien puestas
				if (divs[i].className == "article_content_text"
					//&& divs[i].textContent.indexOf("Alineación:") != -1) {
						&& startsWith(divs[i].textContent, "Alineación:")) {
//					var alineacion = divs[i].textContent;
//					alineacion = replaceAll(replaceAll(replaceAll(alineacion," - ", ";")," ;",";"),"Alineación: ","");
//					var alineacionSplit = alineacion.split(";");
//					divs[i].innerHTML += calculaPuntosAlineacion(alineacionSplit, listaJugadores, indice);

					divs[i].innerHTML = '<span class="verPuntos">' + divs[i].innerHTML + '</span><br/><span style="float:right"><a id="linkPuntos' + indice + '" href="JavaScript:;">Ver Puntos</a></span> ';
					var linkClick = document.getElementById('linkPuntos' + indice);
					linkClick.addEventListener( "click", function(){ calculaPuntosAlineacionClick(this);}, true );
					indice++;
				}
			}
		}
		showVerAlineacionInNews();
		
		var objects =[];
		//Obtain all the posts from news page
		var posts = document.getElementsByClassName("tableline02b");
		for( var i=0; i<posts.length; i++ ){
			objects.push(posts[i]);
		}
		var infoBox = document.getElementsByClassName("infoBox");
		for( var i=0; i<infoBox.length; i++ ){
			var infoRows = infoBox[i].getElementsByTagName("tr");
			for( var j=0; j< infoRows.length; j++ ){
				objects.push(infoRows[j].getElementsByTagName("td")[0]);
			}
		}

		for( var i=0; i<objects.length; i++ ){
			
			//Replace Smiles with their images
			objects[i].innerHTML = objects[i].innerHTML.replace(/:D/g,"<img src=\"" + images[':D'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\)\)/g,"<img src=\"" + images[':))'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/\*:\(/g,"<img src=\"" + images['\*:\('] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:oops:/g,"<img src=\"" + images[':oops:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:-\?/g,"<img src=\"" + images[':-?'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:8\)\)/g,"<img src=\"" + images[':8))'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:lol:/g,"<img src=\"" + images[':lol:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:xx/g,"<img src=\"" + images[':xx'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:P/g,"<img src=\"" + images[':P'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:o/g,"<img src=\"" + images[':o'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:cry:/g,"<img src=\"" + images[':cry:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:evil:/g,"<img src=\"" + images[':evil:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:roll:/g,"<img src=\"" + images[':roll:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:wink:/g,"<img src=\"" + images[':wink:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:zzz:/g,"<img src=\"" + images[':zzz:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/>:\)/g,"<img src=\"" + images['>:)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:love:/g,"<img src=\"" + images[':love:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:bier:/g,"<img src=\"" + images[':bier:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:x/g,"<img src=\"" + images[':x'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/8\)/g,"<img src=\"" + images['8)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:puke:/g,"<img src=\"" + images[':puke:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\)/g,"<img src=\"" + images[':)'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:clap:/g,"<img src=\"" + images[':clap:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:schimpf:/g,"<img src=\"" + images[':schimpf:'] + "\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/:\(/g,"<img src=\"" + images[':('] + "\" />");

			//Web links (http://, https://, file://, ftp://)
			var exp = /[^\]"](\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
			objects[i].innerHTML = objects[i].innerHTML.replace(exp,"<a href='$1'>$1</a>"); 
			
			//Image links ( [img][/img], [img=align][/img]
			objects[i].innerHTML = objects[i].innerHTML.replace(/\[img\](.*?)\[\/img\]/gi,"<img src=\"$1\" />");
			objects[i].innerHTML = objects[i].innerHTML.replace(/\[img=(.*?)\](.*?)\[\/img\]/gi,"<img src=\"$2\" align=\"$1\" />");

		}
	}

	//Get information from the forum (points, convocated players, ...)
	if ( window.location.href.indexOf( "lineup" ) != -1 ){

		//At points table, this function quits the player from the total sum
		function quitPlayerPoints( points ){
		
			var totalPointsCell = document.getElementById("totalPointsCell");	//Obtain the cell with the sum
			var total = totalPointsCell.textContent.split(":")[1];				//Only the number (TOTAL:22)
			var totalInt = parseInt( total, 10 );								//Parse it
			totalInt -= points;													//Quit
			totalPointsCell.textContent = totalPointsCell.textContent.replace(/\bTOTAL:-?[0-9]+/,'TOTAL:' + totalInt);	//Change the total sum
		}
		
		//At points table, it adds a player to the total sum
		function addPlayerPoints( playerRow ){
		
			var totalPointsTable = document.getElementById("totalPointsTable");		//Table where the sum it is
			var totalPointsCell = document.getElementById("totalPointsCell");		//Cell of the total sum
			
			var temp = playerRow.textContent.split(" ");							//Obtain the points of the player spliting it ( Villa 16 )
			var tempInt = parseInt( temp[temp.length-1], 10 );						//Parse points
			
			if( isNaN( tempInt ) ){													//If there is a problem or the player has no points... 0
				tempInt = 0;
			}
			
			var total = totalPointsCell.textContent.split(":")[1];					//Only the number (TOTAL:22)
			var totalInt = parseInt( total, 10 );									//Parse it
			totalInt += tempInt;													//Add points
			totalPointsCell.textContent = totalPointsCell.textContent.replace(/\bTOTAL:-?[0-9]+/,'TOTAL:' + totalInt);		//Change the total sum
			
			//Add the player name to the total sum column
			var newRow = totalPointsTable.insertRow(0);
			newRow.innerHTML = '<td><a href="javascript:;">' + playerRow.textContent + '</a></td>';
			//Put an event listener on it for quit from the sum if we want
			newRow.getElementsByTagName("a")[0].addEventListener( "click", function(){ this.parentNode.parentNode.removeChild(this.parentNode); quitPlayerPoints(tempInt) }, false);
		}
		

		var allTables = document.getElementsByTagName('table');
		var bigTable = document.createElement('table');
		bigTable.style.fontSize = "12px";
		
		bigTable.style.width = "100%";
		var mensajeAlineacion = imprimirAlineacion();
		bigTable.innerHTML = '<tr><td><table><tr><td>' + mensajeAlineacion + '</td></tr></table></td></tr>' +
							 '<tr><td><div style="text-align:center;padding:6px 0px 0px 0px;font-size: 0.8em;" class="boxcontentdown"><form style="display:inline" name="post" action="team_news.phtml" method="post"><input type="hidden" value="messageSubmitted" name="newsAction"><input type="hidden" id="titleMensajeAlineacion" value="SCRIPT - Alineación" name="headline"/><input type="hidden" name="message" id="message" value=""/><input type="hidden" value="-1" name="send"/><a onclick="document.getElementById(\'titleMensajeAlineacion\').value = \'SCRIPT - Alineación - \' + document.getElementById(\'jornadaHidden\').value" title="Publicar alineación" class="button02" href="javascript:submitForm(\'post\',\'send\');">Publicar alineación</a></form></div></td></tr>' +
							 '<tr><td><div style="text-align:center;padding:6px 0px 0px 0px;font-size: 0.93em;" class="boxcontentdown"><a title="Jugar con esta alineación" class="button01" href="javascript:submitForm(\'set_lineup\',\'playwiththislineup\');">Jugar con esta alineación</a></div></td></tr>' + 
							 '<tr><td><table cellspacing="0" cellpadding="0"><tr><td align="left"><a id="link1" href="JavaScript:;">*Puntos</a></td></tr><tr style="display:none" id="bigRow1"><td><table id="teamsTable"></table></td><td align="left"><table id="totalPointsTable"><tr><td id="totalPointsCell">TOTAL:0</td></tr></table></td></tr></table></td></tr>' +
							 '<tr><td><table cellspacing="0" cellpadding="0"><tr><td align="left"><a id="link5" href="JavaScript:;">*Alineacion ideal última jornada</a></td></tr><tr style="display:none" id="bigRow5"><td><table id="teamsTableIdeal"></table></td><td align="left"><table id="totalPointsTableIdeal"><tr><td id="totalPointsCellIdeal">TOTAL:0</td></tr></table></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a id="link6" href="JavaScript:;">*Puntos Foro Comunio</a></td></tr><tr style="display:none" id="bigRow6"><td id="puntosComunioCol"></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a id="link2" href="JavaScript:;">*Lesionados/Sancionados</a></td></tr><tr style="display:none" id="bigRow2"><td id="injuriedCol"></td></tr></table></td></tr>' +
							 '<tr><td><table><tr><td align="left"><a id="link3" href="JavaScript:;">*Convocados</a></td></tr><tr style="display:none" id="bigRow3"><td id="convCol"></td></tr></table></td></tr>' +
							 //erpichi 20111129 - Dar las gracias
							 '<tr><td><table><tr>Dad las gracias a los foreros que comparten esta información (J,A,E,, DARI y Gsus77)</tr></table></td></tr>' +
							 '<tr><td><style type="text/css"><!-- #bigRow4 .tablecontent03{font-size:1em;}--></style><table><tr><td align="left"><a id="link4" href="JavaScript:;">*Próximas Jornadas</a></td></tr><tr style="display:none" id="bigRow4"><td id="jornadaCol"></td></tr></table></td></tr>';
		
		allTables[ allTables.length-5].parentNode.insertBefore( bigTable, allTables[ allTables.length-5 ].nextSibling );
		document.getElementById("message").value = mensajeAlineacion;
		document.getElementById("lineup_bg").style.overflow="auto";
		var bigRow1 = document.getElementById("bigRow1");
		var bigRow5 = document.getElementById("bigRow5");
		var bigRow2 = document.getElementById("bigRow2");
		var bigRow6 = document.getElementById("bigRow6");
		var bigRow3 = document.getElementById("bigRow3");
		var bigRow4 = document.getElementById("bigRow4");

		var link1 = document.getElementById("link1");
		var link5 = document.getElementById("link5");
		var link6 = document.getElementById("link6");
		var link2 = document.getElementById("link2");
		var link3 = document.getElementById("link3");
		var link4 = document.getElementById("link4");
		
		//link1.addEventListener( "click", function(){ toggleDisplay(bigRow1);if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + "external/phpBB2/viewforum.php?f=33", getURLPoints ); }, true );
		link1.addEventListener( "click", function(){ toggleDisplay(bigRow1);if(this.textContent[0]!='*')return;calculaPuntos();}, true );
		link5.addEventListener( "click", function(){ toggleDisplay(bigRow5);if(this.textContent[0]!='*')return;calculaPuntosIdeal();}, true );
		link6.addEventListener( "click", function(){ toggleDisplay(bigRow6);if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=33', getURLPuntosComunio ); }, true );
		link2.addEventListener( "click", function(){ toggleDisplay(bigRow2);if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLNoPlayers ); }, true );
		link3.addEventListener( "click", function(){ toggleDisplay(bigRow3);if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'external/phpBB2/viewforum.php?f=27', getURLConv ); }, true );
		link4.addEventListener( "click", function(){ toggleDisplay(bigRow4);if(this.textContent[0]!='*')return;get( window.location.href.replace( "lineup.phtml", "" ) + 'calendarTip.phtml', getURLJornada );}, true );
		
	}  

	//erpichi 20111123 - Diferencia en puntos con los demas jugadores
if( window.location.href.indexOf( "standings.phtml" ) != -1) {
	var tablePuntos = document.getElementById("tablestandings");
	var trsPuntos = tablePuntos.getElementsByTagName("tr");
	var misPuntos = 0;
	var misValor = 0;

	var difPuntosTdTitle = document.createElement("td");
	difPuntosTdTitle.align = "right";
	difPuntosTdTitle.innerHTML = "Diferencia";
	if (trsPuntos[0].getElementsByTagName("td").length > 3) {
		trsPuntos[0].insertBefore(difPuntosTdTitle, trsPuntos[0].getElementsByTagName("td")[3]);
		var difValorTdTitle = document.createElement("td");
		difValorTdTitle.align = "right";
		difValorTdTitle.innerHTML = "Diferencia";
		trsPuntos[0].appendChild(difValorTdTitle);
	} else {
		trsPuntos[0].appendChild(difPuntosTdTitle);
	}
	for (var i = 1; i < trsPuntos.length; i++) {
		var tdsPuntos = trsPuntos[i].getElementsByTagName("td");
		if (tdsPuntos[1].innerHTML.indexOf('playerInfo.phtml?pid=' + userId + '"') != -1) {
			var puntosHTML = tdsPuntos[2].textContent;
			if (puntosHTML == "-") {
				puntosHTML = "0";
			}
			misPuntos = parseInt(puntosHTML);
			if (tdsPuntos.length > 3) {
				misValor = parseInt(replaceAll(tdsPuntos[3].textContent, ".", ""));
			}
			break;
		}
	}
	for (var i = 1; i < trsPuntos.length; i++) {
		var tdsPuntos = trsPuntos[i].getElementsByTagName("td");
		var difPuntosTd = document.createElement("td");
		difPuntosTd.align = "right";
		var difValorTd = document.createElement("td");
		difValorTd.align = "right";
		if (tdsPuntos[1].innerHTML.indexOf('playerInfo.phtml?pid=' + userId + '"') != -1) {
			difPuntosTd.innerHTML = "-";
			difValorTd.innerHTML = "-";
		} else {
			var puntosHTML = tdsPuntos[2].textContent;
			if (puntosHTML == "-") {
				puntosHTML = "0";
			}
			var diferenciaPuntos = parseInt(puntosHTML) - misPuntos;
			if (diferenciaPuntos > 0) {
				difPuntosTd.style.color = "RED";
			} else if (diferenciaPuntos < 0) {
				difPuntosTd.style.color = "#00FF00";
			}
			diferenciaPuntos = formateaNumero(diferenciaPuntos, ".", true);
			difPuntosTd.innerHTML = diferenciaPuntos;

			if (tdsPuntos.length > 3) {
				var diferenciaValor = parseInt(replaceAll(tdsPuntos[3].textContent, ".", "")) - misValor;
				if (diferenciaValor > 0) {
					difValorTd.style.color = "RED";
				} else if (diferenciaValor < 0) {
					difValorTd.style.color = "#00FF00";
				}
				diferenciaValor = formateaNumero(diferenciaValor, ".", true);
				difValorTd.innerHTML = diferenciaValor;
			}
		}
		if (tdsPuntos.length > 3) {
			trsPuntos[i].insertBefore(difPuntosTd, tdsPuntos[3]);
			trsPuntos[i].appendChild(difValorTd);
		} else {
			trsPuntos[i].appendChild(difPuntosTd);
		}
	}

	//erpichi 20111205 - En clasificacion poner fuerza
	function getAlineacionIdealFuerzaByFormacion(tablaJugadores, portero, defensa, centrocampista,delantero,posCompare) {
		var porteros = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Portero",portero,posCompare);
		var defensas = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Defensa",defensa,posCompare);
		var centrocampistas = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Centrocampista",centrocampista,posCompare);
		var delanteros = getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, "Delantero",delantero,posCompare);
		var alineacion = new Array();
		for (var i = 0; i < porteros.length; i++) {
			alineacion.push(porteros[i]);
		}
		for (var i = 0; i < defensas.length; i++) {
			alineacion.push(defensas[i]);
		}
		for (var i = 0; i < centrocampistas.length; i++) {
			alineacion.push(centrocampistas[i]);
		}
		for (var i = 0; i < delanteros.length; i++) {
			alineacion.push(delanteros[i]);
		}
		return alineacion;
	}
	
	function getAlineacionIdealFuerzaByPuestoAndFormacion(tablaJugadores, puesto, formacion, posCompare){
		var alineacion = new Array();
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var jugador = trs[i].getElementsByTagName("td");
			if (jugador[5].textContent == puesto) {
	            var jugadorNombreSolo = jugador[1].textContent;
	            var jugadorNombrePuntos = jugador[posCompare].textContent;
	            var jugadorNombre = jugadorNombreSolo + ":" + jugadorNombrePuntos;
	            var sinCalificar = false;
	            jugadorNombrePuntos = replaceAll(jugadorNombrePuntos, ".", "");
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            var sinCalificar2 = false;
					//erpichi 20111128 - Error en alineacion ideal del jugador
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            jugadorNombrePuntos2 = replaceAll(jugadorNombrePuntos2, ".", "");
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
		           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	    while(alineacion.length > formacion) {
	    	alineacion.pop();
	    }
	    //alert(alineacion);
		return alineacion;
	}
	
	function getAlineacionIdealFuerzaMensaje(tablaJugadores, porteros, defensas, centrocampistas, delanteros, listaJugadores, posCompare) {
		var retorno = new Array();
		
		//Alineacion 4-4-2
		var alineacion1442 = getAlineacionIdealFuerzaByFormacion(tablaJugadores, porteros,defensas,centrocampistas,delanteros,posCompare);
		var mensajePuntos1442 = "";
		var sumaTotal1442 = 0;
		for(var i = 0; i <alineacion1442.length; i++) {
			jugadorNombre = alineacion1442[i];
			if (jugadorNombre.indexOf(":")) {
				jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
			}
			tienePuntos = 0;
			for (var j = 1; j < listaJugadores.length; j++) {
				var jugadorTD = listaJugadores[j].getElementsByTagName("td");
				//TODO: convertir HTML to char
				//jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				var jugador2=jugadorTD[1].textContent;
				//alert(jugador2+"---"+trim(jugadorNombre));
				if ( trim(jugador2) == trim(jugadorNombre)) {
					mensajePuntos1442 += j + ",";
					tienePuntos = 1;
					var jugadorPuntosValue = replaceAll(jugadorTD[posCompare].textContent, ".", "");
					if (jugadorPuntosValue == parseInt(jugadorPuntosValue)){	
						sumaTotal1442 = sumaTotal1442 + parseInt(jugadorPuntosValue);
					}
					break;
				}
			}
			if (tienePuntos == 0) {
				//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": s.c. <br/>";
			}
		}

		retorno[0] = sumaTotal1442;
		retorno[1] = mensajePuntos1442;
		return retorno;
	}
	
	function getAlineacionIdealFuerza(tablaJugadores, posCompare) {
		var listaJugadores = tablaJugadores.getElementsByTagName("tr");
		var sumaTotal = 0;
		var retornoTotal = "";
		var retorno;

		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,4,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,3,4,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,3,5,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,3,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
		}
		retorno = getAlineacionIdealFuerzaMensaje(tablaJugadores, 1,4,5,1, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			retornoTotal = retorno;
		}

		return retornoTotal;
	}
	
	
	function obtenerFuerza(text, type, posicion, fuerzaId) {
		var totalFuerza = 0;
		var tableFuerza = "";
		var tableFuerzaIni = 0;
		do {
			tableFuerzaIni = text.indexOf("<table", tableFuerzaIni + 1);
			tableFuerza = text.substring(tableFuerzaIni, text.indexOf("</table>", tableFuerzaIni) ) + "</table>";
		} while (tableFuerzaIni != -1 && tableFuerza.indexOf("tablecontent03") == -1);
		if (tableFuerza.indexOf("tablecontent03") != -1) {
			var divTableFuerza = document.createElement("div");
			divTableFuerza.innerHTML = tableFuerza;
			var trJugFuerza = divTableFuerza.getElementsByTagName("tr");
			if (type == "todos") {
				for (var i = 1; i < trJugFuerza.length; i++) {
					var tdJugFuerza = trJugFuerza[i].getElementsByTagName("td");
					if (tdJugFuerza[5].textContent.indexOf(posicion) != -1) {
						totalFuerza += parseInt(tdJugFuerza[4].textContent);
					}
				}
			} else if (type == "ideal") {
				var retornoTotal = getAlineacionIdealFuerza(divTableFuerza, 4);
				var jugadoresSplit = retornoTotal[1].split(",");
				for (var i = 0; i < jugadoresSplit.length - 1; i++) {
					var tdJugFuerza = trJugFuerza[parseInt(jugadoresSplit[i])].getElementsByTagName("td");
					if (tdJugFuerza[5].textContent.indexOf(posicion) != -1) {
						totalFuerza += parseInt(tdJugFuerza[4].textContent);
					}
				}
			}
		} else {
//			totalFuerza = '<img border="0" alt="Error de conexión" title="Error de conexión" src="i/red_light.gif">';
			totalFuerza = '<img border="0" alt="Error de conexión" title="Error de conexión" src="' + images['red_light'] + '">';
		}
		document.getElementById(fuerzaId).innerHTML = totalFuerza;
	}
	
	if( window.location.href.indexOf( "standings.phtml?todos" ) != -1) {
		var typeFuerza = "todos";
		var posicion = "";
		if (window.location.href.indexOf("&") != -1) {
			posicion = window.location.href.substring(window.location.href.indexOf("&") + 1);
		}
		var divContent  = document.getElementById("contentleftst");
		if (divContent != null) {
			var titlePuntuacion = divContent.getElementsByTagName("h2");
			if (posicion == "") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Total (de todos los jugadores)";
			} else if (posicion == "Portero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Portero (de todos los jugadores)";
			} else if (posicion == "Defensa") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Defensa (de todos los jugadores)";
			} else if (posicion == "Centrocampista") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Centrocampista (de todos los jugadores)";
			} else if (posicion == "Delantero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Delantero (de todos los jugadores)";
			}
		}
		var tablaFuerza = document.getElementById("tablestandings");
		var trsFuerza = tablaFuerza.getElementsByTagName("tr");
		
		var fuerzaTdTitle = document.createElement("td");
		fuerzaTdTitle.align = "right";
		fuerzaTdTitle.innerHTML = "Fuerza";
		trsFuerza[0].appendChild(fuerzaTdTitle);
		for (var i = 1; i < trsFuerza.length; i++) {
			var tdsFuerza = trsFuerza[i].getElementsByTagName("td");
			var linkPlayer = tdsFuerza[1].getElementsByTagName("a")[0];
			var idFuerza = "fuerza" + i;
			var fuerzaTd = document.createElement("td");
			fuerzaTd.align = "right";
			fuerzaTd.id = idFuerza;
			fuerzaTd.innerHTML = '<img width="20px" height="20px" title="cargando fuerza..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(fuerzaTd);
			eval("get(linkPlayer.href, function(text2) {obtenerFuerza(text2, typeFuerza, posicion, '" + idFuerza + "');})");
		}
	}
	
	if( window.location.href.indexOf( "standings.phtml?ideal" ) != -1) {
		var typeFuerza = "ideal";
		var posicion = "";
		if (window.location.href.indexOf("&") != -1) {
			posicion = window.location.href.substring(window.location.href.indexOf("&") + 1);
		}
		var divContent  = document.getElementById("contentleftst");
		if (divContent != null) {
			var titlePuntuacion = divContent.getElementsByTagName("h2");
			if (posicion == "") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Total (de alineación ideal)";
			} else if (posicion == "Portero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Portero (de alineación ideal)";
			} else if (posicion == "Defensa") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Defensa (de alineación ideal)";
			} else if (posicion == "Centrocampista") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Centrocampista (de alineación ideal)";
			} else if (posicion == "Delantero") {
				titlePuntuacion[0].innerHTML += " - Fuerza: Delantero (de alineación ideal)";
			}
		}
		var tablaFuerza = document.getElementById("tablestandings");
		var trsFuerza = tablaFuerza.getElementsByTagName("tr");
		
		var fuerzaTdTitle = document.createElement("td");
		fuerzaTdTitle.align = "right";
		fuerzaTdTitle.innerHTML = "Fuerza";
		trsFuerza[0].appendChild(fuerzaTdTitle);
		for (var i = 1; i < trsFuerza.length; i++) {
			var tdsFuerza = trsFuerza[i].getElementsByTagName("td");
			var linkPlayer = tdsFuerza[1].getElementsByTagName("a")[0];
			var idFuerza = "fuerza" + i;
			var fuerzaTd = document.createElement("td");
			fuerzaTd.align = "right";
			fuerzaTd.id = idFuerza;
			fuerzaTd.innerHTML = '<img width="20px" height="20px" title="cargando fuerza..."  src="data:image/png;base64,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"/>';
			trsFuerza[i].appendChild(fuerzaTd);
			eval("get(linkPlayer.href, function(text2) {obtenerFuerza(text2, typeFuerza, posicion, '" + idFuerza + "');})");
		}
	}

	//erpichi 20111123 - En clasificacion poner fuerza
	var divPadreFuerza = document.getElementById("contentleftst");
	
	divPadreFuerza.innerHTML += '<div class="spacer10px"></div>';
	divPadreFuerza.innerHTML += '<div class="titleboxcontent"><div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div><div class="titlecontent"><h2>Fuerza</h2></div></div>';
	
	//todos los jugadores
	divPadreFuerza.innerHTML += '<div id="fuerzaTodos" style="float:left;width:299px;margin:0px 1px 0px 0px;">'
		+ '<div class="titleboxcontent">'
		+ '<div class="bar"><span onmouseout="mclosetime()" onmouseover="mopentime(\'strength2\');"><img width="11" height="8" alt="" style="margin:7px 0px 0px 5px;" src="i/1/i_triangle.png"> Todos los jugadores:</span></div>'
		+ '</div>'
		+ '<div style="margin:0px 0px 0px 0px;text-align:left;visibility:hidden;position:absolute;text-decoration:underline;padding:5px;min-width:290px;width:auto !important;width:240px;min-height:20px;height:auto !important;height:20px;" id="strength2" onmouseout="mclosetime()" onmouseover="mcanceltimer()">'
		+ '<ul style="list-style:none;padding:0px 0px 3px 0px;font-size:0.6em;">'
		+ '<li><span class="strengthbutton"><a title="Total" target="_self" href="standings.phtml?todos">Total</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Portero" target="_self" href="standings.phtml?todos&Portero">Portero</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Defensa" target="_self" href="standings.phtml?todos&Defensa">Defensa</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Centrocampista" target="_self" href="standings.phtml?todos&Centrocampista">Centrocampista</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Delantero" target="_self" href="standings.phtml?todos&Delantero">Delantero</a></span></li>'
		+ '</ul>'
		+ '</div>'
		+ '</div>';
	
	//jugadores última alineacion publicada
	divPadreFuerza.innerHTML += '<div id="fuerzaAlineacion" style="float:right;width:300px;">'
		+ '<div class="titleboxcontent">'
		+ '<div class="bar"><span onmouseout="mclosetime()" onmouseover="mopentime(\'strength1\');"><img width="11" height="8" alt="" style="margin:7px 0px 0px 5px;" src="i/1/i_triangle.png"> Alineación ideal:</span></div>'
		+ '</div>'
		+ '<div style="margin:0px 0px 0px 0px;text-align:left;visibility:hidden;position:absolute;text-decoration:underline;padding:5px;min-width:289px;width:auto !important;width:239px;min-height:20px;height:auto !important;height:20px;" id="strength1" onmouseout="mclosetime()" onmouseover="mcanceltimer()">'
		+ '<ul style="list-style:none;padding:0px 0px 3px 0px;font-size:0.6em;">'
		+ '<li><span class="strengthbutton"><a title="Total" target="_self" href="standings.phtml?ideal">Total</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Portero" target="_self" href="standings.phtml?ideal&Portero">Portero</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Defensa" target="_self" href="standings.phtml?ideal&Defensa">Defensa</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Centrocampista" target="_self" href="standings.phtml?ideal&Centrocampista">Centrocampista</a></span></li>'
		+ '<li><span class="strengthbutton"><a title="Delantero" target="_self" href="standings.phtml?ideal&Delantero">Delantero</a></span></li>'
		+ '</ul>'
		+ '</div>'
		+ '</div>';
	
}

//erpichi 20111124 - Mostrar última alineacion publicada, alineacion ideal, alineacion ideal última jornada, en playerInfo
if( window.location.href.indexOf( "playerInfo.phtml" ) != -1) {

	function getAlineacionIdealJugadorByFormacion(portero, defensa, centrocampista,delantero,posCompare) {
		var porteros = getAlineacionIdealJugadorByPuestoAndFormacion("Portero",portero,posCompare);
		var defensas = getAlineacionIdealJugadorByPuestoAndFormacion("Defensa",defensa,posCompare);
		var centrocampistas = getAlineacionIdealJugadorByPuestoAndFormacion("Centrocampista",centrocampista,posCompare);
		var delanteros = getAlineacionIdealJugadorByPuestoAndFormacion("Delantero",delantero,posCompare);
		var alineacion = new Array();
		for (var i = 0; i < porteros.length; i++) {
			alineacion.push(porteros[i]);
		}
		for (var i = 0; i < defensas.length; i++) {
			alineacion.push(defensas[i]);
		}
		for (var i = 0; i < centrocampistas.length; i++) {
			alineacion.push(centrocampistas[i]);
		}
		for (var i = 0; i < delanteros.length; i++) {
			alineacion.push(delanteros[i]);
		}
		return alineacion;
	}
	
	function getAlineacionIdealJugadorByPuestoAndFormacion(puesto, formacion, posCompare){
		var alineacion = new Array();
		var div = document.getElementById("contentfullsizeib");
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var trs = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trs.length; i++) {
			var jugador = trs[i].getElementsByTagName("td");
			if (jugador[6].textContent == puesto) {
	            var jugadorNombreSolo = jugador[2].textContent;
	            var jugadorNombrePuntos = jugador[posCompare].textContent;
	            var jugadorNombre = jugadorNombreSolo + ":" + jugadorNombrePuntos;
	            var sinCalificar = false;
	            jugadorNombrePuntos = replaceAll(jugadorNombrePuntos, ".", "");
	            if (jugadorNombrePuntos.indexOf("s.c") != -1) {
		            jugadorNombrePuntos = jugadorNombrePuntos.replace("s.c","0");
		            sinCalificar = true;
	            }
	            var puntos = parseInt(jugadorNombrePuntos);
	            var posicion = alineacion.length;
	            for(var k = 0; k < alineacion.length; k++) {
	            	posicion = -1;
	            	var jugadorNombre2 = alineacion[k];
		            var jugadorNombreSolo2 = jugadorNombre2.substring(0,jugadorNombre2.indexOf(":"));
		            var jugadorNombrePuntos2 = jugadorNombre2.substring(jugadorNombre2.indexOf(":") + 1);
		            var sinCalificar2 = false;
					//erpichi 20111128 - Error en alineacion ideal del jugador
		            if (jugadorNombrePuntos2.indexOf("s.c") != -1) {
			            jugadorNombrePuntos2 = jugadorNombrePuntos2.replace("s.c","0");
			            sinCalificar2 = true;
		            }
		            jugadorNombrePuntos2 = replaceAll(jugadorNombrePuntos2, ".", "");
		            var puntos2 = parseInt(jugadorNombrePuntos2);
		            //alert(puntos + "-" + puntos2 + "-" + jugadorNombreSolo + "-" + jugadorNombreSolo2 + "-'" + jugadorNombrePuntos + "'-'" + jugadorNombrePuntos2 + "'");
		            if (jugadorNombreSolo != jugadorNombreSolo2 && puntos > puntos2) {
		            	if ((puntos > puntos2)
		            			|| (puntos == 0 && puntos2 == 0 && !sinCalificar && sinCalificar2)) {
			            	posicion = k;
			            	break;
		            	}
		            } else if (jugadorNombreSolo == jugadorNombreSolo2) {
		            	posicion = -2;
		            	break;
		            }
	            }
		           // alert("Formacion-" + formacion + "-Posicion-" + posicion + "-Length-" + alineacion.length + "-Jugador-"+jugadorNombre);
	            //alert(alineacion.length + "-" + formacion + "-" + jugadorNombre);
	            if (posicion >= 0 && posicion < alineacion.length) {
	            	//alert("metemos en posicion " + posicion);
	            	alineacion.splice(posicion, 0, jugadorNombre);
	            } else if (posicion != -2 && alineacion.length < formacion) {
	            	//alert("metemos al final");
					alineacion.push(jugadorNombre);
	            }
			}
		}
	    while(alineacion.length > formacion) {
	    	alineacion.pop();
	    }
	    //alert(alineacion);
		return alineacion;
	}
	
	function getAlineacionIdealTotalMensaje(porteros, defensas, centrocampistas, delanteros, listaJugadores, posCompare) {
		var retorno = new Array();
		
		var mensajePuntosIni = '<tbody>';
		
		var mensajePuntosDelanterosIni = '<tr class="tr1"><td width="500" height="172" align="center" style="background-image:url(\'i/1/lineup_striker_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: bottom;"><table><tbody><tr>';
		var mensajePuntosDelanterosImagen = '<td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosDelanterosSeparacion = '</tr><tr>';
		var mensajePuntosDelanterosNombre = '<td style="color:white;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;">-</td>';
		var mensajePuntosDelanterosFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosCentrocampistasIni = '<tr class="tr1"><td width="500" height="109" align="center" style="background-image:url(\'i/1/lineup_midfielder_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: middle;"><table><tbody><tr>';
		var mensajePuntosCentrocampistasImagen = '<td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosCentrocampistasSeparacion = '</tr><tr>';
		var mensajePuntosCentrocampistasNombre = '<td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td>';
		var mensajePuntosCentrocampistasFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosDefensasIni = '<tr class="tr1"><td width="500" height="137" align="center" style="background-image:url(\'i/1/lineup_defender_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: middle;"><table><tbody><tr>';
		var mensajePuntosDefensasImagen = '<td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosDefensasSeparacion = '</tr><tr>';
		var mensajePuntosDefensasNombre = '<td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td>';
		var mensajePuntosDefensasFin = '</tr></tbody></table></td></tr>';

		var mensajePuntosPorterosIni = '<tr class="tr1"><td width="500" height="73" align="center" style="background-image:url(\'i/1/lineup_keeper_bg.gif\'); background-repeat:no-repeat; vertical-align: top;"><table><tbody><tr>';//background-position:center; 
		var mensajePuntosPorterosImagen = '<td style="background-color:transparent;text-align:center;vertical-align:top;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td>';
		var mensajePuntosPorterosSeparacion = '</tr><tr>';
		var mensajePuntosPorterosNombre = '<td style="color:white;background-color:black;text-align:center;vertical-align:top;font-family:Arial;font-size:10px;">-</td>';
		var mensajePuntosPorterosFin = '</tr></tbody></table></td></tr>';
		
		var mensajePuntosFin = '</tbody>';
		
		//Alineacion 4-4-2
		var alineacion1442 = getAlineacionIdealJugadorByFormacion(porteros,defensas,centrocampistas,delanteros,posCompare);
		var mensajePuntos1442 = "";
		var mensajePuntos1442DelanterosImagen = "";
		var mensajePuntos1442DelanterosNombre = "";
		var mensajePuntos1442CentrocampistasImagen = "";
		var mensajePuntos1442CentrocampistasNombre = "";
		var mensajePuntos1442DefensasImagen = "";
		var mensajePuntos1442DefensasNombre = "";
		var mensajePuntos1442PorterosImagen = "";
		var mensajePuntos1442PorterosNombre = "";
		var sumaTotal1442 = 0;
		for(var i = 0; i <alineacion1442.length; i++) {
			jugadorNombre = alineacion1442[i];
			if (jugadorNombre.indexOf(":")) {
				jugadorNombre = jugadorNombre.substring(0, jugadorNombre.indexOf(":"));
			}
			tienePuntos = 0;
			for (var j = 1; j < listaJugadores.length; j++) {
				var jugadorTD = listaJugadores[j].getElementsByTagName("td");
				//TODO: convertir HTML to char
				//jugador2=replaceAll(listaJugadores[j][0],"&ntilde;","n");
				var jugador2=jugadorTD[2].textContent;
				//alert(jugador2+"---"+trim(jugadorNombre));
				if ( jugador2 == trim(jugadorNombre)) {
//					var imageTD = jugadorTD[0].innerHTML.substring(jugadorTD[0].innerHTML.indexOf("<img"), jugadorTD[0].innerHTML.indexOf(">", jugadorTD[0].innerHTML.indexOf("<img"))).replace("tradablePhoto.phtml/m/", "tradablePhoto.phtml/s/");
					var imageTD = jugadorTD[0].innerHTML.substring(jugadorTD[0].innerHTML.indexOf("<img"), jugadorTD[0].innerHTML.indexOf(">", jugadorTD[0].innerHTML.indexOf("<img"))).replace("height='30'", "height='50'").replace("height=\"30\"", "height=\"50\"");
					if (jugadorTD[6].textContent == "Delantero") {
						mensajePuntos1442DelanterosImagen += mensajePuntosDelanterosImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442DelanterosNombre += mensajePuntosDelanterosNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[6].textContent == "Centrocampista") {
						mensajePuntos1442CentrocampistasImagen += mensajePuntosCentrocampistasImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442CentrocampistasNombre += mensajePuntosCentrocampistasNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[6].textContent == "Defensa") {
						mensajePuntos1442DefensasImagen += mensajePuntosDefensasImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442DefensasNombre += mensajePuntosDefensasNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					} else if (jugadorTD[6].textContent == "Portero") {
						mensajePuntos1442PorterosImagen += mensajePuntosPorterosImagen.replace('<img alt="No Player" src="./i/i/tradable_dummy_small_x.gif">', imageTD);
						mensajePuntos1442PorterosNombre += mensajePuntosPorterosNombre.replace(">-<", ">" + jugadorNombre + "<br>" +jugadorTD[posCompare].textContent + "<");
					}
					//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": " +jugadorTD[5].textContent + "<br/>";
					tienePuntos = 1;
					var jugadorPuntosValue = replaceAll(jugadorTD[posCompare].textContent, ".", "");
					if (jugadorPuntosValue == parseInt(jugadorPuntosValue)){	
						sumaTotal1442 = sumaTotal1442 + parseInt(jugadorPuntosValue);
					}
					break;
				}
			}
			if (tienePuntos == 0) {
				//mensajePuntos1442 = mensajePuntos1442 + jugadorNombre + ": s.c. <br/>";
			}
		}
		mensajePuntos1442DelanterosImagen = mensajePuntosDelanterosIni + mensajePuntos1442DelanterosImagen + mensajePuntosDelanterosSeparacion + mensajePuntos1442DelanterosNombre + mensajePuntosDelanterosFin;
		mensajePuntos1442CentrocampistasImagen = mensajePuntosCentrocampistasIni + mensajePuntos1442CentrocampistasImagen + mensajePuntosCentrocampistasSeparacion + mensajePuntos1442CentrocampistasNombre + mensajePuntosCentrocampistasFin;
		mensajePuntos1442DefensasImagen = mensajePuntosDefensasIni + mensajePuntos1442DefensasImagen + mensajePuntosDefensasSeparacion + mensajePuntos1442DefensasNombre + mensajePuntosDefensasFin;
		mensajePuntos1442PorterosImagen = mensajePuntosPorterosIni + mensajePuntos1442PorterosImagen + mensajePuntosPorterosSeparacion + mensajePuntos1442PorterosNombre + mensajePuntosPorterosFin;
		mensajePuntos1442 = mensajePuntosIni + mensajePuntos1442DelanterosImagen + mensajePuntos1442CentrocampistasImagen + mensajePuntos1442DefensasImagen + mensajePuntos1442PorterosImagen + mensajePuntosFin;
		mensajePuntos1442Resumen = "<b>Formación:</b> " + defensas + "-" + centrocampistas + "-" + delanteros +" <strong>Total: "+formateaNumero(sumaTotal1442, ".", false)+"</strong>";

		retorno[0] = sumaTotal1442;
		retorno[1] = mensajePuntos1442;
		retorno[2] = mensajePuntos1442Resumen;
		return retorno;
	}
	
	function showAlineacionIdealTotal(idAlineacion, posCompare) {
		var div = document.getElementById("contentfullsizeib");
		var table = div.childNodes;
		var tablaJugadores;
		for (var i = 0; i < table.length; i++) {
			if (table[i].className == "tablecontent03") {
				tablaJugadores = table[i];
				break;
			}
		}
		var listaJugadores = tablaJugadores.getElementsByTagName("tr");
//		var jugador2 = "";
		var mensajePuntos = "";
		var mensajePuntosResumen = "";
		var sumaTotal = 0;

		var retorno = getAlineacionIdealTotalMensaje(1,4,4,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,3,4,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,3,5,2, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,4,3,3, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}
		retorno = getAlineacionIdealTotalMensaje(1,4,5,1, listaJugadores, posCompare);
		if (retorno[0] > sumaTotal) {
			sumaTotal = retorno[0];
			mensajePuntos = retorno[1];
			mensajePuntosResumen = retorno[2];
		}

		document.getElementById(idAlineacion).innerHTML = mensajePuntos;
		document.getElementById(idAlineacion + "Resumen").innerHTML = mensajePuntosResumen;
	}
	
	function crearAlineacionIdealTotal(idAlineacion, labelAlineacion, posCompare) {
		var divPadreAlineacion = document.getElementById("contentfullsizeib");
		
		var divAlineacionIdealTotal = document.createElement("div");
		divAlineacionIdealTotal.innerHTML += '<div class="titleboxcontent">'
			+ '<div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div>'
			+ '<div class="titlecontent"><h2><a id="'+ idAlineacion +'Link" href="javascript:;" ><b>' + labelAlineacion + '</b></h2></a></div>'
			+ '</div>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[2]);
		divAlineacionIdealTotal.innerHTML += '<table id="' + idAlineacion +'" cellspacing="0" cellpadding="0" border="0" style="display: none;">'
			+ '<tbody><tr class="tr1"><td width="500" height="172" align="center" style="background-image:url(\'i/1/lineup_striker_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: bottom;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:bottom;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:bottom;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="500" height="109" align="center" style="background-image:url(\'i/1/lineup_midfielder_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: middle;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="500" height="137" align="center" style="background-image:url(\'i/1/lineup_defender_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: middle;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td><td style="background-color:transparent;text-align:center;vertical-align:middle;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td><td style="color:white;background-color:black;text-align:center;vertical-align:middle;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '<tr class="tr1"><td width="500" height="73" align="center" style="background-image:url(\'i/1/lineup_keeper_bg.gif\'); background-repeat:no-repeat; background-position:center; vertical-align: top;"><table><tbody><tr><td style="background-color:transparent;text-align:center;vertical-align:top;"><img alt="No Player" src="./i/i/tradable_dummy_small_x.gif"></td></tr><tr><td style="color:white;background-color:black;text-align:center;vertical-align:top;font-family:Arial;font-size:10px;">-</td></tr></tbody></table></td></tr>'
			+ '</tbody></table>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[3]);
		divAlineacionIdealTotal.innerHTML += '<div class="boxcontentdown"><div id="' + idAlineacion + 'Resumen" class="bar_content_r"></div></div>';
		divAlineacionIdealTotal.innerHTML += '<div class="spacer10px"></div>';
		//divAlineacionIdealTotal.insertBefore(divAlineacionIdealTotal.childNodes[divAlineacionIdealTotal.childNodes.length - 1], divAlineacionIdealTotal.childNodes[4]);

		//alert(divAlineacionIdealTotal.innerHTML);
		divPadreAlineacion.insertBefore(divAlineacionIdealTotal, divPadreAlineacion.childNodes[2]);
		//divPadreAlineacion.appendChild(divAlineacionIdealTotal);
		
		var alineacionIdealTotalLink = document.getElementById(idAlineacion + "Link");
		var alineacionIdealTotal = document.getElementById(idAlineacion);
		alineacionIdealTotalLink.addEventListener( "click", function(){ toggleDisplay(alineacionIdealTotal);showAlineacionIdealTotal(idAlineacion, posCompare);}, true );
	}

	//erpichi 20111125 - Estilos en playerInfo
	//erpichi 20111130 - Comentados porque los arregla comunio
	//erpichi 20111205 - El estilo se ve mal en www.comunio.es y bien en www*.comunio.es
	if (document.location.href.indexOf('www.comunio2012.com') != -1) {
		var divPlayerInfo = document.getElementById("contentfullsizeib");
		if (divPlayerInfo != null) {
			divPlayerInfo.style.padding = "0 0 0 10px";
		}
	}

	//erpichi 20111125 - Cambio titulos en playerInfo
	crearAlineacionIdealTotal("alineacionIdealPrecio", "Alineación ideal (Valor de mercado)", 4);
	crearAlineacionIdealTotal("alineacionIdealUltimaJornada", "Alineación ideal (Puntos última jornada)", 8);
	crearAlineacionIdealTotal("alineacionIdealTotal", "Alineación ideal (Puntos totales)", 5);
	
}

var menuJugador = document.getElementById("playactiv");
if (menuJugador != null) {
	var ulsMenu = menuJugador.getElementsByTagName("ul");
	ulsMenu[3].innerHTML += '<li><span class="subsubnav"><div class="subsubnav_i_arrow"></div><a title="Seguir jugadores" target="_self" href="exchangemarket.phtml?jugadores">Seguir jugadores</a></span></li>';
}

if (window.location.href.indexOf( "exchangemarket.phtml?jugadores" ) != -1) {
	var listado = '<span class="contenttext">Aquí puedes ver a todos los jugadores y seguir a los que te interesen. Escribe en el campo de texto para filtrar. Si pulsas en Seguir, podras ver la diferencia en el valor de mercado y en los puntos desde la fecha en que lo estas siguiendo. Pulsa Dejar para quitar el seguimiento de ese jugador.</span>'
		+ '<div class="spacer10px"></div>'
		+ '<div class="titleboxcontent">'
		+ '<div class="edgetitle"><b class="top"><b class="e1"></b><b class="e2"></b><b class="e3"></b><b class="e4"></b><b class="e5"></b><b class="e6"></b><b class="e7"></b><b class="e8"></b><b class="e9"></b><b class="e10"></b><b class="e11"></b></b></div>'
		+ '<div class="titlecontent"><h2><span class="button02">Filtrar: <input id="jugFiltrar" type="text" class="textinput" value="" maxlength="20" size="30" /></span></h2><h2><span class="button02">Posicion: <select class="textinput" id="jugFiltrarPosicion"><option value="">Cualquiera</option><option value="Portero">Portero</option><option value="Defensa">Defensa</option><option value="Centrocampista">Centrocampista</option><option value="Delantero">Delantero</option></select></span></h2><h2><span class="button02"><input type="checkbox" id="jugFiltrarCheck" /> Solo seguimiento</span></h2></div>'
		+ '</div>'
		+ '<table id="tablaJugadores" cellspacing="1" cellpadding="2" border="0" class="tablecontent03"><tbody>'
		+ '<tr>'
		+ '<td align="center"></td>'
		+ '<td align="center">Nombre</td>'
		+ '<td align="center">Equipo</td>'
		+ '<td align="center">Seguimiento</td>'
		+ '<td align="center">Posicion</td>'
		+ '<td align="center">Valor de mercado</td>'
		+ '<td align="center">Dif. Valor</td>'
		+ '<td align="center">Puntos</td>'
		+ '<td align="center">Dif. Puntos</td>'
		+ '<td align="center"></td>'
		+ '<td align="center"></td>'
		+ '</tr>';

	var iJugadores = 0;
	for (var jugNombre in playerID) {
		if (jugNombre != null && jugNombre.length > 0) {
			var jugId = playerID[jugNombre];
			var jugFoto = playerIDNameFoto[jugNombre];
			var jugPuntos = "s.c.";
			if (playerIDNamePuntos[jugNombre]) {
				jugPuntos = playerIDNamePuntos[jugNombre];
			}
			var urlPuntos = "http://www.eurocopa.calculapuntoscomunio.com/puntos/";
			var jugEstado = calculaEstadoScript(jugNombre);
			var jugEquipo = playerIDNameEquipo[jugNombre];
			var jugPosicion = playerIDNamePosicion[jugNombre];
			var jugTotales = playerIDNameTotales[jugNombre];
			var jugMercado = playerIDNameMercado[jugNombre];

			var jugSeguir = "";
			var jugSiguiendo = false;
			var jugSiguiendoSplit;
			var jugStorage = localStorage.getItem("scriptSeguir" + jugId);
			if (jugStorage != null && jugStorage != "") {
				jugSiguiendo = true;
				jugSiguiendoSplit = jugStorage.split("/-/");
				var jugSiguiendoFecha = "-";
				if (jugSiguiendoSplit.length >= 4) {
					jugSiguiendoFecha = jugSiguiendoSplit[3];
				}
				jugSeguir = '<td align="right">'+jugSiguiendoFecha+'<h2><span class="button02"><a id="dejarJug' + jugId + '" name="dejarJug" title="Dejar de seguir" href="javascript:;">Dejar</a></span></h2></td>';
			} else {
				jugSeguir = '<td align="center"><h1><span class="button02"><a id="seguirJug' + jugId + '" name="seguirJug" title="Seguir" href="javascript:;">Seguir</a></span></h1></td>';
			}
			var jugDifTotales = "-";
			var jugDifMercado = "-";
			
			if (jugSiguiendo) {
				if (jugSiguiendoSplit.length >= 2) {
					jugDifTotales = jugSiguiendoSplit[1];

					jugDifTotales = replaceAll(jugDifTotales, ".", "");
					var jugTotalesCalc = replaceAll(jugTotales, ".", "");
					var diferencia =  parseInt(jugTotalesCalc) - parseInt(jugDifTotales);
					jugDifTotales = formateaNumero(diferencia, ".", true);
					if (diferencia > 0) {
						jugDifTotales = "<span style='color:#00FF00'>" + jugDifTotales + "</span>";
					} else if (diferencia < 0) {
						jugDifTotales = "<span style='color:RED'>" + jugDifTotales + "</span>";
					} else {
						jugDifTotales = "<span>" + jugDifTotales + "</span>";
					}
				}
				if (jugSiguiendoSplit.length >= 3) {
					jugDifMercado = jugSiguiendoSplit[2];

					jugDifMercado = replaceAll(jugDifMercado, ".", "");
					var jugMercadoCalc = replaceAll(jugMercado, ".", "");
					var diferencia =  parseInt(jugMercadoCalc) - parseInt(jugDifMercado);
					jugDifMercado = formateaNumero(diferencia, ".", true);
					if (diferencia > 0) {
						jugDifMercado = "<span style='color:#00FF00'>" + jugDifMercado + "</span>";
					} else if (diferencia < 0) {
						jugDifMercado = "<span style='color:RED'>" + jugDifMercado + "</span>";
					} else {
						jugDifMercado = "<span>" + jugDifMercado + "</span>";
					}
				}
			}

			iJugadores = iJugadores + 1;
			var trClass = 'class="tr1"';
			if (iJugadores % 2 == 0) {
				trClass = 'class="tr2"';
			}
			listado += '<tr ' + trClass + '>';
			listado += '<td align="left"><a href="tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '" onclick="return(openSmallWindow(\'tradableInfo.phtml?tid=' + jugId + '&userId=' + userId + '\'))" target="_blank" >' + jugNombre + '</a></td>';
			listado += '<td align="center" width="5%">' + '<img src="' + images[ jugEquipo ] + '" alt=' + jugEquipo +' title=' +jugEquipo + ' border="0" />' + '</td>';
			listado += jugSeguir;
			listado += '<td align="left">' + jugPosicion + '</td>';
			listado += '<td align="right">' + jugMercado + '</td>';
			listado += '<td align="right">' + jugDifMercado + '</td>';
			listado += '<td align="right">' + jugTotales + '</td>';
			listado += '<td align="right">' + jugDifTotales + '</td>';
			listado += '<td align="right" width="5%">' + jugEstado + '</td>';
			listado += '<td align="right" width="5%">' + "<a  style='text-decoration: none;' title='Click aquí para ver los puntos en CpC.' href='javascript:;' onclick=\"window.open('" + urlPuntos + "')\" >" + '<div>' + jugPuntos + '</div>' + "</a>" + '</td>';
			listado += '</tr>';
		}
	}
	if (iJugadores == 0) {
		listado += '<tr class="tr1">';
		listado += '<td align="center" colspan="2">No se encuentran jugadores</td>';
		listado += '</tr>';
	}
	
	
	listado += '</tbody></table>'
		+ '<div class="boxcontentdown"><div class="bar_content_l"></div><div class="bar_content_r"></div></div><div class="spacer10px"></div>';

	var title = document.getElementById("title");
	if (title != null) {
		title.innerHTML = '<h1><span class="heading">Seguir jugadores</span></h1>';
	}
	
	function activarSeguirJugadores() {
		//Add seguir capability	
		var btnsSeguir = document.getElementsByName("seguirJug");
		for (var i = 0; i < btnsSeguir.length; i++) {
			btnsSeguir[i].addEventListener( "click", function(){ seguirJugadores(this);}, true );
		}

		//Add dejar capability	
		var btnsDejar = document.getElementsByName("dejarJug");
		for (var i = 0; i < btnsDejar.length; i++) {
			btnsDejar[i].addEventListener( "click", function(){ dejarJugadores(this);}, true );
		}
	}
	
	var contentfullsize = document.getElementById("contentfullsize");
	if (contentfullsize != null) {
		
		contentfullsize.innerHTML = listado;
		var jugFiltrar = document.getElementById("jugFiltrar");
		if (jugFiltrar != null) {
			jugFiltrar.addEventListener( "keyup", function(){ filtrarJugadores();}, true );
		}
		var jugFiltrarPosicion = document.getElementById("jugFiltrarPosicion");
		if (jugFiltrarPosicion != null) {
			jugFiltrarPosicion.addEventListener( "change", function(){ filtrarJugadores();}, true );
		}
		var jugFiltrarCheck = document.getElementById("jugFiltrarCheck");
		if (jugFiltrarCheck != null) {
			jugFiltrarCheck.addEventListener( "click", function(){ filtrarJugadores();}, true );
		}
		
		activarSeguirJugadores();

		//Add sorting capability	
		var tablaJugadores = document.getElementById("tablaJugadores");
		var tablaJugadoresSorter = new TSorter;
		tablaJugadoresSorter.init(tablaJugadores);
	}
	
	function seguirJugadores(btnId) {
		var jugId = btnId.id.replace("seguirJug", "");
		var jugNombre = playerIDName[jugId];
		var jugTotales = playerIDNameTotales[jugNombre];
		var jugMercado = playerIDNameMercado[jugNombre];
		var jugFechaDate = new Date();
		var jugFechaDia = jugFechaDate.getDate().toString();
		if (jugFechaDia.length == 1) {
			jugFechaDia = "0" + jugFechaDia;
		}
		var jugFechaMes = (jugFechaDate.getMonth() + 1).toString();
		if (jugFechaMes.length == 1) {
			jugFechaMes = "0" + jugFechaMes;
		}
		var jugFecha = jugFechaDia + "." + jugFechaMes + ".    ";
		localStorage.setItem("scriptSeguir" + jugId, jugId + "/-/" + jugTotales + "/-/" + jugMercado + "/-/" + jugFecha);

		window.location.reload();
	}
	
	function dejarJugadores(btnId) {
		var jugId = btnId.id.replace("dejarJug", "");
		var jugNombre = playerIDName[jugId];
		localStorage.removeItem("scriptSeguir" + jugId);

		window.location.reload();
	}
	
	function filtrarJugadores(filtro) {
		var filtro = document.getElementById("jugFiltrar").value;
		var filtroPosicion = document.getElementById("jugFiltrarPosicion").value;
		var filtroCheck = document.getElementById("jugFiltrarCheck").checked;

		var filtrado = false;
		var tablaJugadores = document.getElementById("tablaJugadores");
		var trsJugadores = tablaJugadores.getElementsByTagName("tr");
		for (var i = 1; i < trsJugadores.length; i++) {
			var tdsJugadores = trsJugadores[i].getElementsByTagName("td");
			if (tdsJugadores.length >= 2) {
				var tdEnlaces = tdsJugadores[1].getElementsByTagName("a");
				var tdValor = normalize(tdEnlaces[0].innerHTML.toLowerCase());
				var tdValorPosicion = normalize(tdsJugadores[4].innerHTML.toLowerCase());
				var filtroValor = normalize(filtro.toLowerCase());
				var filtroValorPosicion = normalize(filtroPosicion.toLowerCase());
				var filtroSeguimiento = tdsJugadores[3].innerHTML.indexOf('name="dejarJug"') != -1;
				if ((tdValor.indexOf(filtroValor) != -1
							&& tdValorPosicion.indexOf(filtroValorPosicion) != -1
							&& !filtroCheck)
						|| (tdValor.indexOf(filtroValor) != -1
							&& tdValorPosicion.indexOf(filtroValorPosicion) != -1
							&& filtroCheck
							&& filtroSeguimiento)) {
					trsJugadores[i].style.display = "";
				} else {
					trsJugadores[i].style.display = "none";
					filtrado = true;
				}
			}
		}
		if (filtrado) {
			var tablaJugadoresSorter = new TSorter;
			tablaJugadoresSorter.end(tablaJugadores);
		} else {
			var tablaJugadoresSorter = new TSorter;
			tablaJugadoresSorter.init(tablaJugadores);
		}
	}
}

if (window.location.href.indexOf( "standings.phtml?currentweekonly" ) != -1) {
	var tablePuntUlt = document.getElementById("newsnaviends");
	if (tablePuntUlt != null) {
		tablePuntUlt.innerHTML += '<form style="display:inline" name="post" action="team_news.phtml" method="post"><input type="hidden" value="messageSubmitted" name="newsAction"><input type="hidden" id="titleMensajePuntuacion" value="SCRIPT - Puntuación" name="headline"/><input type="hidden" name="message" id="message" value=""/><input type="hidden" value="-1" name="send"/><a title="Publicar puntuación" class="button02" href="javascript:submitForm(\'post\',\'send\');">Publicar puntuación</a></form>';
		if (document.getElementById("message") != null && document.getElementById("tablestandings") != null) {
			var table = document.createElement('table');
			table.className="tablecontent03";
			table.cellspacing="1";
			table.cellpadding="2";
			table.border="0";
			table.style.fontSize="1em";
			table.innerHTML = document.getElementById("tablestandings").innerHTML;

			var jugFechaDate = new Date();
			var jugFechaDia = jugFechaDate.getDate().toString();
			if (jugFechaDia.length == 1) {
				jugFechaDia = "0" + jugFechaDia;
			}
			var jugFechaMes = (jugFechaDate.getMonth() + 1).toString();
			if (jugFechaMes.length == 1) {
				jugFechaMes = "0" + jugFechaMes;
			}
			var jugFecha = jugFechaDia + "." + jugFechaMes + ".";
			document.getElementById('titleMensajePuntuacion').value = 'SCRIPT - Puntuación - ' + jugFecha;
			document.getElementById("message").value = outerHTML(table);
		}
	}
}


//if (window.location.href.indexOf( "administration.phtml?penalty" ) != -1) {
//	
//}