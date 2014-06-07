// ==UserScript==
// @name           BvS BillyMaze
// @namespace      rvMaze
// @description    BvS BillyMaze 1.06
// @include        http://*animecubed.com/billy/bvs/festival.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.0.6
// @history        1.0.6 (12/11/2010) Added debug displays.
// @history        1.0.5 (9/11/2010) Fixed walking out the maze.
// @history        1.0.5 (9/11/2010) Fixed 'localName' bug with older Firefox versions.
// @history        1.0.5 (9/11/2010) Added code to prevent breaking the script (hopefully).
// @history        1.0.4 (8/11/2010) Added Snakeman, TACO, Spot, and WhiteEye hints. Still trying to locate and fix the bug with old FF versions.
// @history        1.0.3 (7/14/2010) Will now help you exit the maze.
// ==/UserScript==

var SCRIPT_VERSION = "1.06";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSBillyMaze", "http://rveach.romhack.org/BvS/bvs_billymaze.user.js", SCRIPT_VERSION);
} catch(e) {};

var DIRECTIONS_TEXT = new Array("", "North", "South", "East", "West", "Ninja");

var mainText = null;
var username = null;

var wentWrongWay = false;
var runOutMaze = false;
var previousArea = 0;
var previousDirection = null;
var currentArea = 0;
var directionCame = "";
var previousDirectionCame = "";
var correctDirection = null;
var wrongDirections = new Array();
var directions = new Array();
var directionRadios = new Array();

var pageLoaded = false;
var pageError = true;

var GM_history = null;

GM_addStyle("div#bvsMaze {background-image: url('http://www.animecubed.com/billy/layout/scrollbg.jpg'); min-width: 240px; max-width: 480px; position: fixed; top: 8px; right: 8px; padding: 0; border: 1px solid black; visibility: visible;} #bvsMaze h1 {color: white; font-size: 16px; font-weight: bold; padding: 4px; margin: 0; background-image: url('http://www.animecubed.com/billy/layout/scrolldark.jpg');} img#closebutton {float: right; cursor: pointer; margin: 6px;} #bvsMaze div {font-size: 12px; font-family: arial; padding: 8px;} #bvsMaze a {font-weight: bold; color: #a10000;} #bvsMaze ul {margin: 0;} .high { font-weight: bold; color: #FFFF00; text-decoration: blink; } .mhigh { font-weight: bold; color: #00FF00; } .normal { font-weight: bold; } .mlow { font-weight: bold; color: #FF0000; } .low { font-weight: bold; color: #7F0000; text-decoration: line-through; } .special { font-weight: bold; border: 1px dotted white; background-color: #333; }");

window.addEventListener("load", load, false);

String.prototype.startsWith	= function(str) { return (this.match("^"+str) == str); }

