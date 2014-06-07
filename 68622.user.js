// ==UserScript==
// @name			verletzte_Spieler
// @namespace      
// @description		TODO: to be written.
// @include			http://www.comunio.de/exchangemarket.phtml
// @include			http://www.comunio.de/lineup.phtml
// @include			http://www.comunio.de/playerInfo.phtml*
// @include			http://www.comunio.de/listTradables.phtml*
// ==/UserScript==
//Greasemonkey allows you to store variables permanently. 
//They will survive page reload and even browser restart. 
//To use this functionality 2 functions exists:
//
//GM_getValue($variable)
//
//GM_setValue($variable, $value)


//obiger Header ist von greasemonkey ... kA wof√ºr!
var DEBUG = false;
var Verl = new Array(); // Eindimensionales Array Verl(etzte) enth√§lt die Daten
var global = 0;
// von transfermarkt.de

if (DEBUG) {
	DEBUGWINDOW = window.open("about:blank", "DEBUGWINDOW", null);
	DEBUGWINDOW.focus();
};
function log(string) {
	if (DEBUG) {
		DEBUGWINDOW.document.body.innerHTML = string;
	}
};
var doc;
verletzte();
// gesperrte();
// alert(doc.innerHTML);
global = 0;

// Erm√∂glicht es HTML Elemente anhand ihrer CSS-Klasse zu identifizieren
// Parameter doc: das HTML document (z.B. this.document)
// cl: der Name der CSS Klasse als String
// Return: Array der HTML Elemente, welche die CSS-Klasse includieren
function getElementsByClassName(doc, cl) {
	var retnode = [];
	var myclass = new RegExp('\\b' + cl + '\\b');
	var elem = doc.getElementsByTagName('*');
	for ( var i = 0; i < elem.length; i++) {
		var classes = elem[i].className;
		if (myclass.test(classes))
			retnode.push(elem[i]);
	}
	return retnode;
};

// L√§dt eine externe webseite. kA wie man eine weitere externe l√§dt. Einfach
// mehrfach hintereinander ausf√ºhren?!
function verletzte() {
	var blabla = GM_xmlhttpRequest( {
		method : "GET",
		url : "http://www.transfermarkt.de/de/wettbewerb/L1/1-bundesliga/datenfakten/verletzte.html",
		headers : {
			"User-Agent" : "Mozilla/5.0", // If not specified,
											// navigator.userAgent
			// will be used.
			"Accept" : "text/html" // If not specified, browser defaults will
									// be
		// used.
		},
		onload : function(response) {
			doc = document.createElement('div');
			doc.innerHTML = response.responseText;
			var table = getElementsByClassName(doc, "competition")[0];
			for ( var r = 1; r < table.rows.length; r++) {
				var name = table.rows[r].cells[0].wrappedJSObject
						.getElementsByTagName('table')[0].rows[0].cells[1].firstChild.childNodes[0].wholeText
						.split(" ");
				name = name[name.length - 1];
				var verein = table.rows[r].cells[0].wrappedJSObject
						.getElementsByTagName('table')[0].rows[1].cells[0].firstChild.childNodes[0].wholeText
						.split(" ").join("");
				var verletzung = table.rows[r].cells[3].firstChild.data;
				var restdauer = table.rows[r].cells[5].firstChild.data;
				Verl[r - 1] = new Array(name, verein, verletzung, restdauer);

			}
			vergleiche();
		}
	});
};
// L√§dt eine externe webseite. kA wie man eine weitere externe l√§dt. Einfach
// mehrfach hintereinander ausf√ºhren?!
function gesperrte() {
	GM_xmlhttpRequest( {
		method : "GET",
		// url:"http://www.transfermarkt.de/de/wettbewerb/L1/1-bundesliga/datenfakten/verletzte.html",
		url : "http://www.transfermarkt.de/de/wettbewerb/L1/1-bundesliga/datenfakten/gesperrt.html",
		headers : {
			"User-Agent" : "Mozilla/5.0", // If not specified,
											// navigator.userAgent
			// will be used.
			"Accept" : "text/html" // If not specified, browser defaults will
									// be
			// used.
		},
		onload : function(response) {
			// leeres Container element (div) erzeugen
		doc = document.createElement('div')
		// gefetchten HTML Code in das Container Element f√ºllen (somit erh√§lt
		// man
		// ein valides HTMl document!)
		doc.innerHTML = response.responseText
		// in diesem HTML document nach einer Klasse suchen. Bisher war die
		// tabelle,
		// welche ich gesucht habe immer an Pos 1 des Arrays ... Lucky Bastard!
		var table = getElementsByClassName(doc, "competition")[0];
		// Daten aus der Tabelle Holen ... try and error. Firebug zeigt die
		// DOM-Structur (rows, cells, childs) etc. nett an.
		for ( var r = global; r < table.rows.length + global; r++) {
			Verl[r - 1] = new Array(); // aus Verl(etzen) ein ZWEIDIMENSIONALES
			// Array machen
			var name = table.rows[r].cells[0].wrappedJSObject
					.getElementsByTagName('table')[0].rows[0].cells[1].firstChild.childNodes[0].wholeText
					.split(" "); // Namen des Spieler holen
			Verl[r - 1][0] = name[name.length - 1]; // Nachname des Spielers!
			Verl[r - 1][1] = table.rows[r].cells[0].wrappedJSObject
					.getElementsByTagName('table')[0].rows[1].cells[0].firstChild.childNodes[0].wholeText
					.split(" ").join(""); // Verein des Spielers ohne
											// leerzeichen!
			Verl[r - 1][2] = table.rows[r].cells[2].childNodes[2].wholeText
					.split("\n")[0]; // Ausfallgrund
			// Verl[r-1][2] = "something";
			Verl[r - 1][3] = table.rows[r].cells[6].childNodes[0].wholeText; // gesperrt
			// f√ºr
			// X
			// spieltage
			// Verl[r-1][3] = "something";
		}
	}
	});
	// vergleiche();
};

