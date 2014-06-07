// written by doroteo :-)


// ==UserScript==
// @name	OGame New Page Menu
// @namespace	OGame New Page Menu
// @description   Reemplaza el menu de ayuda x 1 q abre la sesion en otra ventana.
// @include	   http://*ogame*
// @include	   http://ogame*.de/*
// @include	   http://*.gfsrv.*/
// @exclude	   
// ==/UserScript==    

if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	//agrega el New Page Menu
	var tgs = document.getElementsByTagName('a');

	for (var i = tgs.length - 1; i >= 0; i--) {
		if(tgs[i].href.indexOf('http://tutorial.ogame.de/') != -1){
			tgs[i].href = 'index.php?session=' + session;
			tgs[i].target = "_blank";
			tgs[i].innerHTML = 'New Page';
		}
	}
}
//ogameccmenu.user.js
