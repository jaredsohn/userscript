// ==UserScript==
// @name		The Ika-core Tools para Elite
// @version 	84
// @namespace 	Gboz
// @author		Gboz
// @description	The Ika-core Tools for Alliance - ika-core
// @include		http://s*.ikariam.*/*
// @require		http://www.ika-core.org/scripts/ika-core.js
// ==/UserScript==
// ===========================================================================
//basically u can copy this now, this part of the script is has no copyright, as long as the @require http://www.ika-core.org/scripts/ika-core.js
//stays untouched.
// You can create a copy of this and host it anywhere, when a new version of ika-core comes out the users have to simply reinstall  your script from your location
// and it will fetch automatically the newest ika-core version.
// So even if you change your version, and the users update , it is guaranteed that they get the latest ika-core and the search functionality it prvides.
// ika-core script will check periodically if there is a newer version and will prompt the users to update your script, named "whatever" so the users will fetch the latest.
//ika core hold its own version number now.

var version=84;
var scriptlocation="http://www.ika-core.org/scripts/ika-core-tools.user.js";
country='es';

// Settings for every server
switch (location.host) {
	default:
		alliancefullnm='Tropas de Elite';
		alliancenm='Elite';		
		alliance=[	['No alliance', NoAlliance	],
					['ELITE'	, Alliance		],
					['ELIT3'	, Allies		],
					['TCM'		, Allies 		],
					['TCM2'	    , Allies 		],
					['Dg5'	    , Allies		],
					['ZEUS'	    , Allies 		],
					['ARPA'	    , Allies 		],
					['MBU'	    , Allies		],
					['ZEUS'	    , Allies 		],
					['UTOPY'    , Allies 		]  ];
					
		//Use the DOT (.) to not include the chat, forum, forumnew in the menu.
		//chaturl='.';
		chaturl='http://www.xatech.com/web_gear/chat/chat.swf?id=60288174&lg=SpanishArgentina';
		forumurl='http://foro.alianzaelite.com.ar/';
		//forumurl='http://forum.com/';
		forumurlnew='http://foro.alianzaelite.com.ar/search.forum?search_id=newposts';
		//forumurlnew='http://=newposts';
		break;
}
	
var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:620px;'+
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
+ ' <li><h2>Elite</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://foro.alianzaelite.com.ar/" align="left">&nbsp;Foro de la Alianza</a></li>'
+ '     <li><center><a target="_blank" href="http://www.xatech.com/web_gear/chat/chat.swf?id=60288174&lg=SpanishArgentina" align="left">&nbsp;Chat de la Alianza</a></li>'
+ '     <li><center><a href="http://s2.ar.ikariam.com/index.php?view=sendIKMessage&msgType=51&allyId=3872" align="left">&nbsp;Enviar Mensaje Global</a></li>'
+ '     <li><center><a target="_blank" href="http://imageshack.us/" align="left">&nbsp;Subir Imagenes</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" align="left">&nbsp;Simulador de Batallas</a></li>'
+ '	<li><center><a href="http://www.ika-world.com/ar/suche.php?view=suche_stadt&land=ar" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Buscador de jugadores, islas y ciudades ">Buscador de ciudades</a></li>'
+ '	<li><center><a href="http://hi.muriandre.com/cdb.php" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Compacta una batalla para publicarla en un foro ">Compactador de batallas</a></li>'
+ '	<li><center><a href="http://foro.alianzaelite.com.ar/guias-tutoriales-f7/-t48.htm" target="_blank" onClick="window.open(this.href, this.target); return false;" title=" Lista de todos los Scripts Actualizada ">Lista de Scripts</a></li>'
+'</ul>'
+'</DIV>';

break;
}}}

add_Alliance_Menu();