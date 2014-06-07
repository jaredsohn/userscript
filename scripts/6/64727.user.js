// --------------------------------------------------------------------
// ==UserScript==
// @name           VZ: Kleine Welt
// @namespace      vzisteinekleinewelt
// @description    Sucht nach Verbindungen aus einer Kette von Freunden
// @version        1.5.42
// @include        http://*.meinvz.tld/*
// @include        http://*.studivz.tld/*
// @include        http://*.schuelervz.tld/*
// ==/UserScript==
// Zwei Mal Namen entfernen, ein Mal Email, zwei Mal Profil, ein Mal Token
// --------------------------------------------------------------------
// VZ ist eine kleine Welt -- Suche nach Verbindungen über mehr als einen Freund hinweg
// Copyright (C) 2009-2010 Michael M.
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
// or read it online: <http://www.gnu.org/licenses/gpl-2.0.html>
//
// Eine inoffizielle deutsche Übersetzung findet sich unter
// <http://www.gnu.de/documents/gpl-2.0.de.html>
//
// Das Programm basiert zu Teilen auf den VZ-Tools (<http://userscripts.org/scripts/show/38483>)
// von Henning Schaefer (<http://userscripts.org/users/74882>).
// --------------------------------------------------------------------
// Bekannte Bugs, die mir zu obskur sind, um eine Verbesserung in Aussicht zu stellen
// - Bei Verbindungen über eine Person ist deren Bild "undefined"
//
// Features, die als Bug missverstanden werden könnten:
// - Ob das Ganze auch in meinVZ und schülerVZ funktioniert, weiß ich nicht, falls nicht, so ist es kein Bug, falls doch, ein Feature
//
// Für die Zukunft geplant
// - Heuristiken um die Abfragen zu minimieren, aber immer noch vernünftige Ergebnisse zu erzielen
// - Abbruch bei Captcha, erst wird sowieso nichts mehr
// - irgeneine Seite finden, auf der man die Freunde nicht nur in 15er Packungen auslesen kann
// - letztes Ergebnis speichern und gegebenenfalls erneut anzeigen
// - Algorithmus nur abbrechen, wenn beide Seiten in Sackgasse (ermöglicht Einbindung auch dort, wo der Kasten "Verbindung" fehlt)
//
//  Versionsgeschichte
//  1.5.x: Fehlerbehung, Abbruchmöglichkeiten
//  1.4.x: Fehlerbehung nach einigen Monaten Pause
//  1.3.x: Fehlerbehung und Konfiguration
//  1.2.x: es werden auch wie üblich die Bilder angezeigt und ein paar Kleinigkeiten wurden verbessert
//  1.1.x: rudimentärer Konfigurationsdialog
//  1.0.x: Funktion nett einbinden (nein, bei jedem Seitenaufruf eine Input-Box ist nicht nett)
//  0.4.x: die Anbindung an studiVZ funktioniert!
//  0.3.x: verbesserter Algorithmus, Laufzeit auf Wurzel heruntergebracht
//  0.2.x: erster Versuch, das Ganze an studiVZ anzubinden, es blieb beim Versuch
//  0.1.x: ursprünglicher Algorithmus
//
// --------------------------------------------------------------------
// Bugs nach Teilen
// Globale Variablen: trivial genug um bugfrei zu sein
// Hilfsfunktion: ich gehe jede Wette ein, dass Bugs darin sind
// DER Hauptbestandteil: keine Bugs bekannt, verhält sich in isolierter, kontrollierter Umgebung stets so wie er sollte
// Ein- und Ausgabe: keine Bugs bekannt
// Konfiguration: nicht vollständig DAU-sicher
// Debug/Test: trivial genug um bugfrei zu sein
// Einbindung in Seite: alternative Ermittlung von Profil-ID funktioniert irgendwie nicht, bei eigenem Profil tritt verschmerzbarer Fehler auf
//
// --------------------------------------------------------------------

//============================== Globale Variablen ====================
// Basis-URL
var url = window.location.protocol + "//" + window.location.host + "/";

var profId;                                                            //eigene ID

var idlaenge = 43;                                                     //Länge einer ID
var gm_praefix;                                                        //Präfix für gespeicherte Werte

