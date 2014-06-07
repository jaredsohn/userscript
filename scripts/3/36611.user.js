// ==UserScript==
// @name				DSimproveMainBuilding
// @author				Heinzel
// @version				2.2.6
// @icon				data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA8tJREFUeNqsVEtvG1UU/u7MnYftTOw4jpPWwVFI8ygNQjQ0RSSIilIIQmKDSiWQ2LBjyQoJloDEBja8FohNxV+IgIpEEKTS0pA0ok0aB8dJmsSJn2N7xvO4M5fbSFQViF2vdKQr3XM+fff7zjmEc46HcejX7z+L/qiBtXwdIwNJEEqGt/YPv8gYRoIo8ueKosy63KkSIPQpgaZJ+HnxL9zOVaHIOhpNGxoopAdRQ84NjdI3JSZfyN+tn2nU7a8Cz/8OIG8JoLRIkf+X0T8XQpB2Xf8d5rB3+7o6YMUYyjU7WjErL3bH9XNGXJ8nFJdF3o8ivfQfIPEgiTgRhuGHtuNcpJwgEKFTCZkeAy7jqNVbqtlsvpTu1s9LKX02DPnHQtlrDwJJrhtc4kF4WQrZxf1SE0HAENUltJmPlu2iQ6PIHksi1hlFyfTodq7xanm3/Q1CcpZI5D6QPPFo/++KRAZ6DYrOaAR7VQttnyGmCwFFYqvtw/MYUokIohEFN/MHWNvYTyc6YmNcIlfbrl++J7WUOTGt25EB3K00hSMEY9kEElENhzUHpuUKZzioULJcb8N2GOy2i2SXAY0q023L/YxwfvpIo9Enz2yWd7YGi9RAmViwCzcwkOlB0ojgsG6j2nIRVShigk3LCyBTFbGofsSUBHQmQnhK9OJ78sTxWLYnMzQyPnk+4gcyyeU3URNM4DvoSegwogrCgMC0PQHsCJ3aaAhWzA+hqhoI+HEJfFLuKO/xU1PPLdnl7Vbo+RkjndUKe7ukbocwm5ZoHA993cZR0a3NEoplE6pw9J7OLAgQz46gU1NS8lBCZZpGF5Z/+r7y2LmXb/cNn2zeuj43rnIJx4afBu3OYm+3AN+qC1YMlnCy7QHFWgs6AjwxcwncZ/uUKuF2YfUPbXt1I9+o1xdGp5//oVrYsHvT/a8/88obMcusYll8i7llhJV1JDNxFA9NtE0g3tsLtVUqVg73P5FHu2RIMucs5E2vVWPrc7ONYm6lMjAxdWPs9Flr/er8eE/2JEYmX0BueRFyVz9iwsnBx5/Kp4ZGZ82l+bninbVv5bGkCj0a4b4XhpSE2Fq8rmgRpRG4/q93fpuv72xtqpMzr1lxI9H/57Vf0AY1Jau2ktClLzseGfn05vyVA+ZY5v1Zg1gnsqIimqQeiFwu5XPa6gHb6Z889UGyN03KmxtvNxx3yjJ3rxDfW7AKa2FxaaVWabVaCdG89N/DRzh4wAIEfhBIMgpiijxZluH7zkeO6w5aOxsZLZ5aZoxxtbENmRMHXBZ1D2mx/S3AAAin2HjtilRAAAAAAElFTkSuQmCC
// @namespace			die-staemme.de
// @description			Dieses Script ermoeglicht es, im Hauptgebaeude sowohl abzureissen als auch aufzubauen OHNE extra zwischen den einzelnen Modi hin und her zu wechseln. Dazu kommt noch, dass man seinen individuellen Ausbauwunsch dem Script mitteilen kann und dieses sagt einem dann, ob man die Gebäude noch abreißen/aufbauen/so lassen muss.
// @include				http://*staemme.*/game.php?*screen=main*
// ==/UserScript==



