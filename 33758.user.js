// ==UserScript==
// @name          Ferramentas Hunos
// @namespace      Hunos
// @description    ferramentas para a aliança Hunos - Beta
// @include        http://s2.ikariam.*/index.php*
// @author         Original por Roy
// @version        20080915	 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'Uno';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
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
+ ' <li><h2>Hunos</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=102687&position=9&type=50" title="Enviar mensagem a todos os membros">Mensagem Circular</a></li>'

+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendMessage&oldView=diplomacyAdvisor&watch=4&id=99078&position=4&with=16508&receiverName=lindaa" title="Enviar mensagem ao Lider">Mensagem Lider</a></li>'
+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendMessage&oldView=diplomacyAdvisor&watch=4&id=99078&position=4&with=16520&receiverName=moura27" title="Enviar mensagem ao Secretario de Estado">Mensagem Secretario de Estado</a></li>'
+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendMessage&oldView=diplomacyAdvisor&watch=4&id=99078&position=4&with=20083&receiverName=Ornato" title="Enviar mensagem ao General">Mensagem General</a></li>'
+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendMessage&oldView=diplomacyAdvisor&watch=4&id=99078&position=4&with=16440&receiverName=brokken" title="Enviar mensagem ao Diplomata">Mensagem Diplomata</a></li>'
+ '     <li><center><a target="" href="http://s2.ikariam.com.pt/index.php?view=sendMessage&oldView=diplomacyAdvisor&watch=4&id=99078&position=4&with=16440&receiverName=roy42" title="Enviar mensagem a Academia">Mensagem Academia</a></li>'
+ '     <li><center><a target="_blank" href="http://hunosikariam.forumeiros.com/" title=" Fórum da Aliança Hunos ">Fórum Hunos</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" title=" Compactador de batalhas para publicar no fórum ">Compactador de batalhas</a></li>'
+ '	<li><center><a href="http://ikariam.immortal-nights.com/ikafight/" title=" Comprova de ganhas uma batalha ">Simulador de batalhas</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_stadt" title=" Procura as cidades e coordenadas em que se encontra um jogador ">Procura Jogadores</a></li>'

+'</ul>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();
