// ==UserScript==
// @name         Direktlinks
// @namespace    http://www.pennergame.de
// @author       sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description  Fügt häufig gebrauchte Links als Buttons im Menü "Mein Penner" sowie Direktlinks auf wichtige Plunder im Plundermenü hinzu (HH, B und M)
// @include      http://*.pennergame.de/overview/
// @include      http://*.pennergame.de/skills/*
// @include      http://*.pennergame.de/activities/*
// @include      http://*.pennergame.de/stock/*
// @include      http://*.pennergame.de/profil/id:*
// @include      http://*.pennergame.de/settings/*
// @include      http://*.pennergame.de/awards/
// @include      http://*.pennergame.de/financial/
// @include      http://*.pennergame.de/change_please/statistics/
// @include      http://*.pennergame.de/fight/pet/*
// @include      http://*.pennergame.de/fight/*
// @exclude      http://*.pennergame.de/fight/viewfight/*
// @version      1.0.6 Anpassung für Pennergame München
// @version      1.0.5 Anpassung nach Änderung des Seitenaufbaus von Farbflut; + Dr. Penner
// @version      1.0.4 Rote Schleife, iWin blendet andere Kampfplunder aus, besserer Update-Mechanismus
// @version      1.0.3 Neuer Plunder
// ==/UserScript==

var THISSCRIPTVERSION = "1.0.6";
var THISSCRIPTNAME = "Direktlinks";
var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/62920';          // URL für Hauptseite bei userscripts.org
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/62920.user.js'; // Skript-URL bei userscripts.org

// URL für Anwenden des Plunders
var PLUNDER_URL1 = "javascript:void(0)\" onclick=\"change_stuff('";
var PLUNDER_URL2 = "')";
// Basis-URL für Icon-Grafiken
var ICON_URL = "<img src=\"http://static.pennergame.de/img/pv4/plunder/";

// Plunder-Icons
var ICON_FEINERANZUG = "feineranzug.gif";
var ICON_RAMPONIERTERANZUG = "ranzug.gif";
var ICON_GOLDENESBIER = "goldenes_bier.gif";
var ICON_NIKOLAUSPLUNDER = "nikolaus.png";
var ICON_KAPUTTEBRILLE = "kaputte_brille.gif";
var ICON_ZAUBERSTAB = "zauberstab.gif";
var ICON_LEXIKON = "lexikon.png";
var ICON_REGENMANTEL = "regenmantel.png";
var ICON_TAGESKARTE = "fahrkarte.png";
var ICON_SKATEBOARD = "skateboard.gif";
var ICON_VERMODERTERHOLZROLLER = "roller.gif";
var ICON_VERBOGENESFAHRRAD = "fahrrad.gif";
var ICON_MOFAMAOTOR = "mofamotor.png";
var ICON_DIRUNBEKANNTESARTEFAKT = "Tutankhamun.gif";
var ICON_IWIN = "iwin3.png";
var ICON_ALTEHOCKEYTORWARTAUSRÜSTUNG = "hockey.png";
var ICON_HUSSMANNSSPEZIALWAFFE = "hussmannswaffe.png";
var ICON_SCHILFROHRBOGEN = "bogen.png";
var ICON_GOLDENESKLEEBLATT = "kleeblatt2.png";
var ICON_KLEEBLATT = "kleeblatt.gif";
var ICON_ROSTIGERANGELHAKEN = "angelhaken.png";
var ICON_BOXHANDSCHUHE = "boxglov.png";
var ICON_MALFARBEN = "farbeimer.png";
var ICON_KAPUTTERREGENSCHIRM = "schirm4.gif";
var ICON_REGENSCHIRM = "schirm.gif";
var ICON_ROTESCHLEIFE = "redribbon.png";
var ICON_DOSEDRPENNER = "dose.png";

// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1) {
	var TOWNEXTENSION = 'HH';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNEXTENSION = 'MU';
}

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

// ********************************************************************************************************************
// Funktion ermittelt anhand des Plundernamens die zugehörige "Action-Nummer", die der JS-Funktion zum Anlegen
// übergeben werden muss. Diese wird vom Spiel vorgegeben, kann sich jederzeit ändern und muss deswegen frisch
// ausgelesen werden
// ********************************************************************************************************************
function GetActionNumber(content, plundername) {
	try {
		var ActionNumber = content.split(plundername)[1];
		ActionNumber = ActionNumber.split("change_stuff('")[1];
		ActionNumber = ActionNumber.split("'")[0];
	
		return ActionNumber;
	} catch(err) {
		GM_log("Fehler beim Abrufen der Action-Nummer für " + plundername);
	}
}

