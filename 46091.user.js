 // ==UserScript==
 // @name           травиан меню anima3x
 // @namespace      thanks to Venom
 // @description    this script is a modification from Venom links travian script. thanks!
 // @include        http://*.travian.*php*
 // @exclude        http://*.travian.*/login.php*
 // @exclude        http://*.travian.*/logout.php*
 // @exclude        http://*.travian.*/chat.php*
 // @exclude        http://forum.travian.*
 // @exclude        http://*.travian.*/index.php*
 // @exclude        http://*.travian.*/manual.php*
 // ==/UserScript==

 //Configuration
 var links = [
     ['Клан'     , 'allianz.php'],
     ['Нападения'   , 'allianz.php?s=3'],
     ['Форум'        , 'allianz.php?s=2'],
     ['Пазар'               ,  'build.php?gid=17'],
     ['Казарма'         , 'build.php?gid=19'],
     ['Конюшня'      ,  'build.php?gid=20'],
     ['-----------'        , ''], 
     ['Бетонобъркачка'      ,  'spieler.php?uid=5358'], 
     ['Бетончо'      ,  'spieler.php?uid=5353'], 
     ['Бетончитрушачка'      ,  'spieler.php?uid=5826'], 
     ['Бетоновоз'      ,  'spieler.php?uid=5352'], 
     ['-----------'        , ''], 
     ['Адресна книга'      ,  'nachrichten.php?t=1'],   
     ['-----------'        , ''],
     ['CROP FIND 9-ки 15-ки'      ,  'http://crop-finder.com/bgx/0|0/'],
     ['TROOP TIME Calculator'      ,  'http://www.javaschubla.de/2006/travian/wegerechner/wegerechner-t3i.html?lang=en'],
     
      
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