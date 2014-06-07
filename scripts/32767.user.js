// ==UserScript==
// @name           Menu des Emperors
// @version        1
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================

//
// un m?lange de plusieur script s r?adapt? pour les besoins de notre alliance.
// Ikariam and WikIkariam are copyrighted by their respective owners.
// Sur Firefox 3 le module Forum and News ne fonctionne pas!
//menue ODL
var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'
+ 'align:right;'
+ 'margin-left:867.5px;'
+ 'margin-top: -16.5px;'
+ 'color:white;'
+ 'width: 60px;'
+ 'cursor: hand;'
+ '}'
+ '#menu ul {'
+ 'list-style: none;'
+ 'margin: 0;'
+ 'padding: 0;'
+ 'width: 13em;'
+'}'
+ '#menu a, #menu h2 {'
+ 'font: bold 11px/16px arial, helvetica, sans-serif;'
+ 'display: block;'
+ 'margin: 0;'
+ 'padding: 2px 3px;'
+ 'cursor: hand;'
+ '}'
+ '#menu a {'
+ 'color: RGB(84,44,15);'
//Couleur du menu
+ 'background: RGB(246,235,188);'
+ 'border: double 3px RGB(84,44,15);'
+ 'border-left: double 3px RGB(84,44,15);'
+ 'border-right: double 3px RGB(84,44,15);'
+ 'text-decoration: none;'
+ '}'
+ '#menu a:hover {'
+ 'color: RGB(84,44,15);'
//Couleur du menu survol?.
+'background: RGB(222,180,120);'
+'border: double 3px RGB(84,44,15);'
+'}'
+'#menu li {position: relative; }'
+'#menu ul ul {'
+'position: relative;'
+'z-index: 500;'
+'}'
+'#menu ul ul ul {'
+'position: absolute;'
+'top: 0;'
+'left: 100%;'
+'}'
+'div#menu ul ul,'
+'div#menu ul li:hover ul ul,'
+'div#menu ul ul li:hover ul ul'
+'{display: none;}'
+'div#menu ul li:hover ul,'
+'div#menu ul ul li:hover ul,'
+'div#menu ul ul ul li:hover ul'
+'{display: block;}';
//questa funzione ? quasi standard, usata in molti script greasemonkey
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
+ ' <li><h2>Menu des Emperors</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://allyemp.forumactif.net/forum.htm" title=" Forum de l alliance des Emperors">Forum des Emperors</a></li>'
//+ '     <li><center><a target="_blank" href="http://s2.convertisseur-ikariam.fr.nf/" title=" Convertir un Rapport de Bataille ">Convertir un RC</a></li>'
//+ '	  <li><center><a target="_blank" href="http://ikariamlibrary.com/?content=IkaFight" title=" Simuler une bataille pour eviter le pire">Simuler une bataille</a></li>'
//+ '     <li><center><a target="_blank" href="http://ikariam.visca-barca.ru/fr/" title="Simulateur de pillage">Simuler un pillage</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_stadt" title=" Rechercher une ville ou des coordonées en fonction du nom du joueur ">Rechercher un Joueur</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/fr/suche.php?view=suche_insel" title=" Rechercher les coordonées d une ile d">Rechercher une ile</a></li>'
//+ '     <li><center><a target="_blank" href="irc://irc.onlinegamenet.net/ikariam.fr-epsilon/" title=" Ouvre le salon du serveur Epsilon sur IRC, avec chatzilla ">IRC serveur Epsilon</a></li>'
+ '     <li><center><a target="_blank" href= http://fr.ikariam.wikia.com/wiki/Accueil " title="Aide de wikipédia pour Ikariam">Ikipédia</a></li>'


+ '	 </ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();

// Browser ODL Forum and News
var version = "0.9";
var displayedflag = 0;

unsafeWindow.displaywiki = function() {
	if(displayedflag == 0) {
		document.getElementById("wikiframe").innerHTML = '<iframe width="793" border="0" frameborder="0" height="100%" src="http://ero.xooit.fr/index.php" style="margin-left:0px;"></iframe>';
		displayedflag = 1;
	}
}

unsafeWindow.showwiki = function() {
	document.getElementById("wikibar").style.left = "10%;"
}

unsafeWindow.hidewiki = function() {
	document.getElementById("wikibar").style.left = "-830px;"
}

vwikibar = document.createElement("div");
vwikibar.setAttribute("id", "wikibar");

var body = document.getElementsByTagName("body");

body[0].appendChild(vwikibar);


var wkHTML = '<div id="wikiclose" onclick="hidewiki()"><a style="height:100%;width:100%; position: absolute; top:0px; right:0px;"></a></div>'
	+ '<div style="color:#542C0F;line-height: 35px; font-size: 12px; font-weight: bold;width:800px;position:absolute;top:0px;left:0px;height:30px;background:url(http://img116.imageshack.us/img116/7596/wikibarbgtopkk8.gif);background-repeat:no-repeat;">ODL Forum & News v'+version+'</div>'
	+ '<div id="wikiframe" style="position:absolute;top:30px;bottom:3px;left:4px;"></div>'
	+ '<div style="width:800px;position:absolute;bottom:0px;left:0px;height:3px;background:url(http://img379.imageshack.us/img379/8848/wikibarbgbotqr6.gif);background-repeat:no-repeat;"></div>';

GM_addStyle("#wikiclose { background:url(http://img413.imageshack.us/img413/3836/closefangx8.png); width:20px; height:20px; position:absolute; right:-20px; top:2px; } ");
GM_addStyle("#wikiclose:hover { cursor: pointer; } ");
GM_addStyle("#wikibar { background:url(http://img341.imageshack.us/img341/1186/wikibarbgmidna4.gif); padding-top:33px; width:800px; position:fixed; left:-830px; top:15px; bottom:50px; border:1px black solid; z-index:50;");
GM_addStyle("#wikibar:hover { left:0px; }");
GM_addStyle("#wikitab { background:url(http://img244.imageshack.us/img244/6579/tabodlfw5.png); position:relative; left:0px; bottom:0px; } ");
GM_addStyle("#wikitab:hover { cursor: pointer; } ");

document.getElementById("wikibar").innerHTML = wkHTML;