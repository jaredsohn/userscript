// Copyright (c) 2009, LightSeven
// http://www.lightseven.nl
// Version 0.8x
// ==UserScript==
// @name	OGame Shoutbox Menu
// @namespace	OGame Shoutbox Menu
// @description      Vervangt Help knop voor de Shoutbox .
// @include	   http://*ogame*
// @include	   http://*.ogame*/*
// @exclude	   
// ==/UserScript==    

//if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	var tgs = document.getElementsByTagName('a');
	for (var i = tgs.length - 1; i >= 0; i--) {
		if(tgs[i].href.indexOf('http://tutorial.ogame') != -1){
			tgs[i].href = 'http://ogame.lightseven.nl/shoutbox/';
			tgs[i].target = '_blank';
			tgs[i].innerHTML = 'Shoutbox';
		}
	}
//}
//ogameccmenu.user.js