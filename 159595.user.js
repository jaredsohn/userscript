// ==UserScript==
// @name        Zeitrechner
// @namespace   Grepolis
// @description Rechnet die Summe bzw. Differenz von zwei Uhrzeiten aus.
// @include     http://*.grepolis.*/game/index*
// @version     1
// ==/UserScript==

var w = typeof unsafeWindow == "object" ? unsafeWindow : window, $ = w.$;

//Function.prototype.curry
new function () {
	Function.prototype.curry = function () {
		if (arguments.length < 1)
			return this;

		var Funktion = this;
		var Argumente = Array.prototype.slice.call (arguments);
		return function () {
			return Funktion.apply (this, Argumente.concat (Array.prototype.slice.call (arguments)));
		};
	};
} ();

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
	Analysieren (Fehler, Text + " - " + Fehler.name + " - " + Fehler.message, true);
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
	for (var E in Text) {
		var i = arguments.length;
		while (i--)
			Text [E] = Text [E].replace ("%" + i + "%", arguments [i]).replace ("%" + i, arguments [i]);
	}
	return Text.join ("%");
}

function formatieren2 (Text, Ersetzungen) {
	Text = Text.split ("%%");
	for (var E in Text) {
		var i = arguments.length;
		for (var Ziel in Ersetzungen)
			Text [E] = Text [E].replace ("%" + Ziel + "%", Ersetzungen [Ziel]).replace ("%" + Ziel, Ersetzungen [Ziel]);
	}
	return Text.join ("%");
}

