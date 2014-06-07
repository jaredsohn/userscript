// ==UserScript==
// @name           Kapiland-Tools
// @author         Morgil/Jonas Böer
// @namespace      http://www.morgil.de
// @description    Einbindung des Votebuttons der Galaxy-News im Onlinespiel Kapiland (erstellt von Morgil im Auftrag der GeCo) - Ausblenden der UpSim-Toolbar
// @include        http://*kapiland*main.php4*
// ==/UserScript==

//Schöne Speicherung, ob die Toolbar angezeigt werden soll
function set_show() {
GM_setValue("show_upsimtoolbar", window.confirm("Einstellung ändern für das Kapiland-Script:\nSoll die UpSim-Toolbar angezeigt werden?"));
}
GM_registerMenuCommand("Kapiland: UpSim-Toolbar anzeigen?", set_show);
if(GM_getValue("show_upsimtoolbar", "leer") == "leer") {
set_show();
}

var tablenr = 0;
var toolbar = document.getElementById("upsimtoolbar");
if(toolbar) {
if(GM_getValue("show_upsimtoolbar") == false) {
toolbar.style.display = "none";
var divs = document.getElementsByTagName("div")[1];
divs.style.display = "none";
}
var tablenr = 1;
}
//Einbindung des Votebuttons
var logo = document.createElement("div");
logo.innerHTML = '<a href="http://bgs.gdynamite.de/charts_vote_333.html" target="_blank">' +
'<img src="http://www.globaler-treffpunkt.de/bilder/vote_bg2007.gif" width="468" height="60" border="0" alt="Votebutton" />' +
    '</a>';
var tabelle = document.getElementsByTagName("table")[tablenr];
var zelle = tabelle.getElementsByTagName("td")[2];
var bild = zelle.getElementsByTagName("img")[0];
bild.parentNode.removeChild(bild);
zelle.insertBefore(logo, zelle.firstChild);