var Namen = new Object();                                              //Namen[Id] liefert Name zu einer Id
var Bilder = new Object();                                             //Bilder[Id] liefert Bild-URL zu einer Id

var std_maximum = 3;                                                   //Standardwert für maximale Suchtiefe (Personen dazwischen)
var maximum;                                                           //Tatsächliche maximale Suchtiefe
var debug_immersuchen;                                                 //Immer einen Link zur Suche anbringen?
var ersten_ausblenden;                                                 //Erste Person in Reihe ausblenden?
var hilfe_anzeigen;                                                    //einen Link für die Hilfe anzeigen?

var max_profile, max_freunde, max_http;                                //maximale Anzahl an Abfragen

//Statistik
var stat_profile, stat_freunde, stat_http = 0;

//Abbruch
var abbruch = 0;
var abbruchgrund = "Der Abbruch erfolgte ohne spezifizierten Grund.";

//============================== Hilfsfunktion ========================
var Freunde = new Array();

holeFreunde = function(vonwem) {
//speichert alle Freunde im Array Freunde[], gibt deren Anzahl zurück
if (max_freunde > 0 && stat_freunde == max_freunde) { abbruch = 1; abbruchgrund = "Die maximale Anzahl an Freunden wurde erreicht."; }
if (abbruch == 1) return 0;
stat_freunde++;
var index = 0;
var seite = 1;
while (1) {                                                            //in einer hoffentlich irgendwann endenden Endlosschleife die Seiten durchgehen
      if (max_http > 0 && stat_http == max_http) { abbruch = 1; abbruchgrund = "Die maximale Anzahl an Abfragen wurde erreicht."; }
      if (abbruch == 1) return index;
      var req = new XMLHttpRequest();
      req.open("GET", url + "Friends/Friends/" + vonwem + "/p/" + seite, false);
      req.send(null);                                                  //hole Seite mit Freunden und warte
      stat_http++;
      if(req.status !== 200) {
         debug_message += "\nFehler beim Aufruf von " + url + "Friends/Friends/" + vonwem + "/p/" + seite;
         return index; }                                               //kein Erfolg -> Ende
      var friends = document.createElement("div");                     //aus VZ-Tools übernommen
      friends.innerHTML = req.responseText;
// if (captcha) { abbruch = 1; abbruchgrund = "Es trat ein CAPTCHA auf."; }
      var temp = friends.wrappedJSObject.getElementsByClassName("obj-pagertop")[0];
      if (temp) temp = temp.innerHTML.replace(/\s+$/,"").replace(/^\s+/,""); else temp = "";
      var duhast = temp.indexOf("Du hast");
      if (duhast != -1 && vonwem != profId) {                          //es ist deine eigene Seite, obwohl du eine fremde angefordert hast
         debug_message += "\nVermutlich Zugriff verweigert bei " + vonwem;
         return index; }
      if (duhast == -1) duhast = temp.indexOf(" hat ") - 3;            //Anzahl der Freunde bestimmen
      temp = temp.substring(duhast, temp.length);
      temp = temp.substring(8,temp.length - 53);
      if (temp == "eine") temp = 1;
      if (isNaN(temp)) temp = 0;
      var anzahl = temp;
      friends = friends.getElementsByTagName("tbody")[0];
      if (friends) {
         var tags = friends.getElementsByTagName("tr");
         var nodes = [];
         for (var n = 0; n < tags.length; n++)
             nodes[nodes.length] = tags[n].wrappedJSObject; }
      if ((!friends) || (nodes.length == 0)) return index;             //keine Freunde mehr da -> Ende
      for (var i = 0 ; i < nodes.length; i++) {                        //sonst alle mit URL (-> ID), Name und Bild auslesen
          var urlf = nodes[i].getElementsByTagName("a")[0];
          if (urlf) { urlf = urlf.href; } else { continue; }           //frag mich nicht, warum das nötig ist, jedenfalls ist es das
          var name = nodes[i].getElementsByTagName("img")[0];
          if (name) { name = name.alt; } else { continue; }
          var id = urlf.substring(urlf.length - idlaenge, urlf.length);
          Freunde[index] = id;
          Namen[id] = name;
          Bilder[id] = nodes[i].getElementsByTagName("img")[0].src     //das Profilbild,
                                       .replace(/-m(\.\w*)$/, "-s$1"); //aber bitte die kleine Variante, nicht die mittelgroße
          index++; }
      if (index == anzahl) return index;
      seite++; }                                                       //nächste Seite
}

