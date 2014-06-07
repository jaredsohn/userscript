// ==UserScript==
// @name           Przyciski Piwo&Hamburger. basti1012 translation by Agent_0700
// @namespace      none
// @description    Upija odpowiednia ilosc piw lub zbija alkohol hamurgerami
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk/*
// @include        http://*mendigogame.es*
// @include        http://*berlin.pennergame.de/*
// @include        http://*pennergame.de/*
// @include        http://*clodogame.fr/*
// @exclude        http://*.menelgame.pl/highscore/*
// @exclude        http://*.dossergame.co.uk/highscore/*
// @exclude        http://*.mendigogame.es/highscore/*
// @exclude        http://*.highscore/berlin.pennergame.de/highscore/*
// @exclude        http://*.pennergame.de/highscore/*
// @exclude        http://*.clodogame.fr/highscore/*
// ==/UserScript==
if(document.getElementById("pfandflaschen_kurs_ajax_style")){
Pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
Alk = document.getElementsByTagName("li")[2].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 280 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/35);
Benoetigtwurst = Math.ceil(Alk/200);
document.getElementsByTagName("li")[6].innerHTML += '</form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Bier"><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="promille" value="35" /><input type="hidden" name="id" value="1" /><input type="hidden" id="lager_Bier" value="121" /><input id="menge_Bier" type="hidden" size="2" name="menge" value="' + Benoetigtwodka + '"/><input id="drink_Bier" type="submit" value="Piwo(' + Benoetigtwodka + ')"/></form><form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Hamburger"><input id="Hamburger" type="hidden" value="-2.00" /><input type="hidden" name="promille" value="-200" /><input type="hidden" name="id" value="4" /><input type="hidden" id="lager_Hamburger" value="20" /><input id="menge_Hamburger" type="hidden" size="2" name="menge" value="' + Benoetigtwurst + '" /><input id="drink_Hamburger" type="submit" value="Burger(' + Benoetigtwurst + ')"/></form>';
}
// Copyright By basti1012 and Agent_0700