// ==UserScript==
// @name           Di_Ti Tools
// @namespace      ikatips
// @description    Herramientas para la alianza Di_Ti
// @include        http://*ikariam.*/index.php*
// @author         El Hispano
// @version        20090707 
// ==/UserScript==

var tagsAModificar 		= new Array("A","SPAN");
var diaLimite      		= 2;
var cookieIKO     		= 'IKAFONT';
var cookie_SEPARA   		= '|';
var css_MenuIKO_String 	= '#menu {'+
'align:right;'+
'margin-left:740px;'+
'margin-top: -17.5px;'+
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
//questa funzione è quasi standard, usata in molti script greasemonkey
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
 createCookie(cookieIKO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
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
var rC     = readCookie(cookieIKO);
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
eraseCookie(cookieIKO);
window.location.reload();
}
function addIKOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var IKOSTools_Link       = document.createElement('LI');
IKOSTools_Link.setAttribute('id', 'IKOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(IKOSTools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('IKOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>Herramientas DI_TI</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://oceancompany.foroespana.com/index.htm" title=" Foro de la Alianza">Foro de la alianza</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&allyId=1359&msgType=51" title="Enviar un mensaje Circular">Mensaje Circular</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=12731" title=" Enviar un mensaje a la Líder ">MP Líder</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=19251" title=" Enviar un mensaje al Ministro del Interior ">MP M.Interior</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=21295" title=" Enviar un mensaje al General ">MP General</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=60409" title=" Enviar un mensaje al Diplomático ">MP Diplomático</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=84287" title=" Enviar un mensaje al Senador Franchuzo ">MP Senador Franchuzo</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=21465" title=" Enviar un mensaje al Senador Fechet ">MP Senador Fechet</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=12838" title=" Enviar un mensaje al Senador DarkRagnar ">MP Senador DarkRagnar</a></li>'
+ '     <li><center><a target="" href="http://s3.ikariam.es/index.php?view=sendIKMessage&receiverId=36428" title=" Enviar un mensaje al Senador El Hispano ">MP Senador El Hispano</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ika-core.org/search/supermap.php" title=" Encuentra las coordenadas de los jugadores y alianzas ">Mapa</a></li>'
+ '     <li><center><a target="_blank" href="http://hi.muriandre.com/cdb.php" title=" Compactador de batallas para publicarlas en el foro ">Compactador de batallas</a></li>'
+ '	  <li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" title=" Comprueba si vas a ganar una batalla ">Simulador de batallas</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt&land_i=14" title=" Busca las ciudades y coordenadas en las que se encuentra un jugador ">Buscador de jugadores</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_insel&land_i=14" title=" Busca las coordenadas de una isla ">Buscador de islas</a></li>'
+ '     <li><center><a target="_blank" href="http://userscripts.org/users/66957/scripts" title="Scripts del creador">Buscar Scripts</a></li>'
+ '     <li><center>By DI_TI</li>'
+ '	</ul>'
+ '</div>';

break;
}}}

addIKOS_ToolsMenu();