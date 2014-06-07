// Por Rodolfo Lopez. 2009.
// ==UserScript==
// @name          elunivideo
// @namespace   http://twitter.com/RodolfoLopex
// @description  Adelanta los comerciales en videos de El Universal TV
// @include       http://www.eluniversaltv.com.mx/*
// ==/UserScript==

window.addEventListener('load', function () 
{ if (typeof(unsafeWindow.infoVideo) != 'undefined'){
	var arregloDatos = unsafeWindow.infoVideo.split("|");
	unsafeWindow.creaPlayer2(arregloDatos,"true");
	unsafeWindow.creaPlayer2(arregloDatos,"true");
 }
},false);