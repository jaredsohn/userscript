// ==UserScript==
// @name        Zauberzeitgeber
// @namespace   Grepolis
// @include     http://*.grepolis.*/game/index*
// @version     0.2
// ==/UserScript==

var w = typeof unsafeWindow == "object" ? unsafeWindow : window, $ = w.$;

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

function Erweitern (Objekt, Funktionsname, neue_Funktion, vorher, Ergebnis_an_das_Ende) {
	var Orginal = Objekt [Funktionsname];
	if (vorher)
		Objekt [Funktionsname] = function () {
			try {
				neue_Funktion.apply (this, arguments);
			} catch (ex) {}
			return (Orginal || function () {}).apply (this, arguments);
		};
	else if (Ergebnis_an_das_Ende)
		Objekt [Funktionsname] = function () {
			var Ergebnis = (Orginal || function () {}).apply (this, arguments);
			try {
				neue_Funktion.apply (this, [].concat.apply ([], arguments).concat (Ergebnis));
			} catch (ex) {}
			return Ergebnis;
		};
	else
		Objekt [Funktionsname] = function () {
			var Ergebnis = (Orginal || function () {}).apply (this, arguments);
			try {
				neue_Funktion.apply (this, [].concat.apply ([Ergebnis], arguments));
			} catch (ex) {}
			return Ergebnis;
		};
}

new function () {
	//Informationen am rechten Rand
	$ ("#toggle_powers").click (function () {
		if (! (w.Layout.unitBar instanceof w.LayoutModules.PowerBar)) {
			Erweitern (w.Layout.unitBar, "update", function () {
				var Götter = w.ITowns.getTown (w.Game.townId).allGodsFavors ();
				var powers_values = {};

				$.each (w.GameData.powers, function (key, power) {
					var neu = "";
					if (Götter [power.god_id]) {
						var fehlende_Gunst = power.favor - Götter [power.god_id].current % power.favor;
						//">> 0" für eine ganze Zahl und nichts gebrochenes
						neu = "<br />noch " + (60 * fehlende_Gunst / Götter [power.god_id].production >> 0) + " Minuten bis zum " + ((Götter [power.god_id].current / power.favor >> 0) + 1) + ". Zauber";
					}

					powers_values [key] = '<div class="temple_power_popup"><div class="temple_power_popup_image temple_power_popup_image_' + power.id + '"/><div class="temple_power_popup_info">'
					+ "<h4>" + power.name + "</h4>"
					+ "<p>" + power.description + "</p>"
					+ "<b>" + power.effect + "</b><br />"
					+ (power.favor !== 0 ? ('<p><img src="http://cdn.grepolis.com/images/game/res/favor.png" alt="" />'

					//hier wird es interessant
					+ "%1 Gunst".replace ("%1", power.favor)

					//jetzt der Eigenanteil
					+ neu

					+ "</p>") : "<br />") + "</div></div>";
					//ein </div> fehlt bei allen, also einfach ignorieren...
				});

				w.PopupFactory.addTexts (powers_values);

				var powers = w.ITowns.getTown (w.Game.townId).powers ();
				var container = $ ("#powers_container");
				var i;
				for (i in powers)
					if (powers.hasOwnProperty (i))
						container.find ("a." + powers [i]).setPopup (powers [i]);
			});
			w.Layout.unitBar.update ();
		}
	});

	//Informationen in dem Tab "Zauber", etwa in einem Stadtfenster
	var Wert = w.GameData.PowerDescriptionTemplate;
	Object.defineProperty (w.GameData, "PowerDescriptionTemplate", {enumerable: true, get: function () {
		return Wert;
	}, set: function (V) {
		Wert = '<%\n\
	var neu = "", Gott = ITowns.getTown (Game.townId).allGodsFavors () [GameData.powers [id].god_id];\n\
	if (Gott) {\n\
		var fehlende_Gunst = favor - Gott.current % favor;\n\
		neu = "<br /><small>noch " + (60 * fehlende_Gunst / Gott.production >> 0) + " Minuten bis zum " + ((Gott.current / favor >> 0) + 1) + ". Zauber</small>";\n\
	}\n\
%>' + V.replace ("<%= favor %>", "<%= favor + neu %>");
	}});

	/* Orginaltext:
<div>
	<div class="towninfo_power_image large_image_<%= id %>" id="<%= id %>"></div>
	<h4><%= name %></h4>
	<p><%= description %></p>
	<p class="small"><%= effect %></p>
	<p>Kosten: <%= favor %></p>

	<a class="button "  href="#" onclick="w(this).sendMessage(<%= '\'castPower\'' %>,'<%= id %>', ID der Stadt ,  true);">
		<span class="left"><span class="right">
		<span class="middle">Wirken</span>
		</span></span>
		<span style="clear:both;"></span>
	</a></div>
*/

	//Informationen in der Anzeige oben rechts
	Erweitern (w.PopupFactory, "updateProductionPopup", Fehlerfunktion (function (type, data) {
		if (type != "favor")
			return;
		var popup_html = w.PopupFactory.texts.favor_production;
		var Maximum = w.ITowns.getTown (w.Game.townId).maxfavor;
		popup_html = popup_html.replace (/(<li>[^:]+: (\d+) - [^:]+: ([0-9.]+))<\/li>/gi, function (Treffer, Text, Gunst, Produktion) {
			var jetzt = new Date ();
			var noch = (Maximum - parseInt (Gunst)) / parseFloat (Produktion) * 3600000;
			if (noch == 0)
				return Text + " - voll</li>";
			var seit_Mitternacht = jetzt.getHours () * 3600000 + jetzt.getMinutes () * 60000 + jetzt.getSeconds () * 1000 + jetzt.getMilliseconds ();
			var Tage = (noch + seit_Mitternacht) / 86400000 >> 0;
			var Uhrzeit = noch + seit_Mitternacht - Tage * 86400000;
			var Minuten = Uhrzeit / 60000 >> 0;
			var Stunden = Minuten / 60 >> 0;
			Minuten -= Stunden * 60;
			Minuten = (Minuten < 10 ? "0" : "") + Minuten;
			Stunden = (Stunden < 10 ? "0" : "") + Stunden;
			if (Tage == 0)
				return Text + " - voll heute um " + Stunden + ":" + Minuten + "</li>";
			if (Tage == 1)
				return Text + " - voll morgen um " + Stunden + ":" + Minuten + "</li>";
			var fertig = new Date (jetzt.getTime () + noch);
			return Text + " - voll am " + fertig.getDate () + "." + (fertig.getMonth () + 1) + " um " + Stunden + ":" + Minuten + "</li>";

			return Text + " - voll in " + (60 * (Maximum - parseInt (Gunst)) / parseFloat (Produktion) >> 0) + " Minuten</li>";
		});
		w.PopupFactory.addTexts ({
			"favor_production": popup_html
		});

		/* Beispielwert:
<h4>Gunst</h4>
<ul>
	<li>Zeus: 163 - Produktion pro Stunde: 28.5</li>
	<li>Poseidon: 127 - Produktion pro Stunde: 27.9</li>
	<li>Hera: 184 - Produktion pro Stunde: 30.5</li>
	<li>Athene: 207 - Produktion pro Stunde: 28.2</li>
	<li>Hades: 108 - Produktion pro Stunde: 28.5</li>
</ul>
		*/
	}), false, true);
} ();

