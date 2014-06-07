// ==UserScript==
// @name	Ghost Trappers: Companion List
// @author	Johnny Martin
// @version	1.3
// @description	A script for listing all companions and their stats
// @include	http://apps.facebook.com/ghost-trappers/setup.php?*type=companion*
// ==/UserScript==

var _URLPIC = "http://www.ghost-trappers.com/fb/res/white/companion_";
var _URLICO = "http://www.ghost-trappers.com/fb/res/companion/";
var _SWITCH = "switch_companion_button";
var _ICOPOW = "icon_power_";
var _ICOMYS = "icon_mystic_power_";
var _ICOGBP = "icon_gbp_";
var _ICOXPT = "icon_xp_";
var _ICOATT = "icon_attraction_";
var _ICOMID = "midnight_attraction_icon_companion_";
var _ICOLOT = "loot_icon_companion_";
var _ICOTSC = "icon_tsc_";
var _ICOBUR = "burner_icon_companion_";

GM_addStyle("TD.center { text-align:center; font-weight:bold; font-size:12px; }");
GM_addStyle("TH.center { text-align:center; font-weight:bold; font-size:12px; }");

var currentCompanion = new companion();
var allCompanion = new Array();
var allLink = new Array();
var allElements, thisElement, formElement, imgElement, inputElement;
var tableParent;
var count = 0;
var current = 0;
var userID = "1000000";

var levelHunt = [0, 500, 500, 1500, 2500];
var maxHunt = [0, 4500, 4000, 2500, 0];

function companion() {
	this.id = "?";
	this.level = "?";
	this.power = "?";
	this.mystic = "?";
	this.gbp = "?";
	this.xp = "?";
	this.attraction = "?";
	this.midnight = "?";
	this.loot = "?";
	this.tsc = "?";
	this.burner = "?";
}

function funcToStr(f) {
	var s = '({';
	for (var v in f) {
		s = s + v + ':' + f[v] + ',';
	}
	s = s.substr(0, s.length-1);
	s = s + '})';
	return s;
}

function strToFunc(value) {
	var c = new companion();
	var s = value;
	s = s.substring(s.indexOf("{")+1, s.indexOf("}"));
	var a = s.split(',');
	for (var i = 0; i < a.length; i++) {
		var b = a[i].split(':', 2);
		c[b[0]] = b[1];
	}
	return c;
}

function arrayToStr(a) {
	var s = '[';
	for (var v = 0; v < a.length; v++)
	{
		s = s + a[v] + ',';
	}
	s = s.substr(0, s.length-1);
	s = s + ']';
	return s;
}

function strToArray(value) {
	var a = new Array();
	var s = value;
	s = s.substring(s.indexOf("[")+1, s.indexOf("]"));
	a = s.split(',');
	return a;
}

function checkArray(a) {
	for (var i = a.length - 1; i >= 0; i--) {
		for (var j = 0; j < i - 1; j++) {
			if (a[i] == a[j] || isNaN(parseInt(a[i]))) {
				a.splice(i, 1);
			}
		}
	}
	return a;
}

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// read page - search id of current companion ...

allElements = xpath("//a[@href ='#']");
for (var i = 0; i < allElements.snapshotLength - 1; i++) {
	var s = allElements.snapshotItem(i).parentNode.innerHTML;
	if (s.indexOf(_URLPIC) >= 0) {
		currentCompanion.id = parseInt(s.substring(s.indexOf(_URLPIC) + _URLPIC.length));
		break;
	}
}

// ... id not found -> this player never use companion -> quit script

if (currentCompanion.id == "?") {
	return -1;
}

// read page - extract all other stat of current companion

function innerText(val) {
	while (val.indexOf("<") >= 0 && val.indexOf(">") >= 0)
	{
		var s = val.substring(val.indexOf("<"),  val.indexOf(">")+1);
		val = val.replace(s, "");
	}
	return val;
}

