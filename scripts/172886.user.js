// ==UserScript==
// @name        Kicktipp
// @namespace   kicker
// @include     http*://www.kicktipp.de/*/tippabgabe*
// @require     //ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     2
// @author		knoe
// @description	Fügt folgende Funktionen zur kicktipp.de Seiten:
//				Keypress: g (Gastmanschaften: alle Spiele auf 1:2)
//				Keypress: h (Heimmanschaften: alle Spiele auf 2:1)
//				Keypress: z (Zero: Alle Spiele auf 0:0)
//				Keypress: r (reset)
// @grant       none
// ==/UserScript==
$(document).keyup(function(e){if(e.which==67)$("input[type=tel]").val("");else if(e.which==90){$("input[type=tel]").val("0");$('input[name=submitbutton]').click()}else if(e.which==71){$("input[type=tel]:odd").val("2");$("input[type=tel]:even").val("1");$('input[name=submitbutton]').click()}else if(e.which==72){$("input[type=tel]:odd").val("1");$("input[type=tel]:even").val("2");$('input[name=submitbutton]').click()}});$("#tippspieltagIndex").change(function(e){$("#tippabgabeSpieltagauswahl").submit()});$(function(){$("input[value=anzeigen]").hide();$("#kicktipp-content h2").append(" mit knoes Supportskript");$("#kicktipp-content div.floatclear").prepend("<ul><li>Drücke <strong>h</strong> um alle Tipps auf 2:1 für die Heimmannschaft zu setzen</li><li>Drücke <strong>g</strong> um alle Tipps auf 1:2 für die Gastmannschaft zu setzen</li><li>Drücke <strong>z</strong> um alle Tipps auf 0:0 zu setzen</li><li>Drücke <strong>c</strong> um alle Tipps zu leeren</li></ul>")});
