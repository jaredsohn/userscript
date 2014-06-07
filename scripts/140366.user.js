// ==UserScript==
// @name        Konsole
// @namespace   Grepolis
// @description Fügt eine Konsole ein, die mit der Eingabetaste zu öffnen ist.
// @include     http://*.grepolis.*/game*
// @version     2.0.0.1
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

function Erweitern (Objekt, Funktionsname, neue_Funktion) {
	var Orginal = Objekt [Funktionsname];
	Objekt [Funktionsname] = function () {
		var Ergebnis = (Orginal || function () {}).apply (this, arguments);
		try {
			neue_Funktion.apply (this, [arguments, Ergebnis]);
		} catch (ex) {}
		return Ergebnis;
	}
}

//bei Enter soll sich das Fenster öffnen
$ (document).keypress (function (event) {
	var notTheseOnes = ['textarea', 'input'];
	var target = event.target.tagName.toLowerCase ();
	if (event.which == 13 && ($.inArray (target, notTheseOnes) < 0 || event.target.id == "Konsoleneingabe")) {
		w.ConsoleEnter ();
		event.preventDefault ();
	}
});

function WndHandlerConsole (wndhandle) {
	this.wnd = wndhandle;
	this.ist_Konsole = true;
}

w.Function.prototype.inherits.call (WndHandlerConsole, w.WndHandlerDefault);

WndHandlerConsole.prototype.getDefaultWindowOptions = function () {
	var ret = {
		position: ["center", "bottom"],
		height: 83,
		width: 640,
		resizable: false,
		title: 'Konsole'
	};
	return ret;
};

WndHandlerConsole.prototype.onInit = function (title, UIopts) {
	//window.setTimeout (this.erstellen.bind (this));
	return true;
};

WndHandlerConsole.prototype.erstellen = function (title, UIopts) {
	this.wnd.setTitle (typeof title == "string" ? title : "Konsole");
	var html = '<input id="Konsoleneingabe" type="text" style="width: 99%; font-family: monospace;" value="" onfocus="Konsole_Fokus (true);" onblur="Konsole_Fokus (false);" onsubmit="ConsoleEnter (); return false;" />';
	this.wnd.setContent2 (html);
	this.Eingabe = document.getElementById ("Konsoleneingabe");
	this.JQEingabe = $ (this.Eingabe);
	this.Eingabe.focus ();
	this.wnd.Fokus = true;
};

WndHandlerConsole.prototype.onClose = function () {
	return true;
};

WndHandlerConsole.prototype.onRcvData = function (data, controller, action) {
	this.wnd.setContent2 (data.html);
};

WndHandlerConsole.prototype.onSubmit = function () {
	this.tu ($ ("#Konsoleneingabe").val ());
	this.wnd.close ();
};

