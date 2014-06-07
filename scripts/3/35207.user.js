// ==UserScript==
// @name           Travian Links [RUS]
// @namespace       
// @description    Быстрые ссылки для травиана н русском языке. Quick links for travian on russian
// @include        http://*.travian*.*/*.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/gutscheine.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://help.travian*.*/*
// @exclude        *.css
// @exclude        *.js
// ==/UserScript==

 //Configuration
 var links = [
     ['Альянс'     , 'allianz.php'],
     ['Нападения'   , 'allianz.php?s=3'],
     ['Форум'        , 'allianz.php?s=2'],
     ['Казарма'         , 'build.php?gid=19'],
     ['Конюшня'      ,  'build.php?gid=20'],
     ['Рынок'      ,  'build.php?gid=17'],   
     ['Мастерская'      ,  'build.php?gid=21'],   
     ['FAQ'      ,  'http://help.travian.ru/'],   
     ['Ратуша'      ,  'build.php?gid=24'], 
     ['Кирилоид.ру'      ,  'http://www.kirilloid.ru/travian/index.php'],   
     ['Калькулятор скорости'      ,  'http://www.javaschubla.de/2006/travian/wegerechner/wegerechner-t3i.html?lang=ru&dim=400'], 
     ['Скрипты для травиана'      ,  'http://vot-eto-vesh.ucoz.ru'], 

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