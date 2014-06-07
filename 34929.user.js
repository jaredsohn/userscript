// ==UserScript==
// @name           Travian Links v2[XmitVersion]
// @namespace      http://userscripts.org/xmit
// @description    Script para adicionar "Links" ao menu do Travian, links tais como, "Quartel", "Cavalariça", "Oficina", "Ponto de Reunião Militar" 
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
    ['Quartel'     , 'build.php?gid=19'],
    ['Cavalariça' , 'build.php?gid=20'],
    ['Oficina' , 'build.php?gid=21'],
    ['Tropas' , 'build.php?gid=16'],
    ['Mercado' , 'build.php?gid=17'],
    ['CropFinder' , 'http://crop-finder.com/pt/'],
    ['Simulador de Combates' , 'http://kirilloid.ru/travian/warsim.php'],
    ['Estatísticas','http://travian-utils.com/?s=ptx'],
    ['TravianFAQ' , 'http://help.travian.com.pt'],
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
