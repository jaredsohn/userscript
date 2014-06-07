// ==UserScript==
// @name        Wurzelimperium Anbauhelfer
// @namespace   .
// @description Wenn ein Wurzelimperium-Tab im Hintergrund offen ist, kann dieses Script nach festgelegten Regeln Pflanzen anbauen, Wässern, Ernten, etc. Unfertig!
// @author      Max Staff
// @include     http://s*.wurzelimperium.de/main.php*
// @include     http://s*.zieloneimperium.pl/main.php*
// @include     http://s*.sadowajaimperija.ru/main.php*
// @include     http://s*.molehillempire.*/main.php*
// @include     http://s*.kertbirodalom.hu/main.php*
// @include     http://s*.zeleneimperium.cz/main.php*
// @include     http://s*.bahcivanlardiyari.com/main.php*
// @include     http://s*.bg.molehillempire.com/main.php*
// @version     1.5.9
// @changes     bugfix for pouring.
// @grant       GM_xmlhttpRequest
// ==/UserScript==

/*
 * 
 * "THE BEER-WARE LICENSE" (Revision 42):
 * Max Staff <max.staff@gmx.de> wrote this file. As long as you retain this
 * notice, you can do whatever you want with this stuff. If we meet some day,
 * and you think this stuff is worth it, you can buy me a beer in return.
 * -Max Staff.
 * 
 * */

//TODO:

//Anbauzeit sehen -->1.6

//Wassergarten



//Update-Functions
//These are only for updating the Script, nothing else.

//checks, if a new version is available.
function checkUpdate(response) {
	if (response) {
		response = response.split("\n");
		var version = "1.5.9";
		for (var i = 0; i < response.length; i++) {
			if (response[i].substring(0, 11) == "// @version") {
				newVersion = response[i].substring(19);
			} else if (response[i].substring(0, 11) == "// @changes") {
				changes = response[i].substring(19);
			}
		}
		if (newer(version, newVersion) && confirm("Eine neue Version des Anbauhelfers ist verfügbar. (" + version + "->" + newVersion + ") Änderungen: " + changes + "\nJetzt herunterladen?")) {
			self.location.href = "http://userscripts.org/scripts/source/168137.user.js";
		}
	} else {
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://userscripts.org/scripts/source/119724.meta.js",
			onload: function(response) { checkUpdate(response.responseText); }
		});
	}
}

//compares two version numbers.
function newer(version, newVersion) {
	version = version.split(".");
	newVersion = newVersion.split(".");
	for (var i = 0; true; i++) {
		if (version[i] && newVersion[i] && (parseInt(version[i]) < parseInt(newVersion[i]))) {
			return true;
		} else if (!newVersion[i]) {
			return false;
		} else if (!version[i]) {
			return true;
		}
	}
}

//Script
//this is the main part of the Script.

var token;
var style;
var table;
var rows;
var cells;
var plants;
var garden = 1;
var server = self.location.href.split("/")[2];
var language = self.location.href.split("/")[2].split(".")[2];
var selectSquares = false;
var mouseDown = false;
var alreadyChanged = new Array();
var tableOffset = 20;
var tableHidden = false;

//initialise the whole thing. this is run at start.
function init() {
	console.log("Starte Script...");
	var div = document.createElement("div");
	div.innerHTML = '<input type="button" value="show grid" /><input type="button" value="debug" />';
	var a = new Array();
	a[0] = 3;
	a[1] = 4;
	a[2] = 5;
	div.childNodes[0].onclick = function () { buildGrid(); };
	div.childNodes[1].onclick = function () { console.log(plants); };
	div.style = "position: fixed; bottom: 0px; z-index: 1000;";
	document.getElementsByTagName("body")[0].appendChild(div);
	token = unsafeWindow.ajax.token;
	buildGrid();
	plants = getGardenStatus();
	console.log("Script erfolgreich gestartet.");
}

window.setTimeout(function () { checkUpdate(); }, 1000);
window.setTimeout(function () { init(); }, 10000);

