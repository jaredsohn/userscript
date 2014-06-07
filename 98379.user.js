// ==UserScript==
// @name				DSshowArrivalDateRelaunch[v7.0]
// @description			Ersetzt in den Notizen den Tag 'runtimes' durch eine Tabelle in denen die Laufzeiten zu den eingetragenen Doerfern angegeben werden
// @author				Heinzel
// @relaunch			Nussi13
// @namespace			none
// @include			http://de*.die-staemme.de/game.php?*screen=memo*
// @include			http://de*.die-staemme.de/game.php?*screen=place*
// @include			http://de*.die-staemme.de/game.php?*screen=info_command*
// @include			http://*twmaps.org/*
// ==/UserScript==




// Config
function CConfig() {
	this.endOfNight = 7;
	this.defaultSpanName = "default_";
	this.unitNames = ['Spy', 'Lkav/BBogen', 'Skav', 'Axt/Speer/Bogen', 'Schwert', 'Ramme/Kata', 'AG'];
	this.unitRuntimes = [9,10,11,18,22,30,35];
}


// findet ein Element mithilfe von XPath aus einem bestimmten context (Standard: document)
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

// Ueberprueft, ob in einem Array ein bestimmter Wert 'cont' enthalten ist
Array.prototype.contains = function(cont) {
	for(var x = 0; x < this.length; x++) {
		if(this[x] == cont) {
			return x;
		}
	}
	
	return false;
}

// Gibt den Wert eines Cookies zurueck
function _getCookie(name) {
	if(document.cookie.match(name)) {
		return unescape(document.cookie.split(name + "=")[1].split(";")[0]);
	}
		
	return false;
}

// speichert einen Wert unter einem spezifischen Namen als Cookie
function _setCookie(name, value) {
	document.cookie = name + "=" + value + ";";
}

// einen Cookie loeschen
function _deleteCookie(name) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

// Gibt die Koordinaten des aktuellen Dorfes zurueck
function getCurrentCoords() {
	var row = document.getElementById("menu_row2");
	var village_name = row.getElementsByTagName("b")[0].innerHTML;
	var coords = village_name.replace(/\(|\)| K\d+/g, "");
	
	return coords;
}

// Ermittelt den gespeicherten Faktor fuer die Einheit und gibt sie zurueck
function getUnitFactor() {
	var default_factor = config.unitRuntimes[5];
	
	var unit_factor = localStorage.getItem("runtime");
	if(!unit_factor) {
		unit_factor = default_factor;
	}
	
	return unit_factor;
}

// Berechnet die Laufzeit zwischen 2 Doerfern
function calcRuntime(coords_1, coords_2, unit_factor) {
	if(coords_2 == coords_1) {
		return " - ";
	}
	
	coords_1 = coords_1.split("|");
	coords_2 = coords_2.toString().split("|");
	
	var x_len = Math.abs(coords_1[0]-coords_2[0]);
	var y_len = Math.abs(coords_1[1]-coords_2[1]);
	
	var fields = Math.sqrt((x_len*x_len)+(y_len*y_len));;
	var runtime = (fields*unit_factor*60).toFixed(0);	// in secs
	
	var seconds = (runtime%60).toString();
	var minutes = (Math.floor(runtime/60)%60).toString();
	var hours = (Math.floor(Math.floor(runtime/60)/60)).toString();
	
	if(hours.length < 2) hours = '0' + hours;
	if(minutes.length < 2) minutes = '0' + minutes;
	if(seconds.length < 2) seconds = '0' + seconds;
	
	var output = hours + ":" + minutes + ":" + seconds;
	
	return output;
} 

// Berechnet aus der Laufzeit die Ankunftszeit
function getArrivalDate(runtime) {
	if(runtime == " - ") {
		return " - ";
	}
	
	var hours = parseInt(runtime.split(":")[0], 10);
	var minutes = parseInt(runtime.split(":")[1], 10);
	var seconds = parseInt(runtime.split(":")[2], 10);
	
	var arrival = new Date();
	arrival.setHours(hours+arrival.getHours());
	arrival.setMinutes(minutes+arrival.getMinutes());
	arrival.setSeconds(seconds+arrival.getSeconds());
	
	var date = (arrival.getDate() < 10) ? "0" + arrival.getDate() : arrival.getDate();
	var month = (1+arrival.getMonth() < 10) ? "0" + (1+arrival.getMonth()) : 1+arrival.getMonth();
	var hours = (arrival.getHours() < 10) ? "0" + arrival.getHours() : arrival.getHours();
	var minutes = (arrival.getMinutes() < 10) ? "0" + arrival.getMinutes() : arrival.getMinutes();
	var seconds = (arrival.getSeconds() < 10) ? "0" + arrival.getSeconds() : arrival.getSeconds();
	
	var output = "am " + date + "." + month + ". um " + hours + ":" + minutes + ":" + seconds + " Uhr";
	
	return output;
}

