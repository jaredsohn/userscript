// ==UserScript==
// @name           IKOSTools
// @namespace      ikostips
// @description    Herraminetas para la alianza IKOS
// @include        http://*ikariam.*/index.php*
// @author         Original por Verx - Modificado por alkan para IKOS
// @version        20080615 102433
// ==/UserScript==

var IKOSToolsIds  = new Array("opclos","FontForm","buscaBox","worldBox");
var tagsAModifar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieIKO    = 'IKAFONT';
var cookie_SEPARA    = '|';
var Css_MenuIKO_String = '#menu {'+
'align:right;'+
'margin-left:680px;'+
'margin-top: -17px;'+
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
if(!window.addGlobalStyle){
       function addGlobalStyle(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModifar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModifar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModifar[tagX]);
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
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModifar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKO);
window.location.reload();
}
function addAstraToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var astreaToolsLink       = document.createElement('LI');
astreaToolsLink.setAttribute('id', 'IKOSTool');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(astreaToolsLink,xLi);
addGlobalStyle(Css_MenuIKO_String);
document.getElementById('IKOSTool').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>IKOS</h2>'
+ '   <ul>'
+ '     <li><center><a target="_blank" href="http://ikos.foroes.net" title=" Foro de la Alianza Ikariam Oscuros ">Foro IKOS</a></li>'
+ '     <li><center><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batallas para publicarlas en el foro ">Compactador de batallas</a></li>'
+ '	<li><center><a href="http://ikariam.immortal-nights.com/ikafight/" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Comprueba si ganarás una batalla ">Simulador de batallas</a></li>'
//+ '     <li><a href="#" title="Cambia il font" onclick="showTools(1)">Font <input style="margin-left:10px; visibility:hidden;" id="c'+IKOSToolsIds[0]+'" type=CheckBox CHECKED DISABLED /></a></li>'
+ '     <li><center><a href="#" title=" Busca informacion de Jugadores, Ciudades, Alianzas e Islas " onclick="showTools(2)">Buscar información</a></li>'
//+ '     <li><a href="#" title="Cerca un bersaglio" onclick="showTools(3)">Scansione <input style="margin-left:10px; visibility:hidden;" id="c'+IKOSToolsIds[3]+'" type=CheckBox CHECKED DISABLED/></a></li>'
//+ '     <li><center><a target="_blank" href="http://localhost/tabla_ika.htm" target="_blank" onClick="window.open(this.href, this.target, \'width=600,height=210\'); return false;" title=" Actualiza la tabla ">Actualizar tabla</a></li>'
+ '   </ul>'
+ ' </li>'
+'</ul>';
+'</DIV>';

break;
}
}

}

unsafeWindow.calculateDefLvl = function(){

var wl = document.getElementById('walllvl').value;
var cl = document.getElementById('citylvl').value;
var percdef = null;
if  (isNaN(parseInt(wl)) || isNaN(parseInt(cl))) {alert ('Inserire valori numerici!');document.getElementById('percDef').innerHTML =''}
 
 else {
 percdef = Math.floor(((parseInt(wl)*10)/parseInt(cl))*parseInt(wl));
 document.getElementById('percDef').innerHTML = '<B>'+percdef+' %</B>';
 }  
 
}

unsafeWindow.showTools = function(){
var toolID = arguments;
var elemToShow = null;
for (var i = 0; i < arguments.length; i++) {
elemToShow = document.getElementById(IKOSToolsIds[toolID[i]]);

if (elemToShow) {
 if ((toolID[i] == 0) || (toolID[i] == 1)) {if (document.getElementById(IKOSToolsIds[0]).style.visibility == 'hidden') {
 document.getElementById(IKOSToolsIds[0]).style.visibility = 'visible';
 document.getElementById(IKOSToolsIds[1]).style.visibility = 'visible';
 if (document.getElementById('c'+IKOSToolsIds[0])) document.getElementById('c'+IKOSToolsIds[0]).style.visibility='visible';
 } else {
 document.getElementById(IKOSToolsIds[0]).style.visibility = 'hidden';
 document.getElementById(IKOSToolsIds[1]).style.visibility = 'hidden';
 if (document.getElementById('c'+IKOSToolsIds[0])) document.getElementById('c'+IKOSToolsIds[0]).style.visibility='hidden';
 }  } else {
 if (elemToShow.style.visibility == 'hidden') {elemToShow.style.visibility = 'visible'; if (document.getElementById('c'+IKOSToolsIds[toolID[i]])) document.getElementById('c'+IKOSToolsIds[toolID[i]]).style.visibility='visible';}
 else {elemToShow.style.visibility = 'hidden'; if (document.getElementById('c'+IKOSToolsIds[toolID[i]])) document.getElementById('c'+IKOSToolsIds[toolID[i]]).style.visibility='hidden';}
 }
}
}
}
unsafeWindow.showHide = function(fID){
var elemToShow = document.getElementById(fID);
var elemTrigger = document.getElementById(IKOSToolsIds[0]);
if (elemToShow.style.visibility == 'hidden') {elemToShow.style.visibility = 'visible'; elemTrigger.innerHTML='<<';}
 else {elemToShow.style.visibility = 'hidden'; elemTrigger.innerHTML='>>';}
}



