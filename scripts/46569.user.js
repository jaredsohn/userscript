// ==UserScript==
// @name           tribalwars.ae - www.plapl.com  تغير الشكل العبه
// @namespace      tribalwars
// @description    Version 1.0.1 | Rundet im Browsergame "Die Stämme" sämtliche Ecken von Tabellen mit 10px Radius ab.
// @autor          Roman S. (Zombie74)
// @include        http://ae1.tribalwars.ae/*
// @exclude        http://ae1.tribalwars.ae/?index=new
// @exclude        http://ae1.tribalwars.ae/index.php?server_list=1
// @exclude        http://ae1.tribalwars.ae/
// ==/UserScript==




// Aktuell installierte Version:
var vers_ist = "DS - Rundungen 1.0.1";



// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");


// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];


var adresse = new Array();
adresse["de"] = ".die-staemme.";
adresse["ch"] = ".staemme.";
adresse["nl"] = ".tribalwars.";




// Einstellungen:
if(url.match(/screen=settings&mode=settings/)) {
	var vers = vers_ist.split(" ");
	var version = "";
	for(v=0; v<vers.length; v++) {
		if(v < vers.length-1) {
			version += vers[v] + " ";
		}
		else {
			version += "<span class='grey'>" + vers[v] + "</span>";
		}
	}
	
	// Bildpunkte ermitteln:
	var bildpunkte = document.getElementsByName("screen_width")[0].value;
	GM_setValue("Bildpunkte", bildpunkte);
	
	if(url.match(/einstellung=rundung/)) {
		if(confirm("Alle Ecken:\n\nSollen alle Ecken abgerundet werden?")) {
			GM_setValue("Rundung", "1111");
		}
		else {
			if(confirm("OL / UR:\n\nSollen nur die Ecken OL / UR abgerundet werden?\n\nAbbrechen um die Seite ohne Rundungen anzuzeigen.")) {
				GM_setValue("Rundung", "1001");
			}
			else {
				GM_setValue("Rundung", "0000");
			}
		}
	}
	
	
	//alert("EINSTELLUNGEN:\n");
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	th[1] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	
	
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=103217' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if(GM_getValue("Rundung") == undefined) {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=rundung''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=rundung''>Einstellungen ändern</a>";
		var x = GM_getValue("Rundung");
		var rund = new Array();
		rund["0000"] = "Keine Rundungen";
		rund["1001"] = "<b style='padding-right:30px;'>O-L / U-R:</b> Nur die Ecken Oben-Links & Unten-Rechts werden abgerundet";
		rund["0110"] = "<b style='padding-right:30px;'>O-R / U-L:</b> Nur die Ecken Oben-Rechts & Unten-Links werden abgerundet";
		rund["1111"] = "<b style='padding-right:39px;'>Komplett:</b> Alle Ecken werden abgerundet";
		td[1].innerHTML = rund[x];
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && (GM_getValue("Rundung") == undefined)) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Rundungen vorzunehmen")) {
			document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=rundung";
		}
		else {
			// Standardwerte als GM-Value speichern
			GM_setValue("Rundung", "1001");
		}
	}
}




var rundungen = new Array();
rundungen["0000"] = ""
rundungen["1100"] = "; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;"
rundungen["1001"] = "; -moz-border-radius-topleft:10px; -moz-border-radius-bottomright:10px;"
rundungen["0110"] = "; -moz-border-radius-topright:10px; -moz-border-radius-bottomleft:10px;"
rundungen["1111"] = "; -moz-border-radius:10px;"
var x = "1001";
if(GM_getValue("Rundung") != undefined) {
	x = GM_getValue("Rundung");
}




// Array für <div>-Tags:
var div = new Array();
var style_div = new Array();

// Anzahl der <div>-Tags:
var divs = document.getElementsByTagName("div").length;

