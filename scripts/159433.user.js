// ==UserScript==
// @name        Transportrechner
// @namespace   Grepolis
// @description Fügt Grepolis einen intelligenten Transportrechner hinzu.
// @include     http://*.grepolis.*/game/index*
// @grant       unsafeWindow
// @version     1.1
// ==/UserScript==

/*
Prinzip:
  (Im Folgenden ist mit dem Divisionszeichen die Ganzzahldivision gemeint, sofern nicht explizit anders angegeben.)
  1. Es werden sämtliche in Bau befindliche Einheiten als bereits fertig gebaut angesehen.
  2. Wenn es nur Transportschiffe eines Types aus dieser Stadt gibt, wird dieser als Standard für diese Stadt angesehen.
  3. Ansonsten, wenn es beide Typen gibt oder gar keine Transportschiffe vorhanden sind, sollen zwei Buttons erscheinen, bei denen der Typ ausgewählt werden kann. Wenn beide Typen
     vorhanden sind, sollen die Transportschiffe mit dem nicht ausgewählten Typ als nicht existent angesehen werden, es soll ein Kommentar für deren Vernichtung ausgegeben werden.
  4. Es werden zur Berechnung zuerst alle Landeinheiten und Transportschiffe gedanklich vernichtet.
  5. Es gibt folgende Möglichkeiten, wie die Bevölkerung verteilt werden kann, wenn sowohl Platz für Transportschiffe als auch Einheiten vorhanden ist.
    5.1 Es kann sein, dass es genau aufgeht: Die freien Bevölkerungspunkte N lassen sich so verteilen, dass alle T neuen (zu bauenden) Transportschiffe des Types T mit Bevölkerungskosten
        von jeweils K(T) und Platz für P(T) Bevölkerungspunkte von Landeinheiten komplett mit den neuen (zu rekrutierenden) Einheiten mit insgesamt E Bevölkerungspunkten gefüllt werden können.
    5.2 Es kann sein, dass es nicht genau aufgeht. Dann bleiben R = N % (K(T) + P(T)) Bevölkerungspunkte übrig, wobei T = N / (K(T) + P(T)) Transportschiffe gebaut werden können.
        Dabei sind folgende drei Fälle zu unterscheiden:
      5.2.1 R < K(T): Es wäre kontraproduktiv, noch ein Transportschiff zu bauen, da dann K(T) - R Einheiten weniger gebaut werden könnten als ohne das neue Transportschiff.
                      Möglicherweise könnten aber noch R Melder gebaut werden.
      5.2.2 R = K(T): Es wäre unnütz, aber keine Bevölkerungspunkteverschwendung, noch ein Transportschiff zu bauen. Es könnte höchstens zur Zeitverzögerung
                      von Angriffen und Unterstützungen dienen. Es könnten auch stattdessen Melder gebaut werden.
      5.2.3 R > K(T): Es ist sinnvoll, noch ein Transportschiff zu bauen, da dann R - K(T) Einheiten mehr angreifen können.
  6. Wenn die Bevölkerungspunkte sich nicht gleichmäßig verteilen lassen und Landeinheiten oder Transportschiffe vernichtet werden müssen, ist eines der Ergebnisse der Rechnung
     von 5. kleiner als die tatsächliche Anzahl an Landeinheiten bzw. Transportschiffen. Es soll ein Kommentar für deren Vernichtung ausgegeben werden.
*/

var w = unsafeWindow || window, $ = w.$;

function Analysieren (Objekt, Text, Erbe, auch_versteckte, kein_alert, kein_log, Stapel_ausgeben) {
	if (typeof Text != "string")
		Text = "<unbekannt>";
	Text = "Analysiere " + Text + " (Typ: ";
	var Typ;
	Text += Typ = typeof Objekt;
	Text += ")\n";
	if (Typ == "string" || Typ == "number" || Typ == "boolean" || Typ == "date")
		Text += "Wert: " + Objekt + "\n";
	else if (Typ == "function")
		Text += "Definition:\n" + Objekt.toString () + "\n";
	var str = "";
	var str2;
	var Elemente;
	if (auch_versteckte) {
		Elemente = {};
		var Namen = Object.getOwnPropertyNames (Objekt);
		for (var i = 0; i < Namen.length; ++i)
			Elemente [Namen [i]] = Objekt [Namen [i]];
	} else
		Elemente = Objekt;
	for (var E in Elemente) {
		if (Erbe || typeof Objekt.hasOwnProperty != "function" || Objekt.hasOwnProperty (E)) {
			str2 = "";
			if (typeof Objekt [E] == "string")
				str2 = ": \"" + Objekt [E] + "\"";
			else if (typeof Objekt [E] == "number" || typeof Objekt [E] == "boolean" || Typ == "date")
				str2 = ": " + Objekt [E];
			str += "  - " + E + " (" + typeof Objekt [E] + ")" + str2 + "\n";
		}
	}
	Text += str;
	if (Stapel_ausgeben) {
		str = "\naktueller Stapel:\n";
		var aktuell = Analysieren;
		while (aktuell.caller) {
			str += "  - " + aktuell.name + " (Argumente: " + aktuell.arguments.length + ")\n";
			aktuell = aktuell.caller;
		}
		Text += str += "  - " + aktuell.name + " (Argumente: " + aktuell.arguments.length + ")\n\n";
	}
	if (! kein_log)
		console.log (Text);
	if (! kein_alert)
		alert (Text);
	return Text;
}

