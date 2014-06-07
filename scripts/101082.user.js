// ==UserScript==
// @name           DS-Dorfname_Vorbesitzer
// @namespace      Die Staemme
// @description    Dorf nach Vorbesitzer benennen
// @include        http://*.die-staemme.*/game.php*
// @include        http://*.staemme.*/game.php*
// @version 	   1.0a
// @author 	   Lukas R. (LudwigXXXXXV)
// ==/UserScript==

// -----------------------------------------------------------------------------
//      Modifikationen und Weiterverbreitung dieses Scripts benötigen die 
//                           Zustimmung des Autors.
// -----------------------------------------------------------------------------

/*
	Variablen
*/
var version;
var game_data;
var einstellungen;
var GM;


function main() {
	// Bericht
	var att_result = document.getElementById("attack_results");
	if (att_result != undefined) { // Tabellenteil vorhanden -> Richtige Seite
		var zustimmungTr = att_result.rows[1];
		if (zustimmungTr != undefined) { // Zustimmungsänderung
			var reg = new RegExp(/von <b>[0-9][0-9]?<\/b> auf <b>(-?[0-9][0-9]?)<\/b>/);
			var erg = zustimmungTr.cells[1].innerHTML.match(reg);
			if (erg != null && erg[1] <= 0) { // Dorf geadelt
				init(); // Einstellungen etc laden
				buttons_erstellen(); // Buttons in Bericht erstellen
			}
		}
	}
	// HG
	if (document.URL.match('screen=main')) { // hauptgebäude?
		var reg = new RegExp(/DSvorbesitzer=(.+)/);
		var erg = document.URL.match(reg);
		if (erg != null) { // neuer name übergeben?
			rename(erg[1]);
		}
	}
}
/*
	Initialisiert vars
*/
function init() {
	version = "1.0a[DS 7.0]";
	// Storage anlegen
	GM = new Storage("DSDorfnameVorbesitzer", true);
	// Game_data laden
	ladeGame_data();
	// Einstellungen setzten
	einstellungen = ladeEinstellungen();
	// Eingabefenster erstellen
	eingabeFenster();
}


/*
	egentliches umenennen
*/
function rename(newName) {
	newName = decodeURI(newName);
	if (confirm ("Dieses Dorf in " + newName + " umbennen?")) { // confirm!
		var forms = document.getElementsByTagName("form");
		if (forms == undefined)
			return;
		for (var i = 0; i < forms.length; i++) {
			var inputs = forms[i].getElementsByTagName("input");
			// Richtige inputs?
			if (inputs.length == 2 && inputs[0].name == "name" && inputs[1].type == "submit") {
				// Name setzten
				inputs[0].value = newName;
				click(inputs[1]);
			}
		}
	}
}

/*
	buttons erstellen
*/
function buttons_erstellen() {
	// Dorf nicht selbst geadelt?
	if (game_data.player.name != document.getElementById("attack_info_att").rows[0].cells[1].getElementsByTagName("a")[0].innerHTML)
		return;
	// Dorf verloren?
	if (game_data.player.name == document.getElementById("attack_info_def").rows[0].cells[1].getElementsByTagName("a")[0].innerHTML)
		return;
	var button = document.createElement("input");
	with (button) {
		setAttribute('style','margin-left: 5px; cursor: pointer;');
		type = "button";
		value = "Umbenennen";
		titel = "Dorf nach DS-Dorfname_Vorbesitzer umbenennen";
		addEventListener("click", rename_start, false);
	}
	var optionen = document.createElement("img");
	with (optionen) {
		setAttribute('style','margin-left: 3px; margin-bottom: -8px; float:inherit; cursor: pointer; width:23px; height:23px;');
		src = "http://wiki.goalunited.org/_media/gu_screens/mi_home_setup_11.png";
		alt = "E";
		title = "Einstellungen für DS-Dorfname_Vorbesitzer bearbeiten";
		addEventListener("click", einstellungenFenster, false);
	}
	document.getElementById("attack_info_def").rows[1].cells[1].appendChild(button);
	document.getElementById("attack_info_def").rows[1].cells[1].appendChild(optionen);
}

