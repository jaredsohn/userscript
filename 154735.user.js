// ==UserScript==
// @name        Analysefenster
// @namespace   Grepolis
// @description Fügt ein Grepolis ein Analysefenster hinzu, sodass auf einfache Art und Weise Eigenschaften angezeigt werden können.
// @include     http://*.grepolis.*/game/index*
// @require     http://jsbeautifier.org/beautify.js
// @version     2.3.4
// ==/UserScript==

var w = typeof unsafeWindow == "object" ? unsafeWindow : window, $ = w.$;

var zu_testen = [], zu_testen_vorher = [];

//zu_testen mit Werten füllen
new function () {
	//zu beachten: Die Werte in zu_testen werden vor denen in zu_testen_vorher gewertet, damit werden Duplikate als Element von zu_testen gewertet und damit nach den anderen Attributen.
	zu_testen_vorher = ["length"];

	zu_testen = [
		//new Object ()
		"constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf",

		//new Function ()
		"apply", "arguments", "bind", "call", "caller", "prototype",

		//new Number ()
		"toExponential", "toFixed", "toPrecision",

		//new Date ()
		"getDate", "getDay", "getFullYear", "getHours", "getMilliseconds", "getMinutes", "getMonth", "getSeconds", "getTime", "getTimezoneOffset",
		"getUTCDate", "getUTCDay", "getUTCFullYear", "getUTCHours", "getUTCMilliseconds", "getUTCMinutes", "getUTCMonth", "getUTCSeconds",
		"getVarDate", "getYear",
		"setDate", "setDay", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime",
		"setUTCDate", "setUTCDay", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds",
		"setYear",
		"toDateString", "toGMTString", "toISOString", "toJSON", "toLocaleDateString", "toLocaleTimeString", "toTimeString", "toUTCString",

		//new String ()
		"anchor", "big", "blink", "bold", "charAt", "charCodeAt", "concat", "fixed", "fontcolor", "fontsize", "indexOf", "italics", "link", "localeCompare", "match", "replace", "search", "slice",
		"small", "split", "strike", "sub", "substr", "substring", "sup", "toLocaleLowerCase", "toLocaleUpperCase", "toLowerCase", "toUpperCase", "trim",

		//new RegExp ()
		"compile", "exec", "global", "ignoreCase", "lastIndex", "multiline", "options", "source", "test",

		//new Array ()
		"concat", "every", "filter", "forEach", "join", "lastIndexOf", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "some", "sort", "splice", "unshift",

		//new ArrayBuffer ()
		"byteLength",

		//new Error ()
		"description", "message", "name", "number",

		//new Float32Array ()
		"buffer", "byteLength", "byteOffset", "BYTES_PER_ELEMENT", "set", "subarray",

		//history
		"back", "forward", "go", "pushState", "replaceState", "state",

		//localStorage
		"clear", "getItem", "key", "removeItem", "setItem",

		//Math
		"abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "E", "exp", "floor", "LN10", "LN2", "log", "LOG10E", "LOG2E", "max", "min", "PI", "pow", "random", "round", "sqrt", "SQRT1_2", "SQRT2", "tan",

		//Object
		"create", "defineProperties", "defineProperty", "freeze", "getOwnPropertyDescriptor", "getOwnPropertyNames", "getPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys", "preventExtensions", "seal"
	];
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

function suchen (Ziel, gesucht, genau) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde_Name = [];
			var Funde_Wert = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					var neu = {
						Pfad: Ziel.Pfad + "." + E,
						Objekt: Ziel.Objekt [E]
					};
					if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
						Ergebnis.durchsucht.push (Ziel.Objekt [E]);
						neue_Ziele.push (neu);
					}
					if (E == gesucht)
						Funde_Name.push (neu);
					if (genau) {
						if (neu.Objekt === gesucht)
							Funde_Wert.push (neu);
					} else {
						if (neu.Objekt == gesucht)
							Funde_Wert.push (neu);
					}
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde_Name.push (Funde_Name);
				Ergebnis.Funde_Name_gesamt += Funde_Name.length;
				Ergebnis.Funde_Wert.push (Funde_Wert);
				Ergebnis.Funde_Wert_gesamt += Funde_Wert.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		get genau () {
			return genau;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde_Name: [],
		Funde_Name_gesamt: 0,
		Funde_Wert: [],
		Funde_Wert_gesamt: 0
	};

	return Ergebnis;
}

