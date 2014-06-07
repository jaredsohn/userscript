// ==UserScript==
// @name				DSsortingIncomings
// @author				Heinzel
// @version				1.3.0
// @description			Damit kann die Eintreffend-Uebersicht nach Angreifenden Spielern, langsamsten Einheiten, Ziel- und Herkunftsdoerfern gefiltert werden
// @namespace			http://userscripts.org
// @include				http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==


/* Changelog: 
	1.0.0	- Veröffentlichung
	1.1.0	- altes Koordinatensystem integriert
	1.2.0	- Anpassung an DS-v7.1
			- Updatehinweis-Funktion eingebaut
	1.3.0	- Updateroutine wieder entfernt
*/


function translate_unit(name) {
	var name = escape(name.toUpperCase());
	
	var units = [];
	units['SPY'] = "spy";
	units['SP%C4HER'] = "spy";
	units['SP%C4H'] = "spy";
	units['LKAV'] = "light";
	units['LEICHTE'] = "light";
	units['SKAV'] = "heavy";
	units['SCHWERE'] = "heavy";
	units['AXT'] = "axe";
	units['AXTIES'] = "axe";
	units['SCHW'] = "sword";
	units['SCHWERT'] = "sword";
	units['RAM'] = "ram";
	units['RAMME'] = "ram";
	units['AG'] = "snob";
	units['AGS'] = "snob";
	units['FAKES'] = "fake";
	
	if(units[name]) {
		return units[name];
	} else {
		return name;
	}
}

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