//build the table with general info in the garden.
function buildGrid() {
	for (var i = 0; i < document.getElementsByClassName("grid").length; i++) {
		document.getElementsByClassName("grid")[i].parentNode.removeChild(document.getElementsByClassName("grid")[i]);
	}
	if (document.getElementById("mystyle")) {
		document.getElementById("mystyle").parentNode.removeChild(document.getElementById("mystyle"));
	}
	table = document.createElement("table");
	table.className = "grid";
	var tbody = document.createElement("tbody");
	rows = new Array();
	cells = new Array();
	for (var i = 0; i < 12; i++) {
		rows[i] = document.createElement("tr");
		cells[i] = new Array();
		for (var j = 0; j < 17; j++) {
			cells[i][j] = document.createElement("td");
			cells[i][j].innerHTML = "<div class='checkbox active' pos='" + i + "|" + j + "'></div>";
			cells[i][j].firstChild.addEventListener("mousedown", down, true);
			cells[i][j].firstChild.addEventListener("mousemove", moveMouse, true);
			rows[i].appendChild(cells[i][j]);
		}
		tbody.appendChild(rows[i]);
	}
	document.addEventListener("mouseup", up, true);
	var i = 0;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='1x1' />&nbsp;<input type='button' value='2x1' />&nbsp;<input type='button' value='1x2' />&nbsp;<input type='button' value='2x2' />&nbsp;<input type='button' value='invert selection' style='width: 150px;' />";
	cells[i][17].childNodes[0].onclick = function () { clickEvery(1, 1); };
	cells[i][17].childNodes[2].onclick = function () { clickEvery(2, 1); };
	cells[i][17].childNodes[4].onclick = function () { clickEvery(1, 2); };
	cells[i][17].childNodes[6].onclick = function () { clickEvery(2, 2); };
	cells[i][17].childNodes[8].onclick = function () { invertSelection(); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='select empty' style='width: 130px;' />&nbsp;<input type='button' value='select growing' style='width: 140px;' />&nbsp;<input type='button' value='select ready' style='width: 120px;' />";
	cells[i][17].childNodes[0].onclick = function () { activateFields([0]); };
	cells[i][17].childNodes[2].onclick = function () { activateFields([1, 2, 3]); };
	cells[i][17].childNodes[4].onclick = function () { activateFields([4]); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='hide grid' style='width: 100px;' />";
	cells[i][17].firstChild.onclick = function (i) { return function () {hideGrid(i); } } (i);
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='<' style='width: 25px;' /><input type='button' value='^' style='width: 25px;' /><input type='button' value='v' style='width: 25px;' /><input type='button' value='>' style='width: 25px;' />";
	cells[i][17].childNodes[0].onclick = function () { move(-1, 0); };
	cells[i][17].childNodes[1].onclick = function () { move(0, -1); };
	cells[i][17].childNodes[2].onclick = function () { move(0, 1); };
	cells[i][17].childNodes[3].onclick = function () { move(1, 0); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	var innerHTML = "<input type='button' value='seed' style='width: 50px;' /><select id='seedselector'>";
	for (j in unsafeWindow.data_products) {
		innerHTML += "<option>" + unsafeWindow.data_products[j].name + "</option>";
	}
	innerHTML += "</select>";
	cells[i][17].innerHTML = innerHTML;
	cells[i][17].childNodes[0].onclick = function () { seed(); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='pour' style='width: 50px;' />";
	cells[i][17].firstChild.onclick = function () { pour(); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='harvest' style='width: 80px;' />";
	cells[i][17].firstChild.onclick = function () { collect(); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<input type='button' value='garden:' style='width: 80px;' /><select><option value='1'>1</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='water'>water</option></select>";
	cells[i][17].lastChild.onchange = function (e) { /*console.log(e.target.childNodes[e.target.selectedIndex].value);*/ garden = e.target.childNodes[e.target.selectedIndex].value; if (garden == "water") { unsafeWindow.watergarden.open(); } else { unsafeWindow.waehleGarten(e.target.childNodes[e.target.selectedIndex].value); } showTable(); updateGardenStatus(); };
	rows[i].appendChild(cells[i][17]);
	i++;
	cells[i][17] = document.createElement("td");
	cells[i][17].innerHTML = "<span><input type='radio' name='select' id='select-line' value='line' checked='checked' />select track</span><br /><span><input type='radio' name='select' id='select-square' value='square' />select squares</span>";
	cells[i][17].childNodes[0].firstChild.onchange = function (e) { selectSquares = e.target.value == "square"; };
	cells[i][17].childNodes[2].firstChild.onchange = function (e) { selectSquares = e.target.value == "square"; };
	rows[i].appendChild(cells[i][17]);
	i++;
	table.appendChild(tbody);
	style = document.createElement("style");
	style.type = "text/css";
	style.id = "mystyle";
	showTable();
	document.getElementsByTagName("body")[0].appendChild(style);
	document.getElementById("banner_right").innerHTML = "";
}

//puts the grid into the page.
function showTable() {
	document.getElementById("gamearea").appendChild(table);
	updateGardenStatus();
}

//activate every box with the given status(es).
function activateFields(status) {
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			if (status.indexOf(plants[i * 17 + j + 1][5]) > -1) {
				cells[i][j].firstChild.className = "checkbox active";
			} else {
				cells[i][j].firstChild.className = "checkbox";
			}
		}
	}
}

//inverts the selection. activates deactivated and deactivates activated boxes.
function invertSelection() {
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			cells[i][j].firstChild.className = (cells[i][j].firstChild.className == "checkbox" ? "checkbox active" : "checkbox");
		}
	}
}

//activate every (x, y)th box
function clickEvery(x, y) {
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			cells[i][j].firstChild.className = "checkbox";
		}
	}
	for (var i = 0; i < (12 - 12 % y); i += y) {
		for (var j = 0; j < (17 - 17 % x); j += x) {
			cells[i][j].firstChild.className = "checkbox active";
		}
	}
}

//returns th number of the element in the parent-element.
function parentIndex(element) {
	var i = 0;
	while ((element = element.previousSibling) != null) {
		i++;
	}
	return i;
}

