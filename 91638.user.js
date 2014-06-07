// ==UserScript==
// @name				مساعد الهدم
// @author				Heinzel .. تعريب الـقـيصر
// @namespace			http://userscripte.org
// @description			Dieses Script ermoeglicht es, im Hauptgebaeude sowohl abzureissen als auch aufzubauen OHNE extra zwischen den einzelnen Modi hin und her zu wechseln. Dazu kommt noch, dass man seinen individuellen Ausbauwunsch dem Script mitteilen kann und dieses sagt einem dann, ob man die Gebäude noch abreißen/aufbauen/so lassen muss.
// @include			http://ae*tribalwars.ae/game.php?*screen=main*
// ==/UserScript==


// Version 2.2.1

// Changelog ab 2.0.0:
// 2.0.1: 	 - Bugfix: im normalen Account wurde teilweise ein t-Hash in der URL angezeigt
// 2.1.0: 	 - Sprache CH hinzugefuegt
//		 - Bugfix: falls der Link "Komplett ausgebaute Gebaeude verstecken" nicht existiert, wird er erzeugt
//		 - Anpassung an DS-v6.2
// 2.2.0:	 - Addon "DS Ausbaustufen ohne Scrollen" von c1b1 direkt integriert (deaktivierbar)
//		 - Anpassung an DS-v6.5
//		 - Sprache FR hinzugefuegt
//		 - Nach Abriss automatisch wieder in die Bauuebersicht wechseln
//		 - separater Abriss erlaubt
// 2.2.1:	 - Bugfix: Wenn der Abriss-Button nicht da war, wurde ein Fehler ausgeloest