allElements = xpath("//table[@width='324']"); // vulnerable coding!
if (allElements.snapshotLength > 0) {
	thisElement = allElements.snapshotItem(0);
	allElements = thisElement.getElementsByTagName('td');
	for (var i = 0; i < allElements.length - 1; i++) {
		var s = allElements[i].innerHTML;
		if (s.indexOf(_ICOPOW) >= 0) {
			currentCompanion.power = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOMYS) >= 0) { 
			currentCompanion.mystic = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOGBP) >= 0) {
			currentCompanion.gbp = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOXPT) >= 0) {
			currentCompanion.xp = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOATT) >= 0) {
			currentCompanion.attraction = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOMID) >= 0) {
			currentCompanion.midnight = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOLOT) >= 0) {
			currentCompanion.loot = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOTSC) >= 0) {
			currentCompanion.tsc = innerText(allElements[i+1].innerHTML);
		}
		if (s.indexOf(_ICOBUR) >= 0) {
			currentCompanion.burner = innerText(allElements[i+1].innerHTML);
		}
	}

	allElements = xpath("//table[@width='564']"); // vulnerable coding!
	thisElement = allElements.snapshotItem(0);
	allElements = thisElement.getElementsByTagName('div');
	s = allElements[0].parentNode.innerHTML;
	if (s.indexOf("xpbar_full.png") >= 0) {
		i = s.indexOf("width:");
		if (i >= 0) {
			currentCompanion.level = (parseFloat(s.substr(i+6))-4.384)/195.616;
		}
		s = allElements[1].innerHTML;
		i = s.indexOf("/level_");
		if (i >= 0) {
			var level = parseInt(s.substr(i+7));
			var huntLevel = Math.round((1 - currentCompanion.level) * levelHunt[level]);
			var huntMax = huntLevel + maxHunt[level];
			currentCompanion.level = level + currentCompanion.level;
			if (currentCompanion.level >= 5) {
				allElements[1].title = 'This companion has reached maximum level.';
			}
			else {
				allElements[1].title = 'This companion need ' + huntLevel + ' hunts to reach level ' + (level+1) + ', and ' + huntMax + ' hunts to reach maximum level.';
			}
		}
		currentCompanion.level = Math.round(currentCompanion.level*100)/100;
	}
}

// read page - get latest list of companions

allElements = xpath("//table[@width='564']"); // vulnerable coding!
companionTable = allElements.snapshotItem(2);
tableParent = companionTable.parentNode;
allElements = companionTable.getElementsByTagName('td');
for (var i = 0; i < allElements.length; i++) {
	var s = allElements[i].innerHTML;
	if (s.indexOf(_URLICO) >= 0 && s.indexOf(_SWITCH) == -1) {
		var titleIcon = innerText(allElements[i-1].innerHTML);
		if (titleIcon == '1&nbsp;') {
			titleIcon = '';
		}
		else {
			titleIcon = '[' + titleIcon.replace('&nbsp;','') + 'x]';
		}
		var nameComp = allElements[i+1].innerHTML;
		nameComp = innerText(nameComp.substring(0, nameComp.indexOf("</div>")));
		if (nameComp) {
			titleIcon = nameComp + ' ' + titleIcon;
		}
		allCompanion[count] = new companion();
		var newSource = allElements[i].getElementsByTagName('img')[0].src, oldSource;
		formElement = allElements[i+1].getElementsByTagName('form');
		if (formElement.length > 0) {
			inputElement = formElement[0].getElementsByTagName('input');
			for (var j = 0; j < inputElement.length; j++) {
				if (inputElement[j].name == "companion_id") {
					allCompanion[count].id = inputElement[j].value;
				}
			}
			imgElement = formElement[0].getElementsByTagName('img');
			if (imgElement.length > 0) {
				oldSource = imgElement[0].src;
				//imgElement[0].title = allCompanion[count].id;
				imgElement[0].title = titleIcon;
			}
			s = allElements[i+1].innerHTML;
			allLink[count] = s.substring(s.indexOf("<form"), s.indexOf("</form") + 7);
			allLink[count] = allLink[count].replace(oldSource, newSource);
			i++;
		}
		else {
			allCompanion[count] = currentCompanion;
			//allLink[count] = '<img src="' + newSource + '" title="' + allCompanion[count].id + '"/>';
			allLink[count] = '<img src="' + newSource + '" title="' + titleIcon + '"/>';
			current = count;
		}
		var same = false;
		for (var j = 0; j < count; j++) {
			if (allCompanion[j].id == allCompanion[count].id) {
				if (allCompanion[current].id == allCompanion[count].id) {
					current = j;
				}
				same = true;
			}
		}
		if (!same) {
			count = count + 1;
		}
	}
}