function suchen_Name (Ziel, gesucht) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					var neu = {
						Pfad: Ziel.Pfad + "." + E,
						Objekt: Ziel.Objekt [E]
					};
					if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
						Ergebnis.durchsucht.push (Ziel.Objekt [E]);
						neue_Ziele.push (neu);
					}
					if (E.search (gesucht) == 0)
						Funde.push (neu);
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde.push (Funde);
				Ergebnis.Funde_gesamt += Funde.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde: [],
		Funde_gesamt: 0
	};

	return Ergebnis;
}

function suchen_Wert (Ziel, gesucht, genau) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					var neu = {
						Pfad: Ziel.Pfad + "." + E,
						Objekt: Ziel.Objekt [E]
					};
					if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
						Ergebnis.durchsucht.push (Ziel.Objekt [E]);
						neue_Ziele.push (neu);
					}
					if (genau) {
						if (neu.Objekt === gesucht)
							Funde.push (neu);
					} else {
						if (neu.Objekt == gesucht)
							Funde.push (neu);
					}
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde.push (Funde);
				Ergebnis.Funde_gesamt += Funde.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		get genau () {
			return genau;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde: [],
		Funde_gesamt: 0
	};

	return Ergebnis;
}

function suchen_try (Ziel, gesucht, genau) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde_Name = [];
			var Funde_Wert = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					try {
						var neu = {
							Pfad: Ziel.Pfad + "." + E,
							Objekt: Ziel.Objekt [E]
						};
						if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
							Ergebnis.durchsucht.push (Ziel.Objekt [E]);
							neue_Ziele.push (neu);
						}
						if (E == gesucht)
							Funde_Name.push (neu);
						if (genau) {
							if (neu.Objekt === gesucht)
								Funde_Wert.push (neu);
						} else {
							if (neu.Objekt == gesucht)
								Funde_Wert.push (neu);
						}
					} catch (ex) {}
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde_Name.push (Funde_Name);
				Ergebnis.Funde_Name_gesamt += Funde_Name.length;
				Ergebnis.Funde_Wert.push (Funde_Wert);
				Ergebnis.Funde_Wert_gesamt += Funde_Wert.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		get genau () {
			return genau;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde_Name: [],
		Funde_Name_gesamt: 0,
		Funde_Wert: [],
		Funde_Wert_gesamt: 0
	};

	return Ergebnis;
}

function suchen_Name_try (Ziel, gesucht) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					try {
						var neu = {
							Pfad: Ziel.Pfad + "." + E,
							Objekt: Ziel.Objekt [E]
						};
						if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
							Ergebnis.durchsucht.push (Ziel.Objekt [E]);
							neue_Ziele.push (neu);
						}
						if (E == gesucht)
							Funde.push (neu);
					} catch (ex) {}
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde.push (Funde);
				Ergebnis.Funde_gesamt += Funde.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		get genau () {
			return genau;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde: [],
		Funde_gesamt: 0
	};

	return Ergebnis;
}

