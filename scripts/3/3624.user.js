// ==UserScript==
// @name Ogame Menu Administracion de Alianzas
// @spacename NorFolk.cl@gmail.com
// @description Provee herramientas para la administracion de las alianzas(tambien funciona en el uni31)
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
							///////////////////////////////////////////
							///////////////////////////////////////////
							////								   ////
							//// INICIO DEL MENU DE ADMINISTRACION ////
							////								   ////
							///////////////////////////////////////////
							///////////////////////////////////////////

	////...Imegen separadora
	trs[trs.length-1].innerHTML ='<tr><td><center><img src="http://img128.imageshack.us/img128/7923/administradorogame1ee.jpg" width="100" height="15"></center></td></tr>'+
	////...Enviar CC
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Enviar CC.</a></font></div></td></tr>'+
	////...Admin. Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=5" target="Hauptframe">Admin. Alianza</a></font></div></td></tr>'+
	////...Ajustar Leyes
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=6" target="Hauptframe">Ajustar Leyes</a></font></div></td></tr>'+
	////...Admin. a los Miembros
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7" target="Hauptframe">Admin. Miembros</a></font></div></td></tr>'+
	////...Lista de Miembros
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4" target="Hauptframe">Lista de Miembros</a></font></div></td></tr>'+
	////...Lista de Miembros Ordenados
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Lista Ordenada</a></font></div></td></tr>'+
	////...Cambiar Etiqueta de Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=9" target="Hauptframe">Etiqueta de Alianza</a></font></div></td></tr>'+
	////...Cambiar Nombre de Alianza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=10" target="Hauptframe">Nombre de Alianza</a></font></div></td></tr>'+
	////...Fin de Cadena, no comentar.
	'';

})();