/*
	return: dataobject
*/
function daten_sammeln() {
	var re = new Object();
	var info = document.getElementById("attack_info_def");
	re['owner'] = info.rows[0].cells[1].getElementsByTagName("a")[0].firstChild.nodeValue; // Spieler
	re['tribe'] = info.rows[0].cells[1].getElementsByTagName("a")[0].title; // Stamm
	// Dorfid
	var reg = new RegExp(/id=([0-9]+)/);
	var erg = info.rows[1].cells[1].getElementsByTagName("a")[0].href.match(reg);
	re['id'] = erg[1];
	return re;
}

/*
	parameter: dataobject
	return: String des neuen Dorfnamens
*/
function createDorfname(data) {
	var re = "";
	switch(einstellungen.tribe) {
		case -1: re = einstellungen.prefix + data.owner + einstellungen.postfix; break;
		case 0: re = "[" + data.tribe + "]" + einstellungen.prefix + data.owner + einstellungen.postfix; break;
		case 1: re = einstellungen.prefix + "[" + data.tribe + "]" + data.owner + einstellungen.postfix; break;
		case 2: re = einstellungen.prefix + data.owner + "[" + data.tribe + "]" + einstellungen.postfix; break;
		case 3: re = einstellungen.prefix + data.owner + einstellungen.postfix + "[" + data.tribe + "]"; break;
	}
	return re;
}

/*
	Femster zur Umbennenung öffnen
*/
function rename_start() {
	var data = daten_sammeln();

	if (createDorfname(data).length > 32) { // Wenn zu lang
		if (!confirm("Der Dorfname wäre zu lang. Trotzdem fortfahren?"))
			return; // Abbruch
	}
	// UV check
	var uv = "";
	var erg = null;
	var reg = new RegExp(/&t=([0-9]+)/);
	erg = game_data.link_base_pure.match(reg);
	if (erg != null)
		uv = erg[0];
	var adresse = encodeURI("http://" + game_data.world + ".die-staemme.de/game.php?village=" + data.id + "&screen=main&" + uv + "DSvorbesitzer=" + createDorfname(data));
	var fenster = window.open(adresse, "Umbenennen", "width=500,height=200,scrollbars=yes");
	fenster.focus();
}
/*
	Läd game_data
	game_data wird direkt geschrieben(kein return)
*/
function ladeGame_data() { // Von Heinzelmänchen(DSForum)
	if(typeof(unsafeWindow) != 'undefined') {
		game_data = unsafeWindow.game_data;
	} else {
		var script = document.createElement("script");
		script.type = "application/javascript";
		script.textContent = 	"var input=document.createElement('input');" + 
								"input.type='hidden';" + 
								"input.value=JSON.encode(game_data);"  + 
								"input.id='game_data';" + 
								"document.body.appendChild(input);";
		document.body.appendChild(script);
		document.body.removeChild(script);
		
		eval("game_data=" + document.getElementById("game_data").value + ";");
	}
}

