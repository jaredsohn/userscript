// ==UserScript==
// @name				Plunder About All im NG Style mit Optionen
// @namespace	basti1012 / niceguy0815 check http://pennerhack.foren-city.de
// @description	Dieses Script Ermoeglich das Wechseln des Plunders egal wann egal von wo. (Diese Version ist optisch an PG 4.0 angepasst im NG Style) Jetzt auch mit auto Update Funktion.
// @version			2.3
// @include			http://*.pennergame.de/*
// @exclude			http://newboard.pennergame.de
// @exclude			http://change.pennergame.de/*
// @exclude			http://*.pennergame.de/logout/*
// @exclude		http://*.pennergame.de/redirect/?site=*
// ==/UserScript==



// Update Funktion
GM_xmlhttpRequest({
  	method: 'GET',
   	url: "http://userscripts.org/scripts/show/63542",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var plunderall = acontent.split(/b>\s*/)[4];			
			var plunderall1 = plunderall.split(/\s*<br/)[0];	
if(plunderall1 ==2.3){
}else{
alert("Es giebt eine neue Version vom Plunder About All im NG Style,\nVersion "+plunderall1+" \nBitte mache ein Update, ansonsten kommt dieser Hinweiss immer wieder. Nachdem du Ok geklickt hast kommt ein Update Fenster wo du entscheiden kannst ob du das neue Script installieren willst . Mit dem klick auf  INSALLIEREN wird die Vorgängerversion gelöscht und die neue insalliert.\n\nMfg Niceguy0815");
window.location.href = 'http://userscripts.org/scripts/source/63542.user.js';
}
}});


var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}


var MenueTop3 = GM_getValue("MenueTop3");
if (MenueTop3 == null){
MenueTop3 = "183";};

var MenueLeft3 = GM_getValue("MenueLeft3");
if (MenueLeft3 == null){
MenueLeft3 = "93";};

var MenueFontColor = GM_getValue("MenueFontColorIn");
if (MenueFontColor == null){
MenueFontColorColor = "#006400";};

var MenueFont2Color = GM_getValue("MenueFont2ColorIn");
if (MenueFont2Color == null){
MenueFont2Color = "black";};


var ColorIn = GM_getValue("ColorIn");
if (ColorIn == null){
ColorIn = "black";};




// css-style in html einfuegen
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// groesse und possition hauptcontainer
addGlobalStyle('div#new_container2 {position:absolute; top:'+MenueTop3+'px; left:'+MenueLeft3+'px; margin-left:1px; width:330px;}')
// container groesse und aussehen schriftausrichtung
addGlobalStyle('.inhalt_newcontainer2 { padding-top:8px; padding-bottom:10px; padding-left:2%; background: url(http://i45.tinypic.com/3136tg4.png) ; font-weight:bold; color:'+MenueFont2Color+'; font-size:12px; text-align:center; } ')

GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+link+"/gang/stuff/",
        onload: function(responseDetails) {
        	var acontent = responseDetails.responseText;
			var table = acontent.split('Plunder einzahlen')[1];			
			var table2 = table.split('Anzahl:')[0];	
			var table5 = table2.split('<select name="pid" id="pid">')[1];			
			var table6 = table5.split('</select>')[0];	
			var plunder = '<select name="plunderid" id="plunderid"   style=\" color:'+ColorIn+'; font-size:12px; margin-top:5px; width:200px;\">'+table6+'</select>';

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
			var einstelungen3 = '<a id="einstell3" name="einstell3" class="tooltip"><img style="margin-bottom:-3px;" src="http://i46.tinypic.com/zvonc8.png"</img><span><li><font style=\"color:#FFFFFF; font-size:12px; width:auto;\"><b><u>Einstellungen:</u></b><br/>Hier Kanst du verschiedene Anzeige Einstellungen vornehmen.</font></li></span></a>';			
			var toole='<div style=\" color:'+MenueFont2Color+'; font-size:12px; padding-bottom:3px;\"><u><b>Angelegt: <a class="tooltip" style=" color:'+MenueFontColor+'; font-size:12px;"  href="'+link+'/stock/plunder/">'+was2+'<span><font style=\"color:#FFFFFF; font-size:10px;\">'+info1+'</font></span></a></b></u></div>';
var papaistsocool = '<b>Att: '+att+'</b> &nbsp;<b>Def: '+def+'</b> &nbsp;<b>Geschick: '+ges+'</b>';

	
var tbody = document.createElement('div');
document.body.appendChild(tbody);
tbody.innerHTML += '<div id=\"new_container2\"><div class=\"inhalt_newcontainer2\">'+toole+'<img style="margin-bottom:-3px" src="'+table14+'"</img>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+papaistsocool+'<br/>'+plunder+'&nbsp;&nbsp;&nbsp;<input type="button" id="plunder"  name="plunder" value="wechseln" >&nbsp; '+einstelungen3+'</div></a></div>';




//-------------------------------------------------------------
document.getElementById('einstell3').addEventListener('click', function einstell3 () {
var OMenueFont2Color = '<font style=\"color:#006400; font-weight:bold; font-size:14px;\"><u>Schrift Farben:</u></font><br><br><a><span align=\"center\" style=\"color:white;\"><b>Normal</b></span></a><center><select name=\"MenueFont2ColorIn\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center><br>';


var OMenueFontColor = '<a><span align=\"center\" style=\"color:white;\"><b>Link</b></span></a><center><select name=\"MenueFontColorIn\">'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"white\">Weiss</option>'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option>'
+'</select></center><br>';

var Color = '<a><span align=\"center\" style=\"color:white;\"><b>Dropdownlist</b></span></a><center><select name=\"ColorIn\">'
+'<option value=\"black\">Schwarz</option>'
+'<option value=\"#006400\">Gr&uuml;n</option>'
+'<option value=\"red\">Rot</option>'
+'<option value=\"yellow\">Gelb</option>'
+'<option value=\"orange\">Orange</option>'
+'<option value=\"gray\">Grau</option>'
+'<option value=\"blue\">Blau</option>'
+'<option value=\"cyan\">T&uuml;rkis</option>'
+'<option value=\"magenta\">Pink</option></select></center><br>'
+'<font style=\"color:#006400; font-weight:bold; font-size:14px;\"><u>Script Position:</u></font><br><br><a><span align=\"center\" style=\"color:white;\"><b>Von Oben (px)</b></span></a><center><input name="MenueTop3" size="10" type="text" value="'+MenueTop3+'"><br>'
+'<br><a><span align=\"center\" style=\"color:white;\"><b>Von Links (px)</b></span></a><center><input name="MenueLeft3" type="text" size="10" value="'+MenueLeft3+'" ><br>';

var CSpeichern = "<br><div align=\"center\">&nbsp;&nbsp;<input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
var CSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" />&nbsp;&nbsp;<br>&nbsp;</div>";

var menue = OMenueFont2Color+OMenueFontColor+Color+CSpeichern+CSchliessen;
var NewXtraMenueDiv = document.createElement('div');
NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:'+MenueTop3+'px;left:'+MenueLeft3+'px;font-size:x-small;-moz-border-radius:15px;-moz-opacity:1.7;opacity:1.7;border:3px solid red; background-color:black;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+menue+'</center></span></span>';
document.body.appendChild(NewXtraMenueDiv);

document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
window.location.reload();
},false);

document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {
GM_setValue("MenueFontColorIn", document.getElementsByName('MenueFontColorIn')[0].value);
GM_setValue("MenueFont2ColorIn", document.getElementsByName('MenueFont2ColorIn')[0].value);
GM_setValue("ColorIn", document.getElementsByName('ColorIn')[0].value);
GM_setValue("MenueTop3", document.getElementsByName('MenueTop3')[0].value);
GM_setValue("MenueLeft3", document.getElementsByName('MenueLeft3')[0].value);
window.location.reload();
},false);
},false);



//--------------------------------------------------------------


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