//enables/disables a field.
function check(e) {
	e.target.className = (e.target.className.length > 10 ? "checkbox" : "checkbox active");
	//console.log("check");
}

//happens when the mouse is down.
function down(e) {
	mouseDown = true;
	alreadyChanged = new Array();
	check(e);
	alreadyChanged[0] = e.target;
	//console.log("down");
}

//happens when the mouse is moved.
function moveMouse(e) {
	if (mouseDown) {
		if (selectSquares) {
			var oldPos = new Array();
			oldPos[0] = parentIndex(alreadyChanged[0].parentNode.parentNode);
			oldPos[1] = parentIndex(alreadyChanged[0].parentNode);
			var newPos = new Array();
			newPos[0] = parentIndex(e.target.parentNode.parentNode);
			newPos[1] = parentIndex(e.target.parentNode);
			//console.log("old: " + oldPos[0] + " | " + oldPos[1]);
			//console.log("new: " + newPos[0] + " | " + newPos[1]);
			for (var i = Math.min(oldPos[0], newPos[0]); i <= Math.max(oldPos[0], newPos[0]); i++) {
				for (var j = Math.min(oldPos[1], newPos[1]); j <= Math.max(oldPos[1], newPos[1]); j++) {
					cells[i][j].firstChild.className = cells[oldPos[0]][oldPos[1]].firstChild.className;
				}
			}
		} else if (alreadyChanged.indexOf(e.target) < 0) {
			check(e);
			alreadyChanged.push(e.target);
		}
	}
	//console.log("move");
}

//happens when the mouse is up.
function up(e) {
	if (mouseDown) {
		mouseDown = false;
		if (selectSquares) {
			var oldPos = new Array();
			oldPos[0] = parentIndex(alreadyChanged[0].parentNode.parentNode);
			oldPos[1] = parentIndex(alreadyChanged[0].parentNode);
			var newPos = new Array();
			newPos[0] = parentIndex(e.target.parentNode.parentNode);
			newPos[1] = parentIndex(e.target.parentNode);
			for (var i = Math.min(oldPos[0], newPos[0]); i <= Math.max(oldPos[0], newPos[0]); i++) {
				for (var j = Math.min(oldPos[1], newPos[1]); j <= Math.max(oldPos[1], newPos[1]); j++) {
					cells[i][j].className = cells[oldPos[0]][oldPos[1]].className;
				}
			}
		} else if (alreadyChanged.indexOf(e.target) < 0) {
			check(e);
			alreadyChanged.push(e.target);
		}
	}
	mouseDown = false;
	//console.log("up");
}

//moves all ticks in the grid in one direction.
function move(x, y) {
	var a = new Array();
	for (var i = 0; i < 12; i++) {
		a[i] = new Array();
		for (var j = 0; j < 17; j++) {
			a[i][j] = cells[i][j].firstChild.className;
		}
	}
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			if (i - y >= 0 && j - x >= 0 && i - y < 12 && j - x < 17) {
				cells[i][j].firstChild.className = a[i - y][j - x];
			} else {
				cells[i][j].firstChild.className = "checkbox";
			}
		}
	}
	
}

//updates the stylesheet to fit to the needs of the user.
function updateCSS() {
	var innerHTML = "";
	innerHTML += "table.grid {\n";
	innerHTML += "	position: absolute;\n";
	innerHTML += "	top: " + tableOffset + "px;\n";
	innerHTML += "	left: 260px;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid, table.grid * {\n";
	innerHTML += "	z-index: " + (tableHidden ? "-" : "") + "9999;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid, table.grid * {\n";
	innerHTML += "	border-style: none;\n";
	innerHTML += "	border-width: 0;\n";
	innerHTML += "	padding: 0;\n";
	innerHTML += "	margin: 0;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td {\n";
	innerHTML += "	height: 38px;\n";
	innerHTML += "	width: 38px ! important;\n";
	innerHTML += "	font-size: 9px;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td:last-child {\n";
	innerHTML += "	width: 500px;\n";
	innerHTML += "	white-space: nowrap;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td div.checkbox {\n";
	innerHTML += "	height: 38px;\n";
	innerHTML += "	width: 38px;\n";
	innerHTML += "	background-color: #FF0000;\n";
	innerHTML += "	opacity: 0.2;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td div.checkbox.active {\n";
	innerHTML += "	background-color: #00FF00;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td input[type=button] {\n";
	innerHTML += "	height: 25px;\n";
	innerHTML += "	width: 45px;\n";
	innerHTML += "	font-size: 18px;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td input[type=button]:first-child, table.grid td input[type=radio]:first-child {\n";
	innerHTML += "	margin-left: 40px;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td select {\n";
	innerHTML += "	margin: 0px 0px 0px 5px;\n";
	innerHTML += "	color: #000000;\n";
	innerHTML += "	font-size: 20px;\n";
	innerHTML += "	height: 25px;\n";
	innerHTML += "	vertical-align: top;\n";
	innerHTML += "}\n";
	innerHTML += "table.grid td select * {\n";
	innerHTML += "	color: #000000;\n";
	innerHTML += "	font-size: 20px;\n";
	innerHTML += "	height: 25px;\n";
	innerHTML += "}\n";
	style.innerHTML = innerHTML;
}

