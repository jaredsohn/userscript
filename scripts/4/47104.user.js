// ==UserScript==
// @name          tribalwars.ae-mail-plapl.com
// @description   الرد السريع على الرسايل
// @include       http://ae1.tribalwars.ae/game.php?*&screen=mail&mode=view*
// @include       http://ae1.tribalwars.ae/game.php?village=*&screen=mail&mode=new
// ==/UserScript==
function holeTextbausteine() {
 var anzahl = GM_getValue("TheJGH_Bausteinnachrichten_Anzahl", 0);
 var bausteine = new Array(anzahl);
 for (var i=0; i<anzahl; i++) {
  bausteine[i] = new Array(2);
  bausteine[i][0] = GM_getValue("TheJGH_Bausteinnachrichten_TitelBeiIndex_"  + i, "");
  bausteine[i][1] = GM_getValue("TheJGH_Bausteinnachrichten_InhaltBeiIndex_" + i, "");
 }
 return bausteine;
}

function speicherTextbaustein(bausteinname, bausteininhalt) {
 var index=GM_getValue("TheJGH_Bausteinnachrichten_Anzahl", 0);
 GM_setValue("TheJGH_Bausteinnachrichten_TitelBeiIndex_" +index, bausteinname  );
 GM_setValue("TheJGH_Bausteinnachrichten_InhaltBeiIndex_"+index, bausteininhalt);
 GM_setValue("TheJGH_Bausteinnachrichten_Anzahl", index+1);
}

function holeTextbausteinInhalt(index) {
 return diebausteinliste[index][1];
}

function benutzeTextbaustein(index) {
 document.getElementById("message").value = holeTextbausteinInhalt(index);
 document.forms[0].elements[5].click();
}

function bausteinliste() {
 var liste="<div id='bausteinliste'>";
 bausteine=holeTextbausteine();
 for (var i=0; i<bausteine.length; i++) {
  liste += "<a href='#' onclick='benutzeTextbaustein(" + i + ")'>" + bausteine[i][0] + "</a> ";
 }
 liste += "</div>";
 return liste;
}

function neuBaustein() {
 var stein = "<div><form><input id='neubausteintitel' name='neubausteintitel'><br><textarea id='neubausteintext' name='neubausteintext' cols='100' rows='10'>";
 stein    += "</textarea><br><button type='button' id='neubausteinanlegen'>حفض-www.plapl.com-</button></form></div>";
 document.getElementsByTagName("body")[0].innerHTML += stein;
 document.getElementById("neubausteinanlegen").addEventListener("click", GuiNeuBaustein, false);
}

function GuiNeuBaustein() {
 speicherTextbaustein(document.getElementById("neubausteintitel").value, document.getElementById("neubausteintext").value);
 document.location = document.location;
}

function schreibeListe() {
 document.getElementsByTagName("body")[0].innerHTML += bausteinliste();
}

function funktionenFuersWindow() {
 unsafeWindow.benutzeTextbaustein = benutzeTextbaustein;
 unsafeWindow.speicherTextbaustein = speicherTextbaustein;
}

function documentLoaded() {
 funktionenFuersWindow();
 schreibeListe();
 neuBaustein();
}

window.addEventListener("load", documentLoaded, false);
var diebausteinliste = holeTextbausteine();
//unsafeWindow.diebausteinliste = diebausteinliste;