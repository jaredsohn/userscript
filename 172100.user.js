// ==UserScript==
// @name        Feuerwache.net Bot: Ice Break
// @description Feuerwache.net Bot
// @namespace   http://userscripts.org/users/503400
// @include     http://www.feuerwache.net/*
// @version     2013-06-28 13:00
// ==/UserScript==

// This bot needs "AAO Script by Amtsleiter" or some such "AAO Script".
// Only tested with "AAO Script by Amtsleiter - Hogsmeade".


// Variablen
var active = GM_getValue("active", true);
var neuerEinsatz = GM_getValue("neuerEinsatz", true);
var wichtigeRueckmeldung = GM_getValue("wichtigeRueckmeldung", false);
var verstaerkungBenoetigt = GM_getValue("verstaerkungBenoetigt", false);
var autoclick_uebersicht = GM_getValue("autoclick_uebersicht", true);
var autorefresh_uebersicht = GM_getValue("autorefresh_uebersicht", "20000");
var autoclick_einsatz = GM_getValue("autoclick_einsatz", "1000");
var autoforwarding_alarm = GM_getValue("autoforwarding_alarm", true);
var adr = document.location.href;

// Konfigurationslink einbetten
setConfigLink();


// Nur wenn aktiv
if (active) {

	// Übersichtsseite
	if (adr == "http://www.feuerwache.net/feuerwehr-einsaetze") {
		UebersichtSeite();
	}
	// Alarm-Bestätigungsseite (-> Weiterleitung auf Einsatzseite)
	else if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*/alarm") && autoforwarding_alarm) {
		window.location = "http://www.feuerwache.net/feuerwehr-einsaetze";
	}
	// Einsatzseite
	else if (adr.match("http://www.feuerwache.net/feuerwehr-einsaetze/[0-9]*")) {
		EinsatzSeite();
	}
}

// Konfigurationsseite
if (adr == "http://www.feuerwache.net/IceBot-Config") {
	KonfigSeite();
}



//////////////////////////////////////////////////////////////////////////
//			KONFIGURATIONSLINK
//////////////////////////////////////////////////////////////////////////
function setConfigLink() {
	var credits = document.getElementById('navigation_logo');
	var li = document.createElement('li');
	var a = document.createElement('a');
	var text = document.createTextNode("Ice-Break Konfiguration");
	a.setAttribute('href', '/IceBot-Config');
	a.appendChild(text);
	li.appendChild(a);
	credits.appendChild(li);
}


//////////////////////////////////////////////////////////////////////////
//			ÜBERSICHTSSEITE
//////////////////////////////////////////////////////////////////////////
function UebersichtSeite() {
	if (autorefresh_uebersicht >= 0) { setTimeout(function() { window.location.reload(); }, autorefresh_uebersicht); }
	if (autoclick_uebersicht) {
		var TR = document.getElementsByTagName("tr");
		for (var i=0;TR.length > i; i++) {
			var link = TR[i+1].getElementsByTagName('a')[0].href;
			var imgElement = TR[i+1].getElementsByTagName('img')[0];
			if (imgElement) {
				switch(imgElement.src) {

					// Neuer Einsatz
					case "http://www.feuerwache.net/images/lightning.png":
						if (neuerEinsatz) {
							window.location = link;
							break;
						}

					// Wichtige Rückmeldung
					case "http://www.feuerwache.net/images/error.png":
						if (wichtigeRueckmeldung) {
							window.location = link;
							break;
						}

					// Verstärkung benötigt
					case "http://www.feuerwache.net/images/bell.png":
						if (verstaerkungBenoetigt) {
							window.location = link;
							break;
						}

					// Default
					default:;
				}
			}		
		}
	}
}


//////////////////////////////////////////////////////////////////////////
//			EINSATZSEITE
//////////////////////////////////////////////////////////////////////////
function EinsatzSeite() {
	if (autoclick_einsatz >= 0) {
		setTimeout(function() { document.forms[0].submit(); }, autoclick_einsatz);
	}
}


