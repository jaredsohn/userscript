// ==UserScript==
// @name            OGame-Skript
// @namespace       OGame
// @description     Vise funkcija za ogame
// @include http://xnova.danubis.eu/*
// ==/UserScript==
/*
OGame-Skript, eine Greasemonkey-Userscript, das OGame um einige, nützliche Funktionen erweitert.
Copyright (C) 2006-2007 Windows-zerstoerer <windows-zerstoerer@gmx.de>

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben und/oder modifizieren, gemäß Version 2 der Lizenz.

Die Veröffentlichung dieses Programms erfolgt in der Hoffnung, daß es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.

Für weitere Details, schaue dir die volle GPL im Internet an: http://www.gnu.org/licenses/gpl.html
Auf deutsch: http://www.gnu.de/gpl-ger.html
Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.
*/
(function () {
if (document.URL.indexOf("/index.php") >= 0) return; // Die index.php nicht mitnehmen
if (document.URL.indexOf("?session=") < 0 && document.URL.indexOf("ainfo.php") < 0 && document.URL.indexOf("renameplanet.php") < 0) return; // Bis auf diese beiden Seiten mssen alle eine SID haben
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Grunddaten
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// einige Konstanten
var SkriptURL = "http://www.alexandergrein.at/ogame-skript/index.php";
GM_setValue("version", "1.2j");
// ein paar Grundvariablen initialisieren
var Datei = document.URL.match(/\/([a-zA-Z0-9_\-]+)\.php/)[1]; // Dateiname der bearbeiteten Datei
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Hinweis in der Navi
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "leftmenu") { // in der Navi einen Hinweis setzen
  var OGameVersion = document.getElementsByTagName("p")[0]; // Absatz mit der OGame-Version finden
	OGameVersion.innerHTML += "";
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// OGame-Skript
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
/*
OGame-Skript, eine Greasemonkey-Userscript, das OGame um einige, nützliche Funktionen erweitert.
Copyright (C) 2006-2007 Windows-zerstoerer <windows-zerstoerer@gmx.de>

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben und/oder modifizieren, gemäß Version 2 der Lizenz.

Die Veröffentlichung dieses Programms erfolgt in der Hoffnung, daß es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.

Für weitere Details, schaue dir die volle GPL im Internet an: http://www.gnu.org/licenses/gpl.html
Auf deutsch: http://www.gnu.de/gpl-ger.html
Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.
*/
(function () {
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Daten
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// einige Konstanten
var StartZeit = new Date();
var RessNamen = new Array("Metal", "Kristal", "Deuterij", "Energija"); // Namen der Ressourcentypen
var MaxVers = 5; // Maximale Anzahl Versuche, das Skript durchzuführen
var VersWart = 2500; // Wartezeit zwischen 2 Versuchen in Millisekunden
var ZeitDiff = NaN;
// Default-Einstellungen
var Default_HatCommander = false;
var Default_MondeGetrennt = false;
var Default_KeinDeut = false;
var Default_FehlressText = true;
var Default_FlottenFaerben = true;
var Default_MaxTabBreite = 1000;
var Default_TFLimit = 5000;
var Default_PlatzAnzeige = true;
var Default_Tausenderpkt = true;
var Default_AngZeit = true;
var Default_AnkftZeit = true;
var Default_UbersFarben = true;
var Default_SchiffsGeschw = true;
var Default_FltMenuButtons = true;
var Default_AutoAuftrag = true;
var Default_KeinePlaninamen = false;
var Default_HPNachOben = true;
var Default_StationierenVorz = false;
var Default_PlaniListeAendern = true;
var Default_AllyPlatzAnzeige = true;
var Default_ShowPunkteDiff = false;
var Default_tpml = false;
var Default_bewegteress = true;

var Default_MLSort = true;
var Default_MLTyp = "3";
var Default_MLArt = "0";
var MLTyp = new Array("Koord", "Ime", "Status", "Bodovi", "Pristup", "Online");
var MLArt = new Array("Uzlazno", "Silazno");

var Default_imperium_calc_resis = true;
// Plani-Typen (entsprechen den IDs in OGame)
var Typ_Plani = 1;
//var Typ_TF = 2; // (noch) nicht verwendet
var Typ_Mond = 3;
// Daten laden
var Server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
var SID = document.URL.match(/session=([0-9a-zA-Z]+)/); // Session-ID des Users
SID = SID ? SID[1] : ""; // falls es eine gibt, speichern
var Body = document.getElementsByTagName("body")[0];
var PHPSIDStr = document.URL.match(/PHPSESSID=([0-9a-zA-Z]+)/);
PHPSIDStr = PHPSIDStr ? "&PHPSESSID="+PHPSIDStr[1] : "";
//-------------------------------------------------------------------------------
// wird noch geladen
var HP_ID = 0; // zum Speichern der HP-ID
var PlaniListe = 0, Planis = 0; // zum Speichern der Planiliste
var DefPlani = 0, AktPlani = 0;
var HatCommander = Default_HatCommander;
//-------------------------------------------------------------------------------
// Fuer die Umlaute, die noetig sind
var ae = "ä";
var oe = "ö";
var ue = "ü";
var Ae = "Ä";
var Oe = "Ö";
var Ue = "Ü";
var sz = "ß";
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Bibliothek
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Lädt ua. die Planiliste und macht die Tausenderpunkte
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// kleine Hilfsfunktionen
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function debug(meldung)
{
	alert("Debug-Meldung:\n"+meldung);
}
//-------------------------------------------------------------------------------
function TagsRaus(Text) // Entferne die Tags aus dem Text
{
	return String(Text).replace(/<[^<>]*>/g, ""); // Tags entfernen
}
//-------------------------------------------------------------------------------
function IstZahl(z) { return z >= '0' && z <= '9'; }
function IstBuchst(z) { return (z >= 'a' && z <= 'z') || (z >= 'A' && z <= 'Z'); }
//-------------------------------------------------------------------------------
function FindeXPath(XPath)
{
  var Wurzel = document;
  if (FindeXPath.arguments.length > 1) // weitere Argumente der Funktion
    Wurzel = FindeXPath.arguments[1];

  var Erg = document.evaluate(XPath, Wurzel, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var Arr = new Array();
  var AktKnoten = Erg.iterateNext();
  while (AktKnoten) {
    Arr[Arr.length] = AktKnoten;
    AktKnoten = Erg.iterateNext();
  }
  return Arr;
}
//-------------------------------------------------------------------------------
function IstZelle(Kn) // gibt an ob der entsprechende Knoten eine Tabellenzelle ist
{
	return (Kn.nodeName=='TD' || Kn.nodeName=='TH');
}
//-------------------------------------------------------------------------------
function InInt(Text) // Verwandelt den bergeben Text in eine Ganzzahl
{
  Text = TagsRaus(Text).replace(/[^0-9\-]/g, ""); // nicht-Ziffern entfernen
  return parseInt(Text, 10); // als Zahl zurueckgeben
}
//-------------------------------------------------------------------------------
function FindeKinder(Knoten, Bedingung, KinderEbenen) // finde alle Kindknoten dieses Knotens, die diese Bedingung erfuellen, und suche noch KinderEbenen Ebenen tiefer
{
	var Arr = new Array(); // Arry zum Speichern
	if ((typeof Bedingung) != "function") // falls die Bedingung ein String ist, mache sie zu einer Funktion, die dieses Tag als true nimmt und den Rest als falsch
		Bedingung = new Function("Kn", 'return (Kn.nodeName=="' + Bedingung.toUpperCase() + '");');
  for (var i = 0; i < Knoten.childNodes.length; ++i) { // ueber alle Kindknoten
  	if (Bedingung(Knoten.childNodes[i])) // Bedingung testen
      Arr[Arr.length] = Knoten.childNodes[i]; // falls positiv, speichern
    if (KinderEbenen) // falls berhaupt Unterbenen getestet werden sollen
    	Arr = Arr.concat(FindeKinder(Knoten.childNodes[i], Bedingung, KinderEbenen-1)); // eine Ebene tiefer, daher eine weniger testen
  }
  return Arr; // Knoten zurueckgeben
}
//-------------------------------------------------------------------------------
function NeuesElement(Tag, Inhalt) // erstellt ein neues Tag
{
  var Neu = document.createElement(Tag); // erste Zelle (Titel)
  if (Inhalt.indexOf("<") != -1 || Inhalt.indexOf("&") != -1) // falls Tags oder &;-Umschreibungen im Text sind
  	Neu.innerHTML = Inhalt; // Text als HTML-Code
  else if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
  	 	Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut

  if (NeuesElement.arguments.length > 2) { // weitere Argumente der Funktion
  	for (var i = 2; i < NeuesElement.arguments.length-1; i += 2) { // alle diese Argumente
  		if (!NeuesElement.arguments[i+1].length) continue;
  		Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i+1]); // dem Tag zuweisen
  	}
  }

  return Neu; // zurueckgeben
}
//-------------------------------------------------------------------------------
function Energie(ID, Stufe) // Berechnet den Stromverbrauch/Strumproduktion des Gebaeudes ID (1=Met, 2=Kris, 3=Deut, 4=Soli, 12=Fusi) auf der angegeben Stufe
{
	var Faktor = 0;
  if (ID == 1 || ID == 2) // Me- und Krismine
  	Faktor = 10;
  else if (ID == 3 || ID == 4) // Synthetitsierer und Soli
  	Faktor = 20;
  else if (ID == 12) // Fusi
  	Faktor = 50;
	return Math.floor(Faktor*Stufe*Math.pow(1.1, Stufe)); // Energieverbrauchs-Formel
}
//-------------------------------------------------------------------------------
function FindePlaniMitKoords(Planis, Gala, Sys, Pos) // Finde den Plani mit diesen Koords
{
	var i = 1;
	if (FindePlaniMitKoords.arguments.length > 4) i = FindePlaniMitKoords.arguments[4];
  for (; i < Planis.length; ++i) { // alle Planis durchgehen
   	if (Planis[i]["Gala"] == Gala && Planis[i]["Sys"] == Sys && Planis[i]["Pos"] == Pos) return Planis[i]; // falls die Koords stimmen, Plani zurueckgeben
  }
  return 0; // nichts zurueckgeben
}
//-------------------------------------------------------------------------------
function FindePlaniMitID(Planis, ID) // Finde den Plani mit dieser ID
{
  for (var i = 1; i < Planis.length; ++i) { // alle Planis durchgehen
   	if (Planis[i]["ID"] == ID) return Planis[i]; // falls die ID stimmt, zurueckgeben
  }
  return 0; // nichts zurueckgeben
}
//-------------------------------------------------------------------------------
function EinfuegenHinter(Neu, Hinter) // fuege des neue Element hinter dem anderen ein
{
	Hinter.parentNode.insertBefore(Neu, Hinter.nextSibling); // Element einfuegen
  return Neu; // Element zurueckgeben
}
//-------------------------------------------------------------------------------
function GetY(element) // gibt die Y-Koordinate des angegebenen Elemnts zurueck
{
  return element.offsetTop + (element.nodeName == "BODY" ? 0 : GetY(element.offsetParent)); // aktueller offset + den des Vorgaengers, falls wir nicht schon beim Body-Tag sind
}
//-------------------------------------------------------------------------------
function Zweistellig(Zahl) // Eine Zahl zweistellig darstellen
{
	var Str = String(Zahl); // Zahl in String verwandeln
	if (Str.length == 1) Str = '0'+Str; // falls dieser nur eine Stelle hat, eine 0 davorsetzen
	return Str; // Ergebnis zurueckgeben
}
//-------------------------------------------------------------------------------
function Loesche(element) // Loesche dieses Element
{
 	element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
}
//-------------------------------------------------------------------------------
function ZeitFormatieren(Zeit) // formatiere die bergebene Zeit vernnftig
{
	var Wochentage = new Array("NE", "PO", "UT", "SR", "CE", "PE", "SU", "NE"); // Namen der WOchentage
	var Monate = new Array("SIJ", "VEL", "OZU", "TRA", "SVI", "LIP", "SRP", "KOL", "RUJ", "LIS", "STU", "PRO"); // Namen der Monate
	return Wochentage[Zeit.getDay()] + " " + Zeit.getDate() + " " + Monate[Zeit.getMonth()] + " " + Zeit.getHours() + ":" + Zweistellig(Zeit.getMinutes()) + ":" + Zweistellig(Zeit.getSeconds()); // Ausgabestring formatieren
}
//-------------------------------------------------------------------------------
function LeseZeit(Str)
{
	var Monate = new Array();
	Monate["SIJ"] = 0; Monate["VEL"] = 1; Monate["OZU"] = 2; Monate["TRA"] = 3; Monate["SVI"] = 4; Monate["LIP"] = 5; Monate["SRP"] = 6; Monate["KOL"] = 7; Monate["RUJ"] = 8; Monate["LIS"] = 9; Monate["STU"] = 10; Monate["PRO"] = 11;
	var ZeitStr = Str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
	var Zeit = new Date(); // das ist nötig
	Zeit = new Date(Zeit.getYear()+1900, Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
	return Zeit;
}
//-------------------------------------------------------------------------------
function FindeTooltips(Prefix) // Finde alle Tooltips deren Titel mit Prefix anfaengt
{
	var Tooltips = FindeXPath('//th[@class="tooltip_border"]/table[@width="100%"]/tbody/tr/th[@bgcolor="#344566"]');
	var Arr = new Array();
  // das geschieht nicht via XPath, weil der Titel des Tooltips mit zurückgegeben werden soll
	for (var i = 0; i < Tooltips.length; ++i) { // ueber alle Tooltips
		var Titel = Tooltips[i].firstChild.firstChild.firstChild.firstChild.firstChild.nodeValue; // Titel des Tooltips
		if (Titel.substr(0, Prefix.length) == Prefix) { // falls der stimmt
			var Tip = new Array(); // aktuelles Tooltip
			Tip["el"] = Tooltips[i].firstChild.firstChild; // tbody-Element
			Tip["titel"] = Titel; // und den Titel speichern
			Arr[Arr.length] = Tip; // Tooltip in Array hinzufuegen
		}
	}
	return Arr; // Tooltips zurueckgeben
}
//-------------------------------------------------------------------------------
function LadeAccEinst(Name, Default) // Laed eine Einstellung des aktuellen Accounts
{
	if (!HP_ID) return Default; // falls es nicht bekannt ist, welches der Account ist, den Defaultwert zurckgeben
	return GM_getValue(Server+"_"+HP_ID+"_"+Name, Default); // Einstellung laden
}
//-------------------------------------------------------------------------------
function SpeichAccEinst(Name, Wert) // Speichert eine Einstellung des aktuellen Accounts
{
	if (!HP_ID) return; // falls der Account unbekannt ist, abbruch
	GM_setValue(Server+"_"+HP_ID+"_"+Name, Wert); // Wert speichern
}
//-------------------------------------------------------------------------------
function Trim(Str)
{
  while (Str.substring(0,1) == ' ')
		Str = Str.substring(1, Str.length);
	while (Str.substring(Str.length-1, Str.length) == ' ')
		Str = Str.substring(0, Str.length-1);
	return Str;
}
//-------------------------------------------------------------------------------
function HoleRessourcen() // Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
{
	var Zellen = FindeXPath('//center/table/tbody/tr/td/table[@width="100%"]/tbody/tr[3]/td');
  var Arr = new Array(); // zum Speichern der Zahlen
  for (var i = 1; i < 4; ++i) { // Zellen 2-4
    Arr[i-1] = InInt(Zellen[i].innerHTML); // Inhalt in Ganzzahl verwandeln und speichern
  }
  var Werte = TagsRaus(Zellen[4].innerHTML).split("/"); // die Energie an dem / trennen
  Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fr die Gebaeude und Forschungen benoetigt wird
  Arr[3] = InInt(Werte[1]);
 	return Arr; // Zahlen zurueckgeben
}
//-------------------------------------------------------------------------------
/*
Eine Plani-Liste hat folgendes Format:
Das Element 0 enthält die ID des HPs
Alle weiteren Elemente sind die Planeten und Mond des Spielers, aufgelistet in der Reihenfolge der Planiliste
Jeder Planet hat folgende Eigenschaften:
	Nr: Seine Nummer im Aray (PlaniListe[Plani["Nr"]] == Plani)
	Name: Sein Name
	Gala, Sys, Pos: Seine Position (Gala:Sys:Pos)
	Koords: Die Position als Text
	ID: Seine ID
	URL: Die Url, die aufgerufen wird, um zu ihm zu wechseln
	Aktiv: Gibt an ob der Plani der aktivierte ist
	Partner: Immer 0 (wird später verwendet)
*/
function HolePlaniListe()
{
  var PlaniNamen =  document.getElementsByTagName("select");
  if (!PlaniNamen.length) return 0; // falls keine Planiliste gefunden wurde, abbruch
	PlaniNamen = PlaniNamen[0].options;
  var PlaniListe = new Array(); // Array zur Speicherung der Planis, das erste Element speichert die kleinste ID (also die des HP)
  PlaniListe[0] = 0;
  for (var i = 0; i < PlaniNamen.length; ++i) { // Ueber alle Planis des Spielers
		// Daten extrahieren
  	if (PlaniNamen[i].value.indexOf("/game/") == -1) return 0; // falls dies kein Teil des Planimens ist, abbruch
  	var Daten = PlaniNamen[i].firstChild.nodeValue.match(/([a-zA-Z0-9 \.\-\_\(\)]+)    \[([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})\]/); // Name und Koords rausfinden, sie stehen im angezeigten Text
    if (!Daten) continue;
		var ID = PlaniNamen[i].value.match(/cp=([0-9]+)/); // Plani-ID rausfinden
		if (!ID) continue;

		// Daten speichern
  	Plani = new Array();
    Plani["Nr"] = PlaniListe.length;
		Plani["Name"] = Daten[1];
		Plani["Gala"] = parseInt(Daten[2], 10);
		Plani["Sys"] = parseInt(Daten[3], 10);
		Plani["Pos"] = parseInt(Daten[4], 10);
		Plani["Koords"] = Plani["Gala"] + ":" + Plani["Sys"] + ":" + Plani["Pos"];
		Plani["ID"] = parseInt(ID[1], 10);
		Plani["URL"] = PlaniNamen[i].value;
		Plani["Aktiv"] = (PlaniNamen[i].selected == true);
		Plani["Partner"] = 0;
		if (Datei == "ainfo") { // Workaround fuer OGame-Bug (Planiwechsel in ainfo.php nicht möglich)
			var allytag = document.URL.match(/allytag=([^&]+)/);
			if (allytag) Plani["URL"] += "&allytag="+escape(allytag[1]);
			var aid = document.URL.match(/a=([0-9]+)/);
			if (aid) Plani["URL"] += "&a="+escape(aid[1]);
		}
		// die kleinste ID ermitteln
		if (!PlaniListe[0] || PlaniListe[0] > Plani["ID"]) PlaniListe[0] = Plani["ID"];
		// Plani hinzufügen
		PlaniListe[PlaniListe.length] = Plani;
  }
  return PlaniListe; // Liste der Planis zurueckgeben
}
//-------------------------------------------------------------------------------
function LadePlanis(PlaniListe)
{
	/*
	Die erweiterte Plani-Liste des ersten Durchlaufs fügt folgende Eigenschaften zu den Planis hinzu:
		Partner: 0 wenn der Plani keinen Partner hat (der Partner eines Mondes ist der Plani auf denselben Koords, der Partner eines Plansis der dazugehörige Mond), ansonsten die Nummer des Partners
		HP: Gibt an, ob der Plani der HP ist
		Typ: Ist gleich Typ_Plani, wenn es sich um einen Plani handelt, und gleich Typ_Mond, wenn es ein Mond ist
	*/

	// Im ersten Durchlauf werden die Partnerplanis gefunden und ihre Typen (Plani oder Mond) gespeichert und die Nummer des HPs rausgefunden
	var HP_Nummer = 0;
	for (var i = 1; i < PlaniListe.length; ++i) {
		var Plani = PlaniListe[i];
		Plani["HP"] = (Plani["ID"] == PlaniListe[0]);
		if (Plani["HP"]) HP_Nummer = i;
		if (Plani["Partner"]) continue; // dieser Plani hat schon einen Partner
		var Partner = FindePlaniMitKoords(PlaniListe, Plani["Gala"], Plani["Sys"], Plani["Pos"], i+1); // nur hinter dem aktuellen Plani suchen
		if (!Partner) {
			Plani["Typ"] = Typ_Plani; // Planis ohne Partner können keine Monde sein
			continue; // kein Partner gefunden
		}
		// Die Nummern speichern
		Plani["Partner"] = Partner["Nr"];
		Partner["Partner"] = Plani["Nr"];
		// anhand der IDs die Typen bestimmen
		if (Partner["ID"] > Plani["ID"]) {
			Partner["Typ"] = Typ_Mond;
			Plani["Typ"] = Typ_Plani;
		}
		else {
			Partner["Typ"] = Typ_Plani;
			Plani["Typ"] = Typ_Mond;
		}
	}
	if (!HP_Nummer) return 0;

	/*
	Die sortierte Plani-Liste des zweiten Durchlaufs ändert das Element 0 der Liste, ihre Reihenfolge und fügt eine Eigenschaft hinzu
	Der HP wird falls gewünscht an den Anfang gesetzt, und alle Monde werden direkt hinter ihren Plani gesetzt
	Das Element 0 enthäklt folgende Eigenschaften:
		HP: Nummer des HPs
		Aktiv: Nummer des aktven Planis
	Die den Planis hinzugefügte Eigenschaft ist
		Text: Speichert den in der Auswahlliste anzuzeigenen Text entsprechend der Einstellungen (ohne Einrückung der Monde)
	*/
	
	// im zweiten Durchlauf werden die Liste umsortiert (HP an den Anfang, Monde zu den Planis)  und die Namen angepasst
	var HPNachOben = LadeAccEinst("hp_oben", Default_HPNachOben);
	var KeinePlaniNamen = LadeAccEinst("keine_planinamen", Default_KeinePlaninamen);	
	var Planis = new Array(new Array()); // das erste Element speichert die Nummer des HPs und des aktiven Planis
	Planis[0]["HP"] = HP_Nummer;
	
	// Hilfsfunktion zum Hinzufügen eines Planis samt Mond
	function FuegeHinzu(Plani) {
		if (Plani["Typ"] != Typ_Plani) return;
		// Eigenschaften des Planis anpassen
		Plani["Nr"] = Planis.length;
		if (Plani["Aktiv"]) Planis[0]["Aktiv"] = Plani["Nr"];
		// Text bestimmen
		if (KeinePlaniNamen) // nur die Koords als Text
			Plani["Text"] = Plani["Koords"];
		else // der Text besteht aus Name und Koords
			Plani["Text"] = Plani["Name"]+" ["+Plani["Koords"]+"]";
		// Plani speichern
		Planis[Planis.length] = Plani;
		if (Plani["Partner"]) { // falls der Plani einen Partner hat (das muss ein Mond sein, da der Plani selbst kein Mond sein kann)
			var Partner = PlaniListe[Plani["Partner"]];
			// Eigenschaften des Partner anpassen
			Partner["Nr"] = Planis.length;
			Partner["Partner"] = Plani["Nr"];
			Plani["Partner"] = Partner["Nr"];
			if (Partner["Aktiv"]) Planis[0]["Aktiv"] = Partner["Nr"];
			// Den Namen korrigieren (das " (Mond)" am Ende wegmachen)
			var Name = Partner["Name"].match(/([a-zA-Z0-9 \.\-\_\(\)]+)( \([A-Za-z]+\))/);
			if (Name) Partner["Name"] = Name[1];
			// Text bestimmen
			if (KeinePlaniNamen) // nur die Koords als Text
				Partner["Text"] = Partner["Koords"]+" (M)";
			else // der Text besteht aus Name und Koords
				Partner["Text"] = Partner["Name"]+" ["+Partner["Koords"]+"]";
			// Plani speichern
			Planis[Planis.length] = Partner;
		}
	}
	
	if (HPNachOben) FuegeHinzu(PlaniListe[HP_Nummer]);
	for (var i = 1; i < PlaniListe.length; ++i) {
		var Plani = PlaniListe[i];
		if (HPNachOben && Plani["HP"]) continue; // es werden nur Planis behandelt, und falls der HP an den Anfang kommt wird er übersprungen
		FuegeHinzu(Plani);
	}
	return Planis;
}
//-------------------------------------------------------------------------------
function TabBreite(Max, Min) // breite einer Tabelle anhand der Einstellungen etc berechnen
{
  return Math.max(Math.min(Math.min(LadeAccEinst("max_tab_breite", Default_MaxTabBreite), Max), document.body.clientWidth-10), Min);
}
//-------------------------------------------------------------------------------
// Differenz Serverzeit <-> lokale Zeit bestimmen
function LeseZeitDiff()
{
	var ZeitZelle = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
	var ServerZeit = LeseZeit(ZeitZelle.firstChild.nodeValue);
	return StartZeit - ServerZeit;
}
//-------------------------------------------------------------------------------
function GetAktZeit()
{
	if (!isNaN(ZeitDiff)) {
		var AktZeit = new Date();
		return new Date (AktZeit.getTime() - ZeitDiff);
	}
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Tausenderpunkte
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function TausenderZahl(z)
{
  z = String(Number(z));
  var i = z.length % 3;
  if (i == 0) i = 3;
  var erg = z.substr(0, i);
  for (; i < z.length; i += 3) erg += "."+z.substr(i, 3);
  return erg;
}
//-------------------------------------------------------------------------------
function TausenderString(s)
{
  if (s.length < 4) return s; // da gibts ohnehnin keine Tausenderpunkte
  var erg = "", zahl; // das Ergbenis; die zwischengespeicherte Zahl
  var akt, vor = 0; // das aktuelle und das vorherige Zeichen
  for (var i = 0; i < s.length; ++i) { // über alle zeichen
    akt = s.charAt(i);
    if (IstZahl(akt)) { // wenn es eine Zahl ist
      zahl = String(akt);
      for (++i; i < s.length && IstZahl(s.charAt(i)); ++i) zahl += s.charAt(i); // die Zahl zusammensetzen
      akt = (i == s.length) ? 0 : s.charAt(i); // das Zeichen nach der Zahl ist jetzt aktuell
      if (zahl.length < 4 || IstBuchst(vor) || vor == '.' || IstBuchst(akt) || akt == '-') erg += zahl; // zu kleine Zahlen oder solche, die nach einen Punkt oder vor einem - kommen, werden übernommen wie sie sind. Auch Buchstaben dürfen nicht direkt davor oder dahinter sein
      else erg += TausenderZahl(zahl); // die anderen bekommen Tausenderpunkte
      if (!akt) break; // Ende des Strings? fertig!
    }
    erg += (vor = akt); // aktuelles Zeichen anhängen und speichern
  }
  return erg;
}


//-------------------------alter Teil-----------------------------
var AusdrArr = 0, ErsArr = 0, AnzAusdr = 2; // Arrays zum Speichern der Ausdruecke und dessen, womit die ersetzt werden, sowie wie lange Zahlen ersetzt werden (max. [AnzAusdr+1]*3 Ziffern)
//-------------------------------------------------------------------------------
function FuelleAusdrArrays() // Fuelle die Arrays mit Ausdrcken
{
	AusdrArr = new Array();
	ErsArr = new Array();
	var B = "[ \(\)\.\:\+_,\\s]";
  for (var i = 0; i < AnzAusdr; ++i) { // soviele Ausdrcke, wie gewuenscht
   	AusdrArr[i] = "("+B+"\\d{1,3})"; // Anfang des Ausdrucks/
    ErsArr[i] = "$1"; // der Ersetzung
    for (var j = 0; j < i; ++j) { // Zwsichenteil
    	AusdrArr[i] += "(\\d{3})";
      ErsArr[i] += ".$" + (j+2);
    }
    AusdrArr[i] += "(\\d{3}k?"+B+")"; // Ende
    ErsArr[i] += ".$" + (i+2);
  }
}
//-------------------------------------------------------------------------------
function Tausenderpunkte(s)
{
	if (!AusdrArr || !ErsArr) FuelleAusdrArrays(); // beim ersten Start Arrays erzeugen
	s = String(s);
	if (Datei == "bericht") s = s.replace(/^(\d+)\.(\d+)$/g, "$1,$2"); // bei KBs: vorhandene Trennpunkte in Kommas umwandeln
	if (s.search(/[0-9]{4}/) == -1) return s; // Es muss min. eine Vierstellige Zahl vorkommen
	s = " " + s + " ";  // Mit Leerzeichen, damit die Anfang-und-Ende-Erkennung klappt
	// Punkte in Zahlen einfgen
  for (var i = AnzAusdr-1; i >= 0; --i) { // fuer alle Ausdrcke, und zwar von hinten nach vorne, lange Zahlen zuerst
  	s = s.replace(new RegExp(AusdrArr[i], "g"), ErsArr[i]); // diesen Ausdruck anwenden
  }
  return s.substr(1, s.length-2); // Leerzeichen wieder rausschneiden
}
//-------------------------------------------------------------------------------
function PunkteKorrekturHF(Knoten) // Korrigiere in uebergebenen Knoten die Punkte
{
	if (Knoten.nodeType == 3 && Knoten.nodeValue.length >= 4) {
  	Knoten.nodeValue = Tausenderpunkte(Knoten.nodeValue); // bei Textknoten: Punkte im Text einfuegen
  }
  return false; // nicht speichern
}
// Zeitdifferenz bestimmen
if (Datei == "overview") ZeitDiff = LeseZeitDiff();
// Planiliste laden
PlaniListe = HolePlaniListe();
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// eigentliches OGame-skript
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function ogameskript(){
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// allgemeines Zeug
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Zeitdifferenz speichern/laden
if (!isNaN(ZeitDiff)) SpeichAccEinst("zeit_diff", ZeitDiff);
else ZeitDiff = LadeAccEinst("zeit_diff", ZeitDiff);
//-------------------------------------------------------------------------------
if (LadeAccEinst("tausenderpkt", Default_Tausenderpkt))
	FindeKinder(Body, PunkteKorrekturHF, -1); // Tausenderpunkte im gesamten HTML-Dokument einfuegen
//-------------------------------------------------------------------------------
if (Datei == "leftmenu") { // in der Navi
	// herausfinden, ob der Spieler Commander ist
	var InfoLink = FindeXPath('//center/a[contains(@href, "commander/info.php")][font]').length; // alle a-Tags, die in einem center-tag liegen, "commander/info.php" im Linkziel haben und (mindestens) ein font-Tag enthalten
	SpeichAccEinst("commander", !InfoLink);
}
HatCommander = LadeAccEinst("commander", Default_HatCommander);
//-------------------------------------------------------------------------------
if (Datei == "leftmenu") { // das Skript kann beginnen - in der Navi wird die Versionsnummer angezeigt
	document.getElementById("ogameskript_version").firstChild.nodeValue = GM_getValue("version", "l"+ae+"dt...");
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// GPL
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "leftmenu" && !LadeAccEinst("gpl", 0) && GM_getValue("version", 0)) {
	alert("Version "+GM_getValue("version", "1.0")+", Copyright (C) 2006 windows-zerstoerer\nFür das OGame-Skript besteht KEINERLEI GARANTIE. OGame-Skript ist freie Software, die du unter bestimmten Bedingungen weitergeben darfst. Weitere Details findest du im Einstellungen-Menü unten. Mit der Verwendung des Skriptes werden die Bedingungen der GPL aktzeptiert.");
	SpeichAccEinst("gpl", 1);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Planiliste bearbeiten
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (PlaniListe) { // falls das Plani-Array gueltig ist - in diesem Fall gibt es eine Auswahlliste
	Planis = LadePlanis(PlaniListe);
	if (!Planis) return; // eigentlich kann das garnicht passieren, aber man weiß ja nie
	AktPlani = Planis[Planis[0]["Aktiv"]];
	DefPlani = FindePlaniMitID(Planis, LadeAccEinst("def_plani", HP_ID));
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Planiauswahl bearbeiten
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
	if (LadeAccEinst("planiliste_aend", Default_PlaniListeAendern)) {
		// fuegt Schalter rund um das Planimenue ein
		var AktNr = Planis[0]["Aktiv"];
		var AufMond = (AktPlani["Typ"] == Typ_Mond);
	
		var Select = document.getElementsByTagName("select")[0]; // das Dropdown-Menü zur Planiauswahl - darum kommen die Schalter
		Select.parentNode.style.textAlign = "center"; // Text zentrieren
		Select.parentNode.style.whiteSpace = "nowrap"; // kein Zeilenumbruch
		if (AktPlani["Partner"]) { // bei Planis mit Mond und bei Monden kommt oben noch was daruf
			var Partner = Planis[AktPlani["Partner"]];
			Select.parentNode.insertBefore(NeuesElement("a", AufMond ? ("na planetu "+Partner["Name"]) : ("na mjesec "+Partner["Name"]), "href", Partner["URL"]), Select); // Link vor der Dropwdown-Liste einfgen
			Select.parentNode.insertBefore(document.createElement("br"), Select); // Zeilenumbruch vor der Dropwdown-Liste einfgen
		}
		if (!AufMond || (AufMond && LadeAccEinst("monde_getrennt", Default_MondeGetrennt))) { // Monde bekommen nur dann LinksRechts-Schalter wenn sie getrennt dargestellt werden
			var VorhURL = 0, NachURL = 0; // erstmal kein vorheriger/naechster Plani/Mond
			// Vorherigen und nächsten Plani desselben Typs finden
			for (var Nr = AktNr-1; Nr > 0; --Nr)
				if (Planis[Nr]["Typ"] == AktPlani["Typ"]) { VorhURL = Planis[Nr]["URL"]; break; }
			for (var Nr = AktNr+1; Nr < Planis.length; ++Nr)
				if (Planis[Nr]["Typ"] == AktPlani["Typ"]) { NachURL = Planis[Nr]["URL"]; break; }
			if (VorhURL) {
				Select.parentNode.insertBefore(NeuesElement("a", "&lt;&lt;", "href", VorhURL), Select); // Link vor der Dropwdown-Liste einfuegen
			}
			if (NachURL) {
				EinfuegenHinter(NeuesElement("a", "&gt;&gt;", "href", NachURL), Select); // Link nach der Dropdown-Liste einfgen
			}
		}
	//-------------------------------------------------------------------------------
		// Erstellt das Menue aus der extrahierten Planiliste erneut
		var MondeGetrennt = LadeAccEinst("monde_getrennt", Default_MondeGetrennt);
		while (Select.childNodes.length > 0) Select.removeChild(Select.childNodes[0]); // alle Eintraege der Liste entfernen
		for (var i = 1; i < Planis.length; ++i) { // Ueber alle Planis
			if (MondeGetrennt && Planis[i]["Typ"] != Typ_Plani) continue;
			var EintrText = (Planis[i]["Typ"] == Typ_Plani) ? Planis[i]["Text"] : " - "+Planis[i]["Text"];
			var Eintrag = NeuesElement("option", EintrText, "value", Planis[i]["URL"]); // Eintrag erzeugen
			if (Planis[i]["Aktiv"]) Eintrag.setAttribute("selected", "selected"); // falls es der aktive Plani ist, markieren
			if (Planis[i]["HP"]) Eintrag.style.fontWeight = "bold"; // den HP fett machen
			Select.appendChild(Eintrag); // Eintrag einfuegen
		}
		if (MondeGetrennt) {
			// Trenner
			function auswahl(el) { // neue auswahlfunktion, kompatibel mit dem Trenner
				var url = el.options[el.selectedIndex].value;
				if (url.length)
					location.href = el.options[el.selectedIndex].value;
			}
			unsafeWindow.haha = auswahl; // vorhandenen Funktion ueberschreiben
			var HabTrenner = false;
			// Monde einfügen
			for (var i = 1; i < Planis.length; ++i) { // Ueber alle Planis
				if (Planis[i]["Typ"] != Typ_Mond) continue;
				if (!HabTrenner) {
					Select.appendChild(NeuesElement("option", " ", "value", ""));
					HabTrenner = true;
				}
				var Eintrag = NeuesElement("option", Planis[i]["Text"], "value", Planis[i]["URL"]);
				if (Planis[i]["Aktiv"]) Eintrag.setAttribute("selected", "selected"); // falls es der aktive Mond ist, markieren
					Select.appendChild(Eintrag); // Eintrag einfuegen
			}
		}
	}
}
//-------------------------------------------------------------------------------
// Punkte-Differenzen werden in den Statistiken und der Memberliste angezeigt
function PunkteDiff(page) {
  if (page.indexOf("memberliste")!=-1) {
	var ML_Punkte = FindeXPath('//table/tbody/tr/th[5]');
	for(i=2;i<=ML_Punkte.length;i++) {
		if(i>=ML_Punkte.length) { ML_Punkte[i-1].innerHTML = TausenderZahl(ML_Punkte[i-1].innerHTML.replace(/\./g,'')); } else {
			var ML_erster = parseInt(ML_Punkte[i-1].innerHTML.replace(/\./g,''),10);
			var ML_zweiter = parseInt(ML_Punkte[i].innerHTML.replace(/\./g,''),10);
			ML_diff = ML_erster - ML_zweiter; if(ML_diff>=0) { var text_plus = "+"; } else { var text_plus = "-"; ML_diff = ML_diff * -1; }
			ML_Punkte[i-1].innerHTML = TausenderZahl(ML_Punkte[i-1].innerHTML.replace(/\./g,'')) + '<br><span style="color:yellow;">(' + text_plus + TausenderZahl(ML_diff.toString()) + ')</span>'; }
	}
  }
  if (page.indexOf("statistik")!=-1) {
	var ML_Punkte = FindeXPath('//table/tbody/tr/th[5]');
	for(i=1;i<=ML_Punkte.length;i++) {
		if(i>=ML_Punkte.length) { ML_Punkte[i-1].innerHTML = TausenderZahl(ML_Punkte[i-1].innerHTML.replace(/\./g,'')); } else {
			var ML_erster = parseInt(ML_Punkte[i-1].innerHTML.replace(/\./g,''),10);
			var ML_zweiter = parseInt(ML_Punkte[i].innerHTML.replace(/\./g,''),10);
			ML_diff = ML_erster - ML_zweiter; if(ML_diff>=0) { var text_plus = "+"; } else { var text_plus = "-"; ML_diff = ML_diff * -1; }
			ML_Punkte[i-1].innerHTML = TausenderZahl(ML_Punkte[i-1].innerHTML.replace(/\./g,'')) + '<br><span style="color:yellow;">(' + text_plus + TausenderZahl(ML_diff.toString()) + ')</span>'; }
	}	
	//---------
	// Punkteunterschied zur eigenen Allianz bzw. zu sich selber
	var statnamen = FindeXPath('//table/tbody/tr/th[2]');
	for(i=0;i<statnamen.length;i++) {
		if(statnamen[i].innerHTML.indexOf("lime")!=-1) var eigenepos=i;/*alert(statnamen[i].innerHTML.match(/>(.*?)</)[1]);*/
	}
	var eigenepunkte = parseInt(FindeXPath('//table/tbody/tr['+(eigenepos+2)+']/th[5]')[0].innerHTML.match(/([\.0-9]+)<br>/)[1].replace(/\./g,''),10); // //table/tbody/tr[3]/th[5]
	for(i=0;i<statnamen.length;i++) {
		if(FindeXPath('//table/tbody/tr['+(i+2)+']/th[5]')[0].innerHTML.indexOf("<br>")!=-1) {
			var statpunkte = parseInt(FindeXPath('//table/tbody/tr['+(i+2)+']/th[5]')[0].innerHTML.match(/([\.0-9]+)<br>/)[1].replace(/\./g,''),10);
		} else {
			var statpunkte = parseInt(FindeXPath('//table/tbody/tr['+(i+2)+']/th[5]')[0].innerHTML.replace(/\./g,''),10);
		}
		var statpos = FindeXPath('//table/tbody/tr['+(i+2)+']/th[2]');
		if(i<eigenepos) {
			var statdiff = statpunkte - eigenepunkte;
			statpos[0].innerHTML = '<b>' +statpos[0].innerHTML + '</b><br><font size="-2">Razlika '+ FindeXPath('//table/tbody/tr['+(eigenepos+2)+']/th[2]')[0].innerHTML +': <span style="color:yellow;">+' + TausenderZahl(statdiff.toString()) + '</span></font>';
		}
		if(i>eigenepos) {
			var statdiff = eigenepunkte - statpunkte;
			statpos[0].innerHTML = '<b>' +statpos[0].innerHTML + '</b><br><font size="-2">Razlika '+ FindeXPath('//table/tbody/tr['+(eigenepos+2)+']/th[2]')[0].innerHTML +': <span style="color:yellow;">-' + TausenderZahl(statdiff.toString()) + '</span></font>';
		}
		
	}
	
	//---------
  }
}
//-------------------------------------------------------------------------------
// Flottenmenue berarbeiten
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function NeuerButton(Titel, BtnFunk) // Fuegt hinter dem ersten vorhandenen Button einen weiteren ein, der BtnFunk ausfuehrt
{
  var Btn = FindeXPath('//th[@colspan>1]/input[@type="submit"]'); // alle Buttons (input-Tag mit type="submit") in einer Tabellentitelzelle, deren colspan>1 ist
	if (!Btn) return;
	Btn = Btn[Btn.length-1]; // den letzten gefundenen Button nehmen
  var NeuBtn = document.createElement("input"); // Neuen Button erstellen
  NeuBtn.type = "button"; // Damit es auch ein Button wird
  NeuBtn.value = Titel; // Beschriftung zuweisen
  NeuBtn.addEventListener("click", BtnFunk, true); // Klick-Funktion zuweisen
  Btn.parentNode.appendChild(NeuBtn); // neuen Button hinter den anderen setzen
}
//-------------------------------------------------------------------------------
function ZumDefPlSenden() // Schickt die Flotte zum Default-Plani
{
	unsafeWindow.setTarget(DefPlani["Gala"], DefPlani["Sys"], DefPlani["Pos"], DefPlani["Typ"]); // Flottenziel setzen
  unsafeWindow.shortInfo(); // Anzeige aktualisieren
  if (InInt(document.getElementById("storage").innerHTML) <= 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
  	if (!confirm("Nema dovoljno mjesta za resurse, svejedno nastaviti?")) return; // falls der User es wnscht, abbrechen
	document.forms[0].submit(); // Formular absenden
}
//-------------------------------------------------------------------------------
function ZumAktPartnerSenden() // Schickt die Flotte zum aktuellen Mond, wenn ein Plani aktiv ist, und umgekehrt
{
	if (!AktPlani["Partner"]) return;
	var Partner = Planis[AktPlani["Partner"]];
  unsafeWindow.setTarget(Partner["Gala"], Partner["Sys"], Partner["Pos"], Partner["Typ"]); // Flottenziel setzen
  unsafeWindow.shortInfo(); // Anzeige aktualisieren
  if (InInt(document.getElementById("storage").innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
  	if (!confirm("Nema dovoljno mjesta za resurse, svejedno nastaviti?")) return; // falls der User es wnscht, abbrechen
	document.forms[0].submit(); // Formular absenden
}
//-------------------------------------------------------------------------------
function MitAllenRessSenden() // Sendet die Flotte mit allen Ress
{
	if (LadeAccEinst("nema_deut", Default_KeinDeut)) {
		document.getElementsByName("resource3")[0].value = '0'; // Deut auf 0
		unsafeWindow.maxResource('1'); // Met+
		unsafeWindow.maxResource('2'); // Kris eintragen
	}
	else
		unsafeWindow.maxResources(); // Alle Ress eintragen
  if (InInt(document.getElementById("remainingresources").innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
  	if (!confirm("Nema dovoljno mjesta za resurse, svejedno nastaviti?")) return; // falls der User es wnscht, abbrechen
  document.forms[0].submit(); // Formular absenden
}
//-------------------------------------------------------------------------------
if (Datei == "flotten1") { // in der Schiffsauswahl
	// Fuegt einen weiteren Button "pot" ein
	var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
	var RessSumme = Ress[0] + Ress[1]; // Summe der Ressourcen bestimmen
	if (!LadeAccEinst("nema_deut", Default_KeinDeut)) RessSumme += Ress[2]; // Deut nur einrechen falls es nicht deaktiviert wurde
	var Links = FindeXPath('//tbody/tr/th/a[contains(@href,"javascript:maxShip(")]'); // "max"-Links finden
  for (var i = 0; i < Links.length; ++i) { // Ueber alle max-Links
  	var ID = Links[i].href.match(/ship([0-9]+)/)[1]; // Schiffs-ID bestimmen
    if (ID == 202 || ID == 203) { // fuer kleine und grosse Transporter
    	var BenSchiffe; // benoetigte Anzahl Schiffe
      if (ID == 202) // Kleine Transporter
        BenSchiffe = Math.ceil(RessSumme/5000); // vollen laderaum verwenden - schließlich komtm der Treibstoff ja auch in den Laderaum
        // wegen des Treibstoffervbrauchs wird nicht der gesamte Laderaum genommen (deaktiviert, da unlgoisch)
      else // grosse Transporter
      	BenSchiffe = Math.ceil(RessSumme/25000);
      	// wegen des Treibstoffervbrauchs wird nicht der gesamte Laderaum genommen (deaktiviert, da unlgoisch)
      var Vorhanden = document.getElementsByName("maxship"+ID)[0].value; // vorhandene Anzahl Schiffe
      var url = "javascript:void(document.getElementsByName('ship"+ID+"')[0].value = "+Math.min(Vorhanden, BenSchiffe)+");"; // Linkziel ist ein JavaScript, das die Schiffsanzahl entsprechend setzt
      var farbe = "";
      if (Vorhanden < BenSchiffe) { // evntl. Warnung einfgen und Link roeten
      	url += "alert('Nema dovoljno brodova')";
      	farbe = "color:red;";
      }
      Links[i].parentNode.appendChild(NeuesElement("a", "ben", "href", url, "title","Potrebno: " + BenSchiffe, "style", farbe)); // Link einfuegen
    }
  }
}
//-------------------------------------------------------------------------------
if (Datei == "flotten2" && Planis) { // in der Zielauswahl
  if (LadeAccEinst("fltmenu_buttons", Default_FltMenuButtons)) {
    function ZumPlaniButton(Plani, BtnFunk) // kleine Hilfsfunktion
		{ 
			NeuerButton((Plani["Typ"] == Typ_Plani ?
					"na planetu "+Plani["Name"] : "na mjesec "+Plani["Name"]), BtnFunk);
		}
	
		if (DefPlani["ID"] != AktPlani["ID"]) // wenn der aktuelle Plani nicht der default-Plani ist
			ZumPlaniButton(DefPlani, ZumDefPlSenden); // neuen Button einfügen
		if (AktPlani["Partner"] && Planis[AktPlani["Partner"]]["ID"] != DefPlani["ID"]) // wenn der aktuelle Plani nen Partner hat
			ZumPlaniButton(Planis[AktPlani["Partner"]], ZumAktPartnerSenden);
  }
	
	if (LadeAccEinst("ankft_zeit", Default_AnkftZeit)) {
		var shortInfoAlt = 0;
		var Flugzeit = 0;
		var AltGeschw = -1;
		// Funktion statt shortInfo
		function shortInfoNeu()
		{
			if (!shortInfoAlt) return;
			shortInfoAlt();
			AltGeschw = document.getElementsByName("speed")[0].value;
			// Link aktualisieren
			var Gala = document.getElementsByName("galaxy")[0].value; // Planeten finden
			var Sys = document.getElementsByName("system")[0].value;
			var Pos = document.getElementsByName("planet")[0].value;
			// Flugzeit auslesen
			var ZeitElem = document.getElementById("duration").firstChild; // Flugzeitelement finden
			if (Flugzeit == "-") {
				Flugzeit = 0;
				return; // falls es noch keine Flugzeit gibt, abbrechen
			}
			var Zeit = ZeitElem.nodeValue.match(/([0-9]+):([0-9]{2}):([0-9]{2}) h/); // Stunden, Minuten und Sekunden rausholen
			var h = parseInt(Zeit[1], 10);
			Flugzeit = h*3600 + parseInt(Zeit[2], 10)*60 + parseInt(Zeit[3], 10); // Flugzeit in Sekunden Berechnen
			if (h > 23) { // bei mehr als einem Tag
				var ZeitText = ZeitElem.nodeValue.match(/^([0-9]+)(:[0-9]{2}:[0-9]{2} h)$/); // Stunden sowie den Rest des Textes rausholen
				var d = Math.floor(h/24); // Tage berechnen
				h -= d * 24;
				ZeitElem.nodeValue = d+"T "+h+ZeitText[2]; // neuen Text zuweisen
			}
			
			// Anzeige aktualisieren
			AnzeigeAktualisieren();
		}
		function AnzeigeAktualisieren() // Berechne die Ankunftszeiten und setze sie in die Felder
		{
			if (!Flugzeit) return;
			var AktGeschw = document.getElementsByName("speed")[0].value;
			if (AltGeschw != AktGeschw) { // wenn sich die Geschwindigkeit geändert hat, erstmal das aktualisieren
				shortInfoNeu();
				return;
			}
			// Zeiten aktualisieren
			var AktZeit = GetAktZeit(); // aktuelle Zeit
			Ankunft = new Date(AktZeit.getTime() + Flugzeit*1000); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
			Rueck = new Date(AktZeit.getTime() + Flugzeit*2000); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
			document.getElementById("ankunft_ziel").firstChild.nodeValue = ZeitFormatieren(Ankunft); // Ankunfszeit formatieren und anzeigen
			document.getElementById("ankunft_ursprung").firstChild.nodeValue = ZeitFormatieren(Rueck); // Rueckkehrzeit formatieren und anzeigen
		}
	
		shortInfoAlt = unsafeWindow.shortInfo;
		unsafeWindow.shortInfo = shortInfoNeu;
		
		// Geschwindigkeitsauswahl linksbündig anordnen
		var geschw_ausw = document.getElementsByName("speed")[0];
		geschw_ausw.parentNode.style.textAlign = "left";
	
		// fuegt Tabellenzeile fuer die Anzeige der Ankunftszeiten ein und startet den Timer zum Berechnen
		var TabZeile = document.getElementById("duration").parentNode.parentNode; // Zeile mit der Flugzeit
		// Zeile fuer Zielankunft erstellen
		var NeueZeile = document.createElement("tr"); // Neue Zeile
		NeueZeile.appendChild(NeuesElement("th", "Ankunft (Ziel)")); // Zelle in Zeile
		var NeueZelle = NeuesElement("th", "<div id='ankunft_ziel'>-</div>"); // 2. Zelle
		NeueZelle.height="20"; // Attribute zuweisen
		NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
		TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfgen
		// Zeile fuer Ursprungsankunft erstellen (via DOM, innerHTML klappt nicht)
		NeueZeile = document.createElement("tr"); // Neue Zeile
		NeueZeile.appendChild(NeuesElement("th", "Ankunft (Ursprung)")); // Zelle in Zeile
		NeueZelle = NeuesElement("th", "<div id='ankunft_ursprung'>-</div>"); // 2. Zelle
		NeueZelle.height="20"; // Attribute zuweisen
		NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
		TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfgueen
		// Warnung einfgen
		Body.appendChild(document.createElement("br")); // Zeilenumbruch
		Body.appendChild(document.createElement("br"));
		Body.appendChild(document.createTextNode("Ovisno o vasoj brzini pristupa internetu, gore prikazano vrijeme moze odstupati nekoliko sekundi od serverskog vremena"));
		// Timer starten
		AnzeigeAktualisieren();
		window.setInterval(AnzeigeAktualisieren, 200);
	}
}
//-------------------------------------------------------------------------------
if (Datei == "flotten3") { // in der Auftragsauswahl
  if (LadeAccEinst("auto_auftrag", Default_AutoAuftrag)) {
    // beteiligte Schiffe ermitteln
    var HiddenData = FindeXPath('html/body/center/input[@type="hidden"][contains(@name,"ship")]');
    var Beteiligt = new Array(), Kampfschiff = false;
    for (var i = 0; i < HiddenData.length; ++i) { // ueber alle "hidden"-Felder
      var ID = HiddenData[i].name.substr(4, 3);
      if (ID >= 200 && ID <= 299) { // gefundene Schiffe
        Beteiligt[ID] = true; // speichern
        // Kamfpschiffe sind alle außer Transportern, Recyclern, Kolschiffen und Spiosonden (Solsats kann man nicht schicken)
        if (ID != 202 && ID != 203 && ID != 209 && ID != 208 && ID != 210) Kampfschiff = true;
      }
    }
    
    // mögliche Aufträge finden
    var Auftr = FindeXPath('//table/tbody/tr/th/input[@type="radio"][@name="order"]'); // Alle Tags fuer die Auftragsauswahl finden
    var AuftrgBoxen = new Array(), BereitsMarkiert = false;
    for (var i = 0; i < Auftr.length; ++i) { //  Ueer alle Auftragsauswahl-Tags
      AuftrgBoxen[Auftr[i].value] = Auftr[i]; // speichern
      if (Auftr[i].checked) { // falls diese Box vormakrkiert ist
        BereitsMarkiert = true; // speichere eine Vormarkierung
        break; // Ende der Schleife - es wird nichts markiert, weil schon was markiert ist
      }
    }
    
    if (!BereitsMarkiert) {
      if (Kampfschiff && AuftrgBoxen[1]) AuftrgBoxen[1].checked = "checked"; // 1 = Angreifen
      else if (Beteiligt[210] && AuftrgBoxen[6]) AuftrgBoxen[6].checked = "checked"; // 210 = Spiosonde, 6 = Spionieren
      else if (Beteiligt[209] && AuftrgBoxen[8]) AuftrgBoxen[8].checked = "checked"; // 209 = Recycler, 8 = Abbau
      else if (Beteiligt[208] && AuftrgBoxen[7]) AuftrgBoxen[7].checked = "checked"; // 208 = Koloschiff, 7 = Kolonisieren
			else if (LadeAccEinst("stationieren_vorz", Default_StationierenVorz) && AuftrgBoxen[4])
				 AuftrgBoxen[4].checked = "checked"; // 3 = Stationieren
      else if (AuftrgBoxen[3]) AuftrgBoxen[3].checked = "checked"; // 3 = Transport
    }
  }

	// Neuer Button
  if (LadeAccEinst("fltmenu_buttons", Default_FltMenuButtons))
		NeuerButton(LadeAccEinst("nema_deut", Default_KeinDeut) ? "Met+Kris uzeti" : "Svi resursi", MitAllenRessSenden);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Baumenues verbessern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "buildings" || Datei == "b_building") { // in den Bau-Siten
  var Zeilen = FindeXPath('//table[@width="530"]/tbody/tr[count(td)=3]'); // alle Tabellenzeilen mit 3 Zellen finden
  var InhaltsTab = Zeilen[Zeilen.length-1].parentNode.parentNode; // der "Vorfahr" einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
  if (Datei == "b_building") {
		for (var i = 0; i < Zeilen.length; ++i) { // ueber alle diese Zeilen
			// Elemente finden
			var Knoten = FindeXPath('td', Zeilen[i]);
			if (Knoten.length != 3) continue; // die Zeile muss 3 Zellen haben
			if (FindeXPath('a', Knoten[0]).length == 0) continue; // in der ersten Zelle muss ein Link sein
			Knoten = Knoten[1]; // 2. Zelle, die mit den Werten
			var ID = Knoten.firstChild.href.match(/gid=([0-9]+)/)[1]; // ID des Schiffes/der Def(des Gebaeudes/der Forschung rausfinden
	
			if (ID <= 4 || ID == 12) { // bei den Minen und den Kraftwerken die Steigerung des Energieverbauchs anzeigen
				// aktuelle Stufe des Gebaeudes herausfinden
				var TextKnot = Knoten.childNodes[1], Stufe = 0; // der 2. Knoten der Tabellenzelle
				if (TextKnot.nodeType == 3) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
					Stufe = InInt(TextKnot.nodeValue);
				var Br = FindeXPath('br[1]', Knoten)[0]; // Zeilenumbruch - vor dem kommt der Hinweis
				var Steigerung = Energie(ID, Stufe+1) - Energie(ID, Stufe); // Steigerung des Verbrauchs/der Produktion berechnen
				if (ID <= 3) // Minen
					Knoten.insertBefore(document.createTextNode(" (-" + Steigerung + " Energija)"), Br); // Text einfuegen
				else // Kraftwerke
					Knoten.insertBefore(document.createTextNode(" (+" + Steigerung + " Energija)"), Br); // Text einfuegen
			}
		}
	}
  // Damit die Zeilenumbrche neu gerendert werden und die Tabelle schicker aussieht
  InhaltsTab.style.width = TabBreite(650, 530);
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Uebersicht verbessern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "overview") { // in der Uebersicht
	if (LadeAccEinst("ang_zeit", Default_AngZeit)) {
		function ZeitAktualisieren() // aktualisiere die aktuelle Uhrzeit
		{
			document.getElementById("akt_zeit").firstChild.nodeValue = ZeitFormatieren(GetAktZeit()); // Ankunfszeit formatieren und anzeigen
		}
	
		var ZeitZelle = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
		ZeitZelle.innerHTML += " (ca. <span id='akt_zeit'>-</span>)";
		ZeitAktualisieren();
		window.setInterval(ZeitAktualisieren, 200);
	}	
	
	if (SID) {
		// Versieht die Uebersicht mit weiteren Links
		var Bilder = FindeXPath('//th/a/img[contains(@src,"/planeten/small/")]'); // Alle Bilder in einem Link in einer Titelzelle finden
		for (var i = 0; i < Bilder.length; ++i) { // und diese Bilder bearbeiten
			var Knoten = Bilder[i].parentNode; // den Link selbst bearbeiten
			var PlaniID = Knoten.href.match(/cp=([0-9]+)/); // PlaniID holen
			if (PlaniID.length == 0) continue; // falls keine drin ist - raus
			PlaniID = PlaniID[1];
			if (Bilder[i].src.indexOf("/planeten/small/s_mond.jpg") == -1) {
				// Link ins Gebaeudemenue
				var TextKn = FindeXPath('center[1]', Knoten.parentNode)[0]; // Das Center-Tag beinhaltet den Text
				TextKn.insertBefore(NeuesElement("a", Trim(TextKn.firstChild.nodeValue), "href", "b_building.php?session="+SID+"&cp="+PlaniID+PHPSIDStr), TextKn.firstChild); // Den Link vor dem Text einfuegen
				TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
			}
			// Link ins Flottenmenue
			var TextKn = Knoten.parentNode; // das Tag der Tabellenzelle
			var Link = NeuesElement("a", Trim(TextKn.firstChild.nodeValue), "href", "flotten1.php?session="+SID+"&cp="+PlaniID+PHPSIDStr); // Link erzeugen
			if (PlaniID == DefPlani["ID"]) Link.style.color = "#87ceeb"; // Default-Plani markieren
			TextKn.insertBefore(Link, TextKn.firstChild); // Den Link vor dem Text einfuegen
			TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
			// Mond-Link
			var Plani = FindePlaniMitID(Planis, PlaniID);
			var Partner = Planis[Plani["Partner"]]; // Das ist der Mond zum Plani, falls vorhanden
			if (Plani && Plani["Partner"] && !Plani["Aktiv"] && !Partner["Aktiv"]) { // falls der Plani gefunden wurde und dieser Plani nen Mond hat und wir nicht auf diesem Mond sind, und auch nicht beim aktiven Plani
				var MondLink = NeuesElement("a", Partner["Name"], "href", "overview.php?session="+SID+"&cp="+Partner["ID"]+PHPSIDStr); // Link erzeugen
				if (Partner["ID"] == DefPlani["ID"]) MondLink.style.color = "#87ceeb"; // Default-Mond markieren
				var Text = EinfuegenHinter(document.createTextNode(" ("), Link); // Klammer auf vor den Link, hinter den Planinamen
				EinfuegenHinter(MondLink, Text); // dahinter den Link
				EinfuegenHinter(document.createTextNode(")"), MondLink); // dahinter die Klammer zu
			}
		}
		// Das große Planibild finden
		var AktPlaniBau = FindeXPath('//table[@width=519]/tbody/tr/th[@colspan>=2]/center')[0];
		AktPlaniBau.insertBefore(NeuesElement("a", Trim(AktPlaniBau.firstChild.nodeValue), "href", "b_building.php?session="+SID+"&cp="+AktPlani["ID"]+PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
		AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
	}
	
	
	function getElementsByClassName(clsName,htmltag,what){
		var arr = new Array();
		var elems = document.getElementsByTagName(htmltag);
		var mmm = 0;
		for(i=0; i<elems.length; i++) {
			if (elems[i].className==clsName) {
				if(elems[i].getAttribute("href",0).indexOf("#")!=-1) {
					var clsMouseover = elems[i].getAttribute("onmouseover",0);
					if(clsMouseover.indexOf(what)!=-1) {
						arr[mmm] = elems[i];
						mmm++;
					}
				}
			}
		}
		return arr;
	}

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
// Uebersicht über die bewegten Ressourcen
//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------
if(LadeAccEinst("bewegteress", Default_bewegteress)==true) {	
	code = '<center><table width="' + LadeAccEinst("max_tab_breite", Default_MaxTabBreite) + '" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse">';
	code += '<tr><td class="c" colspan="4">Pregled resursa u flotama</td></tr>';
	code += '<tr><td><b>Zadatak</b></td><td><b>Metal</b></td><td><b>Kristal</b></td><td><b>Deuterij</b></td></tr>';

	var transport=getElementsByClassName("owntransport","a","Metal");
	var tmet=tkris=tdeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		tmet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		tkris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		tdeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(tmet!=0 || tkris!=0 || tdeut!=0) {
		code += '<tr><td>Transport</td><td>'+ TausenderZahl(tmet) +'</td><td>'+ TausenderZahl(tkris) +'</td><td>'+ TausenderZahl(tdeut) +'</td></tr>';
	}
	var transport=getElementsByClassName("owndeploy","a","Metal");
	var smet=skris=sdeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		smet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		skris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		sdeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(smet!=0 || skris!=0 || sdeut!=0) {
		code += '<tr><td>Stacioniranje</td><td>'+ TausenderZahl(smet) +'</td><td>'+ TausenderZahl(skris) +'</td><td>'+ TausenderZahl(sdeut) +'</td></tr>';
	}
	var transport=getElementsByClassName("owncolony","a","Metal");
	var kmet=kkris=kdeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		kmet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		kkris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		kdeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(kmet!=0 || kkris!=0 || kdeut!=0) {
		code += '<tr><td>Kolonizirati</td><td>'+ TausenderZahl(kmet) +'</td><td>'+ TausenderZahl(kkris) +'</td><td>'+ TausenderZahl(kdeut) +'</td></tr>';
	}
	var transport=getElementsByClassName("ownhold","a","Metal");
	var hmet=hkris=hdeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		hmet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		hkris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		hdeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(hmet!=0 || hkris!=0 || hdeut!=0) {
		code += '<tr><td>Pauziranje</td><td>'+ TausenderZahl(hmet) +'</td><td>'+ TausenderZahl(hkris) +'</td><td>'+ TausenderZahl(hdeut) +'</td></tr>';
	}
	var transport=getElementsByClassName("ownharvest","a","Metal");
	var rmet=rkris=rdeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		rmet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		rkris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		rdeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(rmet!=0 || rkris!=0 || rdeut!=0) {
		code += '<tr><td>Vaditi</td><td>'+ TausenderZahl(rmet) +'</td><td>'+ TausenderZahl(rkris) +'</td><td>'+ TausenderZahl(rdeut) +'</td></tr>';
	}
	var transport=getElementsByClassName("ownattack","a","Metal");
	var amet=akris=adeut=0;
	for(i=0;i<transport.length;i++){
		text=transport[i].getAttribute("onmouseover");
		amet += parseInt(text.match(/Metal: ([\.0-9]+)/)[1].replace(/\./g,''),10);
		akris += parseInt(text.match(/Kristal: ([\.0-9]+)/)[1].replace(/\./g,'',10));
		adeut += parseInt(text.match(/Deuterij: ([\.0-9]+)/)[1].replace(/\./g,''),10);
	}
	if(amet!=0 || akris!=0 || adeut!=0) {
		code += '<tr><td>Napadati</td><td>'+ TausenderZahl(amet) +'</td><td>'+ TausenderZahl(akris) +'</td><td>'+ TausenderZahl(adeut) +'</td></tr>';
	}
	
	var met=kris=deut=0;
	met=tmet+smet+kmet+hmet+rmet+amet;
	kris=tkris+skris+kkris+hkris+rkris+akris;
	deut=tdeut+sdeut+kdeut+hdeut+rdeut+adeut;
	code += '<tr><td><span style="color:yellow">Ukupno:</span></td><td><span style="color:yellow">'+ TausenderZahl(met) +'</span></td><td><span style="color:yellow">'+ TausenderZahl(kris) +'</span></td><td><span style="color:yellow">'+ TausenderZahl(deut) +'</span></td></tr>';
	
	
	code += '</table></center><br>';
	aa4 = document.createElement("div");
	Body.appendChild(aa4);
	var ttt = FindeXPath('/html/body/div[last()]');
	ttt[0].innerHTML = code;
}
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Zeiten in Tagen anzeigen
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var modus = (Datei == "buildings") ? document.URL.match(/mode=([0-9a-zA-Z]+)/)[1] : 0;
if (SID && (Datei == "overview" || Datei == "flotten2" || (Datei == "buildings" && modus == "Forschung") || Datei == "b_building")) {
	var Zaehler = Array(), ZaehlerLaeuft = false;
	function AktZaehler()
	{
		for (var i = 0; i < Zaehler.length; ++i) {	
			if (!Zaehler[i]) continue;	
			var rest = Zaehler[i].getAttribute("title");
			var d = 0, h = 0, m = 0, s = rest;
			
			if (rest <= 0) {
				if (Zaehler[i].getAttribute("gebaeude") != 0) {
					var url = Zaehler[i].getAttribute("url");
					Zaehler[i].innerHTML = "Abgeschlossen<br /><a href='"+url+"'>Weiter</a>";
					window.setTimeout(function(){location.href=url;}, 1200);
				}
				else
					Zaehler[i].innerHTML = "-";
				continue;
			}
			
			// Tage, Stunden, Minuten, Sekunden ermitteln und formatieren
			if (s > 59) {
				m = Math.floor(s/60);
				s %= 60;
				if (m > 59) {
					h = Math.floor(m/60);
					m %= 60;
					if (h > 23) {
						d = Math.floor(h/24);
						h %= 24;
					}
				}
			}
			if (s < 10) s = "0"+s;
			if (m < 10) m = "0"+m;
			
			var Text = (d ? d+"T&nbsp;" : "") + h + ":" + m + ":" + s;
			if (Zaehler[i].getAttribute("gebaeude") != 0) {
				Text += "<br /><a href='"+Zaehler[i].getAttribute("url")+"&unbau="+Zaehler[i].getAttribute("gebaeude")+"'>Abbrechen</a>";
			}
			Zaehler[i].innerHTML = Text;
			Zaehler[i].setAttribute("title", rest-1);
		}
	}
	function StarteZaehler()
	{
		if (ZaehlerLaeuft) return;
		ZaehlerLaeuft = true;
		if (!Zaehler.length) return;
		
		// Daten aus den OGame-Zählern fischen (dooferweise werden da 3 grundlegend verschiedene Methoden verwendet, und die müssen alle erkannt werden. Ekelhafte Programmiererei ist das...)
		for (var i = 0; i < Zaehler.length; ++i) {
			if (Zaehler[i].getAttribute("title")) { // Übersicht und Flottenmenü
				Zaehler[i].setAttribute("gebaeude", 0);
			}
			else {
				if (unsafeWindow.pp) { // Gebäudemenü
					Zaehler[i].setAttribute("title", unsafeWindow.pp);
					Zaehler[i].setAttribute("gebaeude", unsafeWindow.pk);
				}
				else { // im Forschungsmenü wirds noch komplizierter...
					var ZeitDaten = Zaehler[i].firstChild.nodeValue.match(/([0-9]+):([0-9]{2}):([0-9]{2})/); // Werte extrahieren
					var IDDaten = FindeXPath('a[1]', Zaehler[i])[0].href.match(/unbau=([0-9a-zA-Z]+)/);
					if (!ZeitDaten || !IDDaten) {
						Zaehler[i] = 0;
						continue;
					}
					Zaehler[i].setAttribute("title", Number(ZeitDaten[1])*3600 + Number(ZeitDaten[2])*60 + Number(ZeitDaten[3]));
					Zaehler[i].setAttribute("gebaeude", IDDaten[1]);	
				}
				var url = Datei+".php?session="+SID+"&cp="+AktPlani["ID"]+PHPSIDStr;
				if (modus) url += "&mode="+modus;
				Zaehler[i].setAttribute("url", url);
			}
		}
		
		window.setInterval(AktZaehler, 1000);
		AktZaehler();
	}
	
	// Die Zähler finden
	Zaehler = FindeXPath('//div[starts-with(@id, "bx")]');	
	unsafeWindow.t = unsafeWindow.tt = StarteZaehler; // vorhandene Funktion ueberschreiben
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Aenderungen an der Buddyliste
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "buddy" && SID) {
  // suche die Tabellenzellen mit den Koords
  var Zellen = FindeXPath('//table[@width="519"]/tbody/tr/th[4]');
  for (var i = 0; i < Zellen.length; ++i) {
    var Data = Zellen[i].firstChild.nodeValue.match(/([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})/);
    if (!Data) continue;
    Zellen[i].removeChild(Zellen[i].firstChild);
    Zellen[i].appendChild(NeuesElement("a", "[" + Data[0] + "]", "href", "galaxy.php?session="+SID+"&p1="+Data[1]+"&p2="+Data[2]+"&p3="+Data[3]+PHPSIDStr));
  }
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Tagesproduktion anzeigen
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "resources") { // im Ressmenue Tagesproduktion und x-Stunden/Tage-Produktion anzeigen
	HoleRessourcen();
  
  var planimond = FindeXPath('/html/body/center[2]/form/table/tbody/tr/td');
  if(planimond[0].innerHTML.indexOf("(Mond)")==-1) {
  var erg2 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[8]/th[1]');
    if(erg2.length>0) {
  	  if(erg2[0].innerHTML.indexOf("Solarsatellit")!=-1) {
  	  var erg1 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[8]/th[6]/font');
  	  var satenergie = erg1[0].innerHTML.replace(/\./g, '');
  	  var satanzahl = erg2[0].innerHTML.match(/Anzahl ([\.0-9]+)/);
  	  var erg3 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[8]/th[7]/select');
  	  var prozent = parseInt(erg3[0].value);
  	  satanzahl = satanzahl[1].replace(/\./g, '');
  	  prosat = Math.floor(parseInt(satenergie) / parseInt(satanzahl));
  	  prosat100 = Math.floor(((parseInt(satenergie) / parseInt(satanzahl))/prozent)*100);
  	  if(prozent!=100) { text = "%<br> Möglich: " + prosat100.toString() + " bei 100%</span>" } else { text = "%</span>" }
  	  erg2[0].innerHTML = erg2[0].innerHTML + "<br><span style='color:yellow'>Energija po solarnom satelitu: "+prosat.toString()+" bei " + prozent.toString() + text; 
  	  }
    }
	var erg23 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[9]/th[1]');
    if(erg23.length>0) {
  	  if(erg23[0].innerHTML.indexOf("Solarsatellit")!=-1) {
  	  var erg1 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[9]/th[6]/font');
  	  var satenergie = erg1[0].innerHTML.replace(/\./g, '');
  	  var satanzahl = erg23[0].innerHTML.match(/Anzahl ([\.0-9]+)/);
  	  var erg3 = FindeXPath('/html/body/center[2]/form/table/tbody/tr[9]/th[7]/select');
  	  var prozent = parseInt(erg3[0].value);
  	  satanzahl = satanzahl[1].replace(/\./g, '');
  	  prosat = Math.floor(parseInt(satenergie) / parseInt(satanzahl));
  	  prosat100 = Math.floor(((parseInt(satenergie) / parseInt(satanzahl))/prozent)*100);
  	  if(prozent!=100) { text = "%<br> Möglich: " + prosat100.toString() + " bei 100%</span>" } else { text = "%</span>" }
  	  erg23[0].innerHTML = erg23[0].innerHTML + "<br><span style='color:yellow'>Energija po solarnom satelitu: "+prosat.toString()+" bei " + prozent.toString() + text; 
  	  }
    }
  }

	var Arr = FindeXPath('//table[@width="550"]/tbody/tr[count(td)+count(th)=5]'); // Das sind die Zeilen der Rohstofftabelle
  var Prod = Array(); 
  var GesZeile = Arr[Arr.length-1];
  Arr = FindeXPath('td/font[1]', GesZeile);
  for (var i = 0; i < 3; ++i)  Prod[i] = InInt(Arr[i].firstChild.nodeValue); // Produktion dieses Rohstoffs speichern

  function AktDynAnz()
  {
    var Anz = InInt(document.getElementById("dyn_anz").value);
    if (isNaN(Anz)) return;
    var Art = document.getElementById("dyn_art");
    Art = InInt(Art.options[Art.selectedIndex].value);
    var Multiplikator = Anz*Art;

    for (var i = 0; i < 3; ++i)
      document.getElementById("dyn_ausg"+i).firstChild.nodeValue = TausenderZahl(Prod[i]*Multiplikator);
  }

	function SetzeAuf(Wert)
	{
		var AuswahlBoxen = FindeXPath('//table[@width="550"]/tbody/tr/th/select[starts-with(@name, "last")]');
		for (var i = 0; i < AuswahlBoxen.length; ++i) {
			var Name = AuswahlBoxen[i].name;
			if (Name == "last1" || Name == "last2" || Name == "last3" || Name == "last4") AuswahlBoxen[i].selectedIndex = Wert;
		}
		document.getElementsByName("action")[0].click(); // Formular absenden (da action=Berechne sein muss geht das am einfachsten, indem man den Button drückt - formular.submit() klappt nicht
	}
	
	var LeerZelle = FindeXPath('//table[@width="550"]/tbody/tr[count(th)=1]/th[@height=4][@colspan=6]')[0];
	LeerZelle.setAttribute("colspan", 7);
	var BtnZelle = NeuesElement("td", "", "class", "k");
	var Btn = NeuesElement("input", "", "type", "button", "value", "Sve na 100%");
	Btn.addEventListener("click", function(){SetzeAuf(0);}, true);
	BtnZelle.appendChild(Btn);
	GesZeile.appendChild(BtnZelle);

  // Zeile für dynamische Anzeige einfügen
  var NeuZeile = document.createElement("tr");
  var AuswZelle = document.createElement("th");
  AuswZelle.setAttribute("colspan", "2");
  AuswZelle.appendChild(document.createTextNode("Produkcija na "));
  AuswZelle.appendChild(document.createElement("br"));
  AuswZelle.appendChild(NeuesElement("input", "", "type", "text", "id", "dyn_anz", "value", "7", "size", "5"));
  AuswZelle.appendChild(document.createTextNode(" "));
  var ArtAusw = NeuesElement("select", "", "id", "dyn_art");
  ArtAusw.appendChild(NeuesElement("option", "Sati", "value", "1"));
  ArtAusw.appendChild(NeuesElement("option", "Dana", "value", "24", "selected", "selected"));
  AuswZelle.appendChild(ArtAusw);
  NeuZeile.appendChild(AuswZelle);
  for (var i = 0; i < 3; ++i) { // fuer die 3 Ressourcentypen
    NeuZeile.appendChild(NeuesElement("td", " ", "class", "k", "style", "color:#00FF00", "id", "dyn_ausg"+i));
  }
  NeuZeile.appendChild(NeuesElement("td", "-", "class", "k", "style", "color:#00FF00"));
  EinfuegenHinter(NeuZeile, GesZeile); // die neue Zeile nach der Gesamtsummenzeile einfuegen
  AktDynAnz();
  window.setInterval(AktDynAnz, 200);

  // Tagesproduktion
  NeuZeile = document.createElement("tr"); // noch eine neue Zeile erstellen
  NeuZeile.appendChild(NeuesElement("th", "Dnevna proizvodnja:", "colspan", "2")); // Zelle einfuegen
  for (var i = 0; i < 3; ++i) { // fuer die 3 Ressourcentypen
    NeuZeile.appendChild(NeuesElement("td", TausenderZahl(Prod[i]*24), "class", "k", "style", "color:#00FF00")); // Zelle in die Zeile setzen
  }
  NeuZeile.appendChild(NeuesElement("td", "-", "class", "k", "style", "color:#00FF00")); // Zelle in die Zeile setzen
	BtnZelle = NeuesElement("td", "", "class", "k");
	var Btn = NeuesElement("input", "", "type", "button", "value", "Sve na 0%");
	Btn.addEventListener("click", function(){SetzeAuf(10);}, true);
	BtnZelle.appendChild(Btn);
	NeuZeile.appendChild(BtnZelle);
  EinfuegenHinter(NeuZeile, GesZeile); // die neue Zeile nach der Gesamtsummenzeile einfuegen
 
  var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
	var RessSumme = Ress[0] + Ress[1]; // Summe der Ressourcen bestimmen
	var OhneDeut = LadeAccEinst("nema_deut", Default_KeinDeut);
	if (!OhneDeut) RessSumme += Ress[2]; // Deut nur einrechen falls es nicht  
  BenKT = Math.ceil(RessSumme/5000); // vollen laderaum verwenden - schließlich kommt der Treibstoff ja auch in den Laderaum
  BenGT = Math.ceil(RessSumme/25000);

  aa4 = document.createElement("div");
  Body.appendChild(aa4);
  var ttt_anzahl = FindeXPath('/html/body/div');
  var ttt_anzahl = ttt_anzahl.length;
  var ttt = FindeXPath('/html/body/div['+ttt_anzahl+']');
  ttt[0].innerHTML = '<center><table width="550"><tr><th>Zbroj od <span style="color:yellow; font-weight:bold;">'+TausenderZahl(RessSumme.toString())+ '</span>' +(OhneDeut ? ' Metal i Kristal' : ' Metal, Kristal i Deuterij')+' na ovoj planeti<br>Potrebno je <span style="color:yellow; font-weight:bold;">'+TausenderZahl(BenGT.toString())+' velikih trnsportera</span> ili <span style="color:yellow; font-weight:bold;">'+TausenderZahl(BenKT.toString())+' malih transportera</span></td></tr></table></center>';

}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Spionagebericht auswerten und Button erstellen zum Senden an Online-Speedsim
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "bericht") {
	
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Statistikseiten erweitern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "stat" && SID) { // in den Stats
if(LadeAccEinst("show_punkte_diff", Default_ShowPunkteDiff)==true) { PunkteDiff("statistik"); }
	function MarkPos() // markiere die uebergebene Position und scrolle zu ihr
	{
		if (!location.hash.length) return; // falls keine Position markiert wurde - abgang

		var Pos = InInt(location.hash.substr(1)); // markierte Position
    var PosZellen = FindeXPath('//tr/th[1]/text()[starts-with(string(),'+"\""+Pos+"\""+')]');
		if (!PosZellen.length) return; // falls kein Tag gefunden wurde - weg
		var PosZeile = PosZellen[0].parentNode.parentNode; // Zeile mit diesem Spieler
		PosZeile.scrollIntoView(); // Zelle anzeigen
		for (var i = 0; i < PosZeile.childNodes.length; ++i) // alle Kindknoten der Zeile
			if (PosZeile.childNodes[i].nodeType == 1) // die ein Tag sind
				PosZeile.childNodes[i].style.fontSize = "13pt"; // vergroessern
	}
	// Formular bearbeiten, damit der anker nicht übernommen wird
	document.forms[0].action = "stat.php?session="+SID+"#";
  MarkPos(); // damit die returns funktionieren
}
//-------------------------------------------------------------------------------
else if (Datei == "overview" || Datei == "suche") { // in allen anderen Seiten, die Statistik-Links enthalten
	// Stat-Links korrigieren
	var StatLinks = FindeXPath('//a[contains(@href,"stat.php?")]'); // alle Stat-Links finden
  for (var i = 0; i < StatLinks.length; ++i) { // Links berarbeiten
 		 var Pos = InInt(StatLinks[i].firstChild.nodeValue); // Position auf die verlinkt wird (steht im Text)
 		 if (Pos) StatLinks[i].href += "#"+Pos; // falls es eine Position ist, diese als Anker hintendransetzen (der Anker wird von diesem Skript interpretiert)
  }
}
//-------------------------------------------------------------------------------
// Die Imperiumansicht aendern
//-------------------------------------------------------------------------------
if(Datei == "imperium")
{
  // Init Vars
  var Schnitt = 0;
  var ProdSumme = 0;
  var Summe = 0;
  var Rows = FindeXPath('//table/tbody/tr');

	var impcode = '<b>Ukupna dnevna proizvodnja</b>';
	var impzahl = 1;
	var impseite = 0;
  for ( var z = 0; z < Rows.length; z++ )
  {
      var headers = Rows[z].getElementsByTagName('td');
      if (headers[0])
      {
          switcher = headers[0].innerHTML.substring(0, 3);
          //headers[0].innerHTML = "test";
      }

      switch(switcher)
      {
          case "Roh":
              // Resis
             if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis))
             {
                  Summe = 0;
                  Schnitt = 0;
                  ProdSumme = 0;
                  var Zellen = Rows[z].getElementsByTagName('th');
                  if( Zellen.length > 0 )
                  {
                      if( Zellen[0].innerHTML != "Energija" )
                      {
                          for (var i = 1; i < Zellen.length; ++i)
                          {
                            var ress = Zellen[i].innerHTML;
                            var ress_neu = ress.match(/ [\.0-9]+ /g);
                            //Zellen[i].innerHTML = ress_neu[0].replace(/\./, '');
                            if( ress_neu[0] )
                                Summe += parseInt(ress_neu[0].replace(/\./g, ''));
                            if( ress_neu[1] )
                                ProdSumme += parseInt(ress_neu[1].replace(/\./g, ''));
								impseite += parseInt(ress_neu[1].replace(/\./g, ''));
                          }
                          if( Zellen[0] )
                              Zellen[0].innerHTML = Zellen[0].innerHTML + "<br>&Sigma;<span style='color:yellow'> " + TausenderZahl(Summe) + "</span>&nbsp;&nbsp;&nbsp;&Sigma;<span style='color:yellow'> " + TausenderZahl(ProdSumme) + "</span>";
							  if(impzahl==1) {
								  impcode += '<p>Metall:<br><span style="color:yellow">'+TausenderZahl(ProdSumme*24)+'</span><br>';
							  }
							  if(impzahl==2) {
								  impcode += 'Kristall:<br><span style="color:yellow">'+TausenderZahl(ProdSumme*24)+'</span><br>';
							  }
							  if(impzahl==3) {
								  impcode += 'Deuterium:<br><span style="color:yellow">'+TausenderZahl(ProdSumme*24)+'</span>';
							  }
							  impzahl++;
						}
                   }
              }
              break;

           case "Geb":
             if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis))
             {
                  var Zellen = Rows[z].getElementsByTagName('th');
                  if( Zellen.length > 0 )
                  {
                      Schnitt = 0;
                      for (var i = 1; i < Zellen.length; ++i)
                      {
                        var handler = Zellen[i].innerHTML;
                        var handler_neu = handler.match(/ [\.0-9]+ /g);
                        if( handler_neu ) {
							Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
							if(Zellen[0].innerHTML.indexOf("Metallmine")!=-1 && LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)==true) {
								mine = handler_neu[0].replace(/\./g, '');
								nextmine = parseInt(mine.substr(1,2)) + 1;
								mkosten = Math.round(40 * Math.pow(1.5, nextmine),0);
								kkosten = Math.round(10 * Math.pow(1.5, nextmine),0);
								
								blabla = '/html/body/center/table/tbody/tr[10]/th['+(i+1)+']';
								var energie_vorhanden_pos = FindeXPath(blabla);
								var e_v_1 = energie_vorhanden_pos[0].innerHTML;
								var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
								var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
								var energie = Math.ceil(10*(nextmine)*Math.pow(1.1,(nextmine))) - Math.ceil(10*(nextmine-1)*Math.pow(1.1,(nextmine-1)));
								var f_energie = energie - energie_vorhanden;
								if(f_energie<0) { f_energie = 0; f_color="green"; f_z="";} else { f_color="red"; f_z="-";}
								Zellen[i].innerHTML = Zellen[i].innerHTML + "<br>M: <span style='color:yellow'>" + TausenderZahl(mkosten.toString()) + "</span><br>K: <span style='color:yellow'>" + TausenderZahl(kkosten.toString()) + "</span><br>E: <span style='color:yellow'>" + TausenderZahl(energie.toString()) + "</span> (<span style='color:" + f_color + "'>" + f_z + TausenderZahl(f_energie.toString()) + "</span>)";
							}
							if(Zellen[0].innerHTML.indexOf("Kristallmine")!=-1 && LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)==true) {
								mine = handler_neu[0].replace(/\./g, '');
								nextmine = parseInt(mine.substr(1,2)) + 1;
								mkosten = Math.round(30 * Math.pow(1.6, nextmine),0);
								kkosten = Math.round(15 * Math.pow(1.6, nextmine),0);
								
								blabla = '/html/body/center/table/tbody/tr[10]/th['+(i+1)+']';
								var energie_vorhanden_pos = FindeXPath(blabla);
								var e_v_1 = energie_vorhanden_pos[0].innerHTML;
								var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
								var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
								var energie = Math.ceil(10*(nextmine)*Math.pow(1.1,(nextmine))) - Math.ceil(10*(nextmine-1)*Math.pow(1.1,(nextmine-1)));
								var f_energie = energie - energie_vorhanden;
								if(f_energie<0) { f_energie = 0; f_color="green"; f_z="";} else { f_color="red"; f_z="-";}
								Zellen[i].innerHTML = Zellen[i].innerHTML + "<br>M: <span style='color:yellow'>" + TausenderZahl(mkosten.toString()) + "</span><br>K: <span style='color:yellow'>" + TausenderZahl(kkosten.toString()) + "</span><br>E: <span style='color:yellow'>" + TausenderZahl(energie.toString()) + "</span> (<span style='color:" + f_color + "'>" + f_z + TausenderZahl(f_energie.toString()) + "</span>)";
							}
							if(Zellen[0].innerHTML.indexOf("Deuteriumsynthetisierer")!=-1 && LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)==true) {
								mine = handler_neu[0].replace(/\./g, '');
								nextmine = parseInt(mine.substr(1,2)) + 1;
								mkosten = Math.round(150 * Math.pow(1.5, nextmine),0);
								kkosten = Math.round(50 * Math.pow(1.5, nextmine),0);
								
								blabla = '/html/body/center/table/tbody/tr[10]/th['+(i+1)+']';
								var energie_vorhanden_pos = FindeXPath(blabla);
								var e_v_1 = energie_vorhanden_pos[0].innerHTML;
								var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
								var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
								var energie = Math.ceil(20*(nextmine)*Math.pow(1.1,(nextmine))) - Math.ceil(20*(nextmine-1)*Math.pow(1.1,(nextmine-1)));
								var f_energie = energie - energie_vorhanden;
								if(f_energie<0) { f_energie = 0; f_color="green"; f_z="";} else { f_color="red"; f_z="-";}
								Zellen[i].innerHTML = Zellen[i].innerHTML + "<br>M: <span style='color:yellow'>" + TausenderZahl(mkosten.toString()) + "</span><br>K: <span style='color:yellow'>" + TausenderZahl(kkosten.toString()) + "</span><br>E: <span style='color:yellow'>" + TausenderZahl(energie.toString()) + "</span> (<span style='color:" + f_color + "'>" + f_z + TausenderZahl(f_energie.toString()) + "</span>)";
							}
							if(Zellen[0].innerHTML.indexOf("Solarkraftwerk")!=-1 && LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)==true) {
								mine = handler_neu[0].replace(/\./g, '');
								nextmine = parseInt(mine.substr(1,2)) + 1;
								mkosten = Math.round(50 * Math.pow(1.5, nextmine),0);
								kkosten = Math.round(20 * Math.pow(1.5, nextmine),0);
								Zellen[i].innerHTML = Zellen[i].innerHTML + "<br>M: <span style='color:yellow'>" + TausenderZahl(mkosten.toString()) + "</span><br>K: <span style='color:yellow'>" + TausenderZahl(kkosten.toString()) + "</span>";
							}
						}
                      }
                      Schnitt = Math.round((Schnitt/(i-1))*100)/100;
                      if( Zellen[0] )
                          Zellen[0].innerHTML = Zellen[0].innerHTML + "<br />&Oslash;<span style='color:yellow'> " + Schnitt + " </span>";
                  }
              }
              break;

           case "For":
             if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis))
             {
                  var Zellen = Rows[z].getElementsByTagName('th');
                  if( Zellen.length > 0 )
                  {
                      Schnitt = 0;
                      for (var i = 1; i < Zellen.length; ++i)
                      {
                        var handler = Zellen[i].innerHTML;
                        var handler_neu = handler.match(/ [\.0-9]+ /g);
                        if( handler_neu )
                            Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
                      }
                      Schnitt = Math.round((Schnitt/(i-1))*100)/100;
                      if( Zellen[0] )
                          Zellen[0].innerHTML = Zellen[0].innerHTML + "<br />&Oslash;<span style='color:yellow'> " + Schnitt + " </span>";
                  }
              }
              break;

           case "Sch":
             if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis))
             {
                  var Zellen = Rows[z].getElementsByTagName('th');
                  if( Zellen.length > 0 )
                  {
                      Summe = 0;
                      Schnitt = 0;
                      for (var i = 1; i < Zellen.length; ++i)
                      {
                        var handler = Zellen[i].innerHTML;
                        var handler_neu = handler.match(/ [\.0-9]+ /g);
                        if( handler_neu )
                        {
                            Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
                            Summe += parseInt(handler_neu[0].replace(/\./g, ''));
                        }
                      }
                      Schnitt = Math.round((Schnitt/(i-1))*100)/100;
                      if( Zellen[0] )
                          Zellen[0].innerHTML = Zellen[0].innerHTML + "<br>&Sigma;<span style='color:yellow'> " + TausenderZahl(Summe) + "</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style='color:yellow'> " + Schnitt + " </span>";
                  }
              }
              break;

           case "Ver":
             if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis))
             {
                  var Zellen = Rows[z].getElementsByTagName('th');
                  if( Zellen.length > 0 )
                  {
                      Summe = 0;
                      Schnitt = 0;
                      for (var i = 1; i < Zellen.length; ++i)
                      {
                        var handler = Zellen[i].innerHTML;
                        var handler_neu = handler.match(/ [\.0-9]+ /g);
                        if( handler_neu )
                        {
                            Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
                            Summe += parseInt(handler_neu[0].replace(/\./g, ''));
                        }
                      }
                      Schnitt = Math.round((Schnitt/(i-1))*100)/100;
                      if( Zellen[0] )
                          Zellen[0].innerHTML = Zellen[0].innerHTML + "<br>&Sigma;<span style='color:yellow'> " + TausenderZahl(Summe) + "</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style='color:yellow'> " + Schnitt + " </span>";
                  }
              }
              break;
      }
   }
   	  if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)==true && impseite>0)
             {
				 var LeerFeld = FindeXPath('//table/tbody/tr[2]/th[1]');
				 if(LeerFeld[0].innerHTML=="") {
				 	LeerFeld[0].setAttribute("style", "vertical-align:top;");
				 	LeerFeld[0].innerHTML = impcode;
				 } else {
					 var LeerFeld = FindeXPath('//table/tbody/tr[3]/th[1]');
				 	LeerFeld[0].setAttribute("style", "vertical-align:top;");
				 	LeerFeld[0].innerHTML = impcode;
				 }
			 }
}//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Memberliste bereits sortiert anzeigen
if (Datei == "allianzen") {
if(LadeAccEinst("show_punkte_diff", Default_ShowPunkteDiff)==true) { PunkteDiff("memberliste"); }
	var ML_Link = FindeXPath('/html/body/center/table/tbody/tr[5]/th[2]/a[1]');
	if (ML_Link[0].innerHTML.indexOf("Mitgliederliste")!=-1 && LadeAccEinst("ml_sort", Default_MLSort)) {
		var LinkNeu = ML_Link[0].href + '&sort1=' + LadeAccEinst("ml_typ", Default_MLTyp) + '&sort2=' + LadeAccEinst("ml_art", Default_MLArt);
		ML_Link[0].setAttribute("href", LinkNeu);
	}
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Die Gala aendern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "galaxy" && LadeAccEinst("tf_limit", Default_TFLimit) >= 0) { // in der Gala
	var Gala = document.getElementsByName("galaxy")[0].value, Sys = document.getElementsByName("system")[0].value; // Gala und System rausfinden

	// evntl. Inhalt des TFs als Text
	var TFTips = FindeTooltips("Tr"+ue+"mmerfeld ["+Gala);
	var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
	if (!TFTips.length) TFTips = FindeTooltips("Debris ["+Gala);
	for (var i = 0; i < TFTips.length; ++i) {
		var TFInhalt = FindeXPath('tr/th/table/tbody/tr/th[2]/text()', TFTips[i]["el"]);
		var TFM = InInt(TFInhalt[0].nodeValue), TFK = InInt(TFInhalt[1].nodeValue);
		var Pos = TFTips[i]["titel"].match(/:([0-9]+)\]/)[1]; // Position des TFs in der Gala herausfinden
		var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()='+Pos+']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthält
		//var Zeile = ZeilenNr.parentNode.parentNode; // Zeile mit dem TF
		if (TFM+TFK >= LadeAccEinst("tf_limit", Default_TFLimit)) {
			if (FoxGameVerkl < 0) FoxGameVerkl = (FindeXPath('th[8]', Zeile).length ? 0 : 1); // wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
			var PlaniName = (FoxGameVerkl == 0) ? FindeXPath('th[3]', Zeile)[0] : FindeXPath('th[2]', Zeile)[0];
			PlaniName.appendChild(document.createElement("br"));
			PlaniName.appendChild(NeuesElement("span", "(M: "+TausenderZahl(TFM)+", K: "+TausenderZahl(TFK)+")", "style", "color:yellow;"));
		}
	}
}
//-------------------------------------------------------------------------------
// Die Gala aendern (Platz Spieler)
//-------------------------------------------------------------------------------
if (Datei == "galaxy" && LadeAccEinst("platz_anzeige", Default_PlatzAnzeige)) { // in der Gala
	var Gala = document.getElementsByName("galaxy")[0].value, Sys = document.getElementsByName("system")[0].value; // Gala und Sys auslesen
	var TFTips = FindeTooltips("Planet "); // Findet die ToolTips der Planeten
	var SpTips = FindeTooltips("Spieler"); // Findet die ToolTips der Spieler (da jeder Planet zu einem Spieler gehören muss)
	var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
	for (var i = 0; i < TFTips.length; ++i) {
		var Pos = TFTips[i]["titel"].match(/:([0-9]+)\]/)[1]; // Planeten-Nummer auslesen (1-15)
		var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()='+Pos+']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthält
		//var Zeile = ZeilenNr.parentNode.parentNode; // Zeile mit dem TF
			if (FoxGameVerkl < 0) FoxGameVerkl = (FindeXPath('th[8]', Zeile).length ? 0 : 1); // wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
			var PlaniName = (FoxGameVerkl == 0) ? FindeXPath('th[6]', Zeile)[0] : FindeXPath('th[5]', Zeile)[0]; // neues Element entweder in der 5. oder 6. Spalte (je nach Foxgame-Einstellung)
			PlaniName.appendChild(document.createElement("br"));
			
			var Platz = SpTips[i]["titel"].match(/Platz ([.0-9]+)/); // Alle Platzierungen der Spieler werden gesucht
			if(Platz!=null) { // Es werden nur Platzierungen ausgegeben werde, die auch wirklich vorhanden sind (Platz 1-1500, Rest würde 'null' bzw. 'undefined' ergeben)
				Platz = SpTips[i]["titel"].match(/Platz ([.0-9]+)/)[1];
				PlaniName.appendChild(NeuesElement("span", "(# "+Platz+")", "style", "color:yellow;"));
			}
	}
}
//-------------------------------------------------------------------------------
// Die Gala aendern (Platz Ally)
//-------------------------------------------------------------------------------
if (Datei == "galaxy" && LadeAccEinst("allyplatz_anzeige", Default_AllyPlatzAnzeige)) { // in der Gala
	var z = 0;
	var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
    for(var i = 1; i < 16; i++)
	{
		var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()='+i+']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthýlt
		if (FoxGameVerkl < 0) FoxGameVerkl = (FindeXPath('th[8]', Zeile).length ? 0 : 1);
        var AllyName = (FoxGameVerkl == 0) ? FindeXPath('th[7]', Zeile)[0] : FindeXPath('th[6]', Zeile)[0];
		var aHref = AllyName.getElementsByTagName("a")[0];

        if(aHref)
        {
            var AlPlatz = TausenderZahl(parseInt(aHref.getAttribute("onmouseover").match(/Platz ([.0-9]+)/)[1],10));
            if( AlPlatz )
			{
                AllyName.appendChild(document.createElement("br"));
    			AllyName.appendChild(NeuesElement("span", "(# "+AlPlatz.toString()+")", "style", "color:yellow;"));
    		}
    		z++;
    	}
	}
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// allgemeine Korrekturen
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "overview" || Datei == "galaxy" || Datei == "flotten1") { // title-Tags bearbeiten
	var Links = document.getElementsByTagName("a");
	for (var i = 0; i < Links.length; ++i) {
		if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) != -1) continue; // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)

		if (Datei == "overview") Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, "$1, $2");
  	else if (Datei == "flotten1" && (Links[i].title.indexOf("Geschwindigkeit: ") != -1 || Links[i].title.indexOf("Speed: ") != -1))
  		Links[i].setAttribute("class", "geschw_anzeige");
  	if (LadeAccEinst("tausenderpkt", Default_Tausenderpkt))
  		Links[i].title = TausenderString(Links[i].title); // Punkte einfuegen
	}
}
if (Datei == "galaxy") window.focus();
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Einstellungsmenue erweitern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
if (Datei == "options") {
	function Speichere() {
		// (De)aktivierung speichern
    SpeichAccEinst("planiliste_aend", document.getElementById("planiliste_aend").checked);
	SpeichAccEinst("fehlress_als_text", document.getElementById("fehlress_als_text").checked);
    SpeichAccEinst("ang_zeit", document.getElementById("ang_zeit").checked);
	SpeichAccEinst("ml_sort", document.getElementById("ml_sort").checked);
    SpeichAccEinst("ankft_zeit", document.getElementById("ankft_zeit").checked);
    SpeichAccEinst("flotten_faerben", document.getElementById("flotten_faerben").checked);
    SpeichAccEinst("schiffs_geschw", document.getElementById("schiffs_geschw").checked);
    SpeichAccEinst("fltmenu_buttons", document.getElementById("fltmenu_buttons").checked);
    SpeichAccEinst("auto_auftrag", document.getElementById("auto_auftrag").checked);
	SpeichAccEinst("platz_anzeige", document.getElementById("platz_anzeige").checked);
	SpeichAccEinst("allyplatz_anzeige", document.getElementById("allyplatz_anzeige").checked);
	SpeichAccEinst("show_punkte_diff", document.getElementById("show_punkte_diff").checked);
	SpeichAccEinst("tausenderpkt", document.getElementById("tausenderpkt").checked);
	SpeichAccEinst("bewegteress", document.getElementById("bewegteress").checked);
	SpeichAccEinst("imperium_calc_resis", document.getElementById("imperium_calc_resis").checked);
    // Konfiguration speichern
    var defplani = document.getElementById("def_plani");
    SpeichAccEinst("def_plani", defplani.options[defplani.selectedIndex].value);
	var mltyp = document.getElementById("ml_typ");
    SpeichAccEinst("ml_typ", mltyp.options[mltyp.selectedIndex].value);
	var mlart = document.getElementById("ml_art");
    SpeichAccEinst("ml_art", mlart.options[mlart.selectedIndex].value);
	
    SpeichAccEinst("kein_deut", document.getElementById("kein_deut").checked);
    SpeichAccEinst("monde_getrennt", document.getElementById("monde_getrennt").checked);
		SpeichAccEinst("stationieren_vorz", document.getElementById("stationieren_vorz").checked);
		SpeichAccEinst("keine_planinamen", document.getElementById("keine_planinamen").checked);
		SpeichAccEinst("hp_oben", document.getElementById("hp_oben").checked);

    var MaxTabBreite = parseInt(document.getElementById("max_tab_breite").value, 10);
    if (MaxTabBreite < 520 || MaxTabBreite > 1000 || isNaN(document.getElementById("max_tab_breite").value)) {
      MaxTabBreite = 1000;
      alert("Die maximale Tabellenbreite ist ung"+ue+"ltig (d.h. zu gro"+sz+", zu klein oder keine Zahl) und wird daher auf 1000 zur"+ue+"ckgesetzt.");
    }
    SpeichAccEinst("max_tab_breite", MaxTabBreite);
    var TFLimit = parseInt(document.getElementById("tf_limit").value, 10);
    if (TFLimit < -1 || TFLimit > 100000 || isNaN(document.getElementById("tf_limit").value)) {
      TFLimit = 5000;
      alert("Das TF-Limit ist ung"+ue+"ltig (d.h. zu gro"+sz+", zu klein oder keine Zahl) und wird daher auf 5000 zur"+ue+"ckgesetzt.");
    }
    SpeichAccEinst("tf_limit", TFLimit);

    // fertig
		window.alert("Einstellungen wurden erfolgreich gespeichert! Bitte beachte, dass die Einstellungen nur f"+ue+"r den aktuellen Account und den aktuellen Computer gelten.");
    location.reload();
	}

	var NeuTab = NeuesElement("table", "", "align", "center", "width", "519");
   
  // Konfiguration der Galaxie-Ansicht
  var Code = "<tr><td class='c' colspan='2'>Pregled galaxije</td></tr>";
  
  Code += "<tr><th>RU limit (koju velicinu mora imati RU da bi se u galaxiji prikazivala kao teskt raspon od -1 do 100.000. -1 iskljucuje tu opciju (potreban skin))</th><th><input type='text' id='tf_limit' size='5' maxlength='8' value='"+LadeAccEinst("tf_limit", Default_TFLimit)+"'></th></tr>";
    
  Code += "<tr><th>Pozicije igraca odma u galaxiji (potreban skin)</th><th><input type='checkbox' id='platz_anzeige'";
  if (LadeAccEinst("platz_anzeige", Default_PlatzAnzeige)) Code += " checked";
  Code += "></th></tr>";
	
  Code += "<tr><th>Poziciju saveza odma u galaxiji (potreban skin)</th><th><input type='checkbox' id='allyplatz_anzeige'";
  if (LadeAccEinst("allyplatz_anzeige", Default_AllyPlatzAnzeige)) Code += " checked";
  Code += "></th></tr>";
  
    // Konfiguration der Imperium-Ansicht
  Code += "<tr><td class='c' colspan='2'>Pregled imperija</td></tr>";
  
  Code += "<tr><th>Dodatne informacije u Imperiju</th><th><input type='checkbox' id='imperium_calc_resis'";
  if (LadeAccEinst("imperium_calc_resis", Default_imperium_calc_resis)) Code += " checked";
  Code += "></th></tr>";
  
   // Konfiguration des Flotten-Menues
  Code += "<tr><td class='c' colspan='2'>Pregled flote</td></tr>";
  
  Code += "<tr><th>Dodatni gumbi u izborniku flota (na glavni planet, svi resursi)</th><th><input type='checkbox' id='fltmenu_buttons'";
  if (LadeAccEinst("fltmenu_buttons", Default_FltMenuButtons)) Code += " checked";
  Code += "></th></tr>";
  
  Code += "<tr><th>Brzinu brodova prikazivati u izborniku flota</th><th><input type='checkbox' id='schiffs_geschw'";
  if (LadeAccEinst("schiffs_geschw", Default_SchiffsGeschw)) Code += " checked";
  Code += "></th></tr>";
  
  Code += "<tr><th>Dolazak flote prikazivati (arrival time)</th><th><input type='checkbox' id='ankft_zeit'";
  if (LadeAccEinst("ankft_zeit", Default_AnkftZeit)) Code += " checked";
  Code += "></th></tr>";
  
  Code += "<tr><th>Automatski odabir zadatka pri slanju flote</th><th><input type='checkbox' id='auto_auftrag'";
  if (LadeAccEinst("auto_auftrag", Default_AutoAuftrag)) Code += " checked";
  Code += "></th></tr>";
  
    Code += "<tr><th>Glavna planeta</th><th><select id='def_plani'>";
 	for (var i = 1; i < Planis.length; ++i) { // Ueber alle Planis
    Code += "<option value='"+Planis[i]["ID"]+"'";
    if (Planis[i]["ID"] == LadeAccEinst("def_plani", HP_ID)) Code += " selected";
    Code += ">";
    if (Planis[i]["Typ"] == Typ_Mond)
		Code += " - ";
    	Code += Planis[i]["Text"]+"</option>";  
    }
	Code += "</select></th></tr>";
  
  Code += "<tr><th>U izborniku Flota ne prikazivati deut</th><th><input type='checkbox' id='kein_deut'";
  if (LadeAccEinst("kein_deut", Default_KeinDeut)) Code += " checked";
  Code += "></th></tr>";

	Code += "<tr><th>Pri odabiru zadatka za flotu po defaultu na stacioniranje</th><th><input type='checkbox' id='stationieren_vorz'";
  if (LadeAccEinst("stationieren_vorz", Default_StationierenVorz)) Code += " checked";
  Code += "></th></tr>";
  
  // Konfiguration der Gebaeude-Ansicht
  Code += "<tr><td class='c' colspan='2'>Pregled zgrada</td></tr>";
	
  Code += "<tr><th>Prikazivati koliko resova fali za neku zgradu (samo za komander)</th><th><input type='checkbox' id='fehlress_als_text'";
  if (LadeAccEinst("fehlress_als_text", Default_FehlressText)) Code += " checked";
  Code += "></th></tr>";

  // Konfiguration der Uebersicht
  Code += "<tr><td class='c' colspan='2'>Pregled prosiriti</td></tr>";
  
  Code += "<tr><th>Prikazivati flotu u pregledu u drugim bojama(odlazak/dolazak) i prikazivanje resova</th><th><input type='checkbox' id='flotten_faerben'";
  if (LadeAccEinst("flotten_faerben", Default_FlottenFaerben)) Code += " checked";
  Code += "></th></tr>";

  Code += "<tr><th>Vrijeme servera u pregledu prikazati</th><th><input type='checkbox' id='ang_zeit'";
  if (LadeAccEinst("ang_zeit", Default_AngZeit)) Code += " checked";
  Code += "></th></tr>";
  
  Code += "<tr><th>Pregled resursa u flotama</th><th><input type='checkbox' id='bewegteress'";
  if (LadeAccEinst("bewegteress", Default_bewegteress)) Code += " checked";
  Code += "></th></tr>";
  
// Allgemeine Konfiguration
  Code += "<tr><td class='c' colspan='2'>Opce postavke</td></tr>";
	
  Code += "<tr><th>Maximalna sirina tablice (od 520 do 1000)</th><th><input type='text' id='max_tab_breite' size='5' maxlength='4' value='"+LadeAccEinst("max_tab_breite", Default_MaxTabBreite)+"'></th></tr>";

  Code += "<tr><th>Pokazivati razliku bodova u statistikama</th><th><input type='checkbox' id='show_punkte_diff'";
  if (LadeAccEinst("show_punkte_diff", Default_ShowPunkteDiff)) Code += " checked";
  Code += "></th></tr>";

  Code += "<tr><th>Tocka za tisucu (1.000) svagdje prikazivati</th><th><input type='checkbox' id='tausenderpkt'";
  if (LadeAccEinst("tausenderpkt", Default_Tausenderpkt)) Code += " checked";
  Code += "></th></tr>";


//------------------------------- MEMBERLISTE DEFAULT-SORTIEREN -------------------------------
  Code += "<tr><th>Link za igrace po defaultu poredati</th><th><input type='checkbox' id='ml_sort'";
  if (LadeAccEinst("ml_sort", Default_MLSort)) Code += " checked";
  Code += "></th></tr>";

	Code += "<tr><th>Sortiranje igraca prema rangu</th><th><select id='ml_typ'>";
 	for (var i = 0; i < MLTyp.length; ++i) {
    	Code += "<option value='" + i + "'";
    	if (i == LadeAccEinst("ml_typ", Default_MLTyp)) Code += " selected";
    	Code += ">" + MLTyp[i] + "</option>";
    }
	Code += "</select></th></tr>";
	
	Code += "<tr><th>Sortiranje igraca prema poredku</th><th><select id='ml_art'>";
 	for (var i = 0; i < MLArt.length; ++i) {
    	Code += "<option value='" + i + "'";
    	if (i == LadeAccEinst("ml_art", Default_MLArt)) Code += " selected";
    	Code += ">" + MLArt[i] + "</option>";
    }
	Code += "</select></th></tr>";
//---------------------------------------------------------------------------------------------
  
  
  Code += "<tr><th>Popis planet preoblikovati</th><th><input type='checkbox' id='planiliste_aend'";
  if (LadeAccEinst("planiliste_aend", Default_PlaniListeAendern)) Code += " checked";
  Code += "></th></tr>";

  Code += "<tr><th>Glavni planet na pocetak neovisno o poretku</th><th><input type='checkbox' id='hp_oben'";
  if (LadeAccEinst("hp_oben", Default_HPNachOben)) Code += " checked";
  Code += "></th></tr>";
    
  Code += "<tr><th>Planete i mjesece prikazivati bez imena (M za mjesec)</th><th><input type='checkbox' id='keine_planinamen'";
  if (LadeAccEinst("keine_planinamen", Default_KeinePlaninamen)) Code += " checked";
  Code += "></th></tr>";
  
  Code += "<tr><th>Mjesece prikazivati odvojeno od planeta</th><th><input type='checkbox' id='monde_getrennt'";
  if (LadeAccEinst("monde_getrennt", Default_MondeGetrennt)) Code += " checked";
  Code += "></th></tr>";
  
	NeuTab.innerHTML = Code;
	// Speicher-Zeile (manuell um die onclick-routine zuzuweisen)
	NeuZeile = NeuesElement("tr", "");
	NeuZelle = NeuesElement("th", "", "colspan", "2");
	var NeuBtn = NeuesElement("input", "", "type", "button", "value", "Spremiti");
	NeuBtn.addEventListener("click", Speichere, true);
	NeuZelle.appendChild(NeuBtn);
	NeuZeile.appendChild(NeuZelle);
	NeuTab.appendChild(NeuZeile);
	// Tabelle einbauen
	Body.appendChild(NeuTab);
	
	// Lizenz-Tabelle, falls eine Version bekannt ist
	if (GM_getValue("version", 0)) {
		Body.appendChild(document.createElement("br"));
		Body.appendChild(document.createElement("br"));
		NeuTab = NeuesElement("table", "", "align", "center", "width", "519");
    Code = '<tr><td class="c" colspan="2">OGame-Skript-Lizenz</td></tr>';
		Code += '<tr><th style="text-align:left">OGame-Skript '+GM_getValue("version", "1.0")+', eine Greasemonkey-Userscript, das OGame um einige, nützliche Funktionen erweitert.<br />Copyright (C) 2006 Windows-zerstoerer, ab 2007 Eleria &amp; Co (siehe <a href="http://board.ogame.de/thread.php?goto=lastpost&threadid=435082" target="_blank">Thread im OGame-Forum</a>)</th></tr>';
		Code += '<tr><th style="text-align:left">Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben und/oder modifizieren, gemäß Version 2 der Lizenz.</th></tr>';
		Code += '<tr><th style="text-align:left"><center><b>Translated by DanXo</b></center></th></tr>';
		Code += '<tr><th style="text-align:left">Für weitere Details, schaue dir die volle GPL im Internet an: <a href="http://www.gnu.org/licenses/gpl.html" target="_blank">http://www.gnu.org/licenses/gpl.html</a><br />Auf deutsch: <a href="http://www.gnu.de/gpl-ger.html" target="_blank">http://www.gnu.de/gpl-ger.html</a><br />Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.</th></tr>';
		NeuTab.innerHTML = Code;
		Body.appendChild(NeuTab);
	}
}
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// Skin erweitern
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var CSSStr = 'table {empty-cells:show; }';
if (Datei == "phalanx")
	CSSStr += 'a[title]:after { content:" ("attr(title)")"; color:aqua; }'; // Schiffe in der Phalanx anzeigen
