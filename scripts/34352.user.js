// ==UserScript==
// @name           خاص بقريتي 
// @namespace      http://userscripts.org/Keos
// @description    تم التعديل على سكريبت لا تحمل لن يفيدك خاص بقريتي فقط
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

    ['صندوق الواردات'    , 'nachrichten.php'],
    ['المرسلة'    , 'nachrichten.php?t=2'],
    ['تقارير'    , 'berichte.php'],

    ['حقول القرية'        , 'dorf1.php'],
    ['مـركز القرية'    , 'dorf2.php'],
    ['الخريطة'    , 'karte.php'],

    ['السوق ثكنة الخطاب'    , 'build.php?id=25'],
    ['شراء ثكنة الخطاب'    , 'build.php?id=25&t=1'],
    ['بيع ثكنة الخطاب'    , 'build.php?id=25&t=2'],

    ['نقطة التجمع '    , 'build.php?id=39'],
    ['إرسال قوات'    , 'a2b.php'],

    ['الثكنه'    , 'build.php?id=24'],
    ['الإسطبل'    , 'build.php?id=22'],
    ['المصانع الحربية'    , 'build.php?id=35'],
    ['الصياد'    , 'build.php?id=19'],

    ['البلدية'    , 'build.php?id=34'],
    ['القصر ثكنة الخطاب'    , 'build.php?id=23'],

    ['التحالف'    , 'allianz.php'],
    ['الهجمات'    , 'allianz.php?s=3'],
    ['المنتدى'    , 'allianz.php?s=2'],
    ['الاخبار'    , 'allianz.php?s=4'],

    ['احصائيات'    , 'statistiken.php'],
    ['التحالفات'    , 'statistiken.php?id=4'],
    ['أفضل 10'    , 'statistiken.php?id=7'],

    ['عضوية اللاعب'    , 'spieler.php?uid=40499'],



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
