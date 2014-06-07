// ==UserScript==
// @name           SDK's Links 
// @include        http://*.traviwars.*php*
// @exclude 	   http://*.traviwars.*/login.php*
// @exclude        http://*.traviwars.*/logout.php*
// @exclude 	   http://*.traviwars.*/chat.php*
// @exclude 	   http://forum.travian.*
// @exclude 	   http://*.traviwars.*/index.php*
// @exclude 	   http://*.traviwars.*/manual.php*
// @exclude 	   http://s6.travian.*
// ==/UserScript==

//Configuration
var links = [
    ['Geral'     , 'allianz.php'],
    ['Forum'        , 'allianz.php?s=2'],
    ['Chat'        , 'allianz.php?s=6'],
    ['Ataques'        , 'allianz.php?s=3'],
    ['Noticias'        , 'allianz.php?s=4'],
    ['Opções'        , 'allianz.php?s=5'],
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
elemB.appendChild(document.createTextNode('Embaixada'));
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