//change the stylesheet, so that the table is behind the garden.
function showGrid(nr) {
	tableHidden = false;
	updateCSS();
	cells[nr][17].innerHTML = "<input type='button' value='hide grid' style='width: 100px;' />";
	cells[nr][17].firstChild.onclick = function (nr) { return function () { hideGrid(nr); } } (nr);
}

//change the stylecheet, so that the table is behind the garden.
function hideGrid(nr) {
	tableHidden = true;
	updateCSS();
	cells[nr][17].innerHTML = "<input type='button' value='show grid' style='width: 100px;' />";
	cells[nr][17].firstChild.onclick = function (nr) { return function () { showGrid(nr); } } (nr);
}

//seeds the selected plants to the selected places
function seed() {
	var a = new Array();
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			if (cells[i][j].firstChild.className.length > 10) {
				a.push(i * 17 + j + 1);
			}
			if (a.length > 4) {
				plantSome(a);
				a = new Array();
			}
		}
	}
	if (a.length > 0) {
		plantSome(a);
	}
	if (garden == "water") {
		unsafeWindow.watergarden.open();
	} else {
		unsafeWindow.waehleGarten(garden);
	}
	showTable();
}

//pours the plants at the selected places
function pour() {
	var a = new Array();
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			if (cells[i][j].firstChild.className.length > 10) {
				a.push(i * 17 + j + 1);
			}
			if (a.length > 4) {
				pourSome(a);
				a = new Array();
			}
		}
	}
	if (a.length > 0) {
		pourSome(a);
	}
	if (garden == "water") {
		unsafeWindow.watergarden.open();
	} else {
		unsafeWindow.waehleGarten(garden);
	}
	showTable();
}

//collects the plants at the selected places
function collect() {
	var a = new Array();
	for (var i = 0; i < 12; i++) {
		for (var j = 0; j < 17; j++) {
			if (cells[i][j].firstChild.className.length > 10) {
				a.push(i * 17 + j + 1);
			}
			if (a.length > 4) {
				collectSome(a);
				a = new Array();
			}
		}
	}
	if (a.length > 0) {
		collectSome(a);
	}
	if (garden == "water") {
		unsafeWindow.watergarden.open();
	} else {
		unsafeWindow.waehleGarten(garden);
	}
	showTable();
}

//send the plant request to the server.
function plantSome(positions) {
	if (garden == "water") {
		plantSomeWater(positions);
	} else {
		plantSomeNormal(positions);
	}
}

//send the plant request to the server.
function plantSomeNormal(positions) {
	var url = "http:\/\/" + server + "\/save\/pflanz.php?";
	for (var i = 0; i < positions.length; i++) {
		if (plants[positions[i]][5] == 0) {
			switch (unsafeWindow.data_products[document.getElementById("seedselector").selectedIndex].sx + "x" + unsafeWindow.data_products[document.getElementById("seedselector").selectedIndex].sy) {
				case "1x1":
					url += "pflanze[]=" + document.getElementById("seedselector").selectedIndex + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "&";
					break;
				case "2x1":
					url += "pflanze[]=" + document.getElementById("seedselector").selectedIndex + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "&";
					break;
				case "1x2":
					url += "pflanze[]=" + document.getElementById("seedselector").selectedIndex + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 17) + "&";
					break;
				case "2x2":
					url += "pflanze[]=" + document.getElementById("seedselector").selectedIndex + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "," + (positions[i] + 17) + "," + (positions[i] + 18) + "&";
					break;
				default:
					//console.log(unsafeWindow.data_products[document.getElementById("seedselector").selectedIndex]);
					break;
			}
		}
	}
	if (url.length < 50) {
		return;
	}
	url += "cid=" + token + "&garden=" + garden;
	ajaxRequest(url, "GET", "");
}

//send the plant request to the server.
function plantSomeWater(positions) {
	var url = "http:\/\/" + server + "\/save\/ajax.php?do=watergardenCache&";
	for (var i = 0; i < positions.length; i++) {
		if (plants[positions[i]][5] == 0) {
			url += "plant[" + positions[i] + "]=" + document.getElementById("seedselector").selectedIndex + "&";
		}
	}
	if (url.length < 50) {
		return;
	}
	url += "cid=" + token + "&garden=" + garden;
	ajaxRequest(url, "GET", "");
}

//send the pour request to the server.
function pourSome(positions) {
	var url = "http:\/\/" + server + "\/save\/wasser.php?";
	for (var i = 0; i < positions.length; i++) {
		if (positions.indexOf(positions[i]) == i && plants[positions[i]][1] == 1 && plants[positions[i]][2] == 1 && ((plants[positions[i]][5] > 0 && plants[positions[i]][5] < 4) || plants[positions[i]][3] > 1)) {
			switch (plants[positions[i]][9]) {
				case "1x1":
					url += "feld[]=" + positions[i] + "&felder[]=" + positions[i] + "&";
					break;
				case "2x1":
					url += "feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "&";
					break;
				case "1x2":
					url += "feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "&";
					break;
				case "2x2":
					url += "feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "," + (positions[i] + 17) + "," + (positions[i] + 18) + "&";
					break;
			}
		} else if (plants[positions[i]][5] > 0 && plants[positions[i]][5] < 4) {
			positions[i] -= (plants[positions[i]][1] - 1) + (plants[positions[i]][2] - 1) * 17;
			if (positions.indexOf(positions[i]) == i) {
				i--;
			}
		}
	}
	if (url.length < 50) {
		return;
	}
	url += "cid=" + token + "&garden=" + garden;
	ajaxRequest(url, "GET", "");
}

