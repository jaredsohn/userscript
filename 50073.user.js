// ==UserScript==
// @name	Script para alianzas
// @namespace  	Menu
// @description	Versión legalizada del script.
// @include    	http://*.ikariam.*/*
// ==/UserScript==

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:910px;'+
'margin-top: -16.5px;'+
'color:navy;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 125px;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 12px/16px calibri, arial, comic sans ms;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(186,0,22);'+
//Colores menu normal.
'background: #f6ebba;'+
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
+ ' <li><h2>Monkey DºLuffy</h2>'
+ '   <ul>'
+ '	<li><center><a href="http://alianzamok.freeforums.org" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Monkeys of Kaos">α MoK2</a></li>'
+ '	<li><center><a href="http://www.nm.forosonline.es" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Nuevo Mundo">β -NM-</a></li>'
+ '	<li><center><a href="http://linajedezeus.foroactivo.net" target="_blank" onClick="window.open(this.href, this.target); return false;" title="LiNaJe dE ZeUz">γ [_LdZ_]</a></li>'
+ '	<li><center><a href="http://spar.foroactivo.net" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Esparta Reborn">δ [SPAr]</a></li>'
+ '	<li><center><a href="http://www.la-vieja-corleone.foro-gratuito.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="La Vieja-CLE">ε [L-VC]</a></li>'
+ '	<li><center><a href="http://templars-and-dragons.foroactivo.net" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Excelencia TmPl">ζ [X-TD]</a></li>'
+ '	<li><center><a href="http://ikar.superforo.net" target="_blank" onClick="window.open(this.href, this.target); return false;" title="HELLAS3">η [HLS3]</a></li>'
+ '	<li><center><a href="http://z13.invisionfree.com/MGMP" target="_blank" onClick="window.open(this.href, this.target); return false;" title="MGM-Pretorians">θ [MGM-P]</a></li>'
+ '	<li><center><a href="http://ligaaquea.foroactivo.net" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Liga Aquea">ι [CODA]</a></li>'
+ '	<li><center><a href="http://monkeyswarrior.creatuforo.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Monkeys Warrior">κ [-MW-]</a></li>'
+ '	<li><center><a href="Sin Foro" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Monkeys of Kaos">λ [MoK]</a></li>'
+ '	<li><center><a href="http://legendariosforo.creatuforo.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Los Legendarios">μ [LGN]</a></li>'
+ '	<li><center><a href="http://linaje-de-zeuz.foroactivo.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Linaje de Zeuz">ν [ΨLdZΨ]</a></li>'
+ '	<li><center><a href="Sin Foro" target="_blank" onClick="window.open(this.href, this.target); return false;" title="SIN NOMBRE">α [-SN-]</a></li>'
+ '	<li><center><a href="http://www.ika-world.com/es/suche.php"_blank" onClick="window.open(this.href, this.target); return false;" title="Buscador de Jugadores, Colonias e Islas">Ikariam-World</a></li>'
+ '	<li><center><a href="http://hi.muriandre.com/cdb.php" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Compactador de batallas by Conan">Compactador de Batallas</a></li>'
+ '	<li><center><a href="http://userscripts.org/users/76238" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Monkey DºLuffy">Userscripts</a></li>'
+ '	<li><center><a href="http://ikariamtips.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Monkey DºLuffy">Ikariamtips</a></li>'
+ '	<li><center><a href="http://ikariam.wikia.com/wiki/Main_Page" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Ikariam Wikia (ingles)">Wikariam</a></li>'
+ '	<li><center><a href="http://ikariamlibrary.com" target="_blank" onClick="window.open(this.href, this.target); return false;" title="Ikariam library (ingles)">Ikariamlibrary</a></li>'
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