function Fehler_analysieren (Fehler, Text) {
	if (typeof Text != "string")
		Text = "";
	Analysieren (Fehler, Text + " - " + Fehler.name + " - " + Fehler.message + "\n\nstack:\n" + Fehler.stack, true);
}

function Fehlerblock (This, Funktion, Argumente) {
	var Ergebnis;
	try {
		Ergebnis = Funktion.apply (This, Argumente);
	} catch (ex) {
		Fehler_analysieren (ex);
	}
	return Ergebnis;
}

function Fehlerfunktion (Funktion, This) {
	return function () {
		Fehlerblock (This || this, Funktion, arguments);
	};
}

function formatieren (Text) {
	Text = Text.split ("%%");
	for (var j = 0; j < Text.length; ++j) {
		var i = arguments.length;
		while (i--)
			Text [j] = Text [j].replace ("%" + i + "%", arguments [i]).replace ("%" + i, arguments [i]);
	}
	return Text.join ("%");
}

function formatieren2 (Text, Ersetzungen) {
	Text = Text.split ("%%");
	for (var j = 0; j <= Text.length; ++j) {
		var i = arguments.length;
		for (var Ziel in Ersetzungen)
			Text [j] = Text [j].replace ("%" + Ziel + "%", Ersetzungen [Ziel]).replace ("%" + Ziel, Ersetzungen [Ziel]);
	}
	return Text.join ("%");
}

function Button_erstellen (Text) {
	return $ ('<a href="#" class="button"><span class="left"><span class="right"><span class="middle"><small>' + Text + "</small></span></span></span></a>");
}

function Checkbox_erstellen (Text, markiert) {
	return $ ('<div class="checkbox_new new_message"><div class="cbx_icon"></div></div>').checkbox ({caption: Text, checked: !! markiert});
}

function Link_erstellen (Text) {
	return $ ('<a href="#">' + Text + "</a>");
}

function kleinen_Link_erstellen (Text) {
	return $ ('<a href="#"><small>' + Text + "</small></a>");
}

function hellen_Link_erstellen (Text) {
	return $ ('<a href="#" class="Link_hell">' + Text + "</a>");
}

function hellen_kleinen_Link_erstellen (Text) {
	return $ ('<a href="#" class="Link_hell"><small>' + Text + "</small></a>");
}