//============================== DER Hauptbestandteil =================
var Kette = new Array();
findeVerbindung = function(von, nach, max) {
//sucht Verbindung, gibt Länge der Kette zurück, Kette[0]=nach, Kette[return]=von
stat_profile = 0; stat_freunde = 0; stat_http = 0;
debug_message += "\nStarte Suche von " + von + " zu " + nach + " bis Tiefe " + maximum;
var erfolg = 0;

if (von == nach) { Kette[0] = von; return 0; }                         //von und nach identisch

var a = new Array(2);                                                  //a[x] (x=0, 1): von vorne und hinten
a[0] = new Array();                                                    //a[x][k][0]: möglicher Freund, a[x][k][1]: dessen Vorgänger in der Kette
a[0][0] = new Array(2);
a[0][0][0] = von; a[0][0][1] = "";                                     //erster Freund, kein Vorgänger
a[1] = new Array();
a[1][0] = new Array(2);
a[1][0][0] = nach; a[1][0][1] = "";                                    //letzter Freund, kein Vorgänger

var treffen;                                                           //wo die Ketten aufeinandertreffen

var s = 0; p = 0;                                                      //Stufe, Richtung
var k_min = new Array(2); var k_max = new Array(2);                    //k_min: bis zu diesem Index untersucht, k_max: größter Index
k_min[0] = -1; k_min[1] = -1; k_max[0] = 0; k_max[1] = 0;
var k_min_ = new Array(2); var k_max_ = new Array(2);                  //jeweils alte Werte

repeat: do {
    k_min_[p] = k_max[p]; k_max_[p] = k_max[p];                        //alte Werte speichern
    for (var k = k_min[p] + 1; k <= k_max[p]; k++) {                   //von der kleinsten bis zur größten noch nicht untersuchten Person
        var anzahl = holeFreunde(a[p][k][0]);                          //Freunde holen
        forR: for (var i = 0; i < anzahl; i++) {                       //jeden Freund untersuchen
            var R = Freunde[i];
            for (var l = 0; l <= k_max_[p]; l++)
                if (a[p][l][0] == R) continue forR;                    //ob er schon vorkommt
            k_max_[p]++;                                               //ansonsten hinten anhängen
            a[p][k_max_[p]] = new Array(2);
            a[p][k_max_[p]][0] = R; a[p][k_max_[p]][1] = a[p][k][0];   //Vorgänger ist aktuell untersuchter Freund
            stat_profile++;
            if (max_profile > 0 && stat_profile > max_profile) { abbruch = 1; abbruchg = "Die maximale Anzahl an Profilen wurde erreicht."; }
            for (var n = 0; n <= k_max[1 - p]; n++)
                 if (R == a[1 - p][n][0]) {                            //am Ziel angekommen?
                    erfolg = 1; treffen = R; break repeat; }
        }
    }
    k_min[p] = k_min_[p]; k_max[p] = k_max_[p]; s++; p = 1 - p;
} while ((k_min[1 - p] != k_max[1 - p]) && (s <= max));                //weiter bis keine neuen Freunde oder zu viele Iterationen

if (erfolg == 0) return -1;

var Kette0 = new Array();
var Kette1 = new Array();

Kette0[0] = treffen;                                                   //von der Mitte zum Anfang
while (Kette0[Kette0.length - 1] != von) {
      forj0: for (var j = 0; j <= k_max_[0]; j++)
             if (a[0][j][0] == Kette0[Kette0.length - 1]) break forj0;
      Kette0.push(a[0][j][1]); }

Kette1[0] = treffen;                                                   //von der Mitte zum Ende
while (Kette1[Kette1.length - 1] != nach) {
      forj1: for (var j = 0; j <= k_max_[1]; j++)
             if (a[1][j][0] == Kette1[Kette1.length - 1]) break forj1;
      Kette1.push(a[1][j][1]); }

Kette0.reverse().pop();                                                //zusammensetzen
Kette = Kette0.concat(Kette1);
return Kette.length - 1;
}

