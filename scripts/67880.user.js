// ==UserScript==
// @name           Plunder about all  Hamburg und Berlin ( version 1.6.1 pennergame 4.0) by basti1012
// @author         basti1012 http://pennerhack.foren-city.de
// @namespace      basti1012 
// @description    ermoeglich das wechseln des plunders egal wann egal von wo (diese version ist optisch an 4.0 angepasst)
// @include         *pennergame.de*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}

var MenueTop = GM_getValue("MenueTop");
if (MenueTop == null){
MenueTop = "100";};

var MenueLeft = GM_getValue("MenueLeft");
if (MenueLeft == null){
MenueLeft = "200";};

var MenueFontColor = GM_getValue("MenueFontColorIn");
if (MenueFontColor == null){
BorderColor = "white";};

var MenueBorderColor = GM_getValue("MenueBorderColorIn");
if (MenueBorderColor == null){
MenueBorderColor = "schwarz";};

var tranzparente = GM_getValue("tranzparente");
if (tranzparente == null){
tranzparente = "2.0";};

var bordbreite = GM_getValue("bordbreite");
if (bordbreite == null){
bordbreite = "2";};

var ColorIn = GM_getValue("ColorIn");
if (ColorIn == null){
ColorIn = "red";};

GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/59381",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var pg40update = acontent.split('( version ')[1];			
			var pg40update1 = pg40update.split(' pennergame 4.0')[0];	

