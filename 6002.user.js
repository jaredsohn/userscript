// version 0.3
// 9 agosto 2006
// Bajo Licencia GPL 
// http://www.gnu.org/copyleft/gpl.html
// Visualiza el numero de recicladores toca enviarpara recojer los escombros
// ==UserScript==
// @name OGame-ContaReciclas
// @descrizione: Visualiza el numero de recicladores toca enviarpara recojer los escombros
// @include      http://uni*.ogame.it/game/*
// @include      http://ogame*.de/game/*
// ==/UserScript==
(function(){
	if (location.pathname.search('galaxy.php') != -1 ) {		
		// Intenta activar la conexion
	// Visualiza el numero de recicladores que se deben enviar
	var pagina = document.getElementsByTagName ('a');
		for (var i = 0; i < pagina.length; i++) {
				if (pagina[i].title.search("Escombros:")!=-1){
					var posc=pagina[i].title.search('Recursos:');
					var mm=parseInt(pagina[i].title.substring(12,posc-1).replace(".","").replace(".","").replace(".",""));
					var cc=parseInt(pagina[i].title.substring(posc+3).replace(".","").replace(".","").replace(".",""));
					var rc = Math.ceil((mm+cc)/20000);
					pagina[i].title=pagina[i].title.concat(", #: " + rc);
				}
			//}
		}

	}

}) ();