// Vergleicht die Daten von TM.de mit denen der aktuellen Comunio.de Seite
function vergleiche() {
	// Offset: weil in playerInfo.phtml eine spalte mehr ist. (vor den
	// Spielernamen, erste Spalte)
	var offset = 0;
	// Hier werden wieder tabellen aus der Webseite geholt. diesmal aber nicht
	// von einer externen!
	// Comunio Transfermarkt
	if (document.URL == "http://www.comunio.de/exchangemarket.phtml")
		var table = getElementsByClassName(this.document, "tablecontent03")[0];
	// Comunio Aufstellung
	if (document.URL == "http://www.comunio.de/lineup.phtml")
		var table = getElementsByClassName(this.document, "tablecontent03b")[0];
	// Comunio Spieler√ºbersicht. Schauen ob playerInfo.phtml in der URL steht.
	// Bessere methode?!
	if (document.URL.split("playerInfo.phtml").length > 1) {
		var table = getElementsByClassName(this.document, "tablecontent03")[0];
		offset = 1; // hier brauchen wir offset ...
	}
	if (document.URL.split("listTradables.phtml").length > 1) {
		var table = getElementsByClassName(this.document, "tablecontent03")[1];
		offset = 1; // hier brauchen wir offset ...
	}
	for ( var r = 1; r < table.rows.length; r++) {
		if (table.rows[r].cells.length > 1) {
			// Name und Verein auf den Tabellen holen
			var name = table.rows[r].cells[0 + offset].firstChild.data
					.split(" ");
			var verein = table.rows[r].cells[1 + offset].firstChild.data.split(
					" ").join("");// Verein des Spielers ohne
			// leerzeichen!
			name = name[name.length - 1];
			name = name.replace(/\*/g, '');

			// Translation VON Comunio Namen ZU Transfermarkt.de Namen
			if (name == "Blaszczykowski")
				name = "Kuba";

			// Translation VON Comunio Vereinsnamen ZU Transfermarkt.de
			// Vereinsnamen
			if (verein == "1899Hoffenheim")
				verein = "TSG1899Hoffenheim";
			if (verein == "BorussiaM'gladbach")
				verein = "BorussiaM√∂nchengladbach";

			for ( var i = 0; i < Verl.length; i++) {
				// Wenn der Nachname des Spielers und sein Verein von Comunio.de
				// mit TM.de √ºbereinsttimmen ...
				if (name == Verl[i][0] && verein == Verl[i][1]) {
					// baue den String VERLETZUNGSGRUND + bis + ZUR√úCKERWARTET
					var grund = Verl[i][2] + " bis " + Verl[i][3];
					// Verschiedene Symbole je nach Restdauer der verletzung.
					// LANGE
					if (Verl[i][3].split(" ")[0] == "Anfang"
							|| Verl[i][3].split(" ")[0] == "Mitte"
							|| Verl[i][3].split(" ")[0] == "Ende")
						table.rows[r].cells[0 + offset].innerHTML = table.rows[r].cells[0 + offset].innerHTML
								+ '<img src="http://www.comunio.de/i/i/redcross.gif" title ="'
								+ grund + '">';
					// kurzfristig (n√§chster spieltag)
					if (Verl[i][3].split(" ")[0] == "morgen")
						table.rows[r].cells[0 + offset].innerHTML = table.rows[r].cells[0 + offset].innerHTML
								+ '<img src="http://www.comunio.de/i/i/syringe.gif" title ="'
								+ grund + '">';
					// mittelfristig
					if (Verl[i][3].split(" ")[0] == "zur√ºck")
						table.rows[r].cells[0 + offset].innerHTML = table.rows[r].cells[0 + offset].innerHTML
								+ '<img src="http://www.comunio.de/i/i/dribbeln2.gif" title ="'
								+ grund + '">';
				}
			}
		}
	}
};