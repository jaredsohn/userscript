// ==UserScript==
// @name           Menu + Transport
// @description    Adds an additional menu + transportation
// @include        http://*.ikariam.*/*
// ==/UserScript==


//-------------------------------------------------------TRANSPORT---------------------------------------------------------



// Add styles BEGIN
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'#transportBox { height: 20px; width: 200px; position: relative; margin:-185px 29px -18px 1000px; z-index:99; display:block;}');
// Add styles END

var ikMain = document.getElementById('mainview');
var ikNewElement = document.createElement('div');
ikNewElement.setAttribute('id', 'transportBox');
ikMain.parentNode.insertBefore(ikNewElement, ikMain);


var citySelect = document.getElementById("citySelect");

var new_options = "";
for(var i=0;i<citySelect.length;i++){
//<a href=\"index.php?view=transport&amp;destinationCityId="+citySelect[i].value+"\">T</a>
  new_options = new_options+"<option value=\""+citySelect[i].value+"\">"+citySelect[i].text+"</option>";
}

document.getElementById("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" style=\"width:130px;\">"+new_options+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /><input type=\"submit\" value=\"Go!\" /></form>";



//------------------------------------------------------------LEW menu-------------------------------------------------------



var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:820px;'+
'margin-top: -18.5px;'+
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
'font: bold 11px/16px arial, Times New Roman, helvetica, sans-serif;'+
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
//questa funzione ĂÂ¨ quasi standard, usata in molti script greasemonkey
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
+ ' <li><h2>Menu</h2>'
+ '   <ul>'
+ '     <li><center><a target="" href="TU WKLEJ LINK DO TWOJEJ AMBASADY" title="Moja ambasada">Ambasada</a></li>'
+ '     <li><center><a target="" href="http://s13.ikariam.pl/index.php?view=sendAllyMessage&oldView=diplomacyAdvisor&watch=4&id=30458&position=14&type=50" title="Wyslij wiadomosc do wszystkich czlonków sojuszu">Wiadomosc dla sojuszu</a></li>'
+ '     <li><center><a target="_blank" href="http://lew2.phorum.pl/" title="Strona domowa sojuszu">Forum LEW</a></li>'
+ '     <li><center><a target="_blank" href="http://pl-k.pl/ikariam/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Ikariam koordynator ">Konwerter RW</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ikariam.woli.pl/index.php" title="woli.pl CRW">Konwerter RW</a></li>'
+ '     <li><center><a target="_blank" href="http://ik.kernel-tools.eu/pl/" title="Ares CRW">Konwerter RW</a></li>'
+ '     <li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Symulator wyniku planowanej walki ">Symulator walki</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/pl/suche.php?view=suche_spieler&land=pl" title="Jesli pragniesz kogoś znaleźć">Szukaj gracza</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/pl/suche.php?view=suche_stadt&land=pl" title="a nie znasz jego nicku">Szukaj miasta</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.ogame-world.com/pl/suche.php?view=suche_insel&land=pl" title="i miasta nazwy też nie pomnisz :)">Szukaj wyspy</a></li>'
+ '     <li><center><a target="_blank" href="http://www.ika-core.org/search/supermap.php#" title="Mapa naszego świata na woli.pl">Świat Ny</a></li>'
+ '     <li><center><a target="_blank" href="http://basil.nazwa.pl/ikariam.php?act=fight" title=" Różne przeliczniki jednostek wojskowych, chyba nie aktualne w stosunku do v3.0 ">Przelicznik jednostek</a></li>'
+ '     <li><center><a target="_blank" href="http://ikariam.wikia.com/wiki/Main_Page" title=" Wiki ">Ikariam Wiki</a></li>'


//BY DODAĆ WŁASNE LINKI SKORZYSTAJ Z PONIŻSZEGO WZORU
//+ '     <li><center><a target="" href="TU WKLEJ (MIĘDZY TE CUDZYSŁOWY) ADRES LINKU" title="TU WPISZ CO CHCESZ BY SIĘ POJAWIŁO W TOOLIPIE">TU WPISZ NAZWĘ DO SWEGO LINKU</a></li>'
//CAŁOŚĆ (OD + DO >' UMIEŚĆ POD LUB MIEDZY POWYŻSZYMI LINKAMI, W ZALEZNOŚCI OD MIEJSCA GDZIE UMIEŚCISZ LINK W TAKIEJ KOLEJNOŚCI BĘDZIE WIDOCZNY W OKNIE PRZEGLADARKI 
+'</ul>'
+'</DIV>';

break;
}}}

addIKOS_ToolsMenu();