//send the collect request to the server.
function collectSome(positions) {
	if (garden == "water") {
		collectSomeWater(positions);
	} else {
		collectSomeNormal(positions);
	}
}

//send the collect request to the server. Only for normal gardens.
function collectSomeNormal(positions) {
	plant = getGardenStatus();
	var url = "http:\/\/" + server + "\/save\/ernte.php?";
	for (var i = 0; i < positions.length; i++) {
		//console.log(positions[i] + ":" + plants[positions[i]]);
		if (positions.indexOf(positions[i]) == i && plants[positions[i]][1] == 1 && plants[positions[i]][2] == 1 && plants[positions[i]][5] == 4) {
			switch (plants[positions[i]][9]) {
				case "1x1":
					url += "pflanze[]=" + plant[positions[i]][0] + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "&";
					break;
				case "2x1":
					url += "pflanze[]=" + plant[positions[i]][0] + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "&";
					break;
				case "1x2":
					url += "pflanze[]=" + plant[positions[i]][0] + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 17) + "&";
					break;
				case "2x2":
					url += "pflanze[]=" + plant[positions[i]][0] + "&feld[]=" + positions[i] + "&felder[]=" + positions[i] + "," + (positions[i] + 1) + "," + (positions[i] + 17) + "," + (positions[i] + 18) + "&";
					break;
			}
		} else if (plants[positions[i]][5] == 4) {
			positions[i] -= (plants[positions[i]][1] - 1) + (plants[positions[i]][2] - 1) * 17;
			if (positions.indexOf(positions[i]) == i) {
				i--;
			}
		}
	}
	if (url.length < 50) {
		return;
	}
	url += "cid=" + token + "&garden=" + garden;
	ajaxRequest(url, "GET", "");
}

//send the collect request to the server. Only for watergarden.
function collectSomeWater(positions) {
	plant = getGardenStatus();
	var url = "http:\/\/" + server + "\/save\/ajax.php?do=watergardenCache&";
	for (var i = 0; i < positions.length; i++) {
		//console.log(positions[i] + ":" + plants[positions[i]]);
		if (positions.indexOf(positions[i]) == i && plants[positions[i]][1] == 1 && plants[positions[i]][2] == 1 && plants[positions[i]][5] == 4) {
			switch (plants[positions[i]][9]) {
				case "1x1":
					url += "harvest[]=" + positions[i] + "&";
					break;
				case "2x1":
					url += "harvest[]=" + positions[i] + "&harvest[]=" + (positions[i] + 1) + "&";
					break;
				case "1x2":
					url += "harvest[]=" + positions[i] + "&harvest[]=" + (positions[i] + 17) + "&";
					break;
				case "2x2":
					url += "harvest[]=" + positions[i] + "&harvest[]=" + (positions[i] + 1) + "&harvest[]=" + (positions[i] + 17) + "&harvest[]=" + (positions[i] + 18) + "&";
					break;
			}
		} else if (plants[positions[i]][5] == 4) {
			positions[i] -= (plants[positions[i]][1] - 1) + (plants[positions[i]][2] - 1) * 17;
			if (positions.indexOf(positions[i]) == i) {
				i--;
			}
		}
	}
	if (url.length < 65) {
		return;
	}
	url += "cid=" + token + "&garden=" + garden;
	ajaxRequest(url, "GET", "");
}

//Converts a date to a string.
function dateToStr(date) {
	date = new Date(date);
	text = "";
	difference = date.getTime() - new Date().getTime();
	if (difference == 0) {
		text += "now";
	} else if (difference < 10000) {
		text += "in less than 10 seconds.";
	} else if (difference < 60000) {
		text += "in less than 1 minute.";
	} else {
		if (difference > 24 * 60 * 60 * 1000) {
			text += "in " + Math.floor((date.getTime() - new Date().getTime()) * 0.000000011574074074074074074074074074074) + " days ";
		}
		text += "at " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}
	return text;
}

//updates the global variable "plants", which carries the status of the garden.
function updateGardenStatus() {
	plants = getGardenStatus();
	for (i in  plants) {
		if (cells[Math.floor((i - 1) / 17)] && cells[Math.floor((i - 1) / 17)][(i - 1) % 17]) {
			//console.log(plants[i]);
			ready = new Date().getTime() + plants[i][10];
			pourNext = new Date().getTime() + plants[i][11];
			cells[Math.floor((i - 1) / 17)][(i - 1) % 17].title = "Grown " + dateToStr(ready) + ", pour next time [will be implemented later].";// + dateToStr(pourNext);
		}
	}
	if (garden == "water") {
		tableOffset = 8;
		updateCSS();
	} else {
		tableOffset = 20;
		updateCSS();
	}
}

