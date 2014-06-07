// ==UserScript==
// @name				Truppen Ankunftsfilter
// @namespace			Off Ankunftszeit Filter
// @description			Filtert Doerfer mit bestimmten mindest Truppen und einer bestimmten Ankunftszeit auf ein target Dorf heraus
// @include			http://*.die-staemme.*/game.php?*screen=overview_villages*
// @include			http://*.die-staemme.*/game.php?*screen=place&filter=*
// ==/UserScript==


//***************************************************************************
//***                           truppenfilter.user.js
//**                           -----------------------
//*   author               : Sush
//**  copyright            : (C) Sascha Ulbrich
//***
//***************************************************************************/

// edit by Heinzelmänchen


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

function _getCookie(name) {
	if(document.cookie.split(name + "=").length > 1) {
		var value = document.cookie.split(name + "=")[1].split(";")[0];
	} else {
		var value = false;
	}
	
	return value;
}

function __trim(string) {
	return string.replace(/^\s+|\s+$/, "");
}

function getDoc() {
	var doc = document;
	if(top.frames.length > 1){
		if(top.frames[1].document.URL.match('game.php') =='game.php') {
			var doc = top.frames[1].document;
		} else {
			top.frames[0].document;
		}
	}
	
	return doc;
}

function getMode() {
	try {
		var mode = doc.getElementById("overview").value;
	} catch(e) {
		var mode = false;
	}
	
	return mode;
}

function createMenu(savings) {
	var mainTable = _evaluate('//tr[contains(@class, "row_")]/parent::tbody')[0];
	mainTable.id = "mainTable";
	
	if(mainTable.getElementsByTagName("img")[0].parentNode.parentNode.innerHTML.match(/church\.png/)) {
		var type = "church";
	} else if(mainTable.getElementsByTagName("img")[0].parentNode.parentNode.innerHTML.match(/unit_knight\.png/)) {
		var type = "knight";
	} else {
		var type = "basic";
	}
	
	var row = doc.createElement("tr");
	mainTable.insertBefore(row, mainTable.firstChild.nextSibling); 
	
	var tableCell = doc.createElement("td");
	if(type == "church") {
		tableCell.setAttribute("colspan","8");
	} else {
		tableCell.setAttribute("colspan","7");
	}
	row.appendChild(tableCell);
	
	var infos = ["spear:4", "sword:5", "axe:6", "spy:7", "light:8", "heavy:9", "ram:10", "catapult:11", "snob:12"];
	if(type != "basic") {
		infos.push("archer:15", "marcher:16", "knight:17");
	}
	
	for(var x = 0; x < infos.length; x++) {	
		var unit = infos[x].split(":")[0];
		var index = infos[x].split(":")[1];
		
		var cell = doc.createElement("td"); 
		cell.style.textAlign = "center";
		row.appendChild(cell); 
		
		var input = doc.createElement("input");
		input.type = "text";
		input.size = 3;
		input.value = savings[index];
		input.id = unit;
		input.style.textAlign = "center";
		input.addEventListener('blur', function() {
			if(isNaN(this.value) || this.value == "") {
				this.value = 0;
			}
		}, false);
		cell.appendChild(input);
	}
	
	var cell = doc.createElement("td"); 
	cell.style.textAlign = "center";
	row.appendChild(cell);  
	
	var button = doc.createElement("input");
	button.type = "button";
	button.value = "Filtern";
	button.id = "filterButton";
	button.addEventListener('click', filter, false);
	cell.appendChild(button); 
	
	var input = doc.createElement("input");
	input.type = "hidden";
	input.value = type;
	input.id = "type";
	cell.appendChild(input);
	
	var table = doc.createElement("table");
	tableCell.appendChild(table);
	
	var row = doc.createElement("tr"); 
	table.appendChild(row);
	
	var titles = ["von ... Uhr", "bis ... Uhr", "Tag", "Monat", "LZ", "Ziel", ""];
	for(var x = 0; x < titles.length; x++) {
		var cell = doc.createElement("th");
		cell.style.textAlign = "center"; 
		cell.innerHTML = titles[x];
		row.appendChild(cell);
	}
	
	var row = doc.createElement("tr");
	table.appendChild(row);
	
	var infos = ["start:2", "end:3", "day:13", "date:14", "runtime:1"];
	for(var x = 0; x < infos.length; x++) {
		var id = infos[x].split(":")[0];
		var index = infos[x].split(":")[1];
		
		var cell = doc.createElement("td"); 
		cell.style.textAlign = "center";
		row.appendChild(cell);
		
		var input = doc.createElement("input");
		input.type = "text";
		input.size = "2";
		input.style.textAlign = "center";
		input.value = savings[index];
		input.id = id;
		input.addEventListener('blur', function() {
			if(isNaN(this.value) || this.value == "") {
				this.value = 0;
			}
		}, false);
		cell.appendChild(input);
	}
	
	var cell = doc.createElement("td"); 
	cell.style.textAlign = "center";
	row.appendChild(cell);
	
	var input = doc.createElement("input");
	input.type = "text";
	input.size = "6";
	input.style.textAlign = "center";
	input.value = savings[0];
	input.id = "target";
	input.addEventListener('blur', function() {
		if(!this.value.match(/\d+\|\d+/)) {
			this.value = "xxx|yyy";
		}
	}, false);
	cell.appendChild(input);
	
	var cell = doc.createElement("td");
	row.appendChild(cell);
	
	var button = doc.createElement("input");
	button.type = "button";
	button.value = "Speichern";
	button.addEventListener('click', save, false);
	cell.appendChild(button);
}