/*
	Eingabefenster erzeugen
*/
function eingabeFenster() {
	var eingabe = document.createElement("div"); // container
	eingabe.id = "DSvorbesitzer_eingabe";
	eingabe.setAttribute("style","display: none; text-align: center; z-index:201; position: absolute; left: "+(window.innerWidth/2-200)+"px; top: "+(innerHeight/2-50)+"px; font-size: 9pt; font-weight: normal; color: rgb(128, 64, 0); background-color: rgb(247, 238, 211); border-width: 2px; border-style: solid; border-color: rgb(153, 119, 51) rgb(255, 221, 153) rgb(255, 238, 204) rgb(187, 153, 85);");
	eingabe.appendChild(document.createElement("table")); // tabelle für eingabe
	var tr1 = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	eingabe.firstChild.appendChild(tr1);
	eingabe.firstChild.appendChild(tr2);
	eingabe.firstChild.appendChild(tr3);
	
	var td1, td2;
	
	// prefix
	td1 = document.createElement("th");
	td1.appendChild(document.createTextNode("Prefix:"));
	td2 = document.createElement("td");
	td2.appendChild(document.createElement("input"));
	with (td2.firstChild) {
		type = "text";
		id = "DSvorbesitzer_prefix";
		value = einstellungen.prefix;
		addEventListener("change", einstellungenChange, false);
	}
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	// postfix
	td1 = document.createElement("th");
	td1.appendChild(document.createTextNode("Postfix:"));
	td2 = document.createElement("td");
	td2.appendChild(document.createElement("input"));
	with (td2.firstChild) {
		type = "text";
		id = "DSvorbesitzer_postfix";
		value = einstellungen.postfix;
		addEventListener("change", einstellungenChange, false);
	}
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	// tribe
	td1 = document.createElement("th");
	td1.appendChild(document.createTextNode("Stamm:"));
	td2 = document.createElement("td");
	td2.appendChild(document.createElement("select"));
	var text = ["Nicht anzeigen", "Ganz vorne", "Vor Name", "Nach Name", "Ganz hinten"];
	for (var i = 0; i < 5; i++) {
		td2.firstChild.appendChild(document.createElement("option"));
		td2.firstChild.lastChild.value = i-1;
		if (i-1 == einstellungen.tribe)
			td2.firstChild.lastChild.selected = "selected";
		td2.firstChild.lastChild.appendChild(document.createTextNode(text[i]));
	}
	td2.firstChild.addEventListener("change", einstellungenChange, false);
	td2.firstChild.id = "DSvorbesitzer_tribe";
	tr1.appendChild(td1);
	tr2.appendChild(td2);
	
	// Beispiel
	td1 = document.createElement("th");
	td1.appendChild(document.createTextNode("Beispiel:"));
	td2 = document.createElement("td");
	td2.colSpan = 2;
	td2.appendChild(document.createElement("input"));
	with (td2.firstChild) {
		type = "text";
		id = "DSvorbesitzer_beispiel";
		readOnly = true;
		value = createDorfname(daten_sammeln());
		size = 40;
	}
	tr3.appendChild(td1);
	tr3.appendChild(td2);
	
	// Text
	var text = document.createElement("strong");
	text.innerHTML = "Einstellungen für Dorfumbenennung:";
	eingabe.insertBefore(text, eingabe.firstChild); // text vor tabelle
	// Button
	var ok = document.createElement("input");
	with (ok) {
		type = "button";
		value = "Schließen";
		titel = "Einstellungsfenster schliesen";
		addEventListener("click", einstellungenFenster, false);
	}
	eingabe.appendChild(ok);
	document.body.appendChild(eingabe);
}

/*
	Anzeigen / Ausblenden der eingabe
*/
function einstellungenFenster() {
	var eingabe = document.getElementById("DSvorbesitzer_eingabe");
	if (eingabe.style.display == 'none') {
		eingabe.style.display = 'block';
	} else {
		eingabe.style.display = 'none';
	}
}

/*
	Übernehmen und Speichern der neuen Einstellung
	Beispiel anzeigen
*/
function einstellungenChange() {
	// Einstellungen übernehmen
	einstellungen.prefix = document.getElementById("DSvorbesitzer_prefix").value;
	einstellungen.postfix = document.getElementById("DSvorbesitzer_postfix").value;
	einstellungen.tribe = parseInt(document.getElementById("DSvorbesitzer_tribe").value);
	// Speichern
	speicherEinstellungen();
	// Beispiel anzeigen
	document.getElementById("DSvorbesitzer_beispiel").value = createDorfname(daten_sammeln());
	if (document.getElementById("DSvorbesitzer_beispiel").value.length > 32)
		alert("Dieser Dorfname wäre zu lang! (max 32 Zeichen)");
}
/*
	Speichert die Einstellungen
*/
function speicherEinstellungen() {
	GM.setValue(game_data.world + "_" + game_data.player.id, einstellungen); // Welt + SpielerId, einstellungen
}

/*
	Lade gespeicherte Einstellungen für den Sollausbau und Ausblendungen
	
	return: Object mit gespeicherte Werte bzw. Default(Gruppe alle) oder default
*/
function ladeEinstellungen() {
	var re;
	// Versuch Einstellung zu laden
	re = GM.getValue(game_data.world + "_" + game_data.player.id); // Welt + SpielerId
	if (re == undefined) { // Gescheitert?
		re = {'prefix':'', 'postfix':'', 'tribe':-1}; // Default
	}
	return re;
}

