// ==UserScript==
// @name Ogame Menu Usuario alianzas todas
// @spacename lordmokuba@gmail.com
// @description Provee herramientas extras para los miembros de la alianza facilitandoles el desplazamiento por el juego (configurado para todos los servers)
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// ==/UserScript==
(function() {
	/* Creador del codigo Lord Mokuba agradezco a todas las personas que pusieron su granito de informacion para todos los unis*/
	
	
	//
	// obtenemos session
	//
	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	//
	// obtenemos todos los <tr> de la pagina
	//
	var trs = document.getElementsByTagName('tr');
	//
	// buscamos en la coleccion de <tr>, el que contenga el link de comandante.
	//
	for (var i = 0; i < trs.length; i++) {
		
		if(trs[i].innerHTML.indexOf("Info Comandante</font>") != -1){
			//
			// borramos el anuncio de Commandante
			//
			trs[i].parentNode.removeChild(trs[i]);
			
		}
	}	
							///////////////////////////////////////////
							///////////////////////////////////////////
							////								   ////
    						////    MENU DE USUARIO PARA ALIANZAS  ////
							////								   ////
							///////////////////////////////////////////
							///////////////////////////////////////////

	////...Imegen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://ogame443.de/epicblue/gfx/info-help.jpg" width="110" height="19"></center></td></tr>'+
	////...Enviar CC
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar 	CC.</a></font></div></td></tr>'+
	
   	////...Lista de Miembros Ordenados
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros Alianza</a></font></div></td></tr>'+
	////...estadisticas Jugador
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&sort1=1&sort2=2" target="Hauptframe">Jugadores Top</a></font></div></td></tr>'+
	////.. estadisticas de Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&who=ally" target="Hauptframe">Alianzas Top</a></font></div></td></tr>'+
    ////...Baneados
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://board.ogame.com.es/thread.php?threadid=23715" target="newwindow">Baneados</a></font></div></td></tr>'+

	'';

})();






























