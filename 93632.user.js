// ==UserScript==
// @name           Menu PERCE
// @namespace      http://forumdespercefr.forumactif.net/
// @description    Menu pour PERCE dans Ikariam Serveur ETA
// @include        http://s7.fr.ikariam.*/index.php*
// @author         BBH
// @version        1.0
// ==/UserScript==

//  21.12.2010
// Adaptation du script de TK
var tagsAModificar = new Array("A","FRA");
var diaLimite     = 2;
var cookieMYG    = 'MYGFONT';
var cookie_SEPARA    = '|';
var css_MenuMYG_String = '#menu {'+
'align:center;'+
'background: RGB(246,235,188);'+
'border: double 3px RGB(184,74,12);'+
'margin-left:900px;'+
'margin-top: -16.5px;'+
'color:red;'+
'width: 82px;'+
'height: 16px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/12px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+
//Couleurs menu normal.
'background: RGB(246,235,188);'+
'border: double 3px RGB(84,44,15);'+
'border-left: double 3px RGB(84,44,15);'+
'border-right: double 3px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+
//Couleur menu selectionne.
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
//fonction utilisee sur les scripts greasemonkey
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
 createCookie(cookieMYG,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
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
var rC     = readCookie(cookieMYG);
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
eraseCookie(cookieMYG);
window.location.reload();
}
// menu Perce
function addMYG_ToolsMenu(){
var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var MYGTools_Link       = document.createElement('LI');
MYGTools_Link.setAttribute('id', 'MYGTools');
for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(MYGTools_Link,xLi);
add_Global_Style(css_MenuMYG_String);
document.getElementById('MYGTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2><left>Menu PERCE</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://forumdespercefr.forumactif.net/h13-evenements-dans-l-alliance" title=" Informations">Evenements</a></li>'
+ '     <li><center><a target="_blank" href="http://forumdespercefr.forumactif.net/" title=" http://forumdespercefr.forumactif.net/">Forum PERCE</a></li>'
+ '     <li><center><a target="_blank" href="http://forumdespercefr.forumactif.net/h2-annuaire" title=" Adresses importantes">Annuaire</a></li>'
+ '     <li><center><a target="_blank" href="http://forumdespercefr.forumactif.net/t1097-carte-actualisee" title=" Carte Perce">Map Perce</a></li>'
+ '     <li><center><a target="_blank" href="http://tools.betawarriors.com/ikcrc/?lang=fr" title=" Comvertisseur de rapports de combats">Convertisseur de RC</a></li>'
+ '     <li><center><a target="_blank" href="http://forumdespercefr.forumactif.net/h10-menu-des-tutoriels" title="Menu des tutoriels">Tutoriels</a></li>'
+ '     <li><center><a target="_blank" href="http://fr.ika-world.com/?view=&land=fr&welt=7" title="Outils Ika World">Ika World</a></li>'


+'</ul>'
+'</DIV>';
break;
}}}
addMYG_ToolsMenu();



