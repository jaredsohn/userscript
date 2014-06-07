// ==UserScript==
// @name           fatti miei(ITA)
// @namespace      Horus
// @description    Aggiunge alla tua schermata, sulla destra, una serie di link indispensabili.
// @version        1.0.4
// @include        http://*.travian.*php*
// @exclude 	   http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude 	   http://*.travian.*/chat.php*
// @exclude 	   http://forum.travian.*
// @exclude 	   http://*.travian.*/index.php*
// @exclude 	   http://*.travian.*/manual.php*
// ==/UserScript==

//Configuration
var links = [
    ['Ambasciata'        , 'allianz.php'],
    ['Forum'        , 'allianz.php?s=2'],
    ['Mercato'     , 'build.php?gid=17'],
    ['Caserma'     , 'build.php?gid=16'],
    ['Campo addestramento'        , 'build.php?gid=19'],
    ['Scuderia'        , 'build.php?gid=20'],
    ['Officina'        , 'build.php?gid=21'],
    ['Help'     , 'http://help.travian.it/'],
    ['Albero delle costruzioni'        , 'http://img458.imageshack.us/img458/6783/alberocostruzionietruppsp0.gif'],
    ['Mappa'        , 'http://travmap.shishnet.org/?lang=it'],
    ['Travian Utility'        , 'http://www.travianutility.com/'],
    ['Nuove versioni'        , 'http://userscripts.org/scripts/source/34616.user.js'],

];

//Code
var menu = document.getElementById('lright1');
if(menu == null) { //Just one village
  menu = document.createElement('div');
  menu.setAttribute('id','lright1');
  document.getElementById('lmidall').appendChild(menu);
}
menu.appendChild(document.createElement('br'));

var elemB, elemUL, elemLI, elemA;

/* Links Menu */
elemB  = document.createElement('b');
elemB.appendChild(document.createTextNode('Link Utili'));
menu.appendChild(elemB)

elemUL = document.createElement('ul');
elemUL.setAttribute('class','dl');
menu.appendChild(elemUL)

for each ( var link in links ){
    elemLI = document.createElement('li');
    elemLI.setAttribute('class','dl');

    elemA = document.createElement('a');
    elemA.href = link[1];
    elemA.appendChild(document.createTextNode(link[0]));

    elemLI.appendChild(elemA);
    elemUL.appendChild(elemLI);
}