// ********************************************************************************************************************
// Funktion fügt zum Register "newRegister" einen neuen Button mit der Beschriftung "newText" hinzu, der auf die Seite
// "newLink" verlinkt
// ********************************************************************************************************************
function AddNewButton(newRegister, newLink, newText) {
	var newButtonNode = document.createElement("li");
	newButtonNode.innerHTML = '<a href="' + newLink + '"><span class="btn-right"><span class="btn-left">' + newText + '</span></span></a>'
	newRegister.appendChild(newButtonNode);
}

// ********************************************************************************************************************
// Funktion fügt zum Register "newRegister" einen neuen Button mit der Beschriftung "newText" hinzu, der auf die Seite
// "newLink" verlinkt
// ********************************************************************************************************************
function AddNewIcon(content, newRegister, IconName, IconText) {
	var newButtonNode = document.createElement("li");
	newButtonNode.innerHTML = '<a href="' + PLUNDER_URL1 + GetActionNumber(content, IconName) + PLUNDER_URL2 + '"><span class="btn-right"><span class="btn-left">' + ICON_URL + IconName + "\" title=\"" + IconText + "\" alt=\" \">" + '</span></span></a>'
	newRegister.appendChild(newButtonNode);
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************

	// ***********************************************************************************************
	// Auf eine neue Version des Skriptes prüfen
	// ***********************************************************************************************
	CheckForUpdate();

	// Gesamten Inhalt des Bodies in content speichern zum Parsen des vorhandenen Plunders und der Zugriffs-IDs
	var content = document.getElementsByTagName("body")[0].innerHTML;

	// Referenz auf das alte Register speichern
	var oldRegister = document.getElementsByTagName("ul")[3];
	// altes Register zum "oberen Register" machen
	oldRegister.setAttribute("id", "nav-1");

	// Referenz auf Register-Div speichern
	var currentdiv = document.getElementById("tabnav");

	// Neues Register anlegen und zum "unteren Register" machen
	var newRegister = document.createElement("ul");
	newRegister.setAttribute("id", "nav-2");
	newRegister.setAttribute("class", "hmenu zabsolute");
	
	// Neues Register ins Dokument hängen
	currentdiv.appendChild(newRegister);

	// ********************************************************************************************************************
	// Wenn die aktuelle Seite die Plunderseite ist
	// ********************************************************************************************************************
	if (location.toString().indexOf(".pennergame.de/stock/plunder/") != -1) {
		// FEINER ANZUG / RAMPONIERTER ANZUG
		if (content.indexOf(ICON_FEINERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_FEINERANZUG, "Feiner Anzug");
		} else if (content.indexOf(ICON_RAMPONIERTERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_RAMPONIERTERANZUG, "Ramponierter Anzug");
		}
	
		// Wenn das Skript in Hamburg läuft
		if (TOWNEXTENSION == "HH") {
			// GOLDENES BIER
			if (content.indexOf(ICON_GOLDENESBIER) != -1) {
				AddNewIcon(content, newRegister, ICON_GOLDENESBIER, "Goldenes Bier");
			// NIKOLAUS-PLUNDER
			} else if (content.indexOf(ICON_NIKOLAUSPLUNDER) != -1) {
				AddNewIcon(content, newRegister, ICON_NIKOLAUSPLUNDER, "Nikolaus-Plunder");
			}
		// sonst: Das Skript läuft in Berlin
		} else {
			// NIKOLAUS-PLUNDER
			if (content.indexOf(ICON_NIKOLAUSPLUNDER) != -1) {
				AddNewIcon(content, newRegister, ICON_NIKOLAUSPLUNDER, "Nikolaus-Plunder");
			}
		}

		// KAPUTTE BRILLE / ZAUBERSTAB
		if (content.indexOf(ICON_KAPUTTEBRILLE) != -1) {
			AddNewIcon(content, newRegister, ICON_KAPUTTEBRILLE, "Kaputte Brille");
		} else if (content.indexOf(ICON_ZAUBERSTAB) != -1) {
			AddNewIcon(content, newRegister, ICON_ZAUBERSTAB, "Verdreckter Zauberstab");
		}
		// Wenn iWin noch NICHT vorhanden ist (Geschi ist kleiner gleich 125)
		if (content.indexOf(ICON_IWIN) == -1) {
			// LEXIKON
			if (content.indexOf(ICON_LEXIKON) != -1) {
				AddNewIcon(content, newRegister, ICON_LEXIKON, "Lexikon");
			}
		}
		
		// REGENMANTEL
		if (content.indexOf(ICON_REGENMANTEL) != -1) {
			AddNewIcon(content, newRegister, ICON_REGENMANTEL, "Regenmantel");
		}
		// TAGESKARTE / SKATEBOARD / HOLZROLLER / FAHRRAD
		if (content.indexOf(ICON_TAGESKARTE) != -1) {
			AddNewIcon(content, newRegister, ICON_TAGESKARTE, "Tageskarte");
		} else if (content.indexOf(ICON_SKATEBOARD) != -1) {
			AddNewIcon(content, newRegister, ICON_SKATEBOARD, "Skateboard");
		} else if (content.indexOf(ICON_VERMODERTERHOLZROLLER) != -1) {
			AddNewIcon(content, newRegister, ICON_VERMODERTERHOLZROLLER, "Vermoderter Holzroller");
		} else if (content.indexOf(ICON_VERBOGENESFAHRRAD) != -1) {
			AddNewIcon(content, newRegister, ICON_VERBOGENESFAHRRAD, "Verbogenes Fahrrad");
		}

		// IWIN 
		if (content.indexOf(ICON_IWIN) != -1) {
			AddNewIcon(content, newRegister, ICON_IWIN, "iWin");
		} else {
			// UNBEKANNTES ARTEFAKT
			if (content.indexOf(ICON_DIRUNBEKANNTESARTEFAKT) != -1) {
				AddNewIcon(content, newRegister, ICON_DIRUNBEKANNTESARTEFAKT, "Dir-unbekanntes Artefakt");
			}
			// HOCKEY-TORWARTAUSRÜSTUNG
			if (content.indexOf(ICON_ALTEHOCKEYTORWARTAUSRÜSTUNG) != -1) {
				AddNewIcon(content, newRegister, ICON_ALTEHOCKEYTORWARTAUSRÜSTUNG, "Alte Hockey Torwartausrüstung");
			} 
			// HUSSMANNS SPEZIALWAFFE
			if (content.indexOf(ICON_HUSSMANNSSPEZIALWAFFE) != -1) {
				AddNewIcon(content, newRegister, ICON_HUSSMANNSSPEZIALWAFFE, "Hussmanns Spezialwaffe");
			} 
			// SCHILFROHRBOGEN
			if (content.indexOf(ICON_SCHILFROHRBOGEN) != -1) {
				AddNewIcon(content, newRegister, ICON_SCHILFROHRBOGEN, "Schilfrohrbogen");
			}
		}
		
		// ROSTIGER ANGELHAKEN
		if (content.indexOf(ICON_ROSTIGERANGELHAKEN) != -1) {
			AddNewIcon(content, newRegister, ICON_ROSTIGERANGELHAKEN, "Rostiger Angelhaken");
		}

		// MALFARBEN
		if (content.indexOf(ICON_MALFARBEN) != -1) {
			AddNewIcon(content, newRegister, ICON_MALFARBEN, "Malfarben");
		}
		// MOFAMOTOR
		if (content.indexOf(ICON_MOFAMAOTOR) != -1) {
			AddNewIcon(content, newRegister, ICON_MOFAMAOTOR, "Alter Mofamotor");
		}
		// GOLDENES KLEEBLATT / KLEEBLATT
		if (content.indexOf(ICON_GOLDENESKLEEBLATT) != -1) {
			AddNewIcon(content, newRegister, ICON_GOLDENESKLEEBLATT, "Goldenes Kleeblatt");
		} else if (content.indexOf(ICON_KLEEBLATT) != -1) {
			AddNewIcon(content, newRegister, ICON_KLEEBLATT, "Kleeblatt");
		}
		// REGENSCHIRM / KAPUTTER REGENSCHIRM
		if (content.indexOf(ICON_REGENSCHIRM) != -1) {
			AddNewIcon(content, newRegister, ICON_REGENSCHIRM, "Regenschirm");
		} else if (content.indexOf(ICON_KAPUTTERREGENSCHIRM) != -1) {
			AddNewIcon(content, newRegister, ICON_KAPUTTERREGENSCHIRM, "Kaputter Regenschirm");
		}
		// ROTESCHLEIFE
		if (content.indexOf(ICON_ROTESCHLEIFE) != -1) {
			AddNewIcon(content, newRegister, ICON_ROTESCHLEIFE, "Rote Schleife");
		}
		// DOSE DR PENNER
		if (content.indexOf(ICON_DOSEDRPENNER) != -1) {
			AddNewIcon(content, newRegister, ICON_DOSEDRPENNER, 'Dose "Dr. Penner"');
		}
	// ********************************************************************************************************************
	// sonst: Die aktuelle Seite ist NICHT die Plunderseite
	// ********************************************************************************************************************
	} else {
		// Neue Buttons hinzufügen
		AddNewButton(newRegister, "/stock/plunder/", "Plunder");
		AddNewButton(newRegister, "/stock/foodstuffs/food/", "Essen");
		AddNewButton(newRegister, "/city/washhouse/", "Waschen");
		AddNewButton(newRegister, "/stock/armoury/", "Waffen");
		AddNewButton(newRegister, "/fight/pet/", "HTK");
		AddNewButton(newRegister, "/gang/credit/", "Kasse");
		AddNewButton(newRegister, "/gang/fight/", "Bandenkampf");
		AddNewButton(newRegister, "/city/supermarket/", "Supermarkt");
	}	