//============================== Ein- und Ausgabe =====================
starteSuche = function() {
var icon = "data:image/gif;base64,R0lGODlhEAAQAOMAAAAAACQkJEdHR2tra" + //mit GIMP erstelltes und mit
    "4%2BPj7Ozs9bW1vr6%2Bv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2" + //<http://software.hixie.ch/utilities/cgi/data/data>
    "FC05FVFNDQVBFMi4wAwEAAAAh%2BQQFCgAPACwAAAAAEAAQAAAEQPDJiSqamFY" + //konvertiertes Icon
    "AbH7W1oUYEgRhdRyXVJ0pslZubIN2jgiCjhiGCs8H9N2MHtxgECsUaK5l81kKE" +
    "Qipj%2BWa%2FNSgmAgAIfkEBQoADwAsAQABAA4ADgAABCfwyRnCvLjiKcQGwNV" +
    "94Wae5zCgz3GorMvOKEFshnHZuG4WBRpwEwEAIfkEBQoADwAsAQABAA4ADgAAB" +
    "CfwySnEvLjiOcYOwdV94WaeJ0GgDwCorMvOaFFsx3HZuG4aBhpwEwEAIfkEBQo" +
    "ADwAsAQABAA4ADgAABCfwyTnGvLjiScgWwtV94WaeZ1GgTxCorMvOqGFsAHDZu" +
    "G4eBxpwEwEAIfkEBQoADwAsAQABAA4ADgAABCfwyUnIvLjiWcoew9V94Waep2G" +
    "gjyCorMvO6HFsQXDZuG4CABpwEwEAIfkEBQoADwAsAQABAA4ADgAABCfwyVnKv" +
    "LjiacwmxNV94Wae53GgzzCorMvOKABsgnDZuG4GARpwEwEAIfkEBQoADwAsAQA" +
    "BAA4ADgAABCfwyWnMvLjiec4uxdV94WaeJwCgD0GorMvOaBBsw3DZuG4KAhpwE" +
    "wEAIfkEBQoADwAsAQABAA4ADgAABCfwyXnOvLjiCcA2xtV94WaeZxCgT1GorMv" +
    "OqCBsBHHZuG4OAxpwEwEAOw%3D%3D";

var verbindung = document.getElementById("Friends-Connection");        //Der "Verbindung"-Kasten
verbindung.innerHTML = "<h2>Verbindung</h2><p><img src='" + icon + "' alt = 'Bitte warten!' /><p>";
var du = document.URL.substr(document.URL.length - idlaenge);          //ID der Person, deren Seite man gerade besucht
var profBild = document.getElementById("profileImage");
Namen[du] = profBild.alt;                                              //Name extrahieren, nur für den Notfall
Bilder[du] = profBild.src.replace(/(\.\w*)$/, "-s$1");                 //kleines Bild, nur für den Notfall
Bilder[profId] = "";                                                   //nur für den Notfall

var zahl = findeVerbindung(du, profId, maximum);

var ergebnis = "<h2>Verbindung</h2>";
if (zahl == -1)                                                        //keine Verbindung gefunden
   ergebnis += "<p>Auch keine Verbindung über " + maximum + " Zwischenstationen gefunden";
else {                                                                 //Verbindung aufbauen
  ergebnis += "<ul class='obj-thumbnaillist'>";
  for (var i = zahl - ersten_ausblenden; i >= 0; i--) {
      Bilder[Kette[i]].replace(/svz-nopic-s\.jpg$/, "svz-nopic-w.jpg");//hoch leben konsistente Bezeichungen
      ergebnis +="<li><div class='imageContainer'><a href='" + url + "Profile/" +
      Kette[i] + "'><img src='" + Bilder[Kette[i]] + "' alt='" + Namen[Kette[i]] + "'></a></div>" +
      "<div class='caption'><a href='" + url + "Profile/" + Kette[i] +"'>" +
      Namen[Kette[i]] + "</a></div></li>"; }
  ergebnis += "</ul>";
}

if (abbruch == 1) ergebnis += "<br />Die Suche wurde abgebrochen. " + abbruchgrund;

var statistik = "<small>Bei der Suche wurden " + stat_profile + " Personen untersucht, von " +
    stat_freunde + " wurden dabei alle Freunde bestimmt, was zu " + stat_http + " Anfragen führte.</small>";
ergebnis += "<br />" + statistik;

verbindung.innerHTML = ergebnis;                                       //Ergebnis anzeigen
}

