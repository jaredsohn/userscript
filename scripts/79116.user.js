// ==UserScript==
// @name           Banden Mitglieds warner Pennergame 4.0 Alle Games
// @namespace      Script by niceguy0815
// @description    Dieses Script warnt dich davor wenn du versuchst ein Mitglied deiner Bande anzugreifen.
// @include        http://www.pennergame.de/fight/?to=*
// @include        http://*koeln.pennergame.de/fight/?to=*
// @include        http://*berlin.pennergame.de/fight/?to=*
// @include        http://*muenchen.pennergame.de/fight/?to=*
// @include        http://*halloween.pennergame.de/fight/?to=*
// @include        http://*clodogame.fr/fight/?to=*
// @include        http://*mendigogame.es/fight/?to=*
// @include        http://*menelgame.pl/fight/?to=*
// @include        http://*dossergame.co.uk/fight/?to=*
// @include        http://*serserionline.com/fight/?to=*
// @include        http://*bumrise.com/fight/?to=*
// @include        http://*faveladogame.com.br/fight/?to=*
// @version       1.0.4 Koeln Support
// @version       1.0.3 Halloween Support
// @version       1.0.2 Malle Support
// @version       1.0.1 Update nun funktioniert es auch mit Leerstellen im Spielernamen
// @version       1.0.0 Brand new Shit NOCH BETA!!!
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.0.4";
var THISSCRIPTLINKNUMMER = '79116'; // Nummer des Scriptes bei userscripts.org
var THISSCRIPTNAME = "Banden Mitglieds warner Pennergame 4.0 Alle Games";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/'+THISSCRIPTLINKNUMMER+'';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/'+THISSCRIPTLINKNUMMER+'.user.js'; // Skript-URL bei userscripts.org

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

//---------------------------------------------------------------------------------------------------
//  			Ermitteln der PG Seite
//---------------------------------------------------------------------------------------------------

var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
if (url.indexOf("berlin.pennergame.de")>=0) {
var link = "http://berlin.pennergame.de"
}
if (url.indexOf("muenchen.pennergame.de")>=0) {
var link = "http://muenchen.pennergame.de"
}
if (url.indexOf("koeln.pennergame.de")>=0) {
var link = "http://koeln.pennergame.de"
}
if (url.indexOf("halloween.pennergame.de")>=0) {
var link = "http://halloween.pennergame.de"
}
if (url.indexOf("clodogame.fr")>=0) {
var link = "http://www.clodogame.fr"
}
if (url.indexOf("mendigogame.es")>=0) {
var link = "http://www.mendigogame.es"
}
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
if (url.indexOf("serserionline.com")>=0) {
var link = "http://www.serserionline.com"
}
if (url.indexOf("bumrise.com")>=0) {
var link = "http://www.bumrise.com"
}
if (url.indexOf("faveladogame.com.br")>=0) {
var link = "http://www.faveladogame.com.br"
}



var split_url = document.location.href.split('to=')[1];
// split_url = split_url.replace(/ /g, “%20”);
//alert(split_url)
split_url = split_url.replace(/%20/g, ' ');
//alert(split_url)

  GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/gang/memberlist/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
		 var suche = content.search(''+split_url+'');
		try{
			if (suche != -1) {
				  alert('Achtung:\n\nDer Spieler '+split_url+' ist Mitglied deiner Bande!\nMöchtest du ihn wirklich angreifen?')
				} else {
			};
		}catch(e){
}
 }});