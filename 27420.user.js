// ==UserScript==
// @name           astTools
// @namespace      ikatips
// @description    cambia il font/calcola livello difesa
// @include        http://*ikariam.*/index.php*
// @author         Verx
// ==/UserScript==

var astToolsIds  = new Array("opclos","FontForm","defBox","worldBox");
var tagsToModify = new Array("A","SPAN");
var dayLimit     = 2;
var cookieIKA    = 'IKAFONT';
var cookieSEP    = '|';
var cssMenuString = '#menu {'+
'align:right;'+
'margin-left:670px;'+
'margin-top: -18px;'+
'color:white;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 12em;'+
'}'+
'#menu a, #menu h2 {'+
'font: bold 11px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'padding: 2px 3px;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: white;'+
'background: RGB(228,184,115);'+
'border: double 3px RGB(228,184,115);'+
'border-left: double 3px RGB(253,247,221);'+
'border-right: double 3px RGB(253,247,221);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: black;'+
'background: RGB(253,247,221);'+
'border: double 3px RGB(228,184,115);'+
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

function getAllTagsToModify(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsToModify.length; tagX++) {
xTags = document.getElementsByTagName(tagsToModify[tagX]);
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
 createCookie(cookieIKA,FI+cookieSEP+SI+cookieSEP+CI,dayLimit);
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
var rC     = readCookie(cookieIKA);
if (rC){
var myFont = rC.split(cookieSEP);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAllTagsToModify();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}
}
function changeAllSize(valueOfSelect){
var dataToChange = getAllTagsToModify();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAllTagsToModify();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieIKA);
window.location.reload();
}
function addAstraToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var astreaToolsLink       = document.createElement('LI');
astreaToolsLink.setAttribute('id', 'AstTool');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(astreaToolsLink,xLi);
addGlobalStyle(cssMenuString);
document.getElementById('AstTool').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2>Tools</h2>'
+ '   <ul>'
+ '     <li><a href="#" title="Cambia il font" onclick="showTools(1)">Font <input style="margin-left:10px; visibility:hidden;" id="c'+astToolsIds[0]+'" type=CheckBox CHECKED DISABLED /></a></li>'
+ '     <li><a href="#" title="Calcola la resitenza della polis" onclick="showTools(2)">Difesa <input style="margin-left:10px; visibility:hidden;" id="c'+astToolsIds[2]+'" type=CheckBox CHECKED DISABLED/></a></li>'
+ '     <li><a href="#" title="Cerca un bersaglio" onclick="showTools(3)">Scansione <input style="margin-left:10px; visibility:hidden;" id="c'+astToolsIds[3]+'" type=CheckBox CHECKED DISABLED/></a></li>'
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
elemToShow = document.getElementById(astToolsIds[toolID[i]]);

if (elemToShow) {
 if ((toolID[i] == 0) || (toolID[i] == 1)) {if (document.getElementById(astToolsIds[0]).style.visibility == 'hidden') {
 document.getElementById(astToolsIds[0]).style.visibility = 'visible';
 document.getElementById(astToolsIds[1]).style.visibility = 'visible';
 if (document.getElementById('c'+astToolsIds[0])) document.getElementById('c'+astToolsIds[0]).style.visibility='visible';
 } else {
 document.getElementById(astToolsIds[0]).style.visibility = 'hidden';
 document.getElementById(astToolsIds[1]).style.visibility = 'hidden';
 if (document.getElementById('c'+astToolsIds[0])) document.getElementById('c'+astToolsIds[0]).style.visibility='hidden';
 }  } else {
 if (elemToShow.style.visibility == 'hidden') {elemToShow.style.visibility = 'visible'; if (document.getElementById('c'+astToolsIds[toolID[i]])) document.getElementById('c'+astToolsIds[toolID[i]]).style.visibility='visible';}
 else {elemToShow.style.visibility = 'hidden'; if (document.getElementById('c'+astToolsIds[toolID[i]])) document.getElementById('c'+astToolsIds[toolID[i]]).style.visibility='hidden';}
 }
}
}
}
unsafeWindow.showHide = function(fID){
var elemToShow = document.getElementById(fID);
var elemTrigger = document.getElementById(astToolsIds[0]);
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
var defBoxHTML =
'<DIV style="vertical-align: middle; text-align:center; margin-bottom: 10px; height: 30px; background: RGB(228,184,115);"><B>Calcolo difesa delle mura</B></DIV>'+
'<TABLE><TR><TD align="left" valign="middle"><SPAN>Livello Mura :</SPAN></TD><TD align="left" valign="middle"><input id="walllvl" type="text" size="20" maxlength="10" value=1 /></TD></TR><TR><TD align="left" valign="middle"><SPAN>Livello Municipio :</SPAN></TD><TD align="left" valign="middle"><input id="citylvl" type="text" size="20" maxlength="10" value=1 /></TD></TR><TR><TD colspan="2"  valign="middle" align="center"><input type="button" class="button" onclicK="calculateDefLvl()" value="Calcola % difesa" /></TD></TR><TR><TD colspan="2" valign="middle" align="center"><DIV font-style: Arial; font-size: 14pt; text-align: center; vertical-align:center; id="percDef" style="width:95px; height:30px; border: 1px solid RGB(228,184,115);"></DIV></TD></TR></TABLE>';

var defBoxNode;
var refIkaNode = document.getElementById('GF_toolbar');
if (refIkaNode) {
   defBoxNode = document.createElement('DIV');
         defBoxNode.setAttribute('id', 'defBox');
         defBoxNode.setAttribute('align', 'center');
         defBoxNode.setAttribute('style', 'visibility: hidden; background: RGB(253,247,221); border: 3px double RGB(228,184,115); width: 250px; height:165px; position: absolute; z-index: 500; left:720px; top:150px;');
 
   refIkaNode.appendChild(defBoxNode,refIkaNode);
}

document.getElementById("defBox").innerHTML = defBoxHTML;

}
addAstraToolsMenu();
//visulizza in alto a sinistra un link apri, se cliccato mostra delle selects per modificare i font
initFontSelects();
//imposta i font dal cookie (per default i dati rimangono memorizzati 2 giorni)
initFont();
initDef();