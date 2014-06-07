// Ikariam show building's level script
// version 0.1 BETA!
// 2008-10-14
// Copyright (c) 2008, Aleh Krutsikau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Travian MarketPlace", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name	Señalador de niveles de edificios de la Alianza NR
// @namespace	http://krolser.wordpress.com/projects/greasemonkey/
// @description	script for Ikariam show view
// @include	http://s*.ikariam.*/*
// ==/UserScript==

var getbody=document.getElementsByTagName('body')[0];

//some standard functions
var XPFirst	 = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList	 = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter	 = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
var XPIterOrder	 = XPathResult.ORDERED_NODE_ITERATOR_TYPE;

function XX(xpath, xpres, startnode, myhtml){
	if (!startnode) {startnode=document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (myhtml) ret.singleNodeValue.innerHTML=myhtml;
		return	xpres == XPFirst ? ret.singleNodeValue : ret;
}

function forall(query,startnode, call){
	var objs=XX(query,XPList,startnode);
	for (var i = 0; i < objs.snapshotLength; i++) 
		call(objs.snapshotItem(i),i);
}

function node(type, id, className, style, content, title ) {
    var n = document.createElement(type||"div"); 
    if (id) n.setAttribute('id',id);
    if (className) n.className = className;
    if (title) n.setAttribute('title',title);
    if (style) n.setAttribute('style',style);
    if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
    return n;
}

switch (getbody.id){
    case "city":
	forall('//ul[@id="locations"]/li[contains(@id,"position")]/a', null, function(obj,i){ 
	    var lvl = obj.title.replace(/[^\d-]+/g, "");
	    if (lvl.length>0) {
		var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:12px;height:12px;font-size:9px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: black ridge 3px;-moz-outline-radius: 8px 8px 8px 8px;text-align:center;',lvl);
		obj.parentNode.appendChild(as);
	    }
	});
    break;
}

// ==UserScript==
// @name           ALIANZA NR
// @namespace      ikatips
// @description    Herraminetas para la alianza 
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por TODOS
// @version        20080619 120713 
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
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
'background: RGB(216,235,158);'+
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
//esta característica es casi estándar, utilizado en muchos scripts de Greasemonkey
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
+ ' <li><h2>-TA-</h2>'
+ '   <ul>'
+ '     <li><a target="_blank" href="http://lostemplarios.uniogame.com/forum.htm" title="FORO -TA-" align="left">&nbsp;Foro y Chat -TA-</a></li>'
+ '     <li><a target="_blank" href="http://s1.ar.ikariam.com/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=131675&position=4&type=50" title=" Mensaje a todos " align="left">&nbsp;Mensaje a todos</a></li>'
+ '     <li><a target="_blank" href="http://s1.ar.ikariam.com/index.php?view=diplomacyAdvisor&oldView=diplomacyAdvisor" title=" Diplomacia " align="left">&nbsp;Lista de mesajes -TA-</a></li>'
+ '     <li><a target="_blank" href="http://s1.ar.ikariam.com/index.php?view=finances" title=" Finanzas " align="left">&nbsp;Finanzas -TA-</a></li>'
+ '     <li><a target="_blank" href="http://s1.ar.ikariam.com/index.php?view=merchantNavy" title=" Mercantes " align="left">&nbsp;Barco Mercantes -TA-</a></li>'
+ '     <li><a target="_blank" href="http://s1.ar.ikariam.com/index.php?view=informations&articleId=10007&mainId=10007" title=" Ayuda " align="left">&nbsp;Ayuda -TA-</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();
