// ==UserScript==
// @name				DSeditSupportNames
// @author				Heinzel
// @description 			Merkt sich bei Unterstueztungen die Truppenzahlen und benennt spaeter danach die Befehler um
// @namespace			http://userscripts.org
// @include				http://*staemme*/game.php?*screen=place*
// ==/UserScript==




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

function getUnits() {
	var unitnames = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
	var units = [];
	
	for(var x = 0; x < unitnames.length; x++) {
		try {
			var len = document.getElementsByName(unitnames[x])[0].value;
			units.push(len);
		} catch(e){}
	}
	
	return units;
}

function setCookie(name, value) {
	document.cookie = name + "=" + value + ";";
}

function getCookie(name) {
	var value = document.cookie.split(name + "=")[1].split(";")[0];
	
	if(document.cookie.match(name + "=")) {
		return value;
	} else {
		return false;
	}
}

function deleteCookie(name) {
	document.cookie = name + "=;expires=Thu, 01-Jan-70 00:00:01 GMT";
}

function getRuntime() {
	return _evaluate('//td[.="Dauer:"]/parent::tr/td[last()]')[0].textContent
}

function getCurrentCoords() {
	var bold = _evaluate('//b[contains(@class, "nowrap")]')[0];
	var coords = bold.textContent.match(/\((\d{1,3}\|\d{1,3})\)/)[1];
	
	return coords;
}

(function main() {
	if(location.href.match(/try=confirm/)) {
		// Ueberpruefen ob es sich um eine Unterstuetzung handelt
		var kind = document.getElementsByTagName("h2")[0].innerHTML;
		if(kind != "Unterstützung") {
			return;
		}
		
		// Daten beim absenden speichern
		_evaluate('//input[last()]')[0].addEventListener('click', function() {
			// Die Einheiten die mitgeschickt werden auslesen
			var units = getUnits();
			
			// Die Koords des aktuellen Dorfes ermitteln
			var coords = getCurrentCoords();
			
			// Laufzeit des Angriffs ermitteln
			var runtime = getRuntime();
			
			// zusammenfassen
			var data = escape(runtime + "->" + coords + ": " + units.join(" "));
			
			// Speichern
			setCookie("DSeditSupportNames_data", data);
		}, false);
	} else {
		// Falls keine Befehle vorhanden, das Script beenden
		if(_evaluate('//h3[.="Truppenbewegungen"]').length == 0) {
			return;
		}
		
		// Daten laden
		var data = unescape(getCookie("DSeditSupportNames_data"));
		if(data == "false") {
			// nichts gespeichert
			return;
		}
		var runtime = data.split("->")[0];
		var data = data.split("->")[1];
		
		// Laufzeit der Befehler ermitteln
		var runtimes = _evaluate('//span[@class="timer"]');
		for(var x = 0; x < runtimes.length; x++) {
			if(runtime == runtimes[x].textContent) {
				// Beim richtigen Wert den Befehl umbenennen
				var field = _evaluate('//h3[.="Truppenbewegungen"]/following::table/descendant::tr/td/span/parent::td/descendant::input')[x];
				field.value = data;
				
				var button = field.nextSibling.nextSibling;
				button.click();
				
				//Cookie loeschen
				deleteCookie("DSeditSupportNames_data");
			}
		}
	}
})();