function suchen_Wert_try (Ziel, gesucht, genau) {
	var Ergebnis = {
		get weitersuchen () {
			var Ziele = Ergebnis.Ziele [Ergebnis.Ziele.length - 1];
			var neue_Ziele = [];
			var Funde = [];
			var durchsucht = Ergebnis.durchsucht.length;
			for (var i in Ziele) {
				var Ziel = Ziele [i];
				for (var E in Ziel.Objekt) {
					try {
						var neu = {
							Pfad: Ziel.Pfad + "." + E,
							Objekt: Ziel.Objekt [E]
						};
						if (Ergebnis.durchsucht.indexOf (Ziel.Objekt [E]) < 0) {
							Ergebnis.durchsucht.push (Ziel.Objekt [E]);
							neue_Ziele.push (neu);
						}
						if (genau) {
							if (neu.Objekt === gesucht)
								Funde.push (neu);
						} else {
							if (neu.Objekt == gesucht)
								Funde.push (neu);
						}
					} catch (ex) {}
				}
			}
			if (neue_Ziele.length) {
				Ergebnis.Ziele.push (neue_Ziele);
				Ergebnis.Funde.push (Funde);
				Ergebnis.Funde_gesamt += Funde.length;
			}
			if (durchsucht == Ergebnis.durchsucht.length)
				return null;
			return Ergebnis;
		},

		get "in" () {
			return Ziel;
		},
		get nach () {
			return gesucht;
		},
		get genau () {
			return genau;
		},
		durchsucht: [Ziel],
		Ziele: [[{
			Pfad: "",
			Objekt: Ziel
		}]],
		Funde: [],
		Funde_gesamt: 0
	};

	return Ergebnis;
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

function Inhalt (Ausdruck, wnd) {
	if (typeof Ausdruck == "string") {
		this.Name = Ausdruck;
		try {
			var This = this;
			(function anonym () {
				This.Wert = eval (This.Name);
				This.Typ = typeof This.Wert;
			}.bind (w)) ();
		} catch (ex) {
			this.Wert = "Fehler: " + ex.name + " - " + ex.message;
			this.Typ = "<error>";
		}
	} else {
		this.Name = "<unbekannt>";
		this.Wert = Ausdruck;
	}
	this.wnd = wnd;
	this.Handler = this.wnd.getHandler ();
	this.Objekt = new Objekt (this.Name, this.Wert, this, 0, 0, false);
	this.offen = false;
	this.ausgeblendet = false;

	this.Create = function () {
		this.JQContainer = $ ('<div id="Analysefenster_div" style="left: 0px; right: 0px; top: 0px; bottom: 0px; position: absolute; border: 1px solid black;"></div>').appendTo ($ (this.wnd.getElement ()));
		this.wnd.getElement ().style.overflowX = "auto";
		this.JQOben = $ ("<div></div>").appendTo (this.JQContainer);
		this.JQTextfeld = $ ('<input type="text" value="' + this.Name + '" style="margin: 0px; width: 100%; box-sizing: border-box; -moz-box-sizing: border-box; font-family: monospace;" />').keydown (function (event) {
			if (event.whith == 10 || event.which == 13)
				window.setTimeout (function () {
					this.Objekt.Destroy ();
					this.Name = Ausdruck = this.JQTextfeld.val ();
					try {
						this.Wert = eval (this.Name);
						this.Typ = typeof this.Wert;
					} catch (ex) {
						this.Wert = "Fehler: " + ex.name + " - " + ex.message;
						this.Typ = "<error>";
					}
					this.wnd = wnd;
					this.Handler = this.wnd.getHandler ();
					this.Objekt = new Objekt (this.Name, this.Wert, this, 0, 0, false);
					this.offen = false;
					this.wnd.setTitle ("Analysefenster - " + this.Name);
					this.Objekt.Create ();
				}.bind (this), 10);
		}.bind (this)).appendTo (this.JQOben);
		this.JQOben.append ("<br />");
		this.JQAusblenden = $ ('<input type="checkbox" id="Analysefenster_alles_anzeigen" />').click (function () {
			this.ausblenden_Status (! this.JQAusblenden.is (":checked"));
		}.bind (this)).appendTo (this.JQOben);
		this.JQAusblenden.click ();
		this.ausblenden_Status (false);
		this.JQOben.append ('<label for="Analysefenster_alles_anzeigen">alles anzeigen</label>');
		this.Stilelement = document.getElementById ("M_Analysefenster_Stile");
		if (! this.Stilelement) {
			this.Stilelement = document.createElement ("style");
			this.Stilelement.type = "text/css";
			this.Stilelement.id = "M_Analysefenster_Stile";
			this.Stilelement.innerHTML = ".M_Analysefenster_Stile_Name {max-width: 450px; max-height: 48px; overflow: hidden; word-wrap: break-word;}\r\n"
									   + ".M_Analysefenster_Stile_Wert {max-width: 450px; max-height: 16px; overflow: hidden; word-wrap: break-word;}\r\n"
									   + ".M_Analysefenster_Stile_Typ {max-height: 16px; overflow: hidden; word-wrap: break-word;}\r\n"
									   + ".M_Analysefenster_Stile_Name2 {font-size: 85%; font-style: italic;}\r\n"
									   + "#TBodyID tr {border-width: 1px 0px; border-style: solid none; border-color: gray;}";
			document.head.appendChild (this.Stilelement);
		}
		this.JQTabellenkopf = $ ('<div style="border-top: 1px solid black; border-bottom: 1px solid gray; text-align: center; font-weight: bold; height: 16px;"><span style="position: absolute; left: 0px; width: 450px;">Name</span><span style="position: absolute; left: 450px; width: 450px;">Wert</span><span style="position: absolute; left: 900px; right: 0px;">Typ</span></div>').appendTo (this.JQContainer);
		this.JQTabellenbehälter = $ ('<div style="overflow-y: auto; height: 479px;"></div>').appendTo (this.JQContainer);
		this.JQTabelle = $ ('<table rules="groups" style="width: 100%; font-family: monospace; border-collapse: collapse;"><colgroup><col style="width: 450px;" /><col style="width: 450px;" /><col style="width: auto;" /></colgroup></table>').appendTo (this.JQTabellenbehälter);
		this.JQContainer = this.JQTabelle_tbody = $ ("<tbody></tbody>").appendTo (this.JQTabelle);
		this.JQTabelle_Neu_Name = this.JQTabelle.find ("#Analysefenster_Neu_Name");
		this.JQTabelle_Neu_Wert = this.JQTabelle.find ("#Analysefenster_Neu_Wert");
		this.JQTabelle_Neu_Typ = this.JQTabelle.find ("#Analysefenster_Neu_Typ");
		if (this.Objekt)
			this.Objekt.Create ();
	};

	this.Destroy = function () {
		if (this.Objekt)
			this.Objekt.Destroy ();
		if ($ ("#Analysefenster_div").length) {
			if (this.JQTabelle_Neu_Typ)
				this.JQTabelle_Neu_Typ.remove ();
			if (this.JQTabelle_Neu_Wert)
				this.JQTabelle_Neu_Wert.remove ();
			if (this.JQTabelle_Neu_Name)
				this.JQTabelle_Neu_Name.remove ();
			if (this.JQTextfeld)
				this.JQTextfeld.remove ();
			if (this.JQContainer)
				this.JQContainer.remove ();
			if (this.JQTabelle)
				this.JQTabelle.remove ();
			$ ("#Analysefenster_div").remove ();
		}
	};

	this.neuer_Ausdruck = function (Ausdruck) {
		if (this.Objekt && typeof this.Objekt.Destroy == "function")
			this.Objekt.Destroy ();
		if (typeof Ausdruck == "string") {
			this.Name = Ausdruck;
			try {
				var This = this;
				(function anonym () {
					This.Wert = eval (This.Name);
					This.Typ = typeof This.Wert;
				}.bind (w)) ();
			} catch (ex) {
				this.Wert = "Fehler: " + ex.name + " - " + ex.message;
				this.Typ = "<error>";
			}
		} else {
			this.Name = "<unbekannt>";
			this.Wert = Ausdruck;
		}
		this.Typ = typeof this.Wert;
		this.Objekt = new Objekt (this.Name, this.Wert, this, 0, 0, false);
		this.offen = false;
		this.wnd.setTitle ("Analysefenster - " + this.Name);
		if (this.JQContainer) {
			this.JQContainer.empty ();
			this.Objekt.Create ();
		}
	};

	this.ausblenden_Status = function (neuer_Wert) {
		if (typeof neuer_Wert != "undefined" && neuer_Wert != this.ausgeblendet)
			this.ausgeblendet = neuer_Wert;
		if (! this.ausblenden)
			this.ausblenden = document.getElementById ("M_Analysefenster_ausblenden");
		if (! this.ausblenden) {
			this.ausblenden = document.createElement ("style");
			this.ausblenden.type = "text/css";
			this.ausblenden.id = "M_Analysefenster_ausblenden";
			document.head.appendChild (this.ausblenden);
		}
		this.ausblenden.innerHTML = ".M_Analysefenster_ausblenden {display: " + (this.ausgeblendet ? "none" : "normal") + ";}";
		return this.ausgeblendet;
	};
}

function Objekt (Name, Wert, parent, Tiefe, Index, geerbt, kein_Typ, Fehlerwert, auszublenden) {
	this.Name = Name;
	this.Wert = Wert;
	if (Fehlerwert)
		this.Typ = "<error>";
	else if (kein_Typ)
		this.Typ = "<no type>";
	else
		this.Typ = typeof this.Wert;
	this.parent = parent;
	this.Tiefe = Tiefe;
	this.Index = Index;
	this.geerbt = geerbt;
	this.Zeichen_vor_Name = "";
	for (var i = 0; i < this.Tiefe; ++i)
		this.Zeichen_vor_Name += "│&nbsp;";
	this.Zeichen_vor_Name += "├─";
	this.offen = false;
	this.Elemente = [];
	this.auszublenden = auszublenden;

	this.Create = function () {
		this.JQZeile = $ ("<tr" + (this.auszublenden ? ' style="opacity: 0.5;"' : this.geerbt ? ' style="opacity: 0.75;"' : "") + (this.auszublenden ? ' class="M_Analysefenster_ausblenden"' : "") + "></tr>");
		this.JQZelle1 = $ ("<td></td>").appendTo (this.JQZeile);
		this.JQZelle2 = $ ("<td></td>").appendTo (this.JQZeile);
		this.JQZelle3 = $ ("<td></td>").appendTo (this.JQZeile);
		this.JQZelle1_Container = $ ('<div class="M_Analysefenster_Stile_Name"></div>').appendTo (this.JQZelle1);
		this.JQZeichen_vor_Name = $ ("<span>" + this.Zeichen_vor_Name + "</span>").appendTo (this.JQZelle1_Container);
		//TODO: Buttons vor Text in Bilder umwandeln
		this.JQButton = $ ('<a href="#">[+]</a>').click (function () {
			this.toggle ();
		}.bind (this)).appendTo (this.JQZelle1_Container);
		this.JQName = $ ("<span" + (this.auszublenden ? ' class="M_Analysefenster_Stile_Name2"' : "") + ">" + this.Name + "</span>").appendTo (this.JQZelle1_Container);
		this.JQWert = $ ('<div class="M_Analysefenster_Stile_Wert"></div>').appendTo (this.JQZelle2);
		this.JQTyp = $ ('<span class="M_Analysefenster_Stile_Typ"></span>').appendTo (this.JQZelle3);
		var Wert = "", Typ = "";
		switch (this.Typ) {
			case "boolean":
			case "number":
				Wert = this.Wert.toString ();
				break;

			case "string":
				Typ = "string (" + this.Wert.length + ")";
				Wert = this.Wert;
				break;

			case "function":
				Typ = "function";
				Wert = "<function>";
				break;

			case "<no type>":
				Typ = "string";
				Wert = null;
				this.JQWert.remove ();
				this.JQWert = $ ('<textarea readonly="readonly" wrap="off" style="height: 161px; width: 99%; border: 1px solid black;"></textarea>').appendTo (this.JQZelle2);
				this.JQWert.html (this.Wert);
				break;

			case "<error>":
				Wert = this.Wert;
				break;

			default:
				if (this.Wert == null && this.Typ != "undefined") {
					Typ = "null";
					Wert = "<null>";
				} else if (this.Wert instanceof Array || this.Wert instanceof w.Array) {
					Typ = "array (" + this.Wert.length + ")";
					Wert = "<array with length " + this.Wert.length + ">";
				} else if (this.Wert instanceof Date || this.Wert instanceof w.Date) {
					Typ = "date";
					Wert = this.Wert.toString ();
				} else if (this.Wert instanceof RegExp || this.Wert instanceof w.RegExp) {
					Typ = "RegExp";
					Wert = this.Wert.toString ();
				} else {
					try {
						var als_Text = this.Wert.toString ();
						if (als_Text == "[object Object]")
							Wert = "<object>";
						else
							Wert = Typ = als_Text;
					} catch (ex) {
						Wert = this.Typ;
					}
				}
		}
		if (! Typ.length || Typ == "[object Object]" || Typ.indexOf (location.protocol + "//" + location.host + location.pathname + location.search) >= 0)
			Typ = this.Typ;
		var Mantel = Typ.match (/\[object XrayWrapper (.*)\]/);
		if (Mantel) {
			Typ = Mantel [1];
			Wert = Mantel [1];
		}
		if (typeof Wert == "string")
			this.JQWert.get (0).appendChild (document.createTextNode (Wert));
		if (typeof Typ == "string")
			this.JQTyp.get (0).appendChild (document.createTextNode (Typ));

		this.JQLöschen = $ ('<a href="#" style="float: right;">[X]</a>').click (function () {
			if (this.parent.parent)
				if (delete this.parent.Wert [this.Name]) {
					try {
						if (typeof this.parent [this.Name] != "undefined")
							return;
					} catch (ex) {}
					this.Destroy ();
					this.parent.Elemente.splice (this.parent.Elemente.indexOf (this), 1);
				}
		}.bind (this)).appendTo (this.JQZelle3);

		if (this.parent.JQContainer)
			this.JQZeile.appendTo (this.parent.JQContainer);
		else
			this.JQZeile.insertAfter (this.parent.JQZeile);
	};

	this.Destroy = function () {
		for (var i = 0; i < this.Elemente.length; ++i)
			if ("Destroy" in this.Elemente [i])
				this.Elemente [i].Destroy ();
			else {
				alert ("Kein Destroy gefunden!\nElemente.length: " + this.Elemente.length + "\ni: " + i);
				Analysieren (this.Elemente [i], "Elemente [" + i + "]", true);
			}
		if (this.JQZeile && this.JQZeile.length)
			this.JQZeile.remove ();
	};

	this.toggle = function () {
		if (this.offen)
			this.close ();
		else
			this.open ();
	};

	//TODO: this.open, this.close
	this.open = function () {
		this.JQButton.html ("[-]");
		this.offen = true;
		if (Wert != null) {
			var Index = 0, Nummer, Neu, Neu2, kein_in = this.Typ == "boolean" || this.Typ == "number" || this.Typ == "string", hasOwnProperty = typeof this.Wert.hasOwnProperty == "function";
			for (var E in this.Wert) {
				try {
					if (this.Typ == "string") {
						Nummer = parseInt (E);
						if (Nummer >= 0 && Nummer < this.Wert.length && typeof this.Wert [E] == "string" && this.Wert [E].length == 1)
							continue;
					}
					if (hasOwnProperty)
						Neu = new Objekt (E, this.Wert [E], this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), false, false, this.auszublenden);
					else
						Neu = new Objekt (E, this.Wert [E], this, this.Tiefe + 1, Index++, this.geerbt, false, false, this.auszublenden);
				} catch (ex) {
					if (hasOwnProperty)
						Neu = new Objekt (E, "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, true, this.auszublenden);
					else
						Neu = new Objekt (E, "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt, true, true, this.auszublenden);
				}
				this.Elemente.push (Neu);
			}
			if (this.Typ == "function" || this.Typ == "string") {
				Neu = new Objekt ("toString ()", this.Typ == "function" ? js_beautify (this.Wert.toString (), {
					indent_size: 4,
					indent_char: " ",
					preserve_newlines: true,
					max_preserve_newlines: null,
					jslint_happy: true,
					brace_style: "collapse",
					space_before_conditional: true,
					unescape_strings: true,
					wrap_line_length: null
				}) : this.Wert.toString (), this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, false, this.auszublenden);
				this.Elemente.push (Neu);
			}

			if (this.Typ != "<no type>" && this.Wert != null)
				for (var Testwert in zu_testen)
					//um den Fehler bei Ausdrücken wie location.constructor bzw. "constructor" in location abzufangen:
					try {
						if ((kein_in ? typeof this.Wert [zu_testen [Testwert]] != "undefined" : zu_testen [Testwert] in this.Wert) && ! this.Elemente.some (function (Wert) {return Wert.Name == zu_testen [Testwert];})) {
							try {
								if (hasOwnProperty)
									Neu2 = new Objekt (zu_testen [Testwert], this.Wert [zu_testen [Testwert]], this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (zu_testen [Testwert]), false, false, this.auszublenden || ! this.Wert.hasOwnProperty (zu_testen [Testwert]));
								else
									Neu2 = new Objekt (zu_testen [Testwert], this.Wert [zu_testen [Testwert]], this, this.Tiefe + 1, Index++, this.geerbt, false, false, true);
							} catch (ex) {
								if (hasOwnProperty)
									Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, true, this.auszublenden || ! this.Wert.hasOwnProperty (E));
								else
									Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt, true, true, true);
							}
							this.Elemente.push (Neu2);
						}
					} catch (ex) {
						if (hasOwnProperty)
							Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, true, this.auszublenden || ! this.Wert.hasOwnProperty (E));
						else
							Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt, true, true, true);
						this.Elemente.push (Neu2);
					}
			for (var i = this.Elemente.length; i;) {
				this.Elemente [--i].Create ();
				if (this.Elemente [i].Typ == "<error>") {
					this.Elemente [i].JQButton.remove ();
					delete this.Elemente [i].JQButton;
					this.Elemente [i].JQButton = $ ('<a href="#">[+]</a>').click (function (event) {
						event.preventDefault ();
					}).insertBefore (this.Elemente [i].JQName);
				}
			}
			if (this.Typ != "<no type>" && this.Wert != null)
				for (var Testwert in zu_testen_vorher)
					try {
						if ((kein_in ? typeof this.Wert [zu_testen_vorher [Testwert]] != "undefined" : zu_testen_vorher [Testwert] in this.Wert) && ! this.Elemente.some (function (Wert) {return Wert.Name == zu_testen_vorher [Testwert];})) {
							try {
								if (hasOwnProperty)
									Neu2 = new Objekt (zu_testen_vorher [Testwert], this.Wert [zu_testen_vorher [Testwert]], this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (zu_testen_vorher [Testwert]), false, false, this.auszublenden || ! this.Wert.hasOwnProperty (zu_testen_vorher [Testwert]));
								else
									Neu2 = new Objekt (zu_testen_vorher [Testwert], this.Wert [zu_testen_vorher [Testwert]], this, this.Tiefe + 1, Index++, this.geerbt, false, false, this.auszublenden);
							} catch (ex) {
								if (hasOwnProperty)
									Neu2 = new Objekt (zu_testen_vorher [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, true, this.auszublenden || ! this.Wert.hasOwnProperty (E));
								else
									Neu2 = new Objekt (zu_testen_vorher [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt, true, true, true);
							}
							Neu2.Create ();
							if (Neu2.Typ == "<error>") {
								Neu2.JQButton.remove ();
								delete Neu2.JQButton;
								Neu2.JQButton = $ ('<a href="#">[+]</a>').click (function (event) {
									event.preventDefault ();
								}).insertBefore (Neu2.JQName);
							}
							this.Elemente.push (Neu2);
						}
					} catch (ex) {
						if (hasOwnProperty)
							Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt || ! this.Wert.hasOwnProperty (E), true, true, this.auszublenden || ! this.Wert.hasOwnProperty (E));
						else
							Neu2 = new Objekt (zu_testen [Testwert], "Fehler: " + ex.name + " - " + ex.message, this, this.Tiefe + 1, Index++, this.geerbt, true, true, true);
						Neu2.Create ();
						if (Neu2.Typ == "<error>") {
							Neu2.JQButton.remove ();
							delete Neu2.JQButton;
							Neu2.JQButton = $ ('<a href="#">[+]</a>').click (function (event) {
								event.preventDefault ();
							}).insertBefore (Neu2.JQName);
						}
						this.Elemente.push (Neu2);
					}

			if (this.Typ == "function" || this.Typ == "string")
				this.Elemente.push (Neu);
		}
	};

	this.close = function () {
		for (var i = 0; i < this.Elemente.length; ++i)
			if ("Destroy" in this.Elemente [i])
				this.Elemente [i].Destroy ();
			else {
				alert ("Kein Destroy gefunden!\nElemente.length: " + this.Elemente.length + "\ni: " + i);
				Analysieren (this.Elemente [i], "Elemente [" + i + "]", true);
			}
		this.Elemente = [];
		this.JQButton.html ("[+]");
		this.offen = false;
	};
}