// Alle <div>-Tags durchlaufen:
for(i=0; i<divs; i++) {
	// Aktuelle Zellen:
	div[i] = document.getElementsByTagName("div")[i];

	// Style auslesen:
	style_div[i] = div[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	div[i].setAttribute("style", style_div[i] + "; " + rundungen[x]);
}





// Array für Tabellen:
var tabelle = new Array();
var style_tb = new Array();

// Anzahl der <table>-Tags:
var tabellen = document.getElementsByTagName("table").length;

// Alle <table>-Tags durchlaufen:
for(i=0; i<tabellen; i++) {
	// Aktuelle Tabelle:
	tabelle[i] = document.getElementsByTagName("table")[i];
	style_tb[i] = tabelle[i].getAttribute("style");
	var class = tabelle[i].getAttribute("class");
	var test = tabelle[i].getAttribute("id");

	// Nachrichten:
	if((test == "filter") || (test == "bb_sizes") || (test == "igm_groups")) {
		tabelle[i].setAttribute("style", ";  border:none; display:none;");
	}
	// content-border ohne Rahmen:
	else if(class == "content-border") {
		tabelle[i].setAttribute("style", "border:none;");
	}
	// Karte (Koordinaten | Info):
	else if((test == "mapCoords") || (test == "info_content")) {
		tabelle[i].setAttribute("style", style_tb[i] + "; " + rundungen[x]);
	}
	// Alle anderen normal:
	else {
		tabelle[i].setAttribute("style", rundungen[x]);
	}
}





// Array für <th>-Tags:
var zelle_th = new Array();
var style_th = new Array();

// Anzahl der <th>-Tags:
var zellen_th = document.getElementsByTagName("th").length;

// Alle <th>-Tags durchlaufen:
for(i=0; i<zellen_th; i++) {
	// Aktuelle Zellen:
	zelle_th[i] = document.getElementsByTagName("th")[i];
	
	// Style auslesen:
	style_th[i] = zelle_th[i].getAttribute("style");

	// Zellen mit Rahmen:
	zelle_th[i].setAttribute("style", style_th[i] + "; border:1px outset #dfcca6; text-align:center; " + rundungen[x]);
}





// Array für <td>-Tags:
var zelle_td = new Array();
var style_td = new Array();

// Anzahl der <td>-Tags:
var zellen_td = document.getElementsByTagName("td").length;

// Alle <td>-Tags durchlaufen:
for(i=0; i<zellen_td; i++) {
	// Aktuelle Zellen:
	zelle_td[i] = document.getElementsByTagName("td")[i];

	// Style auslesen:
	style_td[i] = zelle_td[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	zelle_td[i].setAttribute("style", style_td[i] + "; " + rundungen[x]);
}





// Array für <ul>-Tags:
var liste_ul = new Array();
var style_ul = new Array();

// Anzahl der <ul>-Tags:
var listen_ul = document.getElementsByTagName("ul").length;

// Alle <ul>-Tags durchlaufen:
for(i=0; i<listen_ul; i++) {
	// Aktuelle Zellen:
	liste_ul[i] = document.getElementsByTagName("ul")[i];

	// Style auslesen:
	style_ul[i] = liste_ul[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	liste_ul[i].setAttribute("style", style_ul[i] + "; " + rundungen[x]);
}





// Array für <p>-Tags:
var absatz_p = new Array();
var style_p = new Array();

// Anzahl der <p>-Tags:
var absaetze_p = document.getElementsByTagName("p").length;

// Alle <p>-Tags durchlaufen:
for(i=0; i<absaetze_p; i++) {
	// Aktuelle Zellen:
	absatz_p[i] = document.getElementsByTagName("p")[i];

	// Style auslesen:
	style_p[i] = absatz_p[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	absatz_p[i].setAttribute("style", style_p[i] + "; " + rundungen[x]);
}





// Array für <input>-Tags:
var input = new Array();
var style_input = new Array();

// Anzahl der <input>-Tags:
var inputs = document.getElementsByTagName("input").length;

// Alle <input>-Tags durchlaufen:
for(i=0; i<inputs; i++) {
	// Aktuelles Input:
	input[i] = document.getElementsByTagName("input")[i];

	// Style auslesen:
	style_input[i] = input[i].getAttribute("style");

	// Style auslesen:
	var test = input[i].getAttribute("type");
	
	// Submit / Button:
	if((test == "submit") || (test == "button")) {
		input[i].setAttribute("style", style_input[i] + ";background-color:#FD9; border-color:#FD9; background-image:url(); padding-left:5px; padding-right:5px;" + rundungen[x]);
	}
	// Zellen mit Rahmen:
	else {
		input[i].setAttribute("style", style_input[i] + "; background-image:url(); padding-left:5px; padding-right:5px;" + rundungen[x]);
	}
}





// Array für <textarea>-Tags:
var textarea = new Array();
var style_textarea = new Array();

// Anzahl der <textarea>-Tags:
var textareas = document.getElementsByTagName("textarea").length;

// Alle <textarea>-Tags durchlaufen:
for(i=0; i<textareas; i++) {
	// Aktuelle Zellen:
	textarea[i] = document.getElementsByTagName("textarea")[i];

	// Style auslesen:
	style_textarea[i] = textarea[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	textarea[i].setAttribute("style", style_textarea[i] + "; background-image:url(); padding-left:5px; padding-right:5px;" + rundungen[x]);
}





// Array für <select>-Tags:
var selector = new Array();
var style_selector = new Array();

// Anzahl der <select>-Tags:
var selectors = document.getElementsByTagName("select").length;

// Alle <select>-Tags durchlaufen:
for(i=0; i<selectors; i++) {
	// Aktuelle Zellen:
	selector[i] = document.getElementsByTagName("select")[i];

	// Style auslesen:
	style_selector[i] = selector[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	selector[i].setAttribute("style", style_selector[i] + "; background-image:url(); padding-left:5px; padding-right:5px;" + rundungen[x]);
}





// Array für <option>-Tags:
var opt = new Array();
var style_opt = new Array();

// Anzahl der <option>-Tags:
var opts = document.getElementsByTagName("option").length;

// Alle <option>-Tags durchlaufen:
for(i=0; i<opts; i++) {
	// Aktuelle Zellen:
	opt[i] = document.getElementsByTagName("option")[i];

	// Style auslesen:
	style_opt[i] = opt[i].getAttribute("style");
	
	// Zellen mit Rahmen:
	opt[i].setAttribute("style", style_opt[i] + "; background-image:url(); padding-left:5px; padding-right:5px;" + rundungen[x]);
}





// Gespeicherte Bildpunkte auslesen:
var bildpunkte = GM_getValue("Bildpunkte");

// Padding berechnen ((Bildschirmbreite-Scrollbar)-Bildpunkte)/2
var pad = Math.round(((screen.availWidth-16)-bildpunkte)/2);

var ds_body = document.getElementById("ds_body");
ds_body.getElementsByTagName("div")[1].setAttribute("style", "padding-left:" + pad + "px; padding-right:" + pad + "px; padding-top:5px;");

// Scrollbalken immer anzeigen (für zentrierung der Kopfzeile):
document.getElementsByTagName("body")[0].setAttribute("style", "overflow:scroll;overflow-x:auto;");