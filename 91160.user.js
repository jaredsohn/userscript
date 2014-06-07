// ==UserScript==
// @name            IT2-Lagerpreisanzeige (Verkäufer)
// @namespace       de
// @description     Aufklappbox mit den Preisen wird jetzt in der Tabelle eingefügt
// @author          eXidys
// @include         http://www.itycoon2.de/sale/index/*
// @date            07-08-2010
// @version         1.2b
// ==/UserScript==

var minp = 0; // Minimalpreis abgeschaltet

// ######################################## //
// NACHFOLGENDEM CODE NICHT MODIFIZIEREN!!! //
// ######################################## //

// ///////////////////// //
// Abfrage V.I.P. Nutzer //
// ///////////////////// //

if(document.getElementById("calculator_dialog")==null) {
	if(document.getElementsByClassName('right ra')[0]==null) { var z = 0; } else { var z = 1 };
} else {
	if(document.getElementsByClassName('right ra')[0]==null) { var z = 3; } else { var z = 4 };
};

vip_form = document.getElementsByTagName("form")[z];

// ///////////////////////////////////// //
// Funktionen zum generieren des Inhalts //
// ///////////////////////////////////// //

function create_elem_thead(title,text,cl) {
	var th = document.createElement("th");
	th.innerHTML = '<span class="'+cl+'" title="'+title+'">'+text+'</span>';
	thead_tr.insertBefore(th, thead_th_sel);
};
function create_elem_tbody(href,value) {
	var td = document.createElement("td");
	td.setAttribute("class", "tight");
	if(href!=null && value != "-") {
		var td_val = document.createElement("a");
		td_val.setAttribute("href", href);
		td_val.appendChild(document.createTextNode(value));
		td.appendChild(td_val);
	} else {
		td.innerHTML = value;
	};
	tbody_tr_sel.insertBefore(td, tbody_td_sel);
};

// ////////////////////// //
// Kopfspalten generieren //
// ////////////////////// //

var thead_tr = vip_form.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0];
var thead_th_sel = thead_tr.getElementsByTagName("th")[4];
if(minp != 0) { create_elem_thead("Minimalpreis","MinP","tt help"); };
create_elem_thead("Lagerpreis","LP","tt help");
create_elem_thead("Maximalpreis","MaxP","tt help");

// ////////////////////////////////// //
// Spalten mit den Preisen generieren //
// ////////////////////////////////// //

var tbody_tr = vip_form.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for (var i = 0; i < tbody_tr.length; i++) {
	var tbody_tr_sel = tbody_tr[i]; // Spalten durchgehen
	var tbody_td_sel = tbody_tr_sel.getElementsByTagName("td")[4];	// Spalte fürs einfügen festlegen
	var coord_select = tbody_tr_sel.getElementsByTagName("td")[5];	// s.o. bloß eine Spalte weiter
	if(minp != 0) {		// Abfrage Minpreis Aktiviert/Deaktiviert
		var nr = 0;		// Wenn Minpreis aktiviert, 3 Schleifen durchläufe
		if(coord_select.getElementsByTagName("span")[0].className!="red") {	var val_select = coord_select.getElementsByTagName("span")[0].getElementsByTagName("span")[0].innerHTML; };
	} else { var nr = 1; };		// Wenn Minpreis aktiviert, 2 Schleifen durchläufe
	if(coord_select.getElementsByTagName("span")[0].className=="red") {	// Wenn nichts vorhanden ist, in alle Spalten - (minus) eintragen
		for (var r = nr; r < 3; r++) {
			create_elem_tbody(null,"-");
		};
	} else {		// Wenn Ware vorhanden ist, Spalten mit den Inhalt generieren
		var select_div = tbody_tr_sel.getElementsByTagName("td")[5].getElementsByTagName("div")[0];
		for (var r = nr; r < 3; r++) {
			create_elem_tbody(""+select_div.getElementsByTagName("a")[r].getAttribute("href")+"",""+select_div.getElementsByTagName("a")[r].innerHTML+"");
		};
		if(minp != 0) { coord_select.innerHTML = '<span class="green">'+val_select+'</span>'; }; // Wenn Minpreis aktviert, Spalte mit der Warenanzahl neuschreiben
	};
};