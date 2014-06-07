// ==UserScript==
// @name					DSoverviewFilter
// @author					Heinzel
// @version					2.1.0
// @namespace				die-staemme.de
// @description				Mit diesem Script können sämtliche Übersichten nach beliebigen Eingaben gefiltert werden. Dabei können die Zeilen als ganzes oder die einzelnen Spalten analysiert werden. Es kann nach einem regulären Ausdruck (Expertenmodus) oder nach einem Text (Standardmodus) gesucht werden. Alternativ gibt es auch noch einen Entfernungsfilter (Entfernungsmodus), der alle Dörfer in einem Umkreis von einer einzugebenden Fehlerzahl filtert. Außerdem kann man die Filterung negieren, dh. es werden nun alle Dörfer angezeigt, die nicht dem Filter entsprechen. 
// @include					http://*.die-staemme.de/game.php*screen=overview_villages*
// ==/UserScript==



// author: 					Heinzel
// version: 				2.1.0
// changelog: 
// 1.0.0					- Veröffentlichung
// [...]
// 2.0.0					- Code komplett neugeschrieben
// 							- Bedienoberflaeche komplett ueberarbeitet
// 							- neues Feature: Filter auf jede Zeile einzeln anwendbar
//							- neues Feature: Negierung der Filterung moeglich
//							- neues Feature: Script gibt Fehler oder Meldungen aus
// 2.1.0					- neues Feature: Script listet Anzahl der gefilterten Spalten auf
//							- Bugfix: Meldung manchmal in druntere Zeile verschoben
//							- Verbesserung: Meldungen werden jetzt nichtmehr nach 3 Sekunden wieder ausgeblendet
//							- Verbesserung: Farben angepasst (verdunkelt) und Meldungen nun fett


