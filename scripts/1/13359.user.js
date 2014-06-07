// ==UserScript==
// @name           Travian Links
// @namespace      http://userscripts.org/Keos
// @description    Script to add "Links" menu to travian (like travian plus)
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
    ['Faluközpont'    , 'dorf2.php'],
    ['Határföldek'    , 'dorf1.php'],
    ['Klán'     , 'allianz.php'],
    ['Klán Fórum'        , 'allianz.php?s=2'],
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
elemB.appendChild(document.createTextNode('Links'));
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