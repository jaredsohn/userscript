// ==UserScript==
// @name         Direktlinks
// @namespace    http://www.pennergame.de
// @author       phl0w
// @description  Fügt häufig gebrauchte Links als Buttons im Menü "Mein Penner" sowie Direktlinks auf wichtige Plunder im Plundermenü hinzu (HH, B und M)
// @include      http://*.pennergame.de/overview/
// @include      http://*.pennergame.de/skills/*
// @include      http://*.pennergame.de/activities/*
// @include      http://*.pennergame.de/city/*
// @include      http://*.pennergame.de/stock/*
// @include      http://*.pennergame.de/profil/id:*
// @include      http://*.pennergame.de/settings/*
// @include      http://*.pennergame.de/awards/
// @include      http://*.pennergame.de/financial/
// @include      http://*.pennergame.de/change_please/statistics/
// @include      http://*.pennergame.de/fight/pet/*
// @include      http://*.pennergame.de/fight/*
// @exclude      http://*.pennergame.de/fight/viewfight/*
// @version      1.0.0 Neuauflage des alten Skripts von Sageo für Nicht Reloaded Versionen
// ==/UserScript==

var THISSCRIPTVERSION = "1.0.0";
var THISSCRIPTNAME = "Direktlinks";

// URL für Anwenden des Plunders
var PLUNDER_URL1 = "javascript:void(0)\" onclick=\"change_stuff('";
var PLUNDER_URL2 = "')";
// Basis-URL für Icon-Grafiken
var ICON_URL = "<img src=\"http://static.pennergame.de/img/pv4/plunder_new/";

// Plunder-Icons
var ICON_FEINERANZUG = "old/feineranzug.gif";
var ICON_RAMPONIERTERANZUG = "old/ranzug.gif";
var ICON_GOLDENESBIER = "old/goldenes_bier.gif";
var ICON_NIKOLAUSPLUNDER = "old/nikolaus.png";
var ICON_KAPUTTEBRILLE = "old/kaputte_brille.gif";
var ICON_ZAUBERSTAB = "old/zauberstab.gif";
var ICON_LEXIKON = "old/lexikon.png";
var ICON_REGENMANTEL = "regenmantel.png";
var ICON_TAGESKARTE = "old/fahrkarte.png";
var ICON_SKATEBOARD = "old/skateboard.gif";
var ICON_VERMODERTERHOLZROLLER = "old/roller.gif";
var ICON_VERBOGENESFAHRRAD = "old/fahrrad.gif";
var ICON_MOFAMAOTOR = "old/mofamotor.png";
var ICON_DIRUNBEKANNTESARTEFAKT = "old/Tutankhamun.gif";
var ICON_IWIN = "old/iwin3.png";
var ICON_ALTEHOCKEYTORWARTAUSRÜSTUNG = "old/hockey.png";
var ICON_HUSSMANNSSPEZIALWAFFE = "old/hussmannswaffe.png";
var ICON_SCHILFROHRBOGEN = "old/bogen.png";
var ICON_GOLDENESKLEEBLATT = "old/kleeblatt2.png";
var ICON_KLEEBLATT = "old/kleeblatt.gif";
var ICON_ROSTIGERANGELHAKEN = "old/angelhaken.png";
var ICON_BOXHANDSCHUHE = "old/boxglov.png";
var ICON_MALFARBEN = "old/farbeimer.png";
var ICON_KAPUTTERREGENSCHIRM = "old/schirm4.gif";
var ICON_REGENSCHIRM = "old/schirm.gif";
var ICON_DOSEDRPENNER = "old/dose.png";
var ICON_DIRNDL = "dirndl2.png";
var ICON_YETI = "old/yeti.png";
var ICON_GAMMASTRAHLEN = "old/gamma.png";



// Wenn in Berlin gespielt wird
if (location.toString().indexOf("berlin") != -1) {
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1) {
	var TOWNEXTENSION = 'HH';
// Wenn in München gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var TOWNEXTENSION = 'MU';
// Wenn in Koeln gespielt wird
} else if (location.toString().indexOf("koeln") != -1) {
	var TOWNEXTENSION = 'KO';
}

// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
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
	newButtonNode.innerHTML = '<a href="' + PLUNDER_URL1 + GetActionNumber(content, IconName) + PLUNDER_URL2
	+ '"><span class="btn-right"><span class="btn-left">' + ICON_URL + IconName + "\" title=\"" + IconText + "\" alt=\" \">" + '</span></span></a>'
	newRegister.appendChild(newButtonNode);
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************

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
	if (location.toString().indexOf(".pennergame.de/stock/plunder/") != -1 && TOWNEXTENSION != 'KO') {
	
		GM_xmlhttpRequest({method: 'GET', url: "/stock/plunder/ajax/?c=1",onload: function(plunderResponse) { // the URL may be relative to the current page
			if (plunderResponse.status == 200 &&
				plunderResponse.responseText.indexOf('500 - Internal Server Error') == -1) {
				content = plunderResponse.responseText;
				/*var parser = new DOMParser();
				var content_ajax = parser.parseFromString(plunderResponse.responseText, "text/xml");
				alert('content_ajax = ' + content_ajax);
				content_ajax = content_ajax.getElementsByTagName("table")[0].innerHTML;*/
				
				
		
		// Yeti / Gammastrahlen / iWin
		if (content.indexOf(ICON_YETI) != -1) {
			AddNewIcon(content, newRegister, ICON_YETI, "Der Tollwuetige Yeti");
		} else if (content.indexOf(ICON_GAMMASTRAHLEN) != -1) {
			AddNewIcon(content, newRegister, ICON_GAMMASTRAHLEN, "Gammastrahlen");
		} else if (content.indexOf(ICON_IWIN) != -1) {
			AddNewIcon(content, newRegister, ICON_IWIN, "iWin");
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

		// LEXIKON (bis yeti vorhanden)
		if (content.indexOf(ICON_LEXIKON) != -1) {
			AddNewIcon(content, newRegister, ICON_LEXIKON, "Lexikon");
		}
		
		// Dirndl / FEINER ANZUG / RAMPONIERTER ANZUG
		if (content.indexOf(ICON_DIRNDL) != -1) {
			AddNewIcon(content, newRegister, ICON_DIRNDL, "Dirndl");
		} else if (content.indexOf(ICON_FEINERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_FEINERANZUG, "Feiner Anzug");
		} else if (content.indexOf(ICON_RAMPONIERTERANZUG) != -1) {
			AddNewIcon(content, newRegister, ICON_RAMPONIERTERANZUG, "Ramponierter Anzug");
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
		// DOSE DR PENNER
		if (content.indexOf(ICON_DOSEDRPENNER) != -1) {
			AddNewIcon(content, newRegister, ICON_DOSEDRPENNER, 'Dose "Dr. Penner"');
		}
		}
		
		}});
		
	// ********************************************************************************************************************
	// sonst: Die aktuelle Seite ist NICHT die Plunderseite
	// ********************************************************************************************************************
	} else {
		// Neue Buttons hinzufügen
		AddNewButton(newRegister, "/city/plundershop/", "Plundershop");
		AddNewButton(newRegister, "/stock/plunder/", "Plunder");
		AddNewButton(newRegister, "/city/weapon_store/def/", "Def-Waffe");
		AddNewButton(newRegister, "/stock/armoury/", "Att-Waffe");
		AddNewButton(newRegister, "/city/home/", "Eigenheim");
		AddNewButton(newRegister, "/stock/foodstuffs/food/", "Essen");
		AddNewButton(newRegister, "/city/washhouse/", "Waschen");
		AddNewButton(newRegister, "/fight/pet/", "HTK");
		AddNewButton(newRegister, "/gang/fight/", "Bandenkampf");
		AddNewButton(newRegister, "/city/supermarket/", "Supermarkt");
	}	
