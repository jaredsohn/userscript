// ==UserScript==
// @name         [TK]Direktlink
// @namespace    http://www.serserionline.com
// @author       sageo fixed by tooBIG
// @description  Fügt häufig gebrauchte Links als Buttons im Menü "Mein Penner" sowie Direktlinks auf wichtige Plunder im Plundermenü hinzu (serserionline.com)
// @include      http://*.serserionline.com/overview/
// @include      http://*.serserionline.com/skills/*
// @include      http://*.serserionline.com/activities/*
// @include      http://*.serserionline.com/stock/*
// @include      http://*.serserionline.com/profil/id:*
// @include      http://*.serserionline.com/settings/*
// @include      http://*.serserionline.com/awards/
// @include      http://*.serserionline.com/financial/
// @include      http://*.serserionline.com/change_please/statistics/
// @include      http://*.serserionline.com/fight/pet/*
// @include      http://*.serserionline.com/fight/*
// @version      1.0.3
// ==/UserScript==

// URL für Anwenden des Plunders
var PLUNDER_URL1 = "javascript:void(0)\" onclick=\"change_stuff('";
var PLUNDER_URL2 = "')";
// Basis-URL für Icon-Grafiken
var ICON_URL = "<img src=\"http://media.pennergame.de/img/plunder/icons/";

