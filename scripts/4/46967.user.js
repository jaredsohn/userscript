// ==UserScript==
// @name           Añadir encuestas Argentino
// @namespace      -
// @include        http://board.ar.ogame.org/thread*      
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//Buscamos todos los links que contengan 'profile.php?userid'.
var nombres = xpath("//a[contains(@href,'addreply')]");
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
		var http="http://board.ar.ogame.org/modcp.php?action=polladd&x=51&y=20&threadid="+idusu+"&sid=";
		enlace.setAttribute('href', http);
		enlace.setAttribute('target', '_parent');
		//Metemos código html en el contenido del link, para mostrar la imagen del botón.
		enlace.innerHTML="  <img alt='Añadir encuesta' border='0' src='http://servercugar.dyndns.org/sergio/moderadores/Poll.png' width='20' height='20'/>";
		
		//Insertamos el enlace y el salto de línea, para que quede el botón encima del nombre.
		estenombre.parentNode.appendChild(enlace);
		}
	}
}