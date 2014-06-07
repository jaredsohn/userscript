// ==UserScript==
// @name           O2 Werbe Blocker Pennergame
// @namespace      niceguy0815
// @description      Dieses Script blockt die O2 Freikartenwerbung und den Teaser oben Links
// @include        http://*pennergame.de/*
// @version        1.0.4 Callya Banner dazu genommen!
// @version        1.0.3 Malle Update
// @version        1.0.2 Blockt jetzt auch Ballerman Logo in der Uebersicht.
// @version        1.0.1 Anpassung an PG aenderungen
// @version        1.0.0 Basisversion
// ==/UserScript==



// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss-------------------
// ***********************************************************************************************
// ***********************************************************************************************
var THISSCRIPTVERSION = "1.0.4";
var THISSCRIPTLINKNUMMER = '79286'; // Nummer des Scriptes bei userscripts.org
var THISSCRIPTNAME = "O2 Werbe Blocker Pennergame";
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

var classesw = document.getElementsByTagName("a");
for (i=0;i<classesw.length;i++) {
	var class = classesw[i];
	var inner = class.innerHTML;
	if(inner.match(/callya_20kk.jpg/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/callya_20kk.jpg/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	}

var classes = document.getElementsByTagName("div");
for (i=0;i<classes.length;i++) {
	var class = classes[i];
	var inner = class.innerHTML;
	if(inner.match(/muTeaser.png/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/muTeaser.png/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	}

var classes7 = document.getElementsByTagName("a");
for (i=0;i<classes7.length;i++) {
	var class = classes7[i];
	var inner = class.innerHTML;
	if(inner.match(/exklusiverPlunder.png/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/ballermann_teaser.jpg/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
}



var classes8 = document.getElementsByTagName("table");
for (i=0;i<classes8.length;i++) {
	var class = classes8[i];
	var inner = class.innerHTML;
 if(inner.match(/Neue gratis O2-Freikarte!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Jetzt zuschlagen!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Gratis callya-Freikarte mit Startguthaben!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Hier klicken und abstauben!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
}

var classess3 = document.getElementsByClassName('tieritemA');
for (i=0;i<classess3.length;i++) {
	var class = classess3[i];
	var inner = class.innerHTML;
	if(inner.match(/Gratis O2-Freikarte mit Startguthaben!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Hier klicken und abstauben!!!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Neue gratis O2-Freikarte!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
	else if(inner.match(/Jetzt zuschlagen!/)) {
		class.style.display = "none";
		class.innerHTML = "";
	}
		}