// ==UserScript==
// @name Ogame Menu Extension Alianza 3 torres 2.5 User
// @spacename lordmokuba@gmail.com
// @description Provee herramientas extras para los miembros de la alianza facilitandoles el desplazamiento por el juego (configurado para server uni5)
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// ==/UserScript==
(function() {
	/* Creador del codigo Lord Mokuba agradezco a todas las personas que pusieron su granito de informacion para el uni 5*/
	
	
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
							////  MENU DE USUARIOS ALIANZA UNAB    ////
							////								   ////
							///////////////////////////////////////////
							///////////////////////////////////////////

	////...Imegen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://ogame393.de/epicblue/gfx/info-help.jpg" width="110" height="19"></center></td></tr>'+
	////...Mensaje al lider
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://ogame393.de/game/writemessages.php?session=' + Session + '&messageziel=100473" target="Hauptframe">MP Alexia</a></font></div></td></tr>'+
   	////...Lista de Miembros Ordenados
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Miembros 3 Torres </a></font></div></td></tr>'+
	////...estadisticas Jugador
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://ogame393.de/game/stat.php?session=' + Session + '&start=1&sort1=1&sort2=2" target="Hauptframe">Jugadores Top</a></font></div></td></tr>'+
	////.. estadisticas de Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://ogame393.de/game/stat.php?session=' + Session + '&start=1&who=ally" target="Hauptframe">Alianzas Top</a></font></div></td></tr>'+
    ////...Foro alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://planetasunidos.superforos.com" target="newwindow">Foro 3 torres </a></font></div></td></tr>'+
	
	'';

})();


