// Changelog ab 2.0.0:
// 2.0.1: 	- Bugfix: im normalen Account wurde teilweise ein t-Hash in der URL angezeigt
// 2.1.0: 	- Sprache 'ch' hinzugefuegt
//		 	- Bugfix: falls der Link "Komplett ausgebaute Gebaeude verstecken" nicht existiert, wird er erzeugt
//		 	- Anpassung an DS-v6.2
// 2.2.0:	- Addon "DS Ausbaustufen ohne Scrollen" von c1b1 direkt integriert (deaktivierbar)
//		 	- Anpassung an DS-v6.5
//		 	- Sprache 'fr' hinzugefuegt
//		 	- Nach Abriss wieder in die Bauuebersicht + separaten Abriss erlauben (zb. per Parameter im "Abriss"-Link)
// 2.2.1 	- Bugfix: War der "Abriss"-Link nicht vorhanden, wurde das Script mit einem Fehler beendet
// 2.2.2 	- Anpassung an DS-v7.1
//			- Update-Routine eingebaut
// 2.2.3	- Bugfix: Anpassung an DS-v7.1 nicht gaenzlich erfolgreich
//			- meta-Daten geaendert: Icon hinzugefuegt
// 2.2.4	- Update-Routine entfernt
// 			- Sprache 'en' hinzufuegt
//			- ScriptAPI eingebunden
// 2.2.5	- Bugfix: Maximalausbau wurde nichtmehr angezeigt
// 2.2.6	- Bugfix: Im Abriss-Modus wurde die Seite in einer Endlosschleife neu geladen


// to Implement: 
// 3.0.0: 
//		 - Erweiterung auf Gebaeudeueber-/ansicht
//		 - Überarbeitung des kompletten Sourcecodes
//		 - evtl. Verschiebung der Einstellungen ins DS-Einstellungsmenue?


