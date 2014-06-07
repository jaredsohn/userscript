// ==UserScript==
// @name           Kapiland - Gebäude ordnen
// @description    Ordnet die Gebäude ähnlich wie in Regnum an, fügt aber noch Links zu den Gebäudetypen hinzu.
// @namespace      http://www.morgil.de
// @include        http://*kapiland*main.php4?page=*
// ==/UserScript==

String.prototype.chunk_split = function(a,b) {
	for(tmp="",y=x=0;x<this.length;x++) {
		if(y==a) { tmp+=b+this.substring(x,x+1); y=1; }
		else { tmp+=this.substring(x,x+1); y++; }
	}
	return tmp;
};

function showmode() {
GM_setValue("forschs", window.confirm("Übersicht anzeigen bei:\nForschungsgebäuden\nAktueller Wert: "+ GM_getValue("forschs")));
GM_setValue("gebs", window.confirm("Übersicht anzeigen bei:\nProduktionsgebäuden\nAktueller Wert: "+ GM_getValue("gebs")));
GM_setValue("kaufs", window.confirm("Übersicht anzeigen bei:\nVerkaufsgebäuden\nAktueller Wert: "+ GM_getValue("kaufs")));
GM_setValue("sonst", window.confirm("Übersicht anzeigen bei:\nSpezialgebäuden\nAktueller Wert: "+ GM_getValue("sonst")));
}
GM_registerMenuCommand("Welche Gebäude sortieren", showmode);
if(GM_getValue("forschs", "leer") == "leer") {
showmode();
}

var seite = document.location.href.match(/page=(.[a-z]*)/)[1];
if(GM_getValue(seite, false)==true) {
if(document.getElementById("upsimtoolbar")) var tb = 2;
else var tb = 0;
var zeilen = document.getElementsByTagName("tr");
for(var i = 20; i < 50; i++) {
  if(zeilen[i].getElementsByTagName("td")[0].innerHTML.match(/Adresse/)) {
    var start = i + tb;
    break;
  }
}
var letzte = "";
var x_name = /(.[a-zA-Z\.äöüÄÖÜ_&\;]*)/;
var uebers = Array();
var j = 0;
for(var i = start+2; i < zeilen.length; i++) {
  var zellen = zeilen[i].getElementsByTagName("td");
  if(!zellen[1]) break;
  var typ = zellen[1].innerHTML.match(x_name)[1];
  if(letzte != typ) {
    var ueberschrift = document.createElement("tr");
    zeilen[i].parentNode.insertBefore(ueberschrift,zeilen[i]);
    ueberschrift.className = "menue";
    ueberschrift.innerHTML = "<td class=\"white\" style=\"border-top: 1px groove;\" colspan=\"4\"><b>" + typ + "</b><a name=\"" + typ + "\">&nbsp;</a> <a href=\"#top\">(nach oben)</a></td>";
    letzte = typ;
    uebers[j] = typ;
    j++;
  }
}
var tabelle = zeilen[start+1].parentNode;
var qs = "";
for(var j = 0; j < uebers.length; j++) {
  qs = qs + "<a href=\"#" + uebers[j] + "\">" + uebers[j] + "</a>&nbsp; ";
}
tabelle.innerHTML = "<tr><td colspan=\"4\">Gehe zu: " + qs + "<hr></td></tr>" + tabelle.innerHTML;
}