if (Datei == "flotten1" && LadeAccEinst("schiffs_geschw", Default_SchiffsGeschw)) {
	CSSStr += 'a.geschw_anzeige:after { content:" ("attr(title)")"; color:aqua; }'; // schiffsgeschwindigkeiten anzeigen
}
if (Datei == "messages" || Datei == "flotten1") { // Tabellen breiter machen
	CSSStr += 'table[width="519"] { width:'+TabBreite(800, 519)+'px; }'; // relative Angaben klappen z.B. beim Nachrichtenmenue nicht, da dort die Tabelle in einer anderen Tabelle liegt und diese die Tendenz hat, moeglichst klein zu werden - daher wird die Nachrichtentabelle das bei relativen Angaben auch.
}
else if (Datei == "options") { // Tabellen breiter machen
	CSSStr += 'table[width="519"] { width:'+TabBreite(650, 519)+'px; }';
}
else if (Datei == "resources") { // Tabellen breiter machen
  CSSStr += 'table[width="500"] { width:'+TabBreite(550, 500)+'px; }';
}
else if (Datei == "overview") { // Tabellen breiter machen
  CSSStr += 'table[width="519"] { width:'+TabBreite(1000, 519)+'px; }';
  // Planibilder zentrieren
  var Tabs = FindeXPath('//th[@class="s"]/table[@align="top"]');
  if (Tabs.length) Tabs[0].align = "center";
}
else if (Datei == "galaxy") { // Tabellen breiter machen
	CSSStr += 'table[width="569"] { width:'+TabBreite(700, 569)+'px; }';
}
if (Datei == "messages") {
	// Spioberichte zentrieren
  var Tabs = FindeXPath('//table[@width=400]');
  for (var i = 0; i < Tabs.length; ++i) Tabs[i].align = "center";
}
if (Datei == "overview" && LadeAccEinst("flotten_faerben", Default_FlottenFaerben)) { // Flotten in der Uebersicht umfaerben
	// Stationierende und Transportierende Flotten
	CSSStr += '.flight span.owntransport, .flight span.owndeploy, span.transport { color:#0FF00; }'; // Hinflug
	CSSStr += '.flight span.owntransport a + a + a[title]:after, .flight span.owndeploy a + a + a[title]:after { content:" ("attr(title)")"; color: 00FF00; }'; // Ladung beim Hinflug
	CSSStr += '.return span.owntransport { color:#009900; }'; // Rueckflug
	CSSStr += '.return span.owntransport a + a + a[title]:after { content:" ("attr(title)")"; color:#009900; }'; // Ladung beim Rckflug

	// spionierende Flotten
	CSSStr += '.flight span.espionage { color:#FF0000; }'; // fremde
	CSSStr += '.flight span.ownespionage { color:#FFA500; }'; // Hinflug
	CSSStr += '.return span.ownespionage { color:#b77600; }'; // Rueckflug

	// angreifende und zerstoerende Flotten
	CSSStr += 'span.attack, span.destroy { color:#FF0000; }'; // Fremde
	CSSStr += 'span.attack a[title]:after, span.destroy a[title]:after { content:" ("attr(title)")"; color:#FF0000; }'; // Fremde Zusammensetzung
	CSSStr += '.flight span.ownattack, .flight span.ownfederation, .flight span.owndestroy { color:#AA0000; }'; // eigene Hinflug
	CSSStr += '.flight span.ownattack a[title]:after, .flight span.ownfederation a[title]:after, .flight span.owndestroy a[title]:after { content:" ("attr(title)")"; color:#AA0000; }'; // Hinflug Ladung+Zusammensetzung
	CSSStr += '.return span.ownattack, .return span.ownfederation, .return span.owndestroy { color:#800000; }'; // Rueckflug
	CSSStr += '.return span.ownattack a[title]:after, .return span.ownfederation a[title]:after, .return span.owndestroy a[title]:after { content:" ("attr(title)")"; color:#800000; }'; // Rueckflug Ladung+Zusammensetzung

	// zerstrende Flotten
	CSSStr += 'span.destroy { color:#FF0000; }'; // Fremde

	// Abbauende Flotten
	CSSStr += '.flight span.ownharvest { color:#FFFF00; }'; // Hinflug
	CSSStr += '.flight span.ownharvest a + a + a[title]:after { content:" ("attr(title)")"; color:#FFFF00; }'; // Hinflug Ladung
	CSSStr += '.return span.ownharvest { color:#a8a800; }'; // Rueckkflug
	CSSStr += '.return span.ownharvest a + a + a[title]:after { content:" ("attr(title)")"; color:#a8a800; }'; // Rueckflug Ladung

	// kolonisierende Flotten
	CSSStr += '.flight span.owncolony { color:#19f05b; }'; // Hinflug
	CSSStr += '.return span.owncolony { color:#14b946; }'; // Rueckflug

	// Linkfarben (Hinflug heller, Rueckflug dunkler)
	CSSStr += '.flight a { color:#E6EBFB; }'; // Hinflug
	CSSStr += '.return a { color:#a4a8b3; }'; // Rueckflug
}
if ((Datei == "b_building" || Datei == "buildings") && LadeAccEinst("fehlress_als_text", Default_FehlressText))
	CSSStr += 'a[title]:after { content: " ("attr(title)")"; color:white; }';
GM_addStyle(CSSStr);/* Plugins, die neue Funktionen hinzufügen, hier einfügen */

//-------------------------------------------------------------------------------
};
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
// warten bis eine HP-ID da ist
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
var Versuche = 0;
function kontrolle()
{
	++Versuche;
	if (!HP_ID) { // falls es keine HP-ID gibt, versuche sie zu laden
	  HP_ID = (unsafeWindow.parent.HP_ID ? unsafeWindow.parent.HP_ID : 0); // ID des HPs laden, falls vorhanden
	}

  if (HP_ID) {
  	ogameskript();
  }
  else if (Versuche <= MaxVers) // falls es keine HP-ID gibt und noch nicht genügend Versuche gemacht wurden, nochmal versuchen
  	window.setTimeout(kontrolle, VersWart);
}
//-------------------------------------------------------------------------------
if (PlaniListe)
	HP_ID = PlaniListe[0];
if (HP_ID) { // falls es eine ID gibt, speichere sie
	unsafeWindow.parent.HP_ID = HP_ID;
}
kontrolle(); // Daten kontrollieren und Skript ausführen
})();
//-------------------------------------------------------------------------------
})();