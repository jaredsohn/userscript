// ==UserScript==
// @name        Spielerprofil mit Zurück-Button
// @namespace   Namensraum
// @include     http://de*.grepolis.*/game*
// @version     2.2.0.2
// ==/UserScript==

var w, $ = (w = unsafeWindow || window).jQuery;

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

function Fehlerblock (This, Funktion) {
	var Ergebnis;
	try {
		Ergebnis = Funktion.apply (This);
	} catch (ex) {
		Fehler_analysieren (ex);
	}
	return Ergebnis;
}

function WndHandlerHistory (wndhandle) {
	this.wnd = wndhandle;
}

w.Function.prototype.inherits.call (WndHandlerHistory, w.WndHandlerDefault);

WndHandlerHistory.prototype.getDefaultWindowOptions = function () {
	var ret = {
		position: ["center", "center"],
		maxHeight: 500,
		maxWidth: 820,
		height: 500,
		width: 820,
		minimizable: true,
		title: "History"
	};
	return ret;
};

WndHandlerHistory.prototype.onInit = function (title, UIopts) {
	return true;
};

WndHandlerHistory.prototype.onClose = function () {
	return true;
};

WndHandlerHistory.prototype.refresh = function () {
	var html = '\
<div class=\"game_border\">\n\
	<div class=\"game_border_top\"></div>\n\
	<div class=\"game_border_bottom\"></div>\n\
	<div class=\"game_border_left\"></div>\n\
	<div class=\"game_border_right\"></div>\n\
	<div class=\"game_border_corner corner1\"></div>\n\
	<div class=\"game_border_corner corner2\"></div>\n\
	<div class=\"game_border_corner corner3\"></div>\n\
	<div class=\"game_border_corner corner4\"></div>\n\
	<div class=\"game_inner_box ranking_table bold\">\n\
	<div class=\"ranking_table_body global_ranking\">\n\
		<table class=\"game_header bold\" style=\"border-bottom: 1px solid #D0BE97; color: white; text-align: center; width: 100%;\">\n\
			<thead>\n\
				<th class=\"r_rank\">Rang</th>\n\
				<th class=\"r_name\">Name</th>\n\
				<th class=\"r_points\">Punkte</th>\n\
				<th class=\"r_ally\">Allianz</th>\n\
				<th class=\"r_towns\">St&auml;dte</th>\n\
				<th class=\"r_avg_points\">Punkteschnitt</th>\n\
			</thead>\n\
		</table>\n\
		<div style=\"max-height: 345px; overflow-y: auto; overflow-x: hidden;\">\n\
			<table style=\"text-align: center;\" class=\"game_table\" cellspacing=\"0\" style=\"overflow-y: auto; overflow-x: hidden;\">\n\
				<tbody>';
	var gerade = true;
	for (var i = 0; i < w.besuchte_Spieler.length; ++i) {
		html += '\
					<tr class=\" ' + ((i == w.besuchte_Spieler_aktuell) ? 'color_highlight' : '') + ' game_table_' + (gerade ? 'even' : 'odd') + '\">\n\
						<td class=\"r_rank\">' + w.besuchte_Spieler [i].Rang + '</td>\n\
						<td class=\"r_name\">\n\
							<a href=\"#\" class=\"gp_player_link\" onclick=\"besuchte_Spieler_Button = true;besuchte_Spieler_aktuell=' + i + ';Layout.playerProfile.open(\'' + w.besuchte_Spieler [i].Name + '\',' + w.besuchte_Spieler [i].id + ')\">' + w.besuchte_Spieler [i].Name + '</a></td>\n\
						<td class=\"r_points\">' + w.besuchte_Spieler [i].Punkte + '</td>\n\
						<td class=\"r_ally\"><a href=\"javascript:void(0)\" onclick=\"Layout.allianceProfile.open(\'' + w.besuchte_Spieler [i].Allianz + '\',' + w.besuchte_Spieler [i].Allianz_id + ')\">' + w.besuchte_Spieler [i].Allianz + '</a></td>\n\
						<td class=\"r_towns\">' + w.besuchte_Spieler [i].Stadtanzahl + '</td>\n\
						<td class=\"r_avg_points\">' + w.besuchte_Spieler [i].Stadtpunktedurchschnitt + '</td>\n\
					</tr>\n';
		gerade = ! gerade;
	}
	html += '\
					</tbody>\n\
					<tr style=\"height: 100%\">\n\
						<td></td>\n\
					</tr>\n\
				</table>\n\
			</div>\n\
		</div>\n\
	</div>\n\
</div>';
	this.wnd.setContent (html);
};

//dem GPWindowMgr den Typ HISTORY hinzufügen
$ (function () {
	w.GPWindowMgr.addWndType ("HISTORY", "link_history", WndHandlerHistory, 1);
});

/* Eigenschaften: besuchte_Spieler[i].id, .Name, .Rang, .Punkte, .Allianz, .Allianz_id, .Stadtanzahl, Stadtpunktedurchschnitt (aufgerundet) */
w.besuchte_Spieler = new Array ();
w.besuchte_Spieler_aktuell = -1;
w.besuchte_Spieler_Button = false;

