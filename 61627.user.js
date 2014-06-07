// ==UserScript==
// @name           Ducha
// @namespace      -
// @description    -
// @include        http://*mendigogame.es*
// ==/UserScript==
if(document.getElementById("pfandflaschen_kurs_ajax_style")){
if(document.getElementById("counter2")){
document.getElementById("counter2").style.position = "absolute";
document.getElementById("pfandflaschen_kurs_ajax_style").getElementsByTagName("a")[0].innerHTML = document.getElementById("pfandflaschen_kurs_ajax_style").getElementsByTagName("a")[0].innerHTML.replace(/Cent/g, "&nbsp;");
}
Pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[2].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/35);
document.getElementsByTagName("li")[6].innerHTML = document.getElementsByTagName("li")[6].innerHTML + "</form>&nbsp;<form style=\"display:inline;\" method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" name=\"id\" value=\"2\"><input id=\"Bier\" type=\"hidden\" value=\"0.35\" /><input type=\"hidden\" name=\"promille\" value=\"35\" /><input type=\"hidden\" name=\"id\" value=\"1\" /><input type=\"hidden\" id=\"lager_Bier\" value=\"987\" /><input id=\"menge_Bier\" type=\"hidden\" size=\"2\" name=\"menge\" value=\"" + Benoetigtbier + "\"/><input id=\"drink_Bier\" type=\"submit\" value=\"Beber(" + Benoetigtbier + ")\"/></form><form style=\"display:inline;\" method=\"post\" action=\"/city/washhouse/buy/\"><input type=\"hidden\" name=\"item\" value=\"Brot\"><input id=\"Brot\" type=\"hidden\" value=\"-0.35\" /><input type=\"hidden\" name=\"promille\" value=\"-35\" /><input type=\"hidden\" name=\"id\" value=\"2\" /><input type=\"hidden\" id=\"lager_Brot\" value=\"50\" /><input id=\"menge_Brot\" type=\"hidden\" size=\"2\" name=\"menge\" value=\"" + Benoetigtbrot + "\" /> <input id=\"drink_Brot\" type=\"submit\" value=\"Comer(" + Benoetigtbrot + ")\"/></form>";
}