// trennt einen String anhand eines Zeichens auf
function makeArray(string, separator) {
	if(!string) {
		var arr = [];
	} else if(!string.match(separator)) {
		var arr = [string];
	} else {
		var arr = string.split(separator);
	}
	
	return arr;
}

// markiert eine Ankunft im NB rot und eine ausserhalb gruen
function markNB(arrival) {
	if(!arrival.match(/um/)) {
		return arrival;
	}
	
	var hours = parseInt(arrival.split("um ")[1].split(":"), 10);
	if(hours >= config.endOfNight) {
		return "<span style='color:green;'>" + arrival + "</span>";
	} else {
		return "<span style='color:red;'>" + arrival + "</span>";
	}
}

// laed die laufenden Angriffe
function getRunningAttacks() {
	var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
	var now = new Date().getTime();
	var obj = new Object();
	
	for(var x = 0; x < runningAttacks.length; x++) {
		var targetID = runningAttacks[x].split(":")[0];
		var timestap = runningAttacks[x].split(":")[1];
		
		// Ueberpruefen, ob der Angriff nicht bereits eingetroffen ist
		if(timestap <= now) { 
			continue;
		}
		
		if(obj[targetID] === undefined) {
			obj[targetID] = [timestap];
		} else {
			obj[targetID].push(timestap);
			obj[targetID].sort(function(a,b){return a-b;});
		}
	}
	
	return obj;
}