// classes
function CConfig() {
	this.buildingNames = ["main","barracks","stable","garage","church","church_f","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];
	this.defaultBuildingLevels = [20,25,20,15,3,1,1,20,1,1,25,30,30,30,30,30,10,20];
}

function CLang() {
	this.de = {
		'Hauptgebäude': "main", 
		'Kaserne': "barracks", 
		'Stall': "stable", 
		'Werkstatt': "garage", 
		'Kirche': "church", 
		'Erste Kirche': "church_f", 
		'Adelshof': "snob", 
		'Schmiede': "smith", 
		'Versammlungsplatz': "place", 
		'Statue': "statue", 
		'Marktplatz': "market", 
		'Holzfäller': "wood", 
		'Lehmgrube': "stone", 
		'Eisenmine': "iron", 
		'Bauernhof': "farm", 
		'Speicher': "storage", 
		'Versteck': "hide", 
		'Wall': "wall", 
		'destroyStep': "Stufe abreißen", 
		'saved': "Gespeichert", 
		'takeCareOfGroups': "Soll beim Speichern der gewuenschten Gebaeude Ruecksicht auf Gruppen genommen werden", 
		'destroyingOneStep': "Abriss um eine Stufe", 
		'buildingComplitlyBuild': "Gebäude vollständig ausgebaut", 
		'hideCompletedBuildings': "Komplett ausgebaute Gebäude verstecken", 
		'demolitian': "Abriss", 
		'showAllBuildings': "Alle Gebäude einblenden"
	}; 
	this.ch = {
		'Houptgeböide': "main", 
		'Kasärne': "barracks", 
		'Stau': "stable", 
		'Wärkstatt': "garage", 
		'Chiuche': "church", 
		'Erschti Chiuche': "church_f", 
		'Adushof': "snob", 
		'Schmied': "smith", 
		'Vrsammligsplatz': "place", 
		'Statue': "statue", 
		'Marktplatz': "market", 
		'Houzfäuer': "wood", 
		'Lehmgruebe': "stone", 
		'Isemine': "iron", 
		'Burehof': "farm", 
		'Spicher': "storage", 
		'Vrsteck': "hide", 
		'Wall': "wall", 
		'destroyStep': "Stuefe abrisse", 
		'saved': "Gespeichert", 
		'takeCareOfGroups': "Soll beim Speichern der gewuenschten Gebaeude Ruecksicht auf Gruppen genommen werden", 
		'destroyingOneStep': "Abriss um ei Stuefe", 
		'buildingComplitlyBuild': "Geböide vouständig usbout", 
		'hideCompletedBuildings': "Komplett usbouti Geböide vrstecke", 
		'demolitian': "Abriss"
	};
	/*this.fr = {
		'Quartier général': "main", 
		'Caserne': "barracks", 
		'Écurie': "stable", 
		'Atelier': "garage", 
		'Église': "church", 
		'Première église': "church_f", 
		'Académie': "snob", 
		'Forge': "smith", 
		'Point de ralliement': "place", 
		'Statue': "statue", 
		'Marché': "market", 
		'Camp de bois': "wood", 
		'Carrière d\'argile': "stone", 
		'Mine de fer': "iron", 
		'Ferme': "farm", 
		'Entrepôt': "storage", 
		'Cachette': "hide", 
		'Muraille': "wall", 
		'destroyStep': "démolir le niveau", 
		'saved': "Sauvegarde reussi avec succes", 
		'takeCareOfGroups': "Should I take care of groups", 
		'destroyingOneStep': "Rétrograder d'un niveau", 
		'buildingComplitlyBuild': "Bâtiment complètement terminé", 
		'hideCompletedBuildings': "Masquer les bâtiments terminés", 
		'demolitian': "Démolition"
	};
	this.en = {
		'Village Headquarters': "main", 
		'Barracks': "barracks", 
		'Stable': "stable", 
		'Workshop': "garage", 
		'Church': "church", 
		'First church': "church_f", 
		'Academy': "snob", 
		'Smithy': "smith", 
		'Rally point': "place", 
		'Statue': "statue", 
		'Market': "market", 
		'Timber camp': "wood", 
		'Clay pit': "stone", 
		'Iron mine': "iron", 
		'Farm': "farm", 
		'Warehouse': "storage", 
		'Hiding place': "hide", 
		'Wall': "wall", 
		'destroyStep': "Downgrade one level", 
		'saved': "Saved", 
		'takeCareOfGroups': "Do you want your groups to be considered while saving your desired building level", 
		'destroyingOneStep': "Downgrade one level", 
		'buildingComplitlyBuild': "Building fully constructed", 
		'hideCompletedBuildings': "Hide completed buildings", 
		'demolitian': "Demolition", 
		'showAllBuildings': "Show all buildings"
	}; 
*/
}

// base functions
function _trim(string) {
	return string.replace(/^\s+|\s+$/g, "");
}

function _error(msg) {
	switch(navigator.appName) {
		case "Netscape":
			GM_log(msg);
			break;
		case "Opera":
			window.opera.postError(msg);
			break;
	}
}

function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return x;
		}
	}
	
	return false;
}

// script functions
function load(key) {
	var value = -1;
	if(useCookies === true) {
		if(document.cookie.match("(^|;)\\s*" + key + "=")) {
			var value = document.cookie.split(document.cookie.match("(^|;)\\s*" + key + "=")[0])[1].split(";")[0];
		}
	} else {
		if(localStorage.getItem(key)) {
			var value = localStorage.getItem(key);
		}
	}
	
	return value;
}

function save(key, value, expires) {
	if(expires !== undefined) {
		var expires = "expires=" + expires + ";";
	} else {
		var expires = "";
	}
	
	if(useCookies === true) {
		document.cookie = key + "=" + value + ";" + expires;
	} else {
		localStorage.setItem(key, value);
	}
}

function getCurrentBuildings() {
	var arr = new Array();
	for(var x = 0; x < config.buildingNames.length; x++) {
		arr.push(parseInt(data.village.buildings[config.buildingNames[x]], 10));
	}
	
	return arr;
}

