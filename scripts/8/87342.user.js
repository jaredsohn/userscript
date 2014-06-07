// ==UserScript==
// @name           OGAME RELOADER
// @namespace      debbog.free.fr
// @description    recargar pagina principal de ogame
// @include           *ogame*overview*
// @include           http://*uni*.ogame.es/game/index.php?page=overview*
// ==/UserScript==

function recargar()
{	
	/*******************************************************************************************/
	/***************** Recarga la pagina cada minuto si estamos en la principal ***************/
	/*******************************************************************************************/
	if(parent.document.URL.indexOf('overview.dphp') != -1) {	
		var url = window.location.href;
		//window.location.replace(url);	
		setTimeout( url, 180000 );
				
	}
}