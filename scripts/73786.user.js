// ==UserScript==
// @name           Bitefight Menü Erweiterung
// @description	   zusätzliche Links
// @include        http://*.bitefight.*/*
// ==/UserScript==

//Links
var links = [
    ['Händler'        , 'http://s3.bitefight.de/city/market'],
    ['Friedhof'        , 'http://s3.bitefight.de/city/graveyard'],
    ['Taverne'        , 'http://s3.bitefight.de/city/taverne'],
    ['Grotte'        , 'http://s3.bitefight.de/city/grotte'],
    ['Marktplatz'        , 'http://s3.bitefight.de/city/shop'],
    ['Bibliothek'        , 'http://s3.bitefight.de/city/counterfeiter'],
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

