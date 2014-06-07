// ==UserScript==
// @name        Boerse.bz Auto-Despoiler
// @namespace   Boerse.bz
// @description schaltet immer alle Spoiler um auf Boerse.bz
// @include     http://www.boerse.bz/*
// @version     1
// @grant       none
// ==/UserScript==

var y = document.getElementsByTagName('input');
	for(var i = 0;i<=y.length;i++)
	{ 
		if(y[i].value == 'Spoiler')
			y[i].click();
	}