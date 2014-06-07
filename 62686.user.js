// ==UserScript==
// @name           bitefight
// @namespace      http://userscripts.org/users/80504
// @description    menus especiales para bitefight
// @include        http://s10.bitefight.com.mx/*
// ==/UserScript==
//Configuration
var links = [
    ['Mercader'      , 'http://s10.bitefight.com.mx/bite/shop.php?goin=1'],
    ['Cementerio'    , 'http://s10.bitefight.com.mx/bite/city.php?typ=2&goin=1'],
    ['Taverna'       , 'http://s10.bitefight.com.mx/bite/taverne.php?goin=1'],
    ['Gruta'         , 'http://s10.bitefight.com.mx/bite/grotte.php?goin=1'],
    ['Mercado'       , 'http://s10.bitefight.com.mx/bite/market.php?goin=1'],
    ['Biblioteca'    , 'http://s10.bitefight.com.mx/bite/counterfeiter.php?goin=1'],
    ['Iglesia'       , 'http://s10.bitefight.com.mx/bite/church.php?goin=1'],
    ['Arena'      , 'http://s10.bitefight.com.mx/bite/arena.php?goin=1'],
    ['Entrenar'      , 'http://s10.bitefight.com.mx/bite/training.php'],
    ['Bandeja de entr.'    , 'http://s10.bitefight.com.mx/bite/msgshow.php'],];

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