function getAimBuildings() {
	var takeCareOfGroups = load("takeCareOfGroups" + sitterHash);
	
	if(takeCareOfGroups == "true") {
		var key = "buildings_" + data.village.group + "_" + sitterHash;
	} else {
		var key = "buildings_" + sitterHash;
	}
	
	if(load(key) !== -1) {
		var buildings = load(key).split(',');
	} else {
		var buildings = config.defaultBuildingLevels;
	}
	
	for(var x = 0; x < buildings.length; x++) {
		buildings[x] = parseInt(buildings[x], 10);
	}
	
	return buildings;
}

function getBuildQueue() {
	var buildQueue = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	
	if(document.getElementById("build_queue")) {
		var rows = document.getElementById("build_queue").getElementsByTagName("tr");
		
		for(var x = 1; x < rows.length; x++) {
			var cell = rows[x].getElementsByTagName("td")[0];
			var content = cell.textContent;
			var building = content.split(" (")[content.split(" (").length-2];
			var direction = (content.split(" (")[content.split(" (").length-1].split(")")[0] == lang.destroyStep) ? -1 : +1;
			
			var index = config.buildingNames.contains(lang[building]);
			if(index !== false) {
				buildQueue[index] = eval(buildQueue[index] + direction);
			}
		}
	}
	
	return buildQueue;
}

function toggleMenu() {
	var kind = document.getElementById('toggleKind').textContent;
	
	if(kind == 'ein') {
		document.getElementById("toggleKind").textContent = 'aus';
		
		document.getElementById("headRow").style.display = 'table-row';
		document.getElementById("menuRow").style.display = 'table-row';
		
		document.getElementById("buttonCell").style.visibility = 'visible';
		document.getElementById("minimizeCell").style.visibility = 'visible';
		if(existsPA()) {
			document.getElementById("groupCell").style.visibility = 'visible';
		}
	} else {
		document.getElementById("toggleKind").textContent = 'ein';
		
		document.getElementById("headRow").style.display = 'none';
		document.getElementById("menuRow").style.display = 'none';
		
		document.getElementById("buttonCell").style.visibility = 'hidden';
		document.getElementById("minimizeCell").style.visibility = 'hidden';
		if(existsPA()) {
			document.getElementById("groupCell").style.visibility = 'hidden';
		}
	}
}