// traegt einen Angriff als abgebrochen ein
function cancelCommand() {
	if($_GET('screen') == 'place') {
		// Daten auslesen
		var cells = this.parentNode.parentNode.getElementsByTagName("td");
		var runtime = cells[cells.length-2].textContent.split(":");
		var serverTime = document.getElementById("serverTime").textContent.split(":");
		var serverDate = document.getElementById("serverDate").textContent.split("/");
		
		// Ankunftstimestap berechnen
		var now = new Date(serverDate[1] + " " + serverDate[0] + ", " + serverDate[2] + " " + serverTime.join(":"));
		var arrival = now;
		arrival.setHours(now.getHours() 	+ parseInt(runtime[0], 10));
		arrival.setMinutes(now.getMinutes() + parseInt(runtime[1], 10));
		arrival.setSeconds(now.getSeconds() + parseInt(runtime[2], 10));
		arrival.setMilliseconds(0);
		var timestap = arrival.getTime();
		
		// laufende Angriffe abgleichen
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		var newString = "";
		for(var x = 0; x < runningAttacks.length; x++) {
			if(runningAttacks[x].split(":")[1] != timestap) {
				newString += runningAttacks[x] + ((x == runningAttacks.length) ? "" : ",");
			}
		}
		
		localStorage.setItem("runningAttacks", newString);
	} else 
	if($_GET('screen') == 'info_command') {
		// Nur bei Angriffen auslesen
		var type = document.getElementsByTagName("h2")[0].textContent.split(" ")[0];
		if(type != "Angriff") {
			return;
		}
		
		// Ziel-ID und Ankunft auslesen
		var targetID = _evaluate('//td[.="Ziel"]/parent::tr/following::tr/td[.="Dorf:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
		var arrival	 = _evaluate('//td[.="Ankunft:"]/following::td')[0].textContent;
		var timestap = convertDate(arrival);
		
		// laufende Angriffe abgleichen
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		var newString = "";
		var canceled = false;
		for(var x = 0; x < runningAttacks.length; x++) {
			if(runningAttacks[x].split(":")[1] != timestap || runningAttacks[x].split(":")[0] != targetID || canceled === true) {
				newString += runningAttacks[x] + ((x == runningAttacks.length) ? "" : ",");
			} else {
				var canceled = true;
			}
		}
		
		localStorage.setItem("runningAttacks", newString);
	}
}

// loescht alle gespeicherten angriffe, die bereits angegekommen sind
function deleteArrivedAttacks() {
	var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
	var now = new Date().getTime();
	var newAttackString = "";
	
	for(var x = 0; x < runningAttacks.length; x++) {
		var targetID = runningAttacks[x].split(":")[0];
		var timestap = runningAttacks[x].split(":")[1];
		
		// Ueberpruefen, ob der Angriff nicht bereits eingetroffen ist
		if(timestap > now) {
			var save = targetID + ":" + timestap;
			newAttackString += (x == runningAttacks.length-1) ? save : save + ",";
		}
	}
	
	localStorage.setItem("runningAttacks", newAttackString);
}

// rechnet einen String mit einer der Datumsangaben von DS in einen Unix-Timestap um
function convertDate(string) {
	// Ankunft in einen Unix-Timestap codieren
	var date = new Date();
	date.setYear(new Date().getYear()+1900);
	date.setMinutes(parseInt(string.split(":")[1], 10));
	date.setSeconds(parseInt(string.split(":")[2], 10));
	date.setMilliseconds(0);
	date.setHours(parseInt(string.split(" ")[1].split(":")[0], 10));
	date.setDate (parseInt(string.split(".")[0], 10));
	date.setMonth(parseInt(string.split(".")[1], 10)-1);
	
	return date.getTime();
}

// Berechnet das Zentrum von einem Array von Koordinaten
function getCenter(coords) {
	var xCoord = 0;
	var yCoord = 0;
	
	for(var x = 0; x < coords.length; x++) {
		xCoord += parseInt(coords[x].split("|")[0], 10);
		yCoord += parseInt(coords[x].split("|")[1], 10);
	}
	
	return Math.floor(xCoord/coords.length).toString() + "|" + Math.floor(yCoord/coords.length).toString();
}

// Ermittelt einen GET-Parameter
function $_GET(name) {
	return (location.href.match(new RegExp(name + "=(.+?)(\&|$)"))) ? RegExp.$1 : false;
}



function getElementByClass(theClass) {
	var allHTMLTags = new Array();
	//Create Array of All HTML Tags
	allHTMLTags=document.getElementsByTagName("*");

	//Loop through all tags using a for loop
	for (i=0; i<allHTMLTags.length; i++) {

		//Get all tags with the specified class name.
		if (allHTMLTags[i].className==theClass) {

			//Place any code you want to apply to all
			//pages with the class specified.
			//In this example is to “display:none;” them
			//Making them all dissapear on the page.
			return allHTMLTags[i];
			//allHTMLTags[i].style.display=’none’;

		}
	}
}


(function main() {
	// config laden
	config = new CConfig();
	
	// alle angegekommenen Angriffe loeschen
	deleteArrivedAttacks();
	
	if(location.href.match(/\.twmaps\.org\/index\.php/)) {
		// Die parameter auslesen
		var center = unescape($_GET("center"));
		var zoom = unescape($_GET("zoom"));
		var villages = unescape($_GET("villages"));
		
		// Falls etwas nicht korrekt uebermittelt wurde beenden
		if(center === false || zoom === false || villages === false) {
			return;
		}
		villages = makeArray(villages, ",");
		
		// Den Zoomfaktor setzen
		var options = document.getElementById("zoom").getElementsByTagName("option");
		for(var x = 0; x < options.length; x++) {
			if(options[x].text == zoom) {
				document.getElementById("zoom").options[x].selected = true;
				break;
			}
		}
		
		// Die Zentrumskoordinaten setzen
		document.getElementById("settingsCenterX").value = center.split("|")[0];
		document.getElementById("settingsCenterY").value = center.split("|")[1];
		
		// Doerfer hinzufuegen
		window.setTimeout('for(var x=0;x<' + villages.length.toString() + ';x++){AddVillageMarker();}', 1);
		window.setTimeout('var villages=["","' + villages.join("\",\"") + '"];for(var x=1;x<villages.length;x++){document.getElementById("v" + x + "x").value=villages[x].split("|")[0];document.getElementById("v" + x + "y").value=villages[x].split("|")[1];}', 2);
		
		// Auf "Karte erzeugen" druecken
		window.setTimeout('document.getElementById("submitSettings").click();', 3);
		return;
	} else 
	if(location.href.match(/[?&]screen=memo($|\&)/)) {
		// Ein runtimes-Tag-Bild in die BB-Codesliste einfuegen
		var div = document.createElement('div');
		div.id = "bb_runtimes";
		//document.getElementById('bb-bar').getElementsByTagName('div')[0].appendChild(div);
		
		var link = document.createElement("a");
		link.href = "javascript:insertBBcode('message','[runtimes]','[/runtimes]');";
		div.appendChild(link);
		
		var image = document.createElement("img");
		image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAABGdBTUEAALGPC" + 
		"/xhBQAAAn5JREFUOE+NlMtLVFEcx+9gD2MwoyctgihGZhNCL/KRoaWol4iEQAtykdhj4ZRmKNrE5CPlImoK" + 
		"GkYLy6LXpOOjtCnKaaHOSMY0izD6B4J2kTv7HH7D7TQuSr7OcM/5fc739zh3HL9+RKcj338uLRn/+nMYDgl" + 
		"ZNpadyck5+7cYk1NvYxH/l4/Di59GbMljwqK+CwJoPB+ZIOjb57EETfv7WBm702h/6gEggMaz4XGOXAk/aL" + 
		"7UX1N6zUz3lmWVuhxXitL0GBBA5Sz5TA51Ddyqbao6iyePkFZlfsOxnRcytlXuWytixU5eOduwXrPAvlMZP" + 
		"tN1PTe11dyMqo+keA6pI9giQIPDgUURWYQDknNjkRu4tXi7dXIHcHNhKvCN7FXwf8GP+lvavB4+v0ZHZ8cH" + 
		"nt4803suq+e0yzI3dp5Qajq6DvL8niRUV5gWbxju0ZnBWPihKPTYEtIq2eXL34QbgsSwZm8Sunxww0LwPoh" + 
		"K2x+YWPhwT0SrBhvK2ssPS6lgPSV/POl5beZW8pJgQONF4OX8e/UcCz0Z8lbcrTKlTukT5vWZayiSbOkCnk" + 
		"KCACp4Ntg7/66P+yCDZTwwVIttW0EKcN0BBycSYwtEwbhH3nTPBbvJhyGT89Xc3diCdR1fT7XUWZ1ukDAxu" + 
		"lTa1G0vcUmo+WKOm9nUZzuBW/JWC0za5KzD8TnbS1wyuRtkjjm27QVqsKQNTzsSYVLXl8Tck+dmVPAdxU6E" + 
		"P0dI8hyNB0i8Zh1mWmJO5YyUbgmJyJxpIYlXNfNP6xJ46TxXhfxx4xTEG8KJvGTsgiiYdzo02jHzqnPu9W1" + 
		"dK1fsXbZA1I8BP0N80TpO+k8RDAL4G/JjhcoyUWRQAAAAAElFTkSuQmCC";
		image.alt = "Runtimes";
		image.title = "Runtimes";
		link.appendChild(image);
		
		//var row = document.getElementById("show_row");	// Der Notizblock
		var row = getElementByClass("show_row");
		var notices = row.innerHTML;					// Alle Notizen
		var currentCoords = getCurrentCoords();			// aktuelle Koordinaten
		var default_title_index = 0;					// Standard-ID eines spans
		var spanIDs = [];								// Array von allen existierenden Span IDs
		var runningAttacks = getRunningAttacks();		// Die laufenden Angriffe laden
		
		// Falls keine "runtimes"-Tags da sind, gleich wieder beenden
		if(!notices.match(/\[runtimes\]/) || !notices.match(/\[\/runtimes\]/)) {
			return false;
		}
		
		// die "runtimes"-Tags du ein Span-Tag ersetzen mit Namen "runtimes"
		row.innerHTML = row.innerHTML.replace(/\[runtimes\]/g, "<span name='runtimes'>").replace(/\[\/runtimes\]/g, "</span>");
		
		// Die span-Tags ermitteln
		var spans = document.getElementsByName("runtimes");
		for(var x = 0; x < spans.length; x++) {
			var span = spans[x];
			var text = span.innerHTML;
			
			// schauen, ob ein Titel definiert wurde, ansonsten einen Standardwert nehmen und dann den Wert als ID von Span definieren
			if(span.getElementsByTagName("b").length > 0 && span.getElementsByTagName("b")[0].textContent != "") {
				var title = span.getElementsByTagName("b")[0].textContent;
				span.id = title;
			} else {
				var title = "";
				span.id = config.defaultSpanName + (default_title_index++).toString();
			}
			spanIDs.push(span.id);
			
			//Falls irgendwelche Koords falsch waren, den Link trotzdem anzeigen
			if(text.match(/Dorf ung.ltig/)) {
				span.innerHTML = text.replace(/Dorf ung.ltig/g, "<a href=''>Dorf ung&uuml;ltig</a>");
			}
			
			// Faktor der gewaehlten Einheit
			var unit_factor = getUnitFactor(span.id);
			
			// Array von allen enthaltenen Koordinaten
			var allCoords = [];
			
			// Alle Links durchgehen und die Infos rausziehen
			var links = span.getElementsByTagName("a");
			var data = [];
			for(var y = 0; y < links.length; y++) {
				var row = {
					'url': links[y].href, 
					'coords': (links[y].textContent.match(/\((\d{1,3}\|\d{1,3})\) K\d+/)) ? RegExp.$1 : currentCoords, 
					'villagename': links[y].innerHTML, 
					'comment': links[y].nextSibling.nextSibling.innerHTML, 
					'vid': (links[y].href.match(/[&?]id=(\d+)($|\&)/)) ? RegExp.$1 : 0
				}
				allCoords.push(row.coords);
				data.push(row);
			}
			
			// Den ganzen Text loeschen um Platz fuer die neue Umgebung zu schaffen
			span.innerHTML = "";
			
			// Falls ein Titel gesetzt wurde, diesen auch darstellen
			if(title != "") {
				var head = document.createElement("h3");
				head.innerHTML = title;
				span.appendChild(head);
			}
			
			// Die Tabelle erzeugen, in die alles rein soll
			var table = document.createElement("table");
			table.className = "vis";
			table.style.width = "100%";
			span.appendChild(table);
			
			var tbody = document.createElement("tbody");
			table.appendChild(tbody);
			
			// Die Beschriftungszeile + Zellen erzeugen und einfuegen
			var row = document.createElement("tr");
			tbody.appendChild(row);
			
			var descriptions = ['Dorf','Kommentar','Laufzeit','Ankunftszeit','@RESET@'];
			for(var y = 0; y < descriptions.length; y++) {
				var cell = document.createElement("th");
				cell.style.paddingLeft = "5px";
				cell.style.paddingRight = "5px";
				cell.style.textAlign = "center";
				cell.style.border = "1px solid black";
				cell.innerHTML = descriptions[y];
				row.appendChild(cell);
				
				switch(descriptions[y]) {
					case 'Dorf':
						cell.style.textAlign = "left";
						
						var linkSpan = document.createElement("span");
						linkSpan.style.cssFloat = "right";
						cell.appendChild(linkSpan);
						
						var link = document.createElement("a");
						link.href = "http://" + location.host.split(".")[0] + ".twmaps.org/index.php?center=" + escape(getCenter(allCoords)) + "&zoom=5&villages=" + escape(allCoords.join(","));
						link.innerHTML = "TWmaps-D&ouml;rferliste";
						link.target = "_blank";
						linkSpan.appendChild(link);
						break;
					
					case 'Laufzeit':
						cell.style.textAlign = "left";
						
						var list = document.createElement("select");
						list.id = "kindOfUnit";
						list.size = "1";
						list.style.backgroundColor = "#F8F4E8";
						list.style.cssFloat = "right";
						list.setAttribute("onchange", "(" + function () {
							var factor = document.getElementById("kindOfUnit").value;
							localStorage.setItem("runtime", factor);
							
							window.alert("Gespeichert!");
							location.reload();
						} + ")();");
						cell.appendChild(list);
						
						for(var i = 0; i < config.unitNames.length; i++) {
							var option = document.createElement("option");
							option.selected = (config.unitRuntimes[i] == unit_factor);
							option.value = config.unitRuntimes[i];
							option.innerHTML = config.unitNames[i];
							list.appendChild(option);
						}
						break;
					
					case '@RESET@':
						//var code = "<a href='javascript: (" + reset + ")(\"" + span.id + "\");'><img style='height:15px;' src='/graphic/unit/att.png' alt='Zur&uuml;cksetzen' title='Zur&uuml;cksetzen' /></a>";
						var code = "<img style='height:15px;' src='/graphic/unit/att.png' alt='laufende Angriffe' title='laufende Angriffe' />";
						cell.innerHTML = cell.innerHTML.replace(/@RESET@/, code);
						break;
				}
			}
			
			// Die Daten errechnen und setzen
			for(var y = 0; y < data.length; y++) {
				var row = document.createElement("tr");
				// Die Zeile umranden, ueber der gerade die Maus ist
				row.addEventListener('mouseover', function () {
					this.style.outline = "1px solid grey";
				}, false);
				row.addEventListener('mouseout', function () {
					this.removeAttribute("style");
				}, false);
				tbody.appendChild(row);
				
				for(var z = 0; z < descriptions.length; z++) {
					var cell = document.createElement("td");
					cell.style.textAlign = "center";
					row.appendChild(cell);
					
					switch(descriptions[z]) {
						case 'Dorf':
							cell.style.textAlign = "left";
							
							var link = document.createElement("a");
							link.href = data[y].url;
							link.innerHTML = data[y].villagename;
							//link.setAttribute('onclick', 'var makeArray = ' + makeArray + '; var _getCookie = ' + _getCookie + '; var _setCookie = ' + _setCookie + '; (' + raiseAtt + ')("' + span.id + '",' + data[y].vid + ');');
							cell.appendChild(link);
							break;
						case 'Kommentar':
							cell.innerHTML = data[y].comment;
							break;
						case 'Laufzeit':
							cell.innerHTML = calcRuntime(currentCoords, data[y].coords, unit_factor);
							break;
						case 'Ankunftszeit':
							cell.innerHTML = markNB(getArrivalDate(calcRuntime(currentCoords, data[y].coords, unit_factor)));
							break;
						case '@RESET@':
							cell.innerHTML = (runningAttacks[data[y].vid]) ? runningAttacks[data[y].vid].length : 0;
							cell.setAttribute('name', 'runningAtts_' + data[y].vid);
							break;
					}
				}
			}
		}
	} else 
	if(location.href.match(/[?&]try=confirm($|\&)/)) {
		document.getElementsByName("submit")[0].addEventListener('click', function() {
			// Ziel-ID und Ankunft auslesen
			var targetID = _evaluate('//td[.="Ziel:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
			var runtime  = _evaluate('//td[.="Dauer:"]/following::td')[0].textContent.split(":");
			var serverTime = document.getElementById("serverTime").textContent.split(":");
			var serverDate = document.getElementById("serverDate").textContent.split("/");
			
			// Ankunftstimestap berechnen
			var now = new Date(serverDate[1] + " " + serverDate[0] + ", " + serverDate[2] + " " + serverTime.join(":"));
			var arrival = now;
			arrival.setHours(now.getHours() 	+ parseInt(runtime[0], 10));
			arrival.setMinutes(now.getMinutes() + parseInt(runtime[1], 10));
			arrival.setSeconds(now.getSeconds() + parseInt(runtime[2], 10));
			arrival.setMilliseconds(0);
			var timestap = arrival.getTime();
			
			// Angriff speichern
			var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
			runningAttacks.push(targetID + ":" + timestap);
			localStorage.setItem("runningAttacks", runningAttacks.join(","));
		}, false);
	} else 
	if(location.href.match(/[?&]screen=info_command($|\&)/)) {
		// Nur bei Angriffen auslesen
		var type = document.getElementsByTagName("h2")[0].textContent.split(" ")[0];
		if(type != "Angriff") {
			return;
		}
		
		// Ziel-ID und Ankunft auslesen
		var targetID = _evaluate('//td[.="Ziel"]/parent::tr/following::tr/td[.="Dorf:"]/following::td/a')[0].href.match(/[&?]id=(\d+)($|\&)/)[1];
		var arrival	 = _evaluate('//td[.="Ankunft:"]/following::td')[0].textContent;
		var timestap = convertDate(arrival);
		
		var runningAttacks = makeArray(localStorage.getItem("runningAttacks"), ',');
		if(runningAttacks.contains(targetID + ":" + timestap) === false) {
			runningAttacks.push(targetID + ":" + timestap);
			localStorage.setItem("runningAttacks", runningAttacks.join(","));
		}
	}
	
	if(_evaluate('//a[.="abbrechen"]').length > 0) {
		var link = _evaluate('//a[.="abbrechen"]')[0];
		link.addEventListener('click', cancelCommand, false);
	}
})();