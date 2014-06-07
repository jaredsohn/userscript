// ==UserScript==
// @name           Gnuton
// @description    Aggiunge collegamento a link utili.
// @version        1.1.0
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
    ['Help'                      , 'http://help.travian.it/'],
    ['Albero delle costruzioni'  , 'http://img458.imageshack.us/img458/6783/alberocostruzionietruppsp0.gif'],
    ['Mappa 15x15'               , 'http://www.traviandope.com/map.php?pos_x=0&pos_y=-0'],
    ['Mappa Globale Travian'     , 'http://www.traviandope.com/world_view.php'],
    ['Controlla Alleanze'        , 'http://www.traviandope.com/allies.php'],
    ['Trova Canarini-Pulcini'    , 'http://www.traviandope.com/crop.php'],
    ['Travian Utility'           , 'http://www.travianutility.com/'],
    ['Forum Alleanza'            , 'http://s1.travian.it/allianz.php?s=2'],
    ['Forum Confederazione'      , 'http://caraibi.forumfree.net'],
    ['Chat'                      , 'http://embed.mibbit.com/?server=irc.freenode.org&channel=caraibi&noServerNotices=true&noServerMotd=true&forcePrompt=true&promptPass=false'],
    ['Truppe Tool'            , 'http://pfanta.altervista.org/index.php'],
    ['Nuova versione'            , 'http://userscripts.org/scripts/source/36728.user.js'],

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
elemB.appendChild(document.createTextNode('Links Caraibici Utili'));
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