function createMenu() {
	var buildingWrapper = _evaluate('//*[@id="building_wrapper"]')[0];
	
	// Tabelle fuer das Menu erzeugen
	var menuTable = document.createElement('table');
	menuTable.className = "vis";
	buildingWrapper.insertBefore(menuTable, buildingWrapper.firstChild);
	
	var menuTBody = document.createElement("tbody");
	menuTable.appendChild(menuTBody);
	
	var menuRow = document.createElement("tr");
	menuRow.id = "headRow";
	menuRow.style.display = 'none';
	menuTBody.appendChild(menuRow);
	
	// die Grafiken einfuegen
	for(var x = 0; x < config.buildingNames.length; x++) {
		var headCell = document.createElement("th");
		headCell.style.textAlign = "center";
		menuRow.appendChild(headCell);
		
		var image = document.createElement("img");
		if(config.buildingNames[x] != "church_f") {
			image.src = "/graphic/buildings/" + config.buildingNames[x] + ".png";
		} else {
			image.src = "/graphic/buildings/church.png";
		}
		image.alt = config.buildingNames[x];
		headCell.appendChild(image);
	}
	
	var menuRow = document.createElement("tr");
	menuRow.id = "menuRow";
	menuRow.style.display = 'none';
	menuTBody.appendChild(menuRow);
	
	// die eingabefelder erzeugen
	for(var x = 0; x < config.buildingNames.length; x++) {
		var menuCell = document.createElement("td");
		headCell.style.textAlign = "center";
		menuRow.appendChild(menuCell);
		
		var inputField = document.createElement("input");
		inputField.style.textAlign = "center";
		inputField.type = "text";
		inputField.size = "2";
		inputField.value = buildings['aim'][x];
		inputField.name = "buildings";
		menuCell.appendChild(inputField);
	}
	
	var commandRow = document.createElement("tr");
	menuTBody.appendChild(commandRow);
	
	var toggleCell = document.createElement("td");
	toggleCell.colSpan = (existsPA()) ? config.buildingNames.length/3 : config.buildingNames.length/3+2;
	toggleCell.style.textAlign = "center";
	commandRow.appendChild(toggleCell);
	
	// den link zum ein-/ausblenden des menus erzeugen
	var toggleLink = document.createElement("a");
	toggleLink.href = 'javascript:void(0);';
	toggleLink.addEventListener('click', toggleMenu, false);
	toggleLink.innerHTML = "Gebäude-Einstellungen <span id='toggleKind'>ein</span>blenden";
	toggleCell.appendChild(toggleLink);
	
	// wenn PA vorhanden ist auch eine Abfrage einbauen, ob 
	if(existsPA()) {
		var groupCell = document.createElement("td");
		groupCell.colSpan = config.buildingNames.length/4;
		groupCell.id = "groupCell";
		groupCell.style.visibility = 'hidden';
		groupCell.style.textAlign = "center";
		commandRow.appendChild(groupCell);
		
		var groupLink = document.createElement("a");
		groupLink.textContent = "Gruppen?";
		groupLink.href = "javascript:void(0);";
		groupLink.addEventListener('click', askForGroups, false);
		groupCell.appendChild(groupLink);
	}
	
	// Die Abfrage, ob die minimierte Anzeige erscheinen soll
	var minimizeCell = document.createElement("td");
	minimizeCell.id = "minimizeCell";
	minimizeCell.style.visibility = 'hidden';
	minimizeCell.style.textAlign = 'center';
	minimizeCell.colSpan = (existsPA()) ? config.buildingNames.length/4 : config.buildingNames.length/3-1;
	commandRow.appendChild(minimizeCell);
	
	var minimizeCheck = document.createElement("input");
	minimizeCheck.type = "checkbox";
	minimizeCheck.checked = (showMinimizeBar == "true") ? true : false;
	minimizeCheck.id = "minimizeCheck";
	minimizeCell.appendChild(minimizeCheck);
	
	var minimizeCheckLabel = document.createElement("label");
	minimizeCheckLabel.setAttribute('for', 'minimizeCheck');
	minimizeCheckLabel.innerHTML = " Mini-Bar anzeigen?";
	minimizeCell.appendChild(minimizeCheckLabel);
	
	// Den Speicherbutton erzeugen
	var buttonCell = document.createElement("td");
	buttonCell.id = "buttonCell";
	buttonCell.style.visibility = 'hidden';
	buttonCell.colSpan = (existsPA()) ? config.buildingNames.length/4 : config.buildingNames.length/3-1;
	buttonCell.style.textAlign = "center";
	commandRow.appendChild(buttonCell);
	
	var button = document.createElement("button");
	button.style.padding = "1px";
	button.addEventListener('click', savePreferences, false);
	button.innerHTML = " » Speichern « ";
	buttonCell.appendChild(button);
}

function existsPA() {
	return data.player.premium;
}

function savePreferences() {
	var showMinimizeBar = (document.getElementById('minimizeCheck').checked) ? true : false;
	save("showMinimizeBar" + sitterHash, showMinimizeBar.toString(), getExpires());
	
	var levels = config.defaultBuildingLevels;
	var buildings = document.getElementsByName("buildings");
	
	for(var x = 0; x < buildings.length; x++) {
		var level = buildings[x].value;
		levels[x] = level;
	}
	
	var takeCareOfGroups = load("takeCareOfGroups" + sitterHash);
	if(takeCareOfGroups == "true") {
		save("buildings_" + data.village.group + "_" + sitterHash, levels.join(","), getExpires());
	} else {
		save("buildings_" + sitterHash, levels.join(","), getExpires());
	}
	
	window.alert(lang.saved + "!");
	location.reload();
}

function askForGroups() {
	takeCareOfGroups = window.confirm("DS Gebaeudeaufbau vereinfachen:\n\n" + lang.takeCareOfGroups + "?");
	save("takeCareOfGroups" + sitterHash, takeCareOfGroups);
	location.reload();
}