function filter() {
	document.getElementById("filterButton").disabled = true;
	
	var type 	 = doc.getElementById("type").value;
	var runtime  = parseInt(doc.getElementById("runtime").value);
	var start 	 = parseInt (doc.getElementById("start").value);
	var end 	 = parseInt (doc.getElementById("end").value);
	var spear 	 = parseInt(doc.getElementById("spear").value);
	var sword  	 = parseInt(doc.getElementById("sword").value);
	var axe 	 = parseInt(doc.getElementById("axe").value);
	var spy 	 = parseInt(doc.getElementById("spy").value);
	var light 	 = parseInt(doc.getElementById("light").value);
	var snob 	 = parseInt(doc.getElementById("snob").value);
	var coords	 = doc.getElementById("target").value;
	var heavy 	 = parseInt(doc.getElementById("heavy").value);
	var ram 	 = parseInt(doc.getElementById("ram").value);
	var catapult = parseInt(doc.getElementById("catapult").value);
	var day 	 = parseInt(doc.getElementById("day").value);
	var date 	 = parseInt(doc.getElementById("date").value);
	if(type != "basic") {
		var knight 	= parseInt(doc.getElementById("knight").value);
		var archer 	= parseInt(doc.getElementById("archer").value);
		var marcher = parseInt(doc.getElementById("marcher").value);
	}
	
	var time_akt = Number(new Date());
	if(isNaN(start) || isNaN(end) || isNaN(runtime) || runtime == 0) {
		start = -1;
	}
	
	if (coords.match(/\|/) && coords != "xxx|yyy" && start != -1) {
		var targetX = coords.split("|")[0];
		targetX =("00" + targetX).substr(-3);  
		var targetY = coords.split("|")[1];
		targetY =("00" + targetY).substr(-3);
		
		var sortierung = new Array();
		if(location.href.match(/[&?](t=\d+\&)/)) {
			var uv = RegExp.$1;
		} else {
			var uv = "";
		}     
	} else {
		coords = false;
	}
	
	var server = location.host.split(".")[0];
	var rows = _evaluate('//tr[contains(@class, "row_")]');
	var	zaehler = 0;
	
	for(var i = 0; i < rows.length; i++) {
		var cells = rows[i].getElementsByTagName("td");
		
		if(coords !== false) {
			var vill_name = cells[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0];
			if(vill_name.innerHTML.match(/\((\d+)\|(\d+)\)\s*K/)) {
				var x = ("00" + RegExp.$1).substr(-3);        
				var y = ("00" + RegExp.$2).substr(-3);
				var diffX = targetX - x;
				var diffY = targetY - y;
				var range = Math.sqrt((diffX*diffX)+(diffY*diffY));
				var time_an = parseInt(time_akt)+parseInt(Math.round(range*runtime*60*1000));
				var arrival = new Date(time_an);
			} else {
				window.alert("Sie muessen das Script 'Uebersichts-Erweiterung' ausschalten!");
				return;
			}
		}
		
		var loeschen = 0; 
		if (type == "church") {
			if(cells[8].innerHTML < spear || cells[9].innerHTML < sword || cells[10].innerHTML < axe || cells[11].innerHTML < archer || cells[12].innerHTML < spy || cells[13].innerHTML < light || cells[14].innerHTML < marcher || cells[15].innerHTML < heavy || cells[16].innerHTML < ram || cells[17].innerHTML < catapult || cells[18].innerHTML < knight || cells[19].firstChild.innerHTML < snob) {
				var loeschen = 1
			}
		} else if (type == "knight") {
			if(cells[7].innerHTML < spear || cells[8].innerHTML < sword || cells[9].innerHTML < axe || cells[10].innerHTML < archer || cells[11].innerHTML < spy || cells[12].innerHTML < light || cells[13].innerHTML < marcher || cells[14].innerHTML < heavy || cells[15].innerHTML < ram || cells[16].innerHTML < catapult || cells[17].innerHTML < knight || cells[18].firstChild.innerHTML < snob) {
				var loeschen = 1;
			}
		} else {
			if(cells[7].innerHTML < spear || cells[8].innerHTML < sword || cells[9].innerHTML < axe || cells[10].innerHTML < spy || cells[11].innerHTML < light || cells[12].innerHTML < heavy || cells[13].innerHTML < ram || cells[14].innerHTML < catapult || cells[15].firstChild.innerHTML < snob) {
				var loeschen = 1;
			}
		}
		
		if(coords !== false) {
			if(end != start) {
				if(end < start) {
					if(arrival.getHours() >= end && arrival.getHours() < start) {
						var loeschen = 1;
					}
				} else {
					if(arrival.getHours() >= end || arrival.getHours() < start) {
						var loeschen = 1;
					}
				}
			}
			
			if(!isNaN(day) && day != 0) {
				if(day != arrival.getDate()) {
					var loeschen = 1;
				}
			}
			
			if(!isNaN(date) || date != 0) {
				if(date != (arrival.getMonth()+1)) {
					var loeschen = 1;
				}
			}
		}
		
		if(loeschen === 1) {
			rows[i].style.display = "none";
		} else if(coords !== false) {
			var seconds = ("0" + Math.round((range*runtime*60)% 60)).substr(-2);
			var minutes = ("0" + Math.floor((range*runtime)% 60)).substr(-2);
			var hours = Math.floor(range*runtime/60);  
			
			var runtimeStr = "Laufzeit = ";
			if(hours > 23) {
				runtimeStr = "Laufzeit = "+ Math.floor(hours/24) +" Tag(e) ";
				hours = hours% 24;
			}
			runtimeStr += hours + ":" + minutes + ":" + seconds;
			
			hours = ("0" + arrival.getHours()).substr(-2);
			minutes = ("0" + arrival.getMinutes()).substr(-2);  
			seconds = ("0" + arrival.getSeconds()).substr(-2); 
			
			var id = vill_name.id.substring(11); 
			
			var link = document.createElement("a");
			link.href = "http://" + server + ".die-staemme.de/game.php?" + uv + "villsnobe=" + id + "&screen=place&filter=" + targetX + "|" + targetY;
			link.title = runtimeStr;
			cells[0].appendChild(link);  
			
			var img = document.createElement("img");
			img.src = "/graphic/buildings/place.png";
			img.alt = "Versammlungsplatz";
			img.title = "Versammlungsplatz";    
			link.appendChild(img);   
			
			var time = document.createElement("span");
			time.innerHTML = "(" + arrival.getDate() + "." + (parseInt(arrival.getMonth())+1) + "." + " " + hours + ":" + minutes + ":" + seconds +")";
			link.appendChild(time);    
			
			rows[i].id = time_an + x + y;
			sortierung.push(time_an + x + y);
		} else {
			zaehler++;
		}
	}
	
	if(coords !== false) {
		sortierung.sort(function(a,b) {
			return a - b;
		});
		
		sortierung.reverse();
		var table = doc.getElementById("mainTable"); 
		var row = table.getElementsByTagName('tr');
		for(var i = 0; i < sortierung.length; i++) {
			table.insertBefore(doc.getElementById(sortierung[i]), row[4]);
		}
		
		window.alert(sortierung.length + " Doerfer mit Ankunft innerhalb des Zeitraums von " + start + " bis " + end + " Uhr (Laufzeit von " + runtime + " Min/Feld) in " + targetX + "|" + targetY + " gefiltert!");
	} else {
		window.alert(zaehler + " Doerfer mit minimaler Truppenstaerke gefilter.");
	}
}

