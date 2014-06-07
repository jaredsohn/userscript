// ==UserScript==
// @name           Travian Links ITA 3.5
// @namespace      www.traviantrucchi.org
// @author         Mod by Dark Simon
// @description    Aggiunge alla tua schermata, sulla destra, una serie di link utili.
// @version        2.1.1
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
    ['Caserma'     , 'build.php?gid=16'],
    ['Campo addestramento'        , 'build.php?gid=19'],
    ['Scuderia'        , 'build.php?gid=20'],
    ['Officina'        , 'build.php?gid=21'],
    ['Mercato'     , 'build.php?gid=17'],
    ['Alleanza'        , 'allianz.php'],
	['Attacchi Ambasciata' , 'allianz.php?s=3'],
	['TravianTrucchi' , 'http://traviantrucchi.org'],

];

//Code
var menu = document.getElementById('side_info');
if(menu == null) { //Just one village
  menu = document.createElement('div');
  menu.setAttribute('id','sright');
  document.getElementById('smidall').appendChild(menu);
}
menu.appendChild(document.createElement('br'));

var elemB, elemUL, elemLI, elemA;

/* Links Menu */
elemB  = document.createElement('b');
elemB.appendChild(document.createTextNode('Links:'));
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