function setAppearance(name, kind) {
	var table = document.getElementById('buildings');
	var rows = table.getElementsByTagName('tr');
	var cells = new Array();
	
	for(var x = 1; x < rows.length; x++) {
		if(rows[x].id.split('_')[2] == name) {
			cells = rows[x].getElementsByTagName('td');
			break;
		}
	}
	
	if(cells.length == 0) {
		return;
	}
	
	for(var x = 1; x < cells.length; x++) {
		cells[x].parentNode.removeChild(cells[x--]);
	}
	
	switch(kind) {
		case "destroy": 
			var cell = document.createElement("td");
			cell.colSpan = "100";
			cell.style.textAlign = "center";
			cells[0].parentNode.appendChild(cell);
			
			var link = document.createElement("a");
			link.href = '#';
			link.id = 'main_destroylink_' + name;
			link.setAttribute('onclick', 'BuildingMain.mode=1;BuildingMain.destroy(\'' + name + '\');BuildingMain.mode=0;void(0);');
			link.innerHTML = lang.destroyingOneStep;
			cell.appendChild(link);
			break;
		
		case "ready":
			var cell = document.createElement("td");
			cell.colSpan = "100";
			cell.style.textAlign = "center";
			cell.className = "inactive";
			cell.innerHTML = lang.buildingComplitlyBuild;
			cells[0].parentNode.appendChild(cell);
			break;
	}
}

function getExpires() {
  var date = new Date();
  date.setYear(date.getYear()+1905);
  
  return date.toGMTString();
}

function toggleReadyBuildings() {
	var table = document.getElementById("buildings");
	var rows = table.getElementsByTagName("tr");
	for(var x = 1; x < rows.length; x++) {
		if(!rows[x].innerHTML.match(lang.buildingComplitlyBuild)) {
			continue;
		}
		
		var display = rows[x].style.display;
		switch(display) {
			case "none":
				rows[x].style.display = "table-row";
				save("showReadyBuildings" + sitterHash, "false", getExpires());
				break;
			default: 
			case "table-row":
				rows[x].style.display = "none";
				save("showReadyBuildings" + sitterHash, "true", getExpires());
				break;
		}
	}
}

function changeFader() {
	var fader = document.getElementById("hide_completed");
	if(fader) {
		fader.removeAttribute("onclick");
		fader.addEventListener('click', toggleReadyBuildings, false);
	} else {
		var span = document.createElement("span");
		_evaluate('//form[contains(@action, "action=change_name")]')[0].parentNode.insertBefore(span, _evaluate('//form[contains(@action, "action=change_name")]')[0]);
		
		var fader = document.createElement("input");
		fader.type = "checkbox";
		fader.id = "hide_completed";
		fader.addEventListener('change', toggleReadyBuildings, false);
		span.appendChild(fader);
		
		var label = document.createElement("label");
		label.setAttribute("for", "hide_completed");
		label.innerHTML = lang.hideCompletedBuildings;
		span.appendChild(label);
		
		var cursorReturn = document.createElement("br");
		span.appendChild(cursorReturn);
		
		var cursorReturn = document.createElement("br");
		span.appendChild(cursorReturn);
	}
}

function showRightPossibilities(buildings) {
	for(var x = 0; x < buildings['current'].length; x++) {
		var current = parseInt(buildings['current'][x], 10)+parseInt(buildings['queue'][x], 10);
		var diff 	= parseInt(buildings['aim'][x], 10)-current;
		
		if(diff == 0) {
			var kind = "ready";
		} else if(diff < 0) {
			var kind = "destroy";
		} else {
			continue;
		}
		
		setAppearance(config.buildingNames[x], kind);
	}
}