WndHandlerConsole.prototype.tu = function (Text) {
	var Teile = zerteilen (Text);
	if (! Teile.length)
		return;
	var Beginn = Teile [0].toLowerCase ();
	var Ende = "";
	for (var j = 1; j < Teile.length; ++j)
		Ende += Teile [j] + " ";
	if (Ende.length)
		Ende = Ende.substr (0, Ende.length - 1);
	
	switch (Beginn) {
		case "tu":
			eval (Ende);
			break;

		case "?":
		case "help":
			alert ("\t\t\t\t\t\t\t\tHilfe\nSie können das Konsole-Fenster mit der Eingabetaste öffnen. In diesem können Sie Befehle eingeben, die Sie dem Quelltext oder einer Dokumentation entnehmen können. Dabei werden \\n, \\r und \\t zu einem Zeilenumbruch, einem Wagenrücklauf oder einem Tabulator umgewandelt, alles andere, wie \\\\ oder \\u wird zu \\ bzw. u.\n\nDie einzelnen Argumente werden durch Leerzeichen getrennt, Anführungszeichen (\") übernehmen die Funktion von Klammern und erlauben das Einfügen von Leerzeichen auf einfache Art und Weise.");
			break;

		case "cd":
		case "ct":
		case "changetown":
		case "chtw":
		case "chtwn":
		case "cdg":
		case "ctg":
		case "chtwgt":
		case "chtwngt":
		case "changetowngoto":
			//Stadt wechseln
			if (Teile.length == 2) {		//Stadtnummer oder Stadtname
				var Stadtliste = w.ITowns.getTowns ();
				var Stadtidliste = getSortedTownIDMapByName (w.ITowns);

				if (ist_Zahl (Ende)) {		//nur Zahlen -> Stadtnummer
					var Index = parseInt (Ende, 10) - 1;		//Index = Nummer - 1, wie immer
					if (Index < Stadtidliste.length)
						w.HelperTown.townSwitch (Stadtidliste [Index]);
				} else {		//auch Buchstaben -> Stadtname (bzw. deren Anfang)
					for (var i = 0; i < Stadtidliste.length; ++i) {
						if (istBeginn (Stadtliste [Stadtidliste [i]].name, Ende)) {
							w.HelperTown.townSwitch (Stadtidliste [i]);
							break;
						}
					}
				}

			} else if (Teile.length == 3) {		//zuerst Gruppennummer oder Gruppenzahl, dann Stadtnummer
				var Gruppen = w.ITowns.getTownGroups ();
				var Gruppenids = getSortedGroupIDMapByName (w.ITowns);
				var Gruppenid = "0";

				//Gruppe bestimmen
				if (ist_Zahl (Teile [1])) {		//nur Zahlen -> Gruppennummer
					var Index = parseInt (Teile [1], 10) - 1;
					if (Index < Gruppenids.length)
						Gruppenid = Gruppenids [Index];
					else
						break;
				} else {		//auch Buchstaben -> Gruppenname (bzw. deren Anfang)
					for (var i = 0; i < Gruppen.length; ++i) {
						if (istBeginn (Gruppen [Gruppenids [i]].name, Teile [1])) {
							Gruppenid = Gruppenids [i];
							break;
						}
					}
				}

				//Stadt bestimmen
				if (ist_Zahl (Teile [2])) {		//nur Zahlen -> Gruppennummer
					var Stadtidliste = Stadtliste_sortieren (Gruppenid);
					var Index = parseInt (Teile [2], 10) - 1;
					if (Index < Stadtidliste.length)
						w.HelperTown.townSwitch (Stadtidliste [Index]);
				}		//erst nach Gruppe, dann nach Name zu suchen, macht keinen Sinn -> nicht möglich
			}

			//goto am Ende
			switch (Beginn) {
				case "cdg":
				case "ctg":
				case "chtwgt":
				case "chtwngt":
				case "changetowngoto":
					var offen = Teile [Teile.length - 2];
					offen = offen == "noclose" || offen == "ncls" || offen == "nocls";
					w.WMap.mapJump ({
						"id": + w.Game.townId,
						"ix": w.WMap.islandPosition.x,
						"iy": w.WMap.islandPosition.y
					}, offen);
					break;
			}
			break;

		case "gt":
		case "goto":
			var x = w.WMap.islandPosition.x,
				y = w.WMap.islandPosition.y,
				schließen = true,
				gehe_zu_Stadt = true;
			if (Teile.length > 2) {
				if (ist_Zahl (Teile [1]) && ist_Zahl (Teile [2])) {
					x = parseInt (Teile [1], 10);
					y = parseInt (Teile [2], 10);
					gehe_zu_Stadt = false;
					if (Teile.length > 3)
						if (Teile [3] == "noclose" || Teile [3] == "ncls" || Teile [3] == "nocls")
							schließen = false;
				}
			} else if (Teile.length == 2)
				if (Teile [1] == "noclose" || Teile [1] == "ncls" || Teile [1] == "nocls")
					schließen = false;
			w.WMap.elm.xcoord.val (x);
			w.WMap.elm.ycoord.val (y);
			if (gehe_zu_Stadt)
				w.WMap.mapJump ({
					"id": + w.Game.townId,
					"ix": w.WMap.islandPosition.x,
					"iy": w.WMap.islandPosition.y
				}, ! schließen);
			else
				w.WMap.mapJump (undefined, ! schließen);
			break;

		case "close":
			var Fenster = w.GPWindowMgr.getAllOpen ();
			for (var i = 0; i < Fenster.length; ++i)
				if (Fenster.getFocus ()) {
					Fenster.close ();
					break;
				}
			break;

		case "cls":
		case "closeall":
			w.GPWindowMgr.closeAll ();
			break;

		case "open":
			if (Teile.length > 1) {
				switch (Teile [1].toLowerCase ()) {
					case "main":
					case "barracks":
					case "docks":
					case "temple":
					case "academy":
					case "hide":
					case "farm":
					case "lumber":
					case "stoner":
					case "ironer":
					case "storage":
					case "wall":
						w.Layout.buildingWindow.open (Teile [1].toLowerCase ());
						break;

					case "senat":
						w.Layout.buildingWindow.open ("main");
						break;

					case "kaserne":
						w.Layout.buildingWindow.open ("barracks");
						break;

					case "hafen":
						w.Layout.buildingWindow.open ("docks");
						break;

					case "place":
					case "agora":
						if (Teile.length >= 3)
							switch (Teile [2].toLowerCase ()) {
								case "defense":
								case "verteidigung":
								case "index":
									w.Layout.buildingWindow.open ("place", true, "index");
									break;

								case "extern":
								case "außerhalb":
								case "units_beyond":
									w.Layout.buildingWindow.open ("place", true, "units_beyond");
									break;

								case "simulator":
								case "simulate":
								case "simulieren":
								case "test":
									w.Layout.buildingWindow.open ("place", true, "simulator");
									break;

								case "kultur":
								case "culture":
									w.Layout.buildingWindow.open ("place", true, "culture");
									break;

								default:
								w.Layout.buildingWindow.open ("place");
							}
						else
							w.Layout.buildingWindow.open ("place");
						break;

					case "tempel":
						w.Layout.buildingWindow.open ("temple");
						break;

					case "akademie":
						w.Layout.buildingWindow.open ("academy");
						break;

					case "market":
					case "markt":
					case "marktplatz":
						if (Teile.length >= 3)
							switch (Teile [2].toLowerCase ()) {
								case "own_offer":
								case "create":
								case "erstellen":
									w.Layout.buildingWindow.open ("market", true, "own_offer");
									break;

								default:
									w.Layout.buildingWindow.open ("market");
							}
						else
							w.Layout.buildingWindow.open ("market");
						break;

					case "hoehle":
					case unescape ("h%F6hle"):
						w.Layout.buildingWindow.open ("hide");
						break;

					case "bauernhof":
						w.Layout.buildingWindow.open ("farm");
						break;

					case "holz":
					case "holzfäller":
					case "wood":
						w.Layout.buildingWindow.open ("lumber");
						break;

					case "silber":
					case "silbermine":
					case "iron":
						w.Layout.buildingWindow.open ("ironer");
						break;

					case "stein":
					case "steinbruch":
					case "stone":
						w.Layout.buildingWindow.open ("stoner");
						break;

					case "lager":
						w.Layout.buildingWindow.open ("storage");
						break;

					case "mauer":
						w.Layout.buildingWindow.open ("wall");
						break;

					case "bug_report":
					case "bug":
					case "Fehler":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_BUG_REPORT);
						break;

					case "wonders":
					case "wonder":
					case "wunder":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_WONDERS);
						break;

					case "stadtübersicht":
					case "stadt":
					case "town":
					case "index":
					case "townindex":
					case "town_index":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_TOWNINDEX);
						break;

					case "alliance":
					case "allianz":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_ALLIANCE);
						break;

					case "forum":
					case "allianceforum":
					case "alliance_forum":
					case "allianzforum":
					case "allianz_forum":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_ALLIANCE_FORUM);
						break;

					case "phoen":
					case "phoenician":
					case "phoeniciansaleman":
					case "phoenician_saleman":
					case "phönizisch":
					case "phönizischer":
					case "phönizischerhändler":
					case "phönizischer_händer":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_PHOENICIANSALESMAN);
						break;

					case "rang":
					case "rangking":
					case "rangliste":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_RANKING);
						break;

					case "rang":
					case "rangking":
					case "rangliste":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_RANKING);
						break;

					case "rang":
					case "rangking":
					case "rangliste":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_RANKING);
						break;

					case "rang":
					case "rangking":
					case "rangliste":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_RANKING);
						break;

					case "rang":
					case "rangking":
					case "rangliste":
						w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_RANKING);
						break;
				}
			}
			break;

		default:
			return false;
	}
	return true;
};