//get the status of the garden.
function getGardenStatus() {
	if (garden == "water") {
		var url = "http:\/\/" + server + "\/ajax\/ajax.php?do=watergardenGetGarden&token=" + token;
	} else {
		var url = "http:\/\/" + server + "\/ajax\/ajax.php?do=changeGarden&garden=" + garden + "&token=" + token;
	}
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send();
	if (request.status != 200) {
		return false;
	}
	var garden2 = JSON.parse(request.responseText);
	if (garden2.status != "ok") {
		return false;
	}
	var garten = new Array();
	for (i in garden2.garden) {
		garten[i] = garden2.garden[i];
	}
	garden = (garden2.gardenNo == 101 ? "water" : garden2.gardenNo);
	//console.log(garten);
	return garten;
}

/*
 * 
 * {
	 * "status":"ok",
	 * "grow":[],
	 * "garden":{
		 * "1":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "2":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "3":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "4":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "5":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "6":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "7":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "8":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "9":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "10":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "11":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "12":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "13":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "14":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "15":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "16":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "17":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "18":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "19":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "20":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "21":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "22":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "23":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "24":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "25":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "26":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "27":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "28":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "29":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "30":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "31":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "32":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "33":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "34":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "35":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "36":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "37":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "38":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "39":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "40":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "41":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "42":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "43":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "44":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "45":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "46":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "47":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "48":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "49":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "50":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "51":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "52":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "53":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "54":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "55":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "56":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "57":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "58":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "59":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "60":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "61":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "62":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "63":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "64":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "65":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "66":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "67":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "68":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "69":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "70":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "71":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "72":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "73":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "74":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "75":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "76":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "77":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "78":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "79":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "80":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "81":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "82":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "83":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "84":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "85":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "86":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "87":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "88":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "89":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "90":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "91":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "92":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "93":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "94":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "95":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "96":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "97":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "98":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "99":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "100":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "101":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "102":[6,1,1,1370187306,1370186764,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "103":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "104":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "105":[20,1,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "106":[20,2,1,1370305881,1370162332,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "107":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "108":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "109":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "110":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "111":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "112":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "113":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "114":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "115":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "116":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "117":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "118":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "119":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "120":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "121":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "122":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "123":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "124":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "125":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "126":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "127":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "128":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "129":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "130":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "131":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "132":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "133":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "134":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "135":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "136":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "137":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "138":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "139":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "140":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "141":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "142":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "143":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "144":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "145":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "146":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "147":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "148":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "149":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "150":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "151":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "152":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "153":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "154":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "155":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "156":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "157":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "158":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "159":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "160":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "161":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "162":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "163":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "164":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "165":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "166":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "167":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "168":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "169":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "170":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "171":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "172":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "173":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "174":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "175":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "176":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "177":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "178":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "179":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "180":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "181":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "182":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "183":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "184":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "185":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "186":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "187":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0],
		 * "188":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "189":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "190":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "191":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "192":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "193":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "194":[20,1,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "195":[20,2,1,1370305881,1370162333,4,0,1,"gif","2x1",1370162237,202280,0],
		 * "196":[20,1,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "197":[20,2,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "198":[20,1,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "199":[20,2,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "200":[20,1,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "201":[20,2,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "202":[20,1,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "203":[20,2,1,1370305882,1370162333,4,0,1,"gif","2x1",1370162238,202279,0],
		 * "204":[6,1,1,1370187306,1370186765,4,0,1,"gif","1x1",1370186735,177782,0]
	 * },
	 * "water":[[1,"1370162332"],[2,"1370162332"],[3,"1370162332"],[4,"1370162332"],[5,"1370162332"],[6,"1370162332"],[7,"1370162332"],[8,"1370162332"],[9,"1370162332"],[10,"1370162332"],[11,"1370162332"],[12,"1370162332"],[13,"1370162332"],[14,"1370162332"],[15,"1370162332"],[16,"1370162332"],[17,"1370186764"],[18,"1370162332"],[19,"1370162332"],[20,"1370186764"],[21,"1370186764"],[22,"1370162332"],[23,"1370162332"],[24,"1370162332"],[25,"1370162332"],[26,"1370162332"],[27,"1370162332"],[28,"1370162332"],[29,"1370162332"],[30,"1370162332"],[31,"1370162332"],[32,"1370162332"],[33,"1370162332"],[34,"1370186764"],[35,"1370162332"],[36,"1370162332"],[37,"1370186764"],[38,"1370186764"],[39,"1370162332"],[40,"1370162332"],[41,"1370162332"],[42,"1370162332"],[43,"1370162332"],[44,"1370162332"],[45,"1370162332"],[46,"1370162332"],[47,"1370162332"],[48,"1370162332"],[49,"1370162332"],[50,"1370162332"],[51,"1370186764"],[52,"1370162332"],[53,"1370162332"],[54,"1370162332"],[55,"1370162332"],[56,"1370162332"],[57,"1370162332"],[58,"1370162332"],[59,"1370162332"],[60,"1370162332"],[61,"1370162332"],[62,"1370162332"],[63,"1370162332"],[64,"1370162332"],[65,"1370162332"],[66,"1370162332"],[67,"1370162332"],[68,"1370186764"],[69,"1370162332"],[70,"1370162332"],[71,"1370162332"],[72,"1370162332"],[73,"1370162332"],[74,"1370162332"],[75,"1370162332"],[76,"1370162332"],[77,"1370162332"],[78,"1370162332"],[79,"1370162332"],[80,"1370162332"],[81,"1370162332"],[82,"1370162332"],[83,"1370162332"],[84,"1370162332"],[85,"1370186764"],[86,"1370162332"],[87,"1370162332"],[88,"1370162332"],[89,"1370162332"],[90,"1370162332"],[91,"1370162332"],[92,"1370162332"],[93,"1370162332"],[94,"1370162332"],[95,"1370162332"],[96,"1370162332"],[97,"1370162332"],[98,"1370162332"],[99,"1370162332"],[100,"1370162332"],[101,"1370162332"],[102,"1370186764"],[103,"1370162332"],[104,"1370162332"],[105,"1370162332"],[106,"1370162332"],[107,"1370162333"],[108,"1370162333"],[109,"1370162333"],[110,"1370162333"],[111,"1370162333"],[112,"1370162333"],[113,"1370162333"],[114,"1370162333"],[115,"1370162333"],[116,"1370162333"],[117,"1370162333"],[118,"1370162333"],[119,"1370186765"],[120,"1370162333"],[121,"1370162333"],[122,"1370162333"],[123,"1370162333"],[124,"1370162333"],[125,"1370162333"],[126,"1370162333"],[127,"1370162333"],[128,"1370162333"],[129,"1370162333"],[130,"1370162333"],[131,"1370162333"],[132,"1370162333"],[133,"1370162333"],[134,"1370162333"],[135,"1370162333"],[136,"1370186765"],[137,"1370162333"],[138,"1370162333"],[139,"1370162333"],[140,"1370162333"],[141,"1370162333"],[142,"1370162333"],[143,"1370162333"],[144,"1370162333"],[145,"1370162333"],[146,"1370162333"],[147,"1370162333"],[148,"1370162333"],[149,"1370162333"],[150,"1370162333"],[151,"1370162333"],[152,"1370162333"],[153,"1370186765"],[154,"1370162333"],[155,"1370162333"],[156,"1370162333"],[157,"1370162333"],[158,"1370162333"],[159,"1370162333"],[160,"1370162333"],[161,"1370162333"],[162,"1370162333"],[163,"1370162333"],[164,"1370162333"],[165,"1370162333"],[166,"1370162333"],[167,"1370162333"],[168,"1370162333"],[169,"1370162333"],[170,"1370186765"],[171,"1370162333"],[172,"1370162333"],[173,"1370162333"],[174,"1370162333"],[175,"1370162333"],[176,"1370162333"],[177,"1370162333"],[178,"1370162333"],[179,"1370162333"],[180,"1370162333"],[181,"1370162333"],[182,"1370162333"],[183,"1370162333"],[184,"1370162333"],[185,"1370162333"],[186,"1370162333"],[187,"1370186765"],[188,"1370162333"],[189,"1370162333"],[190,"1370162333"],[191,"1370162333"],[192,"1370162333"],[193,"1370162333"],[194,"1370162333"],[195,"1370162333"],[196,"1370162333"],[197,"1370162333"],[198,"1370162333"],[199,"1370162333"],[200,"1370162333"],[201,"1370162333"],[202,"1370162333"],[203,"1370162333"],[204,"1370186765"]],
		 * "deko":0,"gardenNo":1}
 * 
 * */

