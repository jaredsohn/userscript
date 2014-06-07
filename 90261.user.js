// ==UserScript==
// @name            IT2-Preisberechnung
// @namespace       de
// @description     Versandpreis per Klick berechnen
// @author          Antonio Estrela do Sul & eXidys
// @include         http://www.itycoon2.de/transport/charge/*
// @include         http://www.itycoon2.de/transport/confirm/*
// @date            2010-11-24
// @version         1.5
// ==/UserScript==

// ///////////////////////// //
// Konfiguration der Anzeige //
// ///////////////////////// //

var line_disp = 0;		// Wert 0 = Zwischen Produktionsspreis und Maxpreis (Standard) | Wert 1 = Nach dem Maxpreis
var calculator = 1;		// Wert 0 = Vorberechnete Preise (MP*(Prozent/100)) | Wert 1 = Preisrechner (Standard)
var def_per = 0;		// 0 = deaktiviert | Automatischer gesetzter Prozentsatz | Prozent in englischer Dezimalstellenschreibweise (e.g. 75% = 0.75)
var tra_set = 0;		// 0 = Deaktiviert die Anzeige des definierten Transportvolumens | 1 = aktiviert
//var tra_disp = 0;		// 0 = Hinter dem Inputfeld | 1 = extrazeile unter "Anzahl:" | 2 = extrazeile über der Anzahl <-- Nicht inverwendung!!!

///////////////////////////// //
// Konfiguration der Prozente //
///////////////////////////// //
// ENTFÄLLT BEIM PREISRECHNER, WIRD NUR FÜR DIE PREISLISTE BENÖTIGT
var percent_array = new Array(0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95); // Array mit den Prozenten 
// Werte in var percent_array rauseditiert 0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45, 0.1-0.25 liegen teilweise unterm Produktionspreis

///////////////////////////////// //
// Konfiguration der Versandmenge // !!!EXPERIMENTEL!!!
// ////////////////////////////// //

var tra_array = new Array(250,500,750,1000,1250,1500,1750,2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,4500,4750,5000);

// ######################################## //
// NACHFOLGENDEM CODE NICHT MODIFIZIEREN!!! //
// ######################################## //

// ///////////////////// //
// Abfrage V.I.P. Nutzer //
// ///////////////////// //

if(document.getElementById("calculator_dialog")==null) { var vip_form = document.getElementsByTagName("form")[0]; }
else { var vip_form = document.getElementsByTagName("form")[3]; };

// ///////////////////////// //
// Funktion: Werte ermitteln //
// ///////////////////////// //

function get_value(elem) {
	var element = vip_form.getElementsByTagName("p")[elem].getElementsByTagName("a")[0];
	element = element.innerHTML;
//	if(elem==2) { element = "215,17€" }			// Testparameter PP/MP
//	else if(elem==3) { element = "2.415,17€" };	// Testparameter MP/PP
	element = element.slice(element.search(/\d+/),element.search(/\s/));
	if(elem!=1) {
		element = element.replace(/\./, "");		// Tausenderpunkt entfernen
		element = element.replace(/\,/, ".");		// Komma in Punkt verwandeln
	};				
	element = parseFloat(element); 	// € - Zeichen filtern
	return element;
};

// //////////////////////////////////////////////////////////////////// //
// Transportmenge (TM) | MaxPreis (MP) | Produktionspreis (PP) erhalten //
// //////////////////////////////////////////////////////////////////// //

var TM = get_value(1);
var PP = get_value(2);
var MP = get_value(3);

// //////////////////////////// //
// Funktion Versandwerte runden //
// //////////////////////////// //

function var_round(percent) {
	 if(PP>=MP && def_per==0 && percent==0) {
		var v = MP;
		alert("Achtung der Produktionspreis ("+ PP +"€) ist größer als der Maximalpreis ("+ MP +"€)!");
	} else if(percent==0 || percent>=1) {
		var v = MP;
	} else {
		var v = MP * percent;
		v = (Math.round(v * 100) / 100).toString();
		v = v.substring(0, v.indexOf('.') + 3);
	};
	return v;
};

// //////////////////////////////////////////// //
// Bugfix, MaxPreis schon ins Input-Feld setzen //
// //////////////////////////////////////////// //

var def = var_round(def_per);
vip_form.getElementsByTagName("input")[3].setAttribute("value", "" + def + "");
if(def<=PP && def_per !=0) alert("Achtung ihre Standardmäßigen "+ def_per*100 +"% liegen unter dem Produktionspreis!\n\rBitte überprüfen Sie die automatische Eingabe.");

