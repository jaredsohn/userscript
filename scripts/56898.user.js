// ==UserScript==
// @name	Menu APIKA
// @namespace  	Menu
// @description	Versión legalizada del script de Darkolem creada por jacky1305.(1.2)
// @include    	http://s1.ikariam.es/index.php*
// @include     http://s2.ikariam.es/index.php*
// @include    	http://s3.ikariam.es/index.php*
// @include    	http://s4.ikariam.es/index.php*
// @include    	http://s5.ikariam.es/index.php*
// @include    	http://s6.ikariam.es/index.php*
// @include    	http://s7.ikariam.es/index.php*
// @include    	http://s8.ikariam.es/index.php*
// @include    	http://s9.ikariam.es/index.php*
// @include    	http://s10.ikariam.es/index.php*
// @include    	http://s11.ikariam.es/index.php*
// @include    	http://s12.ikariam.es/index.php*
// ==/UserScript==


var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:750px;'+
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
function add_Alliance_Menu(){
var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var Tools_Link       = document.createElement('LI');
Tools_Link.setAttribute('id', 'Tools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(Tools_Link,xLi);
add_Global_Style(css_MenuIKO_String);
document.getElementById('Tools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>Aprendices de Piratas</h2>'
+ '   <ul>'
+ '     <li><center><a href="http://s5.ikariam.es/index.php?view=sendIKMessage&msgType=51&allyId=10607" title=" Enviar circular a todos los miembros de APIKA " align="left">&nbsp;Enviar circular</a></li>'
+ '     <li><center><a href="http://s5.ikariam.es/index.php?view=sendIKMessage&receiverId=141257" title=" Escribir mensaje a Lider " align="left">&nbsp;Contactar con Lider</a></li>'
+ '     <li><center><a href="http://s5.ikariam.es/index.php?view=sendIKMessage&msgType=52&receiverId=141257" title=" Escribir mensaje a Diplomatico " align="left">&nbsp;Contactar Diplomatico</a></li>'
+ '     <li><center><a href="http://s5.ikariam.es/index.php?view=sendIKMessage&receiverId=147987" title=" Escribir mensaje a General " align="left">&nbsp;Contactar con General</a></li>'
+ '     <li><center><a href="http://s5.ikariam.es/index.php?view=sendIKMessage&receiverId=141257" title=" Escribir mensaje a Ministro del Interior " align="left">&nbsp;Contactar con Ministro del Interior</a></li>'
+ '	<li><center><a href="http://www.ika-world.com/es/suche.php?view=suche_deluxe&land=es&welt=5" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Buscador de jugadores, islas y ciudades ">Buscador de ciudades</a></li>'
+ '	<li><center><a href="http://hi.muriandre.com/cdb.php" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Compacta una batalla para publicarla en un foro ">Compactador de batallas</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

add_Alliance_Menu();

//niveles
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
		var as=node('a','blevels','blevels','background:#000;top:10px;left:25px;width:18px;height:18px;font-size:12px;margin:0;padding:0px 0px 0px 0px;color:#fff;-moz-outline: orange ridge 2px;-moz-outline-radius: 10px 10px 10px 10px;text-align:center;',lvl);
		obj.parentNode.appendChild(as);
	    }
	});
    break;
}
//niveles