// Copyright (c) 2006, Perberos
// http://www.perberos.com.ar/
// Adaptado para la version 0.7x
// ==UserScript==
// @name	OGame CC Menu
// @namespace	OGame CC Menu
// @description   Reemplaza el menu de ayuda por el de enviar circular.
// @include	   http://*ogame*
// @include	   http://*.ogame*/*
// @include	   http://*.gfsrv.*/
// @exclude	   
// ==/UserScript==    

//if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	//agregua el CC Menu
	var tgs = document.getElementsByTagName('a');

	for (var i = tgs.length - 1; i >= 0; i--) {
		if(tgs[i].href.indexOf('http://tutorial.ogame') != -1){
			tgs[i].href = './index.php?page=allianzen&session=' + session + '&a=17';
			tgs[i].target = '_self';
			tgs[i].innerHTML = 'Circular';
		}
	}
//}
//ogameccmenu.user.js