function group_incs() {
	var selected = document.getElementById("kind_of_sort").value;
	var rows = _evaluate('//th[contains(., "Befehl")]/parent::tr/parent::tbody/tr');
	
	var attackers = [];
	var origin_villages = [];
	var slowest_units = [];
	var target_villages = [];
	var count = 0; 
	
	for(var x = 0; x < rows.length; x++) {
		var row = rows[x];
		
		if(row.innerHTML.match(/<span id="label\[(\d+)\]/i)) {
			var index = RegExp.$1;
		} else {
			count++;
			continue;
		}
		var cells = row.getElementsByTagName("td");
		
		var caption = document.getElementById("labelText[" + index + "]").innerHTML; // Beschriftung des Angriffs
		var slowest_unit = caption.match(/\b(SP.H|SP.HER|SPY|LKAV|LEICHTE|SKAV|SCHWERE|AXT|AXTIES|SCHW|SCHWERT|RAM|RAMME|AG|AGS)\b/i);
		slowest_unit = (slowest_unit) ? translate_unit(slowest_unit[1]) : false; // Langsamste Einheit
		var attacker = cells[2].getElementsByTagName("a")[0].innerHTML; // Angreifer
		var origin_village = (caption.match(/\((\d{1,3}\|\d{1,3})\)/)) ? RegExp.$1 : false;	// Herkunfsdorf
		var target_village = (cells[1].getElementsByTagName("a")[0].innerHTML.match(/\((\d{1,3}\|\d{1,3})\)/)) ? RegExp.$1 : false; // Zieldorf
		if(!target_village) {		// alte koordinaten
			var origin_village = (caption.match(/\((\d+:\d+:\d+)\)/)) ? RegExp.$1 : false; // Herkunfsdorf
			var target_village = (cells[1].getElementsByTagName("a")[0].innerHTML.match(/\((\d+:\d+:\d+)\)/)) ? RegExp.$1 : false; // Zieldorf
		}
		
		attackers[x] = attacker;
		origin_villages[x] = origin_village;
		slowest_units[x] = slowest_unit;
		target_villages[x] = target_village;
		
		for(var y = count; y < x; y++) {
			switch(selected) {
				case "attacker":
					var bool = attackers[x] == attackers[y];
					break;
				case "origin_village":
					var bool = origin_villages[x] == origin_villages[y];
					break;
				case "slowest_unit": 
					var bool = slowest_units[x] == slowest_units[y];
					break;
				case "target_village":
					var bool = target_villages[x].toString() == target_villages[y].toString();
					break;
			}
			
			if(bool) {
				row.parentNode.insertBefore(rows[y], row);
			}
		}
	}
	
	var last_value = "";
	var last_class = "";
	var this_class = "";
	var rows = _evaluate('//th[contains(., "Befehl")]/parent::tr/parent::tbody/tr');
	for(var x = 0; x < rows.length; x++) {
		var row = rows[x];		
		if(row.innerHTML.match(/<span id="label\[(\d+)\]/i)) {
			var index = RegExp.$1;
		} else {
			count++;
			continue;
		}
		var cells = row.getElementsByTagName("td");
		var caption = document.getElementById("labelText[" + index + "]").innerHTML; // Beschriftung des Angriffs
		
		switch(selected) {
			case "attacker":
				var this_value = cells[2].getElementsByTagName("a")[0].innerHTML; // Angreifer
				break;
			case "origin_village":
				var this_value = (caption.match(/\((\d{1,3}\|\d{1,3})\)/)) ? RegExp.$1 : (caption.match(/\((\d+:\d+:\d+)\)/)) ? RegExp.$1 : false;	// Herkunfsdorf
				break;
			case "slowest_unit":
				var slowest_unit = caption.match(/\b(SP.H|SP.HER|SPY|LKAV|LEICHTE|SKAV|SCHWERE|AXT|AXTIES|SCHW|SCHWERT|RAM|RAMME|AG|AGS)\b/i);
				var this_value = (slowest_unit) ? translate_unit(slowest_unit[1]) : false; // Langsamste Einheit
				break;
			case "target_village":
				var this_value = (cells[1].getElementsByTagName("a")[0].innerHTML.match(/\((\d+\|\d+)\)/)) ? RegExp.$1 : (cells[1].getElementsByTagName("a")[0].innerHTML.match(/\((\d+:\d+:\d+)\)/)) ? RegExp.$1 : false; // Zieldorf
		}
		
		
		if(this_value != last_value) {
			this_class = (last_class == "a") ? "b" : "a";
			
			last_value = this_value;
			last_class = this_class;
		} else {
			this_class = last_class;
			this_value = last_value;
		}
		
		row.className = row.className.replace(/row_[ab]/, "row_" + this_class);
	}
}

(function main() {
	if(!(document.getElementById("overview") && document.getElementById("overview").value == "incomings")) {
		return;		// falsche Uebersicht bzw. kein PA vorhanden
	}
	
	// Stell im Text ermitteln, an der die Auswahlliste und der Button gesetzt werden sollen
	var head_cell = _evaluate('//th[contains(.,"Befehl")]')[0];
	
	// Auswahlliste erstellen + setzten
	var select_list = document.createElement("select");
	select_list.id = "kind_of_sort";
	select_list.style.marginLeft = "5px";
	select_list.style.marginRight = "5px";
	head_cell.appendChild(select_list);
	
	for(var x = 0; x < 4; x++) {
		var option = document.createElement("option");
		
		switch(x) {
			case 0: 
				option.value = "attacker";
				option.innerHTML = "Angreifer";
				break;
			case 1:
				option.value = "origin_village";
				option.innerHTML = "Herkunftsdorf";
				break;
			case 2:
				option.value = "slowest_unit";
				option.innerHTML = "Langsamste Einheit";
				break;
			case 3: 
				option.value = "target_village";
				option.innerHTML = "Zieldorf";
				break;
		}
		
		select_list.appendChild(option);
	}
	
	// Button erstellen + setzten
	var button = document.createElement("button");
	button.type = "button";
	button.innerHTML = "Gruppieren";
	button.style.padding = "1px";
	button.style.fontSize = "11px";
	button.addEventListener('click', group_incs, false);
	head_cell.appendChild(button);
})();