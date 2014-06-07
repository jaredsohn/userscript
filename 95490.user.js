// ==UserScript==
// @name           Podsumowanie wsparć
// @author         Szatdafakap
// @namespace      http://aturime.ncse.pl
// @description    Wersja dla plemiona 7.0
// @include        http://pl*.plemiona.pl/game.php?*screen=overview_villages*mode=units*type=away_detail*
// @include        http://*.beta.tribalwars.net/game.php?*screen=overview_villages*mode=units*type=away_detail*

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


var villagesTable = document.getElementById('units_table');

function summarize() {

	
	var rows = villagesTable.getElementsByTagName('tr');
	for (var i = 1; i < rows.length - 1; i++) {
		if (rows[i].lastChild.previousSibling.getElementsByTagName('a').length == 0) {
			village = trim(rows[i].getElementsByTagName('span')[0].textContent);
			var j = 0;
			for (j = 0; j < villages.length;j++) {
				if (villages[j] == village) break;
			}
			if (j == villages.length) {
				villages[j] = village;
				defence[j] = new Array(0);
				for (k = 0; k < rows[0].getElementsByTagName('th').length - 3; k++) defence[j][k] = 0;
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
	var headerRow = document.getElementById('units_table').getElementsByTagName('tr')[0].cloneNode(true);
	
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

	div.insertBefore(newTable, document.forms[document.forms.length-1]);

	window.addEventListener("click", function(event) { 
		if (event.target.type == "checkbox")  {
			var rows = villagesTable.getElementsByTagName('tr');			
			for (var i = 1; i < rows.length - 1; i++) {
				if ((rows[i].getElementsByTagName("td")[rows[i].getElementsByTagName('td').length - 1].textContent != "Wojska") && trim(rows[i].getElementsByTagName('span')[0].textContent) == event.target.id) {
					rows[i].getElementsByTagName("input")[0].checked = event.target.checked;
				}
			}
		}
	}, true);
}

summarize();
display();