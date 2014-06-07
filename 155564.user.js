// ==UserScript==
// @name			Reemplazar GratisProgramasOut 
// @description			Reemplazar GratisProgramasOut 
// @include			http://*.gratisprogramas.org/*
// ==/UserScript==


var elemA = document.getElementsByTagName('a');

for( var i = 0; i <= elemA.length - 1; i++){
	elemA[i].href = elemA[i].href.replace('http:\/\/lik.cl\/?', '');
}