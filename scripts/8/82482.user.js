// ==UserScript==
// @name           Pennerprofil PG4.0
// @namespace      11235813[Kuestenpenner]
// @description    Zeigt Geld und Promille im Profil an, Erkennt falsche/vorgetaeuschte IDs, ist absolut taeuschungssicher, zeigt mehr Infos. Pennergame Berlin + Hamburg Muenchen Malle by basti1012  bearbeitet fuer hh und b MU MALLE by niceguy0815
// @include        http://*pennergame.de/profil/*
// @exclude        http://*pennergame.de/profil/bande*
// @version        2.3.9 Hamburg reloaded Support
// @version        2.3.8 Koeln Update
// @version        2.3.7 fix
// @version        2.3.6 Halloween Support
// @version        2.3.5 Malle Support
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "2.3.9";
var THISSCRIPTNUMMER = "82482";
var THISSCRIPTNAME = "Tagesaufgabe auf der Uebersichtsseite Pennergame 4.0 Hamburg + Berlin + Muenchen";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTNUMMER+'';          // URL fuer Hauptseite bei userscripts.org
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
// Funktion ueberprueft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
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
					var alerttext = "Es gibt eine neue Version des Skriptes '" + THISSCRIPTNAME + "':\n\n" + scriptfullversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n" + THISSCRIPTINSTALL_URL + "\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschlie&szlig;end durchgef&uuml;hrt werden.\n\nHinweis: Die &uuml;berpr&uuml;fung auf neue Versionen wird nur einmal pro Tag durchgef&uuml;hrt."

					// Hinweistext ausgeben
					alert(alerttext);
					// Seite mit dem neuen Skript laden, um eine Installation zu erm&ouml;glichen
					window.location.href = THISSCRIPTSOURCE_URL;
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgef&uuml;hrt)
		GM_setValue("LastScriptUpdateCheck", tagesdatum)
	}
}

CheckForUpdate();

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


// seitenadresse ermitteln
var url = document.location.href;
// Linkadressen fuer pennergame mit www
if (url.indexOf("http://www")>=0) {
var gamelink = "http://www.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/de_DE"
}
// Linkadressen fuer pennergame ohne www
if (url.indexOf("http://pennergame")>=0) {
var gamelink = "http://pennergame.de"
var signlink1 = "http://inodes.pennergame.de/de_DE"
}
// Linkadressen fuer muenchen
if (url.indexOf("http://muenchen")>=0) {
var gamelink = "http://muenchen.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/mu_DE"
}
// Linkadressen fuer halloween
if (url.indexOf("http://halloween")>=0) {
var gamelink = "http://halloween.pennergame.de"
var signlink1 = ""
}
// Linkadressen fuer halloween www
if (url.indexOf("http://www.halloween")>=0) {
var gamelink = "http://www.halloween.pennergame.de"
var signlink1 = ""
}
// Linkadressen fuer koeln
if (url.indexOf("http://koeln")>=0) {
var gamelink = "http://koeln.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/kl_DE"
}
// Linkadressen fuer koeln www
if (url.indexOf("http://www.koeln")>=0) {
var gamelink = "http://www.koeln.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/kl_DE"
}reloaded
// Linkadressen fuer reloaded
if (url.indexOf("http://reloaded")>=0) {
var gamelink = "http://reloaded.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/hh_DE"
}
// Linkadressen fuer reloaded www
if (url.indexOf("http://www.reloaded")>=0) {
var gamelink = "http://www.reloaded.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/hh_DE"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
var signlink1 = "http://inodes.pennergame.de/bl_DE"
}
var urlname2 = url.split(''+gamelink+'/profil/id:')[1];
var urlname3 = urlname2.split('/')[0];
var id = urlname3;


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[3];
var td = tr.getElementsByTagName('td');
td[2].style.fontWeight= "bold";
td[2].innerHTML='Geld:<br />Promille:';

var siglink = ''+signlink1+'/signaturen/';

var tr1 = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[4];
var td1 = tr1.getElementsByTagName('td');


td1[2].style.fontWeight= "bold";
td1[2].innerHTML='Bandenpunkte:<br />Punkteschnitt:<br />Bandenplatz:<br />Mitglieder:';
td1[3].style.fontStyle= "italic";
td1[3].innerHTML= 'Lade Infos...';

var highlightit0 = 5000;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;

GM_xmlhttpRequest({
    method: 'GET',
    url: ''+gamelink+'/dev/api/user.' + id + '.xml',

    onload: function(responseDetails) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var id = dom.getElementsByTagName('id')[0].textContent;
		var bandenid = dom.getElementsByTagName('id')[1].textContent;
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: ''+gamelink+'/dev/api/gang.'+bandenid+'.xml',
			onload: function(responseDetails) {
				var parser = new DOMParser();
				var dombande = parser.parseFromString(responseDetails.responseText, "application/xml");
				var points = dombande.getElementsByTagName('points')[0].textContent;
				var position = dombande.getElementsByTagName('position')[0].textContent;

				var member =dombande.getElementsByTagName('member_count')[0].textContent;
				var av2 = points/member;
				var av = Math.round(av2);
				td1[3].innerHTML = points+'<br />'+av+'<br />'+position+'.'+'<br />'+member;
			}
						  });
		
		
		try {
			var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		} catch(err) {
			var cash = '-';
			
		}
		var pskript = '<br /> <div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div>';	
		
	
			if (cash >= highlightit0){
			  td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit1){
  	    td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit2){
  	    td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit3){
  	    td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit4){
  	    td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			if (cash >= highlightit5){
  	    td[3].style.color = "#ffffff";
				td[3].style.fontWeight = "bold";
			}
			td[3].innerHTML = ''+cash+'&euro; '+pskript+'';
	
    }
});



//Fixed