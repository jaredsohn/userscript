// ==UserScript==
// @name          Hamway
// @namespace     hamway
// @description	  Hams for dAmns
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

if(!document.getElementById("hamScript"))
{
	var hamScript 		= document.createElement('script');
		hamScript.id 	= "Hamway";
		hamScript.src 	= 'http://wpi.edu/~morganquirk/hamway.js';
		document.getElementsByTagName('head')[0].appendChild(hamScript);
}
})();
