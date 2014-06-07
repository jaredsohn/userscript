// ==UserScript==
// @name        PowerLogin
// @description Erzeugt ein Loginmenue fuer alle 4 deutschen Pennergame in dem man unbegrenzt viele Accounts speichern kann
// @namespace   Boggler @ Pennerhack EDIT by niceguy
// @include     http://koeln.pennergame.de/logout/?invalid_session_bound
// @include     http://*.pennergame.de/logout/*
// @include     http://*.pennergame.de/login/
// @include     http://www.pennergame.de/
// @include     http://pennergame.de/
// @include     http://*koeln.pennergame.de/
// @include     http://*muenchen.pennergame.de/
// @include     http://*berlin.pennergame.de/
// @include     http://koeln.pennergame.de/
// @include     http://reloaded.pennergame.de/
// @version     1.0.8 Hamburg Reloaded Support 3
// ==/UserScript==

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}





//--------------Update Funktion by Sageo----------
var THISSCRIPTVERSION = "1.0.8";
var THISSCRIPTNUMMER = "99824";
var THISSCRIPTNAME = "PowerLogin";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/'+THISSCRIPTNUMMER+'.user.js'; // Skript-URL bei userscripts.org

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion überprüft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
// Fall eine Meldung an.
// ***********************************************************************************************
// ***********************************************************************************************
function CheckForUpdate() {
	// Aktuelles Tagesdatum erzeugen und formatieren
	var today = new Date();
	var tagesdatum = FormatDate(today);

	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde	
	if (GM_getValue("LastScriptUpdateCheck","") != tagesdatum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET', 
			url: THISSCRIPTINSTALL_URL, 
			onload: function(responseDetails) {
				var content = responseDetails.responseText;
								
				// Ermitteln der Skriptversion
				var scriptversion = content.split("<b>Version:</b>")[1];
				var scriptfullversion = trimString(scriptversion .split("<br")[0]);
				scriptversion = trimString(scriptversion .split("<br")[0]).substr(0, 5);
				
				// Wenn dort eine neue Skriptversion vorliegt
				if (scriptversion != THISSCRIPTVERSION) {
					// Hinweistext zusammenbauen
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos über die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu ermöglichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

//--------Auto Update Funktion---Ende----------------








var url = document.location.href;
// Linkadressen fuer Berlin
if (url.indexOf('http://berlin')>=0) {
var link = 'http://berlin.pennergame.de';
var berlin = '<a href="#"><font style="color:red">Berlin</font></a>';
var stadtendname = 'b';
}else{var berlin = '<a href="http://berlin.pennergame.de/login/"><font style="color:green">Berlin</font></a>';}

// Linkadressen fuer koeln
if (url.indexOf('koeln.pennergame.de')>=0) {
var link = 'http://koeln.pennergame.de';
var koeln = '<a href="#"><font style="color:red">K&ouml;ln</font></a>';
var stadtendname = 'k';
}else{var koeln = '<a href="http://koeln.pennergame.de/login/"><font style="color:green">K&ouml;ln</font></a>';}


// Linkadressen fuer hamburg
if (url.indexOf('http://www.pennergame.de')>=0) {
var link = 'http://www.pennergame.de';
var hamburg = '<a href="#"><font style="color:red">Hamburg</font></a>';
var stadtendname = 'h';
}else{var hamburg = '<a href="http://www.pennergame.de/login/"><font style="color:green">Hamburg</font></a>';}

// Linkadressen fuer muenchen
if (url.indexOf('muenchen.pennergame.de')>=0) {
var link = 'http://muenchen.pennergame.de';
var muenchen = '<font style="color:red">M&uuml;nchen</font></a>';
var stadtendname = 'm';
}else{var muenchen = '<a href="http://muenchen.pennergame.de/login/"><font style="color:green">M&uuml;nchen</font></a>';}

// Linkadressen fuer HH reloaded
if (url.indexOf('reloaded.pennergame.de')>=0) {
var link = 'http://reloaded.pennergame.de';
var reloadedhh = '<a href="#"><font style="color:red">Habmurg R.</font></a>';
var stadtendname = 'hr';
}else{var reloadedhh = '<a href="http://reloaded.pennergame.de/login/"><font style="color:green">Hamburg R.</font></a>';}


var currentUrl = window.location.href;

if (currentUrl.indexOf("/logout/") > -1)
{
currentUrl = currentUrl.replace(" ", "");
window.location.href = ""+link+"/login/";
}
else
{
//form-content
}





// Farbeinstellungen
var position = 'absolute';
var top = GM_getValue('top');
if(top == null){
var top = '30';
}
//var bottom = '50';
var right = GM_getValue('right');
if(right == null){
var right = '40';
}
//var left = '50';
var widtheee ='150px';
var fontsize = 'x-small';
var radius = '20';
var sichtbar = '';
var border = '3px solid #000000';
var bgcolor = '#313131';


var anzahl = GM_getValue('anzahl');
if (anzahl == null){anzahl = 2; GM_setValue('anzahl', 2);};
var anzahla = anzahl++;
for(i=0; i<5; i++){
if(i == 0){var stadt = 'h';}
if(i == 1){var stadt = 'b';}
if(i == 2){var stadt = 'm';}
if(i == 3){var stadt = 'k';}
if(i == 4){var stadt = 'hr';}
for(a=1; a<=anzahla; a++){

if(GM_getValue(stadt+'penner'+a) == null){GM_setValue(stadt+'penner'+a, '')}
if(GM_getValue(stadt+'pass'+a) == null){GM_setValue(stadt+'pass'+a, '')}

}
}

var url = document.location.href;
if(url == link+'?reg=success' ||url == link+'/' || url == link+'/?landing=true' || url == link+'/logout/' || url == link+'/news/' || url == link+'/pw_forgotten/' || url == link+'/login/' || url == link+'/login/check/')
{

var stadte = ''+koeln+hamburg+berlin+muenchen+reloadedhh+'';

var diepenner = '';
for(a=1; a<=anzahla; a++){
diepenner += '<center><a><font color="orange">Penner '+a+'</font></a>'
+'<form method="post" action="/login/check/" id="loginform"><input id="login_username" type="text" size="16" name="username" value="'+GM_getValue(stadtendname+"penner"+a)+'"><br><input type="password" name="password" size="7" id="password" value="'+GM_getValue(stadtendname+"pass"+a)+'" />'
+'&nbsp;<input class="formbutton" type="submit" name="submitForm" value="Login" /></form></center><br>';
}

var vergessen = '<center><a href="/pw_forgotten/"><font color="white">Passwort vergessen</font></a></center><br>';
var einstell = '<center><input type="button" id="einstella" name="einstella" value="Einstellungen" /></center>';



document.getElementById("content").innerHTML += '<div name="Menue" style="position:'+position+';top:'+top+'px;right:'+right+'px;width: '+widtheee+';font-size:'+fontsize+';-moz-border-radius:'+radius+'px;-moz-opacity:'+sichtbar+';border:'+border+'; background-color:'+bgcolor+'"><div class="content" style="padding-top:20px"><div align="center">'+stadte+diepenner+vergessen+einstell+'</div></div></div>';
};



document.getElementById('einstella').addEventListener('click', function einstellungen () {
document.getElementsByName('Menue')[0].innerHTML = '<div style="position:'+position+';top:'+top+'px;right:'+right+'px;font-size:'+fontsize+';-moz-border-radius:'+radius+'px;-moz-opacity:'+sichtbar+';border:'+border+'; background-color:'+bgcolor+'"><div class="content" style="padding-top:15px"><div align="center"><div id="einstellungen"></div></div></div></div>';


document.getElementById('einstellungen').innerHTML += '<center>';
document.getElementById('einstellungen').innerHTML += '<span style="color:#0099FF; font-size:14px;"><b>Einstellungen</b></span><br><input type="text" id="anzahl" size="5" value="'+GM_getValue("anzahl")+'" /><input type="button" id="anzahlspeichern" value="Anzahl speichern" /><br>';
document.getElementById('einstellungen').innerHTML += '<input type="button" id="loschen" value="Alle Daten l&ouml;schen" />';
document.getElementById('einstellungen').innerHTML += '<input type="button" id="speichern" value="Speichern" /><br>';
document.getElementById('einstellungen').innerHTML += '<font style="color:orange"><a id='+stadt+'>Position</a></font>';
document.getElementById('einstellungen').innerHTML += '<center><font color="orange">Top(px):&nbsp;&nbsp;&nbsp;</font><input id="top" size="5" value="'+top+'"/>&nbsp;</center><br>';
document.getElementById('einstellungen').innerHTML += '<center><font color="orange">Right(px):</font><input id="right" size="5" value="'+right+'"/>&nbsp;</center><br>';
for(i=0; i<5; i++){
if(i == 0){var stadt = 'h'; var stadtname='Hamburg';}
if(i == 1){var stadt = 'b'; var stadtname='Berlin';}
if(i == 2){var stadt = 'm'; var stadtname='M&uuml;nchen';}
if(i == 3){var stadt = 'k'; var stadtname='K&ouml;ln';}
if(i == 4){var stadt = 'hr'; var stadtname='Hamburg R.';}
document.getElementById('einstellungen').innerHTML += '<font style="color:orange"><a id='+stadt+'>'+stadtname+'</a></font>';

for(a=1; a<=anzahla; a++){
document.getElementById('einstellungen').innerHTML += '<center><a><font color="orange">Penner '+a+'</font></a><div style="width: 230px">Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id="player'+stadt+a+'" value="'+GM_getValue(stadt+"penner"+a)+'"/><br>Passwort:<input id="password'+stadt+a+'" value="'+GM_getValue(stadt+"pass"+a)+'"/></div></center>';
}

}

document.getElementById('einstellungen').innerHTML += '</center>';
document.getElementById('loschen').addEventListener('click', function einstellungen () {
for(j=0; j<5; j++){
if(j == 0){var stadt = 'h'; var stadtname='Hamburg';}
if(j == 1){var stadt = 'b'; var stadtname='Berlin';}
if(j == 2){var stadt = 'm'; var stadtname='M&uuml;nchen';}
if(j == 3){var stadt = 'k'; var stadtname='K&ouml;ln';}
if(j == 4){var stadt = 'hr'; var stadtname='Hamburg R.';}
for(b=1; b<=60; b++){

GM_deleteValue(stadt+'penner'+b);
GM_deleteValue(stadt+'pass'+b);
}
}
GM_deleteValue('anzahl');
alert('Alle Daten dieses Scriptes wurden geloescht.');
location.reload()
},false);
document.getElementById('speichern').addEventListener('click', function einstellungen () {
for(j=0; j<5; j++){
if(j == 0){var stadt = 'h'; var stadtname='Hamburg';}
if(j == 1){var stadt = 'b'; var stadtname='Berlin';}
if(j == 2){var stadt = 'm'; var stadtname='M&uuml;nchen';}
if(j == 3){var stadt = 'k'; var stadtname='K&ouml;ln';}
if(j == 4){var stadt = 'hr'; var stadtname='Hamburg R.';}
for(b=1; b<=anzahla; b++){

GM_setValue(stadt+'penner'+b, document.getElementById('player'+stadt+b).value);
GM_setValue(stadt+"pass"+b, document.getElementById('password'+stadt+b).value);
}
}
GM_setValue("top", document.getElementById('top').value);
GM_setValue("right", document.getElementById('right').value);

location.reload()
},false);
document.getElementById('anzahlspeichern').addEventListener('click', function einstellungen () {
GM_setValue('anzahl', document.getElementById('anzahl').value);
location.reload()
}, false);
},false);



