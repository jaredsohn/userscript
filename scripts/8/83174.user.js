// ==UserScript==
// @name				plapl-tribalwars-MainBuilding
// @author				plapl.com
// @namespace			http://userscripte.org
// @description			سكربات خاص في تطوير المباني في مركز القريه
// @include			http://*tribalwars*/game.php?*screen=main*
// @exclude			http://*tribalwars*/game.php?*mode=destroy*
// ==/UserScript==


// Version 2.0.1

// Changelog ab 2.0.0:
// 2.0.1: Bugfix: im normalen Account wurde teilweise ein t-Hash in der URL angezeigt

// objects
function CConfig() {
	this.buildingNames = ["main","barracks","stable","garage","church","church_f","snob","smith","place","statue","market","wood","stone","iron","farm","storage","hide","wall"];
	this.defaultBuildingLevels = [20,25,20,15,0,0,1,20,1,1,25,30,30,30,30,30,10,20];
}

function CLang() {

			this.ae = {
		'مركز القريه': "main", 
		'الثكنات': "barracks", 
		'الاسطبل': "stable", 
		'الورشه': "garage", 
		'Kirche': "church", 
		'Erste Kirche': "church_f", 
		'الاكاديميه': "snob", 
		'الحداد': "smith", 
		'نقطة التجمع': "place", 
		'النصب التذكاري': "statue", 
		'السوق': "market", 
		'الخشاب': "wood", 
		'حفرة الطمي': "stone", 
		'منجم الحديد': "iron", 
		'المزارع': "farm", 
		'المخازن': "storage", 
		'المزارع': "farm", 
		'المخابئ': "hide", 
		'الحائط': "wall", 

 
	}
}

// base functions
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
	if(useCookies) {
		if(document.cookie.match("(^|;)" + key + "=")) {
			var value = document.cookie.split(document.cookie.match("(^|;)" + key + "="))[1].split(";")[0];
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
	
	if(useCookies) {
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
			var direction = (content.split(" (")[content.split(" (").length-1].split(")")[0] == "Stufe abreißen") ? -1 : +1;
			
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
	
	if(kind == "اضغط هون لي التعديل") {
		document.getElementById("headRow").style.display = "table-row";
		document.getElementById("menuRow").style.display = "table-row";
		document.getElementById("buttonCell").style.display = "table-cell";
		document.getElementById("toggleKind").textContent = "اضغط هون لي اخفاء";
		if(existsPA()) {
			document.getElementById("groupCell").style.display = "table-cell";
		}
	} else {
		document.getElementById("headRow").style.display = "none";
		document.getElementById("menuRow").style.display = "none";
		document.getElementById("buttonCell").style.display = "none";
		document.getElementById("toggleKind").textContent = "اضغط هون لي التعديل";
		if(existsPA()) {
			document.getElementById("groupCell").style.display = "none";
		}
	}
}

function createMenu() {
	var buildingsRow = _evaluate('//table[@id="buildings"]/parent::td/parent::tr')[0];
	
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
	toggleCell.colSpan = 1+config.buildingNames.length/2;
	toggleCell.style.textAlign = "center";
	commandRow.appendChild(toggleCell);
	
	// wenn PA vorhanden ist auch eine Abfrage einbauen, ob 
	if(existsPA()) {
		var groupCell = document.createElement("td");
		groupCell.colSpan = config.buildingNames.length/4;
		groupCell.id = "groupCell";
		groupCell.style.display = "none";
		groupCell.style.textAlign = "center";
		commandRow.appendChild(groupCell);
		
		var groupLink = document.createElement("a");
		groupLink.textContent = "المجموعات؟";
		groupLink.href = "javascript:;";
		groupLink.addEventListener('click', askForGroups, false);
		groupCell.appendChild(groupLink);
	}
	
	// den link zum ein-/ausblenden des menus erzeugen
	var toggleLink = document.createElement("a");
	toggleLink.href = "javascript:;";
	toggleLink.addEventListener('click', toggleMenu, false);
	toggleLink.innerHTML = "اعدات البناء <span id='toggleKind'>اضغط هنا لي التعديل</span>";
	toggleCell.appendChild(toggleLink);
	
	var buttonCell = document.createElement("td");
	buttonCell.id = "buttonCell";
	buttonCell.style.display = "none";
	buttonCell.colSpan = (existsPA()) ? config.buildingNames.length/4 : config.buildingNames.length/2;
	buttonCell.style.textAlign = "center";
	commandRow.appendChild(buttonCell);
	
	// den speicherbutton erzeugen
	var button = document.createElement("button");
	button.style.padding = "1px";
	button.addEventListener('click', savePreferences, false);
	button.innerHTML = "&nbsp;&raquo;save&nbsp;&laquo;&nbsp;";
	buttonCell.appendChild(button);
}

function existsPA() {
	return (document.getElementById("quickbar_outer")) ? true : false;
}

function savePreferences() {
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
	
	window.alert("تم حفظ الاعدادات!");
	location.reload();
}

function askForGroups() {
	takeCareOfGroups = window.confirm("www/qnqn.com/nبي بساطه قم بي الذهاب الى المجموعات  و قم بي اختياره و اختيار نمط البناء المناسب و قم بي حفظه");
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
			link.innerHTML = "قم بي تنزيل مستوى واحد";
			cell.appendChild(link);
			break;
		
		case "ready":
			var cell = document.createElement("td");
			cell.colSpan = "100";
			cell.style.textAlign = "center";
			cell.className = "inactive";
			cell.innerHTML = "البناء مكتمل يا قنبله";
			cells[0].parentNode.appendChild(cell);
			break;
	}
}

function getExpires() {
  var date = new Date();
  date.setYear(date.getYear()+1905);		// Um 5 Jahre erhöhen
  
  return date.toGMTString();
}

function toggleReadyBuildings() {
	var table = document.getElementById("buildings");
	var rows = table.getElementsByTagName("tr");
	
	for(var x = 1; x < rows.length; x++) {
		if(!rows[x].textContent.match(/المزارع صغيرة جدا/)) {
			continue;
		}
		
		var display = rows[x].style.display;
		
		switch(display) {
			case "none":
				rows[x].style.display = "table-row";
				save("showReadyBuildings_" + sitterHash, "false", getExpires());
				break;
			default: 
			case "table-row":
				rows[x].style.display = "none";
				save("showReadyBuildings_" + sitterHash, "true", getExpires());
				break;
		}
	}
}

function changeFader() {
	var fader = document.getElementById("hide_completed");
	fader.removeAttribute("onchange");
	fader.addEventListener('change', toggleReadyBuildings, false);
}

(function main() {
	// game_data ermitteln
	if(typeof(unsafeWindow) != 'undefined') {
		data = unsafeWindow.game_data;
	} else {
		var script = document.createElement("script");
		script.type = "application/javascript";
		script.textContent = 	"var input=document.createElement('input');" + 
								"input.type='hidden';" + 
								"input.value=JSON.encode(game_data);"  + 
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
	useCookies = (localStorage) ? false : true;
	takeCareOfGroups = load("takeCareOfGroups" + sitterHash);
	
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
	if(load("showReadyBuildings_" + sitterHash) == "true") {
		document.getElementById("hide_completed").checked = "true";
		toggleReadyBuildings();
	}
})();