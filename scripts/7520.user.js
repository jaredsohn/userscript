// ==UserScript==
// @name Ogame Botones Acceso directo
// @spacename Antigo jeje
// @description Provee de botones nuevos para poder acceder a algunas opciones rapidamente incluida el salto
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
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
							////////////////////////////////////////////////////////////
							////////////////////////////////////////////////////////////
							////								        ////
							//// INICIO DEL MENU DE ADMINISTRACION Y ACCESO A SALTO ////
							////								        ////
							////////////////////////////////////////////////////////////
							////////////////////////////////////////////////////////////

	////...Imegen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://img128.imageshack.us/img128/7923/administradorogame1ee.jpg" width="100" height="15"></center></td></tr>'+
	////...
	
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar CC</a></font></div></td></tr>'+
	////...Enviar CC

	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4" target="Hauptframe">Lista de Miembros</a></font></div></td></tr>'+
	////...Lista de Miembros 

        '<tr><td><div align="center"><font color="#FFFFFF"><a href="pranger.php" target="Hauptframe">Baneados</a></font></div></td></tr>'+
	////...Acceso a baneados
	

        '<tr><td><div align="center"><font color="#FFFFFF"><a href="infos.php?session=' + Session + '&gid=43" target="Hauptframe">Salto</a></font></div></td></tr>'+
	////...Acceso a salto

        ////...Fin de Cadena, no comentar
'';

})();