//============================== Konfiguration ========================
//Prinzip und Gestaltung von den VZ-Tools übernommen
var dialog;

function swapTabs(evt) {
  var handles = document.getElementsByClassName("tabhandle");
  for (var n = 0; n < handles.length; n++)
      handles[n].wrappedJSObject.style.backgroundColor = "transparent";
  var pages = document.getElementsByClassName("tabpage");
  for (var n = 0; n < pages.length; n++)
      pages[n].wrappedJSObject.style.display = "none";
  evt.target.wrappedJSObject.style.backgroundColor = "#ffa0a0";
  switch(evt.target.wrappedJSObject.id) {
    case "handle1":
        document.getElementById("tab1").style.display = "block";
      break;
    case "handle2":
        document.getElementById("tab2").style.display = "block";
      break;
    case "handle3":
        document.getElementById("tab3").style.display = "block";
      break;
  }
}

konfiguration = function() {
var icon = "data:image/gif;base64,R0lGODlhIAAgAMICAAAA%2F%2F8AAP93A" + //mit GIMP erstelltes und mit
    "AD%2FAP%2F%2FAP93AP93AP93ACH5BAEKAAcALAAAAAAgACAAAAOrGLe82jDG8" + //<http://software.hixie.ch/utilities/cgi/data/data>
    "BqVWF64l%2FhCxlVMJxAoEYolaaqgyjruc66ePG%2FbHfksngL402WERElSQwk" + //konvertiertes Icon
    "AAVDAAMpYTpy6qHQwBVSNGGCXSyZ%2FccUVN1omew%2FWHK4rrZff8SRdu%2BV" +
    "%2BwGcQfH1lKGgNS1ptfR8ZS2tQd1Esj3uQk5RGJ5Z8M3J%2FIYOYnnApOKKki" +
    "I1BTa2tqVeuTbA7HbQYs7dHtrojJL0WvMA0v8MHsq%2B9yK4JADs%3D";

var tabhandlestil = "cursor:pointer; font-weight:bold; border:1px solid #ee0000; border-bottom:none; padding:0.5em; float:left;";
var tabpagestil = "width:38em; padding:2em; position:absolute; top:0px; left:0px;";
var hilfestil = "style='border-bottom:1px dotted #808080; cursor:help;'";

var text = "";
text += "<div id='handle1' class='tabhandle' style='background-color:#ffa0a0; " + tabhandlestil + "'>Konfiguration</div>";
text += "<div id='handle2' class='tabhandle' style='" + tabhandlestil + " border-left:none;'>Debug/Hilfe</div>";
text += "<div id='handle3' class='tabhandle' style='" + tabhandlestil + " border-left:none;'>Info</div>";

text += "<div style='position:relative; clear:both; width:43em; height:50em; border:1px solid  #ee0000;'>";

// Tab 1: Konfiguration
text += "<div id='tab1' class='tabpage' style='" + tabpagestil + "'>";
text += "<h2>Allgemeine Werte</h2>";
text += "Einstellungen für Person mit ID <tt>" + profId + "</tt><br />";
if (profId == "")
   text += "<span style='color:red; font-weight:bold;'>Achtung! Bitte erst anmelden, sonst können die Werte nicht gespeichert werden!</span>";
text += "Maximale <span title='Anzahl der Personen zwischen dir und dem anderen' " + hilfestil + ">Suchtiefe</span>: " +
        "<input type='text' size='2' maxlength='2' id='vkw_varmax' value='" + maximum + "'/> (Standardwert: " +
        std_maximum + ")<br />";
text += "<input type='checkbox' id='vkw_immersuchen'";
if (debug_immersuchen == 1) text += " checked";
text += " /> Immer Suchlink anzeigen (zu Testzwecken)<br />";
text += "<input type='checkbox' id='vkw_ausblenden'";
if (ersten_ausblenden == 1) text += " checked";
text += " /> Dich in der Kette ausblenden (z. B., weil dies dein Zweitaccount ist)<br />";
text += "<input type='checkbox' id='vkw_hilfezeigen'";
if (hilfe_anzeigen == 1) text += " checked";
text += " /> Hilfelink anzeigen";
text += "<h2>Abbruchkriterien</h2>";
text += "(Der Standardwert 0 steht für unbegrenzt.)<br />";
text += "Maximale Anzahl an HTTP-Abfragen: " +
        "<input type='text' size='2' maxlength='2' id='vkw_maxhttp' value='" + max_http + "'/><br />";
text += "Maximale Anzahl an Abfragen von Freundeslisten: " +
        "<input type='text' size='2' maxlength='2' id='vkw_maxfreunde' value='" + max_freunde + "'/><br />";
text += "Maximale Anzahl an Profilen, die untersucht werden: " +
        "<input type='text' size='2' maxlength='2' id='vkw_maxprofile' value='" + max_profile + "'/><br />";
text += "</div>";

// Tab 2: Debug/Hilfe
text += "<div id='tab2' class='tabpage' style='display: none; " + tabpagestil + "'>";
text += "<h2>Debug-Funktionen</h2>";
text += "&raquo; <a href='javascript:void(null)' id='vkw_speziellesuche'>Beliebige Suche durchführen</a><br />";
text += "&raquo; <a href='javascript:void(null)' id='vkw_display'>Fehler- und sonstige Meldungen anzeigen</a><br />";
text += "&raquo; <a href='javascript:void(null)' id='vkw_reset'>Alle Standardwerte wieder herstellen</a><br /><br />";
text += "<h2>Hilfe</h2>";
text += "<p>Unter jedem <i>Keine Verbindung gefunden</i> müsste sich ein Link finden, der es dir erlaubt, " +
        "nach einer längeren Verbindung zu suchen. Dazu gibt es ein paar Kleinigkeiten zu beachten.<br />" +
        "1: Die Länge einer Verbindung lässt sich beliebig einstellen. Den Konfigurationsdialog " +
        "hast du ja bereits im Greasemonkey-Menü gefunden.<br />" +
        "2: Ebenfalls in diesem Dialog gibt es ein paar Hilfsfunktionen, z. B. um eine beliebige " +
        "Verbindung zu suchen. Dazu brauchst du die Profil-IDs der beiden Personen, also diese " +
        "kryptischen Zeichenketten, die jeweils in der <span title='Uniform Ressource Locator' " +
        hilfestil + ">URL</span> stehen. Vorhanden ist auch eine Ausgabe von Fehlerinformationen.<br />" +
        "3: Das Skript fragt <strong>sehr viele</strong> Daten ab! Je nachdem, wie man die AGBs " +
        "interpretiert, verstößt man mit der Verwendung dieses Skripts dageben. Unabhängig davon " +
        "kann es einem ziemlich schnell passieren, dass man für jede Aktionen ein <span title='" +
        "Completely Automated Public Turing test to tell Computers and Humans Apart' "+ hilfestil +
        ">CAPTCHA</span> lösen muss oder sogar kurzzeitig gesperrt wird! Eine Verbindung über drei " +
        "Zwischenglieder pro Tag suchen zu lassen scheint ohne diese Konsequenzen möglich zu sein, " +
        "garantieren kann ich aber für nichts, beschwer dich also nicht bei mir, wenn du gesperrt wirst. " +
        "Eine Möglichkeit diesen Gefahren zu entgehen liegt in einem Zweit-Account, der nur mit dir " +
        "befreundet ist.<br />" +
        "4: Das Skript enthält noch einige Fehler und Dinge, die besser gestaltet werden könnten. " +
        "Bevor du mir einen Bug-Report/Feature-Request zukommen lässt, schau bitte in den Kommentar " +
        "im Kopf dieses Skripts (Benutzerskripte verwalten... &gt; Bearbeiten...), ob mir das Problem " +
        "schon bekannt ist.</p>";
text += "</div>";

// Tab 3: Info
text += "<div id='tab3' class='tabpage' style='display: none; " + tabpagestil + "'>";
text += "<h2>Info</h2>";
text += "<img src='" + icon + "' alt='VZ ist eine kleine Welt' style='float:left; margin: 1em 1em 1em 1em;'/>";
text += "<b>VZ ist eine kleine Welt</b> &ndash; Suche nach Verbindungen über mehr als einen Freund hinweg<br />";
text += "&copy; 2009-2010 Michael M.<br />"
text += "<p style='clear:left'>Dieses Programm ist freie Software. Du kannst es unter den Bedingungen der " +
        "GNU General Public License, wie von der Free Software Foundation veröffentlicht, weitergeben oder " +
        "modifizieren, entweder gemäß Version 2 der Lizenz oder (nach deiner Wahl) jeder späteren Version.<br />";
text += "Die Veröffentlichung dieses Programms erfolgt in der Hoffnung, dass es dir von Nutzen sein wird, " +
        "aber OHNE IRGENDEINE GARANTIE, sogar ohne die implizite Garantie der MARKTREIFE oder der " +
        "VERWENDBARKEIT FÜR EINEN BESTIMMTEN ZWECK. Details findest du in der " +
        "<a href='http://www.gnu.de/documents/gpl-2.0.de.html'>GNU General Public License.</a></p>";
text += "</div>";

text += "</div><br />";
text += "<br /><br /><center><a href='javascript:void(null)' id='vkw_speichern' ><b>[Speichern]</b></a> " +
        "<a href='javascript:void(null)' id='vkw_abbrechen' ><b>[Abbrechen]</b></a></center>";

dialog = unsafeWindow.Phx.UI.Dialog.ButtonDialog(
                        "VZ: Kleine Welt - Einstellungen",
                        { "message" : text,
                          "buttons" : [ ]
                        });
dialog.show();
document.getElementById("vkw_speziellesuche").addEventListener("click", debug, false);
document.getElementById("vkw_display").addEventListener("click", displayDebug, false);
document.getElementById("vkw_reset").addEventListener("click", zuruecksetzen, false);

document.getElementById("vkw_abbrechen").addEventListener("click", function (e) { dialog.close(); }, false);
document.getElementById("vkw_speichern").addEventListener("click", konfigurationspeichern, false);

document.getElementById("handle1").addEventListener("click", swapTabs, false);
document.getElementById("handle2").addEventListener("click", swapTabs, false);
document.getElementById("handle3").addEventListener("click", swapTabs, false);
}

