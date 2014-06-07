// ==UserScript==
// @name          dAmn Goodies
// @namespace     http://anikaz.net23.net/Scripts/dAmnGoodies.js
// @description   A few goodies for dAmn, just showing off MiddleMan.
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==
(function(){
var datetime = new Date().getTime();

if(!document.getElementById("MiddleMan"))
{
	var MMScript 			= document.createElement('script');
		MMScript.id 		= "MiddleMan";
		MMScript.src 		= 'http://anikaz.net23.net/Scripts/MiddleMan.js?MMdate='+datetime;
		document.getElementsByTagName('head')[0].appendChild(MMScript);
}


if(!document.getElementById("dAmnGoodies"))
{
	var goodiesScript 			= document.createElement('script');
		goodiesScript.id 		= "dAmnGoodies";
		goodiesScript.src 		= 'http://anikaz.net23.net/Scripts/dAmnGoodies.js?dt='+datetime;
		document.getElementsByTagName('head')[0].appendChild(goodiesScript);
}
})();
