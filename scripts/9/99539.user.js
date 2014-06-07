// ==UserScript==
// @name           BvS Infinite Quickteams
// @namespace      rvQuick
// @description    BvS Infinite Quickteams 1.3g
// @include        http://*animecubed.com/billy/bvs/team.html
// @require        http://rveach.romhack.org/BvS/gmupdater.user.js
// @version        1.3g
// @history        1.3g Fixed a rare bug.
// @history        1.3f Fixed a bug that I created from 1.3e.
// @history        1.3e Fixed some of turn the page jutsu.
// @history        1.3d Fixed bug where you couldn't drag n' drop newly created teams until you refreshed the page.
// @history        1.3c Bug Fix
// @history        1.3b Added Drag n' Drop support to the table
// @history        1.3a Fixed up Export display.
// @history        1.3  Added Export/Import functionality
// @history        1.2e Fixed "None" quickteam to bypass confirm screen
// @history        1.2d Temporary fix for FF4 bug.
// @history        1.2c Improved cross browser support.
// @history        1.2b Bug fixes. Hide Team MisAlignment dialog on team rename.
// @history        1.2a Confirmed support for Chrome, but Escape doesn't work.
// @history        1.2  Fixed more scrolling issues and added script support for other browsers besides FF.
// @history        1.1c Fixed scrolling issues when renaming a QT.
// @history        1.1b Fixed move QT down exception when there was only 1 QT.
// @history        1.1a Fixed up final bug.
// @history        1.1  Fixed a bug where you couldn't work with a QT that you didn't have one of the allies for.
// @history        1.0  Start
// ==/UserScript==

const VERSION = "1.3g";
const GMSTORAGE_PATH = "BvS_Quickteams_";

try {
	ScriptUpdater.setInterval(259200000); // 3 days
	ScriptUpdater.check("BvSInfiniteQuickteams", "http://rveach.romhack.org/BvS/bvs_infinite_quickteams.user.js", VERSION);
} catch(e) {};

var playerData;
var playerName;

var allies;
var startPoint;
var currentTeam;
var quickteam;
var testDiv;
var turnThePage;