w.Konsole_Fokus = function (Fokus) {
	var Fenster = w.Layout.wnd.getOpenFirst (w.Layout.wnd.TYPE_CONSOLE);
	if (Fenster)
		Fenster.Fokus = Fokus;
}

w.ConsoleEnter = function () {
	var Fenster = w.GPWindowMgr.getOpenFirst (w.GPWindowMgr.TYPE_CONSOLE);
	if (! Fenster)
		w.GPWindowMgr.Create (w.GPWindowMgr.TYPE_CONSOLE).getHandler ().erstellen ();
	else
		if (! Fenster.Fokus)
			document.getElementById ("Konsoleneingabe").focus ();
		else
			Fenster.getHandler ().onSubmit ();
};

function ist_Zahl (Text) {
	return /^[0-9]+$/.test (Text);
}

function zerteilen (Text) {
	var Teile = new Array ();
	var aktuell = "";
	var Kommata = false,	// '"'
		Strich = false;		// '\'
	for (var i = 0; i < Text.length; ++i) {
		if (Strich) {
			if (Text [i] == 'b')
				aktuell += '\b';
			else if (Text [i] == 'n')
				aktuell += '\n';
			else if (Text [i] == 'r')
				aktuell += '\r';
			else if (Text [i] == 't') {
				aktuell += "\t";
			} else
				aktuell += Text [i];
			Strich = false;
			continue;
		}
		if (Text [i] == '"') {
			Kommata = ! Kommata;
			continue;
		}
		if (Text [i] == '\\') {
			Strich = true;
			continue;
		}
		if ((Text [i] == ' ') && ! Kommata) {
			if (aktuell != "") {
				Teile.push (aktuell);
				aktuell = "";
			}
			continue;
		}
		aktuell += Text [i];
	}
	if (Strich)
		aktuell += '\\';
	if (aktuell != "")
		Teile.push (aktuell);
	return Teile;
}