function initFontSelects(){
var fontBoxHTML = '<TABLE style="border-collapse:collapse;"><TR><TD><b><a id="opclos" class="button" href="#" style="visibility: hidden; color: black; padding: 3px; margin-left: -20px;" onclick="showHide(\'FontForm\');"><<</a></b></TD><TD valign = "middle" id = "FontForm" style="visibility: hidden; "><DIV style="background: url(\'http://image.forumfree.it/3/1/3/7/3/2/3/1210841391.jpg\') repeat-x center left RGB(253,247,221); height: 20px; border: double 3px RGB(228,184,115); padding:4px; valign: middle;"><b>Family:</b><select id="Family">'
 +'<option selected>Arial</option>'
 +'<option>Courier</option>'
 +'<option>Comic Sans MS</option>'
 +'<option>Georgia</option>'
 +'<option>Times New Roman</option>'
 +'<option>Verdana</option>'
+'</select>'
+'<b>Size:</b>'
+'<select id="Size">'
 +'<option>8pt</option>'
 +'<option>9pt</option>'
 +'<option selected>10pt</option>'
 +'<option>12pt</option>'
 +'<option>14pt</option>'
+'</select>'
+'<b>Color:</b>'
+'<select id="Color">'
 +'<option selected>Black</option>'
 +'<option>Blue</option>'
 +'<option>Brown</option>'
 +'<option>Green</option>'
 +'<option>Orange</option>'
 +'<option>Red</option>'
+'</select>'
+'<input type="button" class="button" style="margin-top:-25px;margin-left:370px;" value="Cambia" onclick="setFontIka()"/><input type="button" class="button" style="margin-top:-37px;margin-left:530px;" value="Ripristina" onclick="clearFont()"/></DIV></TD></TR></TABLE>';
var changeFontNode;

var refIkaNode = document.getElementById('GF_toolbar');
if (refIkaNode) {
   changeFontNode = document.createElement('DIV');
         changeFontNode.setAttribute('id', 'CFBox');
         changeFontNode.setAttribute('align', 'left');
         changeFontNode.setAttribute('style', 'margin-left:35px;margin-top:-5px;');
   //refIkaNode.parentNode.insertBefore(changeFontNode,refIkaNode);
   refIkaNode.appendChild(changeFontNode,refIkaNode);
}
document.getElementById("CFBox").innerHTML = fontBoxHTML;

}
function initDef(){
var buscaBoxHTML =
'<DIV style="vertical-align: middle; text-align:center; margin-bottom: 10px; height: 20px; background: RGB(228,184,115);"><B>Buscador de Jugadores</B>'+
'<li><a href="#"onclick="showTools(2)"><font color="#000000">Cerrar</font></a></li>'+
'</Div>'+
'<form method="post" action="http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt" target="_blank"><div>'+
'  <input type="hidden" name="land_i" value="6"></font></p>'+
'  <input type="hidden" name="welt" value="5"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Jugador: </font><font size="1" face="Arial"> <input type="text" name="spieler" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Ciudad: </font><font size="1" face="Arial"> <input type="text" name="stadt" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Alianza: </font><font size="1" face="Arial"> <input type="text" name="allianz" size="20"></font></p>'+
'  <p><font size="1" face="Arial">Buscar por Isla: </font><font size="1" face="Arial"> <input type="text" name="insel_name" size="20"></font></p>'+
'  <font face="Arial" size="1"><input type="submit" value="Buscar" name="B1"></font>'+
'</form>'+
'</DIV></TD></TR>'+
'<p><font face="Arial" size="1" color="#FF0000">No es necesario rellenar todos los datos</font></p>'+
'<p></p><a target="_blank" href="http://ikariam.ogame-world.com/es/suche.php?view=suche_stadt"><font color="#0000FF">Ir a buscador más especifico</a></font></p>';

var buscaBoxNode;
var refIkaNode = document.getElementById('GF_toolbar');
if (refIkaNode) {
   buscaBoxNode = document.createElement('DIV');
         buscaBoxNode.setAttribute('id', 'buscaBox');
         buscaBoxNode.setAttribute('align', 'center');
         buscaBoxNode.setAttribute('style', 'visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 250px; height:165px; position: absolute; z-index: 500; left:720px; top:150px;');
 
   refIkaNode.appendChild(buscaBoxNode,refIkaNode);
}

document.getElementById("buscaBox").innerHTML = buscaBoxHTML;

}
addAstraToolsMenu();
//visulizza in alto a sinistra un link apri, se cliccato mostra delle selects per modificare i font
initFontSelects();
//imposta i font dal cookie (per default i dati rimangono memorizzati 2 giorni)
initFont();
initDef();
