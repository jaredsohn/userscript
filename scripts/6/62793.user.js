// ==UserScript==
// @name           BvS Quickfield
// @namespace      http://userscripts.org/users/dtkarlsson
// @include        http://*animecubed.com/billy/bvs/villagefields*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson
// @version        1.0.0
// @history        1.0.0 Changed to a more console-y design
// @history        1.0.0 Simplified field reordering
// @history        1.0.0 Script now calculates field difficulty range
// @history        1.0.0 Minor tweaks here and there
// @history        0.3.0 Added key reordering by drag and drop
// @history        0.2.0 Change from GM_set/getValue to DOM Storage API
// @history        0.2.0 Redesigned the UI
// ==/UserScript==
if (ScriptUpdater)
	ScriptUpdater.check(62793, "1.0.0");

/*
	DOM Storage wrapper class
	Constructor:
		var store = new DOMStorage({"session"|"local"}, [<namespace>]);
	Set item:
		store.setItem(<key>, <value>);
	Get item:
		store.getItem(<key>[, <default value>]);
	Remove item:
		store.removeItem(<key>);
	Get all keys in namespace as array:
		var array = store.keys();
*/
function DOMStorage(type, namespace)
{
	var my = this;
	
	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}
	
	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			return def;
		}
	}
	my.removeItem = function(key) {
		try {
			// Kludge, avoid Firefox crash
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			GM_log(e);
		}
	}
	my.keys = function() {
		// Return array of all keys in this namespace
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0)
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				break;
			}
			i++;
		} while (true);
		return arr;
	}
}
var DS = new DOMStorage("local", "BvSQuickfield");

const KEYDIFF = {
	simple: 0, training: 0, aquafield: 0,
	dimlylit: 5, crumbling: 5, dealersroom: 5,
	blaring: 10, hairy: 10, parkinglot: 10,
	pulsating: 15, worst: 15, core: 15,
	hidden: 20, forbidden: 20, holyground: 20,
	raging: 25, passionate: 25, melody: 25,
	cursed: 40, filthy: 40, noodleshop: 40,
	chosen: 60, hopeless: 60, nothingness: 60,
	brilliant: 65, delicious: 65, dancefloor: 65,
	beautiful: 70, passedover: 70, touchstone: 70,
	corrupted: 80, despaired: 80, paradise: 80,
	sickened: 100, imprisoned: 100, fallenangel: 100
};

function Field()
{
	var my = this;

	my.keys = [];
	my.notes = "";
	
	my.unpack = function(str) {
		if (!str || typeof(str) != "string")
			return false;
		// Restore from string "<key>|<key>|<key>|<notes>"
		var match = str.match(/(.*)\|(.*)\|(.*)\|(.*)/);
		if (match) {
			var field = new Field();
			my.keys = [];
			my.keys[0] = match[1];
			my.keys[1] = match[2];
			my.keys[2] = match[3];
			my.notes = match[4];
			return true;
		}
		return false;
	}
	my.pack = function() {
		// Return string "<key>|<key>|<key>|<notes>"
		return my.keys.join("|") + "|" + my.notes;
	}
	my.difficulty = function() {
		return KEYDIFF[keyStyle(my.keys[0])] + KEYDIFF[keyStyle(my.keys[1])] +
			KEYDIFF[keyStyle(my.keys[2])];
	}
}

function FieldList()
{
	var my = this;
	
	my.fields = [];
	my.load = function(store) {
		my.fields = [];
		var keys = store.keys();
		for (var i in keys) {
			if (/field(\d+)/.test(keys[i])) {
				var index = parseInt(RegExp.lastParen);
				var field = new Field();
				if (field.unpack(store.getItem(keys[i])))
					my.fields[index] = field;
				else
					store.removeItem(keys[i]);
			} else
				store.removeItem(keys[i]);
		}
	}
	my.save = function(store) {
		var keys = store.keys();
		for (var i in keys)
			store.removeItem(keys[i]);
		var i = 0;
		for (var j in my.fields) {
			store.setItem("field" + i, my.fields[j].pack());
			i++;
		}
	}
}
var FIELDLIST = new FieldList();
FIELDLIST.load(DS);

// Event handlers

