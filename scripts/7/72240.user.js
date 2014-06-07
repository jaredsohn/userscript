// ==UserScript==
// @name           Bitefight Menu BR
// @namespace      
// @description    Bitefight Menu BR S4
// @include        http://*.bitefight.*/*
// ==/UserScript==
//Configuration
var links = [
    ['Mercador'      , 'http://s4.br.bitefight.org/bite/shop.php?goin=1'],
    ['Cemitério'    , 'http://s4.br.bitefight.org/bite/city.php?typ=2&goin=1'],
    ['Taberna'       , 'http://s4.br.bitefight.org/bite/taverne.php?goin=1'],
    ['Gruta'         , 'http://s4.br.bitefight.org/bite/grotte.php?goin=1'],
    ['Mercado'       , 'http://s4.br.bitefight.org/bite/market.php?goin=1'],
    ['Biblioteca'    , 'http://s4.br.bitefight.org/bite/counterfeiter.php?goin=1'],
    ['Treinar'      , 'http://s4.br.bitefight.org/bite/training.php'],
    ['Casa de Dor'      , 'http://s4.br.bitefight.org/bite/arena.php?goin=1'],
    ['Igreja'        ,'http://s4.br.bitefight.org/bite/church.php?goin=1'],
    ['Caixa Entrada'    , 'http://s4.br.bitefight.org/bite/msgshow.php'],];

var menu = document.getElementById('menu');

menu.appendChild(document.createElement('br'));

var elemB, elemUL, elemLI, elemA;

elemB  = document.createElement('b');
menu.appendChild(elemB)

for each ( var link in links ){
 
    elemA = document.createElement('a');
    elemA.href = link[1];
    elemA.appendChild(document.createTextNode(link[0]));
	menu.appendChild(elemA)	
}
