// ==UserScript==
// @name           Dragosien Marktnummerierung
// @namespace      Uranos
// @description    Nummeriert die Angebote & Nachfragen im Markt von Dragosien / number the supplys and demands at the market of Dragosien
// @include        http://www.dragosien.de/*
// @include        http://www.dragosien.com/*
// @include        http://test.dragosien.de/*
// @include        http://speed.dragosien.de/*
// @include        http://dragosien.de/*
// @include        http://neu.dragosien.de/*n
// @exclude        http://dragosien.de/forum*
// @author         Uranos
// ==/UserScript==

// Markt
function markt (n,m) {
for (a = 1; a <= n; a++) {
// tabelle verbreitern
document.getElementById("drag_box").getElementsByTagName("table")[a].style.width = "475px";
// nummerierung hinzufuegen
var laenge = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr").length;
var zeilen = laenge - 2;
  for (i = 1; i <= zeilen; i++) {
  var spalte = document.createElement("td");
  var inhalt = document.createTextNode(i+".");
  spalte.appendChild(inhalt);
  var tabelle = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[i];
  var vorne = tabelle.getElementsByTagName("td")[0];
  tabelle.insertBefore(spalte, vorne);
  spalte.style.width = "20px";
  }
// kopfzeile verbreitern
document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("th")[0].colSpan = "3";
document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[laenge - 1].getElementsByTagName("td")[0].colSpan = "3";
// gesamtzahl angebote
var angebote = document.getElementById("drag_box").getElementsByTagName("table")[a].getElementsByTagName("tr")[laenge - 1].getElementsByTagName("td")[0]
var handel = new Array ("Angebote", "Nachfragen", "Angebot", "Nachfrage");
if (zeilen != 1) {
angebote.innerHTML = zeilen+" "+handel[a-1+m]+" f&uuml;r "+angebote.innerHTML; }
else { angebote.innerHTML = "1 "+handel[a+1+m]+" f&uuml;r "+angebote.innerHTML; }
}
}

if (document.getElementById("drag_box").innerHTML.search("Du kannst Nachfragen und Angebote") != -1) {
  if (document.getElementById("drag_box").getElementsByTagName("table")[2]) {
    markt (2,0); }
  else {
    if (document.getElementById("drag_box").getElementsByTagName("table")[1]) {
      if (document.getElementById("drag_box").getElementsByTagName("table")[1].innerHTML.search("Eigene Angebote") != -1) {
        markt (1,0); }
      else { markt(1,1); }
    }
  }
}