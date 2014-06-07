// ==UserScript==
// @name               Skillkenntnisse + Fertige Skills ausblenden Hamburg + Berlin + Muenchen
// @namespace      Skillkentnisse by newman & Fertige Skils ausblenden by basti1012 gefixt und zusammengenommen von niceguy0815
// @description       Listet die benötigten Kenntnisse für die Skills direkt auf der Skillseite auf. Fertige Skills werden ausgeblendet.
// @include             *pennergame.de/skills/*
// @include             *menelgame.pl/skills/*
// @exclude             *pennergame.de/skills/pet/*
// @exclude             *menelgame.pl/skills/pet/*
// @version            1.0.6 Firefox 5 update 
// @version            1.0.5 Hamburg Reloaded Update
// @version            1.0.4 Koeln Update
// @version            1.0.3 Halloween Update
// @version            1.0.2 Malle Support
// @version            1.0.1
// ==/UserScript==


// ***********************************************************************************************
// ***********************************************************************************************
//--------------Update Funktion by Sageo----natuerlich mit seiner Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.0.6";
var THISSCRIPTNAME = "Skillkenntnisse + Fertige Skills ausblenden Hamburg + Berlin + Muenchen";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/';          // URL fuer Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/.user.js'; // Skript-URL bei userscripts.org

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
// Funktion �berpr�ft, ob es neue Skript-Versionen gibt (einmal pro Tag) und zeigt im positiven
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
//----Ende----Auto Update Funktion---Ende----------------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************



var url = document.location.href;

if (url.indexOf("http://berlin.pennergame")>=0) {
	var link = "http://berlin.pennergame.de"
	var anzahl = '94';

}
if (url.indexOf("http://www.berlin.pennergame")>=0) {
	var link = "http://www.berlin.pennergame.de"
	var anzahl = '94';

}
if (url.indexOf("http://www.pennergame")>=0) {
	var link = "http://www.pennergame.de"
	var anzahl = '103';

}
if (url.indexOf("http://koeln.pennergame")>=0) {
	var link = "http://koeln.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://www.koeln.pennergame")>=0) {
	var link = "http://www.koeln.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://reloaded.pennergame")>=0) {
	var link = "http://reloaded.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://www.reloaded.pennergame")>=0) {
	var link = "http://www.reloaded.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://muenchen.pennergame")>=0) {
	var link = "http://muenchen.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://www.muenchen.pennergame")>=0) {
	var link = "http://www.muenchen.pennergame.de"
	var anzahl = '53';

}
if (url.indexOf("http://halloween.pennergame")>=0) {
	var link = "http://halloween.pennergame.de"
	var anzahl = '53';

}

if (url.indexOf("http://www.menelgame")>=0) {
	var link = 'http://www.menelgame.pl/'
	var anzahl = '00';

}

//----------------------------------------------------------
//-------------------------Skillkentnisse-----------------
//-------------------------by newman-------------------


for(x=0;x<=15;x++){
	try {
		document.getElementsByTagName('tbody')[x].setAttribute('id', 'tbody.'+x);
		id_max = x;
	} catch (err){
		break;
	}
}


function skill_info(skill_name, pos){
	GM_xmlhttpRequest({
		method: 'GET',
    	url: ''+link+'/skill/info/'+skill_name+'/',
		onload: function(responseDetails) {
			var side = responseDetails.responseText;
			skill_info_ausgabe(side, skill_name, pos);
		}
	 });
}


function skill_info_ausgabe(side, skill_name, pos){
	try {
		var side_split = side.split(/Kenntnisse<\/strong><\/td>[\s]*<\/tr>/)[1].split('</table>')[0];
		document.getElementById('tbody.'+(id_max-pos)).getElementsByTagName('td')[4].innerHTML+='<br /><br /><table><tr><th>Erforderliche Kenntnisse<br /></th></tr>'+side_split+'</table>';
	}
	catch(err){
		document.getElementById('tbody.'+(id_max-pos)).getElementsByTagName('td')[4].innerHTML+='<br /><br /><table><tr><th> Alles erreicht <br /></th></tr>Herzlichen glueckwunsch du hast hier alles erreicht</table>';


		//alert(err);
	}
}


if (url.indexOf("http://malle.pennergame")>=0) {

skill_info('Sprechen',6)
skill_info('Bildungsstufe',5)
skill_info('Musik',4)
skill_info('Sozialkontakte',3)
skill_info('Konzentration',2)
skill_info('Taschendiebstahl',1)
skill_info('survival',0)

} else {

skill_info('Sprechen',5)
skill_info('Bildungsstufe',4)
skill_info('Musik',3)
skill_info('Sozialkontakte',2)
skill_info('Konzentration',1)
skill_info('Taschendiebstahl',0)

}

// copyright by basti1012