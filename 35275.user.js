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
     ['Новини'   , 'allianz.php?s=4'],
     ['Форум'        , 'allianz.php?s=2'],
     ['------------------------------------------'        , ''],
     ['Академия'         , 'build.php?id=24'],
     ['Казарма'         , 'build.php?id=37'],
     ['Конюшня'      ,  'build.php?id=28'],
     ['Работилница'      ,  'build.php?id=32'],  
     ['Таверна'      ,  'build.php?id=29'],  
     ['Ковачница за оръжия'      ,  'build.php?id=25'],  
     ['Ковачница за брони'      ,  'build.php?id=27&a=7'],  
     ['-------------------------------------------'        , ''],
     ['biq4a_78'      ,  'karte.php?d=240762&c=d8'],  
     ['krisko007_96'      ,  'karte.php?d=236758&c=6c'],  
     ['GT_Team'      ,  'karte.php?d=240759&c=2e'],  
     ['Bruninho10'      ,  'karte.php?d=239956&c=bc'],  
     ['YuMoH'      ,  'karte.php?d=236757&c=1e'],  
     ['4ips'      ,  'karte.php?d=238360&c=0b'],  
     ['sanni'      ,  'karte.php?d=242355&c=ac'],  
     ['naruto0928'      ,  'karte.php?d=235149&c=3e'],  
     ['miro'      ,  'karte.php?d=243161&c=1b'],  
     ['kill_barby'      ,  'karte.php?d=241563&c=9a'],  
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