// version 0.2
// 9 agosto 2006
// Bajo Licencia GPL 
// http://www.gnu.org/copyleft/gpl.html
// Visualiza el incremento en las estadisticas.
// Show positions increments in Stats
// ==UserScript==
// @name OGame-IncrementoEstadistica
// @author Lord Mokuba
// @descrizione: Visualiza el incremento en estadisticas
// @include      http://uni*.ogame.com.es/game/*
// @include      http://ogame*.de/game/*
// ==/UserScript==

(function(){

		// Intenta activar la conexion
		var pagina = document.getElementsByTagName ('th');
		//for (var i = pagina.length - 1; i >= 0; i--) {
		for (var i = 0; i < pagina.length; i++) {
			evento = pagina[i].innerHTML;
			if (evento.substr(0,2) != '<t'){
				//divide jugadores de alianzas
				pos=evento.search(', WIDTH, 30');
				if (pos != -1){
					pos=evento.search('\">');
					if(pos != -1 ) {
						mystring = evento.substr(pos-23,pos-25);
						pos = mystring.search('<');
						if (pos != -1){
							mystring=mystring.substr(0,pos);
							pagina[i].childNodes[1].firstChild.innerHTML = mystring;
						}
					}
				}
			}
		/*
		// Notificador de actualizaciones
	    var d = new Date()
	    var cday=Math.ceil(d.getTime()/1000/3600/24); // dias desde 1/1/1970
	    var lupd=GM_getValue('LastUpd', 0);
	    var delta=cday-lupd;
	    if (delta >= 7){ // revisa la actualizacion...
			GM_xmlhttpRequest({
	       		method: 'GET',
				url: 'http://davidef.altervista.org/userscript/download/StatIncrIt-Org.lastver.txt',
				onload: function(responseDetails) {
					var cver=parseInt(responseDetails.responseText);
					if (cver !=  2){
						alert('hay disponible una nueva version del programa graficador de estadisticas' +
							'Nel caso non venisse aperta, il link è il seguente: http://davidef.altervista.org/userscript/script.htm\n'+
							'Questo promemoria verrà visualizzato nuovamente tra 7 giorni se lo script non venisse aggiornato.');
						window.open("http://davidef.altervista.org/userscript/script.htm", "", "");
					}
					//set updated...
					GM_setValue('LastUpd', cday);
	       		}
	    	});
	    }
		//update-notifier end	
	*/
	}

}) ();


