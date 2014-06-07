// ==UserScript==
// @name Scrit phoenix
// @spacename jinetar@hotmail.com
// @description scrit para los usuarios de phoenix
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// @include http://ogpcalc.php5.cz/index.php

// ==/UserScript==
(function() {
	
	//
	// obtenemos session
	//
	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	//
	// obtenemos todos los <tr> de la pagina
	//
	var trs = document.getElementsByTagName('tr');

							///////////////////////////////////////////
							///////////////////////////////////////////
							////								   ////
							//// INICIO DEL MENU DE COMPLEMENTOS ////
							////								   ////
							///////////////////////////////////////////
							///////////////////////////////////////////

	////...Imagen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://img95.imageshack.us/img95/4756/infohelp2bx5.jpg" width="110" height="19"></center></td></tr>'+
		
	
	////...Simulador de misiles
        '<tr><td><div align="center"><font color="#FFFFFF"><a href=http://www.indaya.com/esponzues/ogame/simuladorMisiles.html target="Hauptframe">Sim. misiles</a></font></div></td></tr>'+
	
	
	////...Calculadora para repartir los escombros de un SAC
	'<tr><td><div align="center"><font color="#FFFFFF"><a href=http://www.borlafu.info/scripts/escombros_sac.php target="Hauptframe">Calculadora SAC</a></font></div></td></tr>'+
	
	
       ////...Calculadora de puntos
       '<tr><td><div align="center"><font color="#FFFFFF"><a href=http://ogpcalc.php5.cz/index.php target="Hauptframe">Cal. puntos</a></font></div></td></tr>'+ 

      ////...MILOS
      '<tr><td><div align="center"><font color="#FFFFFF"><a href=http://milos.nethen.org/milos-index/ target="Hauptframe">Milos</a></font></div></td></tr>'+ 


        ////...Fin de Cadena, no comentar.
	'';

})();