function load(e) {
	try {
		var snap = document.evaluate("//td/b/i/text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap == null) || (snap.snapshotLength == 0))
			return;
		var temp = snap.snapshotItem(0);
		if (temp.nodeValue != "The BillyMaze!")
			return;

		mainText = temp.parentNode.parentNode.parentNode.textContent;

		snap = document.evaluate("//input[contains(@name, 'player')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap == null) || (snap.snapshotLength == 0))
			return;
		username = snap.snapshotItem(0).value;

		parsePage();

		var temp = GM_getValue("maze_" + username + "_history", "");

		if ((temp == null) || (temp == ""))
			GM_history = new Array();
		else
			GM_history = temp.split("|");

//alert("wrong way?: " + wentWrongWay);
//if (correctDirection != null)
//	alert("correct direction: " + correctDirection);
//alert("current area: " + currentArea);
//alert("direction came: " + directionCame);
//alert("directions: " + directions);

		if ((currentArea != 0) || (runOutMaze))
			applyGM();

		if (GM_history.length > 0)
			display();

		pageError = false;
	} catch (e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	pageLoaded = true;
}

function parsePage() {
	var match;

	//reset the GM data
	if (mainText.match("Enter the Maze! >")) {
		GM_setValue("maze_" + username + "_history", "");	//full maze history
		GM_setValue("maze_" + username + "_prev", "");		//previous area number
		GM_setValue("maze_" + username + "_dir", "");		//direction went in previous area
		return;
	}
	if (mainText.match("You need to Get It Together to move!")) {
		GM_setValue("maze_" + username + "_prev", "");
		GM_setValue("maze_" + username + "_dir", "");
	}

	if (mainText.match("You wander for a while, and don't see anywwhere new.."))
		wentWrongWay = true;
	else if (mainText.match("AAAA AAA AA AAAAAAA AAAA AAA AAA AA AAAA")) {
		wentWrongWay = true;
		runOutMaze = true;

		//don't know where you are in the maze anymore
		GM_setValue("maze_" + username + "_prev", "lost");
		alert("You are now lost in the maze and this script will no longer help you.");
	}

	if (match = mainText.match("The correct path is (\\w+).")) {
		correctDirection = match[1];
	}

	if (match = mainText.match("you enter Area (\\d+) from the (\\w+)..")) {
		currentArea = parseInt(match[1]);
		directionCame = match[2];
	} else if (mainText.match("Area 11")) {
		currentArea = 10;
	}

	if (mainText.match("AAAA AAA AAAA AAAA AAAAA.")) {
		runOutMaze = true;
	}

	if (mainText.match("TACOS hops up and down and STARES at you... O_O"))
		correctDirection = "East";
	if (match = mainText.match("Spot is sniffing at the (\\w+) exit.."))
		correctDirection = match[1];
	if (match = mainText.match("SNAKEMAN says 'GO (\\w+)'."))
		wrongDirections.push(getDirectionStr(match[1]));

	var radios = document.getElementsByName("mazemove");
	if (radios) {
		for (var i = 0; i < radios.length; i++) {
			if (radios[i].localName.toLowerCase() != "input") {
				attachEventToForm(radios[i], newFormSubmit);
			} else {
				directions.push(DIRECTIONS_TEXT[radios[i].value]);
				directionRadios.push(radios[i]);

				if (radios[i].parentNode.tagName.toLowerCase() == "strike")
					wrongDirections.push(DIRECTIONS_TEXT[radios[i].value]);
			}
		}
	}
}

function applyGM() {
	var doSaveArea = false;

	previousArea = GM_getValue("maze_" + username + "_prev", 0);
	previousDirection = GM_getValue("maze_" + username + "_dir", "");
	if (previousDirection == "")
		previousDirection = null;

	if (runOutMaze) {
		//TODO: fails to save area's 10 correct direction

		if (currentArea != 10) {
			currentArea = previousArea;

			if (currentArea == "lost")
				return;
			//wrongWay will never be set as if it is, then "lost" is also set

			//don't go to next area until the user goes through the last one
			if (previousDirection != null)
				currentArea--;
		}
	} else {
		//don't save if we skip areas, outside of going the wrong way
		if ((!wentWrongWay) && (previousArea+1 != currentArea)) {
			previousArea = 0;
			previousDirection = null;
		}

		if ((previousArea != 0) && (previousDirection != null)) {
			pos = findAreaHistory(previousArea);
			if (pos != -1) {
				area = GM_history[pos].split(",");

				if (wentWrongWay) {	//if went wrong way, mark it as wrong
					for (var i = 2; i < 7; i++) {
						if (area[i] == previousDirection) {
							area[i] = 'f' + previousDirection;
							doSaveArea = true;
							break;
						}
					}
				} else {		//if went right way, mark it as right
					if (previousArea != currentArea) {
						area[7] = previousDirection;
						doSaveArea = true;
					}
				}

				if (doSaveArea)
					saveArea(pos, area);
			}
		}
	}

	GM_setValue("maze_" + username + "_prev", currentArea);
	GM_setValue("maze_" + username + "_dir", "");

	pos = findAreaHistory(currentArea);
	if (pos != -1)
		area = GM_history[pos].split(",");
	else
		area = null;

	if (runOutMaze) {
		if (area) {
			correctDirection = area[1];
			wrongDirections = new Array();
		}
	} else {
		//new area
		if (!area) {
					// 0            1            2-6
			area = new Array(currentArea, directionCame, directions.join(","));
			area = area.join(",").split(",");

			doSaveArea = true;
		}

		if (correctDirection != null) {		//either save new correctDirection
			area[7] = correctDirection;
			doSaveArea = true;
		} else if (area[7] != null)		//or set correctDirection from save
			correctDirection = area[7];

		for (var i = 0; i < wrongDirections.length; i++) { //set areas as wrong way when bonuses tell us they are
			for (var j = 2; j < 7; j++) {
				if (wrongDirections[i] == area[j]) {
					area[j] = 'f' + area[j];
					doSaveArea = true;
					break;
				}
			}
		}
	}


	if (area) {	//set radios based on information stored
		for (var i = 2; i < 7; i++) {
			if (area[i].match(correctDirection))
				directionRadios[i - 2].checked = true;
			else if ((correctDirection != null) || (area[i].startsWith("f")))
				directionRadios[i - 2].style.visibility = "hidden";
		}
	}

	if (doSaveArea) {
		saveArea(pos, area);

		GM_setValue("maze_" + username + "_history", GM_history.join("|"));
	}
}

function display() {
	var header = document.createElement("h1");
	header.innerHTML = "BvS Billy Maze";

	divResponse = document.createElement("div");

	var text;
	var t;
	var fail;

	text = "<table border='0'><tr><td>Area</td><td>Direction<br>Came</td><td>Directions</td><td>CorrectPath</td></tr>";
	for (var i = 0; i < GM_history.length; i++) {
		area = GM_history[i].split(",");

		text += ("<tr><td>" + area[0] + "</td><td>" + area[1] + "</td><td>");
		for (var j = 2; j < 7; j++) {
			t = area[j];

			if ((t == null) || (t == undefined))
				break;

			fail = t.startsWith("f");

			if (fail) {
				t = t.substr(1);
				text += "<font color='red'>";
			}

			if (t == "Ninja")
				text += "n";
			else
				text += t.substr(0, 1);

			if (fail)
				text += "</font>";
		}

		text += ("</td><td>" + (area[7] != null ? area[7] : "???") + "</td></tr>")
	}

	text += "</table><br>";

	if (currentArea == "lost")
		text += "You are currently lost in the maze.";
	else
		text += "You are in Area " + currentArea + ".";

	text += "<br>";
	text += "<a href='javascript:alert(\"";

	text += "Running out of the Maze: " + runOutMaze + "\\r\\n";
	text += "Current Area: " + currentArea + "\\r\\n";

	pos = findAreaHistory(currentArea);
	if (pos != -1)
		area = GM_history[pos];
	else
		area = null;
	text += "Current Areas Stored Information: " + area + "\\r\\n";

	text += "Previous Area: " + previousArea + "\\r\\n";
	text += "Previous Areas Direction Came: " + previousDirection + "\\r\\n";

	pos = findAreaHistory(previousArea);
	if (pos != -1)
		area = GM_history[pos];
	else
		area = null;
	text += "Previous Areas Stored Information: " + area + "\\r\\n";

	text += "Went Wrong way: " + wentWrongWay + "\\r\\n";
	text += "Correct Direction for this area: " + correctDirection + "\\r\\n";
	text += "Wrong Directions for this area: " + wrongDirections.join(",") + "\\r\\n";
	text += "Script Version: " + SCRIPT_VERSION + "\\r\\n";

	text += "\")'>Debug Information</a>";

	text += "<br><br>Version: " + SCRIPT_VERSION;

	divResponse.innerHTML = text;

	divContent = document.createElement("div");
	divContent.id = "bvsMaze";
	divContent.innerHTML = "<img id='closebutton' onclick=\"document.body.removeChild(document.getElementById('bvsMaze'))\" title='Close' src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00TPLTE%BA%0C%0C%BF%1D%1D%C1%26%26%C1((%C1))%C8%3D%3D%C8%3F%3F%CBHH%CDPP%D6nn%DC%83%83%DD%89%89%DE%89%89%E2%98%98%E4%A0%A0%EC%BA%BA%F1%CB%CB%F3%D7%D7%F4%D7%D7%F6%E1%E1%F7%E3%E3%FB%F0%F0%FB%F2%F2%FB%F3%F3%FC%F6%F6%FE%FB%FB%FE%FE%FE%FF%FF%FFD%88%E1%E1%00%00%00rIDAT%18%D3%5D%CFY%0E%80%20%10%03%D0%BA%E0%8E%8A%0A(%BD%FF%3D%8Da%08%EA%FC%F5%25M%3A%08%FC%5C%00%F19%3EP%A5T%09lK%CC%CB%26%80%F9%EC%80%EE%9CS%05%188%8E%1C%90%01%139%E1%05%E5N%EEe%86%C6q%5D%E9%9A%04%B5%E7%01%1C%F4%B5%80%E5%A5%00u%D1Fh%03%F5S%D7%0C%AD%80%89%C3%8C%00%FA%22B%D1%E7%1D%AF%E7%FE%EF%DF%8Eb%0A%CB%F1%17%10%11%00%00%00%00IEND%AEB%60%82' />";
	divContent.appendChild(header);
	divContent.appendChild(divResponse);

	document.body.appendChild(divContent);
}

function newFormSubmit(e) {
	if (!pageLoaded) {
		alert("The page has not finished loading! Please wait for it to finish.");
		return;
	} else if (pageError) {
		alert("Possible page error! Allowing the form submission to continue but not be processed by this script.");
	}

	var target = (e ? e.target : this);
	var form = null;

	if (target.tagName.toLowerCase() == 'input') {
		//form = target.form;
	} else {
		form = findParentType(target, 'form');
	}

	if ((form) && (!pageError)) {
		if ((e) && (e.preventDefault)) {
			e.preventDefault();
		}

		//get radio selection
		GM_setValue("maze_" + username + "_dir", "");

		for (var i = 0; i < directionRadios.length; i++) {
			if (directionRadios[i].checked) {
				GM_setValue("maze_" + username + "_dir", directions[i]);
				break;
			}
		}
	}

	if (form)
		form.submit();
}

function findAreaHistory(area) {
	for (var i = 0; i < GM_history.length; i++) {
		if (GM_history[i].startsWith(area + ","))
			return i;
	}

	return -1;
}

function saveArea(pos, info) {
	if (pos == -1) {	//save new area
		GM_history.push(info.join(","));
	} else {
		GM_history[pos] = info.join(",");
	}
}

function getDirectionStr(direction) {
	for (var i = 1; i < DIRECTIONS_TEXT.length; i++) {
		if (DIRECTIONS_TEXT[i].toLowerCase() == direction.toLowerCase())
			return DIRECTIONS_TEXT[i];
	}

	return null;
}

function getDirectionInt(direction) {
	for (var i = 1; i < DIRECTIONS_TEXT.length; i++) {
		if (DIRECTIONS_TEXT[i] == direction)
			return i;
	}

	return -1;
}

function getDirectionRadio(direction) {
	for (var i = 0; i < directions.length; i++) {
		if (directions[i] == direction) {
			return directionRadios[i];
		}
	}

	return null;
}

function attachEventToForm(element, eventfunction) {
	element.wrappedJSObject.submit = eventfunction;			//captures all wrappedJSObject.submit(), even GMs
	element.addEventListener('submit', eventfunction, true);	//doesn't seem to capture anything
	element.addEventListener('click',  eventfunction, true);	//captures link/form click

	//how to capture all elem.subtmit(), even GMs???????????

}

function findParentType(node, type) {
	var parent = node;
	type = type.toLowerCase();

	while (parent != null) {
		if (parent.tagName.toLowerCase() == type) break;

		parent = parent.parentNode;
	}

	return parent;
}
