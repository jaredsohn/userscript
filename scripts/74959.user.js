// ==UserScript==
// @name          dAmn Goodies
// @namespace     http://sumopiggy.24bps.com/damn/goodies.js
// @description   A few goodies for dAmn, just showing off MiddleMan.
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==
(function(){
var datetime = new Date().getTime();

if(!document.getElementById("MiddleMan"))
{
	var MMScript 			= document.createElement('script');
		MMScript.id 		= "MiddleMan";
		MMScript.src 		= 'http://sumopiggy.24bps.com/damn/middleman/middleman.js?MMdate='+datetime;
		document.getElementsByTagName('head')[0].appendChild(MMScript);
}


if(!document.getElementById("dAmnGoodies"))
{
	var goodiesScript 			= document.createElement('script');
		goodiesScript.id 		= "dAmnGoodies";
		goodiesScript.src 		= 'http://sumopiggy.24bps.com/damn/goodies.js?dt='+datetime;
		document.getElementsByTagName('head')[0].appendChild(goodiesScript);
}
})();