// Update Add button and difficulty hint
function updateDifficulty()
{
	var f = new Field();
	f.keys = getField();

	var dnode = document.evaluate("//form/font/table/tbody/tr/td[@colspan='2']", document, null, 
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (dnode) {
		var d = f.difficulty();
		var sta = dnode.textContent.replace(/Stamina.*/, "Stamina");
		dnode.textContent = sta + ", Difficulty: " + d + " - " + (d + 5) + ")";
	}

	var button = document.getElementById("addfield");
	if (button)
		button.textContent = "Add " + f.keys.join(" - ");
}

function buttonClick(event)
{
	var id = event.target.getAttribute("id");
	if (/remove(\d+)/.test(id)) {
		var index = parseInt(RegExp.lastParen);
		removeField(index);
	} else if (/setfield(\d+)/.test(id)) {
		var index = parseInt(RegExp.lastParen);
		setField(FIELDLIST.fields[index].keys);
		updateDifficulty();
	} else if (/addfield/.test(id)) {
		addField();
	}
}

var dragging = null;
var hover = null;
var prevHover = null;
function mousedownEvent(event)
{
	// Find td with class = "key"
	var cl = event.target.getAttribute("class");
	if (!/key/.test(cl))
		return;

	// Get parent tr
	dragging = event.target.parentNode;
	event.preventDefault();
	window.addEventListener('mouseup', mouseupEvent, true);
	window.addEventListener('mousemove', moveEvent, true);
}

function moveEvent(event)
{
	if (!dragging)
		return;
	event.preventDefault();
	var cl = event.target.getAttribute("class");
	if (!/key/.test(cl)) {
		window.removeEventListener('mouseup', mouseupEvent, true);
		window.removeEventListener('mousemove', moveEvent, true);
		dragging = null;
		hover = null;
		prevHover = null;
	}
	hover = event.target.parentNode;

	var r1 = parseInt(dragging.id.replace(/row/, ""));
	var r2 = parseInt(hover.id.replace(/row/, ""));
	if (r1 != r2) {
		var f = FIELDLIST.fields[r1];
		FIELDLIST.fields[r1] = FIELDLIST.fields[r2];
		FIELDLIST.fields[r2] = f;
		FIELDLIST.save(DS);
		updateTable();
		dragging = hover;
	}
}

function mouseupEvent(event)
{
	if (!dragging)
		return;
	window.removeEventListener('mouseup', mouseupEvent, true);
	window.removeEventListener('mousemove', moveEvent, true);

	dragging = null;
	hover = null;
	prevHover = null;
}

// UI

// Return currently selected item from dropdown
function getSelectedItem(xpath)
{
	var dropdown = document.evaluate(xpath, document, null, 
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	return dropdown.options[dropdown.selectedIndex].text;
}

// Current field keys
function getField()
{
	var keys = [];
	keys[0] = getSelectedItem("//select[@name='key_1']");
	keys[1] = getSelectedItem("//select[@name='key_2']");
	keys[2] = getSelectedItem("//select[@name='key_3']");
	return keys;
}

// Set field keys
function setField(keys)
{
	for (var i = 0; i < 3; i++) {
		var dropdown = document.evaluate("//select[@name='key_" + (i + 1) + "']", document,
			null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
		for (var j in dropdown.options)
			if (dropdown.options[j].text == keys[i]) {
				dropdown.selectedIndex = j
				break;
			}
	}
	uselessCrap(keys, "cd ");
}

// Add a field to DB
function addField(keys)
{
	if (!keys)
		keys = getField();

	var notes = prompt("Notes for " + keys.join(" - "), "-");
	if (notes) {
		var field = new Field();
		field.keys = keys;
		field.notes = notes;
		FIELDLIST.fields.push(field);
		FIELDLIST.save(DS);
		updateTable();
		uselessCrap(keys, "mkdir -p ");
	}
}

// Change field notes
function changeNotes(index)
{
	var notes = prompt("Notes for " + FIELDLIST.fields[index].keys.join(" - "),
		FIELDLIST.fields[index].notes);
	if (notes) {
		FIELDLIST.fields[index].notes = notes;
		FIELDLIST.save(DS);
		updateTable();
	}
}

// Remove a field from DB
function removeField(index)
{
	if (FIELDLIST.fields[index] && confirm("Remove field " + FIELDLIST.fields[index].keys.join(" - ") + "?")) {
		var keys = FIELDLIST.fields[index].keys;
		FIELDLIST.fields.splice(index, 1);
		FIELDLIST.save(DS);
		updateTable();
		uselessCrap(keys, "rm -rf ");
	}
}

// Create the UI table
function createTable()
{
	var addtable = document.getElementById("quickfield");
	if (!addtable) {
		addtable = document.createElement("table");
		addtable.setAttribute("id", "quickfield");
		addtable.innerHTML = '<caption><span id="cli">//Quickfield</span>' +
			'<span class="blink">_</span></caption>' +
			'<col width="auto"/><col/><col/><col/>' +
			'<col/><col width="auto"/><thead><tr><td/><td>Key 1</td><td>Key 2</td>' +
			'<td>Key 3</td><td>Notes</td><td/></tr></thead><tfoot><tr><td colspan="6">' +
			'<div id="addfield">Add Field</div></td></tr></tfoot><tbody/>';
	}

	var form = document.evaluate("//form[@name='field']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	form.parentNode.appendChild(addtable);
	
	document.getElementById("addfield").addEventListener('click', buttonClick, false);

	updateTable();
}

// Helper: create TD with class=cls and style=sty
function tableData(html, cls, sty)
{
	var td = document.createElement("td");
	td.innerHTML = html;
	if (cls)
		td.setAttribute("class", cls);
	if (sty)
		td.setAttribute("style", sty);
	return td;
}

// Helper: remove non-alpha characters and convert to lower case
function keyStyle(key)
{
	if (key) {
		return key.replace(/\W/g, "").toLowerCase();
	}
	return "";
}

// Create a div with class="button" and attach eventlistener
function createButton(text, id, onclick)
{
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(text));
	div.setAttribute("class", "button");
	div.setAttribute("id", id);
	div.addEventListener('click', onclick, false);
	return div;
}

// Create a field row
function tableRow(n, key1, key2, key3, notes)
{
	n = parseInt(n);
	var tr = document.createElement("tr");
	tr.setAttribute("id", "row" + n);
	
	var td = document.createElement("td");
	var b = createButton("X", "remove" + n, buttonClick);
	b.setAttribute("title", "Remove Field");
	td.appendChild(b);
	tr.appendChild(td);
	tr.appendChild(tableData(key1, "key " + keyStyle(key1)));
	tr.appendChild(tableData(key2, "key " + keyStyle(key2)));
	tr.appendChild(tableData(key3, "key " + keyStyle(key3)));

	td = document.createElement("td");
	td.setAttribute("class", "notes");
	td.appendChild(document.createTextNode(notes));
	td.addEventListener('mousedown', function(event) {changeNotes(n);}, false);
	tr.appendChild(td);
	
	td = document.createElement("td");
	b = createButton("Set", "setfield" + n, buttonClick);
	b.setAttribute("title", "Set Field");
	td.appendChild(b);
	tr.appendChild(td);

	return tr;
}

// Updates UI table, creates and removes rows if needed
function updateTable()
{
	var tbody = document.getElementById("quickfield").getElementsByTagName("tbody")[0];
	tbody.innerHTML = "";
	
	var i;
	for (i in FIELDLIST.fields) {
		var tr = document.getElementById("row" + i);
		if (tr) {
			// Row exists, update content
			var tds = tr.getElementsByTagName("td");
			for (var k = 0; k < 3; k++) {
				tds[k + 1].textContent = FIELDLIST.fields[i].keys[k];
				tds[k + 1].setAttribute("class",  "key " + keyStyle(FIELDLIST.fields[i].keys[k]));
			}
			tds[4].textContent = FIELDLIST.fields[i].notes;
			tds[4].setAttribute("title", "Difficulty: " + FIELDLIST.fields[i].difficulty() + " - " +
				(FIELDLIST.fields[i] + 5));
		} else {
			// Create new row
			tr = tableRow(i, FIELDLIST.fields[i].keys[0], FIELDLIST.fields[i].keys[1],
				FIELDLIST.fields[i].keys[2], FIELDLIST.fields[i].notes);
			tr.getElementsByTagName("td")[4].setAttribute("title",
				"Difficulty: " + FIELDLIST.fields[i].difficulty() + " - " +
				(FIELDLIST.fields[i].difficulty() + 5));
			tbody.appendChild(tr);
		}
	}
	// Remove remaining rows
	do {
		var tr = document.getElementById("row" + (++i));
		if (tr)
			tr.parentNode.removeChild(tr);
	} while (tr);
}

var tehStuff = {};
function uselessCrap(keys, pre)
{
	if (tehStuff.timer)
		clearTimeout(tehStuff.timer);
	tehStuff.i = 0;
	tehStuff.str = pre;
	if (keys)
		tehStuff.str += keys.join("/").replace(/\s/g, "_").toLowerCase().replace(/[^a-z_\/]/g, "");
	tehStuff.el = document.getElementById("cli");
	tehStuff.timer = setTimeout(moarCrap, 100);
}
function moarCrap()
{
	if (tehStuff.i > tehStuff.str.length) {
		tehStuff.timer = null;
	} else {
		tehStuff.el.textContent = "# " + tehStuff.str.substr(0, tehStuff.i++);
		tehStuff.timer = setTimeout(moarCrap, 100);
	}
}

GM_addStyle("table#quickfield {width: 100%; background-color: black; color: rgb(33%, 100%, 0%); border-collapse: collapse; font-size: 12px;}");
GM_addStyle("#quickfield thead {font-weight: bold;}");
GM_addStyle("#quickfield caption {background-color: black; font-size: 18px; font-weight: bold; margin-top: 6px;}");
GM_addStyle("#quickfield td {border: 1px solid black; text-align: center;}");
GM_addStyle("#quickfield input {width: auto;}");
GM_addStyle("#quickfield td.key {font-variant: small-caps; cursor: move;}");
GM_addStyle("#quickfield td.notes {color: rgb(100%, 66%, 0%); cursor: pointer;}");
GM_addStyle("#addfield {border: 1px solid rgb(25%, 75%, 0%); background-color: black; color: rgb(25%, 75%, 0%); cursor: pointer;}");
GM_addStyle("#addfield:hover {border: 1px solid rgb(33%, 100%, 0%); background-color: rgb(16%, 50%, 0%); color: rgb(33%, 100%, 0%);}");
GM_addStyle("div.button {border: 1px solid rgb(25%, 75%, 0%); background-color: black; color: rgb(25%, 75%, 0%); cursor: pointer;}");
GM_addStyle("div.button:hover {border: 1px solid rgb(33%, 100%, 0%); background-color: rgb(16%, 50%, 0%); color: rgb(33%, 100%, 0%);}");
GM_addStyle("span.blink {text-decoration: blink;}"); // YA RLY

// tier 1 key style
GM_addStyle(".simple {color: #FFFFFF; background-color: #006600;}");
GM_addStyle(".training {color: #FFFFFF; background-color: #006666;}");
GM_addStyle(".aquafield {color: #FFFFFF; background-color: #006600;}");

// tier 2 key style
GM_addStyle(".dimlylit {color: #FFFFFF; background-color: #006666;}");
GM_addStyle(".crumbling {color: #FFFFFF; background-color: #006600;}");
GM_addStyle(".dealersroom {color: #FFFFFF; background-color: #006666;}");

// tier 3 key style
GM_addStyle(".blaring {color: #FFFFFF; background-color: #660000;}");
GM_addStyle(".hairy {color: #FFFFFF; background-color: #660000;}");
GM_addStyle(".parkinglot {color: #FFFFFF; background-color: #660000;}");

// tier 4 key style
GM_addStyle(".pulsating {color: #FFFFFF; background-color: #666600;}");
GM_addStyle(".worst {color: #FFFFFF; background-color: #663300;}");
GM_addStyle(".core {color: #FFFFFF; background-color: #666666;}");

// tier 5 key style
GM_addStyle(".hidden {color: #000000; background-color: #CCCC00;}");
GM_addStyle(".forbidden {color: #000000; background-color: #CCCC00;}");
GM_addStyle(".holyground {color: #000000; background-color: #CCCC00;}");

// tier 6 key style
GM_addStyle(".raging {color: #000000; background-color: #CC0000;}");
GM_addStyle(".passionate {color: #000000; background-color: #CC0000;}");
GM_addStyle(".melody {color: #000000; background-color: #CC0000;}");

// tier 7 key style
GM_addStyle(".cursed {color: #FFFFFF; background-color: #006666;}");
GM_addStyle(".filthy {color: #FFFFFF; background-color: #006666;}");
GM_addStyle(".noodleshop {color: #FFFFFF; background-color: #006666;}");

// tier 8 key style
GM_addStyle(".chosen {color: #FFFFFF; background-color: #000000;}");
GM_addStyle(".hopeless {color: #FFFFFF; background-color: #000000;}");
GM_addStyle(".nothingness {color: #FFFFFF; background-color: #000000;}");

// tier 9 key style
GM_addStyle(".brilliant {color: #FFFFCC; background-color: #666600;}");
GM_addStyle(".delicious {color: #FFFFCC; background-color: #666600;}");
GM_addStyle(".dancefloor {color: #FFFFCC; background-color: #666600;}");

// tier 10 key style
GM_addStyle(".beautiful {color: #FFCCCC; background-color: #660000;}");
GM_addStyle(".passedover {color: #FFCCCC; background-color: #660000;}");
GM_addStyle(".touchstone {color: #FFCCCC; background-color: #660000;}");

// tier 11 key style
GM_addStyle(".corrupted {color: #660000; background-color: #FF5555;}");
GM_addStyle(".despaired {color: #660000; background-color: #FF5555;}");
GM_addStyle(".paradise {color: #660000; background-color: #FF5555;}");

// tier 12 key style
GM_addStyle(".sickened {color: #222222; background-color: #DDDDDD;}");
GM_addStyle(".imprisoned {color: #222222; background-color: #DDDDDD;}");
GM_addStyle(".fallenangel {color: #222222; background-color: #DDDDDD;}");

createTable();
document.getElementById("quickfield").addEventListener('mousedown', mousedownEvent, true);
for (var i = 1; i < 4; i++) {
	var input = document.evaluate("//select[@name='key_" + i + "']", document, null,
		XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (input)
		input.addEventListener('change', updateDifficulty, false);
}
updateDifficulty();
