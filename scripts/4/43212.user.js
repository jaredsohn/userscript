// ==UserScript==
// @name           Bitefight Menu Es
// @namespace      http://userscripts.org/users/80504
// @description    Bitefight Menú para España s5
// @include        http://*.bitefight.*/*
// ==/UserScript==
//Configuration
var links = [
    ['Mercader'      , 'http://s5.bitefight.es/bite/shop.php?goin=1'],
    ['Cementerio'    , 'http://s5.bitefight.es/bite/city.php?typ=2&goin=1'],
    ['Taberna'       , 'http://s5.bitefight.es/bite/taverne.php?goin=1'],
    ['Gruta'         , 'http://s5.bitefight.es/bite/grotte.php?goin=1'],
    ['Mercado'       , 'http://s5.bitefight.es/bite/market.php?goin=1'],
    ['Biblioteca'    , 'http://s5.bitefight.es/bite/counterfeiter.php?goin=1'],
    ['Entrenar'      , 'http://s5.bitefight.es/bite/training.php'],
    ['Casa del Dolor'      , 'http://s5.bitefight.es/bite/arena.php?goin=1'],
    ['Iglesia'        ,'http://s5.bitefight.es/bite/church.php?goin=1'],
    ['Bandeja Entrada'    , 'http://s5.bitefight.es/bite/msgshow.php'],];

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
