// ==UserScript==
// @name				DSoverviewFilter
// @author				
// @namespace			none
// @description			Mit diesem Script können sämtliche Übersichten nach beliebigen Eingaben gefiltert werden
// @include			http://de*.die-staemme.de/game.php*screen=overview_villages*
// ==/UserScript==



Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return "\"" + x + "\"";
		}
	}
	
	return false;
}

// Aequivalent zu document.getElemntById()
function gid(id) { 
	return document.getElementById(id);
}

// Aequivalent zu document.createElement()
function _$(kind) {
	return document.createElement(kind);
}

// Xpath
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

// Erstellt ein Eingabefeld fuer den Suchstring und fuegt es in der Seite ein
function createField() {
	// Die Art von Uebersicht auslesen
	var mode = (location.href.match(/mode/)) ? location.href.split("mode=")[1].replace(/&.+/, "") : document.getElementById("overview").value;
	
	/* Die Stelle ermitteln, wo die Elemente eingefuegt werden sollen */
	if(mode == "units") {
		var tab = _evaluate('//span[contains(@id, "label_")]/parent::td/parent::tr/parent::tbody')[0];
	} else {
		var tab = _evaluate('//tr[contains(@class, "row_")]/parent::tbody')[0];
	}
	
	var row = _$("tr");
	tab.insertBefore(row, tab.firstChild);
	
	var cell = _$("td");
	cell.setAttribute("colspan", tab.getElementsByTagName("th").length);
	cell.innerHTML = "Filter: ";
	row.appendChild(cell);
	
	var field_filter = _$("input");
	field_filter.type = "text";
	field_filter.id = "filter";
	field_filter.setAttribute('onkeyup', '(' + searchForString + ')();');
	cell.appendChild(field_filter);
	cell.innerHTML += "&nbsp;";
	
	var field_ambit = _$("input");
	field_ambit.type = "text";
	field_ambit.size = "3";
	field_ambit.id = "ambit";
	field_ambit.disabled = "true";
	field_ambit.setAttribute('onkeyup', '(' + searchForString + ')();');
	cell.appendChild(field_ambit);
	cell.innerHTML += " Felder Umkreis &nbsp; ";
	
	var label_regexp = _$("label");
	cell.appendChild(label_regexp);
	
	var check_regexp = _$("input");
	check_regexp.type = "checkbox";
	check_regexp.id = "regexp";
	check_regexp.checked = "false";
	check_regexp.setAttribute('onchange', "(" + searchForString + ")();");
	label_regexp.appendChild(check_regexp);
	label_regexp.innerHTML += " RegExp";
	
	/* Ein Element erstellen, dass kennzeichnet, dass dieses Script auf dem Rechner laeuft */
	var field = _$("input");
	field.type = "hidden";
	field.id = "dsoverviewfilter";
	field.value = "true";
	document.getElementById("overview").parentNode.insertBefore(field, document.getElementById("overview"));
}

/* Durchsucht s�mtliche Zeilen der �bersicht nach dem Suchstring. Falls eine Zeile keine Treffer liefert, wird diese unsichtbar gemacht */
function searchForString() {
	// Xpath
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
	
	// Die Art von Uebersicht auslesen
	var mode = (location.href.match(/mode/)) ? location.href.split("mode=")[1].replace(/&.+/, "") : document.getElementById("overview").value;
	
	/* Die Stelle ermitteln, wo die Elemente eingefuegt werden sollen */
	if(mode == "units") {
		var rows = _evaluate('//span[contains(@id, "label_")]/parent::td/parent::tr');
	} else {
		var rows = _evaluate('//tr[contains(@class, "row_")]');
	}
	
	/* Falls im Suchstring Koordinaten enthalten sind, das Umkreis-Feld aktivieren andernfalls leer machen und deaktivieren */
	if(gid("filter").value == gid("filter").value.match(/\b\d{1,3}\|\d{1,3}\b/)) {
		gid("ambit").removeAttribute("disabled");
	} else {
		gid("ambit").disabled = "true";
		gid("ambit").value = "";
	}
	
	if(gid("ambit").value) {
		var koords = gid("filter").value;
		var r = parseInt(gid("ambit").value);
		var xM = parseInt(koords.split("|")[0]);
		var yM = parseInt(koords.split("|")[1]);
		var arr = [koords.replace(/\|/, "\\|")], x, y;
		
		while(r > 0) {
			for(var phi = 0; phi < 360; phi++) {
				x = xM+Math.round(r*Math.cos(phi))
				y = yM+Math.round(r*Math.sin(phi))
				if(!arr.contains(x + "\\|" + y)) {
					arr.push(x + "\\|" + y);
				}
			}
			
			r--;
		}
		
		var reg = arr.join("|");
	} else if(gid("regexp").checked) {
		var reg = new RegExp(gid("filter").value);
	} else {
		var reg = new RegExp(gid("filter").value.replace(/(\$|\&|\/|\(|\)|\?|\{|\[|\]|\}|\@|\+|\.|\|)/g, "\\$1"));
	}
	
	/* Den Textinhalt der Zeilen nach dem Suchstring durchsuchen */
	for(var x = 0; x < rows.length; x++) {
		if(!rows[x].textContent.match(reg)) {
			rows[x].style.display = "none";
		} else {
			rows[x].removeAttribute('style');
		}
	}
}

createField();