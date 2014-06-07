// ==UserScript==
// @name          Antamar - Kurse ausblenden
// @namespace     http://avoeth.de/
// @description   Blendet alle Kurse mit dem Vermerk "du bist zu gut" und die "Sprechstunde der Lehrkräfte" aus und fügt einen Link ein, mit welchem sie wieder eingeblendet werden können
// @include       http://eisentrutz.antamar.eu/lernschule.php*
// @require       http://code.jquery.com/jquery-1.10.1.min.js
// @version       1.0
// ==/UserScript==

this.$ = this.jQuery = $.noConflict(true);

var link       = "<div style=\"position: relative;\"><a style=\"position: absolute; right  : 0px; bottom: 0px;\"id=\"toggleSwitch\">Kein Text</a></div>";
var toBeHidden = $("div.lernschule tr:contains('- du bist zu gut)')");
var sdl        = $("div.lernschule tr:contains('Sprechstunde der Lehrkräfte')");

function toggleThem() {
  toBeHidden.toggle();
  sdl.toggle();
  
  var text = "Zu einfache Kurse ausblenden";
  if(toBeHidden.is("tr:hidden")) {
    text = "Alle Kurse einblenden";
  }
  $("#toggleSwitch").text(text);
}

$("div.lernschule th:contains('Alle Kurse dieser Lehranstalt')").append(link);
$("#toggleSwitch").click(toggleThem);
toggleThem();