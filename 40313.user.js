// ==UserScript==
// @name           Herramienta para los miempros de CNFM (V 1.0)
// @namespace      ikatips
// @description    Herramienta en desarrollo para los miempros de CNFM
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por Renegade4 -Modificado por Buby_s-Modificado por zedkin
// @version        15082008 110930 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookie    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_Menu_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';


var css_Menu_String2 = '#menu2 {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -16.5px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu2 ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu2 a, #menu2 h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu2 a {'+
'color: RGB(84,44,15);'+
//Colores menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu2 a:hover {'+
'color: RGB(84,44,15);'+
//Color menu seleccionado.
'background: RGB(222,180,120);'+
'border: double 3px RGB(84,44,15);'+
'}'+
'#menu2 li {position: relative; }'+
'#menu2 ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu2 ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 100%;'+
'}'+
'div#menu2 ul ul,'+
'div#menu2 ul li:hover ul ul,'+
'div#menu2 ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu2 ul li:hover ul,'+
'div#menu2 ul ul li:hover ul,'+
'div#menu2 ul ul ul li:hover ul'+
'{display: block;}';


//esta funci�n es casi standard, usada en muchos script de greasemonkey
if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}

return arrResult;

}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookie,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookie);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookie);
window.location.reload();
}


function addToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var Tools_Link       = document.createElement('LI');
Tools_Link.setAttribute('id', 'Tools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(Tools_Link,xLi);
add_Global_Style(css_Menu_String2);
document.getElementById('Tools').innerHTML =
'<div id="menu2">'
+ '<ul>'
+ ' <li><h2>Menu CNFM</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://confederacion.foroactivo.net" title="Foro de la alianza CNF">Foro CNF</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title="Compactador de batallas para publicarlas en el foro">Compactador de batallas</a></li>'
+ '	<li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title="Comprueba si ganaras una batalla">Simulador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ika-world.com/ar/suche.php?view=suche_spieler&land=ar" title="Busca las ciudades y coordenadas en las que se encuentra un jugador">Buscador de Jugadores</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ika-world.com/ar/suche.php?view=suche_insel&land=ar" title=" Busca las coordenadas de una isla">Buscador de Islas</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=2338&oldView=highscore" title="Enviar mensaje al Lider">Lider CNF</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=2338&oldView=highscore" title="Enviar mensaje al Ministro de Interior">Ministro CNF</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=2338&oldView=highscore" title="Enviar mensaje al General">General CNF</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=2338&oldView=highscore" title="Enviar mensaje al Diplomatico">Diplomatico CNF</a></li>'
+ '     <li><center><a>-------------</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=1741&oldView=highscore" title="Enviar mensaje al Lider  y General">Lider y General CNFM</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=42028&oldView=highscore" title="Enviar mensaje al Ministro de Interior">Ministro CNFM</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=44791&oldView=highscore" title="Enviar mensaje al Capitan">Capitan CNFM</a></li>'
+ '     <li><center><a href="http://s1.ar.ikariam.com/index.php?view=sendMessage&with=1612&oldView=highscore" title="Enviar mensaje al Diplomatico">Diplomatico CNFM</a></li>'
+ '     <li><center><a>---by zedkin---</a></li>'
+'</ul>'



+'</DIV>';

break;
}}}
addToolsMenu();
