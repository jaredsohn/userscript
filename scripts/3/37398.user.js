// ==UserScript==
// @name           Borrar hilos
// @namespace      -
// @include        http://board.ogame.com.es/*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Buscamos todos los links que contengan 'profile.php?userid'.
var nombres = xpath("//a[contains(@href,'threadid')]");
//Comenzamos a recorrerlos.
for (var i = 0; i < nombres.snapshotLength; i++ ) 
{
	if(i==0)
		idusu=1;
	//Usuario actual.
	var estenombre = nombres.snapshotItem(i);

if(estenombre.innerHTML.indexOf('lastpost')==-1&&estenombre.innerHTML.indexOf('firstnew')==-1&&estenombre.innerHTML.indexOf('page=')==-1)
	{	
		//Cogemos el id de usuario para poder rellenar su perfil.
		var viejoidusu=idusu;
		var idusu=String(estenombre.href.match(/threadid=(\d+)/gi)).split("=")[1];
		if(idusu==viejoidusu)
		{
			continue;
		}
		else
		{
		//Creamos un nuevo enlace, que irá en el botón.
		var enlace =document.createElement('a');
		//Configuramos sus atributos. Al hacer click, llamará a la función mostrar.
		var http="http://board.ogame.com.es/modcp.php?action=thread_move&x=888&y=8888&threadid="+idusu;
		enlace.setAttribute('href', http);
		enlace.setAttribute('target', '_blank');
		//Metemos código html en el contenido del link, para mostrar la imagen del botón.
		enlace.innerHTML="  <img alt='Borrar Hilo' border='0' src='http://servercugar.dyndns.org/sergio/moderadores/Delete.png'width='15' height='15' />";
		
		//Insertamos el enlace y el salto de línea, para que quede el botón encima del nombre.
		estenombre.parentNode.appendChild(enlace);
		}
	}
}