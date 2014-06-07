// ==UserScript==
// @name			IT2 - Dev-Edition
// @namespace		http://exidys.com/
// @description		
// @author			eXidys
// @include			http://www.itycoon2.de/*
// @exclude			http://chat.beta.itycoon2.de/*
// @date			31.12.2010
// @version			0.1 (Blackwidow)
// ==/UserScript==

var title = "Greasemonkey-Skript Einstellungen XXXX";
var name = "IT2 - Userscript";
var version = "0.1 (Blackwidow) - 31.12.2010";

// /////////////////////////////// //
// Standardwerte || Default-Values //
// /////////////////////////////// //

/*var tycoon = 1;			// 1 = Produzent, 0 = Verkäufer

// Preisrechner (Tycoon = 0 || 1)
var line_disp = 0;		// Wert 0 = Zwischen Produktionsspreis und Maxpreis (Standard) | Wert 1 = Nach dem Maxpreis
var calculator = 1;		// Wert 0 = Vorberechnete Preise (MP*(Prozent/100)) | Wert 1 = Preisrechner (Standard)
var def_per = 0;		// 0 = deaktiviert | Automatischer gesetzter Prozentsatz | Prozent in englischer Dezimalstellenschreibweise (e.g. 75% = 0.75)
var tra_set = 0;		// 0 = Deaktiviert die Anzeige des definierten Transportvolumens | 1 = aktiviert
var tra_disp = 0;		// 0 = Hinter dem Inputfeld | 1 = extrazeile unter "Anzahl:" | 2 = extrazeile über der Anzahl
//var percent_array = new Array(0.5,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95); // Array mit den Prozenten 
//var tra_array = new Array(250,500,750,1000,1250,1500,1750,2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,4500,4750,5000);

// Lagerpreisanzeige (Tycoon = 0);
var minp = 0;			// Minpreisspalte deaktiviert = 0 | Minpreisspalte aktiviert = 1
*/

/*
var set_array = new Array();
set_array[0] = new Object();	set_array[0]["name"] = "tycoon";			set_array[0]["name_val"] = "Karriere";				set_array[0]["value"] = "1";	set_array[0]["descr_value1"] = "Verkäufer";		set_array[0]["descr_value2"] = "Produzent";		set_array[0]["description"] = "Deine gewählte Karriere?";
set_array[2] = new Object();	set_array[2]["name"] = "calculator_disp";	set_array[2]["name_val"] = "Versandpreisrechner";	set_array[2]["value"] = "1";	set_array[2]["descr_value1"] = "deaktiviert";	set_array[2]["descr_value2"] = "aktiviert";		set_array[2]["description"] = "Preisrechner oder Preisauswahlliste auf der Versandseite einfügen?";
set_array[3] = new Object();	set_array[3]["name"] = "calculator";		set_array[3]["name_val"] = "Rechnerart";			set_array[3]["value"] = "1";	set_array[3]["descr_value1"] = "Auswahlliste";	set_array[3]["descr_value2"] = "Preisrechner";	set_array[3]["description"] = "Einstellung vom vorherigehenden abhängig.";
set_array[4] = new Object();	set_array[4]["name"] = "line_disp";			set_array[4]["name_val"] = "Zeilenauswahl";			set_array[4]["value"] = "0";	set_array[4]["descr_value1"] = "aktiviert";		set_array[4]["descr_value2"] = "deaktiviert";	set_array[4]["description"] = "XX";
set_array[5] = new Object();	set_array[5]["name"] = "def_per";			set_array[5]["name_val"] = "Standard-Prozentsatz";	set_array[5]["value"] = "0";	set_array[5]["descr_value1"] = "aktiviert";		set_array[5]["descr_value2"] = "deaktiviert";	set_array[5]["description"] = "XY";
set_array[6] = new Object();	set_array[6]["name"] = "tra_set";			set_array[6]["name_val"] = "Transportvolumen";		set_array[6]["value"] = "0";	set_array[6]["descr_value1"] = "aktiviert";		set_array[6]["descr_value2"] = "deaktiviert";	set_array[6]["description"] = "XZ";
set_array[7] = new Object();	set_array[7]["name"] = "tra_disp";			set_array[7]["name_val"] = "Zeilenauswahl";			set_array[7]["value"] = "0";	set_array[7]["descr_value1"] = "aktiviert";		set_array[7]["descr_value2"] = "deaktiviert";	set_array[7]["description"] = "TR";
set_array[8] = new Object();	set_array[8]["name"] = "minp";				set_array[8]["name_val"] = "Minimalpreisspalte";	set_array[8]["value"] = "0";	set_array[8]["descr_value1"] = "aktiviert";		set_array[8]["descr_value2"] = "deaktiviert";	set_array[8]["description"] = "GH";
*/
var set_array = new Array();
set_array[0] = new Object();	set_array[0]["name"] = "tycoon";			set_array[0]["name_val"] = "Karriere";				set_array[0]["value"] = "1";	set_array[0]["disabled"] = "Verkäufer";				set_array[0]["enabled"] = "Produzent";				set_array[0]["description"] = "Deine ausgewählte Karriere:";
set_array[1] = new Object();	set_array[1]["name"] = "set_spacer";		set_array[1]["description"] = "Allgemeine Funktionen";
set_array[2] = new Object();	set_array[2]["name"] = "calculator_disp";	set_array[2]["name_val"] = "Versandpreisrechner";	set_array[2]["value"] = "1";	set_array[2]["disabled"] = "deaktiviert";			set_array[2]["enabled"] = "aktiviert";				set_array[2]["description"] = "Taschenrechnerfunktion auf der Versandseite einfügen:";
set_array[3] = new Object();	set_array[3]["name"] = "calculator";		set_array[3]["name_val"] = "Rechnerart";			set_array[3]["value"] = "1";	set_array[3]["disabled"] = "Auswahlliste";			set_array[3]["enabled"] = "Preisrechner";			set_array[3]["description"] = "Preisrechner oder Preisauswahlliste (abhängig vom vorherigen Menüpunkt):";
set_array[4] = new Object();	set_array[4]["name"] = "line_disp";			set_array[4]["name_val"] = "Zeilenauswahl";			set_array[4]["value"] = "0";	set_array[4]["disabled"] = "Zwischen PP und MP";	set_array[4]["enabled"] = "Unter der MP-Spalte";	set_array[4]["description"] = "Wo soll der Preisrechner auf der Versandseite eingefügt werden:";
set_array[5] = new Object();	set_array[5]["name"] = "def_per";			set_array[5]["name_val"] = "Standard-Prozentsatz";	set_array[5]["value"] = "0";	set_array[5]["disabled"] = "deaktiviert";			set_array[5]["enabled"] = "aktiviert";				set_array[5]["description"] = "XY";
set_array[6] = new Object();	set_array[6]["name"] = "tra_set";			set_array[6]["name_val"] = "Transportvolumen";		set_array[6]["value"] = "0";	set_array[6]["disabled"] = "deaktiviert";			set_array[6]["enabled"] = "aktiviert";				set_array[6]["description"] = "XZ";
set_array[7] = new Object();	set_array[7]["name"] = "tra_disp";			set_array[7]["name_val"] = "Zeilenauswahl";			set_array[7]["value"] = "0";	set_array[7]["disabled"] = "deaktiviert";			set_array[7]["enabled"] = "aktiviert";				set_array[7]["description"] = "TR";
set_array[8] = new Object();	set_array[8]["name"] = "set_spacer";		set_array[8]["description"] = "Verkäufer-Funktionen";
set_array[9] = new Object();	set_array[9]["name"] = "minp";				set_array[9]["name_val"] = "Minimalpreisspalte";	set_array[9]["value"] = "0";	set_array[9]["disabled"] = "deaktiviert";			set_array[9]["enabled"] = "aktiviert";				set_array[9]["description"] = "Minimalpreisspalte";


