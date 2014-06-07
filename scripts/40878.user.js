// ==UserScript==
// @name           Bitefight menu
// @description	   links
// @include        http://*.Bitefight.*/*
// ==/UserScript==

//Configuration
var links = [

       ['الرسائل'        , 'http://s1.ae.bitefight.org/bite/msgshow.php?o=0'],
    ['الحانة'        , 'http://s1.ae.bitefight.org/bite/taverne.php?goin=1'],
    ['التاجر'        , 'http://s1.ae.bitefight.org/bite/shop.php?goin=1'],
    ['المقبرة'        , 'http://s1.ae.bitefight.org/bite/city.php?typ=2&goin=1'],
    ['هجوم'        , 'http://s1.ae.bitefight.org/bite/grotte.php?goin=1'],
    ['السوق'        , 'http://s1.ae.bitefight.org/bite/market.php?goin=1'],
 
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
