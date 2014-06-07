// ==UserScript==
// @name DS - Entfernungen
// @namespace Die Stämme
// @description Version 1.0.3 | Fügt im Browsergame "Die Stämme" im Spielerprofil die Laufzeiten zu den einzelnen Dörfern des jeweiligen Spielers an. Beim AG wird ausserdem angezeigt wenn die maximale Reisedauer von 40:50 Std. Ã¼berschritten wird. 
// @autor 
// @include http://*.die-staemme.de/*
// @include http://*.staemme.ch/*
// @include http://*.tribalwars.nl/*
// @exclude http://forum*
// @exclude http://*help*
// ==/UserScript==
// Aktuell installierte Version:
var vers_ist = "DS - Entfernungen 1.0.3";
// Aktueller Dateipfad:
var url = document.location.href;
// Welt:
var teil = url.split(".");
var land = url.substr(7, 2);
var welt = teil[0].replace("http://" + land, "");
// Dorf-ID:
var dorf = url.split("village=");
var dorf_id = dorf[0].split("&")[0];
 
 
// Adressen:
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
 
 // Einstellungen (Entfernungen):
 if(url.match(/einstellung=entfernungen/)) {
 // Moral an/aus als GM-Value speichern:
 if(confirm("Moral:\n\nSoll die Moral angezeigt werden?")) {
 GM_setValue("Moral-" + welt, "an"); 
 }
 else {
 GM_setValue("Moral-" + welt, "aus"); 
 }
 // Entfernung an/aus als GM-Value speichern:
 if(confirm("Entfernung:\n\nSollen die Entfernungen agezeigt werden?")) {
 GM_setValue("Entfernung-" + welt, "an"); 
 }
 else {
 GM_setValue("Entfernung-" + welt, "aus"); 
 }
 }
 
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
 th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101958' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
 td[0].setAttribute("style", "vertical-align:top;");
 
 if((GM_getValue("Moral-" + welt) == undefined) && 
 (GM_getValue("Entfernung-" + welt) == undefined)) {
 td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=entfernungen''>Einstellungen speichern</a>";
 td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
 }
 else {
 td[0].innerHTML = "<a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=entfernungen''>Einstellungen Ã¤ndern</a>";
 var moral = GM_getValue("Moral-" + welt);
 var entfernung = GM_getValue("Entfernung-" + welt);
 
 td[1].innerHTML += "<b style='padding-right:61px;'>Moral:</b>" + moral.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
 td[1].innerHTML += "<b style='padding-right:10px;'>Entfernungen:</b>" + entfernung.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
 }
 
 tr[0].appendChild(th[0]);
 tr[1].appendChild(td[0]);
 tr[1].appendChild(td[1]);
 
 document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
 document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
 if((url.match(/screen=/)) && 
 (GM_getValue("Moral-" + welt) == undefined) && 
 (GM_getValue("Entfernung-" + welt) == undefined)) {
 if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen fÃ¼r die Anzeige der Entfernungen vorzunehmen")) {
 document.location.href = "http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=settings&mode=settings&einstellung=entfernungen";
 }
 else {
 // Standardwerte als GM-Value speichern
 GM_setValue("Moral-" + welt, "an");
 GM_setValue("Entfernung-" + welt, "an");
 }
 }
}
// Aktuelle Punkte:
var menu_1 = document.getElementById("menu_row").getElementsByTagName("td").length;
for(i=0; i<menu_1; i++){
 var inhalt_1 = document.getElementById("menu_row").getElementsByTagName("td")[i].innerHTML;
 if(inhalt_1.indexOf("Rangliste") > 0) {
 var akt_pkte = (inhalt_1.split("(")[1].split("|")[1].replace("<span class=\"grey\">.</span>", "").replace(" P)", ""))*1;
 }
}
// Aktuelle Dorfkoordinaten:
var akt_koord = document.getElementById("menu_row2").getElementsByClassName("nowrap")[0].innerHTML.split(" K")[0].split("|");
var akt_pos_X = akt_koord[0].replace("(", "");
var akt_pos_Y = akt_koord[1].replace(")", "");
// Array fÃ¼r Koordrinaten:
var koord = new Array();
var extra = new Array();
var pos_X = new Array();
var pos_Y = new Array();
var dista = new Array();
var deff_pkte = 0;
// 
var einheit = new Array("market", "knight", "axe", "sword", "spy", "light", "heavy", "ram", "snob");
var titel = new Array("HÃ¤ndler", "Paladin", "SpeertrÃ¤ger, AxtkÃ¤mpfer & BogenschÃ¼tze", "SchwertkÃ¤mpfer", "SpÃ¤her", "leichte Kavallerie & Berittener BogenschÃ¼tze", "schwere Kavallerie", "Rammbock & Katapult", "Adelsgeschlecht");
var speed = new Array("6", "10", "18", "22", "9", "10", "11", "30", "35");
// Spielerprofil:
if(url.match(/screen=info_player/)) {
 // Tabelle mit DÃ¶rfern:
 var main = document.getElementsByClassName("main")[0]; 
 var vis = main.getElementsByClassName("vis")[1];
 // Anzahl der DÃ¶rfer:
 var zeilen = vis.getElementsByTagName("tr").length;
 
 // Koordinaten der einzelnen DÃ¶rfer ermitteln:
 for(i=1; i<zeilen; i++) {
 var link_string = vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
 for(x=1; x<=5; x++) {
 link_string = link_string.replace(" ", "&nbsp;");
 }
 link_string = link_string.replace(" ", "&nbsp;");
 link_string = link_string.replace(" ", "&nbsp;");
 vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML = link_string;
 
 var links = vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a").length;
 if(links > 0) {
 koord[i] = vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML.split("<a")[0].split("|");
 extra[i] = "<a" + vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML.split("<a")[1];
 }
 else {
 koord[i] = vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML.split("|");
 extra[i] = "";
 }
 deff_pkte += vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.replace("<span class=\"grey\">.</span>", "");
 pos_X[i] = koord[i][0];
 pos_Y[i] = koord[i][1];
 dista[i] = Math.sqrt(Math.pow(akt_pos_X - pos_X[i], 2) + Math.pow(akt_pos_Y - pos_Y[i], 2));
 }
 // Neuen Inhalt erstellen:
 // Kopfzeile:
 kopfzeile = ""; 
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='DÃ¶rfer'>DÃ¶rfer (" + (zeilen-1) + ")</th>";
 kopfzeile += "<th style='text-align:center;' title='Koordinaten'>X | Y</th>";
 if(GM_getValue("Moral-" + welt) == "an") {
 kopfzeile += "<th style='text-align:center;' title='Punkte'>Pkte.</th>";
 kopfzeile += "<th style='text-align:center; padding-left:6px; padding-right:6px; -moz-border-radius-topright:10px;' title='Moral'>Moral</th>";
 }
 else {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='Punkte'>Pkte.</th>";
 }
 kopfzeile += "<td rowspan='" + zeilen + "' style='width:5px; background-image:url(http://" + land + welt + adresse[land] + land + "/graphic/background/content.jpg);'></td>";
 if(GM_getValue("Entfernung-" + welt) == "an") {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='Entfernung'>";
 kopfzeile += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/speed.png'>";
 kopfzeile += "</th>";
 }
 
 // Einheiten:
 if(GM_getValue("Entfernung-" + welt) == "an") {
 for(e=0; e<einheit.length; e++) {
 if((e == 0) || (e == 3) || (e == 6) || (e == einheit.length-1)) {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 1) || (e == 4) || (e == 7)) {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='" + titel[e] + "'>";
 }
 else {
 kopfzeile += "<th style='text-align:center;' title='" + titel[e] + "'>";
 }
 
 if(e == 0) {
 kopfzeile += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/" + einheit[e] + ".png'>";
 }
 else {
 kopfzeile += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_" + einheit[e] + ".png'>";
 }
 }
 
 kopfzeile += "</th>";
 }
 else {
 for(e=0; e<einheit.length; e++) {
 if(e == 0) {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 3) || (e == 6) || (e == einheit.length-1)) {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 1) || (e == 4) || (e == 7)) {
 kopfzeile += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='" + titel[e] + "'>";
 }
 else {
 kopfzeile += "<th style='text-align:center;' title='" + titel[e] + "'>";
 }
 
 if(e == 0) {
 kopfzeile += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/" + einheit[e] + ".png'>";
 }
 else {
 kopfzeile += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_" + einheit[e] + ".png'>";
 }
 }
 
 kopfzeile += "</th>";
 }
 
 // Neue Kopfzeile einfÃ¼gen:
 vis.getElementsByTagName("tr")[0].innerHTML = kopfzeile;
 
 
 // Punkte des Verteidigers:
 var ges_punkte = 0;
 for(i=1; i<zeilen; i++) {
 ges_punkte += Math.round(vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.replace("<span class=\"grey\">.</span>", ""));
 }
 // DÃ¶rfer:
 for(i=1; i<zeilen; i++) {
 // Punkte des Verteidigers
 var deff_punkte = vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.replace("<span class=\"grey\">.</span>", "");
 
 // Moral berechnen:
 var moral = Math.round(((3*ges_punkte/akt_pkte) + 0.3)*100);
 if(moral > 100) {
 moral = 100;
 }
 var zeile = "";
 zeile += "<td>" + vis.getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML + "</td>"
 zeile += "<td style='text-align:center;'><a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=map&x=" + pos_X[i] + "&y=" + pos_Y[i] + "'>" + pos_X[i] + "|" + pos_Y[i] + "</a>" + extra[i] + "</td>"
 zeile += "<td style='text-align:right;'>" + (deff_punkte/1000).toFixed(3) + "</td>"
 if(GM_getValue("Moral-" + welt) == "an") {
 zeile += "<td style='text-align:right;'><small>" + moral + "<span class='grey'>%</small></span></td>"
 }
 if(GM_getValue("Entfernung-" + welt) == "an") {
 zeile += "<td style='text-align:right;'><small>" + dista[i].toFixed(1) + "</small></td>";
 }
 
 // Alle Einheiten durchlaufen:
 for(x=0; x<einheit.length; x++) {
 // Dauer ermitteln:
 var zeit = dista[i]*speed[x];
 var zeit_sek = zeit*60;
 var weg_std = Math.floor(zeit_sek/3600);
 var weg_min = Math.floor((zeit_sek/60) - (weg_std*60));
 var weg_sek = zeit_sek%60;
 
 // Bei Sekunden < 10 eine 0 voranstellen:
 if(weg_min < 10) {
 weg_min = "0" + weg_min;
 }
 
 // Einheit ist AG:
 if(x == einheit.length-1) {
 // Ermitteln ob AG die Entfernung schafft:
 // Ãœber 40 Std.:
 if(weg_std > 40) {
 var dauer = "<span style='color:#C00;'>" + weg_std + "<span class='grey'>:</span>" + weg_min + "</span>";
 }
 // Ãœber 40:50 Std.:
 else if((weg_std == 40) && (weg_min > 50)) {
 var dauer = "<span style='color:#C00;'>" + weg_std + "<span class='grey'>:</span>" + weg_min + "</span>";
 }
 // Dauer OK:
 else {
 var dauer = weg_std + "<span class='grey'>:</span>" + weg_min;
 }
 }
 // Ãœbrige Einheiten:
 else {
 var dauer = weg_std + "<span class='grey'>:</span>" + weg_min;
 }
 
 // Dauer einfÃ¼gen:
 zeile += "<td style='text-align:right; padding-left:5px; cursor:default;' title='" + titel[x] + "'><small>" + dauer + "</small></td>";
 }
 
 // Aktuellen Zeile aktualisieren:
 vis.getElementsByTagName("tr")[i].innerHTML = zeile;
 }
}
// Dorf:
if(url.match(/screen=info_village/)) {
 // Tabelle mit DÃ¶rfern:
 var main = document.getElementsByClassName("main")[0];
 var ziel = main.getElementsByClassName("vis")[0];
 var ziel_koord = ziel.getElementsByTagName("tr")[1].getElementsByTagName("td")[1].innerHTML.split("|");
 var ziel_pos_X = ziel_koord[0];
 var ziel_pos_Y = ziel_koord[1];
 
 var tabelle = "";
 tabelle += "<table class='vis'>";
 tabelle += "<tr>";
 tabelle += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='Dorfname'>Dorfname</th>";
 tabelle += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='Koordinaten'>X | Y</th>";
 tabelle += "<td rowspan='" + zeilen + "' style='width:5px; background-image:url(http://" + land + welt + adresse[land] + land + "/graphic/background/content.jpg);'></td>";
 if(GM_getValue("Entfernung-" + welt) == "an") {
 tabelle += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='Entfernung'>";
 tabelle += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/speed.png'>";
 tabelle += "</th>";
 }
 // Einheiten:
 if(GM_getValue("Entfernung-" + welt) == "an") {
 for(e=0; e<einheit.length; e++) {
 if((e == 0) || (e == 3) || (e == 6) || (e == einheit.length-1)) {
 tabelle += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 1) || (e == 4) || (e == 7)) {
 tabelle += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='" + titel[e] + "'>";
 }
 else {
 tabelle += "<th style='text-align:center;' title='" + titel[e] + "'>";
 }
 
 if(e == 0) {
 tabelle += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/" + einheit[e] + ".png'>";
 }
 else {
 tabelle += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_" + einheit[e] + ".png'>";
 }
 }
 
 tabelle += "</th>";
 }
 else {
 for(e=0; e<einheit.length; e++) {
 if(e == 0) {
 tabelle += "<th style='text-align:center; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 3) || (e == 6) || (e == einheit.length-1)) {
 tabelle += "<th style='text-align:center; -moz-border-radius-topright:10px;' title='" + titel[e] + "'>";
 }
 else if((e == 1) || (e == 4) || (e == 7)) {
 tabelle += "<th style='text-align:center; -moz-border-radius-topleft:10px;' title='" + titel[e] + "'>";
 }
 else {
 tabelle += "<th style='text-align:center;' title='" + titel[e] + "'>";
 }
 
 if(e == 0) {
 tabelle += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/buildings/" + einheit[e] + ".png'>";
 }
 else {
 tabelle += "<img src='http://" + land + welt + adresse[land] + land + "/graphic/unit/unit_" + einheit[e] + ".png'>";
 }
 }
 
 tabelle += "</th>";
 }
 tabelle += "</tr>";
 
 dista[0] = Math.sqrt(Math.pow(akt_pos_X - ziel_pos_X, 2) + Math.pow(akt_pos_Y - ziel_pos_Y, 2));
 
 
 tabelle += "<tr>";
 if(document.getElementById("menu_row2").getElementsByTagName("td").length < 12) {
 var cell = 3;
 }
 else {
 var cell = 12;
 }
 var dorflink = document.getElementById("menu_row2").getElementsByTagName("td")[cell].getElementsByTagName("a")[0];
 tabelle += "<td><a href='" + dorflink + "'>" + dorflink.innerHTML + "</a></td>";
 tabelle += "<td style='text-align:center;'><a href='http://" + land + welt + adresse[land] + land + "/game.php?village=" + dorf_id + "&screen=map&x=" + akt_pos_X + "&y=" + akt_pos_Y + "' title='Auf Karte zentrieren'>" + akt_pos_X + "|" + akt_pos_Y + "</a></td>";
 tabelle += "<td style='background:none;'></td>";
 if(GM_getValue("Entfernung-" + welt) == "an") {
 tabelle += "<td style='text-align:right;'><small>" + dista[0].toFixed(1) + "</small></td>";
 }
 
 // Alle Einheiten durchlaufen:
 for(x=0; x<einheit.length; x++) {
 // Dauer ermitteln:
 var zeit = dista[0]*speed[x];
 var zeit_sek = zeit*60;
 var weg_std = Math.floor(zeit_sek/3600);
 var weg_min = Math.floor((zeit_sek/60) - (weg_std*60));
 var weg_sek = zeit_sek%60;
 
 // Bei Sekunden < 10 eine 0 voranstellen:
 if(weg_min < 10) {
 weg_min = "0" + weg_min;
 }
 
 // Einheit ist AG:
 if(x == einheit.length-1) {
 // Ermitteln ob AG die Entfernung schafft:
 // Ãœber 40 Std.:
 if(weg_std > 40) {
 var dauer = "<span style='color:#C00;'>" + weg_std + "<span class='grey'>:</span>" + weg_min + "</span>";
 titel[x] = "Der weg ist zu weit fÃ¼r das " + titel[x];
 }
 // Ãœber 40:50 Std.:
 else if((weg_std == 40) && (weg_min > 50)) {
 var dauer = "<span style='color:#C00;'>" + weg_std + "<span class='grey'>:</span>" + weg_min + "</span>";
 titel[x] = "Der weg ist zu weit fÃ¼r das " + titel[x];
 }
 // Dauer OK:
 else {
 var dauer = weg_std + "<span class='grey'>:</span>" + weg_min;
 }
 }
 // Ãœbrige Einheiten:
 else {
 var dauer = weg_std + "<span class='grey'>:</span>" + weg_min;
 }
 
 // Dauer einfÃ¼gen:
 tabelle += "<td style='text-align:right; padding-left:5px; cursor:default;' title='" + titel[x] + "'><small>" + dauer + "</small></td>";
 }
 tabelle += "</tr>";
 
 tabelle += "</table>";
 
 // Seite aktualisieren:
 document.getElementsByClassName("main")[0].innerHTML = main.innerHTML + tabelle;
}