konfigurationspeichern = function() {
var wert = document.getElementById("vkw_varmax").value;
maximum = (isNaN(wert)) ? std_maximum : wert;
wert = document.getElementById("vkw_maxprofile").value;
max_profile = (isNaN(wert)) ? 0 : wert;
wert = document.getElementById("vkw_maxhttp").value;
max_http = (isNaN(wert)) ? 0 : wert;
wert = document.getElementById("vkw_maxfreunde").value;
max_freunde = (isNaN(wert)) ? 0 : wert;
debug_immersuchen = document.getElementById("vkw_immersuchen").checked ? 1:0;
ersten_ausblenden = document.getElementById("vkw_ausblenden").checked ? 1:0;
hilfe_anzeigen = document.getElementById("vkw_hilfezeigen").checked ? 1:0;
GM_setValue(gm_praefix + "maximum", maximum);
GM_setValue(gm_praefix + "maxprofile", max_profile);
GM_setValue(gm_praefix + "maxhttp", max_http);
GM_setValue(gm_praefix + "maxfreunde", max_freunde);
GM_setValue(gm_praefix + "immer_suchen", debug_immersuchen);
GM_setValue(gm_praefix + "ausblenden", ersten_ausblenden);
GM_setValue(gm_praefix + "hilfezeigen", hilfe_anzeigen);
dialog.close();
window.location.reload();
}