// Addon "DS Ausbaustufen ohne Scrollen" von c1b1 (Samuel Essig) direkt eingebaut (angepasst von Heinzel)
function addMinimizedBar() {
	var url = document.location.href;
	var names = ['main','barracks','stable','garage','church','snob','smith','place','statue','market','wood','stone','iron','farm','storage','hide','wall'];
	
	const decreaseIcon = '<img alt="Abriss um eine Stufe: " src="data:image/gif;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA' + 
	'BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACRJREFUeF5dyLENAAAERcFfGsIsVmNzvEIj' + 
	'uerk+rqQQqx7wwCKiAVpyLisFQAAAABJRU5ErkJggg==" />';
	
	const increaseIcon = '<img alt="Ausbau um eine Stufe: " src="data:image/gif;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA' + 
	'BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACNJREFUeF5dyLENAAAIAjBGj/AWXtPPFRlN' + 
	'OhWBk0Yrmxbls3zABWlcjOpjAAAAAElFTkSuQmCC" />';
	
	var result = {};
	
	// Add placeholders
	for(var x = 0; x < names.length; x++) {
		result[names[x]] = '--';
	}
	
	// Get 'Decrease' Buildings
	var list = _evaluate('//a[.="Abriss um eine Stufe"]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName('a')[0];
		var name = a.id.split('_')[2];
		
		var display = _trim(list[x].parentNode.getElementsByTagName("a")[0].textContent);
		
		// Walk through the building queue to get next level
		var build_queue = _evaluate('//table[@id="build_queue"]/tbody/tr/td');
		var level = 0;
		for(var y = 0; y < build_queue.length; y++) {
			if(build_queue[y].textContent.indexOf(display) != -1) {
				level = (build_queue[y].textContent.match(/(\d{1,2})/)) ? RegExp.$1 : level-1;
			}
		}
		
		// Was not in building queue
		if(level <= 0) {
			level += parseInt(list[x].parentNode.getElementsByTagName('span')[0].textContent.match(/(\d{1,2})/)[1], 10);
		}
		
		result[name] = '<a href="#" onclick="BuildingMain.mode=1;BuildingMain.destroy(\'' + name + '\');BuildingMain.mode=0;void(0);">' + decreaseIcon + ' ' + (parseInt(level)-1) + '</a>';
	}
	
	// Get 'Increase' Buildings
	var list = _evaluate('//a[contains(., "Ausbau auf Stufe")]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName('a')[0];
		var name = a.id.split('_')[2];
		
		var display = _trim(list[x].parentNode.getElementsByTagName("a")[0].textContent);
		
		// Walk through the building queue to get next level
		var build_queue = _evaluate('//table[@id="build_queue"]/tbody/tr/td');
		var level = false;
		for(var y = 0; y < build_queue.length; y++) {
			if(build_queue[y].textContent.indexOf(display) != -1) {
				level = build_queue[y].textContent.match(/(\d{1,2})/)[1];
			}
		}
		
		// Was not in building queue
		if(level === false) {
			level = list[x].parentNode.getElementsByTagName('span')[0].textContent.match(/(\d{1,2})/)[1];
		}
		
		result[name] = '<a href="#" onclick="return BuildingMain.build(\'' + name + '\');">' + increaseIcon + ' ' + (parseInt(level)+1) + '</a>';
	}
	
	// Get Not Exist Buildings
	var list = _evaluate('//table[@id="buildings"]/tbody/tr/td/a[.="Bauen"]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName("a")[0];
		var name = a.id.split('_')[2];
		level = 0; 
		
		result[name] = '<a href="#" onclick="return BuildingMain.build(\'' + name + '\');">' + increaseIcon + ' ' + (parseInt(level)+1) + '</a>';
	}
	
	// If bar already exist, remove the existing one
	var oldBar = document.getElementById('minimizeBar');
	if(oldBar !== null) {
		oldBar.parentNode.removeChild(oldBar);
	}
	
	// Add bar
	var div = document.createElement('div');
	div.id = "minimizeBar";
	document.getElementById("content_value").insertBefore(div, document.getElementById("content_value").getElementsByTagName('table')[0].nextSibling);
	
	div.appendChild(document.createElement('br'));
	
	var span = div.appendChild(document.createElement('span'));
	
	var table = document.createElement("table");
	table.style.display = "block";
	table.className = "vis";
	div.appendChild(table);
	
	var colgroup = table.appendChild(document.createElement("colgroup"));
	colgroup.width = "50";
	colgroup.span = names.length+1;
	
	var tr0 = table.appendChild(document.createElement("tr"));
	var tr1 = table.appendChild(document.createElement("tr"));
	
	for(var x = 0; x < names.length; x++) {
		var th = tr0.appendChild(document.createElement("th"));
		th.style.textAlign = "center";
		
		var img = th.appendChild(document.createElement("img"));
		img.src = "/graphic/buildings/" + names[x] + ".png";
		
		var td = tr1.appendChild(document.createElement("td"));
		td.innerHTML = result[names[x]];
		td.style.textAlign = "center";
		if(result[names[x]] != "--") {
			td.style.backgroundColor = "#fadc9b";
		}
	}
}


