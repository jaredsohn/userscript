// ==UserScript==
// @name           Podsumowanie wsparć
// @author         Szatdafakap
// @namespace      http://aturime.ncse.pl
// @description    ...
// @include        http://pl*.plemiona.pl/game.php?*screen=overview_villages*mode=units*units_type=away_detail*
// ==/UserScript==

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}




var villages = new Array(0); 
var defence = new Array(0);
var links = new Array(0);

var villagesTable;
var tables = document.getElementsByTagName('table');
for (var i = 0; i < tables.length; i++) {
	if (tables[i].getElementsByTagName('tr').length > 0)
		if (tables[i].getElementsByTagName('tr')[0].textContent.substring(0,6) == "Wioska")
			villagesTable = tables[i];
}

function summarize() {


	var rows = villagesTable.getElementsByTagName('tr');
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].getElementsByTagName("input").length > 0) {
			village = rows[i].getElementsByTagName('span')[0].textContent;
			var j = 0;
			for (j = 0; j < villages.length;j++) {
				if (villages[j] == village) break;
			}
			if (j == villages.length) {
				villages[j] = village;
				defence[j] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				links[j] = rows[i].getElementsByTagName('a')[0];
			}
			var curDef = defence[j];
			cells = rows[i].getElementsByTagName('td');
			for (var k = 0 ; k < defence[j].length; k++) {
				defence[j][k] += parseInt(cells[k+1].textContent);
			}
		}
	}
}

function display() {
	var div = document.getElementById("paged_view_content");
	var newTable = document.createElement('table');
	newTable.className = "vis";
	
	var tables = document.getElementsByTagName('table');
	var headerRow;
	for (var i = 0; i < tables.length; i++) {
		if (tables[i].getElementsByTagName('tr').length > 0)
			if (tables[i].getElementsByTagName('tr')[0].textContent.substring(0,6) == "Wioska")
				headerRow = tables[i].getElementsByTagName('tr')[0].cloneNode(true);
	}
	newTable.appendChild(headerRow);
	
	for (var i = 0; i < villages.length; i++){
		var newRow = document.createElement('tr');
		var newCell = document.createElement('td');
		var checkBox = document.createElement('input');
		checkBox.type = "checkbox";
		checkBox.id = villages[i];
		newCell.appendChild(checkBox);
		newCell.innerHTML += "<a href=" + links[i] + ">" + villages[i] + "</a>";
		newRow.appendChild(newCell);
		newCell = document.createElement('td');
		newRow.appendChild(newCell);
		for (var j = 0; j < defence[i].length; j++){
			var troopCell = document.createElement('td');
			if (defence[i][j] == 0) troopCell.className = "hidden";
			troopCell.innerHTML = defence[i][j];
			newRow.appendChild(troopCell);
		}
		newTable.appendChild(newRow);
	}
	div.insertBefore(newTable, document.forms[document.forms.length-2]);

	window.addEventListener("click", function(event) { 
		if (event.target.type == "checkbox")  {
			var rows = villagesTable.getElementsByTagName('tr');			
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].getElementsByTagName("input").length > 0 && rows[i].getElementsByTagName('span')[0].textContent == event.target.id) {
					rows[i].getElementsByTagName("input")[0].checked = event.target.checked;
				}
			}
		}
	}, true);
}

summarize();
display();