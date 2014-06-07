// ==UserScript==
// @name           IT2-Navigation
// @namespace      de
// @description    Navigation mal ganz anders...
// @include        http://www.itycoon2.de/*
// @exclude        http://chat.beta.itycoon2.de/*
// @author         eXidys
// @version        a0.4 (Snowfall)
// @date           11-22-2010 11:32pm
// ==/UserScript==

// //////////////////// //
// Skript-Konfiguration //
// //////////////////// //

// Wert "0" bedeutet deaktiviert, Wert "1" bedeutet aktiviert in der Hauptnavi, Wert "2" bedeutet aktiviert in der Subnavi, kann beliebig geändert werden
var building_head = 1;		// Gebäudelink in der Hauptnavi (Standard 1) <-- Wert 2 hat keine Auswirkung
var organizer_head = 2;		// Organizerlink in der Hauptnavi (Standard 2)

// ######################################### //
// Nachfolgenden Code nicht modifizieren!!!! //
// ######################################### //

// ///////////////////// //
// Abfrage V.I.P. Nutzer //
// ///////////////////// //

if(document.getElementById("calculator_dialog")==null) { var z = 0; }
else { var z = 3; };

// //////////////////////////////////// //
// Ersetzen des Finanzlinks beim Tycoon //
// //////////////////////////////////// //

document.getElementsByClassName("data_money")[0].getElementsByTagName("a")[0].setAttribute("href", "/avatar/financial");

// ///////////////////////////////////// //
// Ersetzen der Links vom Schwarzenbrett //
// ///////////////////////////////////// //

var split_url = document.URL.split("/");
var sb = document.getElementsByClassName("information")[0].getElementsByTagName("li")[5].getElementsByTagName("img")[0].getAttribute("alt");
if(sb=="Group" && split_url[3]=="chat") {
	document.getElementsByClassName("content")[0].getElementsByTagName("p")[1].getElementsByTagName("a")[0].setAttribute("href", "/");
} else if(sb=="Group" && split_url[3]=="") {
	var sb_elem = document.getElementsByClassName("content")[0].getElementsByTagName("h3")[2];
	var insert_sb = sb_elem.getElementsByTagName("form")[z];
	var create_p = document.createElement("p");
	create_p.innerHTML = '<img alt="Group" border="false" class="icon" src="/images/icons/group.png" title="Konzern" /> <a href="/chat/concern">Konzern</a>';
	sb_elem.insertBefore(create_p,insert_sb);
};

// ///////////////// //
// Navi-Modifikation //
// ///////////////// //

if(building_head == 1) {
	// Gebäudelink
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;
	
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/building\"  accesskey=\"2\"><img alt=\"Buildings\" border=\"false\" class=\"icon\" src=\"/images/icons/building.png\" title=\"\" /> Gebäude</a>";
	div_selection.insertBefore(create_li,insert_before);
};

if(organizer_head == 1) {
	// Organizerlink Mainnavi
	var div_selection = document.getElementById('navigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('navigation').getElementsByTagName("ul")[0].lastChild;
	
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<a href=\"/organizer\"  accesskey=\"5\"><img alt=\"Book\" border=\"false\" class=\"icon\" src=\"/images/icons/book.png\" title=\"\" /> Organizer</a>";
	div_selection.insertBefore(create_li,insert_before);
} else if(organizer_head == 2) {
	
	// /////////////////////////// //
	// Subnavigation  Modifikation //
	// /////////////////////////// //
	
	//  Organizerlink Subnavi
	var div_selection = document.getElementById('subnavigation').getElementsByTagName("ul")[0];
	var insert_before = document.getElementById('subnavigation').getElementsByTagName("ul")[0].lastChild;
	var create_li = document.createElement("li");
	create_li.className = "";
	create_li.innerHTML = "<img alt=\"Book\" border=\"false\" class=\"icon\" src=\"/images/icons/book.png\" title=\"\" /> <a href=\"/organizer\">Organizer</a>";
	div_selection.insertBefore(create_li,insert_before);
};