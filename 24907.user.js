// ==UserScript==
// @name           Travian Links / قائمة "الروابط" بالعربي - ترفيان
// @namespace      http://userscripts.org/Keos
// @description    Script to add "Links" menu to travian (like travian plus) ARABIC - لإضافة قائمة الروابط كما في (بلاس)، جميل جدا
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
    ['مـركز القرية'    , 'dorf2.php'],
    ['الثـكنة'     , 'build.php?id=27'],
    ['التحالف'        , 'allianz.php'],
    ['السـوق'        , 'build.php?id=32'],
    ['المنـتـــدى'        , 'allianz.php?s=2'],

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
elemB.appendChild(document.createTextNode('الروابط:'));
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