function geheZuLetztemSpieler () {
	if ((w.besuchte_Spieler.length > 1) && (w.besuchte_Spieler_aktuell > 0)) {
		var Fenster = w.Layout.wnd.getOpen (w.Layout.wnd.TYPE_PLAYER_PROFILE);
		if (Fenster.length == 0)
			return false;
		var wnd = Fenster [Fenster.length - 1];
		wnd.toTop ();
		w.besuchte_Spieler_Button = true;
		--w.besuchte_Spieler_aktuell;
		wnd.requestContentGet ("player", "get_profile_html", {
			player_id: w.besuchte_Spieler [w.besuchte_Spieler_aktuell].id
		});
		wnd.setTitle ("Benutzerprofil - " + w.besuchte_Spieler [w.besuchte_Spieler_aktuell].Name);
		return true;
	}
	return false;
}

function geheZuNaechstemSpieler () {
	if (w.besuchte_Spieler_aktuell + 1 < w.besuchte_Spieler.length) {
		var Fenster = w.Layout.wnd.getOpen (w.Layout.wnd.TYPE_PLAYER_PROFILE);
		if (Fenster.length == 0)
			return false;
		var wnd = Fenster [Fenster.length - 1];
		wnd.toTop ();
		w.besuchte_Spieler_Button = true;
		++w.besuchte_Spieler_aktuell;
		wnd.requestContentGet ("player", "get_profile_html", {
			player_id: w.besuchte_Spieler [w.besuchte_Spieler_aktuell].id
		});
		wnd.setTitle ("Benutzerprofil - " + w.besuchte_Spieler [w.besuchte_Spieler_aktuell].Name);
		return true;
	}
	return false;
}

function ChronikAnzeigenSpieler () {
	var Fenster = w.Layout.wnd.getAllOpen ();
	var i = Fenster.length;
	while (i--)
		if (Fenster [i].getTitle () == "Chronik") {
			Fenster [i].getHandler ().refresh ();
			return;
		}
	var wnd = w.Layout.wnd.Create (w.Layout.wnd.TYPE_HISTORY, "Chronik");
	wnd.getHandler ().refresh ();
	wnd.getHandler ().refresh.call (wnd.getHandler ());
}

function ChronikAktualisierenSpieler () {
	var Fenster = w.Layout.wnd.getAllOpen ();
	var i = Fenster.length;
	while (i--)
		if (Fenster [i].getTitle () == "Chronik") {
			Fenster [i].getHandler ().refresh ();
			return true;
		}
	return false;
}