//////////////////////////////////////////////////////////////////////////
//			KONFIGURATIONSSEITE
//////////////////////////////////////////////////////////////////////////
function KonfigSeite() {
	var content = document.getElementById('content');
	var len = content.childNodes.length;
	
	for (var i = 1; i <= len; i++) {
		content.removeChild(content.childNodes[0]);
	}
	
	// Setze Überschrift
	var ueberschrift = document.createElement('h1');
	ueberschrift.appendChild(document.createTextNode('Konfiguration des IceBreak-Bot'));
	content.appendChild(ueberschrift);
	
	// Setze HTML-Inhalt
	content.appendChild(KonfigSeite_HTML());
	
	// Setze auf alle Checkboxes einen EventListener
	var checkBoxes = document.getElementsByName("configCheckBox");
	for ( var i=0;i < checkBoxes.length;i++) {
		checkBoxes[i].addEventListener ( "click" , function() { GM_setValue(this.id, this.checked); }, false);
	}

	// Setze auf alle Textfelder einen EventListener
	var textFields = document.getElementsByName("configTextField");
	for ( var i=0;i < textFields.length;i++) {
		textFields[i].addEventListener ( "change" , function() { GM_setValue(this.id, this.value); }, false);
	}
	
}


function KonfigSeite_HTML()
{  
  var div = document.createElement("div");
  div.id = "IceBot_config";
  var htmlCode = "<br>";

  htmlCode += "Dieser Bot arbeitet in der Zusammenarbeit mit einem passenden 'AAO Script' die Einsätze automatisiert ab.<br />"
  htmlCode += "Das o.g. 'AAO Script' muss zusätzlich zur vollen Funktionalität installiert und konfiguriert sein.<br />"
  htmlCode += "Es werden nur Einsätze der eigenen Stadt berücksichtigt.<br />"
  htmlCode += "<br /><br />"
  htmlCode += "<hr />";

  htmlCode += "<h2>Allgemein</h2>";
  
  htmlCode += "<input type='checkbox' name='configCheckBox' id='active'";
  if (active) htmlCode += " checked";
  htmlCode += "> Bot aktivieren";

  htmlCode += "<br /><br />";
  htmlCode += "<hr />";

  htmlCode += "<h2>Einsatztypen</h2>"
  
  htmlCode += "<input type='checkbox' name='configCheckBox' id='neuerEinsatz'";
  if (neuerEinsatz) htmlCode += " checked";
  htmlCode += "> Neuer Einsatz";
  htmlCode += "<br />"
  
  htmlCode += "<input type='checkbox' name='configCheckBox' id='wichtigeRueckmeldung'";
  if (wichtigeRueckmeldung) htmlCode += " checked";
  htmlCode += "> Wichtige Rückmeldung";
  htmlCode += "<br />"
  
  htmlCode += "<input type='checkbox' name='configCheckBox' id='verstaerkungBenoetigt'";
  if (verstaerkungBenoetigt) htmlCode += " checked";
  htmlCode += "> Verstärkung benötigt";
  htmlCode += "<br /><br />";

  htmlCode += "<strong>Warnung:</strong> Das AAO-Script muss bei jedem Einsatz der obigen angewählten Einsatztypen mindestens ein Fahrzeug auswählen. Andernfalls meldet die Seite 'Keine Fahrzeuge ausgewählt' zurück und der Einsatz bleibt weiterhin bestehen. Dies führt zu einer Endlosschleife. <strong><font color='#00FF00'>Wählen Sie daher nur Einsatztypen aus, bei denen bei jedem Einsatz mindestens ein Fahrzeug automatisiert vom AAO Script ausgewählt wird.</font></strong>"


  htmlCode += "<br /><br />";
  htmlCode += "<hr /><br />";
  
  
  // ~~~~~~~~~~~~~~~~~~~~~~
  // Einsatz Übersichtsseite
  htmlCode += "<br /><h2>Verhalten auf der Einsatz-Übersichtsseite</h2>\n";
  
  // Beginn der Tabelle
  htmlCode += '<table class="defaultTable">';
  htmlCode += '<tr><th width="80%" height="20">Beschreibung</th><th width="*">Option</th></tr>';
    
  // Automatische Weiterleitung zum nächsten eigenen Einsatz
  htmlCode += '<tr><td style="text-align:center; height:30px;">Automatische Weiterleitung auf die Seite des nächsten Einsatzes</td>';
  htmlCode += '<td style="text-align:center; height:30px;"><input type="checkbox" name="configCheckBox" id="autoclick_uebersicht"';
  if (autoclick_uebersicht) htmlCode += ' checked';
  htmlCode += '></td></tr>';
  
  // Automatisches Neuladen der Seite nach X Millisekunden
  htmlCode += '<tr><td style="text-align:center; height:30px;">Automatisches Neuladen der Seite nach Millisekunden (\'-1\' = deaktiviert)</td>';
  htmlCode += '<td style="text-align:center; height:30px;"><input name="configTextField" id="autorefresh_uebersicht" type="text" size="3"';
  htmlCode += ' value="'+autorefresh_uebersicht+'"';
  htmlCode += '></td></tr>';
  
  // Ende der Tabelle
  htmlCode += '</table>';
  
  
  // ~~~~~~~~~~~~~~~~~~~~~~
  // Beliebige Einsatzsseite
  htmlCode += "<br><br><h2>Verhalten auf einer beliebige Einsatzsseite</h2>\n";
  
  // Beginn der Tabelle
  htmlCode += '<table class="defaultTable">';
  htmlCode += '<tr><th width="80%" height="20">Beschreibung</th><th width="*">Option</th></tr>';
    
  // Automatisches Bestätigen des Buttons 'Alarmieren' nach X Sekunden
  htmlCode += '<tr><td style="text-align:center; height:30px;">Automatisches Bestätigen des Buttons \'Alarmieren\' nach Millisekunden (\'-1\' = deaktiviert)</td>';
  htmlCode += '<td style="text-align:center; height:30px;"><input name="configTextField" id="autoclick_einsatz" type="text" size="3"';
  htmlCode += ' value="'+autoclick_einsatz+'"';
  htmlCode += '></td></tr>';
  
  // Ende der Tabelle
  htmlCode += '</table>';
  
  
  // ~~~~~~~~~~~~~~~~~~~~~~
  // Alarmierung-Bestätigungsseite
  htmlCode += "<br><br><h2>Verhalten auf der Alarmierung-Bestätigungsseite</h2>\n";
  
  // Beginn der Tabelle
  htmlCode += '<table class="defaultTable">';
  htmlCode += '<tr><th width="80%" height="20">Beschreibung</th><th width="*">Option</th></tr>';
    
  // Automatisches Bestätigen des Buttons 'Alarmieren' nach X Sekunden
  htmlCode += '<tr><td style="text-align:center; height:30px;">Weiterleitung auf die Einsatz-Übersichtsseite</td>';
  htmlCode += '<td style="text-align:center; height:30px;"><input type="checkbox" name="configCheckBox" id="autoforwarding_alarm"';
  if (autoforwarding_alarm) htmlCode += ' checked';
  htmlCode += '></td></tr>';
  
  // Ende der Tabelle
  htmlCode += '</table>';
  
  
  // ~~~~~~~~~~~~~~~~~~~~~~
  // "Seite aktualisieren"-Funktion
  htmlCode += '<br /><br /><br /><br />';
  htmlCode += '<a href="'+adr+'">Seite aktualisieren</a>';
  
  // Platzhalter
  htmlCode += '<br />';
    
  // HTML-Code in den DIV-Container einfügen und zurückgeben
  div.innerHTML = htmlCode;
  return div;
}

function KonfigSeite_checkBoxClicked() {
	var checkBoxes = document.getElementsByName("IceBot_config");
	
	for (var i=0;i<checkBoxes.length;i++) {
		var Box = checkBoxes[i];
		var VarNam = Box.id.replace ("Konf","showInfo");
		var OldVal = eval(VarNam);
		var NewVal = Box.checked;
	}
}