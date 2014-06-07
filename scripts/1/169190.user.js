// ==UserScript==
// @name Remove Pub
// @namespace 	http://userscripts.org/users/171918
// @description pub
// @version     1.0
// @date 	2013-05-31
// @creator 	webmaster
// @include        http://www.livoo.pt/*
// ==/UserScript==



window.addEventListener('load', function(event) {
	
	HidePub();
 
}, 'false');


function HidePub(){

var lista = document.getElementsByClassName("oferta-mini");

 for(var i =0; i<lista.length ; i++){
	lista[i].style.visibility = "hidden";
 }
}