// Plunder-Icons
var ICON_FEINERANZUG = "feineranzug.gif";
var ICON_RAMPONIERTERANZUG = "ranzug.gif";
var ICON_GOLDENESBIER = "goldenes_bier.gif";
var ICON_KAPUTTEBRILLE = "kaputte_brille.gif";
var ICON_ZAUBERSTAB = "zauberstab.gif";
var ICON_LEXIKON = "lexikon.png";
var ICON_REGENMANTEL = "regenmantel.png";
var ICON_TAGESKARTE = "fahrkarte.png";
var ICON_SKATEBOARD = "skateboard.gif";
var ICON_VERMODERTERHOLZROLLER = "roller.gif";
var ICON_VERBOGENESFAHRRAD = "fahrrad.gif";
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
var ICON_FesterHolzpanzer= "shield5.gif";

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

	// Gesamten Inhalt des Bodies in content speichern zum Parsen des vorhandenen Plunders und der Zugriffs-IDs
	var content = document.getElementsByTagName("body")[0].innerHTML;

	// Wenn eine Hinweisbox oder eine neue Mail erscheint
	if (content.indexOf("PgFunction") != -1 || content.indexOf('title="Neue Nachricht"') != -1) {
		// divnumber + 4, da die Hinweisbox 2  weitere Divs mit sich bringt
		var divnumber = 21;
	// sonst: Es erscheint keine Hinweisbox oder neue Mail
	} else {
		var divnumber = 19;
	}

	// Referenz auf das alte Register speichern
	var oldRegister = document.getElementsByTagName("ul")[3];
	// altes Register zum "oberen Register" machen
	oldRegister.setAttribute("id", "nav-1");

	// Referenz auf aktuelles Div speichern
	var currentdiv = document.getElementsByTagName("div")[divnumber];

	// Neues Register anlegen und zum "unteren Register" machen
	var newRegister = document.createElement("ul");
	newRegister.setAttribute("id", "nav-1");
	newRegister.setAttribute("class", "hmenu zabsolute");
	
	// Neues Register ins Dokument hängen
	currentdiv.appendChild(newRegister);

	// ********************************************************************************************************************
	// Wenn die aktuelle Seite die Plunderseite ist
	// ********************************************************************************************************************
	if (location.toString().indexOf(".serserionline.com/stock/plunder/") != -1) {
		// Wenn das Skript in Berlin läuft
		if (location.toString().match(/berlin/) != null) {
			var BerlinFlag = true;
		// sonst: Skript läuft in Hamburg
		} else {
			var BerlinFlag = false;
		}

		// FEINER ANZUG / RAMPONIERTER ANZUG
		if (content.indexOf(ICON_FEINERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_FEINERANZUG, "Feiner Anzug");
		} else if (content.indexOf(ICON_RAMPONIERTERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_RAMPONIERTERANZUG, "Ramponierter Anzug");
		}
	
		// Wenn das Skript in Hamburg läuft
		if (!BerlinFlag) {
			// GOLDENES BIER
			if (content.indexOf(ICON_GOLDENESBIER) != -1) {
				AddNewIcon(content, newRegister, ICON_GOLDENESBIER, "Goldenes Bier");
			}
		}

		// KAPUTTE BRILLE / ZAUBERSTAB
		if (content.indexOf(ICON_KAPUTTEBRILLE) != -1) {
			AddNewIcon(content, newRegister, ICON_KAPUTTEBRILLE, "Kaputte Brille");
		} else if (content.indexOf(ICON_ZAUBERSTAB) != -1) {
			AddNewIcon(content, newRegister, ICON_ZAUBERSTAB, "Verdreckter Zauberstab");
		}
		// LEXIKON
		if (content.indexOf(ICON_LEXIKON) != -1) {
			AddNewIcon(content, newRegister, ICON_LEXIKON, "Lexikon");
		}

		// REGENMANTEL
		if (content.indexOf(ICON_REGENMANTEL) != -1) {
			AddNewIcon(content, newRegister, ICON_REGENMANTEL, "Regenmantel");
		}
		// TAGESKARTE / SKATEBOARD / HOLZROLLER / FAHRRAD
		if (content.indexOf(ICON_SKATEBOARD) != -1) {
			AddNewIcon(content, newRegister, ICON_SKATEBOARD, "Skateboard");
		} else if (content.indexOf(ICON_VERMODERTERHOLZROLLER) != -1) {
			AddNewIcon(content, newRegister, ICON_VERMODERTERHOLZROLLER, "Vermoderter Holzroller");
		} else if (content.indexOf(ICON_VERBOGENESFAHRRAD) != -1) {
			AddNewIcon(content, newRegister, ICON_VERBOGENESFAHRRAD, "Verbogenes Fahrrad");
		}

		// UNBEKANNTES ARTEFAKT
		if (content.indexOf(ICON_DIRUNBEKANNTESARTEFAKT) != -1) {
			AddNewIcon(content, newRegister, ICON_DIRUNBEKANNTESARTEFAKT, "Dir-unbekanntes Artefakt");
		}
		// IWIN 
		if (content.indexOf(ICON_IWIN) != -1) {
			AddNewIcon(content, newRegister, ICON_IWIN, "iWin");
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

		// ROSTIGER ANGELHAKEN
		if (content.indexOf(ICON_ROSTIGERANGELHAKEN) != -1) {
			AddNewIcon(content, newRegister, ICON_ROSTIGERANGELHAKEN, "Rostiger Angelhaken");
		}

		// MALFARBEN
		if (content.indexOf(ICON_MALFARBEN) != -1) {
			AddNewIcon(content, newRegister, ICON_MALFARBEN, "Malfarben");
		}
		// Fester Holzpanzer
		if (content.indexOf(ICON_FesterHolzpanzer) != -1) {
			AddNewIcon(content, newRegister, ICON_FesterHolzpanzer, "Fester Holzpanzer");
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
	// ********************************************************************************************************************
	// sonst: Die aktuelle Seite ist NICHT die Plunderseite
	// ********************************************************************************************************************
	} else {
		// Neue Buttons hinzufügen
		AddNewButton(newRegister, "/stock/plunder/", "Plunder");
		AddNewButton(newRegister, "/stock/foodstuffs/food/", "Essen");
		AddNewButton(newRegister, "/city/washhouse/", "Waschen");
		AddNewButton(newRegister, "/stock/armoury/", "Waffen");
		AddNewButton(newRegister, "/city/weapon_store/def/", "DEF");
		AddNewButton(newRegister, "/gang/credit/", "Kasse");
		AddNewButton(newRegister, "/gang/fight/", "Bandenkampf");
		AddNewButton(newRegister, "/city/supermarket/", "Supermarkt");
		AddNewButton(newRegister, "/fight/overview/", "Fight");
	}	
