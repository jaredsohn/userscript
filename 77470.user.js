// ==UserScript==
// @name         Aufgaben Direktlinks (.de)
// @namespace    http://userscripts.org/users/125233/scripts
// @author       sageo Direktlinks (tooBIG)
// @description  Fügt häufig gebrauchte Links als Buttons im Menü "Tägliche Aufgabe" hinzu
// @include      http://*.pennergame.de/daily/*
// @version      1.0
// ==/UserScript==



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
	newRegister.setAttribute("id", "nav-2");
	newRegister.setAttribute("class", "hmenu zabsolute");
	
	// Neues Register ins Dokument hängen
	currentdiv.appendChild(newRegister);

	// ********************************************************************************************************************
	// Wenn die aktuelle Seite die Plunderseite ist
	// ********************************************************************************************************************
	if (location.toString().indexOf(".online.com/stock/plunder/") != -1) {
		// Wenn das Skript in Berlin läuft
		if (location.toString().match(/berlin/) != null) {
			var BerlinFlag = true;
		// sonst: Skript läuft in Hamburg
		} else {
			var BerlinFlag = false;
		}

		
	// ********************************************************************************************************************
	// sonst: Die aktuelle Seite ist NICHT die Plunderseite
	// ********************************************************************************************************************
	} else {
		// Neue Buttons hinzufügen
		AddNewButton(newRegister, "/skills/pet/", "HTWB");
		AddNewButton(newRegister, "/fight/pet/", "HTF");
		AddNewButton(newRegister, "/stock/plunder/", "Plunder");
		AddNewButton(newRegister, "/stock/ug_plunder/create/", "Plunder E");
		AddNewButton(newRegister, "/stock/plunder/craft/", "Plunder B");
		AddNewButton(newRegister, "/gang/stuff/", "Plunderbank");
		AddNewButton(newRegister, "/activities/crime/", "Verbrechen");
		AddNewButton(newRegister, "/gang/credit/", "Kasse");
		AddNewButton(newRegister, "/city/washhouse/", "Waschen");
		AddNewButton(newRegister, "/stock/foodstuffs/food/", "Essen");
		AddNewButton(newRegister, "/city/supermarket/", "Shop");
		AddNewButton(newRegister, "/city/games/", "Lose");
		AddNewButton(newRegister, "/friendlist/", "PN");

	}