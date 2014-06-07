// ==UserScript==
// @name            OGame-Skript
// @namespace       OGame
// @description     Elargit les fonctions utiles d'OGame
// @author          traduit par Seyguai
// @include         http://s*.gfsrv.net/*
// @include         http://ogame*.de/*
// @include         http://game*.de/*
// @include         http://www.ogame*.de/*
// @include         http://uni*.ogame.*/*
// @include         http://de*.ogame.*/*
// @include         http://*.*.*.*:*/game/*
// @include         http://localhost:*/game/*
// ==/UserScript==
/*
OGame-Skript, ein Greasemonkey-Userscript, das OGame um einige, nuetzliche Funktionen erweitert.
Copyright (C) 2006-2007 Windows-zerstoerer, ab Maerz 2007 Eleria & Co, ab Juli 2007 hakaz & User-Gruppe des OGame-Forums

Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der GNU General Public License, wie von der Free Software Foundation veroeffentlicht, weitergeben und/oder modifizieren, gemaess Version 2 der Lizenz.

Die Veroeffentlichung dieses Programms erfolgt in der Hoffnung, dass es dir von Nutzen sein wird, aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der VERWENDBARKEIT FUeR EINEN BESTIMMTEN ZWECK. Details findest du in der GNU General Public License.

Fuer weitere Details, schaue dir die volle GPL im Internet an: http://www.gnu.org/licenses/gpl.html
Auf deutsch: http://www.gnu.de/gpl-ger.html
Oder schreibe an die Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.
*/
//******************************************************************************************************************************************************
(function ()
{
	if (!((document.URL.indexOf('page=') + 1 && (document.URL.indexOf('session=') + 1 || document.URL.indexOf('xtid') + 1)) || document.URL.indexOf('renameplanet') + 1)) { return; } // Es muesen alle Seiten einen page Eintrag bzw. bis auf "renameplanet" eine SID haben, "ainfo" und "bericht" werden damit ausgeschlossen
//------------
// Grunddaten
//------------
// einige Konstanten
	var SkriptURL = 'http://allianz-sarin.de/Ogamescript/';
	GM_setValue('version', '1.4g_b8');
// ein paar Grundvariablen initialisieren
	var Datei = document.URL.match(/\/game\/index.php\?page=([a-zA-Z0-9_\-\/]+)&/)[1]; // Dateiname der bearbeiteten Datei
	var OGameVersion = '';
//******************************************************************************************************************************************************
//--------------
// OGame-Skript
//--------------
	(function ()
	{
//-------
// Daten
//-------
// einige Konstanten
try{
		var StartZeit = new Date();
		// var RessNamen = new Array('Metall', 'Kristall', 'Deuterium', 'Energie'); // Namen der Ressourcentypen
		var MaxVers = 5; // Maximale Anzahl Versuche, das Skript durchzufuehren
		var VersWart = 2500; // Wartezeit zwischen 2 Versuchen in Millisekunden
		var ZeitDiff = NaN;
// Default-Einstellungen
		var Default_skript_online = true; 
		var Default_colored_ress = true;
		var Default_skin_advance = true;
		var Default_commander = false;
		var Default_merkliste = '';
		var Default_monde_getrennt = false;
		var Default_kein_deut = false;
		var Default_fehlress_als_text = true;
		var Default_flotten_zusatz = true;
		var Default_flotten_faerben = true;
		var Default_owntrancolor = '#00BF00';
		var Default_ownstatcolor = '#7F7F7F';
		var Default_ownaggrcolor = '#00BFFF';
		var Default_ownspiocolor = '#FFBF00';
		var Default_ownharvcolor = '#7FBF7F';
		var Default_owncolocolor = '#7F7FBF';
		var Default_forpeaccolor = '#FF7F7F';
		var Default_foraggrcolor = '#FF0000';
		var Default_color_met = 	'#FF8800';
		var Default_color_kris = 	'#55B4DD';
		var Default_color_deut = 	'#99ABCC';
		var Default_color_eng = 	'#F0D899';
		var Default_max_tab_breite = 520;
		var Default_skriptcolor = '#999900';
		var Default_tf_limit = 5000;
		var Default_platz_anzeige = true;
		var Default_tausenderpkt = true;
		var Default_endzeiten = false;
		var Default_zeit_links = false;
		var Default_ang_zeit = true;
		var Default_ankft_zeit = true;
		var Default_schiffs_geschw = true;
		var Default_fltmenu_buttons = true;
		var Default_auto_auftrag = true;
		var Default_keine_planinamen = false;
		var Default_hp_oben = true;
		var Default_stationieren_vorz = false;
		var Default_planiliste_aend = true;
		var Default_allyplatz_anzeige = true;
		var Default_show_punkte_diff = false;
		var Default_bewegteress = true;
		var Default_spio = true;
		var Default_smallbuildings = false;
		var Default_small_faerben = true;
		var Default_smallbcolor = '#000000';
		var Default_smallbbcolor = '#453E25';
		var Default_smallpx = '60';
		var Default_smallweg = false;
		var Default_transbuild = true;
		var Default_allyforum = '';
		var Default_calc = ''; // ogame rechner
		var Default_galatool = ''; // galaxytool
		var Default_exstats = ''; // exstats
		var Default_savekb =''; // savekb
		var Default_pranger = true;
		var Default_warnung = false;
		var Default_kursmet = '3';
		var Default_kurskris = '2';
		var Default_kursdeut = '1';
		var Default_handelsrechner = true;
		var Default_imperium_calc_resis = true;
		var Default_left_menu_fix = false;
		var Default_ml_sort = true;
		var Default_ml_typ = '3';
		var Default_ml_art = '0';
		var MLTyp = new Array('Coord', 'Nom', 'Statut', 'Points', 'Adhésion', 'Online');
		var MLArt = new Array('décroissant', 'croissant');
// Plani-Typen (entsprechen den IDs in OGame)
		var Typ_Plani = 1;
//		var Typ_TF = 2; // (noch) nicht verwendet
		var Typ_Mond = 3;
// Daten laden
		var Server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
		var SID = document.URL.search('session=') + 1 ? document.URL.match(/(session=[0-9a-zA-Z]+)/) : 'xtid'; // Session-ID des Users
		SID = SID ? SID[1] : ''; // falls es eine gibt, speichern
		var PHPSIDStr = document.URL.match(/PHPSESSID=([0-9a-zA-Z]+)/);
		PHPSIDStr = PHPSIDStr ? '&PHPSESSID=' + PHPSIDStr[1] : '';
// wird noch geladen
		var HP_ID = 0; // zum Speichern der HP-ID
		var PlaniListe = 0, Planis = 0; // zum Speichern der Planiliste
		var DefPlani = 0, AktPlani = 0;
		var HatCommander = Default_commander;
		var TextCol = Default_skriptcolor;
//Umlaute
		var ae = '\u00E4';	var oe = '\u00F6';	var ue = '\u00FC';
		var Ae = '\u00C4';	var Oe = '\u00D6';	var Ue = '\u00DC';
		var sz = '\u00DF';
} catch(e) {}
//******************************************************************************************************************************************************
//------------
// Bibliothek
//--------------------------------------------------------
// Laedt ua. die Planiliste und macht die Tausenderpunkte
//--------------------------------------------------------
// kleine Hilfsfunktionen
//------------------------
// Hilfe bei Debugmeldungen
		function debug(meldung)
		{
			alert('Alerte Debug:\n' + meldung);
		}
// Entferne die Tags aus dem Text
		function TagsRaus(Text)
		{
			return String(Text).replace(/<[^<>]*>/g, ''); // Tags entfernen
		}
// Laedt eine Einstellung des aktuellen Accounts
		function LadeAccEinst(Name, Default)
		{
			Default = (Default == undefined) ? eval('Default_' + Name) : Default;
			if (!HP_ID) { return Default; } // falls es nicht bekannt ist, welches der Account ist, den Defaultwert zurueckgeben
			return GM_getValue(Server + '_' + HP_ID + '_' + Name, Default); // Einstellung laden
		}
// Speichert eine Einstellung des aktuellen Accounts
		function SpeichAccEinst(Name, Wert)
		{
			if (!HP_ID) { return; } // falls der Account unbekannt ist, Abbruch
			GM_setValue(Server + '_' + HP_ID + '_' + Name, Wert); // Wert speichern
		}
// XPath Ermittlung
		function FindeXPath(XPath)
		{
			var Wurzel = document;
			if (FindeXPath.arguments.length > 1) // weitere Argumente der Funktion
			{
				Wurzel = FindeXPath.arguments[1];
			}
			var Erg = document.evaluate(XPath, Wurzel, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			var Arr = new Array();
			var AktKnoten = Erg.iterateNext();
			while (AktKnoten)
			{
				Arr[Arr.length] = AktKnoten;
				AktKnoten = Erg.iterateNext();
			}
			return Arr;
		}
		try{
			var vBody = FindeXPath('//body');
			if (vBody.length)
			{
				vBody[0].style.overflow = "visible";
			}
		} catch(e) {}
//Ausschaltfunktion
		try{
			function turnoff()
			{
				var vCheck = document.getElementById('skript_online').checked;
				GM_setValue('skript_online',vCheck);
				(vCheck) ? alert("Script Activé") : alert("Script Désactivé");
				location.reload();
			}
			unsafeWindow.turnoff = turnoff;
			var vMenu = FindeXPath('//div[@id="menu"]/table/tbody')[0]; 
			if (vMenu)
			{
				var code = '';
					code += '<tr><td><div align="center" style="font-size: 10px;">OGameSkript Activé <input id="skript_online" onchange="turnoff()" type="checkbox" '
				if (GM_getValue('skript_online',Default_skript_online)) { code += 'checked'; }
					code += '></td></div></tr>';
				var vNode = document.createElement('tr');
				var vBr = document.createElement('br');
					vNode.innerHTML = code;
					vMenu.appendChild(vBr);
					vMenu.appendChild(vNode);
			}
		}catch(e) {}
// gibt an ob der entsprechende Knoten eine Tabellenzelle ist
		function IstZelle(Kn)
		{
			return (Kn.nodeName == 'TD' || Kn.nodeName == 'TH');
		}
// Verwandelt den uebergebenen Text in eine Ganzzahl
		function InInt(Text)
		{
			Text = TagsRaus(Text).replace(/[^0-9\-]/g, ''); // nicht-Ziffern entfernen
			return parseInt(Text, 10); // als Zahl zurueckgeben
		}
// finde alle Kindknoten dieses Knotens, die diese Bedingung erfuellen, und suche noch KinderEbenen Ebenen tiefer
		function FindeKinder(Knoten, Bedingung, KinderEbenen)
		{
			var Arr = new Array(); // Arry zum Speichern
			if ((typeof Bedingung) != 'function') // falls die Bedingung ein String ist, mache sie zu einer Funktion, die dieses Tag als true nimmt und den Rest als falsch
			{
				Bedingung = new Function('Kn', 'return (Kn.nodeName=="' + Bedingung.toUpperCase() + '");');
			}
			for (var i = 0; i < Knoten.childNodes.length; i++) // ueber alle Kindknoten
			{
				if (Bedingung(Knoten.childNodes[i])) // Bedingung testen
				{
					Arr[Arr.length] = Knoten.childNodes[i]; // falls positiv, speichern
				}
				if (KinderEbenen) // falls ueberhaupt Unterebenen getestet werden sollen
				{
					Arr = Arr.concat(FindeKinder(Knoten.childNodes[i], Bedingung, KinderEbenen - 1)); // eine Ebene tiefer, daher eine weniger testen
				}
			}
			return Arr; // Knoten zurueckgeben
		}
// erstellt ein neues Tag
		function NeuesElement(Tag, Inhalt)
		{
			var Neu = document.createElement(Tag); // erste Zelle (Titel)
			if (Inhalt.indexOf('<') + 1 || Inhalt.indexOf('&') + 1) // falls Tags oder &;-Umschreibungen im Text sind
			{
				Neu.innerHTML = Inhalt; // Text als HTML-Code
			}
			else
			{
				if (Inhalt.length > 0) // ansonsten, und falls es ueberhaupt einen Text gibt
				{
					Neu.appendChild(document.createTextNode(Inhalt)); // Text als Attribut
				}
			}
			if (NeuesElement.arguments.length > 2) // weitere Argumente der Funktion
			{
				for (var i = 2; i < NeuesElement.arguments.length - 1; i += 2) // alle diese Argumente
				{
					if (!NeuesElement.arguments[i + 1].length) { continue; }
					Neu.setAttribute(NeuesElement.arguments[i], NeuesElement.arguments[i + 1]); // dem Tag zuweisen
				}
			}
			return Neu; // zurueckgeben
		}
// Berechnet den Stromverbrauch/Stromproduktion des Gebaeudes ID (1=Met, 2=Kris, 3=Deut, 4=Soli, 12=Fusi) auf der angegeben Stufe
		function Energie(ID, Stufe)
		{
			var Faktor = (ID == 1 || ID == 2) ? 10 : ((ID == 3 || ID == 4) ? 20 : ((ID == 12) ? 50 : 0));
			return Math.floor(Faktor * Stufe * Math.pow(1.1, Stufe)); // Energieverbrauchs-Formel
		}
// Berechnet die Baukosten eines Gebaeudes der angegeben Stufe auf Basis der Grundkosten und des Exponentialfaktors
		function Kosten(GSMet, GSKris, GSDeut, Faktor, Stufe)
		{
			var Baukosten = new Array(Math.floor(GSMet * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSKris * Math.pow(Faktor, (Stufe - 1)), 0), Math.floor(GSDeut * Math.pow(Faktor, (Stufe - 1)), 0)); // Kosten-Formel
			return Baukosten;
		}
// Farbumwandlung Hex->RGB mit Korrekturberechnung
		function ColorConv(colhex, lum, hlt)
		{
			if (colhex.match(/#[0-9A-Fa-f]/))
			{
				var c = new Array(3);
				lum = (lum) ? 1 : .66;
				hlt = (hlt == 1) ? 192 : ((hlt == 2) ? 128 : 0);
				for (var i = 0; i < 3; i++)
				{
					c[i] = colhex.substr((i * 2 + 1), 2);
					c[i] = (c[i]) ? c[i] : 0;
					c[i] = parseInt(c[i], 16) + hlt;
					c[i] = parseInt(((parseInt(c[i] / 255)) ? 255 : c[i]) * lum);
				}
				colhex = 'rgb(' + c[0] + ', ' + c[1] + ', ' + c[2] + ')';
			}
			else
			{
				colhex = 0;
			}
			return colhex;
		}
// Farbpruefung ob gueltiger Wert
		function ColorChk(colnam)
		{
			if (!(ColorConv(colnam)))
			{
				var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow');
				var colval = new Array ('00FFFF', '000000', '0000FF', 'FF00FF', '808080', '008000', '00FF00', '800000', '000080', '808000', '800080', 'FF0000', 'C0C0C0', '008080', 'FFFFFF', 'FFFF00');
				var colchk = '';
				for (var i = 0; i < 16; i++)
				{
					colchk += (colnam.toLowerCase() == colids[i]) ? colval[i] : '';
				}
				colnam = (colchk.length) ? '#' + colchk : '#7F7F7F';
			}
			return colnam.substr(0, 7).toUpperCase();
		}
// Dropdownmenue fuer Farbwahl in Einstellungen
		function AddColorSel(colnam)
		{
			var colids = new Array ('aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'white', 'yellow');
			var defcol = eval('Default_' + colnam);
			var curcol = LadeAccEinst(colnam);
			var colchk = '<br>(p-e red, white, #FFCC00, ...)&nbsp;&nbsp;&nbsp;&nbsp;<select style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" id="' + colnam + 'col" ';
			colchk += 'onchange="javascript: document.getElementById(\'' + colnam + '\').value = document.getElementById(\'' + colnam + 'col\').value; document.getElementById(\'' + colnam + 'col\').style.color = (document.getElementById(\'' + colnam + 'col\').value != \'transparent\') ? document.getElementById(\'' + colnam + 'col\').value : \'#3F3F3F\';">';
			colchk += '<option style="color:' + ((curcol != 'transparent') ? curcol : '#3F3F3F') + ';" value="' + curcol + '">Couleur</option>';
			for (var i = 0; i < 16; i++)
			{
				colchk += '<option style="color:' + colids[i] + '; background-color:#3F3F3F;" value ="' + colids[i] + '">' + colids[i] + '</option>';
			}
			if (colnam.substr(0, 5).match(/small/))
			{
				colchk += '<option style="color:#3F3F3F; background-color:#7F7F7F;" value ="transparent">transparent</option>';
			}
			colchk += '<option style="color:' + defcol + ';" value ="' + defcol + '">Défaut</option>';
			return colchk + '</select>';
		}
// Finde den Plani mit diesen Koords
		function FindePlaniMitKoords(Planis, Gala, Sys, Pos)
		{
			var i = 1;
			if (FindePlaniMitKoords.arguments.length > 4) { i = FindePlaniMitKoords.arguments[4]; }
			for (; i < Planis.length; i++) // alle Planis durchgehen
			{
				if (Planis[i]['Gala'] == Gala && Planis[i]['Sys'] == Sys && Planis[i]['Pos'] == Pos) { return Planis[i]; } // falls die Koords stimmen, Plani zurueckgeben
			}
			return 0; // nichts zurueckgeben
		}
// Finde den Plani mit dieser ID
		function FindePlaniMitID(Planis, ID)
		{
			for (var i = 1; i < Planis.length; i++) // alle Planis durchgehen
			{
				if (Planis[i]['ID'] == ID) { return Planis[i]; } // falls die ID stimmt, zurueckgeben
			}
			return 0; // nichts zurueckgeben
		}
// fuege des neue Element hinter dem anderen ein
		function EinfuegenHinter(Neu, Hinter)
		{
			Hinter.parentNode.insertBefore(Neu, Hinter.nextSibling); // Element einfuegen
			return Neu; // Element zurueckgeben
		}
// gibt die Y-Koordinate des angegebenen Elemnts zurueck
//		function GetY(element)
//		{
//			return element.offsetTop + ((element.nodeName == 'BODY') ? 0 : GetY(element.offsetParent)); // aktueller offset + den des Vorgaengers, falls wir nicht schon beim Body-Tag sind
//		}
// Eine Zahl zweistellig darstellen
		function Zweistellig(Zahl)
		{
			var Str = String((Zahl > 0) ? Zahl : 0); // Zahl in String verwandeln
			if (Str.length == 1) { Str = '0' + Str; } // falls dieser nur eine Stelle hat, eine 0 davorsetzen
			return Str; // Ergebnis zurueckgeben
		}
// Loesche dieses Element
		function Loesche(element)
		{
			element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
		}
// formatiere die uebergebene Zeit als Langdatum
		function ZeitFormatieren(Zeit)
		{
			var Wochentage = new Array('Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'); // Namen der Wochentage
			var Monate = new Array('Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'); // Namen der Monate
			return Wochentage[Zeit.getDay()] + ' ' + Zeit.getDate() + ' ' + Monate[Zeit.getMonth()] + ' ' + Zeit.getHours() + ':' + Zweistellig(Zeit.getMinutes()) + ':' + Zweistellig(Zeit.getSeconds()); // Ausgabestring formatieren
		}
// Zeitstring auslesen und als Zahl formatiert zurueckgeben
		function LeseZeit(Str)
		{
			var Monate = new Array();
			Monate['Jan'] = 0; Monate['Feb'] = 1; Monate['Mar'] = 2; Monate['Apr'] = 3; Monate['May'] = 4; Monate['Jun'] = 5; Monate['Jul'] = 6; Monate['Aug'] = 7; Monate['Sep'] = 8; Monate['Oct'] = 9; Monate['Nov'] = 10; Monate['Dec'] = 11;
			var ZeitStr = Str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
			var Zeit = new Date(); // das ist noetig
			Zeit = new Date(Zeit.getYear() + 1900, Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
			return Zeit;
		}
// Schneide Leerzeichen vor/nach dem String weg
		function Trim(Str)
		{
			while (Str.substring(0, 1) == ' ')
			{
				Str = Str.substring(1, Str.length);
			}
			while (Str.substring(Str.length - 1, Str.length) == ' ')
			{
				Str = Str.substring(0, Str.length - 1);
			}
			return Str;
		}
// Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
		function HoleRessourcen() // Finde heraus, wieviele Ressourcen welchen Typs der Spieler hat
		{
			var Zellen = FindeXPath('//table[@id="resources"]/tbody/tr[3]/td');
			var Arr = new Array(); // zum Speichern der Zahlen
			for (var i = 0; i < 3; i++) // Zellen 0-2
			{
				Arr[i] = InInt(Zellen[i].innerHTML); // Inhalt in Ganzzahl verwandeln und speichern
			}
			var Werte = TagsRaus(Zellen[3].innerHTML).split('/'); // die Energie an dem / trennen
			Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fuer die Gebaeude und Forschungen benoetigt wird
			Arr[3] = InInt(Werte[1]);
			return Arr; // Zahlen zurueckgeben
		}
/*
Eine Plani-Liste hat folgendes Format:
Das Element 0 enthaelt die ID des HPs
Alle weiteren Elemente sind die Planeten und Monde des Spielers, aufgelistet in der Reihenfolge der Planiliste
Jeder Planet hat folgende Eigenschaften:
	Nr: Seine Nummer im Aray (PlaniListe[Plani['Nr']] == Plani)
	Name: Sein Name
	Gala, Sys, Pos: Seine Position (Gala:Sys:Pos)
	Koords: Die Position als Text
	ID: Seine ID
	URL: Die Url, die aufgerufen wird, um zu ihm zu wechseln
	Aktiv: Gibt an ob der Plani der aktivierte ist
	Partner: Immer 0 (wird spaeter verwendet)
*/
		function HolePlaniListe()
		{
			var PlaniNamen =  document.getElementsByTagName('select');
			if (!PlaniNamen.length) { return 0; } // falls keine Planiliste gefunden wurde, abbruch
			PlaniNamen = PlaniNamen[0].options;
			var PlaniListe = new Array(); // Array zur Speicherung der Planis, das erste Element speichert die kleinste ID (also die des HP)
			PlaniListe[0] = 0;
			for (var i = 0; i < PlaniNamen.length; i++) // Ueber alle Planis des Spielers
			{
// Daten extrahieren
				if (!(PlaniNamen[i].value.indexOf('/game/') + 1 )) { return 0; } // falls dies kein Teil des Planinamens ist, Abbruch
				var Daten = PlaniNamen[i].firstChild.nodeValue.match(/([a-zA-Z0-9 \.\-\_\(\)]+)				  \[([0-9]{1,2}):([0-9]{1,3}):([0-9]{1,2})\]/); // Name und Koords rausfinden, sie stehen im angezeigten Text
				if (!Daten) { continue; }
				var ID = PlaniNamen[i].value.match(/cp=([0-9]+)/); // Plani-ID rausfinden
				if (!ID) { continue; }
// Daten speichern
				Plani = new Array();
				Plani['Nr'] = PlaniListe.length;
				Plani['Name'] = Daten[1];
				Plani['Gala'] = parseInt(Daten[2], 10);
				Plani['Sys'] = parseInt(Daten[3], 10);
				Plani['Pos'] = parseInt(Daten[4], 10);
				Plani['Koords'] = Plani['Gala'] + ':' + Plani['Sys'] + ':' + Plani['Pos'];
				Plani['ID'] = parseInt(ID[1], 10);
				Plani['URL'] = PlaniNamen[i].value;
				Plani['Aktiv'] = (PlaniNamen[i].selected == true);
				Plani['Partner'] = 0;
// die kleinste ID ermitteln
				if (!PlaniListe[0] || PlaniListe[0] > Plani['ID']) { PlaniListe[0] = Plani['ID']; }
// Plani hinzufuegen
				PlaniListe[PlaniListe.length] = Plani;
			}
			return PlaniListe; // Liste der Planis zurueckgeben
		}
/*
Die erweiterte Plani-Liste des ersten Durchlaufs fuegt folgende Eigenschaften zu den Planis hinzu:
	Partner: 0 wenn der Plani keinen Partner hat (der Partner eines Mondes ist der Plani auf denselben Koords, der Partner eines Plansis der dazugehoerige Mond), ansonsten die Nummer des Partners
	HP: Gibt an, ob der Plani der HP ist
	Typ: Ist gleich Typ_Plani, wenn es sich um einen Plani handelt, und gleich Typ_Mond, wenn es ein Mond ist
*/
		function LadePlanis(PlaniListe)
		{
// Im ersten Durchlauf werden die Partnerplanis gefunden und ihre Typen (Plani oder Mond) gespeichert und die Nummer des HPs rausgefunden
			var HP_Nummer = 0;
			for (var i = 1; i < PlaniListe.length; i++)
			{
				var Plani = PlaniListe[i];
				Plani['HP'] = (Plani['ID'] == PlaniListe[0]);
				if (Plani['HP']) { HP_Nummer = i; }
				if (Plani['Partner']) { continue; } // dieser Plani hat schon einen Partner
				var Partner = FindePlaniMitKoords(PlaniListe, Plani['Gala'], Plani['Sys'], Plani['Pos'], i + 1); // nur hinter dem aktuellen Plani suchen
				if (!Partner)
				{
					Plani['Typ'] = Typ_Plani; // Planis ohne Partner koennen keine Monde sein
					continue; // kein Partner gefunden
				}
// Die Nummern speichern
				Plani['Partner'] = Partner['Nr'];
				Partner['Partner'] = Plani['Nr'];
// anhand der IDs die Typen bestimmen
				if (Partner['ID'] > Plani['ID'])
				{
					Partner['Typ'] = Typ_Mond;
					Plani['Typ'] = Typ_Plani;
				}
				else
				{
					Partner['Typ'] = Typ_Plani;
					Plani['Typ'] = Typ_Mond;
				}
			}
			if (!HP_Nummer) { return 0; }

/*
Die sortierte Plani-Liste des zweiten Durchlaufs aendert das Element 0 der Liste, ihre Reihenfolge und fuegt eine Eigenschaft hinzu
Der HP wird falls gewuenscht an den Anfang gesetzt, und alle Monde werden direkt hinter ihren Plani gesetzt
Das Element 0 enthaeklt folgende Eigenschaften:
	HP: Nummer des HPs
	Aktiv: Nummer des aktven Planis
Die den Planis hinzugefuegte Eigenschaft ist
	Text: Speichert den in der Auswahlliste anzuzeigenen Text entsprechend der Einstellungen (ohne Einrueckung der Monde)
*/
// im zweiten Durchlauf werden die Liste umsortiert (HP an den Anfang, Monde zu den Planis) und die Namen angepasst
			var HPNachOben = LadeAccEinst('hp_oben');
			var KeinePlaniNamen = LadeAccEinst('keine_planinamen');
			var Planis = new Array(new Array()); // das erste Element speichert die Nummer des HPs und des aktiven Planis
			Planis[0]['HP'] = HP_Nummer;
// Hilfsfunktion zum Hinzufuegen eines Planis samt Mond
			function FuegeHinzu(Plani)
			{
				if (Plani['Typ'] != Typ_Plani) { return; }
// Eigenschaften des Planis anpassen
				Plani['Nr'] = Planis.length;
				if (Plani['Aktiv']) { Planis[0]['Aktiv'] = Plani['Nr']; }
// Text bestimmen
				if (KeinePlaniNamen) // nur die Koords als Text
				{
					Plani['Text'] = Plani['Koords'];
				}
				else // der Text besteht aus Name und Koords
				{
					Plani['Text'] = Plani['Name'] + ' [' + Plani['Koords'] + ']';
				}
// Plani speichern
				Planis[Planis.length] = Plani;
				if (Plani['Partner']) // falls der Plani einen Partner hat (das muss ein Mond sein, da der Plani selbst kein Mond sein kann)
				{
					var Partner = PlaniListe[Plani['Partner']];
// Eigenschaften des Partner anpassen
					Partner['Nr'] = Planis.length;
					Partner['Partner'] = Plani['Nr'];
					Plani['Partner'] = Partner['Nr'];
					if (Partner['Aktiv']) { Planis[0]['Aktiv'] = Partner['Nr']; }
// Den Namen korrigieren (das " (Mond)" am Ende wegmachen)
					var Name = Partner['Name'].match(/([a-zA-Z0-9 \.\-\_\(\)]+)( \([A-Za-z]+\))/);
					if (Name) { Partner['Name'] = Name[1]; }
// Text bestimmen
					if (KeinePlaniNamen) // nur die Koords als Text
					{
						Partner['Text'] = Partner['Koords'] + ' (L)';
					}
					else // der Text besteht aus Name und Koords
					{
						Partner['Text'] = Partner['Name'] + ' [' + Partner['Koords'] + ']';
					}
// Plani speichern
					Planis[Planis.length] = Partner;
				}
			}
			if (HPNachOben) { FuegeHinzu(PlaniListe[HP_Nummer]); }
			for (var i = 1; i < PlaniListe.length; i++)
			{
				var Plani = PlaniListe[i];
				if (HPNachOben && Plani['HP']) { continue; } // es werden nur Planis behandelt, und falls der HP an den Anfang kommt wird er uebersprungen
				FuegeHinzu(Plani);
			}
			return Planis;
		}
// Breite einer Tabelle anhand der Einstellungen etc. berechnen
		function TabBreite(Max, Min)
		{
			return Math.max(Math.min(Math.min(LadeAccEinst('max_tab_breite'), Max), document.body.clientWidth-10), Min);
		}
// Differenz Serverzeit <-> lokale Zeit bestimmen
		function LeseZeitDiff()
		{
			var ZeitZelle = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
			var ServerZeit = LeseZeit(ZeitZelle.firstChild.nodeValue);
			return (StartZeit - ServerZeit);
		}
// Aktuelle Lokalzeit bestimmen
		function GetAktZeit()
		{
			if (!isNaN(ZeitDiff))
			{
				return new Date(new Date().getTime() - ZeitDiff);
			}
		}
// Tausenderpunkte
		function TausenderZahl(z)
		{
			z = String(Number(z));
			var i = z.length % 3;
			if (!i) { i = 3; }
			var erg = z.substr(0, i);
			for (; i < z.length; i += 3)
			{
				erg += '.' + z.substr(i, 3);
			}
			return erg;
		}
// Zahl mit Tausenderpunkten als String formatieren
		function TausenderString(s)
		{
			if (s.length < 4) { return s; } // da gibts ohnehnin keine Tausenderpunkte
			var erg = '', zahl = ''; // das Ergbenis; die zwischengespeicherte Zahl
			var akt = '', vor = ''; // das aktuelle und das vorherige Zeichen
			var i = -1;
			while (i++ < s.length) // ueber alle Zeichen
			{
				akt = s.charAt(i);
				if (akt.match(/[\d]/)) // wenn es eine Zahl ist
				{
					zahl = akt;
					while (i++ < s.length && s.charAt(i).match(/[\d]/))
					{
						zahl += s.charAt(i); // die Zahl zusammensetzen
					}
					akt = (i == s.length) ? 0 : s.charAt(i); // das Zeichen nach der Zahl ist jetzt aktuell
					if (zahl.length < 4 || isNaN(vor) || isNaN(akt))
					{
						erg += zahl; // zu kleine Zahlen oder solche, die nach einen Punkt oder vor einem - kommen, werden uebernommen wie sie sind. Auch Buchstaben duerfen nicht direkt davor oder dahinter sein
					}
					else
					{
						erg += TausenderZahl(zahl); // die anderen bekommen Tausenderpunkte
					}
					if (!akt) { break; } // Ende des Strings? fertig!
				}
				erg += (vor = akt); // aktuelles Zeichen anhaengen und speichern
			}
			return erg;
		}
// Arrays zum Speichern der Ausdruecke und dessen, womit die ersetzt werden, sowie wie lange Zahlen ersetzt werden (max. [AnzAusdr+1]*3 Ziffern)
		var AusdrArr = 0, ErsArr = 0, AnzAusdr = 2;
// Fuelle die Arrays mit Ausdruecken
		function FuelleAusdrArrays()
		{
			AusdrArr = new Array();
			ErsArr = new Array();
			var B = '[ \(\)\.\:\+_,\\s]';
			for (var i = 0; i < AnzAusdr; i++) // soviele Ausdruecke, wie gewuenscht
			{
				AusdrArr[i] = '(' + B + '\\d{1,3})'; // Anfang des Ausdrucks/
				ErsArr[i] = '$1'; // der Ersetzung
				for (var j = 0; j < i; j++) // Zwischenteil
				{
					AusdrArr[i] += '(\\d{3})';
					ErsArr[i] += '.$' + (j + 2);
				}
				AusdrArr[i] += '(\\d{3}k?' + B + ')'; // Ende
				ErsArr[i] += '.$' + (i + 2);
			}
		}
// Punkte in Zahlen von Arrays einfuegen
		function Tausenderpunkte(s)
		{
			if (!AusdrArr || !ErsArr) { FuelleAusdrArrays(); } // beim ersten Start Arrays erzeugen
			s = String(s);
			if (Datei == 'bericht') { s = s.replace(/^(\d+)\.(\d+)$/g, '$1,$2'); } // bei KBs: vorhandene Trennpunkte in Kommas umwandeln
			if (!(s.search(/[0-9]{4}/) + 1)) { return s; } // Es muss min. eine vierstellige Zahl vorkommen
			s = ' ' + s + ' ';  // Mit Leerzeichen, damit die Anfang-und-Ende-Erkennung klappt
			for (var i = AnzAusdr - 1; i >= 0; i--) // fuer alle Ausdruecke, und zwar von hinten nach vorne, lange Zahlen zuerst
			{
				s = s.replace(new RegExp(AusdrArr[i], 'g'), ErsArr[i]); // diesen Ausdruck anwenden
			}
			return s.substr(1, s.length - 2); // Leerzeichen wieder rausschneiden
		}
// Korrigiere in uebergebenen Knoten die Punkte
		function PunkteKorrekturHF(Knoten)
		{
			if (Knoten.nodeType == 3 && Knoten.nodeValue.length >= 4)
			{
				Knoten.nodeValue = Tausenderpunkte(Knoten.nodeValue); // bei Textknoten: Punkte im Text einfuegen
			}
			return false; // nicht speichern
		}
// Uhrzeiten von Ankuenften und Fertigstellungen berechnen, original von xsign.dll
		function aTimeStamp(d, h, m, s)
		{
			if (!LadeAccEinst('endzeiten')) { return ''; }
			var zus = '<br /><font color="' + TextCol + '">';
			var now = GetAktZeit();
			var fin = Date.parse(now) + (d * 86400 + h * 3600 + m * 60 + s) * 1000 + ZeitDiff;
			var ats = new Date(fin);
			var aday = ats.getDate();
			zus += (aday != now.getDate()) ? aday + '.' + (ats.getMonth() + 1) : '&nbsp;';
			var ah = ats.getHours();
			var am = ats.getMinutes();
			var as = ats.getSeconds();
			if (ah < 10) { ah = '0' + ah }
			if (am < 10) { am = '0' + am }
			if (as < 10) { as = '0' + as }
			zus += '<br />' + ah + ':' + am + ':' + as + '</font>';
			return zus;
		}
//******************************************************************************************************************************************************
//---------------------------
// eigentliches OGame-skript
//---------------------------
		function ogameskript()
		{
//------------------
// allgemeines Zeug
//------------------
// Ersatz fuer fruehere Body Var
			var ContDiv = FindeXPath('//div[@id="content"]')[0];
// oGame v0.77 content fix (original by xsign.dll) + leftmenu fix
			ContDiv.style.position = "relative";
			ContDiv.style.overflow = "visible";
			var LeftDiv = FindeXPath('//div[@id="menu"]')[0];
			LeftDiv.style.position = (LadeAccEinst('left_menu_fix')) ? "fixed" : "absolute";
			LeftDiv.style.overflow = "visible";
// Loeschen von <br><br><br><br> im oGame v0.77b Design, geht nicht ueber DOM wegen Formdaten
			var ContDivBr = FindeXPath('//div[@id="content"]/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/form/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
// Textfarbe der eingefuegten Skripterweiterungen laden
			TextCol = LadeAccEinst('skriptcolor');
// Zeitdifferenz bestimmen
			if (Datei == 'overview') { ZeitDiff = LeseZeitDiff(); }
// Zeitdifferenz speichern/laden
			if (!isNaN(ZeitDiff))
			{
				SpeichAccEinst('zeit_diff', ZeitDiff);
			}
			else
			{
				ZeitDiff = LadeAccEinst('zeit_diff', ZeitDiff);
			}
// Tausenderpunkte im gesamten HTML-Dokument einfuegen mit Ausnahme Allianzseite
			if (LadeAccEinst('tausenderpkt') && Datei != 'allianzen')
			{
				FindeKinder(document.getElementsByTagName('body')[0], PunkteKorrekturHF, -1);
			}
// das Skript kann beginnen - in der Navi wird die Versionsnummer angezeigt
			document.getElementById('ogameskript_version').firstChild.nodeValue = 'v' + GM_getValue('version', '?...');
//-----
// GPL
//-----
			if (!LadeAccEinst('gpl', 0) && GM_getValue('version', 0))
			{
				alert('OGame-Skript v' + GM_getValue('version', '1.0') + ', Copyright (C) 2006-2007 Windows, depuis Mars 2007 Eleria & Co, depuis Juillet 2007 hakaz & Utilisateurs des Forums Ogame\nOGame-Skript ne fournit AUCUNE GARANTIE. OGame-Skript est un logiciel libre que vous pouvez transmettre sous les conditions déterminées. De plus amples détails peuvent être trouvés sur le site OGame-Skript, depuis le menu de gauche. En utilisant ce script, vous acceptez la licence GPL.');
				SpeichAccEinst('gpl', 1);
			}
//----------------------------------------
// Planiliste und Planiauswahl bearbeiten
//----------------------------------------
// falls das Plani-Array gueltig ist - in diesem Fall gibt es eine Auswahlliste
			if (PlaniListe)
			{
				Planis = LadePlanis(PlaniListe);
				if (!Planis) { return; } // eigentlich kann das garnicht passieren, aber man weiss ja nie
				AktPlani = Planis[Planis[0]['Aktiv']];
				DefPlani = FindePlaniMitID(Planis, LadeAccEinst('def_plani', HP_ID));
				if (LadeAccEinst('planiliste_aend'))
				{
// fuegt Schalter rund um das Planimenue ein
						var AktNr = Planis[0]['Aktiv'];
						var AufMond = (AktPlani['Typ'] == Typ_Mond);
						var Select = document.getElementsByTagName('select')[0]; // das Dropdown-Menue zur Planiauswahl - darum kommen die Schalter
						Select.parentNode.style.textAlign = 'center'; // Text zentrieren
						Select.parentNode.style.whiteSpace = 'nowrap'; // kein Zeilenumbruch
					if (AktPlani['Partner']) // bei Planis mit Mond und bei Monden kommt oben noch was daruf
					{
						var Partner = Planis[AktPlani['Partner']];
						Select.parentNode.insertBefore(NeuesElement('a', AufMond ? ('Planète ' + Partner['Name']) : ('Lune ' + Partner['Name']), 'href', Partner['URL']), Select); // Link vor der Dropwdown-Liste einfgen
						Select.parentNode.insertBefore(document.createElement('br'), Select); // Zeilenumbruch vor der Dropwdown-Liste einfgen
					}
					if (!AufMond || (AufMond && LadeAccEinst('monde_getrennt'))) // Monde bekommen nur dann LinksRechts-Schalter wenn sie getrennt dargestellt werden
					{
						var VorhURL = 0, NachURL = 0; // erstmal kein vorheriger/naechster Plani/Mond
// Vorherigen und naechsten Plani desselben Typs finden
						for (var Nr = AktNr - 1; Nr > 0; Nr--)
						{
							if (Planis[Nr]['Typ'] == AktPlani['Typ']) { VorhURL = Planis[Nr]['URL']; break; }
						}
						for (var Nr = AktNr + 1; Nr < Planis.length; Nr++)
						{
							if (Planis[Nr]['Typ'] == AktPlani['Typ']) { NachURL = Planis[Nr]['URL']; break; }
						}
						if (VorhURL)
						{
							Select.parentNode.insertBefore(NeuesElement('a', '&lt;&lt;', 'href', VorhURL), Select); // Link vor der Dropwdown-Liste einfuegen
						}
						if (NachURL)
						{
							EinfuegenHinter(NeuesElement('a', '&gt;&gt;', 'href', NachURL), Select); // Link nach der Dropdown-Liste einfgen
						}
					}
					
// Erstellt das Menue aus der extrahierten Planiliste erneut
						var MondeGetrennt = LadeAccEinst('monde_getrennt');
						while (Select.childNodes.length > 0) { Select.removeChild(Select.childNodes[0]); } // alle Eintraege der Liste entfernen
						for (var i = 1; i < Planis.length; i++) // Ueber alle Planis
						{
							if (MondeGetrennt && Planis[i]['Typ'] != Typ_Plani) { continue; }
							var EintrText = (Planis[i]['Typ'] == Typ_Plani) ? Planis[i]['Text'] : ' - ' + Planis[i]['Text'];
							var Eintrag = NeuesElement('option', EintrText, 'value', Planis[i]['URL']); // Eintrag erzeugen
							if (Planis[i]['Aktiv']) Eintrag.setAttribute('selected', 'selected'); // falls es der aktive Plani ist, markieren
							if (Planis[i]['HP']) Eintrag.style.fontWeight = 'bold'; // den HP fett machen
							Select.appendChild(Eintrag); // Eintrag einfuegen
						}
					if (MondeGetrennt)
					{
// Trenner
							function auswahl(el) // neue Auswahlfunktion, kompatibel mit dem Trenner
							{
								var url = el.options[el.selectedIndex].value;
								if (url.length)	{ location.href = el.options[el.selectedIndex].value; }
							}
							unsafeWindow.haha = auswahl; // vorhandenen Funktion ueberschreiben
							var HabTrenner = false;
// Monde einfuegen
							for (var i = 1; i < Planis.length; i++)  // Ueber alle Planis
							{
								if (Planis[i]['Typ'] != Typ_Mond) { continue; }
								if (!HabTrenner)
								{
									Select.appendChild(NeuesElement('option', ' ', 'value', ''));
									HabTrenner = true;
								}
								var Eintrag = NeuesElement('option', Planis[i]['Text'], 'value', Planis[i]['URL']);
								if (Planis[i]['Aktiv']) { Eintrag.setAttribute('selected', 'selected'); } // falls es der aktive Mond ist, markieren
								Select.appendChild(Eintrag); // Eintrag einfuegen
							}
					}
				}
			}
// Punkte-Differenzen werden in den Statistiken und der Memberliste angezeigt
			function PunkteDiff(page)
			{
				function StatCalc(a)
				{
					var ML_Punkte = FindeXPath('//table/tbody/tr/th[5]');
					for (var i = a; i < ML_Punkte.length; i++)
					{
						testvar = parseInt(ML_Punkte[i].innerHTML.replace(/\./g, ''));
						if(testvar > -1)
						{
							ML_Punkte[i].innerHTML = TausenderZahl(ML_Punkte[i].innerHTML.replace(/\./g, ''));
							if (i < ML_Punkte.length - 1)
							{
								var ML_erster = parseInt(ML_Punkte[i].innerHTML.replace(/\./g, ''), 10);
								var ML_zweiter = parseInt(ML_Punkte[i + 1].innerHTML.replace(/\./g, ''), 10);
								ML_diff = ML_erster - ML_zweiter;
								if (ML_diff >= 0) { var text_plus = '+'; } else { var text_plus = '-'; ML_diff = ML_diff * -1; }
								ML_Punkte[i].innerHTML = TausenderZahl(ML_Punkte[i].innerHTML.replace(/\./g, '')) + '<br><font size="-2"><span style="color:' + TextCol + ';">(' + text_plus + TausenderZahl(ML_diff.toString()) + ')</span></font>';
							}
						}
					}
				}
				switch(page)
				{
					case 'statistik':
					{
						var node = 0;
						var pms = FindeXPath('//table/tbody/tr/th[1]/a/font');
						var pms2 = FindeXPath('//table/tbody/tr/th[1]/a');
						for (var i = 0; i < pms.length; i++)
						{
							pms[i].innerHTML = pms2[i].getAttribute('onmouseover', 0).match(/>(.*)</)[1];
						}
// Punkteunterschied zur eigenen Allianz bzw. zu sich selber
						var statnamen = FindeXPath('//table/tbody/tr/th[2]');
						var eigenepos = NaN;
						for (var i = 0; i < statnamen.length; i++)
						{
							if (statnamen[i].innerHTML.indexOf('lime') + 1) { var eigenepos = i; } // alert(statnamen[i].innerHTML.match(/>(.*?)</)[1]);
						}
						if (!isNaN(eigenepos))
						{
							var eigenepunkte = parseInt(FindeXPath('//table/tbody/tr[' + (eigenepos + 2) + ']/th[5]')[0].innerHTML.replace(/\./g, ''), 10); // //table/tbody/tr[3]/th[5]
							for (var i = 0; i < statnamen.length; i++)
							{
								var statpunkte = parseInt(FindeXPath('//table/tbody/tr[' + (i + 2) + ']/th[5]')[0].innerHTML.replace(/\./g, ''), 10);
								var statpos = FindeXPath('//table/tbody/tr[' + (i + 2) + ']/th[2]');
								if (i < eigenepos)
								{
									var statdiff = statpunkte - eigenepunkte;
									statpos[0].innerHTML = statpos[0].innerHTML + '<br><font size="-2"><span style="color:' + TextCol + ';">(+' + TausenderZahl(statdiff.toString()) + ')</span></font>';
								}
								if (i > eigenepos)
								{
									var statdiff = eigenepunkte - statpunkte;
									statpos[0].innerHTML = statpos[0].innerHTML + '<br><font size="-2"><span style="color:' + TextCol + ';">(-' + TausenderZahl(statdiff.toString()) + ')</span></font>';
								}
							}
						}
					}
					break;
					case 'memberliste':
					{
						var node = 1;
					}
				}
				StatCalc(node);
			}
//--------------------------
// Flottenmenue berarbeiten
//--------------------------
// Fuegt hinter dem ersten vorhandenen Button einen weiteren ein, der BtnFunk ausfuehrt
			function NeuerButton(Titel, BtnFunk)
			{
				var Btn = FindeXPath('//th[@colspan>1]/input[@type="submit"]'); // alle Buttons (input-Tag mit type="submit") in einer Tabellentitelzelle, deren colspan>1 ist
				if (!Btn) { return; }
				Btn = Btn[Btn.length-1]; // den letzten gefundenen Button nehmen
				var NeuBtn = document.createElement('input'); // Neuen Button erstellen
				NeuBtn.type = 'button'; // Damit es auch ein Button wird
				NeuBtn.value = Titel; // Beschriftung zuweisen
				NeuBtn.addEventListener('click', BtnFunk, true); // Klick-Funktion zuweisen
				Btn.parentNode.appendChild(NeuBtn); // neuen Button hinter den anderen setzen
			}
// Schickt die Flotte zum Default-Plani
			function ZumDefPlSenden()
			{
				unsafeWindow.setTarget(DefPlani['Gala'], DefPlani['Sys'], DefPlani['Pos'], DefPlani['Typ']); // Flottenziel setzen
				unsafeWindow.shortInfo(); // Anzeige aktualisieren
				if (InInt(document.getElementById('storage').innerHTML) <= 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
				{
					if (!LadeAccEinst('warnung'))
					{
						if (!confirm('Il n\'y a pas assez de place libre dans les soutes. Continuer?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
					}
				}
				document.forms[0].submit(); // Formular absenden
			}
// Schickt die Flotte zum aktuellen Mond, wenn ein Plani aktiv ist, und umgekehrt
			function ZumAktPartnerSenden()
			{
				if (!AktPlani['Partner']) { return; }
				var Partner = Planis[AktPlani['Partner']];
				unsafeWindow.setTarget(Partner['Gala'], Partner['Sys'], Partner['Pos'], Partner['Typ']); // Flottenziel setzen
				unsafeWindow.shortInfo(); // Anzeige aktualisieren
				if (InInt(document.getElementById('storage').innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
				{
					if (!LadeAccEinst('warnung'))
					{
						if (!confirm('Il n\'y a pas assez de place libre dans les soutes. Continuer?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
					}
				}
				document.forms[0].submit(); // Formular absenden
			}
// Sendet die Flotte mit allen Ress
			function MitAllenRessSenden()
			{
				if (LadeAccEinst('kein_deut'))
				{
					document.getElementsByName('resource3')[0].value = '0'; // Deut auf 0
					unsafeWindow.maxResource('1'); // Met+
					unsafeWindow.maxResource('2'); // Kris eintragen
				}
				else
				{
					unsafeWindow.maxResources(); // Alle Ress eintragen
				}
				if (InInt(document.getElementById('remainingresources').innerHTML) < 0) // Laderaum kontrollieren, falls nicht genug, nachfragen
				{
					if (!LadeAccEinst('warnung'))
					{
						if (!confirm('Il n\'y a pas assez de place libre dans les soutes. Continuer?')) { return; } // falls der User es wnscht, abbrechen //WARNUNG
					}
				}
				document.forms[0].submit(); // Formular absenden
			}
// Ankunftszeit bei Rueckruf, original von xsign.dll
			function RTime()
			{
				var rbutton = FindeXPath('//table[@width="519"]/tbody/tr/th[8]/form[1]/input');
				if(!rbutton) { return; }
				var curdate = GetAktZeit();
				for (var i = 0; i < rbutton.length; i += 2)
				{
					var sp = rbutton[i].parentNode.parentNode.parentNode.getElementsByTagName('th')[4].innerHTML.match(/([^\s]+) ([^\s]+) ([^\s]+) ([0-9]+:[0-9]+:[0-9]+)/);
					var senddate = sp[1] + ' ' + sp[2] + ' ' + sp[3] + ' ' + curdate.getFullYear() + ' ' + sp[4] + String(curdate).substr(String(curdate).length - 9, 9);
					var curstamp = Date.parse(curdate);
					var sendstamp = Date.parse(senddate);
					var rdate = new Date(2 * curstamp - sendstamp);
					var zus = '<br /><font color="' + TextCol + '">';
					zus += (rdate.getDate() != curdate.getDate()) ? rdate.getDate() + '.' + (rdate.getMonth() + 1) + '.' : '&nbsp;';
					var rh = rdate.getHours();
					var rm = rdate.getMinutes();
					var rs = rdate.getSeconds();
					if (rh < 10) { rh = '0' + rh; }
					if (rm < 10) { rm = '0' + rm; }
					if (rs < 10) { rs = '0' + rs; }
					zus += '<br />' + rh + ':' + rm + ':' + rs + '</font>';
					var rspan = document.getElementById('sp' + i);
					if (rspan)
					{
						rspan.innerHTML = zus;
					}
					else
					{ 
						rbutton[i].parentNode.parentNode.innerHTML = rbutton[i].parentNode.parentNode.innerHTML.replace('Retour" type="submit">', 'Retour" type="submit"><span id="sp' + i + '">' + zus + '</span>');
					}
				}
				window.setTimeout(RTime, 999);
			}
// Zeit im linken Menu anzeigen
			if (LadeAccEinst('zeit_links')) // Zeit im NaviMenue anzeigen
			{
				function ZeitAktualisieren2() // aktualisiere die aktuelle Uhrzeit
				{
					document.getElementById('akt_zeit').innerHTML = ZeitFormatieren(GetAktZeit()); // Ankunfszeit formatieren und anzeigen
					window.setTimeout(ZeitAktualisieren2, 999);
				}
				var Zeitzeile = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
				if (Zeitzeile) 
				{
					Zeitzeile.innerHTML += '<br /><b><span style="color:' + TextCol + ';" id="akt_zeit">-</span></b>';
					ZeitAktualisieren2();
				}
			}

//Schleifenaufbau
		var vZeilenNamen = new Array('allyforum','calc','galatool','exstats','savekb','pranger');
		var vZeilenInhalt = new Array('Forum de l\'Alliance','OGame-Rechner','Galaxy-Tool','Externe&nbsp;Stats','Save&nbsp;KB','Piloris');
		for (var i = 0; i < vZeilenNamen.length; i++)
		{
			if (LadeAccEinst(vZeilenNamen[i]))
			{
				var vZeile = FindeXPath('//div[@id="menu"]/table/tbody/tr['+(i+14)+']'); // Zeile 14 im linken Menue
				if (vZeile) 
				{
						altertext = vZeile[0].innerHTML;
					var vTr = document.createElement('tr');
					var vTd = document.createElement('td');
						vTr.appendChild(vTd);
					var vLink = (i != (vZeilenNamen.length-1)) ? LadeAccEinst(vZeilenNamen[i]) : '/game/pranger.php';
						neuertext = '<div align="center"><font color="#FFFFFF"><a href="' + vLink + '" target="_blank">'+vZeilenInhalt[i]+'</a></font></div>';
						vTd.innerHTML = neuertext;
					vZeile[0].parentNode.insertBefore(vTr,vZeile[0]);				
				}
			}
		}
// In der Schiffsauswahl
			if (Datei == 'flotten1')
			{
// Fuegt einen weiteren Button "ben" ein, berechnet Laderaumkapazitaet der ausgewaehlten Schiffe
					var AnzeigeKap = FindeXPath('//table[@width="519"]')[1];
					if (AnzeigeKap.innerHTML.match(/Flottenverband/)) { AnzeigeKap = FindeXPath('//table[@width="519"]')[2]; }
					AnzeigeKap.innerHTML = AnzeigeKap.innerHTML.replace('Tous les vaisseaux</a>', 'Tous les vaisseaux</a></th></tr><tr height="20"><th colspan="4">Capacité Totale: <div id="storage" style="color:lime;">0</div>');
					var BerKap = 'function () { window.setTimeout(function() { var z = 0';
					var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
					var RessSumme = Ress[0] + Ress[1] + ((!LadeAccEinst('kein_deut')) ? Ress[2] : 0); // Summe der Ressourcen bestimmen, Deut nur einrechnen falls es nicht deaktiviert wurde
					var Links = FindeXPath('//tbody/tr/th/a[contains(@href,"javascript:maxShip(")]'); // "max"-Links finden
					for (var i = 0; i < Links.length; i++) // Ueber alle max-Links
					{
						var ID = Links[i].href.match(/ship([0-9]+)/)[1]; // Schiffs-ID bestimmen
						if (ID != 210) { BerKap += ' + (' + document.getElementsByName('capacity' + ID)[0].value + ' * document.getElementsByName(\'ship' + ID + '\')[0].value)'; }
						if (ID == 202 || ID == 203) // fuer kleine und grosse Transporter
						{
							var BenSchiffe; // benoetigte Anzahl Schiffe
							if (ID == 202) // Kleine Transporter
							{
								BenSchiffe = Math.ceil(RessSumme / 5000); // vollen Laderaum verwenden - schliesslich kommt der Treibstoff ja auch in den Laderaum
							}
							else // grosse Transporter
							{
								BenSchiffe = Math.ceil(RessSumme / 25000);
							}
							var Vorhanden = document.getElementsByName('maxship' + ID)[0].value; // vorhandene Anzahl Schiffe
							var url = 'javascript: void(document.getElementsByName("ship' + ID + '")[0].value = ' + Math.min(Vorhanden, BenSchiffe) + ');'; // Linkziel ist ein JavaScript, das die Schiffsanzahl entsprechend setzt
							var farbe = 'color: green;';
							if (Vorhanden < BenSchiffe) // evntl. Warnung einfuegen und Link roeten
							{
								if (!LadeAccEinst('warnung')) {url += 'alert("Attention: Vous ne possédez pas assez de vaisseaux.")'; } //WARNUNG
								farbe = 'color: red;';
							}
							Links[i].parentNode.appendChild(NeuesElement('a', 'Tra', 'href', url, 'title', 'Requis: ' + BenSchiffe, 'style', farbe)); // Link einfuegen
						}
					}
					BerKap += '; z = String(Number(z)); var i = z.length % 3; if (!i) { i = 3; } var erg = z.substr(0, i); for (; i < z.length; i += 3) { erg += \'.\' + z.substr(i, 3); } document.getElementById(\'storage\').innerHTML = erg; }, 50); }';
					var Anzahl = FindeXPath('//tbody/tr/th/input[@size="10"][contains(@name,"ship")]'); // Event onchange fuer Berechnung der Ladekapazitaet ueber Input, geht nicht ueber innerHTML
					for (var i = 0; i < Anzahl.length; i++)
					{
						Anzahl[i].addEventListener('change', eval(BerKap), true);
					}
					var Anzahl = FindeXPath('//table[@width="519"]/tbody/tr/th/a'); // Event onclick fuer Berechnung der Ladekapazitaet ueber Link, geht nicht ueber innerHTML
					for (var i = 0; i < Anzahl.length; i++)
					{
						Anzahl[i].addEventListener('click', eval(BerKap), true);
					}
					if (LadeAccEinst('ankft_zeit')) { RTime(); }
			}
// In der Zielauswahl
			if (Datei == 'flotten2' && Planis && unsafeWindow.shortInfo)
			{
					if (LadeAccEinst('fltmenu_buttons'))
					{
						function ZumPlaniButton(Plani, BtnFunk) // kleine Hilfsfunktion
						{
							NeuerButton('Envoyer sur ' + Plani['Name'] + ((Plani['Typ'] == Typ_Plani) ? '(P)' : '(L)'), BtnFunk);
						}
						if (DefPlani['ID'] != AktPlani['ID']) // wenn der aktuelle Plani nicht der default-Plani ist
						{
							ZumPlaniButton(DefPlani, ZumDefPlSenden); // neuen Button einfuegen
						}
						if (AktPlani['Partner'] && Planis[AktPlani['Partner']]['ID'] != DefPlani['ID']) // wenn der aktuelle Plani nen Partner hat
						{
							ZumPlaniButton(Planis[AktPlani['Partner']], ZumAktPartnerSenden);
						}
					}
				if (LadeAccEinst('ankft_zeit'))
				{
					var shortInfoAlt = 0;
					var Flugzeit = 0;
					var AltGeschw = -1;
// Funktion statt shortInfo
					function shortInfoNeu()
					{
						if (!shortInfoAlt) { return; }
						shortInfoAlt();
						AltGeschw = document.getElementsByName('speed')[0].value;
// Link aktualisieren
						var Gala = document.getElementsByName('galaxy')[0].value; // Planeten finden
						var Sys = document.getElementsByName('system')[0].value;
						var Pos = document.getElementsByName('planet')[0].value;
// Flugzeit auslesen
						var ZeitElem = document.getElementById('duration').firstChild; // Flugzeitelement finden
						if (Flugzeit == '-')
						{
							Flugzeit = 0;
							return; // falls es noch keine Flugzeit gibt, abbrechen
						}
						var Zeit = ZeitElem.nodeValue.match(/([0-9]+):([0-9]{2}):([0-9]{2}) h/); // Stunden, Minuten und Sekunden rausholen
						var h = parseInt(Zeit[1], 10);
						Flugzeit = h * 3600 + parseInt(Zeit[2], 10) * 60 + parseInt(Zeit[3], 10); // Flugzeit in Sekunden Berechnen
						if (h > 23) // bei mehr als einem Tag
						{
							var ZeitText = ZeitElem.nodeValue.match(/^([0-9]+)(:[0-9]{2}:[0-9]{2} h)$/); // Stunden sowie den Rest des Textes rausholen
							var d = Math.floor(h / 24); // Tage berechnen
							h -= d * 24;
							ZeitElem.nodeValue = d + 'j ' + h + ZeitText[2]; // neuen Text zuweisen
						}
// Anzeige aktualisieren
						AnzeigeAktualisieren();
					}
					function AnzeigeAktualisieren() // Berechne die Ankunftszeiten und setze sie in die Felder
					{
						if (!Flugzeit) { return; }
						var AktGeschw = document.getElementsByName('speed')[0].value;
						if (AltGeschw != AktGeschw) // wenn sich die Geschwindigkeit geaendert hat, erstmal das aktualisieren
						{
							shortInfoNeu();
							return;
						}
// Zeiten aktualisieren
						var AktZeit = GetAktZeit(); // aktuelle Zeit
						Ankunft = new Date(AktZeit.getTime() + (Flugzeit * 1000)); // Ankunft: Aktuelle Uhrzeit+Flugzeit (*1000 weil es Millisekunden sind)
						Rueck = new Date(AktZeit.getTime() + (Flugzeit * 2000)); // Rueckkehr: Aktuelle Uhrzeit + 2*Flugzeit (*2000 weil es Millisekunden sind)
						document.getElementById('ankunft_ziel').firstChild.nodeValue = ZeitFormatieren(Ankunft); // Ankunfszeit formatieren und anzeigen
						document.getElementById('ankunft_ursprung').firstChild.nodeValue = ZeitFormatieren(Rueck); // Rueckkehrzeit formatieren und anzeigen
					}
					shortInfoAlt = unsafeWindow.shortInfo;
					unsafeWindow.shortInfo = shortInfoNeu;
// Geschwindigkeitsauswahl anordnen
					var geschw_ausw = document.getElementsByName('speed')[0];
					geschw_ausw.parentNode.style.textAlign = 'left';
					geschw_ausw.parentNode.style.textIndent = '10px';
// fuegt Tabellenzeile fuer die Anzeige der Ankunftszeiten ein und startet den Timer zum Berechnen
					var TabZeile = document.getElementById('duration').parentNode.parentNode; // Zeile mit der Flugzeit
// Zeile fuer Zielankunft erstellen
					var NeueZeile = document.createElement('tr'); // Neue Zeile
					NeueZeile.appendChild(NeuesElement('th', 'Arrivée')); // Zelle in Zeile
					var NeueZelle = NeuesElement('th', '<div id="ankunft_ziel">-</div>'); // 2. Zelle
					NeueZelle.height = '20'; // Attribute zuweisen
					NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
					TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfuegen
// Zeile fuer Ursprungsankunft erstellen (via DOM, innerHTML klappt nicht)
					NeueZeile = document.createElement('tr'); // Neue Zeile
					NeueZeile.appendChild(NeuesElement('th', 'Retour')); // Zelle in Zeile
					NeueZelle = NeuesElement('th', '<div id="ankunft_ursprung">-</div>'); // 2. Zelle
					NeueZelle.height = '20'; // Attribute zuweisen
					NeueZeile.appendChild(NeueZelle); // Zelle in Zeile
					TabZeile = EinfuegenHinter(NeueZeile, TabZeile); // neue Zeile einfuegen
// Warnung einfuegen
					var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
					ContDivCtr.appendChild(document.createElement('br')); // Zeilenumbruch
					ContDivCtr.appendChild(document.createElement('br'));
					NeueZeile = NeuesElement('table', '', 'align', 'center', 'width', '519');
					NeueZeile.innerHTML = '<tr><th>Selon la rapidité de votre connexion Internet, les heures données plus haut peuvent se trouver décalées de quelques secondes. Le temps Serveur affiché page Vue générale ou dans le menu de gauche peut servir de comparaison - il sert de base aux calculs affichés ici.</th></tr>';
					ContDivCtr.appendChild(NeueZeile);
// Timer starten
					AnzeigeAktualisieren();
					window.setInterval(AnzeigeAktualisieren, 200);
				}
			}
// In der Auftragsauswahl
			if (Datei == 'flotten3' && unsafeWindow.shortInfo)
			{
					if (LadeAccEinst('auto_auftrag'))
					{
// beteiligte Schiffe ermitteln
						var HiddenData = FindeXPath('//input[@type="hidden"][contains(@name,"ship")]');
						var Beteiligt = new Array(), Kampfschiff = false, Transporter = false;
						for (var i = 0; i < HiddenData.length; i++) // ueber alle "hidden"-Felder
						{
							var ID = HiddenData[i].name.substr(4, 3);
							if (ID >= 200 && ID <= 299) // gefundene Schiffe
							{
								Beteiligt[ID] = true; // speichern
// Kampfschiffe sind alle ausser Transportern, Recyclern, Kolschiffen und Spiosonden (Solsats kann man nicht schicken)
								if (ID != 202 && ID != 203 && ID != 209 && ID != 208 && ID != 210)
								{
									Kampfschiff = true;
								}
								if (ID == 202 || ID == 203)
								{
									Transporter = true;
								}
							}
						}
// moegliche Auftraege finden
							var Auftr = FindeXPath('//table/tbody/tr/th/input[@type="radio"][@name="order"]'); // Alle Tags fuer die Auftragsauswahl finden
							var AuftrgBoxen = new Array(), BereitsMarkiert = false;
							for (var i = 0; i < Auftr.length; i++) //  Ueer alle Auftragsauswahl-Tags
							{
								AuftrgBoxen[Auftr[i].value] = Auftr[i]; // speichern
								if (Auftr[i].checked) // falls diese Box vormakrkiert ist
								{
									BereitsMarkiert = true; // speichere eine Vormarkierung
									break; // Ende der Schleife - es wird nichts markiert, weil schon was markiert ist
								}
							}
							if (!BereitsMarkiert)
							{
								if (Kampfschiff && AuftrgBoxen[1])
								{
									AuftrgBoxen[1].checked = 'checked'; // 1 = Angreifen
								}
								else
								{
									if (Beteiligt[210] && AuftrgBoxen[6])
									{
										AuftrgBoxen[6].checked = 'checked'; // 210 = Spiosonde, 6 = Spionieren
									}
									else
									{
										if (Beteiligt[209] && AuftrgBoxen[8])
										{
											AuftrgBoxen[8].checked = 'checked'; // 209 = Recycler, 8 = Abbau
										}
										else
										{
											if (Beteiligt[208] && AuftrgBoxen[7])
											{
												AuftrgBoxen[7].checked = 'checked'; // 208 = Koloschiff, 7 = Kolonisieren
											}
											else
											{
												if (((Beteiligt[210] && !Kampfschiff && !Transporter) || LadeAccEinst('stationieren_vorz')) && AuftrgBoxen[4])
												{
													AuftrgBoxen[4].checked = 'checked'; // 210 = Spiosonde alleine, 4= Stationieren
												}
												else
												{
													if (AuftrgBoxen[3])
													{
														AuftrgBoxen[3].checked = 'checked'; // alle anderen Faelle, 3 = Transport
													}
												}
											}
										}
									}
								}
							}
					}
// Alternative Beladungsreihenfolge D-K-M
				if (LadeAccEinst('fltmenu_buttons'))
				{
					var AltRessLaden = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
					var AltRessLink = ' (M-C-D)</a><br>&nbsp;<br><a href="javascript: document.getElementsByName(\'resource1\')[0].value = \'0\'; document.getElementsByName(\'resource2\')[0].value = \'0\'; document.getElementsByName(\'resource3\')[0].value = \'0\';' + ((LadeAccEinst('kein_deut')) ? '' : ' maxResource(\'3\');') + ' maxResource(\'2\'); maxResource(\'1\');">Toutes les ressources (D-C-M)</a>';
//Keine Ressourcen
					AltRessLaden.innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource1\')[0].value = \'0\'); void(document.getElementsByName(\'resource2\')[0].value = \'0\'); void(document.getElementsByName(\'resource3\')[0].value = \'0\'); void(calculateTransportCapacity());">Remettre à zéro</a><br>&nbsp;<br>' + AltRessLaden.innerHTML.replace('</a>', AltRessLink);
				
					var AltRessLaden = FindeXPath('//table/tbody/tr[@height="20"]/th/a/parent::th');
					for (var i = 0; i < 3; i++)
					{
						AltRessLaden[i].innerHTML = '<a href="javascript: void(document.getElementsByName(\'resource'+(i+1)+'\')[0].value = \'0\'); ">min</a>&nbsp;&nbsp;' + AltRessLaden[i].innerHTML;
					}
					
				}
// Neuer Button
				/*if (LadeAccEinst('fltmenu_buttons'))
				{
					NeuerButton(LadeAccEinst('kein_deut') ? 'Met+Kris mitnehmen' : 'Alle Ressourcen mitnehmen', MitAllenRessSenden);
				}*/
			}
//----------------------
// Baumenues verbessern
//----------------------
			if (Datei == 'buildings' || Datei == 'b_building')
			{
				var Zeilen = FindeXPath('//table[@width="530"]/tbody/tr[count(td)=3]'); // alle Tabellenzeilen mit 3 Zellen finden
				if (Zeilen.length)
				{
					var InhaltsTab = Zeilen[Zeilen.length - 1].parentNode.parentNode; // der "Vorfahr" einer dieser Zellen ist die grosse Tabelle (2mal parentNode, weil zuerst tbody kommt)
					if (Datei == 'b_building')
					{
						for (var i = 0; i < Zeilen.length; i++) // ueber alle diese Zeilen
						{
// Elemente finden
							var Knoten = FindeXPath('td', Zeilen[i]);
							if (Knoten.length != 3) { continue; } // die Zeile muss 3 Zellen haben
							if (FindeXPath('a', Knoten[0]).length == 0) { continue; } // in der ersten Zelle muss ein Link sein
							Knoten = Knoten[1]; // 2. Zelle, die mit den Werten
							var ID = Knoten.firstChild.href.match(/gid=([0-9]+)/)[1]; // ID des Schiffes/der Def(des Gebaeudes/der Forschung rausfinden
							if (ID <= 4 || ID == 12) // bei den Minen und den Kraftwerken die Steigerung des Energieverbauchs anzeigen
							{
// aktuelle Stufe des Gebaeudes herausfinden
								var TextKnot = Knoten.childNodes[1], Stufe = 0; // der 2. Knoten der Tabellenzelle
								if (TextKnot.nodeType == 3) // falls der Knoten kein Textknoten ist, ist das Gebaeude auf Stufe 0
								{
									Stufe = InInt(TextKnot.nodeValue);
								}
								var Br = FindeXPath('br[1]', Knoten)[0]; // Zeilenumbruch - vor dem kommt der Hinweis
								var Steigerung = Energie(ID, Stufe + 1) - Energie(ID, Stufe); // Steigerung des Verbrauchs/der Produktion berechnen
								if (ID <= 3) // Minen
								{
									Knoten.insertBefore(document.createTextNode(' (-' + Steigerung + ' Energie)'), Br); // Text einfuegen
								}
								else // Kraftwerke
								{
									Knoten.insertBefore(document.createTextNode(' (+' + Steigerung + ' Energie)'), Br); // Text einfuegen
								}
							}
						}
					}
// gehoert noch zu der Forschungs- und Bauseiten-Verkleinerung
					var trs = FindeXPath('//table[@width="530"]/tbody/tr');
//---------------------------------------
// Forschungs- und Bauseiten verkleinern
//---------------------------------------
					if (LadeAccEinst('smallbuildings'))
					{
// Beschreibungen entfernen (Danke an Badhard fuer den Ur-Code)
						var txt; var posi;
						for (var i = 0; i < trs.length; i++)
						{
							trs[i].innerHTML = trs[i].innerHTML.replace(/<br>.+<br>Ress/, '<br>Ress');
							posi = 'Un bouclier ne peut être construit qu\'une seule fois.';
							if (trs[i].innerHTML.match(posi))
							{
								trs[i].innerHTML = trs[i].innerHTML.replace(posi, '(max. 1)');
							}
							if (LadeAccEinst('smallweg'))
							{
								if (trs[i].innerHTML = trs[i].innerHTML.replace(/<td class="l"> <\/td>/, '')) {}
								if (trs[i].innerHTML = trs[i].innerHTML.replace(/<td class="l"><a.+a><\/td><td class="l"><a/, '<td class="l"><a')) {}
								if (trs[i].innerHTML = trs[i].innerHTML.replace('<td class="c" colspan="2" align="center"><input value="Envoyer" type="submit"></td>', '<td colspan="2" align="center"><input value="Envoyer" type="submit"></td>')) {}
								if (trs[i].innerHTML = trs[i].innerHTML.replace('<td class="c" colspan="2" align="center"><input type="submit" value="Envoyer"></td>', '<td colspan="2" align="center"><input value="Envoyer" type="submit"></td>')) {}
							}
							else
							{
								if (trs[i].innerHTML = trs[i].innerHTML.replace('<td class="c" colspan="2" align="center"><input value="Envoyer" type="submit"></td>', '<td colspan="2" align="center"><input value="Envoyer" type="submit"></td>')) {}
								if (trs[i].innerHTML = trs[i].innerHTML.replace('<td class="c" colspan="2" align="center"><input type="submit" value="Envoyer"></td>', '<td colspan="2" align="center"><input value="Envoyer" type="submit"></td>')) {}
							}
						}
// Bilder in den Baumenues verkleinern
						var smallpx = LadeAccEinst('smallpx');
						var CSSStr = 'table tr th table tr td img, td.l img { width: ' + smallpx + 'px; height: ' + smallpx + 'px; }';
						if (LadeAccEinst('small_faerben'))
						{
							var smallbcolor = LadeAccEinst('smallbcolor');
							var smallbbcolor = LadeAccEinst('smallbbcolor');
							CSSStr += 'table tr td table tr td.l  { background-image: none; background-color: ' + smallbcolor + '; border: 1px ' + smallbbcolor + ' solid; padding-left: 3px; padding-right: 3px; }';
							CSSStr += 'body table tr td table tr td.k, body form table tr td table tr td.k, body table tr td table tr td.l + td.l + td.l { background-image: none; background-color: ' + smallbcolor + '; border: 1px ' + smallbbcolor + ' solid; }';
						}
						GM_addStyle(CSSStr);
					}
					if (LadeAccEinst('transbuild'))
					{
						for (var i = 0; i < trs.length; i++)
						{
							if (trs[i].innerHTML.indexOf('.:') + 1) { continue; }
							var ress0 = 0; var ress1; var ress2; var ress3; var ress4; var ress_gt = 0; var ress_kt = 0;
							if (ress1 = trs[i].innerHTML.match(/Métal:(.*?)<br>/)) // korrektur = auf ==
							{
								ress2 = ress1[0].match(/>([\.0-9]+)</g);
								for (var tt = 0; tt < ress2.length; tt++)
								{
									ress3 = ress2[tt].replace('<', '');
									ress4 = ress3.replace('>', '');
									ress0 += parseInt(ress4.replace(/\./g, ''), 10);
								}
								ress_gt = Math.ceil(ress0 / 25000);
								ress_kt = Math.ceil(ress0 / 5000);
							}
							else
							{
								if (ress1 = trs[i].innerHTML.match(/Cristal:(.*?)<br>/))
								{
									ress2 = ress1[0].match(/>([\.0-9]+)</g);
									for (var tt = 0; tt < ress2.length; tt++)
									{
										ress3 = ress2[tt].replace('<', '');
										ress4 = ress3.replace('>', '');
										ress0 += parseInt(ress4.replace(/\./g, ''), 10);
									}
									ress_gt = Math.ceil(ress0 / 25000);
									ress_kt = Math.ceil(ress0 / 5000);
								}
								else
								{
									if (ress1 = trs[i].innerHTML.match(/Deutérium:(.*?)<br>/))
									{
										ress2 = ress1[0].match(/>([\.0-9]+)</g);
										for (var tt = 0; tt < ress2.length; tt++)
										{
											ress3 = ress2[tt].replace('<', '');
											ress4 = ress3.replace('>', '');
											ress0 += parseInt(ress4.replace(/\./g, ''), 10);
										}
										ress_gt = Math.ceil(ress0 / 25000);
										ress_kt = Math.ceil(ress0 / 5000);
									}
								}
							}
							posi = (LadeAccEinst('smallbuildings')) ? '<br>Ress' : trs[i].innerHTML.match(/<br>.+<br>Ress/);
							trs[i].innerHTML = trs[i].innerHTML.replace(posi, ' (<span style="color:' + TextCol + ';">' + ress_gt + ' GTs</span>|<span style="color:' + TextCol + ';">' + ress_kt + ' PTs</span>)' + posi);
						}
					}
					if (LadeAccEinst('colored_ress'))
					{
						var vSucheRess = new Array(/(Métal: )<b>([\.0-9]+)/,/(Cristal: )<b>([\.0-9]+)/,/(Deutérium: )<b>([\.0-9]+)/,/(Energie: )<b>([\.0-9]+)/)
						var vColorRess = new Array(LadeAccEinst('color_met'),LadeAccEinst('color_kris'),LadeAccEinst('color_deut'),LadeAccEinst('color_eng'))
						for (var i = 0; i < Zeilen.length; i++) {
							var vText = Zeilen[i].innerHTML;
							for (var j = 0; j < vSucheRess.length; j++) {
								var vFinde = vSucheRess[j].exec(vText);
								if (vFinde) {
								vText = vText.replace(vFinde[0],vFinde[0].split(" ")[0]+" <font color='"+vColorRess[j]+"'>"+vFinde[2]+"</font>");
								}
							}
							Zeilen[i].innerHTML = vText;
						}
					}
					if (document.URL.match('Forschung'))
					{
						var ccc = 3;
						if (LadeAccEinst('smallweg')) { var ccc = 2; }
						var cc = 0, fz = new Array();
						for (var i = 1; i < trs.length + 1; i++)
						{
							fz = FindeXPath('//table[@width="530"]/tbody/tr[' + i + ']/td[' + ccc + ']/script');
							if (fz.length > 0)
							{
								cc = i;
							}
						}
						if (cc)
						{
							fz = FindeXPath('//table[@width="530"]/tbody/tr[' + cc + ']/td[' + ccc + ']/script');
							var v = new Date(), ts;
							var bxx = document.getElementById('bxx');
							var link1 = fz[0].innerHTML.match(/session=(.*?)&mode/g)[0];
							link1 = link1.replace('session=', '');
							link1 = link1.replace('&mode', '');
							var link2 = fz[0].innerHTML.match(/cp=(.*?) >Continuer/g)[0];
							link2 = link2.replace('cp=', '');
							link2 = link2.replace(' >Continuer', '');
							var link3 = fz[0].innerHTML.match(/session=(.*?)&unbau/g)[0];
							link3 = link3.replace('session=', '');
							link3 = link3.replace('&unbau','');
							var link4 = fz[0].innerHTML.match(/unbau=(.*?)&mode/g)[0];
							link4 = link4.replace('unbau=', '');
							link4 = link4.replace('&mode', '');
							var Text = '</a>';
							if (fz[0].innerHTML.indexOf('<br>sur<br>') + 1)
							{
								Text = fz[0].innerHTML.match(/<br>sur<br>(.*?)<\/a>/)[0];
							}
							Text = '<br><a href="/game/index.php?page=buildings&session=' + link3 + '&unbau=' + link4 + '&mode=Forschung' + '">Interrompre' + Text;
							function t()
							{
								var n = new Date();
								var ss = parseInt(fz[0].innerHTML.match(/ss=([0-9]+)/g)[0].replace('ss=', ''), 10);
								var s = ss - Math.round((n.getTime() - v.getTime()) / 1000);
								var m = 0, h = 0, d = 0;
								if (s <= 0)
								{
									bxx.innerHTML = 'Terminé<br><a href="/game/index.php?page=buildings&session=' + link1 + '&mode=Forschung&cp=' + link2 + '">Continuer</a>';
								}
								else
								{
									if (s > 59)
									{
										m = Math.floor(s / 60);
										s %= 60;
									}
									if (m > 59)
									{
										h = Math.floor(m / 60);
										m %= 60;
									}
									if (h > 23)
									{
										d = Math.floor(h / 24);
										h %= 24;
									}
									if (!ts) { ts = aTimeStamp(d, h, m, s); }
									if (s < 10) { s = '0' + s; }
									if (m < 10) { m = '0' + m; }
									if (h < 10) { h = '0' + h; }
// im Folgenden um das Original wieder zu bekommen: Text durch h + ':' + m + ':' + s
									bxx.innerHTML = ((d) ? d + 'j&nbsp;' : '') + h + ':' + m + ':' + s + ts + Text;
								}
								window.setTimeout(t, 999);
							}
							t();
						}
					}
// Damit die Zeilenumbrueche neu gerendert werden und die Tabelle schicker aussieht
					InhaltsTab.style.width = TabBreite(650, 530);
				}
			} // Ende der Bauseiten-Erweiterungen
//-----------------------
// Uebersicht verbessern
//-----------------------
			if (Datei == 'overview')
			{
				if (LadeAccEinst('ang_zeit') && !LadeAccEinst('zeit_links'))
				{
					function ZeitAktualisieren() // aktualisiere die aktuelle Uhrzeit
					{
						ZeitZelle.innerHTML = '<span style="color:' + TextCol + ';">' + ZeitFormatieren(GetAktZeit()) + '</span>';
						window.setTimeout(ZeitAktualisieren, 999);
					}
					var ZeitZelle = FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan=3]')[0];
					ZeitAktualisieren();
				}
				if (SID)
				{
// Versieht die Uebersicht mit weiteren Links
					var Bilder = FindeXPath('//th/a/img[contains(@src,"/planeten/small/")]'); // Alle Bilder in einem Link in einer Titelzelle finden
					for (var i = 0; i < Bilder.length; i++) // und diese Bilder bearbeiten
					{
						var Knoten = Bilder[i].parentNode; // den Link selbst bearbeiten
						var PlaniID = Knoten.href.match(/cp=([0-9]+)/); // PlaniID holen
						if (PlaniID.length == 0) { continue; } // falls keine drin ist - raus
						PlaniID = PlaniID[1];
						if (!(Bilder[i].src.indexOf('/planeten/small/s_mond.jpg') + 1))
						{
// Link ins Gebaeudemenue
							var TextKn = FindeXPath('center[1]', Knoten.parentNode)[0]; // Das Center-Tag beinhaltet den Text
							TextKn.insertBefore(NeuesElement('a', Trim(TextKn.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&' + SID + '&cp=' + PlaniID + PHPSIDStr), TextKn.firstChild); // Den Link vor dem Text einfuegen
							TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
						}
// Link ins Flottenmenue
						var TextKn = Knoten.parentNode; // das Tag der Tabellenzelle
						var Link = NeuesElement('a', Trim(TextKn.firstChild.nodeValue), 'href', '/game/index.php?page=flotten1&' + SID + '&cp=' + PlaniID + PHPSIDStr); // Link erzeugen
						if (PlaniID == DefPlani['ID']) { Link.style.color = '#87ceeb'; } // Default-Plani markieren
						TextKn.insertBefore(Link, TextKn.firstChild); // Den Link vor dem Text einfuegen
						TextKn.removeChild(TextKn.childNodes[1]); // den Text loeschen
// Mond-Link
						var Plani = FindePlaniMitID(Planis, PlaniID);
						var Partner = Planis[Plani['Partner']]; // Das ist der Mond zum Plani, falls vorhanden
						if (Plani && Plani['Partner'] && !Plani['Aktiv'] && !Partner['Aktiv']) // falls der Plani gefunden wurde und dieser Plani nen Mond hat und wir nicht auf diesem Mond sind, und auch nicht beim aktiven Plani
						{
							var MondLink = NeuesElement('a', Partner['Name'], 'href', '/game/index.php?page=overview&' + SID + '&cp=' + Partner['ID'] + PHPSIDStr); // Link erzeugen
							if (Partner['ID'] == DefPlani['ID']) { MondLink.style.color = '#87ceeb'; } // Default-Mond markieren
							var Text = EinfuegenHinter(document.createTextNode(' ('), Link); // Klammer auf vor den Link, hinter den Planinamen
							EinfuegenHinter(MondLink, Text); // dahinter den Link
							EinfuegenHinter(document.createTextNode(')'), MondLink); // dahinter die Klammer zu
						}
					}
// Das grosse Planibild finden
					var AktPlaniBau = FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan>=2]/center')[0];
					AktPlaniBau.insertBefore(NeuesElement('a', Trim(AktPlaniBau.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
					AktPlaniBau.removeChild(AktPlaniBau.childNodes[1]); // den Text loeschen
				}
				function getElementsByClassName(clsName, htmltag, what)
				{
					var arr = new Array();
					var elems = document.getElementsByTagName(htmltag);
					var mmm = 0;
					for (var i = 0; i < elems.length; i++)
					{
						if (elems[i].className == clsName)
						{
							if (elems[i].getAttribute('onmouseover', 0).indexOf(what) + 1)
							{
								arr[mmm] = elems[i];
								mmm++;
							}
						}
					}
					return arr;
				}
// Uebersicht ueber die bewegten Ressourcen
				if (LadeAccEinst('bewegteress') == true)
				{
					function RessEval(a, b)
					{
						var c = eval('/' + a + ': ([\.0-9]+)/');
						return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
					}
					function RessLoop(a, b)
					{
						var s = getElementsByClassName(a, 'a', 'Métal');
						var c = d = e = 0, t = '';
						for (var i = 0; i < s.length; i++)
						{
							t = s[i].getAttribute('onmouseover');
							c += RessEval('Métal', t);
							d += RessEval('Cristal', t);
							e += RessEval('Deutérium', t);
						}
						if (c != 0 || d != 0 || e != 0)
						{
							code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
						}
						return new Array(c, d, e);
					}
					code = '<center><table width="' + LadeAccEinst('max_tab_breite') + '" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">';
					code += '<tr><td class="c" colspan="4">Aperçu des ressources en transit</td></tr>';
					code += '<tr><th><b>Ordre de Mission</b></th><th><b>Métal</b></th><th><b>Cristal</b></th><th><b>Deutérium</b></th></tr>';
					var typ = new Array('owntransport', 'Transport', 'owndeploy', 'Stationner', 'owncolony', 'Coloniser', 'ownhold', 'Stationner (Allié)', 'ownharvest', 'Recycler', 'ownattack', 'Attaquer', 'ownfederation', 'Attaque groupée');
					var mkd = new Array();
					for (var i = 0; i < typ.length; i += 2) { mkd = mkd.concat(RessLoop(typ[i], typ[i + 1])); }
					var met = kris = deut = 0;
					for (var i = 0; i < mkd.length; i += 3) { met += mkd[i]; kris += mkd[i + 1]; deut += mkd[i + 2]; }
					code += '<tr><th><span style="color:' + TextCol + ';">Total:</span></th><th><span style="color:' + TextCol + ';">' + TausenderZahl(met) + '</span></th><th><span style="color:' + TextCol + ';">' + TausenderZahl(kris) + '</span></th><th><span style="color:' + TextCol + ';">' + TausenderZahl(deut) + '</span></th></tr>';
					code += '</table></center><br>';
					aa4 = document.createElement('div');
					ContDiv.appendChild(aa4);
					var ttt = FindeXPath('//div[@id="content"]/div[last()]');
					ttt[0].innerHTML = code;
				}
// Handelsrechner
				if (LadeAccEinst('handelsrechner') == true)
				{
					function handelsrechner()
					{
						var hertauschen, bek1, bek2, handel, mm = 0, nk, nk1, nk2, mm1 = 0, mm2 = 0;
						var menge = parseInt(document.getElementById('menge').value.replace(/\./g, ''), 10);
						if (isNaN(menge)) { menge = 0; }
						var kursmet = parseFloat(document.getElementById('kursmet').value.replace(/\,/g, '.'), 10);
						var kurskris = parseFloat(document.getElementById('kurskris').value.replace(/\,/g, '.'), 10);
						var kursdeut = parseFloat(document.getElementById('kursdeut').value.replace(/\,/g, '.'), 10);
						var prozent1 = parseFloat(document.getElementById('prozent').value.replace(/\,/g, '.'), 10);
						if (isNaN(kursmet)) { kursmet = parseFloat(LadeAccEinst('kursmet').replace(/\,/g, '.'), 10); }
						if (isNaN(kurskris)) { kurskris = parseFloat(LadeAccEinst('kurskris').replace(/\,/g, '.'), 10); }
						if (isNaN(kursdeut)) { kursdeut = parseFloat(LadeAccEinst('kursdeut').replace(/\,/g, '.'), 10); }
						if (isNaN(prozent1)) { prozent1 = 0; }
						var prozent2 = 100 - prozent1;
						var gt_du = 0, kt_du = 0, gt_er = 0, kt_er = 0, ress = 0;
						if (document.getElementById('hertauschen1').checked)
						{
							hertauschen = 'Métal';
							bek1 = 'Cristal';
							bek2 = 'Deutérium';
							if (document.getElementById('bekommen1').checked)
							{
								if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge / nk; }
								if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge * nk; }
								if (kursmet == kurskris) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen2').checked)
							{
								if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge / nk; }
								if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge * nk; }
								if (kursmet == kursdeut) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen3').checked)
							{
								if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 / nk1; }
								if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 * nk1; }
								if (kursmet == kurskris) { mm1 = menge / 100 * prozent1; }
								if (kursmet > kursdeut) { nk2 = kursmet / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
								if (kursdeut > kursmet) { nk2 = kursdeut / kursmet; mm2 = menge / 100 * prozent2 * nk2; }
								if (kursmet == kursdeut) { mm2 = menge / 100 * prozent2; }
								handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' et ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
								ress = Math.floor(mm1) + Math.floor(mm2);
							}
						}
						if (document.getElementById('hertauschen2').checked)
						{
							hertauschen = 'Cristal';
							bek1 = 'Métal';
							bek2 = 'Deutérium';
							if (document.getElementById('bekommen1').checked)
							{
								if (kurskris > kursmet) { nk = kurskris / kursmet; mm = menge / nk; }
								if (kursmet > kurskris) { nk = kursmet / kurskris; mm = menge * nk; }
								if (kurskris == kursmet) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen2').checked)
							{
								if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge / nk; }
								if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge * nk; }
								if (kurskris == kursdeut) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen3').checked)
							{
								if (kurskris > kursmet) { nk1 = kurskris / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
								if (kursmet > kurskris) { nk1 = kursmet / kurskris; mm1 = menge / 100 * prozent1 * nk1; }
								if (kurskris == kursmet) { mm1 = menge / 100 * prozent1; }
								if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 / nk2; }
								if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 * nk2; }
								if (kurskris == kursdeut) { mm2 = menge / 100 * prozent2; }
								handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' et ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
								ress = Math.floor(mm1) + Math.floor(mm2);
							}
						}
						if (document.getElementById('hertauschen3').checked)
						{
							hertauschen = 'Deutérium';
							bek1 = 'Métal';
							bek2 = 'Cristal';
							if (document.getElementById('bekommen1').checked)
							{
								if (kursdeut > kursmet) { nk = kursdeut / kursmet; mm = menge / nk; }
								if (kursmet > kursdeut) { nk = kursmet / kursdeut; mm = menge * nk; }
								if (kursdeut == kursmet) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek1;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen2').checked)
							{
								if (kursdeut > kurskris) { nk = kursdeut / kurskris; mm = menge / nk; }
								if (kurskris > kursdeut) { nk = kurskris / kursdeut; mm = menge * nk; }
								if (kursdeut == kurskris) { mm = menge; }
								handel = TausenderZahl(Math.floor(mm)) + ' ' + bek2;
								ress = Math.floor(mm);
							}
							if (document.getElementById('bekommen3').checked)
							{
								if (kursdeut > kursmet) { nk1 = kursdeut / kursmet; mm1 = menge / 100 * prozent1 / nk1; }
								if (kursmet > kursdeut) { nk1 = kursmet / kursdeut; mm1 = menge / 100 * prozent1 * nk1; }
								if (kursdeut == kursmet) { mm1 = menge / 100 * prozent1; }
								if (kursdeut > kurskris) { nk2 = kursdeut / kurskris; mm2 = menge / 100 * prozent2 / nk2; }
								if (kurskris > kursdeut) { nk2 = kurskris / kursdeut; mm2 = menge / 100 * prozent2 * nk2; }
								if (kursdeut == kurskris) { mm2 = menge / 100 * prozent2; }
								handel = TausenderZahl(Math.floor(mm1)) + ' ' + bek1 + ' et ' + TausenderZahl(Math.floor(mm2)) + ' ' + bek2;
								ress = Math.floor(mm1) + Math.floor(mm2);
							}
						}
						document.getElementById('hertauschen0').innerHTML = hertauschen;
						document.getElementById('bek1').innerHTML = bek1;
						document.getElementById('bek2').innerHTML = bek2;
						document.getElementById('bek').innerHTML = bek1;
						kursmet = document.getElementById('kursmet').value;
						kurskris = document.getElementById('kurskris').value;
						kursdeut = document.getElementById('kursdeut').value;
						if (document.getElementById('kursmet').value == '') { kursmet = LadeAccEinst('kursmet'); }
						if (document.getElementById('kurskris').value == '') { kurskris = LadeAccEinst('kurskris'); }
						if (document.getElementById('kursdeut').value == '') { kursdeut = LadeAccEinst('kursdeut'); }
						handelstext = 'J\'aurais à proposer ' + TausenderZahl(menge) + ' ' + hertauschen + ' contre ' + handel + ' (Taux: ' + kursmet.replace(/\./g, ',') + ':' + kurskris.replace(/\./g, ',') + ':' + kursdeut.replace(/\./g, ',') + ')';
						if (document.getElementById('handel').innerHTML != handel || document.getElementById('handelstext').innerHTML.match(/\(Taux: (.*?)\)/)[0] != handelstext.match(/\(Taux: (.*?)\)/)[0]) { document.getElementById('handelstext').innerHTML = handelstext; }
						document.getElementById('handel').innerHTML = handel;
						gt_du = Math.ceil(menge / 25000);
						kt_du = Math.ceil(menge / 5000);
						gt_er = Math.ceil(ress / 25000);
						kt_er = Math.ceil(ress / 5000);
						document.getElementById('transen_du').innerHTML = '<span style="color:' + TextCol + ';">' + TausenderZahl(gt_du) + ' GTs</span> ou <span style="color:' + TextCol + ';">' + TausenderZahl(kt_du) + ' PTs</span>';
						document.getElementById('transen_er').innerHTML = '<span style="color:' + TextCol + ';">' + TausenderZahl(gt_er) + ' GTs</span> ou <span style="color:' + TextCol + ';">' + TausenderZahl(kt_er) + ' PTs</span>';

					}
					code2 = '<center><table width="' + LadeAccEinst('max_tab_breite') + '" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">';
					code2 += '<tr><td class="c" colspan="5">Taux d\'échange: <input type="text" id="kursmet" value="' + LadeAccEinst('kursmet') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kurskris" value="' + LadeAccEinst('kurskris') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">:<input type="text" id="kursdeut" value="' + LadeAccEinst('kursdeut') + '" size="4" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;"></th></tr>';
					code2 += '<tr><th style="text-align:left;">Que fournir?</th><th width="100"><input type="text" id="menge" value="0" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;"></th><th width="50" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen1" value="1">Métal</th><th width="100" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen2" value="2">Cristal</th><th width="90" style="text-align:left;"><input type="radio" name="hertauschen" id="hertauschen3" value="3" checked>Deutérium</th></tr>';
					code2 += '<tr><th style="text-align:left;">Que recevoir contre du <span id="hertauschen0">Deutérium</span>?</th><th width="100" style="text-align:left;"><input type="radio" name="bekommen" id="bekommen1" value="1"><span id="bek1">Métal</span></th><th width="100" style="text-align:left;"><input type="radio" name="bekommen" id="bekommen2" value="2"><span id="bek2">Cristal</span></th><th width="200" style="text-align:left;" colspan="2">  <input type="radio" name="bekommen" id="bekommen3" value="3" checked>Mix (<input id="prozent" value="33" size="4" maxlength="3" style="border-color:' + TextCol + '; color:' + TextCol + '; text-align:center; font-weight:bold; background-color:transparent;">% de <span id="bek">Métal</span>)</th></tr>';
					code2 += '<tr><th colspan="5" style="text-align:left;"><span style="color:' + TextCol + ';">Vous recevriez <span id="handel">0 Métal et 0 Cristal</span>.</span></th></tr>';
					code2 += '<tr><th colspan="5" style="text-align:left;">Pour le transport, il vous faudra au minimum <span id="transen_du">0 GTs ou 0 PTs</span>.</th></tr>';
					code2 += '<tr><th colspan="5" style="text-align:left;">Pour le transport, votre partenaire aura besoin d\'au minimum <span id="transen_er">0 GTs ou 0 PTs</span>.</th></tr>';
					code2 += '<tr><td class="c" colspan="5">Texte de l\'Offre</td></tr>';
					code2 += '<tr><th colspan="5" style="text-align:center; padding:10px;" id="handelstext">J\'aurais à proposer 0 Deuterium contre 0 Métal et 0 Cristal (Taux: ' + LadeAccEinst('kursmet').replace(/\./g, ',') + ':' + LadeAccEinst('kurskris').replace(/\./g, ',') + ':' + LadeAccEinst('kursdeut').replace(/\./g, ',') + ')</th></tr>';
					code2 += '</table></center><br>';
					aa4 = document.createElement('div');
					ContDiv.appendChild(aa4);
					var ttt = FindeXPath('//div[@id="content"]/div[last()]');
					ttt[0].innerHTML = code2;
					handelsrechner();
					window.setInterval(handelsrechner, 200);
				}
			} // Ende Uebersichtsteil
// Zeiten in Tagen anzeigen
			var modus = (Datei == 'buildings') ? document.URL.match(/mode=([0-9a-zA-Z]+)/)[1] : 0;
			if (SID && (Datei == 'overview' || Datei == 'flotten2' || Datei == 'b_building'))
			{
				var v = new Date();
				var Zaehler = ts = new Array(), ZaehlerLaeuft = false;
				function AktZaehler()
				{
					for (var i = 0; i < Zaehler.length; i++)
					{
						if (!Zaehler[i]) { continue; }
						var n = new Date();
						var ss = Zaehler[i].getAttribute('title');
						var d = 0, h = 0, m = 0, s = ss - Math.round((n.getTime() - v.getTime()) / 1000);
						if (s <= 0)
						{
							if (Zaehler[i].getAttribute('gebaeude') != 0)
							{
								var url = Zaehler[i].getAttribute('url');
								Zaehler[i].innerHTML = 'Terminé<br /><a href="' + url + '">Continuer</a>';
								window.setTimeout(function() { location.href = url; }, 1200);
							}
							else
							{
								Zaehler[i].innerHTML = '-';
								continue;
							}
						}
// Tage, Stunden, Minuten, Sekunden ermitteln und formatieren
						if (s > 59)
						{
							m = Math.floor(s / 60);
							s %= 60;
						}
						if (m > 59)
						{
							h = Math.floor(m / 60);
							m %= 60;
						}
						if (h > 23)
						{
							d = Math.floor(h / 24);
							h %= 24;
						}
						if (!ts[i]) { ts[i] = aTimeStamp(d, h, m, s); }
						if (s < 10) { s = '0' + s; }
						if (m < 10) { m = '0' + m; }
						if (h < 10) { h = '0' + h; }
						var Text = ((d) ? d + 'j&nbsp;' : '') + h + ':' + m + ':' + s + ts[i];
						if (Zaehler[i].getAttribute('gebaeude') != 0)
						{
							Text += '<br /><a href="' + Zaehler[i].getAttribute('url') + '&unbau=' + Zaehler[i].getAttribute('gebaeude') + '">Interrompre</a>';
						}
						Zaehler[i].innerHTML = Text;
					}
					window.setTimeout(AktZaehler, 999);
				}
				function StarteZaehler()
				{
					if (ZaehlerLaeuft) { return; }
					ZaehlerLaeuft = true;
					if (!Zaehler.length) { return; }
// Daten aus den OGame-Zaehlern fischen (dooferweise werden da 3 grundlegend verschiedene Methoden verwendet, und die muessen alle erkannt werden. Ekelhafte Programmiererei ist das...)
					for (var i = 0; i < Zaehler.length; i++)
					{
						if (Zaehler[i].getAttribute('title')) // Uebersicht und Flottenmenue
						{
							Zaehler[i].setAttribute('gebaeude', 0);
						}
						else
						{
							if (unsafeWindow.pp) // Gebaeudemenue
							{
								Zaehler[i].setAttribute('title', unsafeWindow.pp);
								Zaehler[i].setAttribute('gebaeude', unsafeWindow.pk);
							}
							else
							{ // im Forschungsmenue wirds noch komplizierter...
								var ZeitDaten = Zaehler[i].firstChild.nodeValue.match(/([0-9]+):([0-9]{2}):([0-9]{2})/); // Werte extrahieren
								var IDDaten = FindeXPath('a[1]', Zaehler[i])[0].href.match(/unbau=([0-9a-zA-Z]+)/);
								if (!ZeitDaten || !IDDaten)
								{
									Zaehler[i] = 0;
									continue;
								}
								Zaehler[i].setAttribute('title', Number(ZeitDaten[1]) * 3600 + Number(ZeitDaten[2]) * 60 + Number(ZeitDaten[3]));
								Zaehler[i].setAttribute('gebaeude', IDDaten[1]);
							}
							var url = '/game/index.php?page=' + Datei + '&' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr;
							if (modus) { url += '&mode=' + modus; }
							Zaehler[i].setAttribute('url', url);
						}
					}
					AktZaehler();
				}
// Die Zaehler finden
				Zaehler = FindeXPath('//div[starts-with(@id, "bx")]');
				unsafeWindow.t = unsafeWindow.tt = StarteZaehler; // vorhandene Funktion ueberschreiben
			}
//--------------------------
// Tagesproduktion anzeigen
//--------------------------
// im Ressmenue Tagesproduktion und x-Stunden/Tage-Produktion anzeigen
			if (Datei == 'resources')
			{
				var planimond = FindeXPath('//table[@width="550"]/tbody/tr/td');
				if (!(planimond[0].innerHTML.indexOf('(Lune)') + 1))
				{
					var erg1 = FindeXPath('//table[@width="550"]/tbody/tr[8]/th[1]');
					var erg2 = FindeXPath('//table[@width="550"]/tbody/tr[9]/th[1]');
					var erg3 = 0;
					if (erg1.length > 0) { erg3 = (erg1[0].innerHTML.indexOf('Satellite solaire') + 1) ? 8 : erg3; }
					if (erg2.length > 0) { erg3 = (erg2[0].innerHTML.indexOf('Satellite solaire') + 1) ? 9 : erg3; }
					if (erg3)
					{
						erg1 = (erg3 == 8) ? erg1 : erg2;
						erg2 = FindeXPath('//table[@width="550"]/tbody/tr[' + (erg3) + ']/th[6]/font');
						var arg1 = erg2[0].innerHTML.replace(/\./g, '');
						arg1 = arg1.replace(/\s/g, '');
						var satenergie = (arg1 != '0') ? arg1.match(/>([0-9]+)</)[1] : arg1;
						var satanzahl = erg1[0].innerHTML.match(/Nombre ([\.0-9]+)/);
						erg2 = FindeXPath('//table[@width="550"]/tbody/tr[' + (erg3) + ']/th[7]/select');
						var prozent = parseInt(erg2[0].value);
						satanzahl = satanzahl[1].replace(/\./g, '');
						var prosat = Math.floor(parseInt(satenergie) / parseInt(satanzahl));
						erg1[0].innerHTML = erg1[0].innerHTML + '<br><span style="color:' + TextCol + ';">Energie par Satellite: ' + prosat.toString() + ' à ' + prozent.toString() + '%</span>';
					}
				}
				var Arr = FindeXPath('//table[@width="550"]/tbody/tr[count(td)+count(th)=5]'); // Das sind die Zeilen der Rohstofftabelle
				var Prod = Array();
				var GesZeile = Arr[Arr.length - 1];
				Arr = FindeXPath('td/font[1]', GesZeile);
				for (var i = 0; i < 3; i++)
				{
					Prod[i] = InInt(Arr[i].firstChild.nodeValue); // Produktion dieses Rohstoffs speichern
				}
				function AktDynAnz()
				{
					var Anz = InInt(document.getElementById('dyn_anz').value);
					if (isNaN(Anz)) { return; }
					var Art = document.getElementById('dyn_art');
					Art = InInt(Art.options[Art.selectedIndex].value);
					var Multiplikator = Anz * Art;
					for (var i = 0; i < 3; i++)
					{
						document.getElementById('dyn_ausg' + i).firstChild.nodeValue = TausenderZahl(Prod[i] * Multiplikator);
					}
				}
				function SetzeAuf(Wert)
				{
					var AuswahlBoxen = FindeXPath('//table[@width="550"]/tbody/tr/th/select[starts-with(@name, "last")]');
					for (var i = 0; i < AuswahlBoxen.length; i++)
					{
						var Name = AuswahlBoxen[i].name;
						if (Name == 'last1' || Name == 'last2' || Name == 'last3' || Name == 'last4' || Name == 'last12' || Name == 'last212') { AuswahlBoxen[i].selectedIndex = Wert; }
					}
					document.getElementsByName('action')[0].click(); // Formular absenden (da action=Berechne sein muss geht das am einfachsten, indem man den Button drueckt - formular.submit() klappt nicht
				}
				var LeerZelle = FindeXPath('//table[@width="550"]/tbody/tr[count(th)=1]/th[@height=4][@colspan=6]')[0];
				LeerZelle.setAttribute('colspan', 7);
				var BtnZelle = NeuesElement('td', '', 'class', 'k');
				var Btn = NeuesElement('input', '', 'type', 'button', 'value', 'Tout mettre à 100%');
				Btn.addEventListener('click', function() { SetzeAuf(0); }, true);
				BtnZelle.appendChild(Btn);
				GesZeile.appendChild(BtnZelle);
// Zeile fuer dynamische Anzeige einfuegen
				var NeuZeile = document.createElement('tr');
				var AuswZelle = document.createElement('th');
				AuswZelle.setAttribute('colspan', '2');
				AuswZelle.appendChild(document.createTextNode('Production en '));
				AuswZelle.appendChild(document.createElement('br'));
				AuswZelle.appendChild(NeuesElement('input', '', 'type', 'text', 'id', 'dyn_anz', 'value', '7', 'size', '5', 'maxlength', '4'));
				AuswZelle.appendChild(document.createTextNode(' '));
				var ArtAusw = NeuesElement('select', '', 'id', 'dyn_art');
				ArtAusw.appendChild(NeuesElement('option', 'Heures', 'value', '1'));
				ArtAusw.appendChild(NeuesElement('option', 'Jours', 'value', '24', 'selected', 'selected'));
				AuswZelle.appendChild(ArtAusw);
				NeuZeile.appendChild(AuswZelle);
				for (var i = 0; i < 3; i++) // fuer die 3 Ressourcentypen
				{
					NeuZeile.appendChild(NeuesElement('td', ' ', 'class', 'k', 'style', 'color:#00FF00', 'id', 'dyn_ausg' + i));
				}
				NeuZeile.appendChild(NeuesElement('td', '-', 'class', 'k', 'style', 'color:#00FF00'));
				EinfuegenHinter(NeuZeile, GesZeile); // die neue Zeile nach der Gesamtsummenzeile einfuegen
				AktDynAnz();
				window.setInterval(AktDynAnz, 200);
// Tagesproduktion
				NeuZeile = document.createElement('tr'); // noch eine neue Zeile erstellen
				NeuZeile.appendChild(NeuesElement('th', 'Production journalière:', 'colspan', '2')); // Zelle einfuegen
				for (var i = 0; i < 3; i++) // fuer die 3 Ressourcentypen
				{
					NeuZeile.appendChild(NeuesElement('td', TausenderZahl(Prod[i] * 24), 'class', 'k', 'style', 'color:#00FF00')); // Zelle in die Zeile setzen
				}
				NeuZeile.appendChild(NeuesElement('td', '-', 'class', 'k', 'style', 'color:#00FF00')); // Zelle in die Zeile setzen
				BtnZelle = NeuesElement('td', '', 'class', 'k');
				var Btn = NeuesElement('input', '', 'type', 'button', 'value', 'Tout mettre à 0%');
				Btn.addEventListener('click', function() { SetzeAuf(10); }, true);
				BtnZelle.appendChild(Btn);
				NeuZeile.appendChild(BtnZelle);
				EinfuegenHinter(NeuZeile, GesZeile); // die neue Zeile nach der Gesamtsummenzeile einfuegen
				var Ress = HoleRessourcen(); // vorhandene Ressourcen bestimmen
				var RessSumme = Ress[0] + Ress[1]; // Summe der Ressourcen bestimmen
				var OhneDeut = LadeAccEinst('kein_deut');
				if (!OhneDeut) { RessSumme += Ress[2]; } // Deut nur einrechen falls es nicht
				BenKT = Math.ceil(RessSumme / 5000); // vollen laderaum verwenden - schliesslich kommt der Treibstoff ja auch in den Laderaum
				BenGT = Math.ceil(RessSumme / 25000);
				aa4 = document.createElement('div');
				ContDiv.appendChild(aa4);
				var ttt = FindeXPath('//div[@id="content"]/div[last()]');
				ttt[0].innerHTML = '<center><table width="550"><tr><th>Pour transporter au total <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(RessSumme.toString()) + '</span>' + ((OhneDeut) ? ' Métal et Cristal' : ' Métal, Cristal et Deutérium') + ' présents sur cette Planète<br>il faut <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(BenGT.toString()) + ' Grands Transporteurs</span> ou <span style="color:' + TextCol + '; font-weight:bold;">' + TausenderZahl(BenKT.toString()) + ' Petits Transporteurs</span>.</td></tr></table></center>';
			}
//------------------------------------------------------------------------------
// Spionagebericht auswerten und Button erstellen zum Senden an Online-Speedsim
//------------------------------------------------------------------------------
			if (Datei == 'messages' && LadeAccEinst('spio') == true)
			{
				function Merkliste(a, b, c, d)
				{
					var e = LadeAccEinst('merkliste').split(/::/g);
					for (var i = 0; i < e.length; i++)
					{
						var z = e[i].split(/:/g);
						if (z[1] == b && z[2] == c && z[3] == d) // Wenn Eintrag bereits existiert, dann loesche, Vergleich ueber Koords, Planiname kann sich aendern
						{
							SpeichAccEinst('merkliste', LadeAccEinst('merkliste').replace(z[0] + ':' + z[1] + ':' + z[2] + ':' + z[3] + '::', ''));
							return false;
						}
					}
					SpeichAccEinst('merkliste', LadeAccEinst('merkliste') + a + ':' + b + ':' + c + ':' + d + '::');
					return true;
				}
				function MerkColor(a, b)
				{
					var c = document.getElementsByName(a);
					for (var i = 0; i < c.length; i++)
					{
						c[i].style.color = (b) ? 'green' : 'red';
						c[i].parentNode.style.border = (b) ? '2px solid green' : '0px solid transparent';
					}
				}
				function SpioWert(a)
				{
					return a1.match(eval('/' + a + '([-0-9]+)/'))[1];
				}
				var flag = 0;
				var koords = new Array();
				var mlist = LadeAccEinst('merkliste');
				var trs = document.getElementsByTagName('tr');
				var Techniken = new Array('Technologie Armes', 'Technologie Bouclier', 'Technologie Protection des vaisseaux spatiaux');
				var Schiffe = new Array('Petit transporteur', 'Grand transporteur', 'Chasseur léger', 'Chasseur lourd', 'Croiseur', 'Vaisseau de bataille', 'Vaisseau de colonisation', 'Recycleur', 'Sonde espionnage', 'Bombardier', 'Satellite solaire', 'Destructeur', 'Étoile de la mort', 'Traqueur');
						var Verteidigung = new Array('Lanceur de missiles', 'Artillerie laser légère', 'Artillerie laser lourde', 'Canon de Gauss', 'Artillerie à ions', 'Lanceur de plasma', 'Petit bouclier', 'Grand bouclier');
				var Schiffe_und_Verteidigung = Schiffe.concat(Verteidigung);
				for (var i = 0; i < trs.length; i++)
				{
					var c1 = trs[i].innerHTML.indexOf('Matières premières sur') + 1;
					var c2 = trs[i].innerHTML.indexOf('Probabilité') + 1;
					if (c1 && c2 && ((flag) ? 1 : ((c1 && c2) ? !(flag = 1) : 0)))
					{
						var a1 = trs[i].innerHTML.replace(/<div(.*?)\/div>/g, '');
						var a2 = a1.match(/<(.*?)>/g);
						for (var j = 0; j < a2.length; j++) { a1 = a1.replace(a2[j], ''); }
						var code = '<br>&nbsp;<br>Simuler à partir de ce RE: <a target="_blank" href="http://websim.speedsim.net/index.php?lang=fr';
// Planetenname und Koordinaten
						if (a1.indexOf('Matières premières sur') + 1) { var enemy_nam = a1.match(/Matières premières sur (.*?) \[/)[1]; code += '&enemy_name=' + enemy_nam; }
						if (a1.indexOf('Matières premières sur') + 1) { var enemy_pos = a1.match(/\[(.*?)\]/)[1]; code += '&enemy_pos=' + enemy_pos; enemy_pos = enemy_pos.split(/:/g); }
						a1 = a1.replace(/\./g, '');
// Ressourcen
						if (a1.indexOf('Métal:') + 1) { var met = SpioWert('Métal:'); code += '&enemy_metal=' + met; met = parseInt(met, 10); }
						if (a1.indexOf('Cristal:') + 1) { var kris = SpioWert('Cristal:'); code += '&enemy_crystal=' + kris; kris = parseInt(kris, 10); }
						if (a1.indexOf('Deutérium:') + 1) { var deut = SpioWert('Deutérium:'); code += '&enemy_deut=' + deut; deut = parseInt(deut, 10); }
						if (a1.indexOf('Energie:') + 1) { var ener = SpioWert('Energie:'); ener = parseInt(ener, 10); } // benoetigt fuer Mondbestimmung
// Techniken
						for (var j = 0; j < Techniken.length; j++) { if (a1.indexOf(Techniken[j]) + 1) { code += '&tech_d0_' + j + '=' + SpioWert(Techniken[j]); } }
// Schiffe und Verteidigung
						for (var j = 0; j < Schiffe_und_Verteidigung.length; j++) { if (a1.indexOf(Schiffe_und_Verteidigung[j]) + 1) { code += '&ship_d0_' + j + '_b=' + SpioWert(Schiffe_und_Verteidigung[j]); } }
// Praktische Beute
						var ress0 = 0.5 * Math.max(met + kris + deut, Math.min(0.75 * (2 * met + kris + deut), 2 * met + deut));
						var ress_gt = Math.ceil(ress0 / 25000);
						var ress_kt = Math.ceil(ress0 / 5000);
						code += '"><span style="color:' + TextCol + ';"><b>SpeedSim Online</b></span></a> ou ';
						code += '<a target="_blank" href="http://drago-sim.com/?lang=french&referrer=ogame-script&scan=' + a1.replace(/\n/g, '') + '"><span style="color:' + TextCol + ';"><b>DragoSim 2</b></span></a>';
						code += '<br>Butin probable: <span style="color:' + TextCol + ';">' + Tausenderpunkte(Math.round(met / 2)) + ' Métal</span>, <span style="color:' + TextCol + ';">' + Tausenderpunkte(Math.round(kris / 2)) + ' Cristal</span>, <span style="color:' + TextCol + ';">' + Tausenderpunkte(Math.round(deut / 2)) + ' Deutérium</span>';
						code += '<br>Capacité totale de transport requise: <span style="color:' + TextCol + ';">' + Tausenderpunkte(Math.round(ress0)) + ' t</span> (<a target="_blank" href="http://board.ogame.fr/thread.php?postid=3203001#post3203001"><span style="color:' + TextCol + ';"><b>?</b></span></a>)';
						code += '<br>Transporteurs requis: ';
						code += '<span style="color:' + TextCol + ';">' + ress_gt + ' GTs</span> ou <span style="color:' + TextCol + ';">' + ress_kt + ' PTs</span><br>&nbsp;<br>';
						code += '<a target="_self" href="/game/index.php?page=flotten1&' + SID + '&galaxy=' + enemy_pos[0] + '&system=' + enemy_pos[1] + '&planet=' + enemy_pos[2] + '&planettype=' + ((enemy_nam.match(/(Lune)/g) || (enemy_nam.match(/Lune/g) && enemy_nam.length == 4 && !ener)) ? Typ_Mond : Typ_Plani) + '&target_mission=1"><span style="color:' + TextCol + ';"><b>Attaquer</b></span></a> ';
						code += '<a target="_self" href="#" onclick="javascript: return false;" name="' + enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2] + '"><b>Marquer</b></a><br>&nbsp;<br></center>';
						trs[i].innerHTML = trs[i].innerHTML.replace('</center>', code);
// Angreifen
						MerkColor(enemy_pos[0] + '_' + enemy_pos[1] + '_' + enemy_pos[2], mlist.match(eval('/' + enemy_pos[0] + ':' + enemy_pos[1] + ':' + enemy_pos[2] + '::/g')));
						koords.push(enemy_nam, enemy_pos[0], enemy_pos[1], enemy_pos[2]);
					}
				}
// Merkliste
				var MerkLinks = FindeXPath('//table[@width="519"]/tbody/tr/td/center/a[@href="#"]'); // Event onclick fuer Speicherfunktion der Koords geht nicht ueber innerHTML
				for (var i = 0; i < MerkLinks.length; i++)
				{
					MerkLinks[i].addEventListener('click', eval('function() { var test = Merkliste(\'' + koords[i * 4] + '\', \'' + koords[i * 4 + 1] + '\', \'' + koords[i * 4 + 2] + '\', \'' + koords[i * 4 + 3] + '\'); MerkColor(\'' + koords[i * 4 + 1] + '_' + koords[i * 4 + 2] + '_' + koords[i * 4 + 3] + '\', test); }'), true);
				}
			}
//---------------------------
// Statistikseiten erweitern
//---------------------------
// In den Stats
			if (Datei == 'stat' && SID)
			{
				if (LadeAccEinst('show_punkte_diff') == true) { PunkteDiff('statistik'); }
				function MarkPos() // markiere die uebergebene Position und scrolle zu ihr
				{
					if (!location.hash.length) { return; } // falls keine Position markiert wurde - abgang
					var Pos = InInt(location.hash.substr(1)); // markierte Position
					var PosZellen = FindeXPath('//tr/th[1]/text()[starts-with(string(),"' + Pos + '")]');
					if (!PosZellen.length) { return; } // falls kein Tag gefunden wurde - weg
					var PosZeile = PosZellen[0].parentNode.parentNode; // Zeile mit diesem Spieler
					PosZeile.scrollIntoView(); // Zelle anzeigen
//					for (var i = 0; i < PosZeile.childNodes.length; i++) // alle Kindknoten der Zeile
//					{
//						if (PosZeile.childNodes[i].nodeType == 1) { PosZeile.childNodes[i].style.fontSize = '13pt'; } // die ein Tag sind vergroessern
//					}
				}
// Formular bearbeiten, damit der Anker nicht uebernommen wird
				document.forms[0].action = '/game/index.php?page=stat&' + SID + '#';
				MarkPos(); // damit die returns funktionieren
			}
			else
			{
// in allen anderen Seiten, die Statistik-Links enthalten
				if (Datei == 'overview' || Datei == 'suche')
				{
// Stat-Links korrigieren
					var StatLinks = FindeXPath('//a[contains(@href,"page=stat")]'); // alle Stat-Links finden
					for (var i = 0; i < StatLinks.length; i++) // Links berarbeiten
					{
						var Pos = InInt(StatLinks[i].firstChild.nodeValue); // Position auf die verlinkt wird (steht im Text)
						if (Pos) { StatLinks[i].href += '#' + Pos; } // falls es eine Position ist, diese als Anker hintendransetzen (der Anker wird von diesem Skript interpretiert)
					}
				}
			}
//-----------------------------
// Die Imperiumansicht aendern
//-----------------------------
			if (Datei == 'imperium' && LadeAccEinst('imperium_calc_resis') == true)
			{
// Init Vars
				var Schnitt = 0;
				var ProdSumme = 0;
				var Summe = 0;
				var Rows = FindeXPath('//table[@width="750"]/tbody/tr');
				var impcode = '<b>Production journalière totale</b>';
				var impzahl = 1;
				var impseite = 0;
				for (var z = 0; z < Rows.length; z++)
				{
					var headers = Rows[z].getElementsByTagName('td');
					if (headers[0])
					{
						switcher = headers[0].innerHTML.substring(0, 3);
						//headers[0].innerHTML = 'test';
					}
					switch(switcher)
					{
						case 'Res':
// Ress
						{
							Summe = 0;
							Schnitt = 0;
							ProdSumme = 0;
							var Zellen = Rows[z].getElementsByTagName('th');
							if (Zellen.length > 0)
							{
								if (Zellen[0].innerHTML != 'Energie')
								{
									for (var i = 1; i < Zellen.length; i++)
									{
										var ress = Zellen[i].innerHTML;
										var ress_neu = ress.match(/ [\.0-9]+ /g);
										//Zellen[i].innerHTML = ress_neu[0].replace(/\./, '');
										if (ress_neu[0])
										{
											Summe += parseInt(ress_neu[0].replace(/\./g, ''));
										}
										if (ress_neu[1])
										{
											ProdSumme += parseInt(ress_neu[1].replace(/\./g, ''));
											impseite += parseInt(ress_neu[1].replace(/\./g, ''));
										}
									}
									if (Zellen[0])
									{
										if (impseite == 0) {Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>'; }
										if (impseite > 0) {Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;/&nbsp;&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(ProdSumme) + '</span>'; }
										if (impzahl == 1) {impcode += '<p>Métal:<br><span style="color:' + TextCol + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';}
										if (impzahl == 2) {impcode += 'Cristal:<br><span style="color:' + TextCol + ';">' + TausenderZahl(ProdSumme * 24) + '</span><br>';}
										if (impzahl == 3) {impcode += 'Deutérium:<br><span style="color:' + TextCol + ';">' + TausenderZahl(ProdSumme * 24) + '</span>';}
										impzahl++;
									}
								}
								else
								{
									var energie_zeile = z + 1; // variiert in verschiedenen Darstellungen
								}
							}
						}
						break;
						case 'Bât':
						{
							var Zellen = Rows[z].getElementsByTagName('th');
							if (Zellen.length > 0)
							{
								Schnitt = 0;
								for (var i = 1; i < Zellen.length; i++)
								{
									var handler = Zellen[i].innerHTML;
									var handler_neu = handler.match(/ [\.0-9]+ /g);
									if (handler_neu)
									{
										Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
										var mine = handler_neu[0].replace(/\./g, '');
										var nextmine = parseInt(mine.substr(1, 2)) + 1;
										var kosten = 0;
										var energie = 0;
										if (Zellen[0].innerHTML.indexOf('Mine de métal') + 1)
										{
											kosten = Kosten(60, 15, 0, 1.5, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Energie(1, nextmine) - Energie(1, (nextmine - 1));
											var f_energie = energie - energie_vorhanden;
											if (f_energie <= 0) { f_energie = Math.abs(f_energie); f_color = 'green'; f_z = '+'; } else { f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Mine de cristal') + 1)
										{
											kosten = Kosten(48, 24, 0, 1.6, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Energie(2, nextmine) - Energie(2, (nextmine - 1));
											var f_energie = energie - energie_vorhanden;
											if (f_energie <= 0) { f_energie = Math.abs(f_energie); f_color = 'green'; f_z = '+'; } else { f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Synthétiseur de deutérium') + 1)
										{
											kosten = Kosten(225, 75, 0, 1.5, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Energie(3, nextmine) - Energie(3, (nextmine - 1));
											var f_energie = energie - energie_vorhanden;
											if (f_energie <= 0) { f_energie = Math.abs(f_energie); f_color = 'green'; f_z = '+'; } else { f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Centrale électrique solaire') + 1)
										{
											kosten = Kosten(75, 30, 0, 1.5, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Energie(4, nextmine) - Energie(4, (nextmine - 1));
											var f_energie = energie + energie_vorhanden;
											if (f_energie >= 0) { f_color = 'green'; f_z = '+'; } else { f_energie = Math.abs(f_energie); f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Centrale électrique de fusion') + 1)
										{
											kosten = Kosten(900, 360, 180, 1.8, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Energie(12, nextmine) - Energie(12, (nextmine - 1));
											var f_energie = energie + energie_vorhanden;
											if (f_energie >= 0) { f_color = 'green'; f_z = '+'; } else { f_energie = Math.abs(f_energie); f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Usine de robots') + 1)
										{
											kosten = Kosten(400, 120, 200, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Usine de nanites') + 1)
										{
											kosten = Kosten(1000000, 500000, 100000, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Chantier spatial') + 1)
										{
											kosten = Kosten(400, 200, 100, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Hangar de métal') + 1)
										{
											kosten = Kosten(2000, 0, 0, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Hangar de cristal') + 1)
										{
											kosten = Kosten(2000, 1000, 0, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Réservoir de deutérium') + 1)
										{
											kosten = Kosten(2000, 2000, 0, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Laboratoire de recherche') + 1)
										{
											kosten = Kosten(200, 400, 200, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Terraformeur') + 1)
										{
											kosten = Kosten(0, 50000, 100000, 2, nextmine);
											var energie_vorhanden_pos = FindeXPath('//table/tbody/tr[' + energie_zeile + ']/th[' + (i + 1) + ']');
											var e_v_1 = energie_vorhanden_pos[0].innerHTML;
											var e_v_2 = e_v_1.match(/ [\-\.0-9]+ /g);
											var energie_vorhanden = parseInt(e_v_2[0].replace(/\./g, ''));
											energie = Math.floor(1000 * Math.pow(2, (nextmine - 1)), 0);
											var f_energie = energie - energie_vorhanden;
											if (f_energie <= 0) { f_energie = Math.abs(f_energie); f_color = 'green'; f_z = '+'; } else { f_color = 'red'; f_z = '-'; }
										}
										if (Zellen[0].innerHTML.indexOf('Dépôt de ravitaillement') + 1)
										{
											kosten = Kosten(20000, 40000, 0, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Silo de missiles') + 1)
										{
											kosten = Kosten(20000, 20000, 1000, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Base lunaire') + 1)
										{
											kosten = Kosten(20000, 40000, 20000, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Phalange de capteur') + 1)
										{
											kosten = Kosten(20000, 40000, 20000, 2, nextmine);
										}
										if (Zellen[0].innerHTML.indexOf('Porte de saut spatial') + 1)
										{
											kosten = Kosten(2000000, 4000000, 2000000, 2, nextmine);
										}
										Zellen[i].innerHTML = Zellen[i].innerHTML + ((kosten[0] > 0) ? '<br>M: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[0].toString()) + '</span>' : '') + ((kosten[1] > 0) ? '<br>C: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[1].toString()) + '</span>' : '') + ((kosten[2] > 0) ? '<br>D: <span style="color:' + TextCol + ';">' + TausenderZahl(kosten[2].toString()) + '</span>' : '') + ((energie > 0) ? '<br>E: <span style="color:' + TextCol + ';">' + TausenderZahl(energie.toString()) + '</span> (<span style="color:' + f_color + ';">' + f_z + TausenderZahl(f_energie.toString()) + '</span>)' : '');
									}
								}
								Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
								if (Zellen[0])
								{
									Zellen[0].innerHTML = Zellen[0].innerHTML + '<br />&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
								}
							}
						}
						break;
						case 'Rec':
						{
							var Zellen = Rows[z].getElementsByTagName('th');
							if (Zellen.length > 0)
							{
								Schnitt = 0;
								for (var i = 1; i < Zellen.length; i++)
								{
									var handler = Zellen[i].innerHTML;
									var handler_neu = handler.match(/ [\.0-9]+ /g);
									if (handler_neu) { Schnitt = parseInt(handler_neu[0].replace(/\./g, '')); }
								}
								if (Zellen[0])
								{
									Zellen[0].innerHTML = Zellen[0].innerHTML + '<br /><span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
								}
							}
						}
						break;
						case 'Vai':
						{
							var Zellen = Rows[z].getElementsByTagName('th');
							if (Zellen.length > 0)
							{
								Summe = 0;
								Schnitt = 0;
								for (var i = 1; i < Zellen.length; i++)
								{
									var handler = Zellen[i].innerHTML;
									var handler_neu = handler.match(/ [\.0-9]+ /g);
									if (handler_neu)
									{
										Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
										Summe += parseInt(handler_neu[0].replace(/\./g, ''));
									}
								}
								Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
								if (Zellen[0])
								{
									Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
								}
							}
						}
						break;
						case 'Déf':
						{
							var Zellen = Rows[z].getElementsByTagName('th');
							if (Zellen.length > 0)
							{
								Summe = 0;
								Schnitt = 0;
								for (var i = 1; i < Zellen.length; i++)
								{
									var handler = Zellen[i].innerHTML;
									var handler_neu = handler.match(/ [\.0-9]+ /g);
									if (handler_neu)
									{
										Schnitt += parseInt(handler_neu[0].replace(/\./g, ''));
										Summe += parseInt(handler_neu[0].replace(/\./g, ''));
									}
								}
								Schnitt = Math.round((Schnitt / (i - 1)) * 100) / 100;
								if (Zellen[0])
								{
									Zellen[0].innerHTML = Zellen[0].innerHTML + '<br>&Sigma;<span style="color:' + TextCol + ';"> ' + TausenderZahl(Summe) + '</span>&nbsp;&nbsp;&nbsp;&Oslash;<span style="color:' + TextCol + ';"> ' + Schnitt + ' </span>';
								}
							}
						}
						break;
					}
				}
				if (impseite > 0)
				{
					var LeerFeld = FindeXPath('//table/tbody/tr[2]/th[1]');
					if (LeerFeld[0].innerHTML == '')
					{
						LeerFeld[0].setAttribute('style', 'vertical-align:top;');
						LeerFeld[0].innerHTML = impcode;
					}
					else
					{
						var LeerFeld = FindeXPath('//table/tbody/tr[3]/th[1]');
						LeerFeld[0].setAttribute('style', 'vertical-align:top;');
						LeerFeld[0].innerHTML = impcode;
					}
				}
			} // Ende der Imperium-Erweiterungen
//---------------------------------------
// Memberliste bereits sortiert anzeigen
//---------------------------------------
			if (Datei == 'allianzen')
			{
				if (document.URL.match(/sort1=/))
				{
					if (LadeAccEinst('show_punkte_diff') == true) { PunkteDiff('memberliste'); }
				}
				else
				{
					if (!document.URL.match(/a=/) && !ContDiv.innerHTML.match(/a=1"/))
					{
						var ML_Link = FindeXPath('//table[@width="519"]/tbody/tr[4]/th[2]/a[1]')[0];
						if (ML_Link.innerHTML.indexOf('Liste des membres') + 1 && LadeAccEinst('ml_sort'))
						{
							var LinkNeu = ML_Link.href + '&sort1=' + LadeAccEinst('ml_typ') + '&sort2=' + LadeAccEinst('ml_art');
							ML_Link.setAttribute('href', LinkNeu);
						}
					}
				}
			}
//------------------
// Die Gala aendern
//------------------
// In der Gala
			if (Datei == 'galaxy' && LadeAccEinst('tf_limit') >= 0)
			{
				var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
				for (var i = 1; i < 16; i++)
				{
					var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()=' + i + ']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthaelt
					if (!(FoxGameVerkl + 1)) { FoxGameVerkl = (FindeXPath('th[8]', Zeile).length) ? 0 : 1; } // wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
					var PlaniName = (!FoxGameVerkl) ? FindeXPath('th[3]', Zeile)[0] : FindeXPath('th[2]', Zeile)[0];
					var TFInhalt = (!FoxGameVerkl) ? FindeXPath('th[5]', Zeile)[0] : FindeXPath('th[4]', Zeile)[0];
					var aHref = TFInhalt.getElementsByTagName('a')[0];
					if (aHref)
					{
						var TFM = InInt(aHref.getAttribute('onmouseover').match(/Métal :<\/th><th>([.0-9]+)/)[1]);
						var TFK = InInt(aHref.getAttribute('onmouseover').match(/Cristal :<\/th><th>([.0-9]+)/)[1]);
						if (TFM + TFK >= LadeAccEinst('tf_limit'))
						{
							PlaniName.appendChild(document.createElement('br'));
							PlaniName.appendChild(NeuesElement('span', '(M: ' + TausenderZahl(TFM) + ', C: ' + TausenderZahl(TFK) + ')', 'style', 'color:' + TextCol + ';'));
						}
					}
				}
			}
//----------------------------------
// Die Gala aendern (Platz Spieler)
//----------------------------------
// In der Gala
			if (Datei == 'galaxy' && LadeAccEinst('platz_anzeige'))
			{
				var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
				for (var i = 1; i < 16; i++)
				{
					var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()=' + i + ']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthaelt
					if (!(FoxGameVerkl + 1)) { FoxGameVerkl = (FindeXPath('th[8]', Zeile).length) ? 0 : 1; } // wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
					var PlayerName = (!FoxGameVerkl) ? FindeXPath('th[6]', Zeile)[0] : FindeXPath('th[5]', Zeile)[0];
					var aHref = PlayerName.getElementsByTagName('a')[0];
					if (aHref)
					{
						if (!PlayerName.getElementsByTagName('span')[0].innerHTML.length) { continue; } // oGame v0.77 fix (iI) Geisterspieler
						var Platz = TausenderZahl(parseInt(aHref.getAttribute('onmouseover').match(/classé ([.0-9]+)/)[1], 10));
						Platz = (Platz) ? Platz.toString() : '-';
						PlayerName.appendChild(document.createElement('br'));
						PlayerName.appendChild(NeuesElement('span', '(# ' + Platz  + ')', 'style', 'color:' + TextCol + ';'));
					}
				}
			}
//-------------------------------------------------
// Die Gala aendern (Platz Ally/Anzahl Mitglieder)
//-------------------------------------------------
// In der Gala
			if (Datei == 'galaxy' && LadeAccEinst('allyplatz_anzeige'))
			{
				var FoxGameVerkl = -1; // speichert, ob FoxGame die Gala verkleinert hat
				for (var i = 1; i < 16; i++)
				{
					var Zeile = FindeXPath('//table[@width="569"]/tbody/tr[th[1][a[1][text()=' + i + ']]]')[0]; //Tabellenzeile, deren erste Tabellenzelle im Text des ersten Links die Position enthaelt
					if (!(FoxGameVerkl + 1)) { FoxGameVerkl = (FindeXPath('th[8]', Zeile).length) ? 0 : 1; } // wenn es keine 8. Spalte mehr gibt war hier wohl FoxGame am Werk
					var AllyName = (!FoxGameVerkl) ? FindeXPath('th[7]', Zeile)[0] : FindeXPath('th[6]', Zeile)[0];
					var aHref = AllyName.getElementsByTagName('a')[0];
					if (aHref)
					{
						var AlPlatz = TausenderZahl(parseInt(aHref.getAttribute('onmouseover').match(/classée ([.0-9]+)/)[1], 10));
						AlPlatz = (AlPlatz) ? AlPlatz.toString() : '-';
						var AnzMtgl = TausenderZahl(parseInt(aHref.getAttribute('onmouseover').match(/avec ([.0-9]+)/)[1], 10));
						AnzMtgl = (AnzMtgl) ? AnzMtgl.toString() : '-';
						AllyName.appendChild(document.createElement('br'));
						AllyName.appendChild(NeuesElement('span', '(# ' + AlPlatz + '/' + AnzMtgl + ')', 'style', 'color:' + TextCol + ';'));
					}
				}
			}
//------------------------
// allgemeine Korrekturen
//------------------------
// title-Tags bearbeiten
			if (Datei == 'overview' || Datei == 'galaxy' || Datei == 'flotten1')
			{
				var Links = FindeXPath('//div[@id="content"]//a');
				for (var i = 0; i < Links.length; i++)
				{
					if (!Links[i].title || Links[i].title.search(/^[0-9]+$/) + 1) { continue; } // bei nur aus Zahlen bestehenden Titeln nichts tun (das sind die Counter)
					if (Datei == 'overview')
					{
						Links[i].title = Links[i].title.replace(/([0-9])([A-Z])/g, '$1, $2');
					}
					else
					{
						if (Datei == 'flotten1' && (Links[i].title.indexOf('Vitesse: ') + 1 || Links[i].title.indexOf('Speed: ') + 1))
						{
							Links[i].setAttribute('class', 'geschw_anzeige');
						}
						if (LadeAccEinst('tausenderpkt'))
						{
							Links[i].title = TausenderString(Links[i].title); // Punkte einfuegen
						}
					}
				}
			}
//-----------------------------
// Phalanx erweitern
//-----------------------------
			if (Datei == 'phalanx')
			{
			alert("hi")
			var vBXX = FindeXPath('//div[contains(@id, "bxx")]');
				if (vBXX)
				{
				alert("hi")
				var vTitle = vBXX[0].getAttribute('title');
				alert(vTitle)
				}
			}
//-----------------------------
// Einstellungsmenue erweitern
//-----------------------------
// In den Einstellungen
			if (Datei == 'options')
			{
				function Speichere()
				{
// (De)aktivierung speichern
		
					SpeichAccEinst('colored_ress', document.getElementById('colored_ress').checked);
					SpeichAccEinst('color_met', ColorChk(document.getElementById('color_met').value));
					SpeichAccEinst('color_kris', ColorChk(document.getElementById('color_kris').value));
					SpeichAccEinst('color_deut', ColorChk(document.getElementById('color_deut').value));
					SpeichAccEinst('color_eng', ColorChk(document.getElementById('color_eng').value));
					SpeichAccEinst('skin_advance', document.getElementById('skin_advance').checked);
					SpeichAccEinst('planiliste_aend', document.getElementById('planiliste_aend').checked);
					SpeichAccEinst('fehlress_als_text', document.getElementById('fehlress_als_text').checked);
					SpeichAccEinst('zeit_links', document.getElementById('zeit_links').checked);
					SpeichAccEinst('ang_zeit', document.getElementById('ang_zeit').checked);
					SpeichAccEinst('ml_sort', document.getElementById('ml_sort').checked);
					SpeichAccEinst('ankft_zeit', document.getElementById('ankft_zeit').checked);
					SpeichAccEinst('flotten_zusatz', document.getElementById('flotten_zusatz').checked);
					SpeichAccEinst('flotten_faerben', document.getElementById('flotten_faerben').checked);
					SpeichAccEinst('owntrancolor', ColorChk(document.getElementById('owntrancolor').value));
					SpeichAccEinst('ownstatcolor', ColorChk(document.getElementById('ownstatcolor').value));
					SpeichAccEinst('ownaggrcolor', ColorChk(document.getElementById('ownaggrcolor').value));
					SpeichAccEinst('ownspiocolor', ColorChk(document.getElementById('ownspiocolor').value));
					SpeichAccEinst('ownharvcolor', ColorChk(document.getElementById('ownharvcolor').value));
					SpeichAccEinst('owncolocolor', ColorChk(document.getElementById('owncolocolor').value));
					SpeichAccEinst('forpeaccolor', ColorChk(document.getElementById('forpeaccolor').value));
					SpeichAccEinst('foraggrcolor', ColorChk(document.getElementById('foraggrcolor').value));
					SpeichAccEinst('schiffs_geschw', document.getElementById('schiffs_geschw').checked);
					SpeichAccEinst('fltmenu_buttons', document.getElementById('fltmenu_buttons').checked);
					SpeichAccEinst('auto_auftrag', document.getElementById('auto_auftrag').checked);
					SpeichAccEinst('platz_anzeige', document.getElementById('platz_anzeige').checked);
					SpeichAccEinst('pranger', document.getElementById('pranger').checked);
					SpeichAccEinst('smallbuildings', document.getElementById('smallbuildings').checked);
					SpeichAccEinst('small_faerben', document.getElementById('small_faerben').checked);
					SpeichAccEinst('smallbcolor', (document.getElementById('smallbcolor').value.toLowerCase() != "transparent") ? ColorChk(document.getElementById('smallbcolor').value) : "transparent");
					SpeichAccEinst('smallbbcolor', (document.getElementById('smallbbcolor').value.toLowerCase() != "transparent") ? ColorChk(document.getElementById('smallbbcolor').value) : "transparent");
					SpeichAccEinst('smallpx', document.getElementById('smallpx').value);
					SpeichAccEinst('smallweg', document.getElementById('smallweg').checked);
					SpeichAccEinst('transbuild', document.getElementById('transbuild').checked);
					SpeichAccEinst('allyforum', document.getElementById('allyforum').value);
					SpeichAccEinst('calc', document.getElementById('calc').value);
					SpeichAccEinst('galatool', document.getElementById('galatool').value);
					SpeichAccEinst('exstats', document.getElementById('exstats').value);
					SpeichAccEinst('savekb', document.getElementById('savekb').value);
					SpeichAccEinst('warnung', document.getElementById('warnung').checked);
					SpeichAccEinst('spio', document.getElementById('spio').checked);
					SpeichAccEinst('skriptcolor', ColorChk(document.getElementById('skriptcolor').value));
					SpeichAccEinst('handelsrechner', document.getElementById('handelsrechner').checked);
					SpeichAccEinst('kursmet', document.getElementById('kursmet').value);
					SpeichAccEinst('kurskris', document.getElementById('kurskris').value);
					SpeichAccEinst('kursdeut', document.getElementById('kursdeut').value);
					SpeichAccEinst('allyplatz_anzeige', document.getElementById('allyplatz_anzeige').checked);
					SpeichAccEinst('show_punkte_diff', document.getElementById('show_punkte_diff').checked);
					SpeichAccEinst('tausenderpkt', document.getElementById('tausenderpkt').checked);
					SpeichAccEinst('endzeiten', document.getElementById('endzeiten').checked);
					SpeichAccEinst('bewegteress', document.getElementById('bewegteress').checked);
					SpeichAccEinst('imperium_calc_resis', document.getElementById('imperium_calc_resis').checked);
					SpeichAccEinst('left_menu_fix', document.getElementById('left_menu_fix').checked);
// Konfiguration speichern
					var defplani = document.getElementById('def_plani');
					SpeichAccEinst('def_plani', defplani.options[defplani.selectedIndex].value);
					var mltyp = document.getElementById('ml_typ');
					SpeichAccEinst('ml_typ', mltyp.options[mltyp.selectedIndex].value);
					var mlart = document.getElementById('ml_art');
					SpeichAccEinst('ml_art', mlart.options[mlart.selectedIndex].value);
					SpeichAccEinst('kein_deut', document.getElementById('kein_deut').checked);
					SpeichAccEinst('monde_getrennt', document.getElementById('monde_getrennt').checked);
					SpeichAccEinst('stationieren_vorz', document.getElementById('stationieren_vorz').checked);
					SpeichAccEinst('keine_planinamen', document.getElementById('keine_planinamen').checked);
					SpeichAccEinst('hp_oben', document.getElementById('hp_oben').checked);
					var MaxTabBreite = parseInt(document.getElementById('max_tab_breite').value, 10);
					if (MaxTabBreite < 520 || MaxTabBreite > 1000 || isNaN(document.getElementById('max_tab_breite').value))
					{
						MaxTabBreite = 1000;
						alert('La largeur des tableaux n\'est pas valide (trop grande, trop petite ou nulle), elle est remise à 1000.');
					}
					SpeichAccEinst('max_tab_breite', MaxTabBreite);
					var TFLimit = parseInt(document.getElementById('tf_limit').value, 10);
					if (TFLimit < -1 || isNaN(document.getElementById('tf_limit').value))
					{
						TFLimit = 100000;
					}
					SpeichAccEinst('tf_limit', TFLimit);
// Speichern fertig
					window.alert('Modifications sauvegardées avec succès! Les effets sont théoriquements immédiats.');
					location.href = 'http://' + Server + '/game/index.php?page=options&' + SID;
				}
				function reiter(id) // Dynamische Menues nach Code Badhard
				{
					var kartei = document.getElementById('r' + id);
					(kartei.style.display == 'none') ? kartei.style.display = 'table-row-group' : kartei.style.display = 'none';
				}
				unsafeWindow.reiter = reiter;
				function createCheck(id, header, content, def)
				{
					var code = '';
					code += '<tr><th>'+header+'</th><th>' + content + '</th><th><input type="checkbox" id="' + id + '"';
					if (LadeAccEinst(id, def)) { code += ' checked'; }
					code += '></th></tr>';
					return code;
				}
				function createEdit(id, header, content, size, maxlength) 
				{
					var code = '<tr><th>'+header+'</th><th>' + content + '</th><th>';
					var laenge = (size) ? size : 20;
						code += '<input type="text" id="' + id + '" size="' + laenge + '" '
					if(maxlength) code += 'maxlength="' + maxlength + '" '
						code += 'value="' + LadeAccEinst(id) + '"></th></tr>';
					return code;
				}
				function createColTxt(id,header,content)
				{
					var code = '<tr><th>'+header+'</th><th>' + content + AddColorSel(id) + '</th><th>';
						code += '<input type="text" id="' + id + '" size="10" value="' + LadeAccEinst(id) + '"></th></tr>';
					return code;				
				}
				function createInfo(content)
				{
					var code = '';
						code += '<tr><th style="color: '+LadeAccEinst('skriptcolor')+'">'+content+'</th><th colspan="2"></th></tr>';
					return code;
				}
				function createHeader(header)
				{
					HID++;
					var code = '';
					code += '<tbody><tr><td colspan="3" class="c" onclick="reiter(' + HID + ')">';
					code += header;
					code += '</td></tr></tbody><tbody colspan="3" id="r' + HID + '" style="display:none;">';
					return code;
				}				

				
				var ContDivCtr = ContDiv.getElementsByTagName('center')[0];
				ContDivCtr.appendChild(NeuesElement('span', '&nbsp;<br>OGame-Skript<br>&nbsp;', 'style', 'font-size: 12pt; font-weight: bold;'));
				var NeuTab = NeuesElement('table', '', 'align', 'center', 'width', '519');
				var HID = 0;
				var Code = '';
// Allgemeine Konfiguration
				Code += createHeader('Modifications Générales >>>');
				Code += createCheck('skin_advance', 'Skin Amélioration', 'Autoriser des modifications portant au style des pages.');
				Code += createColTxt('skriptcolor','Couleur Script','Couleur des textes ajoutés par OGameSkript.');
				Code += createEdit('max_tab_breite','Largeur Tableau','Largeur maximale des tableaux en pixel. (entre 520 et 1.000)',5,4);
				Code += createCheck('left_menu_fix', 'Menu Fixe', 'Fixer le Menu de gauche. (si activé, le menu reste fixe par rapport aux déplacements de la page centrale (aspect similaire à la version 0.76))');
				Code += createCheck('tausenderpkt','Points de Milliers','Mettre des points tout les milliers.');
				Code += createCheck('show_punkte_diff','Différences Points','Afficher les différences de points sur les pages Statistiques et Liste des Membres.');
				Code += createCheck('endzeiten','Fin Construction','Afficher la date de fin de construction. (Technologie, Bâtiment...)');
				Code += createCheck('spio','Simulation RE','Ajout d\'un lien pour Simuler un combat à partir d\'un RE.');
// Allyforum
				Code += createEdit('allyforum','Forum Alliance','Page d\'accueil du Forum de l\'Alliance. (laissez vide si aucun)');
// oGame Rechner	
				Code += createEdit('calc','Ogame Rechner','Page d\'accueil d\'OGame Rechner. (laissez vide si aucun)');
// Galatool
				Code += createEdit('galatool','Galaxy-Tool','Page d\'accueil de Galaxy Tool. (laissez vide si aucun)');
// Externe Stats
				Code += createEdit('exstats','Ex-Stats','Page d\'accueil de Stats Externes. (laissez vide si aucun)');
// SaveKB
				Code += createEdit('savekb','Save KB','Page d\'accueil d\'un serveur SaveKB. (laissez vide si aucun)');
// Pranger
				Code += createCheck('pranger', 'Piloris', 'Ajouter un lien vers le piloris.');
// Memberliste Default-sortieren
				Code += createCheck('ml_sort','Tri Membres','Trier la liste des membres de l\'alliance.');
				Code += '<tr><th></th><th>Trier la liste des membres par (Type)</th><th><select id="ml_typ">';
				for (var i = 0; i < MLTyp.length; i++)
				{
					Code += '<option value="' + i + '"';
					if (i == LadeAccEinst('ml_typ')) { Code += ' selected'; }
					Code += '>' + MLTyp[i] + '</option>';
				}
				Code += '</select></th></tr>';
				Code += '<tr><th></th><th>Trier la liste des membres par (Ordre)</th><th><select id="ml_art">';
				for (var i = 0; i < MLArt.length; i++)
				{
					Code += '<option value="' + i + '"';
					if (i == LadeAccEinst('ml_art')) { Code += ' selected'; }
					Code += '>' + MLArt[i] + '</option>';
				}
				Code += '</select></th></tr>';
// Planetenliste einstellen
				Code += createCheck('planiliste_aend','Tri Planète','Remanier la liste des Planètes.');
				Code += createCheck('hp_oben','PM prioritaire','Placer la Planète Mère en haut de liste. (sans modifier le reste)');
				Code += createCheck('keine_planinamen','Liste Simplifiée','Ne pas afficher les noms des Planètes et Lunes (juste les Coordonnées et <i>(L)</i> pour les Lunes)');
				Code += createCheck('monde_getrennt','Séparer Lunes','Séparer les Lunes des Planètes dans la liste.');
				Code += '</tbody>';
// Konfiguration der Uebersicht
				Code += createHeader('Modification de la page Vue générale >>>');
				Code += createCheck('flotten_zusatz','Composition Flottes','Afficher la composition des flottes en vol.');
				Code += createCheck('flotten_faerben','Coloration Flottes','Coloration des flottes en vol.');
				Code += createColTxt('owntrancolor','Couleur Transporter','Couleur des vos flottes en mode Transport');
				Code += createColTxt('ownstatcolor','Couleur Stationner', 'Couleur des vos flottes en mode Stationner');
				Code += createColTxt('ownaggrcolor','Couleur Attaquer','Couleur des vos flottes en mode Attaquer/Détruire');
				Code += createColTxt('ownspiocolor','Couleur Espionner','Couleur des vos flottes en mode Espionner');
				Code += createColTxt('ownharvcolor','Couleur Recycler','Couleur des vos flottes en mode Recycler');
				Code += createColTxt('owncolocolor','Couleur Coloniser','Couleur des vos flottes en mode Coloniser');
				Code += createColTxt('forpeaccolor','Couleur Tra/Sta Allié','Couleur des flottes en mode Transporter/Stationner (Allié)');
				Code += createColTxt('foraggrcolor','Couleur ennemie','Couleur des flottes en mode Espionner/Attaquer/Détruire');
				Code += createCheck('zeit_links','Heure Menu','Afficher l\'heure en temps réel dans le menu de gauche.');
				Code += createCheck('ang_zeit','Heure Dynamique','Afficher l\'heure en temps réel dans la Vue générale. (inutile avec l\'option précédente)');
				Code += createCheck('bewegteress','Transit','Afficher les ressources en transit.');
				Code += createCheck('handelsrechner','Convertisseur','Afficher le convertisseur de ressources.');
				Code += '<tr><th></th><th>Taux d\'échange</th>';
				Code += '<th><input type="text" id="kursmet" value="' + LadeAccEinst('kursmet') + '" size="3">:';
				Code += '<input type="text" id="kurskris" value="' + LadeAccEinst('kurskris') + '" size="3">:';
				Code += '<input type="text" id="kursdeut" value="' + LadeAccEinst('kursdeut') + '" size="3"></th></tr>';
				Code += '</tbody>';
// Konfiguration der Imperium-Ansicht
				Code += createHeader('Modification de la page Empire >>>');
				Code += createCheck('imperium_calc_resis','Informations','Ajout d\'informations dans l\'Empire.');
				Code += '</tbody>';
// Konfiguration der Bauseiten
				Code += createHeader('Modification des pages de construction >>>');
				Code += createCheck('fehlress_als_text','Ressources Manquantes','Afficher les ressources manquantes à une construction (uniquement Compte Commandant)');
				Code += createCheck('transbuild','Cargos Requis','Afficher les Cargos nécessaires au transport des ressources de la construction.');
				Code += createCheck('colored_ress','Coloration Ressources','Associe une couleur aux ressources manquantes à une amélioration.');
				Code += createColTxt('color_met','Métal','Couleur pour le Métal');
				Code += createColTxt('color_kris','Cristal','Couleur pour le Cristal');
				Code += createColTxt('color_deut','Deutérium','Couleur pour le Deutérium');
				Code += createColTxt('color_eng','Energie','Couleur pour l\'Energie');
				Code += '</tbody>';
// Bauseiten-Verkleinerung Konfigurieren
				Code += createHeader('Modification du style des pages de construction >>>');
				Code += createCheck('smallbuildings','Réduire Pages','Supprimer les textes descriptifs inutiles.');
				Code += createCheck('small_faerben','Modifications Cadres','Autoriser les modifications des cadres et images.');
				Code += createColTxt('smallbcolor','Couleur Cadres','Couleur de fond des cadres');
				Code += createColTxt('smallbbcolor','Couleur Cadres','Couleur des bordures de cadres');
				Code += createEdit('smallpx','Taille Images','Régler la taille des images (p-e 60, 120, ...)',4,3);
				Code += createCheck('smallweg','Images','Supprimer les images descriptives. (plus de place pour le reste)');
				Code += '</tbody>';
// Konfiguration des Flotten-Menues
				Code += createHeader('Modification des pages Flottes >>>');
				Code += createCheck('fltmenu_buttons','Boutons Supplément.','Ajouter des boutons dans les Menus Flotte.');
				Code += createCheck('warnung','Alertes','Autoriser les alertes de cargos.');
				Code += createCheck('schiffs_geschw','Informations','Afficher les vitesses des vaisseaux.');
				Code += createCheck('ankft_zeit','Temps restant','Afficher les heures d\'arrivée (retour). (dynamique)');
				Code += createCheck('auto_auftrag','Sélection Auto.','Sélectionner automatiquement la mission.');
				Code += '<tr><th></th><th>Planète par défaut. (pour envoyer rapidement les ressources...)</th><th><select id="def_plani">';
				for (var i = 1; i < Planis.length; i++)  // Ueber alle Planis
				{
					Code += '<option value="' + Planis[i]['ID'] + '"';
					if (Planis[i]['ID'] == LadeAccEinst('def_plani', HP_ID)) { Code += ' selected'; }
					Code += '>';
					if (Planis[i]['Typ'] == Typ_Mond) { Code += ' - '; }
					Code += Planis[i]['Text'] + '</option>';
				}
				Code += '</select></th></tr>';
				Code += createCheck('kein_deut','Priorité Deutérium','Conserver le Deutérium (non pris en compte dans les envois).');
				Code += createCheck('stationieren_vorz','Priorité Stationner','Préférer l\'ordre Stationner au Transport.');
				Code += '</tbody>';
// Konfiguration der Galaxie-Ansicht
				Code += createHeader('Modification de la page Galaxie >>>');
				Code += createEdit('tf_limit','Limite CDR','Seuil de Débris (Au delà de ce seuil, les champs de débris sont clairement indiqués. -1 désactive l\'affichage)');
				Code += createCheck('platz_anzeige','Joueurs','Afficher le classement des Joueurs.');
				Code += createCheck('allyplatz_anzeige','Alliances','Afficher le classement des Alliances.');
				Code += '</tbody>';
				NeuTab.innerHTML = Code;
// Speicher-Zeile (manuell um die onclick-routine zuzuweisen)
				NeuZeile = NeuesElement('tr', '');
				NeuZelle = NeuesElement('th', '', 'colspan', '3');
				var NeuBtn = NeuesElement('input', '', 'type', 'button', 'value', 'Sauvegarder les changements');
				NeuBtn.addEventListener('click', Speichere, true);
				NeuZelle.appendChild(NeuBtn);
				NeuZeile.appendChild(NeuZelle);
				NeuTab.appendChild(NeuZeile);
// Tabelle einbauen
				ContDivCtr.appendChild(NeuTab);
// Lizenz-Tabelle, falls eine Version bekannt ist
				if (GM_getValue('version', 0))
				{
					ContDivCtr.appendChild(document.createElement('br'));
					ContDivCtr.appendChild(document.createElement('br'));
					NeuTab = NeuesElement('table', '', 'align', 'center', 'width', '519');
					Code = '<tr><td class="c" colspan="2">Licence OGame-Skript</td></tr>';
					Code += '<tr><th style="text-align:left;">OGame-Skript v' + GM_getValue('version', '1.0') + ', un Script Greasemonkey, développé pour OGame, permet d\'en élargir les fonctionnalités.<br />Copyright (C) 2006-2007 Windows, depuis Mars 2007 Eleria &amp; Co (voir <a href="http://board.ogame.de/thread.php?threadid=435082" target="_blank">Thread du Forum OGame</a>), depuis Juillet 2007 hakaz &amp; Groupe d\'Utilisateur du Forum OGame (voir <a href="http://allianz-sarin.de/Ogamescript/team.html" target="_blank">Team</a>)</th></tr>';
					Code += '<tr><th style="text-align:left;">Ce programme est un  logiciel libre. Vous pouvez le transmettre sous les conditions de la GNU General Public License, comme le publier et/ou le modifier selon la version 2 de la licence de la Free Software Foundation.</th></tr>';
					Code += '<tr><th style="text-align:left;">La publication de ce programme se produit dans l\'espoir d\une quelconque utilité, mais SANS AUCUNE GARANTIE, même sans la garantie implicite de la maturité du marché ou de l\'utilité pratique en un but déterminé. De plus amples détails peuvent être trouvés auprès de la GNU General Public License.</th></tr>';
					Code += '<tr><th style="text-align:left;">Pour plus d\'informations, consulter directement la GPL sur Internet à: <a href="http://www.gnu.org/licenses/gpl.html" target="_blank">http://www.gnu.org/licenses/gpl.html</a><br />Vous pouvez également écrire à la Free Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA.</th></tr>';
					NeuTab.innerHTML = Code;
					ContDivCtr.appendChild(NeuTab);
				}
			}
//----------------
// Skin erweitern
//----------------
		if (LadeAccEinst('skin_advance')) {
			var CSSStr = '#content table { empty-cells:show; }';
			switch(Datei) // Idee von Badhard
			{
				case 'phalanx':
				{
// Schiffe in der Phalanx anzeigen
					CSSStr += 'a[title]:after { content:" ("attr(title)")"; color:#009999; }';
				}
				break;
				case 'flotten1':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
// erforderliche GT/KT anzeigen + Schiffsgeschwindigkeiten anzeigen
					if (LadeAccEinst('schiffs_geschw'))
					{
						CSSStr += 'a[title]:after { content:" ("attr(title)")"; color:' + TextCol + '; }';
						CSSStr += 'a.geschw_anzeige:after { content:" ("attr(title)")"; color:#009999; }';
					}
				}
				break;
				case 'messages':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="519"] { width:' + TabBreite(800, 519) + 'px; }';
// Spioberichte zentrieren
					var Tabs = FindeXPath('//table[@width="400"]');
					for (var i = 0; i < Tabs.length; i++) { Tabs[i].align = 'center'; }
				}
				break;
				case 'options':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="519"] { width:' + TabBreite(650, 519) + 'px; }';
				}
				break;
				case 'resources':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="500"] { width:' + TabBreite(550, 500) + 'px; }';
				}
				break;
				case 'galaxy':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="569"] { width:' + TabBreite(700, 569) + 'px; }';
				}
				break;
  				case 'overview':
				{
// Tabellen breiter machen
					CSSStr += 'table[width="519"] { width:' + TabBreite(1000, 519) + 'px; }';
// Planibilder zentrieren
					var Tabs = FindeXPath('//th[@class="s"]/table[@align="top"]');
					if (Tabs.length) { Tabs[0].align = 'center'; }
// Flotten in der Uebersicht umfaerben und Zusaetze anzeigen
					function Faerben(a, b)
					{
						var c = (a.match(/return/)) ? 0 : 1;
						CSSStr += a + ' { color:' + ColorConv(b, c, 0) + '; }'; // Text
						CSSStr += a + ' a { color:' + ColorConv(b, c, 1) + '; }'; // Links
						CSSStr += a + ' a[title]:after { content:" ("attr(title)")"; color:' + ColorConv(b, c, 2) + '; }'; // Flotte + Ladung
					}
					var frb = LadeAccEinst('flotten_faerben');
					var zus = LadeAccEinst('flotten_zusatz');
					var colset = new Array('owntrancolor', 'ownstatcolor', 'ownaggrcolor', 'ownspiocolor', 'ownharvcolor', 'owncolocolor', 'forpeaccolor', 'foraggrcolor');
					var dir = new Array('', '.flight', '.holding', '.return');
					var tag = new Array();
					tag[0] = new Array(0, 1, 0, 1, 'owntransport', 0, 1, 1, 1, 'ownhold');
					tag[1] = new Array(0, 1, 0, 1, 'owndeploy');
					//tag[2] = new Array(0, 1, 0, 1, 'ownattack', 0, 1, 0, 1, 'ownfederation', 0, 1, 0, 1, 'owndestroy', 1, 0, 0, 0, 'ownmissile');
					//by Sovereign
					tag[2] = new Array(0, 1, 0, 1, 'ownattack', 0, 1, 0, 1, 'ownfederation', 1, 0, 0, 0, 'attack', 1, 0, 0, 0, 'federation', 0, 1, 0, 1, 'owndestroy', 1, 0, 0, 0, 'ownmissile');
					tag[3] = new Array(0, 1, 0, 1, 'ownespionage');
					tag[4] = new Array(0, 1, 0, 1, 'ownharvest');
					tag[5] = new Array(0, 1, 0, 1, 'owncolony');
					tag[6] = new Array(0, 1, 0, 0, 'transport', 0, 1, 1, 0, 'hold');
					tag[7] = new Array(0, 1, 0, 0, 'attack', 0, 1, 0, 0, 'federation', 0, 1, 0, 0, 'destroy', 0, 1, 0, 0, 'espionage', 1, 0, 0, 0, 'missile');
					for (var k = 0; k < 8; k++) // Farb-Berechnung ueber alle Flottenarten
					{
						col = LadeAccEinst(colset[k]);
						for (var i = 0; i < tag[k].length; i += 5)
						{
							if (frb) // Faerben
							{
								for (var j = 0; j < 4; j++) {
									if (tag[k][i + j]) { 
										Faerben('body center table tr' + dir[j] + ' th span' + dir[j] + '.' + tag[k][i + 4], col); 
									} 
								}
							}
						}
					}
					if (!zus) { CSSStr += 'a[title]:after { font-size: 0pt; }'; } // Zusaetze ein/aus
				}
				break;
 				case 'b_building' || 'buildings':
 				{
// fehlende Ress umfaerben
 					if (LadeAccEinst('fehlress_als_text'))
					{
						CSSStr += 'a[title]:after {content:" ("attr(title)")"; color:' + TextCol + '; }';
					}
				}
			}
		
			var blink = FindeXPath('//div[@id="menu"]/a')[0]; // Blindenlink suchen
			blink.style.fontSize = '0pt'; // und Title verschwinden lassen
			GM_addStyle(CSSStr);
		}
	}
//------------------------------
// warten bis eine HP-ID da ist
//------------------------------
		var Versuche = 0;
		function startup()
		{
			Versuche++;
// Planiliste laden
			PlaniListe = HolePlaniListe();
			if (PlaniListe)
			{
				HP_ID = PlaniListe[0];
				GM_setValue(Server + '_HP_ID', HP_ID); // speichere die HP-ID
			}
			if (!HP_ID) // falls es keine HP-ID gibt, versuche sie zu laden
			{
				HP_ID = (GM_getValue(Server + '_HP_ID', 0)) ? GM_getValue(Server + '_HP_ID', 0) : 0; // ID des HPs laden, falls vorhanden
			}
// Hinweis in der Navi
			OGameVersion = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden
			if (HP_ID && OGameVersion && !(Datei == 'b_building' && document.URL.match(/bau=/))) // Check auf fehlende HP_ID und leere Zwischenladeseiten durch OGame
			{
				OGameVersion.innerHTML += '<br><a href="' + SkriptURL + '" target="_blank">OGame-Skript</a> <span id="ogameskript_version">v?...</span>'; // in der Navi einen Hinweis setzen
				if (GM_getValue('skript_online',Default_skript_online)) { ogameskript(); }
				Versuche = MaxVers + 1;
			}
			if (Versuche <= MaxVers) { window.setTimeout(startup, VersWart); } // falls es keine HP-ID gibt und noch nicht genuegend Versuche gemacht wurden, nochmal versuchen
		}
		startup();  // Daten kontrollieren und Skript ausfuehren
	})();
//******************************************************************************************************************************************************
})();
//******************************************************************************************************************************************************