/*  IF Abfrage....  Derzeit deaktiviert sonst recht lästig...
if(GM_getValue("version")==null && GM_getValue("settings")==null) {
	alert('Bitte stellen Sie das Skript über den "Skript-Einstellungen"-Link in auf der linken Seite ein.');
} else if (GM_getValue("version")!=version) {
	alert("Ihre Versionnummer stimmt nicht mit der gespeicherten Versionnummer überein.\r\nBitte überprüfen Sie die Skript-Eistellungen.");
};*/

// Test Greasemonkey Funktion
/*alert(GM_getValue("settings"));
GM_setValue("settings", '"tycoon"=1;"blubb"=2;"yxz"=3');
alert(GM_getValue("settings"));
GM_deleteValue("settings");
alert(GM_getValue("settings"));*/
//GM_deleteValue("settings");

 //  GM_deleteValue("version");
 
// //////////////////////////////// //
// Link in der linken Box erstellen //
// //////////////////////////////// //

var box_left = document.getElementsByClassName("subnavigation")[0];
var iB = box_left.getElementsByTagName("li")[6];
var crea_li = document.createElement("li");	
crea_li.innerHTML = '<img border="false" title="" src="/images/icons/cog.png" class="icon" alt="Cog"> <a id="settings_dialog" class="hand">Skript-Einstellungen</a>';
box_left.insertBefore(crea_li,iB);

// ////////////////////////////////// //
// JQuery-Function im Source einfügen //
// ////////////////////////////////// //

var script = document.createElement("script");
script.type="text/javascript";
script.text = '$(function() {$("#settings").dialog({bgiframe: true,autoOpen: false,modal: true,height: 500,title: "'+title+'",width: 650,resizable: false,closeOnEscape: true,open: function() {$(this).dialog("moveToTop")}});});$("#settings_dialog").click(function() {$("#settings").dialog("open");});'; // zwischen closeOnEscape und open einfügen \/ buttons: {"Schließen": function() {$(this).dialog("close")},}, \/ zusätzlicher Schließen Button am Footer
document.getElementsByTagName("head")[0].appendChild(script);


// //////////////////////// //
// Dialog-Fenster erstellen //
// //////////////////////// //
	
var settings =  document.createElement("div");
settings.setAttribute("id", "settings");

