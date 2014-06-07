// ==UserScript==
// @name			Reemplazar TaringaOut 
// @namespace			http://userscripts.org/users/327359
// @description			Reemplazar TaringaOut 
// @include			http://*.taringa.net/*
// ==/UserScript==

var elemA = document.getElementById('full-col').getElementsByTagName('a');

for( var i = 0; i <= elemA.length - 1; i++){
	elemA[i].href = elemA[i].href.replace('http:\/\/links.itaringa.net\/go?', '');
}