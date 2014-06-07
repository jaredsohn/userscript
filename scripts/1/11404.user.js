// Travian GreaseMonkey Script
// Get GreaseMonkey @ http://greasemonkey.mozdev.org/
// Author: Carles074
// Thanks To: 
// Released under the GNU GPL license ( http://www.gnu.org/copyleft/gpl.html)
// ==UserScript==
// @name          Travian
// @namespace     Travian
// @description   Travian Mapper on Spanish server 1
// @include http://s1.travian.net/karte.php*
// @exclude http://s1.travian.net/karte.php
// ==/UserScript==

///////////// SETTINGS ////////////////

	function NMC_TravianMapper() {
	var searchtxt1 = "Fundar aldea nueva"; 
	var searchtxt2 = "3 Colonos existentes)";


			// ** Primero busco las dos cadenas necesarias, para saber si me encuentro donde debo.
		var pos = document.body.textContent.indexOf( searchtxt1 );
		if ( pos < 0 ) return;
		pos = document.body.textContent.indexOf( searchtxt2 );
		if ( pos < 0 ) return;

			// ** Creo el formulario donde guardare los datos.
		var formulario = document.createElement("form");
    formulario.setAttribute( "action", "http://starpeople.web1000.com/parsers/parsertravian.php" );
    formulario.setAttribute( "method", "post" );
    formulario.setAttribute( "target", "iframe_oculto" );

		var input = document.createElement("input");
    input.setAttribute( "name", "parserfrom" );
		input.setAttribute( "type", "hidden" );
		input.value = "travianmap01";
    formulario.appendChild(input);

			// ** Relleno el formulario con los datos de las granjas.
		var input = document.createElement("input");
    input.setAttribute( "name", "tipus" );
		input.setAttribute( "type", "hidden" );

			// ** Busco el valor del mapa
		var searchtxt3a = "<div id=\"f";
		var searchtxt3b = "\"></div>";
		var searchtxt3 = "";
		for( var i=0; i< 10; i++ ) {
			searchtxt3 = searchtxt3a + i + searchtxt3b;
			pos = document.body.innerHTML.indexOf( searchtxt3 );
			if ( pos >= 0 ) { input.value = i; break; }
		}
		if ( pos < 0 ) input.value = 0;
    formulario.appendChild(input);

			// ** Y la posicion en el mapa.
		var input = document.createElement("input");
    input.setAttribute( "name", "coordenades" );
		input.setAttribute( "type", "hidden" );
		input.value = document.getElementById('lmid2').textContent ;
    formulario.appendChild(input);

			// ** Creo el iframe donde enviar los datos.
		var iframe = document.createElement("iframe");
    iframe.setAttribute( "name", "iframe_oculto" );
    iframe.setAttribute( "style", "visibility:hidden;height:1px;width:1px;" );
    
			// ** Lo añado todo a la pagina.
    document.body.appendChild(formulario);
    document.body.appendChild(iframe);

			// ** Y lo mando.
  	formulario.submit();
	}
    
	NMC_TravianMapper();
