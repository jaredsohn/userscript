// ==UserScript==
// @name               Post warner fuer Pennergame 4.0 Alle Games
// @namespace      by basti1012 edit by niceguy0815 (visit pennerhack.foren-city.de.de)
// @description       Das Script tauscht in der Übersicht den Avatar aus wenn neue Nachrichten verfügbar sind. Und zeigt dort einen Briefumschlag mit Anzahl der Nachrichten an. Mit Warnton. Jetzt wo PG den eigenen Postwarner so bescheiden positionirt hat das er unter dem Infozentralen Script verschwindet ist das die Alternative.
// @include            http://*pennergame.de/*
// @include            http://*menelgame.pl/*
// @include            http://*clodogame.fr/*
// @include            http://*mendigogame.es/*
// @include            http://*dossergame.co.uk/*
// @include            http://*serserionline.com/*
// @include            http://*bumrise.com/*
// @include            http://*bichionline.ru/*
// @include            http://*pivetgame.com.br/*
// @exclude           http://newboard.pennergame.de/*
// @exclude           http://board.pennergame.de/
// @version           1.0.3 Halloween Support
// @version           1.0.3 Malle Support
// @version           1.0.2 Kleiner fix
// @version           1.0.1 Jetzt für alle Games wieder fitt gemacht.
// ==/UserScript==


//--------------Update Funktion by Sageo----------

var THISSCRIPTVERSION = "1.0.3";
var THISSCRIPTNAME = "Post warner fuer Pennergame 4.0 Alle Games";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/76073';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/76073.user.js'; // Skript-URL bei userscripts.org

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
// neu http://filekeeper.org/download/shared/Funk.mp3
//  alt  http://chargraph.com/josh/timer/notify.mp3

var SOUNDMP3 = 'http://www.fileden.com/files/2010/5/6/2850660/Funk2.mp3';
var PLAYERSWF = 'http://www.infowars.com/mediaplayer.swf';


var url = document.location.href;
if (url.indexOf("berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (url.indexOf("muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}
if (url.indexOf("halloween.pennergame")>=0) {var link = "http://halloween.pennergame.de"}
if (url.indexOf("menelgame.pl/")>=0) {var link = "http://www.menelgame.pl/"}
if (url.indexOf("clodogame.fr")>=0) {var link = "http://www.clodogame.fr"}
if (url.indexOf("mendigogame.es")>=0) {var link = "http://www.mendigogame.es"}
if (url.indexOf("dossergame.co.uk")>=0) {var link = "http://www.dossergame.co.uk"}
if (url.indexOf("serserionline.com")>=0) {var link = "http://www.serserionline.com"}
if (url.indexOf("bumrise.com")>=0) {var link = "http://www.bumrise.com"}
if (url.indexOf("bichionline.ru")>=0) {var link = "http://www.bichionline.ru"}
if (url.indexOf("pivetgame.com.br")>=0) {var link = "pivetgame.com.br"}
	

	
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Dein Penner')[1];
			var userid = text1.split('Sauberkeit:')[0];
try{
			var userp = userid.split('[')[1];
			var post = userp.split(']')[0];

var table = document.getElementById("my-profile");
var tr = table.getElementsByClassName("zleft")[0];

var	soundSrc, playerSrc;
	soundSrc = ''+SOUNDMP3+'';
	playerSrc = ''+PLAYERSWF+'';

   var player = document.createElement('embed');
   player.src = playerSrc;
   player.setAttribute("style", "visibility:hidden;");
   player.setAttribute('id', 'timer_sound');
   player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
   document.body.appendChild(player);


tr.innerHTML ='<a href="'+link+'/messages/"><img src="http://i33.tinypic.com/2ziwvw7.png" width="46" height="46"<div style=\"color:red; font-size:195%; margin-left:16px; margin-top:-35px;\"><b>'+post+'</b></div></a>';
}catch(e){}
}});