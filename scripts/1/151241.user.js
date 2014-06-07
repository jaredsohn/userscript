// ==UserScript==
// @name       Eksmisja (Pat i Mat remover)
// @namespace  http://www.wykop.pl/ludzie/surma/
// @version    0.1.6
// @description  Usuwa Pata i Mata z belki
// @match      http://*.wykop.pl/*
// @copyright  kasper93, Surma
// ==/UserScript==


function main(){

if ($("#header-con").hasClass('patmat')) {
$("#header-con").removeClass('patmat');
$("#header-con a[href='http://tablica.pl']").remove();
} 

}
	
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);