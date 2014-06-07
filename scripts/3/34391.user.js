// ==UserScript==
// @name           Bitefight menu
// @description	   links
// @include        http://*.Bitefight.*/*
// ==/UserScript==

//Configuration
var links = [
    ['Voodoo'     , 'http://s4.bitefight.hu/bite/shoppremium.php?goin=1'],
    ['Book'        , 'http://s4.bitefight.hu/bite/counterfeiter.php?goin=1'],
    ['Inn'        , 'http://s4.bitefight.hu/bite/taverne.php?goin=1'],
    ['Shop'        , 'http://s4.bitefight.hu/bite/shop.php?goin=1'],
    ['Graveyard'        , 'http://s4.bitefight.hu/bite/city.php?typ=2&goin=1'],
    ['Cave'        , 'http://s4.bitefight.hu/bite/grotte.php?goin=1'],
    ['Market'        , 'http://s4.bitefight.hu/bite/market.php?goin=1'],
    ['Mail'        , 'http://s4.bitefight.hu/bite/msgshow.php?o=0'],
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