function save() {
	var type = 		doc.getElementById("type").value;
	var target = 	doc.getElementById("target").value;
	var runtime = 	doc.getElementById("runtime").value;
	var start = 	doc.getElementById("start").value;
	var end = 		doc.getElementById("end").value;
	var spear = 	doc.getElementById("spear").value;
	var sword = 	doc.getElementById("sword").value;
	var axe = 		doc.getElementById("axe").value;
	var spy = 		doc.getElementById("spy").value;
	var light = 	doc.getElementById("light").value;
	var snob = 		doc.getElementById("snob").value;
	var heavy = 	doc.getElementById("heavy").value;
	var ram = 		doc.getElementById("ram").value;
	var catapult = 	doc.getElementById("catapult").value;
	var day = 		doc.getElementById("day").value;
	var date = 		doc.getElementById("date").value;
	
	if(type != "basic") {
		var knight = 	doc.getElementById("knight").value;
		var archer =	doc.getElementById("archer").value;
		var marcher = 	doc.getElementById("marcher").value;
	}
	var toSave = target + "," + runtime + "," + start + "," + end + "," + spear + "," + sword + "," + axe + "," + spy + "," + light + "," + heavy + "," + ram + "," + catapult + "," + snob + "," + day + "," + date;
	
	if(type != "basic") {
		toSave += "," + archer + "," + marcher + "," + knight;
	}
	
	var date = new Date();
	date = new Date(date.getTime()+1000*60*60*24*365);
	doc.cookie = "truppenfilter=" + toSave + "; expires=" + date.toGMTString();
}

(function main() {
	doc = getDoc();
	var mode = getMode();
	
	if(mode == "combined") {
		// Cookies auslesen
		var cookies = doc.cookie;
		if(_getCookie("truppenfilter") !== false) {
			var savings = _getCookie("truppenfilter");
		} else { // Falls kein Cookie gesetzt ist, die Standardwerte verwendn
			var savings = "xxx|yyy,30,8,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0";
		}
		
		var savings = savings.split(",");
		if(!savings[16]){
			savings[16] = 0;
		}
		if(!savings[17]){
			savings[17] = 0;
		}
		
		createMenu(savings);
	} else if(location.href.match(/screen=place\&filter=/)) {
		// Koordinaten einfuegen
		var coords = location.href.split("filter=")[1].split("|");
		doc.getElementById("inputx").value = coords[0];
		doc.getElementById("inputy").value = coords[1];
		
		//  Alle Truppen einfuegen
		location.href = doc.getElementById("selectAllUnits").href;
	}
})();