// ==UserScript==
// @name           Bier/Brot/Wasch Buttons erweitert von NewMan
// @namespace      Spendenring.com || http://ego-shooters.foren-city.de/
// @description    Fuegt Buttons hinzu, mit dem man den Alkoholpegel mit einem klick auf Null senken/moeglich nahe an 3% ran bringen kann wurde von NewMan um den Waschbutten der Waschanlage erweitert.
// @include        http://*pennergame.de*
// @exclude        http://highscore.pennergame.de/highscore/*
// ==/UserScript==
if(document.getElementById("pfandflaschen_kurs_ajax_style")){
Pos = document.getElementsByTagName("td")[4].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("td")[4].innerHTML.substr(Pos - 1, 4).replace(".", "");
document.getElementsByTagName("td")[13].parentNode.removeChild(document.getElementsByTagName("td")[13]);
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/35);
document.getElementsByTagName("td")[12].setAttribute('colspan', '2');
document.getElementsByTagName("td")[12].innerHTML = '</form><form action="/city/washhouse/buy/" method="post" style="display:inline;"><input type="hidden" name="id" value="2"/><input class="formbutton" type="submit" value="&euro;25" name="submitForm"/></form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Bier"><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="promille" value="35" /><input type="hidden" name="id" value="1" /><input type="hidden" id="lager_Bier" value="987" /><input id="menge_Bier" type="hidden" size="2" name="menge" value="' + Benoetigtbier + '"/><input id="drink_Bier" type="submit" value="Bier(' + Benoetigtbier + ')"/></form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Brot"><input id="Brot" type="hidden" value="-0.35" /><input type="hidden" name="promille" value="-35" /><input type="hidden" name="id" value="2" /><input type="hidden" id="lager_Brot" value="50" /><input id="menge_Brot" type="hidden" size="2" name="menge" value="' + Benoetigtbrot + '" /> <input id="drink_Brot" type="submit" value="Brot(' + Benoetigtbrot + ')"/></form>';
}