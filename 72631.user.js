// ==UserScript==
// @name           Highscore Liste Prommille und Geld H-B-M
// @author         add München support niceguy0815
// @description   Jetzt auch für München zur überbrückung! Zeigt Geld und Promille auf der Highscorseite an.
// @include          http://*pennergame.de/highscore/user/*
// @version        1.0.5 Koeln Update
// @version        1.0.4 Halloween Update
// @version        1.0.3 Malle Update
// @version        1.0.2 Test der Update funktion 2
// @version        1.0.1 Test der Update funktion 1
// ==/UserScript==

//--------------Update Funktion by Sageo----------

var THISSCRIPTVERSION = "1.0.5";
var THISSCRIPTNAME = "Highscore Liste Prommille und Geld H-B-M";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/72631';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/72631.user.js'; // Skript-URL bei userscripts.org

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

//--------------Update Funktion by Sageo----------



// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/de_DE/signaturen/"
}
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/de_DE/signaturen/"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/bl_DE/signaturen/"
}
// Linkadressen fuer Berlin mit www
if (url.indexOf("http://www.berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/bl_DE/signaturen/"
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/mu_DE/signaturen/"
}
// Linkadressen fuer muenchen mit www
if (url.indexOf("http://www.muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/mu_DE/signaturen/"
}

// Linkadressen fuer halloween
if (url.indexOf("http://halloween")>=0) {
var gamelink = "http://halloween.pennergame.de"
var signlink1 = ""
}
// Linkadressen fuer halloween mit www
if (url.indexOf("http://www.halloween")>=0) {
var gamelink = "http://halloween.pennergame.de"
var signlink1 = ""
}
// Linkadressen fuer koeln
if (url.indexOf("http://koeln")>=0) {
var gamelink = "http://koeln.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/kl_DE/signaturen/"
}
// Linkadressen fuer koeln mit www
if (url.indexOf("http://www.koeln")>=0) {
var gamelink = "http://koeln.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/kl_DE/signaturen/"
}

var table = document.getElementsByTagName('table')[0];
var tr = table.getElementsByTagName('tr')[0];
var th = document.createElement('th');
var th1 = document.createElement('th');
th.innerHTML = 'Geld';
th1.innerHTML = 'Promille';

tr.insertBefore(th,tr.getElementsByTagName('th')[5]);
tr.insertBefore(th1,tr.getElementsByTagName('th')[6]);
var trs = table.getElementsByTagName('tr').length;

for(i=1;i<trs;i++) {
	var tr = table.getElementsByTagName('tr')[i];
	var id = tr.innerHTML.split('/profil/id:')[1].split('/')[0];
	info(id,i);
}
					  
function info(id,i) {					  
	
var signatur = ''+signlink1+'';
promillee = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src='+signatur+''+id+'.jpg></div>';
				  
GM_xmlhttpRequest({
    method: 'GET',
   	url: ''+gamelink+'/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var td = document.createElement('td');
			var td1 = document.createElement('td');
			var table = document.getElementsByTagName('table')[0];
			var tr = table.getElementsByTagName('tr');
			try {
				var cash = dom.getElementsByTagName('cash')[0].textContent/100;

													   
				
				td.innerHTML = cash;
				
				td1.innerHTML = promillee;
				
			} catch(err) {
				td.innerHTML = 'N/A';
				td1.innerHTML = 'N/A';
				
			}
			tr[i].insertBefore(td,tr[i].getElementsByTagName('td')[5]);
			tr[i].insertBefore(td1,tr[i].getElementsByTagName('td')[6]);
		}
		});
}