var form = document.createElement("form");
form.setAttribute("id", "settings_form");
form.setAttribute("name", "settings_form");

// Zwei Spaltiger Code
var table = document.createElement("table");
table.innerHTML='<thead><tr><th style="width:75%;">Beschreibung</th><th style="width:25%;text-align:center;">Einstellung</th></tr></thead>';
var tbody = document.createElement("tbody");

for(var i = 0; i < set_array.length; i++){
	var class = i % 2 == 0 ? "odd" : "even";
	var row = document.createElement("tr");

	if(set_array[i]["name"] == "set_spacer") {
		var td = document.createElement("td");
		td.setAttribute("colspan", "2");
		td.setAttribute("style", "text-align:center;");
		td.innerHTML = '<strong>'+set_array[i]["description"]+'</strong>';
		row.appendChild(td);
	} else {
		var td = document.createElement("td");
		td.setAttribute("class", "small");
		td.setAttribute("style", "vertical-align:middle;");
		td.innerHTML = set_array[i]["description"];
		row.appendChild(td);
		var td2 = document.createElement("td");
		td2.setAttribute("class", "small");
		td2.setAttribute("style", "vertical-align:middle;");
		if(set_array[i]["value"]==0) { var check1 = 'checked="checked"'; } else { var check1 = ''; };
		if(set_array[i]["value"]==1) { var check2 = 'checked="checked"'; } else { var check2 = ''; };
		td2.innerHTML='<input name="'+set_array[i]["name"]+'" type="radio" value="0" '+check1+'>'+set_array[i]["disabled"]+'<br /><input name="'+set_array[i]["name"]+'" type="radio" value="1" '+check2+'>'+set_array[i]["enabled"]+''; // '+ if(set_array[i]["value"]==0) { +'checked="checked"' +};+ '   '+if(set_array[i]["value"]==1) {+'checked="checked"'+};+'
		row.appendChild(td2);
	};
/*	var td3 = document.createElement("td");
	td3.setAttribute("class", "small");
	td3.setAttribute("style", "vertical-align:middle;");
	td3.innerHTML = set_array[i]["description"]; // <span class="small"></span>
	row.appendChild(td3);*/
	row.setAttribute("class", class);
	tbody.appendChild(row);
};

/*  Drei Splatiger Code
var table = document.createElement("table");
table.innerHTML='<thead><tr><th style="width:20%;">Titel</th><th style="width:20%;">Einstellung</th><th style="width:60%;">Beschreibung</th></tr></thead>';
var tbody = document.createElement("tbody");

for(var i = 0; i < set_array.length; i++){
	var class = i % 2 == 0 ? "odd" : "even";
	var row = document.createElement("tr");

	var td = document.createElement("td");
	td.setAttribute("style", "vertical-align:middle;");
	td.innerHTML = set_array[i]["name_val"];
	row.appendChild(td);
	var td2 = document.createElement("td");
	td2.setAttribute("class", "small");
	td2.setAttribute("style", "vertical-align:middle;");
	if(set_array[i]["value"]==0) { var check1 = 'checked="checked"'; } else { var check1 = ''; };
	if(set_array[i]["value"]==1) { var check2 = 'checked="checked"'; } else { var check2 = ''; };
	td2.innerHTML='<input class="undef_in" name="'+set_array[i]["name"]+'" type="radio" value="0" '+check1+'>'+set_array[i]["descr_value1"]+'<br /><input class="undef_in" name="'+set_array[i]["name"]+'" type="radio" value="1" '+check2+'>'+set_array[i]["descr_value2"]+''; // '+ if(set_array[i]["value"]==0) { +'checked="checked"' +};+ '   '+if(set_array[i]["value"]==1) {+'checked="checked"'+};+'
	row.appendChild(td2);
	var td3 = document.createElement("td");
	td3.setAttribute("class", "small");
	td3.setAttribute("style", "vertical-align:middle;");
	td3.innerHTML = set_array[i]["description"]; // <span class="small"></span>
	row.appendChild(td3);
	row.setAttribute("class", class);
	tbody.appendChild(row);
};
*/

table.appendChild(tbody);
form.appendChild(table);

settings.appendChild(form);

dialog_p_crea("Skript-Version:", version, settings, "right");
dialog_p_crea(" || ", "", settings, "right");
dialog_p_crea("Skript-Name:", name, settings, "right");
dialog_p_crea("Autor:", "eXidys", settings, "left");
var footer = document.getElementById("footer");
footer.parentNode.appendChild(settings);

/************************************************/
function create_elem(elem, class, style, insert, sel) {	// elem = ELement, Class = Klassenname, style = Style-Attribute, insert = innerhtml code, sel = selected element
	var td_crea = document.createElement(elem)
//	td.crea
};
/************************************************/
function dialog_p_crea(text,value,elem,position) {		// e.g. Text = Blubb , Value = Var, elem = Main-Element, position = left or right
	var p_crea = document.createElement("p");
	p_crea.setAttribute("class", "small "+position+"");
	p_crea.innerHTML = ""+text+" "+value+"<br /><br /><br />";
	elem.appendChild(p_crea);
};