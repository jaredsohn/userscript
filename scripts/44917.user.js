// ==UserScript==
// @name				DSsumUpRes
// @namespace			die-staemme.de
// @author				Heinzel
// @version				1.2.0
// @icon				http://die-staemme.de/graphic/overview/note.png
// @description			Dieses Script zählt in der Produktionsübersicht die Ressies zusammen und fügt eine extra-Spalte mit den Ergebnissen ein
// @include				http://de*.die-staemme.de/game.php?*screen=overview_villages*
// ==/UserScript==


// author:				Heinzel
// version:				1.1.0
// changelog: 
// 		1.0.0:			Erst Veröffentlichung
//		1.1.0:			Anpassung an DS-v7.0
//		1.2.0:			- Script-API eingebunden




function getCookie(name) {
	if(document.cookie.match(/;/)) {
		var cooks = document.cookie.split("; ");
		for(var x = 0; x < cooks.length; x++) {
			var cookie = cooks[x];
			if(cookie.match(name + "=")) {
				var value = cookie.replace(name + "=", "");
				break;
			} else {
				var value = false;
			}
		}
	} else {
		var cookie = document.cookie;
		if(cookie.match(name + "="))
			var value = cookie.replace(name + "=", "");
		else
			var value = false;
	}
	
	return value;
}

function setCookie(name, value, expires) {
	if(!expires) {
		var date = new Date();
		date.setYear(date.getYear()+1905);
		
		var expires = date.toGMTString();
	}
	
	document.cookie = name + "=" + value + ";expires=" + expires;
}

function addEditLink(parent, function2Call) {
	parent.innerHTML += "&nbsp;";
	
	var link = document.createElement("a");
	var len = addEditLink.arguments.length;
	var href = "javascript: ";
	for(var x = 2; x < len; x++) {
		var name = addEditLink.arguments[x][0];
		var value = addEditLink.arguments[x][1];
		
		switch(typeof value) {
			case "string": 
				href += "var " + name + " = '" + value + "'; ";
				break;
			case "number":
				href += "var " + name + " = " + value + "; ";
				break;
		}
	}
	href += "(" + function2Call + ")(); ";
	link.href = href;
	parent.appendChild(link);
	
	var image = document.createElement("img");
	image.src = "http://" + location.host + "/graphic/rename.png";
	link.appendChild(image);
}

function setPercentage() {
	var new_percentage = window.prompt("Welchen Prozentsatz hätten Sie gerne?", full_percentage);
	if(!new_percentage) {
		return;
	}
	
	setCookie("DSsumUpRes_percentage", new_percentage);
	location.reload();
}

function getWindow() {
	if(typeof(unsafeWindow) == 'undefined') {
		var win = window;
	} else {
		var win = unsafeWindow;
	}
	
	return win;
}

function addThousandSeparator(number, sep) {
	if(typeof(sep) == 'undefined') {
		var sep = '.';
	}
	
	var num = parseInt(number, 10);
	var num2 = "";
	var num3 = "";
	
	while(num/1000 >= 1) {
		num3 = (num%1000).toString();
		if(num3.length == 1) {
			num3 = "00" + num3;
		} else if(num3.length == 2) {
			num3 = "0" + num3;
		}
		num2 = sep + num3 + num2;
		num = Math.floor(num/1000);
	}
	num += num2;
		
	return num;
}