function Vergleich (Text1, Text2) {
	var i = 0;
	while ((i < Text1.length) && (i < Text2.length)) {
		if (Text1 [i] < Text2 [i])
			return -1;
		else if (Text1 [i] > Text2 [i])
			return 1;
	}
	if (Text1.length < Text2.length)
		return -1;
	if (Text1.length > Text2.length)
		return 1;
	return 0;
}

function istBeginn (Text, Beginn) {
	if (Beginn.length > Text.length)
		return false;
	for (var i = 0; i < Beginn.length; ++i)
		if (Beginn [i] != Text [i])
			return false;
	return true;
}

function getSortedTownIDMapByName (ITowns) {
	var map = new Array ();
	var towns = ITowns.getTowns ();
	var tid;
	for (tid in towns) {
		map.push (tid);
	}
	map.sort (function (a, b) {
		a = ((towns [a] || {}).name || "").toLowerCase ();
		b = ((towns [b] || {}).name || "").toLowerCase ();
		return a.localeCompare (b);
	});
	return map;
};

function getSortedGroupIDMapByName (ITowns) {
	var map = new Array ();
	var groups = ITowns.getTownGroups ();
	var gid;
	for (gid in groups) {
		if (gid == "null")
			continue;
		map.push (gid);
	}
	map.sort (function (a, b) {
		a = ((groups [a] || {}).name || "").toLowerCase ();
		b = ((groups [b] || {}).name || "").toLowerCase ();
		return a.localeCompare (b);
	});
	return map;
};

function Stadtliste_sortieren (Gruppenid) {
	var map = new Array ();
	var group = w.ITowns.getTownGroups () [Gruppenid];
	var towns = group.towns;
	var tid;
	for (tid in towns) {
		map.push (tid);
	}
	towns = w.ITowns.getTowns ();
	map.sort (function (a, b) {
		a = ((towns [a] || {}).name || "").toLowerCase ();
		b = ((towns [b] || {}).name || "").toLowerCase ();
		return a.localeCompare (b);
	});
	return map;
};

//dem GPWindowMgr den Typ CONSOLE hinzufügen
$ (function () {
	w.GPWindowMgr.addWndType ("CONSOLE", "link_console", WndHandlerConsole, 1);
});

