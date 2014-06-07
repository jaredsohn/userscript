// ==UserScript==
// @name           Tracker Automático
// @namespace      asasasasasas
// @version		   1.2.6
// @description    son todos patitos
// @include        http://www.erepublik.com/en/elections/country-*-election-*
// @exclude        http://www.erepublik.com/en/elections/country-*-election-party*
// ==/UserScript==
function calcularMinutos(minutos) {
  var a = minutos * 60;
  b = a * 1000;
  return b;
}
var x = calcularMinutos(15);
var cuerpo = document.getElementById('elections');
setTimeout("document.forms.cachoTracker.submit();", 30000);
setTimeout("window.location.reload();", x);