/*
	Klicken
	parameter: zu klickendes element
*/
function click(elm) {
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
    elm.dispatchEvent(evt);
}

// Storageklasse nach Hypix
function Storage(prefix,forceGM) {
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
	var win = gm ? unsafeWindow : window;
	var ls = false;
	var intGetValue;
	var intSetValue;
	var prefix = prefix;
	try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
	if(!ls && !gm)
		throw("Keine geeignete Speichermöglichgkeit gefunden");
	if(forceGM && gm || !ls) {
		if(gm) {
			intSetValue = function(key,value) {
				GM_setValue(prefix+"_"+key,value);
			};
			intGetValue = function(key,defaultValue) {
				return GM_getValue(prefix+"_" + key, defaultValue);
			}
			this.deleteValue = function(key) {
				GM_deleteValue(prefix+"_"+key);
			}
			this.listValues = function(re) {
				var allkeys = GM_listValues();
				var serverKeys = [];
				var rePrefix = new RegExp("^"+prefix+"_(.*)$");
				if(typeof(re) != "undefined")
					var reKey = new RegExp(re);
				for(var i = 0; i < allkeys.length; i++) {
					var res = allkeys[i].match(rePrefix);
					if(res) {
						if(reKey) {
							res = res[1].match(reKey);
							if(res)
								serverKeys.push(res);
						} else {
							serverKeys.push(res[1]);
						}
					}
				}
				return serverKeys;
			}
		}
	} else if(ls) {
		intSetValue = function(key,value) {
			localStorage.setItem(prefix+"_"+key, value );
		};    
		intGetValue = function(key,defaultValue) {
			var value = localStorage.getItem(prefix+"_"+key);
			if(value)
				return value;
			else
				return defaultValue;
		};
		this.deleteValue = function(key) {
			localStorage.removeItem(prefix+"_"+key);
		}
		this.listValues = function(re) {
			var keys = [];
			var rePrefix = new RegExp("^"+prefix+"_(.*)$");
			if(typeof(re) != "undefined")
				var reKey = new RegExp(re);
			for(var i = 0; i < win.localStorage.length; i++) {
				var res = localStorage.key(i).match(rePrefix);
				if(res) {
					if(reKey) {
						res = res[1].match(reKey);
						if(res)
							keys.push(res);
					} else {
						keys.push(res[1]);
					}
				}
			}
			return keys;
		}
	}
	this.clear = function(re) {
		var keys = this.listValues(re);
		for( var i = 0; i < keys.length; i++ )
			this.deleteValue(keys[i]);
	}
	this.setValue = function(key,value) {
		switch(typeof(value)) {
			case "object":
			case "function":
				intSetValue(key,"j"+JSON.stringify(value));
				break;
			case "number":
				intSetValue(key,"n"+value);
				break;
			case "boolean":
				intSetValue(key,"b" + (value ? 1 : 0));
				break;
			case "string":
				intSetValue(key,"s" + value );
				break;
			case "undefined":
				intSetValue(key,"u");
				break;
		}
	}  
	this.getValue = function(key,defaultValue) {
		var str = intGetValue(key);
		if(typeof(str) != "undefined") {
			switch(str[0]) {
				case "j":
					return JSON.parse(str.substring(1));
				case "n":
					return parseFloat(str.substring(1));
				case "b":
					return str[1] == "1";
				case "s":
					return str.substring(1);
				default:
					this.deleteValue(key);
			}
		}
		return defaultValue;
	}
	this.getString = function(key) {
		return intGetValue(key);
	}
	this.setString = function(key,value) {
		intSetValue(key,value);
	}
	this.log = function(msg) {
		if(typeof GM_log == "function") {
			GM_log("DS-Dorfname_Vorbesitzer(" + version + "): " + msg);
		}
		else if (window.opera && window.opera.postError) {
			window.opera.postError("DS-Dorfname_Vorbesitzer(" + version + "): " + msg);
		}
		else if (console) {
			console.log("DS-Dorfname_Vorbesitzer(" + version + "): " + msg);
		} else {
			throw ("DS-Dorfname_Vorbesitzer(" + version + "): " + msg);
		}
	}
}

main();