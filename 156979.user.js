// ==UserScript==
// @name        BvS Field Helper
// @namespace   sa'saren
// @description Shows a clickable list of the fixed fields available to the BvS player in the fields part of BvS.
// @include     http://www.animecubed.com/billy/bvs/villagefields.html
// @include     http://animecubed.com/billy/bvs/villagefields.html
// @include     http://www.animecubed.com/billy/bvs/pages/main.html
// @include     http://animecubed.com/billy/bvs/pages/main.html
// @grant       GM_log
// @version     1.0.0
// @history     1.0.0 Initial release.
// ==/UserScript==

var GM_Debug = false;
var log = function(msg) {
};
if(GM_Debug) {
	if ( GM_log ) {
		log = function(msg) { GM_log(msg); }
	}
}

function getSingleNode(xpath) {
	try {
		var dnode = document.evaluate(xpath, document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
		if ( dnode ) {
			return dnode.singleNodeValue;
		}
	} catch (ex) {
		log("error: could not locate single node using xpath: " + xpath);
	}
	return null;
}

var storage = sessionStorage;
// Detect and store player ID on main page
if ( document.location.href.indexOf("billy/bvs/pages/main.html") != -1 ) {
	var rankId = getSingleNode("//a[contains(@href, '/billy/bvs/playerstandings.html')]");
	var href = rankId.getAttribute("href");
	var result = /.*rankid=([0-9]+)/.exec(href);
	if ( result && result.length > 1 ) {
		playerId = parseInt(result[1], 10);
		if ( typeof(playerId) == "number" ) {
			storage.setItem("playerID", playerId);
		}
	}
} else if ( document.location.href.indexOf("billy/bvs/villagefields.html") != -1 ) {

const KEYDIFFICULTY = {
	"Simple": 0, "Training": 0, "Aqua Field": 0,
	"Dimly Lit": 5, "Crumbling": 5, "Dealer's Room": 5,
	"Blaring": 10, "Hairy": 10, "Parking Lot": 10,
	"Pulsating": 15, "Worst": 15, "Core": 15,
	"Hidden": 20, "Forbidden": 20, "Holy Ground": 20,
	"Raging": 25, "Passionate": 25, "Melody": 25,
	"Cursed": 40, "Filthy": 40, "Noodle Shop": 40,
	"Chosen": 60, "Hopeless": 60, "Nothingness": 60,
	"Brilliant": 65, "Delicious": 65, "Dance Floor": 65,
	"Beautiful": 70, "Passed Over": 70, "Touchstone": 70,
	"Corrupted": 80, "Despaired": 80, "Paradise": 80,
	"Sickened": 100, "Imprisoned": 100, "Fallen Angel": 100
};

function Field(name, key1, key2, key3) {
	this.name = name;
	this.key1 = key1;
	this.key2 = key2;
	this.key3 = key3;
}

Field.prototype.translateKeyToDifficulty = function(key) { return KEYDIFFICULTY[key]; };
Field.prototype.getBaseDifficulty = function() { return this.translateKeyToDifficulty(this.key1)+this.translateKeyToDifficulty(this.key2)+this.translateKeyToDifficulty(this.key3); };
Field.prototype.getAddress = function() { return this.key1 + ", " + this.key2 + ", " + this.key3; };
Field.prototype.toString = function() { return this.name + " (" + this.getAddress() + "), base difficulty = " + this.getBaseDifficulty(); };

var fields = [
	new Field("Recompiling", "Simple", "Training", "Dealer's Room"),
	new Field("Purchase R00t powers", "Dimly Lit", "Crumbling", "Dealer's Room"),
	new Field("Bit Shop","Blaring","Hairy","Parking Lot"),
	new Field("The Last Bastion of Purity","Hidden","Forbidden","Holy Ground"),
	new Field("Overture","Raging","Passionate","Melody"),
	new Field("Hunt and Hack Someone","Cursed","Filthy","Noodle Shop"),
	new Field("The Endless Blizzard","Chosen","Hopeless","Nothingness"),
	new Field("Essences","Brilliant","Delicious","Dance Floor"),
	new Field("Lost Weapons","Beautiful","Passed Over","Touchstone"),
	new Field("The Black Altar","Sickened","Imprisoned","Fallen Angel"),
	new Field("Dance Floor of Destiny","Pulsating","Passionate","Dance Floor")
];

var playerId = storage.getItem("playerID");
if ( playerId ) { 
	var grindSource = [
		new Field("Grind Source", "Simple", "Hairy", "Core"),
		new Field("Grind Source", "Dimly Lit", "Worst", "Parking Lot"),
		new Field("Grind Source", "Blaring", "Training", "Dealer's Room"),
		new Field("Grind Source", "Pulsating", "Crumbling", "Aqua Field"),
		new Field("Grind Source", "Hidden", "Filthy", "Nothingness"),
		new Field("Grind Source", "Raging", "Hopeless", "Noodle Shop"),
		new Field("Grind Source", "Cursed", "Forbidden", "Melody"),
		new Field("Grind Source", "Chosen", "Passionate", "Holy Ground")
	];
	fields.push(grindSource[playerId % 8]);
}

/*
fields.push(new Field("Endgame Grind", "Sickened", "Imprisoned", "Parking Lot"));
*/

function generateElementContaining(element, innerElement) {
	var root = document.createElement(element);
	root.appendChild(innerElement);
	return root;
}

var elementListeners = {};

function generateElementWithText(element, text, id, onClickHandler, style) {
	var root = document.createElement(element);
	root.appendChild(document.createTextNode(text));
	if ( id ) {
		root.setAttribute("id", id);
	}
	if ( style ) {
		root.setAttribute("style", style);
	}
	if ( onClickHandler ) {
		root.addEventListener('click', onClickHandler, false);
		if ( !elementListeners[onClickHandler]) {
			var arr = [];
			elementListeners[onClickHandler] = arr;
		}
		elementListeners[onClickHandler].push(root);
	}
	return root;
}

function generateFieldListHeader() {
	var root = document.createElement("tr");
	root.appendChild(generateElementWithText("th", "Field"));
	root.appendChild(generateElementWithText("th", "Address"));
	root.appendChild(generateElementWithText("th", "Difficulty"));
	return root;
}

function generateFieldEntry(field, onClickHandler, style) {
	var root = document.createElement("tr");
	if ( style ) { root.setAttribute("style", style); }
	var id = field.name + "#" + field.getAddress().replace(/, /g, "#");
	var addressStyle = "font-size: 8px;";
	root.appendChild(generateElementWithText("td", field.name, id, onClickHandler));
	root.appendChild(generateElementWithText("td", field.getAddress(), id, onClickHandler, addressStyle));
	root.appendChild(generateElementWithText("td", field.getBaseDifficulty(), id, onClickHandler, "text-align: right;"));
	return root;
}

function getFieldOption(fieldName) {
	return getSingleNode('//option[contains(text(), "'+fieldName+'")]');
}

function setField(fieldName) {
	var dnode = getFieldOption(fieldName);
	if ( dnode ) { 
		dnode.selected = true;
		return true;
	} else {
		log("could not find field " + fieldName);
		return false;
	}
}

function removeListeners(elementListeners) {
	for(var handler in elementListeners) {
		var arr = elementListeners[handler];
		if ( typeof(handler) == "function" && typeof(arr) == "object" && typeof(arr.length) == "number" ) {
			for(var i = 0; i < arr.length; i += 1) {
				arr[i].removeEventListener('click', handler, false);
			}
		}
	}
}

function clickOnElement(element) {
	if(document.createEvent) {
		var click = document.createEvent("MouseEvents");
		click.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
		element.dispatchEvent(click);
		element.focus();
	} else if(document.documentElement.fireEvent) {
		element.fireEvent("onclick");
		element.focus();
	}
}

function onClickHandler(event) {
	var id = event.target.getAttribute("id");
	if ( id ) {
		var fields = id.split("#");
		var foundAll = true;
		for(var i = 1; i < fields.length; i += 1) {
			foundAll = foundAll && setField(fields[i]);
		}
		if (foundAll) {
			var link = getSingleNode("//text()[contains(., 'Change Fields')]/ancestor::a[1]");
			if ( link ) {
				removeListeners(elementListeners);
				clickOnElement(link);
			}
		}
		
	}
}

function generateFieldList(fields) {
	var root = document.createElement("div");
	var fieldRoot = document.createElement("table");
	fieldRoot.setAttribute("style", "border-width: 2px; border-color: black; border-style: solid;");
	root.appendChild(fieldRoot);
	fieldRoot.appendChild(generateFieldListHeader());
	var style = [];
	style.push("background-color: #C0EFC5;");
	style.push("background-color: #DCF8DB;");
	for(var fieldIndex in fields) {
		var field = fields[fieldIndex];
		if ( getFieldOption(field.key1) && getFieldOption(field.key2) && getFieldOption(field.key3) ) {
			
			var entry = generateFieldEntry(field, onClickHandler, style[fieldIndex % style.length]);
			fieldRoot.appendChild(entry);
		}
	}
	return root;
}
var fieldRoot = generateFieldList(fields);
var fieldForm = getSingleNode("//form[@name = 'field']");
fieldForm.parentNode.insertBefore(fieldRoot, fieldForm.nextSibling);
}