zuruecksetzen = function() {
GM_deleteValue(gm_praefix + "maximum");
GM_deleteValue(gm_praefix + "maxprofile");
GM_deleteValue(gm_praefix + "maxhttp");
GM_deleteValue(gm_praefix + "maxfreunde");
GM_deleteValue(gm_praefix + "immer_suchen");
GM_deleteValue(gm_praefix + "ausblenden");
GM_deleteValue(gm_praefix + "hilfezeigen");
dialog.close();
window.location.reload();
}

hilfeaufrufen = function() {
  konfiguration();
  var evObj = document.createEvent("MouseEvents");
  evObj.initEvent( "click", true, true );
  document.getElementById("handle2").dispatchEvent(evObj);
}

GM_registerMenuCommand("VZ: Kleine Welt - Einstellungen", konfiguration);

//============================== Debug/Test ===========================
var debug_message = "";
displayDebug = function() {
alert(debug_message); }

debug = function() {
var max = prompt("Suchtiefe:", maximum);
var p1 = prompt("ID von erster Person:", profId);
var p2 = prompt("ID von zweiter Person:", profId);
var zahl = findeVerbindung(p1, p2, max);
var antwort = "";
if (zahl == -1) antwort = "Keine Verbindung!";
else {
     Namen[p1] = "der erste"; Namen[p2] = "der zweite";
     for (var i = 0; i <= zahl; i++) antwort += i + ": " + Namen[Kette[i]] + " (" + Kette[i] + ")\n";
}

if (abbruch == 1) antwort += "Die Suche wurde abgebrochen. " + abbruchgrund + "\n";

antwort += "\nStatistik:\nPersonen: " + stat_profile;
antwort += "\nFreundeslisten: " + stat_freunde + "\nHTTP-Anfragen: " + stat_http;
alert(antwort);
}

