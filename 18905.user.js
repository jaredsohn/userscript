// ==UserScript==
// @name 						OGame - Estadisticas/Statistics
// @author 					elpeter
// @date          	03-01-2008
// @version       	0.1
// @namespace     	http://userscripts.org/scripts/show/18905
// @description 		Visualiza el incremento en las estadisticas. Testado en vers. 0.78a. MULTI-LANGUAGE. Shows statistics increments
// @include      		http://*ogame*stat*
// ==/UserScript==

// Script original: http://userscripts.org/scripts/show/12023
// Modificado por elpeter para funcionar en la versión 0.78a


(function(){

		// Intenta activar la conexion
		var pagina = document.getElementsByTagName ('th');
		//for (var i = pagina.length - 1; i >= 0; i--) {
		for (var i = 0; i < pagina.length; i++) {
			evento = pagina[i].innerHTML;
			if (evento.substr(0,2) != '<t'){
				//divide jugadores de alianzas
				pos=evento.search(', WIDTH, 25');
				if (pos != -1){
					pos=evento.search('\">');
					if(pos != -1 ) {
						mystring = evento.substr(pos-50,pos-46).replace(">","").replace("e","");
						pos = mystring.search('<');
						if (pos != -1){
							mystring=mystring.substr(0,pos);
							pagina[i].childNodes[1].firstChild.innerHTML = mystring;
						}
					}
				}
			}
	}

}) ();