var Transportrechner = w.Transportrechner = {
	//Container: null,
	//Element: null,
	//Button: null,
	//Stilelement: null,
	//freie_Bevölkerung: null,

	Starten: function () {
		Transportrechner.Beenden ();
		if (! Transportrechner.Stilelement)
			Transportrechner.Stilelement = $ ('<style type="text/css">a.Link_hell:not(:hover):not(:active){color:rgb(255,204,102)}</style>').appendTo (document.head);
		Transportrechner.Container = $ ('<div class="sidebar_unit_wrapper" style="display: none;"></div>').insertAfter (".bottom_ornament");
		Transportrechner.Element = $ ('<div class="sidebar_unit_container clearfix" style="color: #FFCC66; font-size: x-small; background-position: right; background-image: url(http://de.cdn.grepolis.com/images/game/layout/layout_units_nav_bg.png);"></div>').appendTo (Transportrechner.Container);
		Transportrechner.Button = Button_erstellen ("Transportrechner").css ({margin: "0px", display: "block"}).click (Transportrechner.anzeigen).insertAfter (".bottom_ornament");
		$ (".bottom_ornament").css ("bottom", "-27px");
		Transportrechner.Container.ajaxComplete (Transportrechner.Ajax_abfangen);
	},

	Beenden: function () {
		if (Transportrechner.Container) {
			Transportrechner.Container.remove ();
			delete Transportrechner.Container;
		}
		if (Transportrechner.Element) {
			Transportrechner.Element.remove ();
			delete Transportrechner.Element;
		}
		if (Transportrechner.Button) {
			Transportrechner.Button.remove ();
			delete Transportrechner.Button;
		}
	},

	Ajax_abfangen: function (_1, _2, Einstellungen) {
		if (Einstellungen.url.split ("&") [0] == "/game/index?action=switch_town")
			Transportrechner.aktualisieren ();
	},

	aktualisieren: function () {
		if (Transportrechner.Container && Transportrechner.Container.is (":visible"))
			Transportrechner.Tipp_erstellen ();
	},

	anzeigen: function () {
		if (! Transportrechner.Container)
			return;
		Transportrechner.Container.toggle ();
		if (Transportrechner.Container.is (":visible"))
			Transportrechner.Tipp_erstellen ();
	},

	Tipp_erstellen: Fehlerfunktion (function () {
		if (! Transportrechner.Element)
			return;

		var Einheiten = Transportrechner.Einheiten_berechnen ();
		if (! Einheiten) {
			Transportrechner.Element.html ('<span style="color: red;">Fehler!<br />"Einheiten" ist nicht definiert!</span>');
			return;
		}
		if (! Einheiten.Einheiten) {
			Transportrechner.Element.html ('<span style="color: red;">Fehler!<br />"Einheiten.Einheiten" ist nicht definiert!</span>');
			return;
		}

		//Auf Vorrat anlegen, damit es später keine Probleme gibt.
		Transportrechner.freie_Bevölkerung = Checkbox_erstellen ("freie Bevölkerung ignorieren", Transportrechner.freie_Bevölkerung && Transportrechner.freie_Bevölkerung.hasClass ("checked")).click (function () {
			Transportrechner.Tipp_erstellen ();
		});

		//2. und 3.
		var schnell = Einheiten.Einheiten.big_transporter == 0;
		if ((! schnell && Einheiten.Einheiten.small_transporter) || (schnell && ! Einheiten.Einheiten.small_transporter)) {

			Transportrechner.Element.empty ();
			//"Transportschiffe" passt nicht in die Buttons hinein -> "Transporter"
			Transportrechner.Element.append (hellen_kleinen_Link_erstellen ("schnelle Transporter").click (Fehlerfunktion (function () {
				Transportrechner.Transportschifftyp_gewählt (true, true);
			}))).append ("<br />").append (hellen_kleinen_Link_erstellen ("langsame Transporter").click (function () {
				Transportrechner.Transportschifftyp_gewählt (false, true);
			}));
		} else
			Transportrechner.Transportschifftyp_gewählt (schnell, false);
	}),

	Transportschifftyp_gewählt: Fehlerfunktion (function (schnell, Entscheidung) {
		//Hat sich zwischenzeitlich etwas geändert an den Werten, die hierhin führen und die damit nicht länger gültig sind?
		var Einheiten = Transportrechner.Einheiten_berechnen ();
		var _schnell = Einheiten.Einheiten.big_transporter == 0;
		var _Entscheidung = (! _schnell && Einheiten.Einheiten.small_transporter) || (_schnell && ! Einheiten.Einheiten.small_transporter);
		if (_Entscheidung != Entscheidung || _schnell != schnell && ! _Entscheidung) {
			Transportrechner.Tipp_erstellen ();
			return;
		}

		//Transportschiffe des anderen Types sollen vernichtet werden
		var falsche_Transportschiffe = Einheiten.Einheiten [schnell ? "big_transporter" : "small_transporter"];

		//Variablen auswählen
		var Platz_Schiff = schnell ? Einheiten.Platz_schnell : Einheiten.Platz_langsam;
		var Kosten_Schiff = w.GameData.units [schnell ? "small_transporter" : "big_transporter"].population;
		var Transportschiffe = Einheiten.Einheiten [schnell ? "small_transporter" : "big_transporter"] || 0;

		//Alle Landeinheiten und Transportschiffe vernichten! (Bzw. so tun, als wären sie vernichtet. Der ausgegebene Wert ist dann einfach die Differenz zwischen dem berechneten und dem tatsächlichen Wert.)
		var neu = Transportrechner.neue_Einheiten_berechnen.apply (this, [(! Transportrechner.freie_Bevölkerung || ! Transportrechner.freie_Bevölkerung.hasClass ("checked") ? Einheiten.frei : 0) + Einheiten.Bedarf + Transportschiffe * Kosten_Schiff, Platz_Schiff, Kosten_Schiff]);
		//var neu = Transportrechner.neue_Einheiten_berechnen ((! Transportrechner.freie_Bevölkerung || ! Transportrechner.freie_Bevölkerung.hasClass ("checked") ? Einheiten.frei : 0) + Einheiten.Bedarf + Transportschiffe * Kosten_Schiff, Platz_Schiff, Kosten_Schiff);

		//Ausgabevariablen
		var Hinweis_Ende = neu.frei ? "<br /><br />Es bleiben " + neu.frei + " Bevölkerungspunkte übrig." : "";
		var Hinweis_Anfang = ! _schnell && Einheiten.Einheiten.small_transporter ? "Versenke die Transportschiffe des anderen Types.<br /><br />" : "";

		//zu viele Landeinheiten
		if (neu.Einheiten < Einheiten.Bedarf)
			Transportrechner.Anzeige (formatieren (Hinweis_Anfang + "Vernichte %1 Landeinheiten.<br /><br />Baue %2 Transportschiffe." + Hinweis_Ende, Einheiten.Bedarf - neu.Einheiten, neu.Transportschiffe - Transportschiffe));

		//zu viele Transportschiffe
		else if (neu.Transportschiffe < Transportschiffe)
			Transportrechner.Anzeige (formatieren (Hinweis_Anfang + "Baue %1 Landeinheiten.<br /><br />Versenke %2 Transportschiffe." + Hinweis_Ende, neu.Einheiten - Einheiten.Bedarf, Transportschiffe - neu.Transportschiffe));

		//ausreichend Bevölkerungspunkte
		else
			Transportrechner.Anzeige (formatieren (Hinweis_Anfang + "Baue %1 Landeinheiten.<br /><br />Baue %2 Transportschiffe." + Hinweis_Ende, neu.Einheiten - Einheiten.Bedarf, neu.Transportschiffe - Transportschiffe));
	}),

	Anzeige: function (HTML) {
		if (! Transportrechner.Element)
			return;
		Transportrechner.Element.html ("<hr />" + HTML);
		Transportrechner.Element.prepend (Transportrechner.freie_Bevölkerung);
	},

	neue_Einheiten_berechnen: function (frei, Platz_Schiff, Kosten_Schiff) {
		var Rest = frei % (Platz_Schiff + Kosten_Schiff), neu = (frei / (Platz_Schiff + Kosten_Schiff)) >> 0;
		if (Rest > Kosten_Schiff)
			return {Transportschiffe: neu + 1, Einheiten: neu * Platz_Schiff + Rest - Kosten_Schiff, frei: 0};
		else
			return {Transportschiffe: neu, Einheiten: neu * Platz_Schiff, frei: Rest};
	},

	Einheiten_berechnen: function () {
		var Stadt = w.ITowns.getTown (w.Game.townId);
		var Einheiten = {};
		var Stadt_Einheiten = Stadt.units ();
		for (var Typ in Stadt_Einheiten)
			Einheiten [Typ] = Stadt_Einheiten [Typ];
		if (! Einheiten || typeof Einheiten != "object") {
			Einheiten = {};
			for (var Typ in w.GameData.units)
				if (! (Typ in Einheiten))
					Einheiten [Typ] = 0;
		}
		var Einheiten_außerhalb = Stadt.unitsOuter ();
		for (var Typ in Einheiten_außerhalb)
			if (Einheiten_außerhalb [Typ])
				Einheiten [Typ] += Einheiten_außerhalb [Typ];
		var Aufträge = Stadt.getUnitOrdersCollection ().models;
		if (Aufträge)
			for (var i = 0; i < Aufträge.length; ++i)
				Einheiten [Aufträge [i].attributes.unit_type] += Aufträge [i].attributes.units_left;
		var Kojen_erforscht = Stadt.researches ().attributes.berth;
		var Bedarf = 0, Platz = 0, Einheit;
		for (var Typ in Einheiten) {
			if (Typ == "undefined")
				continue;
			if (isNaN (Einheiten [Typ]))
				continue;
			Einheit = w.GameData.units [Typ];
			if (! Einheit) {
				alert ("Fehler!\nDie Einheit des Types \"" + Typ + "\" (in GameData.units) ist nicht definiert!");
				continue;
			}
			if (Einheit.is_naval) {
				if (Einheit.capacity && Einheit.capacity > 0)
					Platz += Einheit.capacity;
			} else if (! Einheit.flying)
				Bedarf += Einheiten [Typ] * Einheit.population;
		}

		return w.Daten = {
			frei: Stadt.resources ().population,
			Einheiten: Einheiten,
			Aufträge: Aufträge,
			Kojen_erforscht: Kojen_erforscht,
			Platz_schnell: w.GameData.units.small_transporter.capacity + (Kojen_erforscht ? w.GameData.research_bonus.berth : 0),
			Platz_langsam: w.GameData.units.big_transporter.capacity + (Kojen_erforscht ? w.GameData.research_bonus.berth : 0),
			Bedarf: Bedarf,
			Platz: Platz
		};
	}
};

Transportrechner.Starten ();

