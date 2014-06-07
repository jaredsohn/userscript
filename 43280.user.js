// ==UserScript==
// @name           Menú Bitefight
// @description	   Enlaces directos
// @include        http://*.bitefight.*/*
// ==/UserScript==

//Configuration
var links = [
    ['Mercader'      , 'http://s28.bitefight.es/bite/shop.php?goin=1'],
    ['Cementerio'    , 'http://s28.bitefight.es/bite/city.php?typ=2&goin=1'],
    ['Taverna'       , 'http://s28.bitefight.es/bite/taverne.php?goin=1'],
    ['Gruta'         , 'http://s28.bitefight.es/bite/grotte.php?goin=1'],
    ['Mercado'       , 'http://s28.bitefight.es/bite/market.php?goin=1'],
    ['Biblioteca'    , 'http://s28.bitefight.es/bite/counterfeiter.php?goin=1'],
];

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