if(pg40update1 ==1.6){
}else{
alert("Es ist eine neue Version von Bastis Plunder about all Script vorhanden,\nVersion "+pg40update1+" \nbitte mache ein Update,ansonsten kommt dieser Hinweiss immer wieder.Nachdem du Ok geklickt hast kommt ein Update Fenster wo du enscheiden kannst ob du das neue Script installieren willst .Nach dem Update bitte dieses Script deinstallieren sonst kann es zu Scripte kompflikte kommen .\n\nMfg Basti1012");
window.location.href = 'http://userscripts.org/scripts/source/59381.user.js';
}
}});

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Plunder einzahlen')[1];			
			var table2 = table.split('Anzahl:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];	
			var plunder = '<select name="plunderid" id="plunderid">'+table6+'</select>';

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/stock/plunder/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table1 = acontent.split('<h3>Angelegt</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];								
			var table13 = table12.split('src="')[1];					
			var table14 = table13.split('"')[0];
			var info = table12.split('<ul class="zclear">')[1];					
			var info1 = info.split('</ul>')[0];

var suche = info1.search("ATT:");
if (suche != -1) {
	var att1 = info1.split('ATT:')[1];
	var att = att1.split('</li>')[0];
	}else{
	var att ='-';
}

var suche1 = info1.search("DEF:");
if (suche1 != -1) {
	var def1 = info1.split('DEF:')[1];
	var def = def1.split('</li>')[0];
	}else{
	var def ='-';
}

var suche1 = info1.search("Geschick:");
if (suche1 != -1) {
	var ges1 = info1.split('Geschick:')[1];
	var ges = ges1.split('</li>')[0];
	}else{
	var ges ='-';
}
			var was11 = table12.split('>')[2];					
			var was2 = was11.split('<')[0];				
			var toole='<a class="tooltip" href="'+link+'stock/plunder/"><font style=\"color:'+ColorIn+'; font-size:100%;\">['+was2+']</font><span><font style=\"color:'+ColorIn+'; font-size:100%;\">'+info1+'</font></span></a>';
			var papaistsocool = '<font style=\"color:'+ColorIn+'; font-size:100%;\">Att: '+att+' <br>Def: '+def+' <br>Geschick: '+ges+'</font><br>';
			var einstelungen = '<center><li><a id="einstell" name="einstell">[<span style=\"color:#FF0000;\">Einstellungen</span>]</a></center></li>';
			
var NewXtraMenueDiv = document.createElement('div');
NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:'+MenueTop+'px;left:'+MenueLeft+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:'+tranzparente+';opacity:'+tranzparente+';border:'+bordbreite+'px solid '+MenueBorderColor+'; background: url(http://germanengott.ge.funpic.de/script_img/background_weiterbildung_ende.png);background-position:-10px -5px;;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+toole+'</center><center><img src="'+table14+'"</center><center>'+papaistsocool+'</center></img>'+plunder+'<br><center><input type="button" id="plunder"  name="plunder" value="Plunder wechseln" ></center><center>'+einstelungen+'</center></span></a></span></span>';
document.body.appendChild(NewXtraMenueDiv);

document.getElementById('einstell').addEventListener('click', function einstell () {
var OMenueFontColor = "<a><span align=\"center\" style=\"color:red;\">Hintergrundsfarbe</span></a><center><select name=\"MenueFontColorIn\"><option value=\"white\">Weiss</option><option value=\"black\">Schwarz</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option><option value=\"#FFFFFF\">Pennergame Grau</option></select></center>";
var OMenueBorderColor = "<a><span align=\"center\" style=\"color:red;\">Rahmenfarbe</span></a><center><select name=\"MenueBorderColorIn\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>";
var Color = "<a><span align=\"center\" style=\"color:red;\">Schrieftfarbe</span></a><center><select name=\"ColorIn\"><option value=\"black\">Schwarz</option><option value=\"white\">Weiss</option><option value=\"red\">Rot</option><option value=\"green\">Gr&uuml;n</option><option value=\"yellow\">Gelb</option><option value=\"orange\">Orange</option><option value=\"gray\">Grau</option><option value=\"blue\">Blau</option><option value=\"cyan\">T?rkis</option><option value=\"magenta\">Pink</option></select></center>";
var bordbreite = '<a><span align=\"center\" style=\"color:red;\">Rahmenbreite</span></a><center><select name="bordbreite">'
+'<option value="0">0</option>'
+'<option value="1">1</option>'
+'<option value="2">2</option>'
+'<option value="3">3</option>'
+'<option value="4">4</option>'
+'<option value="5">5</option>'
+'<option value="6">6</option>'
+'<option value="7">7</option>'
+'<option value="8">8</option>'
+'<option value="9">9</option>'
+'<option value="10">10</option>'
+'<option value="11">11</option>'
+'<option value="12">12</option>'
+'<option value="13">13</option>'
+'<option value="14 ">14</option>'
+'<option value="15">15</option>'
+'</select></center>';

var tranzparente = '<a><span align=\"center\" style=\"color:red;\">tranzparente</span></a><center><select name="tranzparente">'
+'<option value="0.5">0.5</option>'
+'<option value="0.6">0.6</option>'
+'<option value="0.7">0.7</option>'
+'<option value="0.8">0.8</option>'
+'<option value="0.9">0.9</option>'
+'<option value="1.0">1.0</option>'
+'<option value="1.1">1.1</option>'
+'<option value="1.2">1.2</option>'
+'<option value="1.3">1.3</option>'
+'<option value="1.4">1.4</option>'
+'<option value="1.5">1.5</option>'
+'<option value="1.6">1.6</option>'
+'<option value="1.7">1.7</option>'
+'<option value="1.8">1.8</option>'
+'<option value="1.9">1.9</option>'
+'<option value="2.0">2.0</option>'
+'</select></center><a><span align=\"center\" style=\"color:red;\">Von oben(px)</span></a><center><input name="MenueTop" size="10" type="text" value="'+MenueTop+'">'
+'<br><a><span align=\"center\" style=\"color:red;\">Von Links(px)</span></a><center><input name="MenueLeft" type="text" size="10" value="'+MenueLeft+'" >';

var CSpeichern = "<li><div align=\"center\">_______________________<br><input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
var CSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>&nbsp;</li></div>";

var menue =OMenueFontColor+OMenueBorderColor+Color+bordbreite+tranzparente+CSpeichern+CSchliessen;
var NewXtraMenueDiv = document.createElement('div');
NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:'+MenueTop+'px;left:'+MenueLeft+'px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;border:1px solid red; background-color:black;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+menue+'</center></span></span>';
document.body.appendChild(NewXtraMenueDiv);

document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
window.location.reload();
},false);

document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {
GM_setValue("tranzparente", document.getElementsByName('tranzparente')[0].value);
GM_setValue("bordbreite", document.getElementsByName('bordbreite')[0].value);
GM_setValue("MenueFontColorIn", document.getElementsByName('MenueFontColorIn')[0].value);
GM_setValue("MenueBorderColorIn", document.getElementsByName('MenueBorderColorIn')[0].value);
GM_setValue("ColorIn", document.getElementsByName('ColorIn')[0].value);
GM_setValue("MenueTop", document.getElementsByName('MenueTop')[0].value);
GM_setValue("MenueLeft", document.getElementsByName('MenueLeft')[0].value);
window.location.reload();
},false);
},false);

document.getElementById('plunder').addEventListener('click', function brot_essen(){
var welcherplunder = document.getElementById('plunderid').value;
	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/stock/plunder/change/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_plunder='+welcherplunder+''),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);
}});
}});


// copyright by basti1012