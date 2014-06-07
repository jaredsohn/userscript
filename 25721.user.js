// ==UserScript==
// @name           Dampfer.NET | [Link-Liste]
// @namespace      Dampfer.NET
// @description    Erstelle eine persönliche Link-Liste.
// @include        http://*dampfer.net/*
// ==/UserScript==

if (document.cookie) {
g_1 = document.cookie;
g_2 = g_1.substr(g_1.search("groesse=") + 8, g_1.search("px"));
g_3 = g_2.substr(0, g_2.length - 2);
}

function groesser() {
document.getElementById("linkliste").style.height = document.getElementById("linkliste").offsetHeight + 20 + "px";
var datum = new Date();
datum = new Date(datum.getTime() + 200 * 1000 * 60 * 60 * 24 * 365);
document.cookie = "groesse=" + document.getElementById("linkliste").offsetHeight + "px; expires=" + datum.toGMTString() + ";";
}

function kleiner() {
document.getElementById("linkliste").style.height = document.getElementById("linkliste").offsetHeight - 20 + "px";
var datum = new Date();
datum = new Date(datum.getTime() + 200 * 1000 * 60 * 60 * 24 * 365);
document.cookie = "groesse=" + document.getElementById("linkliste").offsetHeight + "px; expires=" + datum.toGMTString() + ";";
}

document.getElementById("bgc_contwin_meindampfer").innerHTML = document.getElementById("bgc_contwin_meindampfer").innerHTML + "</div></div><div class='bau_contwin2'><div class='bau_contwin1'><div class='bau_contwin3'>&nbsp;</div></div></div><div class='bau_contwin8'><div class='bau_contwin7'><div class='bau_contwin_header' id='cont_win_main_header'>Link-Liste</div></div><div class='bau_contwin9'>&nbsp;</div></div><div class='bau_contwin4' id='bgc_contwin_meindampfer' style='background-image:url(http://dampferstyling.ohost.de/scripts/link-liste/link-liste/hintergrund_3.jpg); background-repeat:repeat-y'><div class='bau_contwin6'><iframe src='http://dampferstyling.bplaced.net/scripts/link-liste/link-liste/link-liste_laden.html' id='linkliste' allowtransparency='true' style='width:150px; margin-left:auto; margin-right:auto; border:0px'></iframe><div class='bau_stop'><hr id='dashed_line'></div><table style='margin-top:5px'><tr><td><span id='link_list' style='margin-left:10px'><img src='images/mini_pfeil_1.gif' align='absmiddle'>&nbsp;<a href='http://dampferstyling.bplaced.net/scripts/link-liste/link-liste/link-liste_bearbeiten.html' alt='Bearbeiten' target='_blank'><span id='text_klein'>Bearbeiten</span></a></span></td><td><img src='http://dampferstyling.bplaced.net/scripts/link-liste/link-liste/groesser.gif' id='groesser' style='margin-left:25px; margin-right:1px; padding:2px; border:1px solid #422100; cursor:pointer'><img src='http://dampferstyling.bplaced.net/scripts/link-liste/link-liste/kleiner.gif' id='kleiner' style='padding:2px; border:1px solid #422100; cursor:pointer'></td></tr></table>";

document.getElementById("groesser").addEventListener("click", groesser, false);
document.getElementById("kleiner").addEventListener("click", kleiner, false);

if (document.cookie) {
document.getElementById("linkliste").style.height = g_3 + "px";
}