(function __construct() {
	// window, jQuery und game_data Objekte laden
	win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
	$ = win.$;
	game_data = win.game_data;
	
	// Script regestrieren
	win.ScriptAPI.register('DSoverviewFilter', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	// Filterspalte einfuegen
	createFilterRow();
})();

function onSelectionChange() {
	var selected = this.value;
	var label = document.getElementById('textfield_label');
	var textfield = document.getElementById('filter_string');
	
	switch(selected) {
	case 'exact_distance': 
	case 'distance': 
		label.innerHTML = "Zielkoordinaten: &nbsp;";
		
		document.getElementById('fields_label').style.display = 'inline';
		break;
	case 'regexp': 
		label.innerHTML = "Regul&auml;rer Ausdruck: &nbsp;";
		
		document.getElementById('fields_label').style.display = 'none';
		break;
	default: 
		label.innerHTML = "Durchsuchen nach: &nbsp;";
		
		document.getElementById('fields_label').style.display = 'none';
	}
}
function getFilterKinds(table) {
	var kinds = ['-1:Alle'];
	var headRows = table.getElementsByTagName('th');
	for(var x = 0; x < headRows.length; x++) {
		var html = headRows[x].innerHTML;
		var desc = headRows[x].textContent.replace(/^\s+|\s+$/g, '').replace(/\s+\(\d+\)$/, '');
		if(desc == "alle auswählen" || desc == "bearbeiten" || html.match(/get_all_possible_/) !== null || desc.match(/^\d+$/) !== null) continue;
		if(desc == '') {
			if(html.match(/title="(.*?)"/) !== null) {
				desc = RegExp.$1;
				if(desc == '' && html.match(/note\.png/)) desc = "Dorfnotizen";
			} else if(html.match(/class="note-icon"/)) {
				desc = "Dorfnotizen";
			} else {
				continue;
			}
		}
		
		kinds.push(x.toString() + ':' + desc.replace(/:/g, '&&'));
	}
	return kinds;
}
function display(msg, color) {
	// Nachricht anzeigen
	var el = document.getElementById('filter_messages');
	el.innerHTML = '&nbsp;' + msg;
	el.style.color = (color) ? color : '#000000';
}
function createFilterRow() {
	// Uebersichtabelle ermitteln
	var table = document.getElementsByClassName('overview_table')[0].getElementsByTagName('*')[0];
	
	// Filterspalte erzeugen
	var row = table.insertBefore(document.createElement('tr'), table.firstChild);
	var cell = row.appendChild(document.createElement('td'));
	cell.colSpan = table.getElementsByTagName('th').length;
	
	// Erste Zelle erzeugen: Suchstring-Eingabe
	var label = cell.appendChild(document.createElement('label'));
	label.setAttribute('for', 'filter_string');
	var span = label.appendChild(document.createElement('span'));
	span.id = 'textfield_label';
	span.innerHTML = "Durchsuchen nach: &nbsp;";
	var textfield = label.appendChild(document.createElement('input'));
	textfield.type = 'text';
	textfield.id = 'filter_string';
	textfield.size = '20';
	textfield.addEventListener('keyup', search, false);
	
	cell.appendChild(document.createTextNode("\t"));
	
	// Zweite Zelle (Modus: Standard + Experten) erzeugen: Spalten-Auswahl
	var label = cell.appendChild(document.createElement('label'));
	label.setAttribute('for', 'filter_rows');
	label.id = 'kind_label';
	label.innerHTML = "Welche Spalte? &nbsp;";
	var selection = label.appendChild(document.createElement('select'));
	selection.id = 'filter_rows';
	selection.addEventListener('change', search, false);
	var possibleKinds = getFilterKinds(table);
	for(var i = 0; i < possibleKinds.length; i++) {
		var option = selection.appendChild(document.createElement('option'));
		option.value = possibleKinds[i].split(':')[0];
		option.innerHTML = possibleKinds[i].split(':')[1].replace(/\&\&/g, ':');
	}
	
	// Zweite Zelle (Modus: Entfernung) erzeugen: Fehleranzahl-Eingabe
	var label = cell.appendChild(document.createElement('label'));
	label.setAttribute('for', 'fields_length');
	label.id = 'fields_label';
	label.innerHTML = "Anzahl Felder: &nbsp;";
	label.style.display = 'none';
	var textfield = label.appendChild(document.createElement('input'));
	textfield.type = 'text';
	textfield.id = 'fields_length';
	textfield.size = '3';
	textfield.value = '1';
	textfield.addEventListener('keyup', search, false);
	
	cell.appendChild(document.createTextNode("\t"));
	
	// Dritte Zelle erzeugen: Modi-Auswahl
	var label = cell.appendChild(document.createElement('label'));
	label.setAttribute('for', 'filter_mode');
	label.id = 'mode_label';
	label.innerHTML = "Modus: &nbsp;";
	var selection = label.appendChild(document.createElement('select'));
	selection.id = 'filter_mode';
	selection.addEventListener('change', onSelectionChange, false);
	selection.addEventListener('change', search, false);
	var option = selection.appendChild(document.createElement('option'));
	option.value = 'default';
	option.appendChild(document.createTextNode("Standard"));
	option.selected = 'selected';
	var option = selection.appendChild(document.createElement('option'));
	option.value = 'distance';
	option.appendChild(document.createTextNode("Entfernung"));
	var option = selection.appendChild(document.createElement('option'));
	option.value = 'exact_distance';
	option.appendChild(document.createTextNode("exakte Entfernung"));
	var option = selection.appendChild(document.createElement('option'));
	option.value = 'regexp';
	option.appendChild(document.createTextNode("Experten"));
	
	cell.appendChild(document.createTextNode("\t"));
	
	// Vierte Zeile erzeugen: Filter negieren?
	var label = cell.appendChild(document.createElement('label'));
	label.setAttribute('for', 'filter_negate');
	label.id = 'negation_label';
	label.innerHTML = "Negieren: ";
	var check = label.appendChild(document.createElement('input'));
	check.type = 'checkbox';
	check.id = 'filter_negate';
	check.addEventListener('click', search, false);
	
	cell.appendChild(document.createTextNode("\t"));
	
	// Fuenfte Zelle erzeugen: Feld fuer Mitteilungen an den User
	var messagefield = cell.appendChild(document.createElement('span'));
	messagefield.id = 'filter_messages';
	messagefield.style.fontWeight = 'bold';
}
function search() {
	// Die Einstellungen des Users auslesen
	var filterText = $('#filter_string').val();
	var cellIndex = parseInt($('#filter_rows').val());
	var fieldsLength = parseInt($('#fields_length').val());
	var mode = $('#filter_mode').val();
	var negate = $('#filter_negate')[0].checked;
	
	// Zeilen ermitteln
	var rows = $('.row_a, .row_b');
	
	// die Vorbereitungen fuer die Entfernungsfilterung treffen
	if(mode == 'distance' || mode == 'exact_distance') {
		// Ueberpruefen, ob die Eingabe gueltig sind
		if(filterText.match(/^\d{1,3}\|\d{1,3}$/) === null) {
			display("Ung&uuml;ltige Zielkoordinaten!", '#FF0000');
			return false;
		} else if(isNaN(fieldsLength) || fieldsLength < 0) {
			display("Anzahl der Felder muss eine Zahl und gr&ouml;&szlig;er 0 sein!", '#FF0000');
			return false;
		}
		
		// die Koordinaten aller Doerfer der Liste ermitteln
		var allCoords = new Array();
		if(mode == 'distance' || mode == 'exact_distance') {
			$.each($(rows).find('a'), function(index, link) {
				if(link.textContent.match(/\((\d+\|\d+)\)\s+K\d+\s*$/)) {
					allCoords.push(RegExp.$1);
				}
			});
		}
		
		// die Zielkoordinaten splitten
		var x1 = filterText.split('|')[0];
		var y1 = filterText.split('|')[1];
		
		// ermitteln, welche Doerfer in Radius liegen
		var suitableCoords = new Array();
		for(var x = 0; x < allCoords.length; x++) {
			var x2 = parseInt(allCoords[x].split('|')[0]);
			var y2 = parseInt(allCoords[x].split('|')[1]);
			
			var distance = Math.round(Math.sqrt(Math.pow(Math.abs(x1-x2),2)+Math.pow(Math.abs(y1-y2),2)));
			if((distance <= fieldsLength && mode == 'distance') || (distance == fieldsLength && mode == 'exact_distance')) {
				suitableCoords.push(allCoords[x].replace(/\|/, '\\|'));
			}
		}
	}
	
	// Suchausdruck erstellen
	try {
		if(mode == 'regexp') {
			var reg = new RegExp(filterText, 'i');
		} else if(mode == 'default') {
			var reg = new RegExp(filterText.replace(/(\^|\$|\&|\/|\(|\)|\?|\{|\[|\]|\}|\@|\+|\.|\|)/g, "\\$1"));
		} else if(suitableCoords.length > 0) {
			var reg = new RegExp(suitableCoords.join('|'));
		} else {
			var reg = /^$/;
		}
	} catch(e) {
		// Falls der regulaere Ausdruck Fehler enthaelt, eine Meldung ausgeben und die Funktion beenden
		display("Fehlerhafter Ausdruck!", '#FF0000');
		return false;
	}
	
	// Fuer jede Zeile die Suche durchfuehren
	var resultsLength = 0;
	for(var x = 0; x < rows.length; x++) {
		var cells = rows[x].getElementsByTagName('td');
		var content = ((cellIndex > -1) ? cells[cellIndex].textContent : rows[x].textContent).replace(/^\s+|\s+$/g, '');
		
		if((content.match(reg) === null && !negate) || (content.match(reg) !== null && negate)) {
			rows[x].style.display = 'none';
		} else {
			resultsLength++;
			rows[x].removeAttribute('style');
		}
	}
	
	// Meldungen ausgeben
	display(resultsLength.toString() + " D&ouml;rfer gefunden!", '#44AA44');
}