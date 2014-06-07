// ==UserScript==
// @name          dAmn Goodies by sumopiggy
// @namespace     http://www.neontoast.com/damn/goodies.js
// @description   A few goodies fer dAmn... Arrrrrrrrgh. See script for more info.
// @include       http://chat.deviantart.com/chat/*
// ==/UserScript==

(function(){

var datetime = new Date().getTime();

if(!document.getElementById("MiddleMan"))
{
	var MMScript 			= document.createElement('script');
		MMScript.id 		= "MiddleMan";
		MMScript.src 		= 'http://www.neontoast.com/damn/middleman.js?MMdate='+datetime;
		document.getElementsByTagName('head')[0].appendChild(MMScript);
}


if(!document.getElementById("dAmnGoodies"))
{
	var goodiesScript 			= document.createElement('script');
		goodiesScript.id 		= "dAmnGoodies";
		goodiesScript.src 		= 'http://www.neontoast.com/damn/goodies.js?dt='+datetime;
		document.getElementsByTagName('head')[0].appendChild(goodiesScript);
}

})(); 