// //////////////////////////////// //
// Einfügen der Berechnung (Anfang) //
// //////////////////////////////// //

var calc_insert = vip_form.getElementsByTagName("p")[3];  // Positionsermittlung, Element Maximalpreis

var p = document.createElement("p");			// p Element generieren
var span = document.createElement("span");		// span Element mit der Klasse label generieren
span.className = "label";

// /////////////////////// //
// Funktion Taschenrechner //
// /////////////////////// //

unsafeWindow.per_input = per_input;
function per_input(input) {
	var input_cor = input.replace(/\,/, "."); // Komma in Punkt verwandeln
	if (isNaN(input_cor) || input_cor >= 100) {
		alert("Keine Zahl bzw. Zahl größer als 100");
		return;
	} else {
		var calc_per = input_cor / 100;
		var round_calc = var_round(calc_per);
		if(round_calc>PP && PP<MP) {
			var checkit = document.getElementById("data_price").setAttribute("value", "" + round_calc + "");
			checkit;
		} else if(round_calc<PP) {
			Check = confirm("Errechneter Preis "+round_calc+"€ ("+input+"% Max.) liegt unter dem Produktionspreis ("+PP+"€), trotzdem "+round_calc+"€ eintragen?");
			if (Check == true) {
				var checkit = document.getElementById("data_price").setAttribute("value", "" + round_calc + "");
				checkit;
			};
		};
	};
};

// //////////// //
// Preisrechner //
// //////////// //

if(calculator == 1) {
	var min_per = (Math.ceil(100/(MP/PP)));
	p.innerHTML = "<span class=\"label\">Preisrechner (Min. "+ min_per +"%):</span><form name=\"calculator\" id=\"calculator\"><input name=\"calculator_in\" type=\"text\" maxlength=\"5\" size=\"2\" id=\"calculator_in\" /> % <input class=\"submit\" type=\"button\" value=\"Berechnen\" onclick=\"window.per_input(document.calculator.calculator_in.value);\" /></form>";
} else {
	
// //////////// //
// Preisauswahl //
// //////////// //

	span.appendChild(document.createTextNode("Fit im Kopfrechnen? Nein, ok:"));
	p.appendChild(span);
	// Schleife zur Berechnung der prozentualen Werte
	for (var i = 0; i < percent_array.length; i++) {
		var round_mp = var_round(percent_array[i]);
		var vis = percent_array[i]*100;
		if (percent_array[i] == 0.55) var vis = Math.round(percent_array[i]*100); // Bugfix Anzeigefehler 55% ansonsten wird 55.00000000000001% angezeigt
		if(round_mp > PP && percent_array[i]<=1 && PP < MP) {
			var links = document.createElement("a");
			links.setAttribute("href", "javascript:set_value('data_price','" + round_mp + "');");
			links.appendChild(document.createTextNode("" + vis + "%"));
			p.appendChild(links);
			// Korrektur des Anzeigefehlers, Prozentzahlen werden nun auseinandergeschrieben
			var spacer = document.createTextNode(" ");		// spacer Element festlegen
			p.appendChild(spacer);
		};
	};
	if(PP >= MP) {
		var error = document.createTextNode("Produktionspreis liegt über dem Maximalpreis!");
		p.appendChild(error);
	};
};

// ////////////////////////////// //
// Einfügen der Berechnung (Ende) //
// ////////////////////////////// //

if(line_disp==1){ vip_form.insertBefore(p, calc_insert.nextSibling); }
else { vip_form.insertBefore(p, calc_insert); };

// ////////////// //
// Transportmenge //
// ////////////// //

if(tra_set==1) {
	var tm_position = vip_form.getElementsByTagName("p")[1];
	var tm_insert = tm_position.getElementsByTagName("a")[0];
	// Schleife Anzeige Transportmenge
	for (var i = 0; i < tra_array.length; i++) {
		if(tra_array[i] < TM) {
			var links = document.createElement("a");
			links.setAttribute("href", "javascript:set_value('stock_amount','" + tra_array[i] + "');");
			links.appendChild(document.createTextNode(""+tra_array[i]+""));
			tm_position.insertBefore(links, tm_insert);
			var spacer = document.createTextNode(" ");
			tm_position.insertBefore(spacer, tm_insert);
		};
	};
};