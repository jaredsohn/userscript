// ==UserScript==
// @name           اضافة روابط ترافيان مترجمة بالعربي
// @namespace      http://userscripts.org/users/62310
// @author         http://www.travianutility.com
// @description    iSedo Script to add "Links" menu to travian (like travian plus) ARABIC - لإضافة قائمة الروابط كما في بلاس
// @version        1.0.0
// @include        http://*.travian.*php*
// @exclude 	   http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude 	   http://*.travian.*/chat.php*
// @exclude 	   http://forum.travian.*
// @exclude 	   http://*.travian.*/index.php*
// @exclude 	   http://*.travian.*/manual.php*
// @exclude 	   http://s6.travian.*
// ==/UserScript==

//Configuration
var links = [
    ['السوق'     , 'build.php?gid=17'],
    ['نقطة تجمع'     , 'build.php?gid=16'],
    ['الثكنة'        , 'build.php?gid=19'],
    ['الأسطبل'        , 'build.php?gid=20'],
    ['المصانع الحربية'        , 'build.php?gid=21'],
    ['التحالف'        , 'allianz.php'],
    ['المساعدة'     , 'http://help.travian.ae/'],
    ['خريطة حل اللعبة'        , 'http://img458.imageshack.us/img458/6783/alberocostruzionietruppsp0.gif'],
    ['الخريطة'        , 'http://travmap.shishnet.org/?lang=ae'],
    ['Travian Utility موقع '        , 'http://www.travianutility.com/'],
    ['Travian World Analyzer موقع'        , 'http://travian.ws/'],
    ['تقارير الهجمات'        , 'http://travilog.org.ua/ae/'],
	
    
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