function WndHandlerAnalysisWindow (wndhandle) {
	this.wnd = wndhandle;
}

w.Function.prototype.inherits.call (WndHandlerAnalysisWindow, w.WndHandlerDefault);

WndHandlerAnalysisWindow.prototype.getDefaultWindowOptions = function () {
	var ret = {
		position: ["center", "center"],
		height: 600,
		width: 1200,
		resizable: false,
		minimizable: true,
		title: "Analysefenster"
	};
	return ret;
};

WndHandlerAnalysisWindow.prototype.onInit = function (title, UIopts) {
	return true;
};

WndHandlerAnalysisWindow.prototype.onClose = function () {
	if (this.Inhalt)
		this.Inhalt.Destroy ();
	return true;
};

WndHandlerAnalysisWindow.prototype.onRcvData = function (data, controller, action) {
};

WndHandlerAnalysisWindow.prototype.onSubmit = function () {
	this.tu ($ ("#Analysefenstereingabe").val ());
	this.wnd.close ();
};

WndHandlerAnalysisWindow.prototype.Start = function (Ausdruck) {
	if (this.Inhalt)
		this.Inhalt.neuer_Ausdruck (Ausdruck);
	else {
		this.Inhalt = new Inhalt (Ausdruck, this.wnd);
		this.wnd.setTitle ("Analysefenster - " + this.Inhalt.Name);
		this.Inhalt.Create ();
	}
	return true;
};

//dem GPWindowMgr den Typ ANALYSIS_WINDOW hinzufügen
//einen Button erstellen
var Button;
$ (function () {
	w.GPWindowMgr.addWndType ("ANALYSIS_WINDOW", "link_analysis_window", WndHandlerAnalysisWindow);
	Button = $ ('<a class="button" style="margin: 0px; display: block; vertical-align: middle; position: relative; width: 233;" href="#"><span class="left"><span class="right"><span class="middle"><small>Analysefenster</small></span></span></span></a>').insertAfter (".bottom_ornament").click (function () {
		var Fenster = w.Layout.wnd.Create (w.Layout.wnd.TYPE_ANALYSIS_WINDOW, "Analysefenster - unsafeWindow");
		Fenster.getHandler ().Start ("unsafeWindow");
	});
});

