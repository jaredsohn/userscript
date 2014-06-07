// ==UserScript==
// @name           New Upjers-Toolbar for Kapiland
// @author         Morgil/Jonas Böer
// @namespace      http://www.morgil.de
// @description    Neue Upjers-Toolbar in Kapiland mit nützlichen Links
// @include        http://*kapiland*main.php4*
// ==/UserScript==
var toolbar = document.getElementById("toolbar");
if(toolbar) {
var tabelle = toolbar.getElementsByTagName("table")[0];

//Hauptelemente für spätere Verwendung vorbereiten
var zellen = tabelle.getElementsByTagName("td");
var bilder = tabelle.getElementsByTagName("img");

//Allgemeine Style-Änderungen
tabelle.style.background = "none";
zellen[0].className = "white";
zellen[1].className = "white2";
zellen[3].className = "white";
tabelle.style.position = "absolute";

//Bild am Anfang ersetzen
zellen[0].width = "30";
bilder[0].src = "http://www.kapiforum.nasenprinz.de/images/avatars/1974521002447999c364c3c.png";
bilder[0].width = "30";

//Text ersetzen
zellen[1].innerHTML = "Morgil's Kapiland-Toolbar";

zellen[2].parentNode.removeChild(zellen[2]);
var zelle = document.createElement("td");
zelle.innerHTML = '<select onchange="window.open(this.value)" style="font-family: Arial; color: rgb(0, 0, 0); font-size: 9pt;"><option value="">Tools</option>' +
'<option value="http://www.kapitools.de">KapiTools</option>' +
'<option value="http://kapiwiki.trade4fun.de">KapiWiki</option>' +
'<option value="http://www.kapiforum.nasenprinz.de/viewforum.php?f=5">Einsteigerhilfe</option>' +
'<option value="http://shop.xn--gssow-kva.de">Trade-Center</option>' +
'<option value="http://www.kapigeco.de/">GeCo</option></select>';
zelle.innerHTML = zelle.innerHTML + '&nbsp;<select onchange="window.open(this.value)" style="font-family: Arial; color: rgb(0, 0, 0); font-size: 9pt;"><option value="">Handelsorganisationen</option>' +
'<option value="http://www.2for1-ho.de/">2for1 Trade Holding</option>' +
'<option value="http://www.tib-ho.com">TIB</option>' +
'<option value="http://www.kapi-orden.de.nr">Kapi-Orden</option>';
zelle.innerHTML = zelle.innerHTML + '&nbsp;<select onchange="window.open(this.value)" style="font-family: Arial; color: rgb(0, 0, 0); font-size: 9pt;"><option value="">Interessengemeinschaften</option>' +
'<option value="http://www.kapiforum.nasenprinz.de/viewtopic.php?t=25530">AchDuHeiligesBier</option>' +
'<option value="http://www.drogeristenvereinigung.de/">Drogeristenvereinigung</option>' +
'<option value="http://www.kapiforum.nasenprinz.de/viewtopic.php?t=8620">IG Elektronik</option>' +
'<option value="http://igf.rotzfahne.vg/forum/">IG Food</option>' +
'<option value="http://www.kapiforum.nasenprinz.de/viewtopic.php?t=7771">Öl- und Benzinforum</option>' +
'<option value="http://www.kapiforum.nasenprinz.de/viewtopic.php?t=85742">Schmuckvereinigung</option>' + '<option value="http://www.oilcorp.de.vu/">OilCorp</option>';
zellen[2].parentNode.insertBefore(zelle, zellen[2]);
zellen[2].className = "white2";
}