//============================== Einbindung in Seite ==================
einbinden = function() {
var verbindung = document.getElementById("Friends-Connection");        //Der "Verbindung"-Kasten
var hilfelink = "&nbsp;&bull;&nbsp;<a href='javascript:void(null)' id='vkw_hilfe'>[?]</a>";
if (hilfe_anzeigen == 0) hilfelink = "";                               //Hilfelink, falls gewünscht
if (!verbindung) {
   debug_message += "\nKein Verbindungskasten vorhanden";
} else {
       if (verbindung.innerHTML.indexOf("Keine Verbindung gefunden") > -1) {
          debug_message += "\nLeeren Verbindungskasten gefunden";
          verbindung.innerHTML = "<h2>Verbindung</h2><p>Keine Verbindung gefunden<br\>" +
          "<a href='javascript:void(null)' id='vkw_startesuche'>[Längere Verbindung suchen]</a>" +
          hilfelink + "</p>";                                          //falls keine Verbindung, Link einfügen ...
          document.getElementById("vkw_startesuche").addEventListener("click", starteSuche, false);
          if (hilfe_anzeigen == 1) document.getElementById("vkw_hilfe").addEventListener("click", hilfeaufrufen, false); }
                                                                       //... und Event-Listener installieren
      else {
           debug_message += "\nVoller Verbindungskasten vorhanden"; if (debug_immersuchen == 1) {
           verbindung.innerHTML += "<br /><a href='javascript:void(null)' id='vkw_startesuche'>[Selbst nach Verbindung suchen]</a>" + hilfelink;
           Bilder[profId] = verbindung.getElementsByTagName("ul")[0].getElementsByTagName("li")[0]
                            .getElementsByTagName("div")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].src;
           Namen[profId] = verbindung.getElementsByTagName("ul")[0].getElementsByTagName("li")[0]
                            .getElementsByTagName("div")[0].getElementsByTagName("a")[0].getElementsByTagName("img")[0].alt;
           document.getElementById("vkw_startesuche").addEventListener("click", starteSuche, false);
           if (hilfe_anzeigen == 1) document.getElementById("vkw_hilfe").addEventListener("click", hilfeaufrufen, false); }}
}}

window.addEventListener("load", function() {
 profId = document.evaluate('//ul[@id="Grid-Navigation-Main"]/li[2]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).wrappedJSObject;
 profId = profId.singleNodeValue.href
 profId = profId.substring(profId.indexOf('Profile/') + 8, profId.length - 8);
 idlaenge = profId.length;
 gm_praefix = profId + "_";

 debug_message += "Eigene ID: " + profId;

 maximum = GM_getValue(gm_praefix + "maximum", std_maximum);           //gespeicherte Werte lesen
 max_profile = GM_getValue(gm_praefix + "maxprofile", 0);
 max_http = GM_getValue(gm_praefix + "maxhttp", 0);
 max_freunde = GM_getValue(gm_praefix + "maxfreunde", 0);
 debug_immersuchen = GM_getValue(gm_praefix + "immer_suchen", 0);
 ersten_ausblenden = GM_getValue(gm_praefix + "ausblenden", 0);
 hilfe_anzeigen = GM_getValue(gm_praefix + "hilfezeigen", 1);

 einbinden(); }, true);