// ==UserScript==
// @name           Rozsyłacz by Kamen96
// @namespace      Rozsyłacz by Kamen96
// @description    Rozsyłacz
// @author kamen96
// @include        http://poczta.o2.pl/
// @include        http://poczta.o2.pl/
// ==/UserScript==

$(document).ready(
function() {

$("#mainflash").remove();
$("#logo2").remove();
$("#wykres").remove();


$("#logo").html('<input type="submit" id="send" value="Rozsyłaj!"/>');

$("#send").click(