// classes
function CConfig() {
	this.buildingNames = ["main","barracks","stable","garage","church","church_f","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];
	this.defaultBuildingLevels = [20,25,20,15,3,1,1,20,1,1,25,30,30,30,30,30,10,20];
}

function CLang() {
	this.ae = {
		'Hauptgebäude': "main", 
		'Kaserne': "الثكنات", 
		'Stall': "الاسطبل", 
		'Werkstatt': "garage", 
		'Kirche': "church", 
		'Erste Kirche': "church_f", 
		'Adelshof': "snob", 
		'Schmiede': "smith", 
		'Versammlungsplatz': "place", 
		'Statue': "statue", 
		'Marktplatz': "السوق", 
		'Holzfäller': "wood", 
		'Lehmgrube': "stone", 
		'Eisenmine': "iron", 
		'Bauernhof': "farm", 
		'Speicher': "storage", 
		'Versteck': "hide", 
		'Wall': "wall", 
		'destroyStep': "Stufe abreißen", 
		'saved': "تم ", 
		'takeCareOfGroups': "Soll beim Speichern der gewuenschten Gebaeude Ruecksicht auf Gruppen genommen werden", 
		'destroyingOneStep': "هدم مستوى واحد", 
		'buildingComplitlyBuild': "لا تستطيع رفع مستوى المبنى اكثر من ذلك", 
		'hideCompletedBuildings': "Komplett ausgebaute Gebäude verstecken", 
		'demolitian': "Abriss"
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
	this.fr = {
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
		arr.push(data.village.buildings[config.buildingNames[x]]);
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
		var buildings = load(key).split(",");
	} else {
		var buildings = config.defaultBuildingLevels;
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
	var kind = document.getElementById("toggleKind").textContent;
	
	if(kind == "فتح") {
		document.getElementById("headRow").style.display = "table-row";
		document.getElementById("menuRow").style.display = "table-row";
		document.getElementById("buttonCell").style.display = "table-cell";
		document.getElementById("minimizeCell").style.display = "table-cell";
		document.getElementById("toggleKind").textContent = "إغلاق";
		if(existsPA()) {
			document.getElementById("groupCell").style.display = "table-cell";
		}
	} else {
		document.getElementById("headRow").style.display = "none";
		document.getElementById("menuRow").style.display = "none";
		document.getElementById("buttonCell").style.display = "none";
		document.getElementById("minimizeCell").style.display = "none";
		document.getElementById("toggleKind").textContent = "فتح";
		if(existsPA()) {
			document.getElementById("groupCell").style.display = "none";
		}
	}
}

function createMenu() {
	var buildingsRow = _evaluate('//table[@id="buildings"]')[0];
	
	var row = document.createElement("tr");
	buildingsRow.parentNode.insertBefore(row, buildingsRow);
	
	var cell = document.createElement("td");
	row.appendChild(cell);
	
	// Tabelle fuer das Menu erzeugen
	var menuTable = document.createElement("table");
	menuTable.className = "vis";
	cell.appendChild(menuTable);
	
	var menuTbody = document.createElement("tbody");
	menuTable.appendChild(menuTbody);
	
	var menuRow = document.createElement("tr");
	menuRow.id = "headRow";
	menuRow.style.display = "none";
	menuTbody.appendChild(menuRow);
	
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
	menuRow.style.display = "none";
	menuTbody.appendChild(menuRow);
	
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
	menuTbody.appendChild(commandRow);
	
	var toggleCell = document.createElement("td");
	toggleCell.colSpan = (existsPA()) ? config.buildingNames.length/3 : config.buildingNames.length/3+2;
	toggleCell.style.textAlign = "center";
	commandRow.appendChild(toggleCell);
	
	// den link zum ein-/ausblenden des menus erzeugen
	var toggleLink = document.createElement("a");
	toggleLink.href = "javascript:;";
	toggleLink.addEventListener('click', toggleMenu, false);
	toggleLink.innerHTML = " <span id='toggleKind'>فتح</span> الخيارات";
	toggleCell.appendChild(toggleLink);
	
	// wenn PA vorhanden ist auch eine Abfrage einbauen, ob 
	if(existsPA()) {
		var groupCell = document.createElement("td");
		groupCell.colSpan = config.buildingNames.length/4;
		groupCell.id = "groupCell";
		groupCell.style.display = "none";
		groupCell.style.textAlign = "center";
		commandRow.appendChild(groupCell);
		
		var groupLink = document.createElement("a");
		//groupLink.textContent = "Gruppen?";
		groupLink.href = "javascript:;";
		groupLink.addEventListener('click', askForGroups, false);
		groupCell.appendChild(groupLink);
	}
	
	// Die Abfrage, ob die minimierte Anzeige erscheinen soll
	var minimizeCell = document.createElement("td");
	minimizeCell.id = "minimizeCell";
	minimizeCell.style.display = "none";
	minimizeCell.style.textAlign = "center";
	minimizeCell.colSpan = (existsPA()) ? config.buildingNames.length/4 : config.buildingNames.length/3-1;
	commandRow.appendChild(minimizeCell);
	
	var minimizeCheck = document.createElement("input");
	minimizeCheck.type = "checkbox";
	minimizeCheck.checked = (showMinimizeBar == "true") ? true : false;
	minimizeCheck.id = "minimizeCheck";
	minimizeCell.appendChild(minimizeCheck);
	
	var minimizeCheckLabel = document.createElement("label");
	minimizeCheckLabel.setAttribute('for', 'minimizeCheck');
	minimizeCheckLabel.innerHTML = "&nbsp;إنشاء شريط الهدم السريع";
	minimizeCell.appendChild(minimizeCheckLabel);
	
	// Den Speicherbutton erzeugen
	var buttonCell = document.createElement("td");
	buttonCell.id = "buttonCell";
	buttonCell.style.display = "none";
	buttonCell.colSpan = (existsPA()) ? config.buildingNames.length/4 : config.buildingNames.length/3-1;
	buttonCell.style.textAlign = "center";
	commandRow.appendChild(buttonCell);
	
	var button = document.createElement("button");
	button.style.padding = "1px";
	button.addEventListener('click', savePreferences, false);
	button.innerHTML = "&nbsp;&raquo;&nbsp;حفظ&nbsp;&laquo;&nbsp;";
	buttonCell.appendChild(button);
}

function existsPA() {
	return (document.getElementById("quickbar_outer")) ? true : false;
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
	var table = document.getElementById("buildings");
	var rows = table.getElementsByTagName("tr");
	var cells = new Array();
	
	for(var x = 1; x < rows.length; x++) {
		if(rows[x].innerHTML.match("graphic\/buildings\/" + name + "\.png")) {
			cells = rows[x].getElementsByTagName("td");
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
			link.href = "/game.php?village=" + data.village.id + "&screen=main&" + sitterParam + "action=destroy&h=" + data.csrf + "&building_id=" + name;
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

// Addon "DS Ausbaustufen ohne Scrollen" von c1b1 (Samuel Essig) direkt eingebaut (angepasst von Heinzel)
function addMinimizedBar() {
	var url = document.location.href;
	var names = ['main','barracks','stable','garage','church','snob','smith','place','statue','market','wood','stone','iron','farm','storage','hide','wall'];
	
	const decreaseIcon = '<img alt="هدم مستوى واحد: " src="data:image/gif;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA' + 
	'BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACRJREFUeF5dyLENAAAERcFfGsIsVmNzvEIj' + 
	'uerk+rqQQqx7wwCKiAVpyLisFQAAAABJRU5ErkJggg==" />';
	
	const increaseIcon = '<img alt="هدم مستوى واحد: " src="data:image/gif;base64,' + 
	'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAQAQMAAAD+hscAAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAA' + 
	'BlBMVEXsHOUAAACAUKm/AAAAAXRSTlMAQObYZgAAACNJREFUeF5dyLENAAAIAjBGj/AWXtPPFRlN' + 
	'OhWBk0Yrmxbls3zABWlcjOpjAAAAAElFTkSuQmCC" />';
	
	var result = {};
	
	// Add placeholders
	for(var x = 0; x < names.length; x++) {
		result[names[x]] = '--';
	}
	
	// Get 'Decrease' Buildings
	var list = _evaluate('//a[.="هدم مستوى واحد"]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName("a")[0];
		var name = a.href.match(/building_id=(\w+)/)[1];
		
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
		
		result[name] = '<a href="' + a.href + '">' + decreaseIcon + ' ' + (parseInt(level)-1) + '</a>';
	}
	
	// Get 'Increase' Buildings
	var list = _evaluate('//a[contains(., "Ausbau auf Stufe")]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName("a")[0];
		var name = a.href.match(/id=(\w+)/)[1];
		
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
		
		result[name] = '<a href="' + a.href + '">' + increaseIcon + ' ' + (parseInt(level)+1) + '</a>';
	}
	
	// Get Not Exist Buildings
	var list = _evaluate('//table[@id="buildings"]/tbody/tr/td/a[.="Bauen"]/parent::td');
	for(var x = 0; x < list.length; x++) {
		var a = list[x].getElementsByTagName("a")[0];
		var name = a.href.match(/id=(\w+)/)[1];
		level = 0; 
		
		result[name] = '<a href="' + a.href + '">' + increaseIcon + ' ' + (parseInt(level)+1) + '</a>';
	}
	
	// Add bar
	var table = document.createElement("table");
	table.id = "minimizeBar";
	table.style.display = "block";
	table.className = "vis";
	document.getElementById("content_value").insertBefore(table, document.getElementById("content_value").getElementsByTagName('table')[0].nextSibling);
	document.getElementById("content_value").insertBefore(document.createElement("br"), table);
	
	var span = document.createElement("span");
	document.getElementById("content_value").insertBefore(span, table);
	
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

(function main() {
	// game_data ermitteln
	if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.match(/Firefox/) !== null) {
		data = unsafeWindow.game_data;
	} else {
		/* stringify-function
		function stringify(obj) {
			var string = '{';
			for(var attribute in obj) {
				string += '"' + attribute + '":';
				switch(typeof(obj[attribute])) {
					case 'object': 
						if(obj[attribute] != null) {
							string += stringify(obj[attribute]) + ',';
						} else {
							string += 'null,';
						}
						break;
					case 'string': 
						string += '"' + obj[attribute].replace(/\//g, '\\/').replace(/\n/g, '\\n') + '",';
						break;
					case 'number': 
						string += obj[attribute].toString() + ',';
						break;
				}
			}
			string = string.replace(/,$/, "");
			string += '}';
			return string;
		}
		*/
		var script = document.createElement("script");
		script.type = "application/javascript";
		script.textContent = 	unescape("function%20stringify%28obj%29%20%7B%0A%20%20%20%20var%20string%20%3D%20%22%7B%22%3B%0A%20%20%20%20for%20%28var%20attribute%20in%20obj%29%20%7B%0A%20%20%20%20%20%20%20%20string%20+%3D%20%22%5C%22%22%20+%20attribute%20+%20%22%5C%22%3A%22%3B%0A%20%20%20%20%20%20%20%20switch%20%28typeof%20obj%5Battribute%5D%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20case%20%22object%22%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20%28obj%5Battribute%5D%20%21%3D%20null%29%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20string%20+%3D%20stringify%28obj%5Battribute%5D%29%20+%20%22%2C%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%20else%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20string%20+%3D%20%22null%2C%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%20%20case%20%22string%22%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20string%20+%3D%20%22%5C%22%22%20+%20obj%5Battribute%5D.replace%28/%5C//g%2C%20%22%5C%5C/%22%29.replace%28/%5Cn/g%2C%20%22%5C%5Cn%22%29%20+%20%22%5C%22%2C%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%20%20case%20%22number%22%3A%0A%20%20%20%20%20%20%20%20%20%20%20%20string%20+%3D%20obj%5Battribute%5D.toString%28%29%20+%20%22%2C%22%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20break%3B%0A%20%20%20%20%20%20%20%20%20%20default%3A%3B%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%20%20string%20%3D%20string.replace%28/%2C%24/%2C%20%22%22%29%3B%0A%20%20%20%20string%20+%3D%20%22%7D%22%3B%0A%20%20%20%20return%20string%3B%0A%7D") + 
								"var input=document.createElement('input');" + 
								"input.type='hidden';" + 
								"input.value=stringify(game_data);"  + 
								"input.id='game_data';" + 
								"document.body.appendChild(input);";
		document.body.appendChild(script);
		document.body.removeChild(script);
		
		eval("data=" + document.getElementById("game_data").value + ";");
	}
	
	// globale Variablen
	config = new CConfig();
	lang = new CLang()[data.market];
	vid = data.village.id;
	sitterHash = (location.href.match(/[?&]t=(\d+)($|\&)/)) ? RegExp.$1 : 0;
	sitterParam = (sitterHash != 0) ? "t=" + sitterHash + "&" : "";
	useCookies = (typeof(localStorage) != 'undefined') ? false : true;
	takeCareOfGroups = load("takeCareOfGroups" + sitterHash);
	showMinimizeBar = load("showMinimizeBar" + sitterHash);
	
	// falls man nach dem Abriss eines Gebaeudes auf der Abrissseite ist, zur Aufbauseite weiterleiten
	if(data.mode == "destroy" && location.href.match(/\&manual=true$/) === null) {
		location.href = location.href.replace(/(\?|\&)mode=destroy($|\&)/, "$1");
		return;
	}
	
	// ermoeglichen, dass man trotzdem ueber den "Abriss"-Link auf die Abrissseite zugreifen kann
	try {
		_evaluate('//a[.="' + lang.demolitian + ' "]')[0].href += "&manual=true";
	} catch(e){}
	
	// falls nocht nicht gespeichert, nachfragen ob auf Gruppen Ruecksicht genommen werden soll oder nicht - bei PA gleich ein nein speichern
	if(takeCareOfGroups === -1) {
		if(existsPA() === true) {
			askForGroups();
		} else {
			takeCareOfGroups = false;
			save("takeCareOfGroups" + sitterHash, false);
		}
	}
	
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
	
	// falls die fertigen Gebaeude ausgeblendet werden sollen, dies tun
	if(load("showReadyBuildings" + sitterHash) == "true") {
		document.getElementById("hide_completed").checked = "true";
		toggleReadyBuildings();
	}
	
	// falls gewollt, das Addon von c1b1 einbinden
	if(showMinimizeBar == "true") {
		addMinimizedBar();
	}
})();