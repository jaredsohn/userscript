// ==UserScript==
// @name           EuroGamer elecoso skin 
// @namespace      http://eurogamer.it/*
// @description    Interfaccia grafica a tonalità di grigio per eurogamer, j4gifs-like
// @include        http://www.eurogamer.it/*
// @author	   demonbl@ck
// ==/UserScript==

document.body.style.background="#000000";

var el = document.getElementsByTagName('*');
for(var i=0;i< el.length;i++){
	el[ i ].style.background="#000000";}