function load(ev) {
	try {
		var temp = document.getElementByName("player");
		if ((temp == null) || (temp.localName.toLowerCase() == "text") || (temp.value.length == 0))
			return;
		playerName = temp.value;

		getGM();
		parsePage();
		applyGM();
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function getGM() {
	var value = GM_getValue(playerName, "{}");

	if ((value == undefined) || (value == null) || (value == ""))
		value = "{}";
	
	playerData = JSON.parse(value);
}

function saveGM() {
	GM_setValue(playerName, JSON.stringify(playerData));
}

function parsePage() {
	turnThePage = document.getElementsByName("turnthepage");
	if ((turnThePage) && (turnThePage.length == 0))
		turnThePage = null;

	if (document.getElementByName("conteam") == null) {
		allies = new Array();

		snap = document.evaluate("//div/table/tbody/tr/td/label/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			var i;
			for (i = 0; temp = snap.snapshotItem(i); i++) {
				allies.push(new Array(document.getElementByName("teammate" + i).value, Allies.getAllyName(temp.src)));
			}
		}
		
		startPoint = document.getElementsByName("quickteam");
		if ((startPoint != null) && (startPoint.length == 0))
			startPoint = null;
		
		currentTeam = new Array();

		snap = document.evaluate("//center/center/table/tbody/tr/td/img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if ((snap != null) && (snap.snapshotLength > 0)) {
			var i;
			for (i = 0; temp = snap.snapshotItem(i); i++) {
				currentTeam.push(Allies.getAllyName(temp.src));
			}
		}
	}
}

function applyGM() {
	if ((allies != null) && (startPoint == null)) {
		startPoint = document.getElementByName("qteam");
		if (startPoint == null)
			return;
		
		startPoint = startPoint.children[0];

		var element = document.createElement('DIV');
		var text = "<table><tbody><tr><td style=\"font-family: arial; border: 1px dotted black; padding: 3px;\">";
		text += "<b>QuickTeams</b>: <font style=\"font-size: 12px;\">(Select team, and hit \"Use Quickteam\" - bypasses confirmation screen)</font><br>";
		text += "<input type=\"radio\" id=\"noneqt\" checked=\"\" value=\"\" name=\"quickteam\"> <label for=\"noneqt\">None</label><br>";
		text += "<a style=\"color: rgb(161, 0, 0);\" onfocus=\"this.blur();\" href=\"javascript:document.qteam.submit();\"><b>Use Quickteam &gt;</b></a>";
		text += "<noscript><input type=\"submit\" VALUE=\"Use Quickteam\"></noscript>";
		text += "<font style=\"font-size: 10px;\"><br>(Teams in <font color=\"#cc0000\">red</font> have allies that are different Levels than listed, so may have different effects)</font>";
		text += "</td></tr></tbody></table>";
		text += "<br>";

		element.innerHTML = text;
		startPoint.parentNode.insertBefore(element, startPoint.children[startPoint.children - 1]);

		startPoint = document.getElementsByName("quickteam");
		if ((startPoint != null) && (startPoint.length == 0))
			startPoint = null;
	}
	if (startPoint == null)
		return;
	if (turnThePage) {
		var temp = turnThePage[0];

		// remove <br>
		temp.parentNode.removeChild(temp.nextSibling.nextSibling.nextSibling);

		// move 'use quickteam over some'
		var extra = document.createElement('SPAN');
		extra.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		temp.parentNode.insertBefore(extra, temp.nextSibling.nextSibling.nextSibling);
	}

	GM_addStyle("div#rvDialog {word-wrap: break-word; overflow: auto; background-image: url('http://www.animecubed.com/billy/layout/scrollbg.jpg'); min-width: 240px; min-height: 100px; z-index: 9002; padding: 0; border: 1px solid black;} #rvDialog h1 {color: white; font-size: 16px; font-weight: bold; padding: 4px; margin: 0; background-image: url('http://www.animecubed.com/billy/layout/scrolldark.jpg');} img#closebutton {float: right; cursor: pointer; margin: 6px;} #rvDialog div {font-size: 12px; font-family: arial; padding: 8px;} #rvDialog a {font-weight: bold; color: #a10000;} #rvDialog ul {margin: 0;} .high { font-weight: bold; color: #FFFF00; text-decoration: blink; } .mhigh { font-weight: bold; color: #00FF00; } .normal { font-weight: bold; } .mlow { font-weight: bold; color: #FF0000; } .low { font-weight: bold; color: #7F0000; text-decoration: line-through; } .special { font-weight: bold; border: 1px dotted white; background-color: #333; }");

	document.getElementById("noneqt").value = "^";
	
	/////////////////
	
	var length = startPoint.length;
	startPoint = startPoint[startPoint.length - 1];

	if (length == 1) {
		startPoint = startPoint.nextSibling.nextSibling.nextSibling.nextSibling;
	} else {
		if (startPoint.parentNode.localName == "div") {
			// BvS Loop Helper no personal teams, 1 GM team
			startPoint = startPoint.parentNode.nextSibling;
		} else {
			startPoint = startPoint.nextSibling.nextSibling;
		}
	}
	
	quickteam = document.createElement('DIV');
	var text = "<table id='rvQT' cellpadding='0' cellspacing='0' width='100%'>";
	text += "</table><br><b>New QuickTeam</b>:<br>";

	var i;
	for (i = 0; i < 3; i++) {
		text += "<select id='rvAlly" + i + "'>";
		if (i)
			text += "<option value='' />";

		var j;
		for (j = 0; j < allies.length; j++) {
			var level = Allies.getAllyLevel(allies[j][1]);
			
			if (level > 1) {
				var name = Allies.getAllyWithoutLevel(allies[j][1]);
				var sname = escape(name);
				
				text += "<option value='" + sname + "'>" + name + "</option>";

				var k;
				for (k = 2; k < level; k++) {
					text += "<option value='" + sname + " " + k + "'>" + name + " " + k + "</option>";
				}
			}
			
			text += "<option value='" + escape(allies[j][1]) + "'>" + allies[j][1] + "</option>";
		}
		
		text += "</select>";
	}
	
	text += "&nbsp;&nbsp;<input id='rvAdd' type='image' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAeCAMAAABDs11AAAAAB3RJTUUH2wMVEyQj2aUWzAAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFAAAAAgICAwMDBQUFBgYGBwcHCAgICwsLCQkJDQ0NEBAQDAwMDw8PEhISiIiITU1NampqLy8vubm5xMTEfn5+JiYmpqamkpKSQ0NDFRUV////ioqKT09PsbGx4uLiPDw86+vrGBgYi4uLlZWVUVFRbm5uqKioNDQ0SEhIxcXFu7u7zs7O2NjYGhoaNjY2SkpKQEBAlpaWvLy8U1NTn5+fxsbGHR0d2dnZvb29VVVVODg4qqqqhISEjo6OHx8fcnJy0NDQj4+PVlZWx8fHIiIidHR0kJCQWVlZyMjIJCQkv7+/ra2t0dHR7Ozs2traWlpaZGRkm5ubJycnd3d3OTk5QUFBnJyct7e3XFxc5OTkZmZmycnJKCgoKSkpOzs77e3teXl5nZ2dTExMuLi4Xl5eLCwssLCwwcHB29vb5eXlYGBgysrKa2trfHx8YmJil5eXy8vLLi4uFhYWMTExQkJCICAgs7OzmZmZzMzMFBQUzc3NV1dXgYGB3d3daGho7u7uHh4eg4ODMDAwKioqOjo6Pj4+GRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQzFv6AAAAAF0Uk5TAEDm2GYAAAIUSURBVHjazZX7TxNBEMfBGEVJa8spemOhPVqsr5b64AQfp+CJLIpWQEQMVPFRwSdR0JwvuKT83c7O3u5cTDTpxUQ/P3T2szvf9naT23Z0/Bc4YdiqIS2m9hvC0PklvJNvtUV+J55eX26bdU6Hc38gM19iKW1v62Go01tVw1oQBF9Yq1+/AcB3bcEPgMCsbUXxMrOJ3Zsx/4QOi9qkfOZFld74wDSwofGRfaiOE3Vt9T6A97y4oc4ta3gtvx/eZGOgvzXyDuO8pE7vOfMCmvj7LyMrrsJqEeNrUnJNgGYPwKtYO8WXDMsNePwE+1fInkLEM5SVRiSPuH2J4jOGWYC5+9gyHwk8WJjCzwW0hwDTi7PTGOf2GYoLwxTcEuI2NiqBO0JUMX5XiOPyBIW4BzDJ7YLivqasnxZuoGGZUOWm709g8alM+gzFPc1VE7+GhmVMlXHPG8PiUbnuMRR3NRdgZBQZwdaLrlsAuISTKKOue1nNXQEYdhmKVyJwm0Oy1rD1TKVyFqBQJTmn5s7T3HCFUW+6YqAfoFhynMFj8vGLZXlahRNyfHLQcU5hPd0vpwbKjobitoI2fdS2LbX9nN0ni0yAZdv5grGcraF4SpGWHEilMjRIZ3HUYx08ZFm96QwuZw9bvUcylkUrERTv3p+QbvXK7UtI9L537U1El75u9iSCL7vdCYhftZ272qTzX/8v/QV+Ash6BHwU1lOdAAAAAElFTkSuQmCC' alt='Add' width='31' height='15'>";
	text += "&nbsp;&nbsp;<input id='rvForm' type='image' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAMAAACMnWmDAAAAB3RJTUUH2wMVEygs5a9EUQAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFAAAAAgICAwMDBQUFBgYGBwcHCAgICwsLCQkJDQ0NEBAQDAwMDw8PEhISLy8viIiIampqJiYmubm5xMTEkpKSOTk5TU1NFRUVT09P////PDw86+vrsbGxioqKGBgYNDQ0i4uL2NjYlZWVbm5u4uLiqKionp6eu7u7UVFRGhoajIyMqampLS0tNjY2xsbGU1NTHR0djo6OqqqqODg4hISEVVVVHx8fj4+Px8fHVlZWIiIikJCQvr6+mpqayMjIWVlZJCQkkZGRv7+/5OTkdnZ2SEhIZGRkf39/Jycnk5OTycnJVFRUXFxcd3d37Ozs0dHRrq6unJycKCgoKSkplJSUOzs7TExMcHBw29vb0tLS9vb27e3teXl5LCwsysrKRkZGsLCwaWlpcnJyYGBgwcHBWFhYPT095eXll5eXQEBA3NzcLi4uFhYWMTExQkJCwsLCmJiYICAgZmZmRUVFFBQUV1dXzc3Nq6urHh4eMDAwKioqOjo6Pj4+GRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArzFaZgAAAAF0Uk5TAEDm2GYAAAITSURBVHja1Zb9T9NgEMfBGEGJ22QCvQ3aURQVHC8KGwhOYQIDedHUKVoKqAMcBB0QhCbjf/eeu/Z5nvCTGU0In6S9u+/d802zZ3napqYbg+n79SpSV1T/G983L9ldpOpXJHWh+x2UI+BA+fkdkeCHfudZ5vSv4izbAOeBoRVwDBonVgOw39FhwO/5P+hUq9W6XYD8YQMc8Y7EJL/QUMTqPuzHGoD3xVPYaOh5m5veFriW5xnb+KjrA6Kz9X3btX+4ruH9tCuuvVMBqBi7/XuwZ2vrPTJ0FJ/Q0Cnj5XzG6kvwc66XHUfEr3gtUfaN9KJLYUMzIMOSYlEsKQJQ8R6L2eWVVYC1Uincqw8l0YfVj7OiWlvE7pJmQIZvFTPBMipwSRHDO6znqFWcj8eznGFAeYGKgmZAhq8UUzg1NQ1ABeavMVhCo1ZBDhW4/UaXCTLMKfI4lcuJKycC5FXE1oQcmmB5UpcJMhxRjOIU3kepSAO8wPAStTFqDckhkaE8rssEGT5TDOCULAYB0s9Zy1IYkkMiQ3lYlwk+CUOsTC9O2X1hiY/4KPMYpX7TFK10xjJlJv6yT572SZkhw64Qg7c4GdapNAvdmHNmqIzuPUkpM2R4PyQWJxJSeJBoTyYfdoiUWzGV0b0zIWWGDNvuRUYbHzd3IyM4D1tbIqI1PLLvRIR6qdyOBP2113zryjRf95fFtfEPuOg0CHV1dAYAAAAASUVORK5CYII%3D' alt='Form' width='40' height='15'>";

	quickteam.style.borderTop = quickteam.style.borderBottom = "1px dotted black";
	quickteam.innerHTML = text;
	
	startPoint.parentNode.insertBefore(quickteam, startPoint);

	tableDnD = new DnDTable();
	tableDnD.init(document.getElementById('rvQT'));

	tableDnD.onStartDragging = function() {
		this.startRowIndex = this.dragObject.rowIndex;
	}
	tableDnD.onDragging = function() {
		this.dragObject.style.background = "yellow";
	}
	tableDnD.onDrop = function() {
		this.dragObject.style.background = "";

		var endRowIndex = this.dragObject.rowIndex;
		var pos = this.startRowIndex;

		if (pos != endRowIndex) {
			if (endRowIndex < pos) {
				// move up
				var diff = pos - endRowIndex;

				for (; diff > 0; diff--) {
					playerData["Quickteams"].shiftUp(pos);
					playerData["QuickteamNames"].shiftUp(pos);
					pos--;
				}
			} else {
				// move down
				var diff = endRowIndex - pos;

				for (; diff > 0; diff--) {
					playerData["Quickteams"].shiftDown(pos);
					playerData["QuickteamNames"].shiftDown(pos);
					pos++;
				}
			}

			saveGM();

			updateNumbers();
		}
	}

	var extra = document.createElement('SPAN');

	text = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	text += "<a id='rvExport' href='javascript:;' style='color:A10000'><b>Export &gt;</b></a>";
	text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	text += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	text += "<a id='rvImport' href='javascript:;' style='color:A10000'><b>Import &gt;</b></a>";

	if (turnThePage) {
		text += "<br />";
	}

	extra.innerHTML = text;

	if (turnThePage) {
		startPoint.parentNode.insertBefore(extra, startPoint.nextSibling);
	} else {
		startPoint.parentNode.insertBefore(extra, startPoint.nextSibling.nextSibling);
	}
	
	redoQuickteamList();

	document.getElementById("rvAdd").addEventListener("click", addNewQuickteam, true);
	document.getElementById("rvForm").addEventListener("click", formTeam, true);
	document.getElementById("rvExport").addEventListener("click", exportQuickteams, true);
	document.getElementById("rvImport").addEventListener("click", importQuickteams, true);
	
	/////////////////

	testDiv = document.createElement('DIV');
	testDiv.style.opacity = 0;
	testDiv.style.fontFamily = "arial";
	testDiv.style.fontWeight = "bold";
	testDiv.style.display = "inline";

	document.body.insertBefore(testDiv, null);

	/////////////////
	
	startPoint = document.getElementByName("quickteamnumber");
	
	if (startPoint != null) {
		var table = startPoint.parentNode.parentNode.parentNode.parentNode.parentNode;
		table.cellSpacing = "0";
		table.cellPadding = "0";
		
		var empty = table.insertRow(table.rows.length).insertCell(0);
		empty.style.height = "10";
		empty.style.backgroundColor = "#ead8c3";
		
		var row = table.insertRow(table.rows.length);
		var element = row.insertCell(0);
		
		element.align = "center";
		element.style.backgroundColor = "#ead8c3";
		element.style.fontFamily = "arial";
		
		element.innerHTML = "<form style='margin: 0pt;'>Save current team as a GM Quickteam: <input id='rvAddCurrent' type='image' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAeCAMAAABDs11AAAAAB3RJTUUH2wMVEyQj2aUWzAAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFAAAAAgICAwMDBQUFBgYGBwcHCAgICwsLCQkJDQ0NEBAQDAwMDw8PEhISiIiITU1NampqLy8vubm5xMTEfn5+JiYmpqamkpKSQ0NDFRUV////ioqKT09PsbGx4uLiPDw86+vrGBgYi4uLlZWVUVFRbm5uqKioNDQ0SEhIxcXFu7u7zs7O2NjYGhoaNjY2SkpKQEBAlpaWvLy8U1NTn5+fxsbGHR0d2dnZvb29VVVVODg4qqqqhISEjo6OHx8fcnJy0NDQj4+PVlZWx8fHIiIidHR0kJCQWVlZyMjIJCQkv7+/ra2t0dHR7Ozs2traWlpaZGRkm5ubJycnd3d3OTk5QUFBnJyct7e3XFxc5OTkZmZmycnJKCgoKSkpOzs77e3teXl5nZ2dTExMuLi4Xl5eLCwssLCwwcHB29vb5eXlYGBgysrKa2trfHx8YmJil5eXy8vLLi4uFhYWMTExQkJCICAgs7OzmZmZzMzMFBQUzc3NV1dXgYGB3d3daGho7u7uHh4eg4ODMDAwKioqOjo6Pj4+GRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQzFv6AAAAAF0Uk5TAEDm2GYAAAIUSURBVHjazZX7TxNBEMfBGEVJa8spemOhPVqsr5b64AQfp+CJLIpWQEQMVPFRwSdR0JwvuKT83c7O3u5cTDTpxUQ/P3T2szvf9naT23Z0/Bc4YdiqIS2m9hvC0PklvJNvtUV+J55eX26bdU6Hc38gM19iKW1v62Go01tVw1oQBF9Yq1+/AcB3bcEPgMCsbUXxMrOJ3Zsx/4QOi9qkfOZFld74wDSwofGRfaiOE3Vt9T6A97y4oc4ta3gtvx/eZGOgvzXyDuO8pE7vOfMCmvj7LyMrrsJqEeNrUnJNgGYPwKtYO8WXDMsNePwE+1fInkLEM5SVRiSPuH2J4jOGWYC5+9gyHwk8WJjCzwW0hwDTi7PTGOf2GYoLwxTcEuI2NiqBO0JUMX5XiOPyBIW4BzDJ7YLivqasnxZuoGGZUOWm709g8alM+gzFPc1VE7+GhmVMlXHPG8PiUbnuMRR3NRdgZBQZwdaLrlsAuISTKKOue1nNXQEYdhmKVyJwm0Oy1rD1TKVyFqBQJTmn5s7T3HCFUW+6YqAfoFhynMFj8vGLZXlahRNyfHLQcU5hPd0vpwbKjobitoI2fdS2LbX9nN0ni0yAZdv5grGcraF4SpGWHEilMjRIZ3HUYx08ZFm96QwuZw9bvUcylkUrERTv3p+QbvXK7UtI9L537U1El75u9iSCL7vdCYhftZ272qTzX/8v/QV+Ash6BHwU1lOdAAAAAElFTkSuQmCC' alt='Add' width='31' height='15'></form>";
		
		document.getElementById("rvAddCurrent").addEventListener("click", addCurrentQuickteam, true);
	}
}

var tableDnD = null;

function redoQuickteamList() {
	try {
		var table = document.getElementById("rvQT");

		while (table.rows.length > 0) {
			table.deleteRow(0);
		}

		if (playerData["Quickteams"] != null) {
			var i;
			for (i = 0; i < playerData["Quickteams"].length; i++) {
				createQuickTeam(playerData["Quickteams"][i], playerData["QuickteamNames"][i], i+1);

				tableDnD.makeDraggable(table.rows[i]);
			}
		}
	} catch(e) {
		alert("Exception when Loading QuickTeams!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

var dialog = null;
var dialogHeader = null;
var dialogText = null;

function exportQuickteams(ev) {
	try {
		if (dialog == null) {
			dialog = document.createElement("div");
			dialog.style.visibility = "hidden";
			dialog.id = "rvDialog";
			dialog.innerHTML = "<img id='closebutton' onclick=\"document.getElementById('rvDialog').style.visibility='hidden';\" title='Close' src='data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%03%00%00%00(-%0FS%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00TPLTE%BA%0C%0C%BF%1D%1D%C1%26%26%C1((%C1))%C8%3D%3D%C8%3F%3F%CBHH%CDPP%D6nn%DC%83%83%DD%89%89%DE%89%89%E2%98%98%E4%A0%A0%EC%BA%BA%F1%CB%CB%F3%D7%D7%F4%D7%D7%F6%E1%E1%F7%E3%E3%FB%F0%F0%FB%F2%F2%FB%F3%F3%FC%F6%F6%FE%FB%FB%FE%FE%FE%FF%FF%FFD%88%E1%E1%00%00%00rIDAT%18%D3%5D%CFY%0E%80%20%10%03%D0%BA%E0%8E%8A%0A(%BD%FF%3D%8Da%08%EA%FC%F5%25M%3A%08%FC%5C%00%F19%3EP%A5T%09lK%CC%CB%26%80%F9%EC%80%EE%9CS%05%188%8E%1C%90%01%139%E1%05%E5N%EEe%86%C6q%5D%E9%9A%04%B5%E7%01%1C%F4%B5%80%E5%A5%00u%D1Fh%03%F5S%D7%0C%AD%80%89%C3%8C%00%FA%22B%D1%E7%1D%AF%E7%FE%EF%DF%8Eb%0A%CB%F1%17%10%11%00%00%00%00IEND%AEB%60%82' />";

			dialogHeader = document.createElement("h1");
			dialogText = document.createElement("div");
			dialog.appendChild(dialogHeader);
			dialog.appendChild(dialogText);

			document.body.appendChild(dialog);
		}

		centerdiv(dialog, "300", "200");

		dialogText.innerHTML = "<textarea rows='3' id='rvExportText' readOnly='true' style='background: #ccc; width: 100%; height: 150px;'>" + JSON.stringify(playerData).sanitizeHTML() + "</textarea>";
		dialogHeader.innerHTML = "Infinite QuickTeams Export";

		dialog.style.visibility = "visible";

		selectAll("rvExportText");
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function importQuickteams(ev) {
	try {
		var input = prompt("Enter your saved 'Infinite QuickTeams' Export:", "");

		if ((input != null) && (input != "")) {
			var failed = false;
			var newData = null;

			try {
				newData = JSON.parse(input);
				failed = ((newData == undefined) || (newData == null));
			} catch (e) {
				failed = true;
			}

			if (failed) {
				alert("Failed to understand the Import text!");
			} else {
				playerData = newData;
				saveGM();

				redoQuickteamList();
			}
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function formTeam(ev) {
	try {
		var ally1 = unescape(document.getElementById("rvAlly0").value);
		var ally2 = unescape(document.getElementById("rvAlly1").value);
		var ally3 = unescape(document.getElementById("rvAlly2").value);

		if ((ally2 == "") && (ally3 != "")) {
			ally2 = ally3;
			ally3 = "";
		}

		var spot = document.getElementByName("quickteam");

		spot = spot.nextSibling.nextSibling.nextSibling.nextSibling;

		var element = document.createElement('DIV');
		var text = "<input type='radio' id='rvTempQT' value='";

		ally1 = Allies.get(Allies.getAllyWithoutLevel(ally1));

		text += ally1[0];
		if (ally2 != "") {
			ally2 = Allies.get(Allies.getAllyWithoutLevel(ally2));
			text += "^" + ally2[0];
		}
		if (ally3 != "") {
			ally3 = Allies.get(Allies.getAllyWithoutLevel(ally3));
			text += "^" + ally3[0];
		}

		text += "' name='quickteam'><b>Temporary Quickteam</b><br>";

		element.innerHTML = text;
		spot.parentNode.insertBefore(element, spot);

		document.getElementById("rvTempQT").checked = true;
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	return true;
}

function addCurrentQuickteam(ev) {
	try {
		var newQT = currentTeam;
		
		if (newQT.length != 0) {
			while (newQT.length < 3)
				newQT.push("");
			
			genericAddNewQuickteam(newQT);

			redoQuickteamList();
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
	
	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function addNewQuickteam(ev) {
	try {
		var ally1 = unescape(document.getElementById("rvAlly0").value);
		var ally2 = unescape(document.getElementById("rvAlly1").value);
		var ally3 = unescape(document.getElementById("rvAlly2").value);
		var cancel = false;
		
		if ((ally2 == "") && (ally3 != "")) {
			ally2 = ally3;
			ally3 = "";
		}

		if ((Allies.equals(ally1, ally2))
				|| (Allies.equals(ally1, ally3))
				|| ((Allies.equals(ally2, ally3)) && (ally2 != ""))) {
			alert("Invalid QuickTeam.");
			cancel = true;
		}
		
		if (!cancel) {
			var newQT = new Array(ally1, ally2, ally3);

			genericAddNewQuickteam(newQT);

			redoQuickteamList();
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
	
	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function genericAddNewQuickteam(newQT) {
	if (playerData["Quickteams"] == null) {
		playerData["Quickteams"] = new Array();
		playerData["QuickteamNames"] = new Array();
	}

	var existing = playerData["Quickteams"].getPos(newQT);
	if (existing != -1) {
		alert("Quickteam is already in use in position #" + existing + ", named '"
				+ (playerData["QuickteamNames"][existing] == "" ? "GM Quickteam " + (existing+1) : playerData["QuickteamNames"][existing]) + "'.");
		return;
	}

	var newName = "";
	
	createQuickTeam(newQT, newName, playerData["Quickteams"].length+1);
	
	playerData["QuickteamNames"].push(newName);
	playerData["Quickteams"].push(newQT);
	
	saveGM();
}

function createQuickTeam(qt, name, number) {
	var table = document.getElementById("rvQT");
	
	var row = table.insertRow(table.rows.length);
	var element = row.insertCell(0);
	var valid = true;
	var same = new Array();
	var id = "";
	var allyNames = "";
	var allyNamesNow = "";
	var realAllyNames = new Array();

	var i;
	for (i = 0; i < 3; i++) {
		if (qt[i] == "") {
			same.push(true);
			continue;
		}

		var ally = Allies.get(Allies.getAllyWithoutLevel(qt[i]));

		if (i > 0)
			allyNames += ", ";
		allyNames += qt[i];

		if (ally == null) {
			valid = false;
		} else {
			if (i > 0) {
				id += "^";
				allyNamesNow += ", ";
			}

			id += ally[0];
			allyNamesNow += ally[1];

			realAllyNames.push(ally[1]);

			if (qt[i] == ally[1]) {
				same.push(true);
			} else {
				
				same.push(false);
			}
		}
	}

	var allyNamesColor = "";

	for (i = 0; i < 3; i++) {
		if (qt[i] == "")
			continue;

		if (i > 0) {
			allyNamesColor += ", ";
		}

		if (valid) {
			if (same[i])
				allyNamesColor += realAllyNames[i];
			else
				allyNamesColor += "<font color='#cc0000'><i>" + realAllyNames[i] + "</i></font>";
		} else {
			allyNamesColor += qt[i];
		}
	}
	
	var enames = escape(allyNames);
	var teamName = (name == "" ? "GM Quickteam" : name);
	var allsame = (same[0]) && (same[1]) && (same[2]);
	var coloring = ((allsame) || (!valid) ? "#000000" : "#cc0000");

	var text = "";

	text += "<input type='radio' id='" + id + "' value='" + id + "' name='quickteam'" + (valid ? "" : " disabled") + ">";
 	text += "<input type='text' id='nname" + enames + "' value='" + teamName + "' style='color: " + coloring + "; outline: none; font-weight: bold; font-family: arial; font-size: 100%; display: none; border: 0px; background: none;' onfocus='var evt = new Object(); evt.target = document; moveMouse(evt); return true;'>";

	if (valid) {
		text += "<label for='" + id + "'>";
		if (!allsame)
			text += "<span title='header=[Team Misalignment&nbsp;] body=[Original Team: " + allyNames.replaceAll("'", "&#39;") + "&nbsp;<br>Changed to:&nbsp;&nbsp;&nbsp;&nbsp;" + allyNamesNow.replaceAll("'", "&#39;") + "&nbsp;] offsetx=[0] offsety=[18] redswitch=[1] offsety=[-10]'>";
	}

	text += "<b style='color: " + coloring + ";'><div id='name" + enames + "' style='display: inline'>";
	text += teamName.sanitizeHTML();
	text += "</div>";
	text += " <div name='rvQTNumber' style='display: inline'>";
	if (name != "")
		text += "(";
	text += number;
	if (name != "")
		text += ")";
	text += "</div></b>";

	if ((!allsame) && (valid))
		text += "</span>";

	text += ": <font style='font-size: 12px;'>";	
	text += allyNamesColor;
	text += "<br></font>";
	
	if (valid)
		text += "</label>";
	
	element.innerHTML = text;
	
	element = row.insertCell(1);
	element.style.borderLeftStyle = "dotted";
	element.style.textAlign = "right";
	element.setAttribute("NoDrag", "true", 0);
	element.innerHTML = "<img id='down" + enames + "' alt='Move Down' src='data:image/gif;base64,R0lGODlhKgAwAPcAAJSUlJScnJycnKWlpa2tra2ttbW1tbW1vb29vb29xsbGxs7Ozs7W1tbW1tbe3t7e3t7n5+etpee1pefW1ufn5++tnO+1pe+1re+9re/v7/e9rfe9tffWlPfWzvfepff37/f39/8AAP8IAP8QAP8YAP8hAP8pAP8pKf8xAP8xKf8xMf85AP85Kf9CAP9CKf9CMf9KAP9KCP9KEP9KKf9SAP9SCP9SEP9SIf9SKf9aAP9aEP9aKf9aMf9jAP9jEP9jKf9rAP9rEP9rMf9zAP9zEP9zKf9zMf97AP97Mf+EAP+EMf+EOf+MAP+UAP+UUv+cAP+lAP+lKf+tKf+1Kf/Ovf/Oxv/WlP/Wxv/exv/ezv/nzv/n1v/v5//v7//37//39///7///9////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAGIALAAAAAAqADAAAAj+AMUIHEhQIIgMCBMqXIiQwoKCECMK/MKhosWLGC16EEBAoseBXqCIHEmy5MgpADp+9BjSpEuSUwIYWMnypU0oUwTMpBmx5U2TUwYg4Nnzp8ugQ4kW9Gn0JIGkSkE2LTmFgIKoBL082cq1q9etUKQYuIpVoNavaLuKJVv2bNq0UhA8LCvGS5O7ePPqxRtFLt26ewPrjZJgblsmiBMrXpw4ioIGf70kmUy5suUjQHIYeRz5iOXPQ2CUEBEihIoFkOlyOcK6teseKEiXLn36wV8uQIbo3j0EtojfwH+rYGBbdY/jyGmYGMG8ufMXDYqX5ZIjBw0YK0qQ2M69+3bo0rH+cilBvrz58+VfOKBwG7378zMesFdtor79+/jt45B/2wSK/ADWh8J+802HwoEIJqgggjxAUKBEBylEwYQTrGDhhRhmeGGD8lHAUAYgVIHBiCReYIEEFWioYoY3SBCBBBeQSGIHYlAhQws45qjjjjz26GMLPHAhkI0/Fmnkjj8IORAVNsDg5JNQRinllFEKoSRBVzRJ5ZZcPmmlRFfoQMOYZJZp5plo0vClR2Gm6eabRlzJpphv1klmnERd4UN1fPbp55984qmUnoAW+icSchKFxZ6GGoroX4s2Cuijf4mBRRDIZaopckh0UelAWWC66aZLePEpQaGOmmmppxaUqqokrLbqqqiaxirrrLWaemtEr/Zg664QaUGEr7oCK5EWThSLVUAAADs%3D' width='12' height='14' style='cursor: pointer;'>"
		+ "&nbsp;&nbsp;&nbsp;<img id='up" + enames + "' alt='Move Up' src='data:image/gif;base64,R0lGODlhKQAwAPcAAACMAACUAACcAAClAACtAAC1AAC9AADGAADOAADWAADeAADnACHOISHeISHnISnWKSneKTHWMTnWOUKtQkq1Skq9SkrGSkrOQkrOSkrWSlLeUlreWmPeY2vea2vna3Pec3Pnc3Pne3vne4yMjJSUlJycnKWlpaWtpaXvpa2trbW1tb29vcbGxs7Gzs7Ozs7WztbO1tbW1t7e3t733t7/3ufn5+f35+f/5+/v7+//5+//7/f39////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAADwALAAAAAApADAAAAj+AHkIHEiw4MAaK3YYXMiw4cIaJkx0mOGwokWBNVKY0KDAAcWLIAtmTLFBgUmPIVPWUEHSpEuUKS3iUKGipMuXH2MyxLFihc2bOHUuxMHCJ9CjMIUKJMqCw9GnDXLqxOGi6dOrEKSGpOrC6dWrUWPuiNE1gdmzaNOizRpybIwOauPKZWtxh4y3cvOqpdvQrgy4egOf5WtwRw0ZHwQrNgvBxkLDNRIvXvzAcUEckRFo3sy5s+fPmysT3IHjA+jTqD2L5rFjh4jUsGGLdo3gQOcDtmN7zr0Zd+UZIoILD/5hAgPcyJMrT95huHMUDWuMwLC8unLLMWuQoG69O/aUOErdYDBAvrz58+W/bzVhAb378+pB4mD/vr6B+BdxpLBQoL///wD6h59MKvAXYIAEDCBAAAAMWNFMBh5YQIIMAmBhg0LxVAEBHHbY4YIXhuigQxp6+GEAKKao4ogNEVXBADDCuKCKNKLI4k4svKigADz26OOPNz7GAgU/FmlkkIXlGOOSTDaJZEE7uKBjk1TG+ORoUpqo5ZZXDhSlBVuG2WGXAn0p4ZkFkMmaCxGiCaCaO8DQppsCCjXWePa5B2cMeOYJn518+onentx1Vx2hhlqn1VYfSODoo5BG+uiIAQEAOw%3D%3D' width='12' height='14' style='cursor: pointer;'>"
		+ "&nbsp;&nbsp;&nbsp;<img id='delete" + enames + "' alt='Remove' src='/billy/layout/xremove.gif' style='cursor: pointer;'>";

	document.getElementById("name" + enames).addEventListener("dblclick", renameQuickteam, true);
	document.getElementById("nname" + enames).addEventListener("blur", endQuickteamEdit, true);
	document.getElementById("nname" + enames).addEventListener("keydown", keydownQuickteamEdit, true);
	document.getElementById("nname" + enames).addEventListener("keypress", keypressQuickteamEdit, true);
	document.getElementById("nname" + enames).addEventListener("keyup", keyupQuickteamEdit, true);
	document.getElementById("nname" + enames).addEventListener("cut", cutQuickteamEdit, true);
	//document.getElementById("nname" + enames).addEventListener("paste", changeQuickteamEdit, true);

	document.getElementById("down" + enames).addEventListener("click", moveQuickteamDown, true);
	document.getElementById("up" + enames).addEventListener("click", moveQuickteamUp, true);
	document.getElementById("delete" + enames).addEventListener("click", removeQuickteam, true);
}

var currentlyEditing;

function renameQuickteam(ev) {
	try {
		if (currentlyEditing != null) {
			endQuickteamEdit();
		}

		currentlyEditing = this.id;
		var width = this.offsetWidth;
		var height = this.offsetHeight;
		this.style.display = "none";

		var edit = document.getElementById("n" + currentlyEditing);
		edit.value = this.textContent;
		edit.style.height = height + "px";
		edit.style.width = (width+3) + "px";
		edit.style.display = "";
		edit.focus();
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function endQuickteamEdit(save) {
	try {
		if (currentlyEditing == null)
			return;

		var id = currentlyEditing;
		currentlyEditing = null;

		var edit = document.getElementById("n" + id);
		var text = document.getElementById(id);

		var newName = edit.value;
		edit.style.display = 'none';

		if (newName == "GM Quickteam")
			newName = "";

		if (save == false) {
			//edit.value = text.textContent;	// this isn't possible with onkeypress
		} else if (newName != text.textContent) {
			var qt = getQTFromId(text, 4);
			var existing = playerData["Quickteams"].getPos(qt);

			if (existing != -1) {
				playerData["QuickteamNames"][existing] = newName;

				saveGM();
			}

			edit.value = (newName == "" ? "GM Quickteam" : newName);
			text.innerHTML = edit.value.sanitizeHTML();

			var num = text.parentNode;
			num = num.childNodes[num.childNodes.length - 1];

			if (num.textContent.charAt(0) != '(') {
				if (newName != "")
					num.innerHTML = "(" + num.textContent + ")";
			} else if (newName == "") {
				num.innerHTML = num.textContent.replace("(","").replace(")","");
			}
		}

		text.style.display = 'inline';
		text.focus();
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function keydownQuickteamEdit(ev) {
	return keypressQuickteamEdit(ev, true);
}

function keypressQuickteamEdit(ev, keydown) {
	var rtrn = true;
	keydown = (keydown == true ? true : false);
	var obj = ev.currentTarget;

	try {
		if (ev != null) {
			switch (ev.keyCode) {
			case 27: // escape
				if (ev && ev.preventDefault)
					ev.preventDefault();
				rtrn = false;

				endQuickteamEdit(false);
				break;
			case 13: // enter
				if (ev && ev.preventDefault)
					ev.preventDefault();

				endQuickteamEdit();
				break;
			case 46: // delete
			case 8:  // backspace
				var start = obj.selectionStart;
				var end = obj.selectionEnd;

				if (start == end) {
					if (ev.keyCode == 46)
						end++;
					else
						start--;
				}

				testDiv.innerHTML = (obj.value.substring(0, start) + obj.value.substring(end)).sanitizeHTML();
				obj.style.width = (testDiv.offsetWidth+3) + "px";
				break;
			default:
				if (keydown)
					break;

				var char = String.fromCharCode((ev.charCode ? ev.charCode : ev.which));

//document.getElementByName("rvQTNumber").innerHTML
// = ev.keyCode + "," + ev.charCode + "," + ev.which + "," + ev.shiftKey + "," + ev.ctrlKey + "," + String.fromCharCode(ev.keyCode) + "," + char;

				if ((!ev.ctrlKey) && (char.isPrintable())) {
					testDiv.innerHTML = (obj.value + char).sanitizeHTML();
					obj.style.width = (testDiv.offsetWidth+3) + "px";
				}
			}
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}

	return rtrn;
}

function keyupQuickteamEdit(ev) {
	try {
		testDiv.innerHTML = this.value.sanitizeHTML();
		this.style.width = (testDiv.offsetWidth+3) + "px";
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function cutQuickteamEdit(ev) {
	try {
		var start = this.selectionStart;
		var end = this.selectionEnd;

		if (start != end) {
			testDiv.innerHTML = (this.value.substring(0, start) + this.value.substring(end)).sanitizeHTML();
			this.style.width = (testDiv.offsetWidth+3) + "px";
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
}

function moveQuickteamDown(ev) {
	try {
		var qt = getQTFromId(this, 4);
		var existing = playerData["Quickteams"].getPos(qt);
		
		moveTableRowDown(this.parentNode.parentNode);

		playerData["Quickteams"].shiftDown(existing);
		playerData["QuickteamNames"].shiftDown(existing);

		saveGM();
		
		updateNumbers();
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
	
	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function moveQuickteamUp(ev) {
	try {
		var qt = getQTFromId(this, 2);
		var existing = playerData["Quickteams"].getPos(qt);
		
		moveTableRowUp(this.parentNode.parentNode);

		playerData["Quickteams"].shiftUp(existing);
		playerData["QuickteamNames"].shiftUp(existing);

		saveGM();
		
		updateNumbers();
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
	
	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function removeQuickteam(ev) {
	try {
		var qt = getQTFromId(this, 6);
		var existing = playerData["Quickteams"].getPos(qt);

		if (existing != -1) {
			this.parentNode.parentNode.parentNode.deleteRow(existing);

			playerData["Quickteams"].splice(existing, 1);
			playerData["QuickteamNames"].splice(existing, 1);

			saveGM();
			
			updateNumbers();
		}
	} catch(e) {
		alert("Exception!\n\nError name: " + e.name + "\nError message: " + e.message);
	}
	
	if (ev && ev.preventDefault)
		ev.preventDefault();
	return false;
}

function getQTFromId(elem, cut) {
	var qt = unescape(elem.id.substring(cut)).split(", ");
	
	while (qt.length < 3)
		qt.push("");
	
	return qt;
}

function updateNumbers() {
	var elems = document.getElementsByName("rvQTNumber");
	if (elems == null)
		return;

	var i;
	for (i = 0; i < elems.length; i++) {
		if (elems[i].textContent.charAt(0) == '(')
			elems[i].textContent = "(" + (i+1) + ")";
		else
			elems[i].textContent = (i+1);
	}
}

function moveTableRowUp(node) {
	var prevRow = node.previousSibling;
	var tableNode = node.parentNode;
	
	var remove = tableNode.removeChild(node);
	tableNode.insertBefore(remove, prevRow);
	
	return (prevRow == null);
}

function moveTableRowDown(node) {
	var nextRow = node.nextSibling;
	var tableNode = node.parentNode;
	var rtrn = nextRow == null;
	
	if (rtrn)
		nextRow = tableNode.firstChild;
	else
		nextRow = nextRow.nextSibling;

	if (nextRow == node)
		return true;
	
	var remove = tableNode.removeChild(node);
	tableNode.insertBefore(remove, nextRow);
	
	return rtrn;
}

var Allies = new Object();

Allies.getAllyName = function(src) {
	var pos = src.lastIndexOf("/")+1;
	var text = src.substring(pos).replaceAll("_", " ").replaceAll(" Lvl. ", " ").replaceAll("%27", "'").replace("ss\\.gif", "").replace(/\.gif/, "");
	return text;
};

Allies.getAllyWithoutLevel = function(name) {
	if (name.match(" \\d+$")) {
		var pos = name.lastIndexOf(" ");
		return name.substring(0, pos);
	}

	return name;
};

Allies.getPos = function(name) {
	if (allies != null) {
		var i;
		for (i = 0; i < allies.length; i++) {
			if (Allies.equals(name, allies[i][1]))
				return i;
		}
	}

	return -1;
};

Allies.get = function(name) {
	var pos = Allies.getPos(name);
	if (pos == -1)
		return null;

	return allies[pos];
};

Allies.getAllyLevel = function(name) {
	var match;

	if (match = name.match(" (\\d+)")) {
		return parseInt(match[1]);
	}

	return 1;
};

Allies.equals = function(input, arraytest) {
	if (arraytest == null)
		return (input == null);

	return (arraytest.match("^" + input + "( \\d+)?$") != null);
};

function selectAll(id) {
    document.getElementById(id).focus();
    document.getElementById(id).select();
}

function centerdiv(div, Xwidth, Yheight) {
	// First, determine how much the visitor has scrolled

	/*var scrolledX, scrolledY;

	if( self.pageYoffset ) {
		scrolledX = self.pageXoffset;
		scrolledY = self.pageYoffset;
	} else if( document.documentElement && document.documentElement.scrollTop ) {
		scrolledX = document.documentElement.scrollLeft;
		scrolledY = document.documentElement.scrollTop;
	} else if( document.body ) {
		scrolledX = document.body.scrollLeft;
		scrolledY = document.body.scrollTop;
	}*/

	// Next, determine the coordinates of the center of browser's window

	var centerX, centerY;
	if( self.innerHeight ) {
		centerX = self.innerWidth;
		centerY = self.innerHeight;
	} else if( document.documentElement && document.documentElement.clientHeight ) {
		centerX = document.documentElement.clientWidth;
		centerY = document.documentElement.clientHeight;
	} else if( document.body ) {
		centerX = document.body.clientWidth;
		centerY = document.body.clientHeight;
	}

	if (Yheight.substring(Yheight.length-1) == "%")
		Yheight = parseInt(Yheight) / 100 * centerY;
	if (Xwidth.substring(Xwidth.length-1) == "%")
		Xwidth = parseInt(Xwidth) / 100 * centerX;

	// Xwidth is the width of the div, Yheight is the height of the
	// div passed as arguments to the function:
	var leftoffset = /*scrolledX + */(centerX - Xwidth) / 2;
	var topoffset = /*scrolledY + */(centerY - Yheight) / 2;
	// The initial width and height of the div can be set in the
	// style sheet with display:none; divid is passed as an argument to // the function
	var r = div.style;
	r.position = 'fixed';
	r.top = topoffset + 'px';
	r.left = leftoffset + 'px';
	r.width = Xwidth + 'px';
	r.height = Yheight + 'px';
}

document.getElementByName = function(str) {
	var rtrn = document.getElementsByName(str);
	if ((rtrn == null) || (rtrn.length == 0)) return null;
	return rtrn[0];
};

String.prototype.replaceAll	= function(str, str2) { return (this.replace(new RegExp(str, "g"), str2)); };
String.prototype.isPrintable	= function() { return (this.match(/[\x00-\x1F\x80-\xFF]/) == null); };
String.prototype.sanitizeHTML	= function() { return (this.replaceAll("&", "&amp;").replaceAll(" ", "&nbsp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")); };

Array.prototype.swap = function (x,y) {
	var b = this[x];
	this[x] = this[y];
	this[y] = b;

	return this;
}

Array.prototype.shiftUp = function (pos) {
	if (pos == 0) {
		this.push(this.shift());
	} else {
		this.swap(pos, pos - 1);
	}
}

Array.prototype.shiftDown = function (pos) {
	if (pos == this.length - 1) {
		this.unshift(this.pop());
	} else {
		this.swap(pos, pos + 1);
	}
}


Array.prototype.getPos = function(obj) {
	var i = this.length;

	while (i--) {
		if (isArray(this[i])) {
			if ((isArray(obj)) && (this[i].length == obj.length)) {
				var j;
				for (j = 0; j < obj.length; j++) {
					if (this[i][j] != obj[j])
						break;
				}
				
				if (j == obj.length)
					return i;
			}
		}
		if (this[i] === obj) {
			return i;
		}
	}
	
	return -1;
};

function isArray(obj) {
	return obj.constructor == Array;
}

function DnDTable() {
	this.init = false;
	this.table = null;
	this.dragObject = null;
	this.dragPosition = null;
	this.oldY = 0;

	// attach to table
	this.init = function (table) {
		// can't run this script without the event listeners
		if (!window.addEventListener) {
			return;
		}

		this.table = table;
		this.init = true;
		var self = this;

		// make rows draggable

		var rows = table.rows;
		var i;
		for (i = 0; i < rows.length; i++) {
			this.makeDraggable(rows[i]);
		}

		window.addEventListener('mousemove',
		function (ev) {
			return self.onMouseMove(ev || window.event);
		}
		,false);

		window.addEventListener('mouseup',
		function (ev) {
			return self.onMouseUp(ev || window.event);
		}
		,false);
	}

	// make a element in the table draggable
	this.makeDraggable = function (item) {
		if ((!item) || (!this.init))
			return;

		var nodrag = item.getAttribute("NoDrag");
		if ((nodrag != null) && (nodrag != "undefined"))
			return;

		var self = this;

		var cells = item.cells;
		var i;
		for (i = 0; i < cells.length; i++) {
			var cell = cells[i];
			var nodrag = cell.getAttribute("NoDrag");

			if ((nodrag == null) || (nodrag == "undefined")) {
				cell.addEventListener('mousedown',
					function (ev) {
						// // allow normal processing on form controls
						// var targetName = this.getEventSource(ev).tagName.toUpperCase();
						// 
						// if ((targetName == 'INPUT') || (targetName == 'SELECT') || (targetName == 'TEXTAREA'))
						// 	return true;

						if (self.dragObject != null) {
							return self.onMouseUp(ev);
						} else {
							self.dragObject = item;
							self.mouseOffset = self.getMouseOffset(this, ev);

							if (self.onStartDragging) {
								self.onStartDragging();
							}
						}

						if (ev && ev.preventDefault)
							ev.preventDefault();

						return false;
					}
				,false);

				cell.style.cursor = "move";
			}
		}
	}

	this.getEventSource = function getEventSource(evt) {
		if (window.event) {
			return window.event.srcElement; // For IE
		} else {
			return evt.target; // For Firefox
		}
	}

	this.onMouseMove = function (ev) {
		if (this.dragObject) {
			var mousePos = this.mouseCoords(ev);
			var y = mousePos.y - this.mouseOffset.y;

			if (y != this.oldY) {
				var movingDown = y > this.oldY;
				this.oldY = y;

				// If we're over a row then move the dragged row to there so that the user sees the effect dynamically
				var currentRow = this.findDropTargetRow(y);

				if (this.onDragging)
					this.onDragging(currentRow);

				if ((currentRow) && (this.dragObject != currentRow)) {
					if (movingDown) {
						this.dragObject.parentNode.insertBefore(this.dragObject, currentRow.nextSibling);
					} else {
						this.dragObject.parentNode.insertBefore(this.dragObject, currentRow);
					}
				}
			}
		}

		return false;
	}

	this.onMouseUp = function (ev) {
		if (this.dragObject) {
			if (this.onDrop)
				this.onDrop();

			this.dragObject = null;
		}

		if (ev && ev.preventDefault)
			ev.preventDefault();

		return false;
	}

	// get the mouse offset from the element's position
	this.getMouseOffset = function (target, ev) {
		ev = ev || window.event;

		var docPos    = this.getPosition(target);
		var mousePos  = this.mouseCoords(ev);

		return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
	}

	// get the position of an element by going up the DOM tree and adding up all the offsets
	this.getPosition = function (e) {
		var left = 0;
		var top  = 0;

		// Safari fix
		if (e.offsetHeight == 0) {
			/**
				Safari 2 doesn't correctly grab the offsetTop of a table row
				this is detailed here:
				http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari/
				the solution is likewise noted there, grab the offset of a table cell in the row - the firstChild.
				note that firefox will return a text node as a first child, so designing a more thorough
				solution may need to take that into account, for now this seems to work in firefox, safari, ie
			*/

			e = e.firstChild; // a table cell
		}

		while (e.offsetParent) {
			left += e.offsetLeft;
			top += e.offsetTop;
			e = e.offsetParent;
		}

		left += e.offsetLeft;
		top += e.offsetTop;

		return {x:left, y:top};
	}

	// get the mouse coordinates from the event
	this.mouseCoords = function (ev) {
		if ((ev.pageX) || (ev.pageY)) {
			return {x:ev.pageX, y:ev.pageY};
		}

		return {x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, y:ev.clientY + document.body.scrollTop  - document.body.clientTop};
	}

	// 
	this.findDropTargetRow = function (y) {
		var rows = this.table.rows;

		var i;
		for (i = 0; i < rows.length; i++) {
			var row = rows[i];

			var nodrop = row.getAttribute("NoDrop");
			if ((nodrop == null) || (nodrop == "undefined")) {
				var rowY = this.getPosition(row).y;
				var rowHeight;

				if (row.offsetHeight == 0) {
					rowY = this.getPosition(row.firstChild).y;
					rowHeight = parseInt(row.firstChild.offsetHeight);
				} else {
					rowHeight = parseInt(row.offsetHeight);
				}

				rowHeight /= 2;


				// we need to offset the height a bit because we are inserting before
				if ((y > rowY - rowHeight) && (y < rowY + rowHeight)) {
					return row;
				}
			}
		}

		return null;
	}

	this.endDragging = function () {
		if (this.dragObject != null)
			self.onMouseUp(ev);
	}

	// this function is called when you start dragging a row, so redefine it in your code to do whatever you want
	// takes 0 parameters
	this.onStartDragging = null;

	// this function is called when a row is being dragged, so redefine it in your code to do whatever you want
	// takes 1 parameters: row hovering over in table
	this.onDragging = null;

	// this function is called when you drop a row, so redefine it in your code to do whatever you want
	// takes 0 parameters
	this.onDrop = null;
}

var gvar = new Object();

function GM_ApiBrowserCheck() {
	if (typeof(unsafeWindow) == 'undefined') { unsafeWindow=window; }
	if (typeof(GM_log) == 'undefined') { GM_log = function(msg) { try { unsafeWindow.console.log('GM_log: ' + msg); } catch(e) {} }; }
	GM_clog = function(msg) { if (arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle = function(css) {
		var sel = document.createElement('style');
		sel.setAttribute('type','text/css');
		sel.appendChild(document.createTextNode(css));
		var hel = document.documentElement.firstChild;
		while (hel && hel.nodeName != 'HEAD') { hel=hel.nextSibling; }
		if (hel && hel.nodeName == 'HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	
	var needApiUpgrade=false;

	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera) != 'undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
	}

	if(typeof(GM_setValue) != 'undefined') {
		try {
			var gsv=GM_setValue.toString();
			if (gsv.indexOf('staticArgs') > 0) { gvar.isGreaseMonkey = true; GM_log('GreaseMonkey Api detected...'); }
			else if (gsv.match(/not\s+supported/)) { needApiUpgrade = true; gvar.isBuggedChrome = true; GM_log('Bugged Chrome GM Api detected...'); }
		} catch(e) {
			gvar.isGreaseMonkey = (typeof(GM_setValue) == 'function');
			if (gvar.isGreaseMonkey)
				GM_log('GreaseMonkey Api is assumed because of exception...');
			else
				needApiUpgrade = true;
		}
	} else {
		needApiUpgrade=true; GM_log('No GM Api detected...');
	}

	if(needApiUpgrade) {
		GM_log('Try to recreate needed GM Api...');
 		var ws = null;
		try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error

		if (ws=='object') {
			GM_log('Using localStorage for GM Api.');
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		
		if(typeof(GM_addStyle)=='undefined') { GM_addStyle=function(css) { var heads = document.getElementsByTagName("head"); if (heads.length > 0) { var node = document.createElement("style"); node.type = "text/css"; node.appendChild(document.createTextNode(css)); heads[0].appendChild(node); } } }
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			GM_log('Using XMLHttpRequest for GM Api.');
			GM_xmlhttpRequest=function(obj) {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	}
}

function waitForReady(callback) {
	var docState;
	
	try { docState = unsafeWindow.document.readyState; } catch(e) { docState = null; }
	if(docState) {
		if ((docState != 'complete') && (docState != 'interactive')) {
			window.setTimeout(waitForReady, 150, callback);
			return;
		}
	}
	
	callback();
}

GM_ApiBrowserCheck();
waitForReady(load);