function main() {
	// falls man nach dem Abriss eines Gebaeudes auf der Abrissseite ist, zur Aufbauseite weiterleiten
	if(data.mode == "destroy" && location.href.match(/\&manual=true$/) === null) {
		location.href = location.href.replace(/(\?|\&)mode=destroy($|\&)/, "$1");
		return false;
	}
	
	// ermoeglichen, dass man trotzdem ueber den "Abriss"-Link auf die Abrissseite zugreifen kann
	try {
		_evaluate('//a[.="' + lang.demolitian + ' "]')[0].href += "&manual=true";
	} catch(e) {}	// falls keiner vorhanden ist (zB. HG < 15), keinen Fehler erzeugen sondern weitermachen
	
	// Daten ueber die Gebaeude sammeln
	buildings = new Object();
	buildings['current'] 	= getCurrentBuildings(); 
	buildings['queue'] 		= getBuildQueue(); 
	buildings['aim'] 		= getAimBuildings();
	
	// Menue fuer die Einstelllungen erzeugen
	createMenu();
	
	// den Link zum Ausblenden ausgebauter Gebaeude manipulieren
	changeFader();
	
	// nur die richtigen Bauauftragsmoeglichkeiten einblenden
	showRightPossibilities(buildings);
	
	// falls die fertigen Gebaeude ausgeblendet werden sollen, dies tun
	if(load("showReadyBuildings" + sitterHash) == "true") {
		document.getElementById("hide_completed").checked = "true";
		toggleReadyBuildings();
	}
	
	// falls gewollt, das Addon von c1b1 einbinden
	if(showMinimizeBar == "true") {
		addMinimizedBar();
	}
}

(function __construct() {
	// window / game_data ermitteln
	win = (typeof(unsafeWindow) == 'undefined') ? window : unsafeWindow;
	data = win.game_data;
	
	// ScriptAPI einbinden
	win.ScriptAPI.register('DSimproveMainBuilding', 8.4, 'Heinzelmänchen', 'heinzelmaenchen@scripter.die-staemme.de');
	
	// globale Variablen
	config = new CConfig();
	lang = new CLang()[data.market];
	vid = data.village.id;
	sitterHash = (location.href.match(/[?&]t=(\d+)($|\&)/)) ? RegExp.$1 : 0;
	sitterParam = (sitterHash != 0) ? 't=' + sitterHash + '&' : '';
	useCookies = (typeof(localStorage) != 'undefined') ? false : true;
	takeCareOfGroups = load("takeCareOfGroups" + sitterHash);
	showMinimizeBar = load("showMinimizeBar" + sitterHash);
	
	// falls nocht nicht gespeichert, nachfragen ob auf Gruppen Ruecksicht genommen werden soll oder bei nonePA gleich ein nein speichern
	if(takeCareOfGroups === -1) {
		if(existsPA() === true) {
			askForGroups();
		} else {
			takeCareOfGroups = false;
			save("takeCareOfGroups" + sitterHash, false);
		}
	}
	
	main();
	
	// nach Refreshen die Anzeige wieder korrigieren
	var tw_update_all = win.BuildingMain.update_all;
	win.BuildingMain.update_all = function(data) {
		tw_update_all(data);
		
		if(typeof(data.next_buildings) != 'undefined') {
			main();
		}
	}
})();