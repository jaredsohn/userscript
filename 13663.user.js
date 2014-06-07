// ==UserScript==
// @name            Ogame - Pregled resorsa. Nowi 20x uni http://xnova.danubis.eu/u1/
// @namespace       Karamba.
// @description     Ogame - Pregled resorsa u povratku flote.
// @include         http://*ba/game/index.php?page=overview*
// ==/UserScript==

//******************************************************************************************************************************************************
(function ()
{
	if (!((document.URL.indexOf('page=') + 1 && document.URL.indexOf('session=') + 1) || document.URL.indexOf('renameplanet') + 1)) { return; }

	var Datei = document.URL.match(/\/game\/index.php\?page=([a-zA-Z0-9_\-\/]+)&/)[1]; 
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
		var StartZeit = new Date();

// Default-Einstellungen
		var Default_commander = false;
		var Default_max_tab_breite = 520;
		var Default_skriptcolor = '#000000';


		var Default_tausenderpkt = false;

		var Default_bewegteress = true;

		var Default_left_menu_fix = false;


// Daten laden
		var Server = document.URL.match(/http:\/\/([0-9a-zA-Z\-\._]+)\//)[1]; // aktueller OGame-Server
		var SID = document.URL.match(/session=([0-9a-zA-Z]+)/); // Session-ID des Users
		SID = SID ? SID[1] : ''; // falls es eine gibt, speichern
		var PHPSIDStr = document.URL.match(/PHPSESSID=([0-9a-zA-Z]+)/);
		PHPSIDStr = PHPSIDStr ? '&PHPSESSID=' + PHPSIDStr[1] : '';
// wird noch geladen
		var HP_ID = 0; // zum Speichern der HP-ID
		var PlaniListe = 0, Planis = 0; // zum Speichern der Planiliste
		var DefPlani = 0, AktPlani = 0;
		var HatCommander = Default_commander;
		var TextCol = Default_skriptcolor;


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


		function Loesche(element)
		{
			element.parentNode.removeChild(element); // Da nur Kindelemente geloescht werden koennen, wird vom Elternknoten her geloescht
		}

		function LeseZeit(Str)
		{
			var Monate = new Array();
			Monate['Jan'] = 0; Monate['Feb'] = 1; Monate['Mar'] = 2; Monate['Apr'] = 3; Monate['May'] = 4; Monate['Jun'] = 5; Monate['Jul'] = 6; Monate['Aug'] = 7; Monate['Sep'] = 8; Monate['Okt'] = 9; Monate['Nov'] = 10; Monate['Dec'] = 11;
			var ZeitStr = Str.match(/[a-zA-Z]{3} ([a-zA-Z]{3}) ([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/);
			var Zeit = new Date(); // das ist noetig
			Zeit = new Date(Zeit.getYear() + 1900, Monate[ZeitStr[1]], ZeitStr[2], ZeitStr[3], ZeitStr[4], ZeitStr[5]);
			return Zeit;
		}

		function LadeAccEinst(Name, Default)
		{
			Default = (Default == undefined) ? eval('Default_' + Name) : Default;
			if (!HP_ID) { return Default; } // falls es nicht bekannt ist, welches der Account ist, den Defaultwert zurueckgeben
			return GM_getValue(Server + '_' + HP_ID + '_' + Name, Default); // Einstellung laden
		}

		function SpeichAccEinst(Name, Wert)
		{
			if (!HP_ID) { return; } // falls der Account unbekannt ist, Abbruch
			GM_setValue(Server + '_' + HP_ID + '_' + Name, Wert); // Wert speichern
		}

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

		function HoleRessourcen() 
		{
			var Zellen = FindeXPath('//table[@id="resources"]/tbody/tr[3]/td');
			var Arr = new Array(); // zum Speichern der Zahlen
			for (var i = 0; i < 3; i++) // Zellen 0-2
			{
				Arr[i] = InInt(Zellen[i].innerHTML); 
			}
			var Werte = TagsRaus(Zellen[3].innerHTML).split('/');
			Arr[4] = InInt(Werte[0]); // und jeweils als Ganzzahl speichern, die Gesamtmenge zuerst, da sie fuer die Gebaeude und Forschungen benoetigt wird
			Arr[3] = InInt(Werte[1]);
			return Arr; // Zahlen zurueckgeben
		}

		function LadePlanis(PlaniListe)
		{

			var HP_Nummer = 0;

			if (!HP_Nummer) { return 0; }


			var HPNachOben = LadeAccEinst('hp_oben');
			var KeinePlaniNamen = LadeAccEinst('keine_planinamen');
			var Planis = new Array(new Array()); 
			Planis[0]['HP'] = HP_Nummer;
			function FuegeHinzu(Plani)
			{

				Plani['Nr'] = Planis.length;
				if (Plani['Aktiv']) { Planis[0]['Aktiv'] = Plani['Nr']; }
				Planis[Planis.length] = Plani;

			}

			return Planis;
		}

// Differenz Serverzeit <-> lokale Zeit bestimmen
		function LeseZeitDiff()
		{
			var ZeitZelle = FindeXPath('//table/tbody/tr/th[@colspan=3]')[0];
			var ServerZeit = LeseZeit(ZeitZelle.firstChild.nodeValue);
			return StartZeit - ServerZeit;
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
						erg += zahl; 
					}
					else
					{
						erg += TausenderZahl(zahl); 
					}
					if (!akt) { break; } 
				}
				erg += (vor = akt);
			}
			return erg;
		}




		function ogameskript()
		{

// Ersatz fuer fruehere Body Var
			var ContDiv = FindeXPath('//div[@id="content"]')[0];

// Loeschen von <br><br><br><br> im oGame v0.77b Design, geht nicht ueber DOM wegen Formdaten
			var ContDivBr = FindeXPath('//div[@id="content"]/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }
			ContDivBr = FindeXPath('//div[@id="content"]/center/center/form/br');
			for (var i = 0; i < ContDivBr.length; i++) { Loesche(ContDivBr[i]) }

// Tausenderpunkte im gesamten HTML-Dokument einfuegen mit Ausnahme Allianzseite
			if (LadeAccEinst('tausenderpkt') && Datei != 'allianzen')
			{
				FindeKinder(document.getElementsByTagName('body')[0], PunkteKorrekturHF, -1);
			}
// herausfinden, ob der Spieler Commander ist
			var InfoLink = FindeXPath('//center/a[contains(@href, "page=commander/info")]').length;
			SpeichAccEinst('commander', !InfoLink);
			HatCommander = LadeAccEinst('commander');


// In der Uebersicht
			if (Datei == 'overview')
			{
				if (SID)
				{


					var AktPlaniBau = FindeXPath('//table[@width="519"]/tbody/tr/th[@colspan>=2]/center')[0];
					AktPlaniBau.insertBefore(NeuesElement('a', Trim(AktPlaniBau.firstChild.nodeValue), 'href', '/game/index.php?page=b_building&session=' + SID + '&cp=' + AktPlani['ID'] + PHPSIDStr), AktPlaniBau.firstChild); // Den Link vor dem Text einfuegen
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

				if (LadeAccEinst('bewegteress') == true)
				{
					function RessEval(a, b)
					{
						var c = eval('/' + a + ': ([\.0-9]+)/');
						return parseInt(b.match(c)[1].replace(/\./g, ''), 10);
					}
					function RessLoop(a, b)
					{
						var s = getElementsByClassName(a, 'a', 'Metal');
						var c = d = e = 0, t = '';
						for (var i = 0; i < s.length; i++)
						{
							t = s[i].getAttribute('onmouseover');
							c += RessEval('Metal', t);
							d += RessEval('Kristal', t);
							e += RessEval('Deuterij', t);
						}
						if (c != 0 || d != 0 || e != 0)
						{
							code += '<tr><th>' + b + '</th><th>' + TausenderZahl(c) + '</th><th>' + TausenderZahl(d) + '</th><th>' + TausenderZahl(e) + '</th></tr>';
						}
						return new Array(c, d, e);
					}
					code = '<center><table width="' + LadeAccEinst('max_tab_breite') + '" border="1" align="center" cellpadding="0" cellspacing="0" bordercolor="#000000" style="border-collapse:collapse;">';
					code += '<tr><td class="c" colspan="4"><span style="color:lime;">Pregled Resorsa Flote - Powered By Karamba</td></tr>';
					code += '<tr><th><b>Misija</b></th><th><b>Metal</b></th><th><b>Kristal</b></th><th><b>Deuterij</b></th></tr>';
					var typ = new Array('owntransport', 'Transport', 'owndeploy', 'Stacioniranje', 'owncolony', 'Kolonizovanje', 'ownhold', 'Hold', 'ownharvest', 'Recikliranje', 'ownattack', 'Napad', 'ownfederation', 'Savez');
					var mkd = new Array();
					for (var i = 0; i < typ.length; i += 2) { mkd = mkd.concat(RessLoop(typ[i], typ[i + 1])); }
					var met = kris = deut = 0;
					for (var i = 0; i < mkd.length; i += 3) { met += mkd[i]; kris += mkd[i + 1]; deut += mkd[i + 2]; }
					code += '<tr><th><span style="color:lime;">Ukupno:</span></th><th><span style="color:lime;">' + TausenderZahl(met) + '</span></th><th><span style="color:lime;">' + TausenderZahl(kris) + '</span></th><th><span style="color:lime;">' + TausenderZahl(deut) + '</span></th></tr>';
					code += '</table></center><br>';
					aa4 = document.createElement('div');
					ContDiv.appendChild(aa4);
					var ttt = FindeXPath('//div[@id="content"]/div[last()]');
					ttt[0].innerHTML = code;
				}

			} // Ende Uebersichtsteil


		}

		function startup()
		{

// Hinweis in der Navi
			OGameVersion = document.getElementsByTagName('nobr')[0]; // Absatz mit der OGame-Version finden


				ogameskript();
				Versuche = MaxVers + 1;

			if (Versuche <= MaxVers) { window.setTimeout(startup, VersWart); } // falls es keine HP-ID gibt und noch nicht genuegend Versuche gemacht wurden, nochmal versuchen
		}
		startup(); // Daten kontrollieren und Skript ausfuehren
	})();
//******************************************************************************************************************************************************
})();
//******************************************************************************************************************************************************
