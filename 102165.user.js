// ==UserScript==
// @name           Lays Maker
// @namespace      Lays Maker
// @description    layser
// @author haggard
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://lays.pl*
// @include        http://www.lays.pl*
// ==/UserScript==

$(document).ready(
function() {

$("#mainflash").remove();
$("#logo2").remove();
$("#wykres").remove();

$("#logo").html('<input type="submit" id="bid" value="Podbij o!"/>');


$("#bid").click(

function() {
bidit();
}
);

}
);

function bidit() {
$.ajax({
type: "GET",
url: "http://lays.pl/votes.xml",
dataType: "xml",
success: pxml
});
// cyfra po przecinku oznacza czas w MS miedzy kolejnym sprawdzeniem
setTimeout(bidit, 500);
}

function pxml(xml)
{
var vv = $(xml).find("glosy").text();
$("#logo").html(vv);

// ustalasz kiedy ma podbic(wiecej niz X glosow) bezpieczniej ustawic wiecej niz, bo przy == bysmy nie trafili bo sporo podbic wchodzi pod koniec
if(vv > '1022594'){
window.location.replace("http://lays.pl/glosuj/krewetki_po_tajsku");
}
}