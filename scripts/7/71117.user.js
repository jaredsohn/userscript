// ==UserScript==
// @name				DSconvertIncomingsToBBCodes
// @author				Heinzel
// @version				1.1.1
// @namespace			http://userscripts.org
// @description			Konvertiert Incomings in BB-Codes als Deff-Anfrage, sortiert nach angegriffenen Doerfern
// @include				http://*.die-staemme.de/game.php*screen=overview_villages*mode=incomings*
// ==/UserScript==


// Version: 1.1.1
// Changelog: 
//	1.0.0		- Veroeffentlichung
//	1.1.0		- Bugfix (DS-v6.3)
//				- Umarbeitung auf OOP
//				- Verschoenerung der Ausgabe und des Aufrufs
// 				- Auswahl zwischen einer Kurz- und einer Langfassung
//	1.1.1		- Anpassung an DS-v7.0


function CConfig() {
	this.units = {
		'SPY': "spy", 
		'SP%C4HER': "spy", 
		'SP%C4H': "spy", 
		'LKAV': "light", 
		'LEICHTE': "light", 
		'SKAV': "heavy", 
		'SCHWERE': "heavy", 
		'AXT': "axe", 
		'AXTIES': "axe", 
		'SCHW': "sword", 
		'SCHWERT': "sword", 
		'RAM': "ram", 
		'RAMME': "ram", 
		'AG': "snob", 
		'AGS': "snob", 
		'FAKES': "fake"
	};
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

function _trim(string) {
	return string.replace(/^\s+|\s+$/g, "");
}

function CVillage() {
	this.coords = "";
	this.id = -1;
}

function CPlayer() {
	this.name = "";
	this.id = -1;
	this.village = new CVillage();
}

function CIncoming() {
	this.label = "";
	this.kind = "";
	this.id = -1;
	this.target = new CVillage();
	this.attacker = new CPlayer();
	this.slowest_unit = "";
	this.arrival = "";
	
	this.translate = function(unitName) {
		var unitName = escape(unitName.toUpperCase());
		
		if(config.units[unitName]) {
			return config.units[unitName];
		} else {
			return unitName;
		}
	};
}

function convertIncomings() {
	var rows = _evaluate('//a[contains(@href, "screen=info_command")]/parent::span/parent::td/parent::tr');
    var incomings = {};
	var coords = new Array();
	var defaultUnits = config.units;
	defaultUnits.join = function(separator) {
		var string = "";
		for(var key in this) {
			if(key != 'join') {
				string += key.replace(/\%C4/, ".") + separator;
			}
		}
		return string;
	};
	var reg = new RegExp("\\b(" + defaultUnits.join("|") + ")\\b", "i");
	
	var version = (window.confirm("Wollen Sie die Ausgabe in Kurz- ('OK') oder die Langversion ('Abbrechen') haben?") === false) ? 'long' : 'short';
	
	// Falls gar keine Angriffe laufen, das Script beenden
    if (rows.length == 0) {
        window.alert("Keine Truppenbewegungen vorhanden!");
        return;
    }
	
	// Angriffszahl bestimmen
	var link = _evaluate('//img[contains(@src, "graphic/unit/att.png")]/parent::a/following::td/a')[0];
	incomings.att_len = parseInt(link.textContent.replace(/\s*\((\d+)\)\s*/, "$1"), 10);
	incomings.sup_len = (rows.length-incomings.att_len > 0) ? rows.length-incomings.att_len : 0;
	incomings.attacked_village_len = 0;
	incomings.contains = function (vid) {
		for(var x = 0; x < this.attacked_village_len; x++) {
			if(this[x][0].target.vid == vid) {
				return x;
			}
		}
		
		return false;
	}
	
	// Angriffsdaten bestimmen
    for(var x = 0; x < rows.length; x++) {
		var cells = rows[x].getElementsByTagName("td");
		var inc = new CIncoming();
		inc.label = cells[0].textContent.replace(/^\s*|\s*$/g, ""); 
		
		if(inc.label.match(/^[+]{2}/)) {
			continue;
		}
		
		inc.kind 					= (cells[0].getElementsByClassName('attack-icon') === null) ? 'support' : 'attack';
		inc.id 						= cells[0].getElementsByTagName("a")[0].href.match(/[?&]id=(\d+)($|\&)/)[1];
		inc.target.coords 			= _trim(cells[1].textContent.replace(/.*?\((\d{1,3}\|\d{1,3})\).*/, "$1"));
		inc.target.vid 				= cells[1].getElementsByTagName("a")[0].href.match(/[?&]village=(\d+)($|\&)/)[1];
        inc.attacker.name 			= _trim(cells[2].getElementsByTagName('a')[0].textContent);
		inc.attacker.id 			= cells[2].getElementsByTagName("a")[0].href.match(/[?&]id=(\d+)($|\&)/)[1];
		inc.attacker.village.coords = (inc.label.match(/\((\d{1,3}\|\d{1,3})\)/)) ? RegExp.$1 : false;
		inc.slowest_unit 			= cells[0].textContent.match(reg);
		inc.slowest_unit 			= (inc.slowest_unit) ? inc.translate(inc.slowest_unit[1]) : false;
		inc.arrival 				= _trim(cells[3].textContent).replace(/^\s*am\s+/, "");
		
		if(incomings.contains(inc.target.vid) !== false) {
			var index = incomings.contains(inc.target.vid);
		} else {
			var index = incomings.attacked_village_len++;
			incomings[index] = new Array();
		}
		
		incomings[index].push(inc);
    }
	
	// Die formatierte Anzeige erstellen
	if(version == 'long') {
		var text = "Es laufen derzeit ingesamt " + incomings.att_len + " Angriffe und " + incomings.sup_len + " Unterstuetzungen!\n\n\n";
		text += "Es laufen Truppen auf " + incomings.attacked_village_len + " Doerfer: \n";
		
		for(var x = 0; x < incomings.attacked_village_len; x++) {
			text += "\nDorf [village]" + incomings[x][0].target.coords + "[/village]: \n";
			for(var y = 0; y < incomings[x].length; y++) {
				text += (1+y).toString() + ".) ";
				
				var inc = incomings[x][y];
				if(inc.kind == "attack") {
					text += "Ein Angriff mit [img]http://" + location.host + "/graphic/unit/unit_" + inc.slowest_unit + ".png[/img] aus dem Dorf [village]" + inc.attacker.village.coords + "[/village]";
				} else {
					text += "Eine Unterstuetzung";
				}
				text += " vom Spieler [player]" + inc.attacker.name + "[/player]. Ankunft: am " + inc.arrival + "\n";
			}
		}
	} else {
		var text = "";
		for(var x = 0; x < incomings.attacked_village_len; x++) {
			if(incomings[x].length > 1) {
				var label = 'Angriffe';
			} else {
				var label = 'Angriff';
			}
			
			text += "[village]" + 
					incomings[x][0].target.coords + 
					"[/village]: " + 
					incomings[x].length.toString() + 
					" " + 
					label + 
					" - Ankunft ab: " + 
					incomings[x][0].arrival + "\n";
		}
	}
	
	var field = document.getElementById("textField");
	field.innerHTML = text;
	field.focus();
	field.select();
	toggleOutput();
}

function createCaller() {
	var groupEditLink = _evaluate('//a[contains(., "Gruppen bearbeiten")]')[0];
	
	var link = document.createElement("a");
	link.href = "#";
	link.innerHTML = "&raquo;&nbsp; Incs konvertieren";
	link.addEventListener('click', convertIncomings, false);
	groupEditLink.parentNode.insertBefore(link, groupEditLink);
	
	var cursorReturn = document.createElement("br");
	groupEditLink.parentNode.insertBefore(cursorReturn, groupEditLink);
}

function createOutputWindow() {
	var blackCurtain = document.createElement("div");
	with(blackCurtain.style) {
		position = "absolute";
		left = "0px";
		right = "0px";
		top = "0px";
		bottom = "0px";
		backgroundColor = "black";
		display = "none";
		zIndex = "8";
		MozOpacity = "0.6"; 
		opacity = ".60"; 
		filter = "alpha(opacity = 60)";
	}
	blackCurtain.id = "curtain";
	document.body.appendChild(blackCurtain);
	
	var container = document.createElement("div");
	with(container.style) {
		height = "470px";
		width = "670px";
		position = "absolute";
		left = "50%";
		top = "50%";
		marginTop = "-250px";
		marginLeft = "-350px";
		display = "none";
		zIndex = "9";
		padding = "15px"; 
		textAlign = "center";
		backgroundColor = "white";
		border = "1px solid black";
	}
	container.id = "container";
	document.body.appendChild(container);
	
	var textField = document.createElement("textarea");
	textField.id = "textField";
	textField.cols = "80";
	textField.rows = "25";
	container.appendChild(textField);
	
	var closeButton = document.createElement("button");
	closeButton.style.position = "absolute";
	closeButton.style.right = "15px";
	closeButton.style.bottom = "15px";
	closeButton.style.padding = "0px";
	closeButton.style.paddingLeft = "5px";
	closeButton.style.paddingRight = "5px";
	closeButton.innerHTML = "CLOSE";
	closeButton.addEventListener('click', toggleOutput, false);
	container.appendChild(closeButton);
}

function toggleOutput() {
	var curtain = document.getElementById("curtain");
	var container = document.getElementById("container");
	if(curtain.style.display == "none") {
		curtain.style.display = "block";
		container.style.display = "block";
	} else {
		curtain.style.display = "none";
		container.style.display = "none";
	}
}

(function __main() {
	config = new CConfig();
	createCaller();
	createOutputWindow();
})();