function Button_erstellen (Text) {
	return $ ('<a href="#" class="button"><span class="left"><span class="right"><span class="middle"><small>' + Text + "</small></span></span></span></a>");
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

var Zeitrechner = w.Zeitrechner = {
	//Container: null,
	//Element: null,
	//Button: null,
	//Stilelement: null,

	//Eingabe1: null,
	//Eingabe1_Stunden: null,
	//Eingabe1_Minuten: null,
	//Eingabe1_Sekunden: null,
	//Eingabe2: null,
	//Eingabe2_Stunden: null,
	//Eingabe2_Minuten: null,
	//Eingabe2_Sekunden: null,
	//Button_Plus: null,
	//Button_Minus: null,
	//Ergebnis: null,

	Starten: Fehlerfunktion (function () {
		Zeitrechner.Beenden ();
		if (! Zeitrechner.Stilelement)
			Zeitrechner.Stilelement = $ ('<style type="text/css">a.Link_hell:not(:hover):not(:active){color:rgb(255,204,102)}</style>').appendTo (document.head);
		Zeitrechner.Button = Button_erstellen ("Zeitrechner").css ({margin: "0px", display: "block"}).click (Zeitrechner.anzeigen).insertBefore (".bottom_ornament");
		Zeitrechner.Container = $ ('<div class="sidebar_unit_wrapper" style="display: none;"></div>').insertBefore (".bottom_ornament");
		Zeitrechner.Element = $ ('<div class="sidebar_unit_container clearfix" style="color: #FFCC66; font-size: x-small; background-position: right; background-image: url(http://de.cdn.grepolis.com/images/game/layout/layout_units_nav_bg.png);"></div>').appendTo (Zeitrechner.Container);
	}),

	Beenden: function () {
		if (Zeitrechner.Eingabe1_Stunden) {
			Zeitrechner.Eingabe1_Stunden.remove ();
			delete Zeitrechner.Eingabe1_Stunden;
		}
		if (Zeitrechner.Eingabe1_Minuten) {
			Zeitrechner.Eingabe1_Minuten.remove ();
			delete Zeitrechner.Eingabe1_Minuten;
		}
		if (Zeitrechner.Eingabe1_Sekunden) {
			Zeitrechner.Eingabe1_Sekunden.remove ();
			delete Zeitrechner.Eingabe1_Sekunden;
		}
		if (Zeitrechner.Eingabe1) {
			Zeitrechner.Eingabe1.remove ();
			delete Zeitrechner.Eingabe1;
		}
		if (Zeitrechner.Eingabe2_Stunden) {
			Zeitrechner.Eingabe2_Stunden.remove ();
			delete Zeitrechner.Eingabe2_Stunden;
		}
		if (Zeitrechner.Eingabe2_Minuten) {
			Zeitrechner.Eingabe2_Minuten.remove ();
			delete Zeitrechner.Eingabe2_Minuten;
		}
		if (Zeitrechner.Eingabe2_Sekunden) {
			Zeitrechner.Eingabe2_Sekunden.remove ();
			delete Zeitrechner.Eingabe2_Sekunden;
		}
		if (Zeitrechner.Eingabe2) {
			Zeitrechner.Eingabe2.remove ();
			delete Zeitrechner.Eingabe2;
		}
		if (Zeitrechner.Button_Plus) {
			Zeitrechner.Button_Plus.remove ();
			delete Zeitrechner.Button_Plus;
		}
		if (Zeitrechner.Button_Minus) {
			Zeitrechner.Button_Minus.remove ();
			delete Zeitrechner.Button_Minus;
		}
		if (Zeitrechner.Ergebnis) {
			Zeitrechner.Ergebnis.remove ();
			delete Zeitrechner.Ergebnis;
		}
		if (Zeitrechner.Element) {
			Zeitrechner.Element.remove ();
			delete Zeitrechner.Element;
		}
		if (Zeitrechner.Container) {
			Zeitrechner.Container.remove ();
			delete Zeitrechner.Container;
		}
		if (Zeitrechner.Button) {
			Zeitrechner.Button.remove ();
			delete Zeitrechner.Button;
		}
	},

	anzeigen: Fehlerfunktion (function () {
		if (! Zeitrechner.Container)
			return;
		Zeitrechner.Container.toggle ();
		if (Zeitrechner.Container.is (":visible")) {
			var Eingabe = Fehlerfunktion (function Eingabe (Nummer, Index, Ereignis) {
				var Ziel = Ereignis.target;

				//Doppelpunkt streichen, wie in ":56" aus "12:34:56"
				if (Ziel.value [0] == ":")
					Ziel.value = Ziel.value.substring (1);

				var Text = Ziel.value;
				var weiter = Zeitrechner ["Eingabe" + Nummer + "_" + (Index + 1)];
				var Cursor = Ziel.selectionStart == Ziel.selectionEnd ? Ziel.selectionStart : Ziel.selectionDirection == "forward" ? Ziel.selectionEnd : Ziel.selectionStart;

				//Google Chrome macht nur Probleme, etwa dieses hier...
				if (Text.length == 1) {
					Ziel.blur ();
					Ziel.focus ();

				//Text zu lang, kürzen
				} else if (Text.length > 2 && weiter) {
					Ziel.value = Text.substring (0, 2);
					weiter.val (Text.substring (2));
					if (Cursor > 2) {
						weiter.get (0).selectionStart = weiter.get (0).selectionEnd = Cursor - 2;
						weiter.focus ();
					}
					Eingabe (Nummer, Index + 1, {target: weiter.get (0)});

				//nur den Cursor weiterbewegen
				} else if (Cursor >= 2 && Ziel.selectionStart == Ziel.selectionEnd) {
					if (weiter) {
						weiter.get (0).selectionStart = Cursor - 2;
						weiter.get (0).selectionEnd = weiter.val ().length;
						weiter.focus ();
					} else if (Zeitrechner ["Eingabe" + (Nummer + 1)]) {
						weiter = Zeitrechner ["Eingabe" + (Nummer + 1) + "_1"];
						weiter.get (0).selectionStart = 0;
						weiter.get (0).selectionEnd = weiter.val ().length;
						weiter.focus ();
					} else {
						Zeitrechner.Eingabe1_1.get (0).selectionStart = 0;
						Zeitrechner.Eingabe1_1.get (0).selectionEnd = Zeitrechner.Eingabe1_1.val ().length;
						Zeitrechner.Eingabe1_1.focus ();
					}
				}
			});

			Zeitrechner.Element.empty ();
			Zeitrechner.Eingabe1 = $ ('<span style="width: 114px; height: 12px; display: dock; margin-top: 2px;"></span>').appendTo (Zeitrechner.Element);
			Zeitrechner.Eingabe1_1 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (1, 1)).appendTo (Zeitrechner.Eingabe1);
			Zeitrechner.Eingabe1.append (":");
			Zeitrechner.Eingabe1_2 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (1, 2)).appendTo (Zeitrechner.Eingabe1);
			Zeitrechner.Eingabe1.append (":");
			Zeitrechner.Eingabe1_3 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (1, 3)).appendTo (Zeitrechner.Eingabe1);
			Zeitrechner.Element.append ("<br />");
			Zeitrechner.Eingabe2 = $ ('<span style="width: 114px; height: 12px; display: dock; margin-top: 3px; margin-bottom: 3px;"></span>').appendTo (Zeitrechner.Element);
			Zeitrechner.Eingabe2_1 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (2, 1)).appendTo (Zeitrechner.Eingabe2);
			Zeitrechner.Eingabe2.append (":");
			Zeitrechner.Eingabe2_2 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (2, 2)).appendTo (Zeitrechner.Eingabe2);
			Zeitrechner.Eingabe2.append (":");
			Zeitrechner.Eingabe2_3 = $ ('<input type="text" value="00" style="width: 16px;" />').on ("input", Eingabe.curry (2, 3)).appendTo (Zeitrechner.Eingabe2);
			//Zeitrechner.Eingabe1 = $ ('<input type="text" value="00:00:00" style="width: 114px; margin-top: 2px;" />').appendTo (Zeitrechner.Element);
			//Zeitrechner.Element.append ("<br />");
			//Zeitrechner.Eingabe2 = $ ('<input type="text" value="00:00:00" style="width: 114px; margin-top: 3px; margin-bottom: 3px;" />').appendTo (Zeitrechner.Element);
			//Zeitrechner.Element.append ("<br />");
			Zeitrechner.Plus_Button = Button_erstellen ("Plus").click (Fehlerfunktion (function () {
				Zeitrechner.Ergebnis_berechnen (function (a, b) {
					return a + b;
				});
			})).appendTo (Zeitrechner.Element);
			Zeitrechner.Element.append ("<br />");
			Zeitrechner.Minus_Button = Button_erstellen ("Minus").click (Fehlerfunktion (function () {
				Zeitrechner.Ergebnis_berechnen (function (a, b) {
					return a - b;
				});
			})).appendTo (Zeitrechner.Element);
			Zeitrechner.Element.append ("<br />");
			Zeitrechner.Ergebnis = $ ('<b style="margin-left: auto; margin-right: auto;">Ergebnis</b>').appendTo (Zeitrechner.Element);
		}
	}),

	Ergebnis_berechnen: function (Funktion) {
		if (Zeitrechner.Eingabe1 && Zeitrechner.Eingabe2 && Zeitrechner.Ergebnis) {
			try {
				Zeitrechner.Ergebnis.html (Zeitrechner.als_Zeit (Funktion (Zeitrechner.Eingabe (1), Zeitrechner.Eingabe (2))));
			} catch (Fehler) {
				Zeitrechner.Ergebnis.html ('<span style="color: red;">' + Fehler.message + "</span>");
			}
		}
	},

	Eingabe: function (Nummer) {
		var Eingabe = Zeitrechner ["Eingabe" + Nummer];
		Eingabe = Eingabe.find ("input");
		if (Eingabe) {
			var Ergebnis = 0;
			Eingabe.each (function () {
				Ergebnis *= 60;
				Ergebnis += parseInt (this.value);
			});
			return Ergebnis;
		}
	},

	als_Zeit: function (Sekunden) {
		var minus = Sekunden < 0;
		if (minus)
			Sekunden = -Sekunden;
		var Minuten = Sekunden / 60 >> 0;
		Sekunden %= 60;
		var Stunden = Minuten / 60 >> 0;
		Minuten %= 60;
		var Tage = Stunden / 24 >> 0;
		Stunden %= 24;
		if (Sekunden < 10)
			Sekunden = "0" + Sekunden;
		if (Minuten < 10)
			Minuten = "0" + Minuten;
		if (Stunden < 10)
			Stunden = "0" + Stunden;
		return (minus ? "- (" : "") + Tage + " Tag" + (Tage == 1 || Tage == -1 ? "" : "e") + " + " + Stunden + ":" + Minuten + ":" + Sekunden + (minus ? ")" : "");
	}
};

Zeitrechner.Starten ();

