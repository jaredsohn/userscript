 // ==UserScript==
 // @name           травиан меню
 // @namespace      thanks to Keos http://userscripts.org/Keos
 // @description    this script is a modification from Keos links travian script. thanks!
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
     ['-------------------------------------------------'        , ''],
     ['Казарма'         , 'build.php?id=25'],
     ['Конюшня'      ,  'build.php?id=20'],
     ['Работилница'      ,  'build.php?id=32'],  
     ['Таверна'      ,  'build.php?id=23'],  
     ['Ковачница за оръжия'      ,  'build.php?id=22'],  
     ['Ковачница за брони'      ,  'build.php?id=24'],  
     ['-------------------------------------------------'        , ''],
     ['Alf'      ,  'karte.php?d=240759&c=2e'],  
     ['Монтана'      ,  'karte.php?d=238357&c=3d'],  
     ['crazy big citi'      ,  'karte.php?d=240762&c=d8'],  
     ['LLL'      ,  'karte.php?d=241563&c=9a'],  
     ['New York'      ,  'karte.php?d=236758&c=6c'],  
     ['arnelioko miestas'      ,  'karte.php?d=235156&c=30'],  
     ['GODS'      ,  'karte.php?d=238352&c=df'],  
     ['Градът на  drygin'      ,  'karte.php?d=245565&c=7d'],  
     ['zezo2'      ,  'karte.php?d=239964&c=fd'],  
     ['Градът на  RnS'      ,  'karte.php?d=243171&c=ca'],  
     ['ABRITUS'      ,  'karte.php?d=235162&c=a5'],  
     ['Изоставена Долина (желязо)'      ,  'karte.php?d=233552&c=3b'],  
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