// ==UserScript==
// @name           Bitefight menu
// @description	   links
// @include        http://*.Bitefight.*/*
// ==/UserScript==

//Configuration
var links = [
    ['VooDoo üzlet'     , 'http://s10.bitefight.hu/bite/shoppremium.php?goin=1'],
    ['Könyvtár'        , 'http://s10.bitefight.hu/bite/counterfeiter.php?goin=1'],
    ['Fogadó'        , 'http://s10.bitefight.hu/bite/taverne.php?goin=1'],
    ['Kereskedö'        , 'http://s10.bitefight.hu/bite/shop.php?goin=1'],
    ['Temetö'        , 'http://s10.bitefight.hu/bite/city.php?typ=2&goin=1'],
    ['Barlang'        , 'http://s10.bitefight.hu/bite/grotte.php?goin=1'],
    ['Piac'        , 'http://s10.bitefight.hu/bite/market.php?goin=1'],
    ['Üzenetek'        , 'http://s10.bitefight.hu/bite/msgshow.php?o=0'],
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