function Spieler_auslesen (html, Spielerid) {
	var Spieler = {id: Spielerid};
	var i = 0, j = 0;
	i = html.indexOf ("<h3>") + 4;
	j = html.indexOf ("</h3>");
	Spieler.Name = html.substring (i, j);
	var Ausdruck = /Layout\.allianceProfile\.open\(\'([^\']*)\'\,([^\)]*)\)/;
	if (Ausdruck.test (html)) {
		if (html.indexOf (Ausdruck.source) < html.indexOf ('<div id=\"player_points\">')) {
			Spieler.Allianz = RegExp.$1;
			Spieler.Allianz_id = parseInt (RegExp.$2, 10);
		} else {
			Spieler.Allianz = '';
			Spieler.Allianz_id = 0;
		}
	} else {
		Spieler.Allianz = '';
		Spieler.Allianz_id = 0;
	}
	Ausdruck = new RegExp ('(?:<)div id=\"player_points\"(?:>)(?:\n|.)*?(?:<)div(?:>)((?:\n|.)+?)\.(?:<)\/div(?:>)(?:\n|.)*?(?:<)div(?:>)((?:\n|.)+?)(?:<)\/div(?:>)');
	Ausdruck.exec (html);
	Spieler.Rang = RegExp.$1;
	Spieler.Punkte = RegExp.$2;
	var Stadtanzahl = 0;
	var Kopie = html;
	Ausdruck = /class=\"gp_town_link\">[^<]*<\/a>[^<]/;
	while (Ausdruck.test (Kopie)) {
		Kopie = Kopie.replace (Ausdruck, "");
		++Stadtanzahl;
	}
	Spieler.Stadtanzahl = Stadtanzahl;
	Spieler.Stadtpunktedurchschnitt = Math.round (Spieler.Punkte / Stadtanzahl);
	return Spieler;
}

function Allianz_auslesen (html, Allianzid) {
	var str = "";		//Protokollvariable
	var Allianz = {id: Allianzid};
	Ausdruck = new RegExp ('(?:<)div id=\"player_info\" class=\"bold\"(?:>)(?:\n|.)*?(?:<)h3(?:>)((?:\n|.)+?)(?:<)\/h3(?:>)(?:\n|.)*?(?:<)ul(?:>)(?:\n|.)*?(?:<)li(?:>)((?:\n|.)+?) Mitglieder(?:<)\/li(?:>)(?:\n|.)*?(?:<)li(?:>)((?:\n|.)+?) Punkte');
	Ausdruck.exec (html);
	Allianz.Name = RegExp.$1;
	Allianz.Mitglieder = RegExp.$2;
	Allianz.Punkte = RegExp.$3;
	Allianz.Spielerpunktedurchschnitt = Math.round (Allianz.Punkte / Allianz.Mitglieder);
	for (E in Allianz)
		str += "Allianz." + E + ": " + Allianz [E] + "\n";
	return Allianz;
}

function Funktion_erweitern (Objekt, Name, neue_Funktion) {
	var Orginal = Objekt [Name];
	Objekt [Name] = function () {
		var Ergebnis = Orginal.apply (this, arguments);
		try {
			neue_Funktion.apply (this, arguments);
		} catch (ex) {}
		return Ergebnis;
	}
}

//Methoden von WndHandlerPlayerProfile erweitern
(function () {
	w.geheZuLetztemSpieler = geheZuLetztemSpieler;
	w.geheZuNaechstemSpieler = geheZuNaechstemSpieler;
	w.ChronikAnzeigenSpieler = ChronikAnzeigenSpieler;
	w.ChronikAktualisierenSpieler = ChronikAktualisierenSpieler;

	Funktion_erweitern (w.WndHandlerPlayerProfile.prototype, "onRcvData", function (data) {
		w.besuchte_Spieler [w.besuchte_Spieler_aktuell] = Spieler_auslesen (data.html, w.besuchte_Spieler [w.besuchte_Spieler_aktuell].id) || w.besuchte_Spieler [w.besuchte_Spieler_aktuell];

		var str = '<div id="player_info" class="bold">\n\t<h3>';
		var str2 = "<a href=\"#\" onclick=\"geheZuLetztemSpieler ();\"   class=\"gehe_zu_letzter_seite\"   style=\"background-position: -29px 0px; position: absolute; height: 34px; width: 29px; background-image: url('http://cdn.grepolis.com/images/game/layout/alpha_sprite_2.18.png'); left: 20px; top: 5px;\" />";
		var str3 = "<a href=\"#\" onclick=\"geheZuNaechstemSpieler ();\" class=\"gehe_zu_naechster_seite\" style=\"background-position: -58px 0px; position: absolute; height: 34px; width: 29px; background-image: url('http://cdn.grepolis.com/images/game/layout/alpha_sprite_2.18.png'); left: 45px; top: 5px;\" />";
		var str4 = "<a href=\"#\" onclick=\"ChronikAnzeigenSpieler ();\" class=\"chronik_anzeigen\"        style=\"background-position: -87px 0px; position: absolute; height: 34px; width: 29px; background-image: url('http://cdn.grepolis.com/images/game/layout/alpha_sprite_2.18.png'); left: 70px; top: 5px;\" />";
		var str5 = '<span style="position: relative; left: 75px">';
		var ziel = data.html.indexOf ("<h3>"),
			ziel2 = data.html.indexOf ("</h3>"),
			Name = data.html.substring (ziel + 4, ziel2);
		$ ("div#player_info h3").html (str2 + str3 + str4 + str5 + Name + "</span>");

		$ ("a.gehe_zu_letzter_seite")  .mousePopup (new w.MousePopup (unescape ("Zur%FCck zum letzten Profil")));
		$ ("a.gehe_zu_naechster_seite").mousePopup (new w.MousePopup (unescape ("Vorw%E4rts zum n%E4chsten Profil")));
		$ ("a.chronik_anzeigen")       .mousePopup (new w.MousePopup (unescape ("Chronik anzeigen")));

		ChronikAktualisierenSpieler ();
		return true;
	});

	Funktion_erweitern (w.WndHandlerPlayerProfile.prototype, "onInit", function (title, UIopts) {
		if (! w.besuchte_Spieler_Button) {
			while (w.besuchte_Spieler_aktuell + 1 < w.besuchte_Spieler.length) {
				w.besuchte_Spieler.pop ();
			}
			w.besuchte_Spieler.push ({id: UIopts.player_id});
			w.besuchte_Spieler [w.besuchte_Spieler.length - 1].Name = "«unbekannt»";
			++w.besuchte_Spieler_aktuell;
		} else
			w.besuchte_Spieler_Button = false;

		Funktion_erweitern (this.wnd, "requestContentGet", function (controller, action, params, callback_success, external_reload) {
			if (controller == "player" && action == "get_profile_html")
				if (! w.besuchte_Spieler_Button) {
					while (w.besuchte_Spieler_aktuell + 1 < w.besuchte_Spieler.length) {
						w.besuchte_Spieler.pop ();
					}
					w.besuchte_Spieler.push ({id: params.player_id});
					w.besuchte_Spieler [w.besuchte_Spieler.length - 1].Name = "«unbekannt»";
					++w.besuchte_Spieler_aktuell;
				} else
					w.besuchte_Spieler_Button = false;
		});
		return true;
	});
}) ();