// read greasemonkey preference (user data) - extract all saved companion stats

allElements = xpath("//input[@name='fb_sig_user']");
if (allElements.snapshotLength > 0) {
	userID = allElements.snapshotItem(0).value;
}

var pref = GM_getValue(userID + ".config", "");
var comp = new companion();
if (pref) {
	var a = pref.split("|");
	for (var i = 0; i < a.length; i++) {
		comp = strToFunc(a[i]);
		for (var j = 0; j < count; j++) {
			if ((allCompanion[j].id == comp.id) && (j != current)) {
				allCompanion[j] = comp;
			}
		}
	}
}

// sort list base on last visit

function swap(val1, val2) {
	var x = allCompanion[val1];
	allCompanion[val1] = allCompanion[val2];
	allCompanion[val2] = x;
	x = allLink[val1];
	allLink[val1] = allLink[val2];
	allLink[val2] = x;
}

var order = GM_getValue(userID + ".sort", "");
if (order) {
	order = checkArray(strToArray(order));
	var step = 0;
	for (var i = 0; i < order.length; i++) {
		for (var j = 0; j < count; j++) {
			if (allCompanion[j].id == order[i]) {
				swap(j, step);
				step++;
			}
		}
	}
}

// build new companion table

function buildTable() {
	var html = '<a name="."></a><table border="1" cellpadding="0" cellspacing="0"><tbody>';
	var th = '<th class="center" width=45>';
	var td = '<td class="center">';
	for (var i = 0; i < count; i++) {
		if (i/10 == Math.round(i/10)) {
			var first = "<br>";
			if (i == 0) {
				first = '<a href="#." id="load_order">Load</a><br>----<br><a href="#." id="save_order">Save</a>';
			}
			html = html + '<tr>' + th + '&nbsp;<br>' + first + '<br>&nbsp;</th>' +
			th + '<a href="#." class="xcol" name="lvl">Lv.</a></th>' +
			th + '<a href="#." class="xcol" name="pow"><img src="' + _URLICO + _ICOPOW + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="mys"><img src="' + _URLICO + _ICOMYS + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="gbp"><img src="' + _URLICO + _ICOGBP + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="xpt"><img src="' + _URLICO + _ICOXPT + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="att"><img src="' + _URLICO + _ICOATT + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="mid"><img src="' + _URLICO + _ICOMID + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="lot"><img src="' + _URLICO + _ICOLOT + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="tsc"><img src="' + _URLICO + _ICOTSC + 'on.png"></a></th>' +
			th + '<a href="#." class="xcol" name="bur"><img src="' + _URLICO + _ICOBUR + 'on.png"></a></th></tr>';
		}
		var level = allCompanion[i].level;
		if (level >= 5) {
			level = '<div style="color:#c00000; ">MAX</div>';
		}
		var j = i - 3;
		if (j < 0) {
			j = 0;
		}
		html = html + '<tr><td valign="top"><a name="' + i + '"></a>' + allLink[i] + '</td>' +
		td + '<a href="#' + j + '" class="xrow" name="' + i + '">' + level + '</a></td>' +
		td + allCompanion[i].power + '</td>' +
		td + allCompanion[i].mystic + '</td>' +
		td + allCompanion[i].gbp + '</td>' +
		td + allCompanion[i].xp + '</td>' +
		td + allCompanion[i].attraction + '</td>' +
		td + allCompanion[i].midnight + '</td>' +
		td + allCompanion[i].loot + '</td>' +
		td + allCompanion[i].tsc + '</td>' +
		td + allCompanion[i].burner + '</td></tr>';
	}
	html = html + '</table>';
	var table = document.createElement("table");
	table.innerHTML = html;
	tableParent.replaceChild(table, companionTable);
	companionTable = table;

// add sort module

	allElements = xpath("//a[@class='xcol']");
	for (var i = 0; i < allElements.snapshotLength; i++) {
		allElements.snapshotItem(i).addEventListener('click', sortTable, false);
	}
	allElements = xpath("//a[@class='xrow']");
	for (var i = 0; i < allElements.snapshotLength; i++) {
		allElements.snapshotItem(i).addEventListener('click', upTable, false);
	}
	document.getElementById("load_order").addEventListener('click', loadOrder, false);
	document.getElementById("save_order").addEventListener('click', saveOrder, false);

// save sort order

	var order = new Array();
	for (var i = 0; i < allCompanion.length; i++) {
		order[i] = allCompanion[i].id;
	}
	GM_setValue(userID + ".sort", arrayToStr(order));
}