(function main() {
	// Überprüfen, ob man sich in der richtigen Überischt befindet bzw. ob PA vorhanden ist
	try {
		var PA = true;
		var mode = document.getElementById('overview').value;
		if(mode != 'prod') {
			return;
		}
	} catch(e) {
		var PA = false;
	}
	
	// game_data laden
	win = getWindow(); 
	game_data = win.game_data;
	
	// Script regestrieren
	win.ScriptAPI.register('DSsumUpRes', 7.4, 'Heinzelmänchen', 'Heinzelmänchen@scripter.die-staemme.de');
	
	
	// Version laden
	var version = {
		'major': game_data.version.split(' ')[1].split('.')[0], 
		'minor': game_data.version.split(' ')[1].split('.')[1], 
		'patch': game_data.version.split(' ')[0]
	};
	
	// Den gespeicherten Prozentsatz abrufen
	if(getCookie("DSsumUpRes_percentage")) {
		var full_percentage = getCookie("DSsumUpRes_percentage")
	} else {
		var full_percentage = 100; // Standardwert
	}
	
	// Die Stelle im Dokument ermitteln, wo alle Daten stehen
	var tbody = document.evaluate('//th[. = "Rohstoffe"]/parent::tr/parent::tbody', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	var rows = tbody.getElementsByTagName('tr');
	
	var villages_length = 0;
	var res = [0, 0, 0];
	var all_points = 0;
	var full_farms = 0;
	var not_full_farms = 0;
	var cell_indices = {
		'points': (version.major < 7) ? 1 : 2, 
		'res': (version.major < 7) ? 2 : 3, 
		'farm': (version.major < 7) ? 4 : 6
	};
	
	// Die Daten auslesen
	for(var x = 1; x < rows.length; x++) {
		var row = rows[x];
		if(!row.innerHTML.match(/id="label_\d+"/)) {
			continue;
		}
		
		villages_length++;
		var cells = row.getElementsByTagName('td');
		
		// Punkte auslesen
		all_points += parseInt(cells[cell_indices.points].textContent.replace(/\./g, ''), 10);
		
		// Ressies auslesen
		var res_str = cells[cell_indices.res].textContent;
		var res_arr = res_str.replace(/\.|\s$|^\s/g, '').split(' ');
		for(var y = 0; y < res_arr.length; y++) {
			res[y] += parseInt(res_arr[y], 10);
		}
		
		// Bauernhoefe auslesen
		var farm = cells[cell_indices.farm].innerHTML.split('/');
		if(farm[0]/farm[1] >= full_percentage/100) {
			full_farms++;
		} else {
			not_full_farms++;
		}
	}
	
	// Tausender-Punkte bei den Ressies setzen
	for(var x = 0; x < res.length; x++) {
		res[x] = addThousandSeparator(res[x], '.');
	}
	
	// Spalte erzeugen, in die alles rein soll
	var row = tbody.appendChild(document.createElement('tr'));
	
	// Zusammenfassung anzeigen
	var versionFactor = (version.major < 7) ? 0 : 1;
	
	for(var x = 0; x < 5; x++) {
		var cell = document.createElement("th");
		cell.style.textAlign = 'center';
		
		switch(x) {
			case (0+versionFactor): 																							// Anzahl der Dörfer setzen
				cell.innerHTML = "Anzahl D&ouml;rfer: " + addThousandSeparator(villages_length.toString());
				break;
			case (1+versionFactor):																								// Punktedurchschnitt setzen
				cell.innerHTML = "&Oslash;" + addThousandSeparator(Math.floor(all_points/villages_length));
				break;
			case (2+versionFactor):																								// Ressies setzen
				cell.colSpan = '2';
				for(var y = 0; y < res.length; y++) {
					var image_kind = (y == 0) ? "holz" : (y == 1) ? "lehm" : "eisen";
					var image = document.createElement("img");
					image.src = "graphic/" + image_kind + ".png";
					cell.appendChild(image);
					cell.innerHTML += res[y] + " ";
				}
				break;
			case (3+versionFactor):																								// Bauernhöfe setzen
				cell.colSpan = (4+versionFactor).toString();
				cell.innerHTML = "Volle Bauernh&ouml;fe: " + full_farms.toString() + "/" + villages_length.toString() + "&nbsp; - Prozentsatz: " + full_percentage + "%";
				
				addEditLink(cell, setPercentage, ["full_percentage", parseInt(full_percentage,10)]);
				break;
		}
		row.appendChild(cell);
	}
})();