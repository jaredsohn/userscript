// ==UserScript==
// @name               Direkt Krieg-/Buendnissverlinker auf der Bandenprofilseite Pennergame 4.0 alle Games by Boggler & niceguy0815
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ ) EDIT BY BASTI1012 & NICEGUY0815
// @description       Auf Bandenprofilen werden 2 Links erstellt um die Bande als Feind/Freund hinzuzufuegen 
// @license             Creative Commons by-nc-sa
// @include            */profil/bande:*/
// @include            */gang/pact/*
// @version           1.0.6 Funktioniert jetzt auch mit Banden die Leerzeichen im Namen haben.
// @version           1.0.5 Die Buttons werden jetzt direkt neben den Bündnissen /Kriegserklearungen angezeigt. Außer die Bande hat diese abgeschaltet dann wird es unter der Beschreibung eingefuegt.
// ==/UserScript==




//--------------Update Funktion by Sageo----------

var THISSCRIPTVERSION = "1.0.6";
var THISSCRIPTNAME = "Direkt Krieg-/Buendnissverlinker auf der Bandenprofilseite Pennergame 4.0 alle Games by Boggler & niceguy0815";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/75909';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/75909.user.js'; // Skript-URL bei userscripts.org

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




if(document.location.href.indexOf('/profil/bande:')>0){
var body = document.getElementsByTagName('body')[0];
var bandenname = body.innerHTML.split('src="/headline/')[1].split('/')[0];
bandenname = bandenname.replace(/%20/g, ' ');
}


try {
var strong = document.getElementsByTagName('strong')[11];
strong.innerHTML +='&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="feind" value="Als Feind hinzuf&uuml;gen">';
} catch (err) { 
var strong = document.getElementsByTagName('strong')[9];
strong.innerHTML += '<br> <b>B&uuml;ndniss / Kriegserkl&auml;rung verschicken:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="feind" value="Als Feind hinzuf&uuml;gen">'; }



try {
var strong2 = document.getElementsByTagName('strong')[12];
strong2.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="freund" value="Als B&uuml;ndnispartner hinzuf&uuml;gen">';
} catch (err) { 
var strong2 = document.getElementsByTagName('strong')[9];
strong2.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" id="freund" value="Als B&uuml;ndnispartner hinzuf&uuml;gen">'; }



document.getElementById('freund').addEventListener('click', function feind(){
freund='0';
text = 'BUENDNISANFRAGE an: '+bandenname+'';
war(freund,text)
},false);


document.getElementById('feind').addEventListener('click', function feind(){
freund='1';
text = 'KRIEGSERKLAERUNG an: '+bandenname+'';
war(freund,text)
},false);


function war(freund,text){
GM_xmlhttpRequest({
method: 'POST',
url: 'http://'+ window.location.hostname+'/gang/pact/faction/add/',
headers: {'Content-type': 'application/x-www-form-urlencoded'},
data: encodeURI('f_name='+bandenname+'&f_type='+freund+'&Submit=Hinzuf%C3%BCgen'),
onload: function(responseDetails)
     {
var content = responseDetails.responseText;
var ange = content.split('id="nicon">')[1].split('tabnav')[0];
var ange = ange.split('<p>')[1].split('</p>')[0];
alert(""+text+"\n\n"+ange+"")
     }
});	
}