window.sortTable = function() {
	var test;
	for (var i = 0; i < count - 1; i++) {
		for (var j = 0; j < count - 1; j++) {
			switch (this.name) {
				case "lvl": test = allCompanion[j].level < allCompanion[j+1].level; break;
				case "pow": test = allCompanion[j].power < allCompanion[j+1].power; break;
				case "mys": test = allCompanion[j].mystic < allCompanion[j+1].mystic; break;
				case "gbp": var t1 = parseInt(allCompanion[j].gbp);
					var t2 = parseInt(allCompanion[j+1].gbp);
					if (!t1) { t1 = 0; }
					if (!t2) { t2 = 0; }
					test = t1 < t2;
					break;
				case "xpt": var t1 = parseInt(allCompanion[j].xp);
					var t2 = parseInt(allCompanion[j+1].xp);
					if (!t1) { t1 = 0; }
					if (!t2) { t2 = 0; }
					test = t1 < t2;
					break;
				case "att": test = allCompanion[j].attraction < allCompanion[j+1].attraction; break;
				case "mid": test = allCompanion[j].midnight < allCompanion[j+1].midnight; break;
				case "lot": test = allCompanion[j].loot < allCompanion[j+1].loot; break;
				case "tsc": test = allCompanion[j].tsc < allCompanion[j+1].tsc; break;
				case "bur": test = allCompanion[j].burner < allCompanion[j+1].burner; break;
				default   : test = false;
			}
			if (test) {
				swap(j, j+1);
			}
		}
	}
	buildTable()
}

window.upTable = function() {
	if (this.name > 0) {
		swap(this.name, this.name - 1);
		buildTable()
	}
}

window.loadOrder = function() {
	var order = GM_getValue(userID + ".order", "");
	if (order) {
		order = checkArray(strToArray(order));
		var step = 0;
		for (var i = 0; i < order.length; i++) {
			for (var j = 0; j < count; j++) {
				if (allCompanion[j].id == order[i]) {
					swap(j, step);
					step++;
				}
			}
		}
		buildTable()
	}
}

window.saveOrder = function() {
	var order = new Array();
	for (var i = 0; i < allCompanion.length; i++) {
		order[i] = allCompanion[i].id;
	}
	GM_setValue(userID + ".order", arrayToStr(order));
	alert("List saved!");
}

buildTable();

// write greasemonkey preference (user data) - save latest stat

pref = funcToStr(allCompanion[0]);
for (var i = 1; i < allCompanion.length; i++) {
	pref = pref + "|" + funcToStr(allCompanion[i]);
}
GM_setValue(userID + ".config", pref);