function ajaxRequest(page, type, onload, arguments = "") {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () { if (request.readyState == 4 && request.status == 200) { eval(onload); } };
	request.open(type, page, true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.send(arguments);
}

/*

var a = document.getElementsByTagName("tbody")[0];
var text = "";
for (var i = 0; i < a.childNodes.length; i++) {
    if (a.childNodes[i].innerHTML) {
        text += "plants[0][" + i + "] = " + (parseInt(a.childNodes[i].childNodes[4].innerHTML) < 4 ? parseInt(a.childNodes[i].childNodes[4].innerHTML) : parseInt(a.childNodes[i].childNodes[4].innerHTML) / 2) + ";\n";
        text += "plants[1][" + i + "] = " + (parseInt(a.childNodes[i].childNodes[4].innerHTML) < 4 ? 1 : 2) + ";\n";
        if (a.childNodes[i].childNodes[1].childNodes[3]) {
            text += "plants[2][" + i + "] = \"" + a.childNodes[i].childNodes[1].childNodes[3].innerHTML + "\";\n";
        }
    }
}
alert(text);

000 Coins
001 Kirsche
002 Salat
003 Erdbeere
004 Apfel
005 Tomate
006 Karotte
007 Aubergine
008 Brombeere
009 Zwiebel
010 Himbeere
011 Johannisbeere
012 Gurke
013 Pflaume
014 Radieschen
015 Paprika
016 Zucchini
017 Mirabelle
018 Kürbis
019 Walnuss
020 Spargel
021 Birne
022 Kartoffel
023 Brunnen 1
024 Brunnen 2
025 Dekosteine
026 Gehweg 1
027 Gehweg 2
028 Gehweg 3
029 Pavillon 1
030 Pavillon 2
031 Pavillon 3
032 Blumenkohl
033 Brokkoli
034 heidelbeere
035 knoblauch
036 Spinat
037 Sitzecke
038 Zengarten
039 Teich
040 Steinkreis
044 Gartenzwerge
046 Gehweg 4
047 Holzkugeln
048 Sonnenblume
049 Ringelblume
050 Rose
051 Lilie
052 Kornblume
053 Orchidee
054 Krokus
055 Olive
056 Feuerstelle
057 Vogelscheuche
058 Gerbera
059 Lavendel
060 Tulpe
061 Rotkohl
062 Sandkasten
063 Rutsche
064 Kaffee
067 Traube
068 Zitrone
070 Basilikum
066 Palme
069 Champignon
065 Kokosnuss
093 Schaukel
094 Parkbank
095 Halfpipe
096 Grillecke
099 Großer Adventskranz
100 Mistelzweig
101 Kleine Geschenke
102 Große Geschenke
103 Kleiner Adventskranz
104 Weihnachtsbaum
105 Feuerwerk
106 Kare-san-sui 1
107 Kare-san-sui 2
108 Kare-san-sui 3
109 Kare-san-sui 4
110 Osterhase
111 Elch im Liegestuhl
113 Schlitten

* ({
	* token:"8c8c0082c9266674258bdb23223d324a",
	* setToken:(function (newToken){
		* this.token=newToken
	* }),
	* request:(function (file,parameters,callback,method){
		* var m="get";
		* if(method){
			* m=method
		* }
		* if(typeof parameters=="object"){
			* if(typeof BETALANG!="undefined"){
				* parameters.betalang=BETALANG;
				* parameters.timezone=BETATIMEZONE
			* }
			* parameters.token=this.token
		* }else{
			* parameters+="&token="+this.token
		* }
		* new Ajax.Request(
			* _HTTPHOST+"ajax/"+file+".php",
			* {
				* method:m,
				* parameters:parameters,
				* onSuccess:function(transport){
					* var r=transport.responseJSON;
					* if(r.status=="ok"){
						* if(r.newToken){
							* this.setToken(r.newToken)
						* }
						* if(r.reload){
							* location.reload()
						* }
						* if(r.updateStock){
							* regal.reload()
						* }
						* if(r.decreaseStock){
							* for(var pid in r.decreaseStock){
								* regal.decrementCount(pid,r.decreaseStock[pid])
							* }
						* }
						* if(r.increaseStock){
							* for(var pid in r.increaseStock){
								* regal.incrementCount(pid,r.increaseStock[pid])
							* }
						* }
						* if(r.updateMenu){
							* updateMenu()
						* }
						* if(r.player){
							* this.updatePlayer(r.player)
						* }
						* if(r.message){
							* this.showMessage(r.message)
						* }
						* if(r.script){
							* this.evalScript(r.script)
						* }
						* callback(r)
					* }else{
						* this.error(r)
					* }
				* }.bind(this)
			* }
		* )
	* }),
	* error:(function (response){
		* if(response.message){
			* var message=response.message;if(response.errorcode==2&&_PAYMENTURL!=""){
				* message+='<div style="text-align: center; margin: 20px 0;">';
				* message+='<div class="scalebutton link" onclick="ajax.toPayment()" style="display:inline-block"><div class="left"></div><div class="inner">';
				* message+='<img src="'+_GFX+'pics/menu/coins.gif" style="margin-bottom:-4px; margin-right:5px" />'+t_main_buyCoins;
				* message+='</div><div class="right"></div></div></div>'
			* }this.showMessage(message)
		* }
	* }),
	* evalScript:(function (script){
		* eval(script)
	* }), showMessage:(function (message){
		* basedialog.show({
			* type:"info",headline:"",text:message
		* })
	* }),
	* updatePlayer:(function (p){
		* var money=null,coins=null,points=null,level=null,g_tag=null,deco=null,levelnr=null;
		* if(p.money){
			* money=formatMoney(parseFloat(p.money,10))
		* }
		* if(p.coins){
			* coins=parseInt(p.coins,10)
		* }
		* if(p.points){
			* points=parseInt(p.points,10)
		* }
		* if(p.deco){
			* deco=formatNumber(parseInt(p.deco,10))
		* }
		* if(p.levelnr){
			* levelnr=parseInt(p.levelnr,10)
		* }
		* if(p.level){
			* level=p.level
		* }
		* if(p.g_tag){
			* g_tag=p.g_tag
		* }
		* updatePlayerInfo(money,coins,points,level,g_tag,deco,levelnr)
	* }),
	* toPayment:(function (){
		* window.open(_PAYMENTURL)
	* })
* })

*/
