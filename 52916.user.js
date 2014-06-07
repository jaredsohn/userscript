// ==UserScript==
// @name           Pennergame Stadt-Bild überspringen
// @include        http://*pennergame.de/*
// @description 	Verlinkt den Stadtbutton in der Navogationsleiste zum Waffenladen
// @copyright 		Jonas Hülsermann (Forside)
// ==/UserScript==

var a = document.getElementsByTagName('a');

for (var i=0; i<20; i++)
{
	if (a[i].href == 'http://www.pennergame.de/city/')
	{ 
		a[i].href = '/city/weapon_store/';
		break;
	}
}