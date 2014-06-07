// ==UserScript==
// @name           Kapiland - Marktverkauf
// @namespace      http://www.morgil.de
// @description    Anzeige verschiedener Informationen beim Verkauf einer Ware über den Markt
// @include        http://*kapiland.de/main.php4?*page=lager2&*
// ==/UserScript==

function de2en(zahl) {
  zahl = strip_tags(zahl);
  var x_1 = /(\.)/g;
  zahl = zahl.replace(x_1, "");
  var x_2 = /(,)/g;
  zahl = zahl.replace(x_2, ".");
  return zahl;
}
function formatZahl(zahl) {//Gekürzt von http://javascript.jstruebig.de/javascript/37/
  var neu = '';
  var f = Math.pow(10, 2);
  zahl = '' + parseInt( zahl * f + (.5 * (zahl > 0 ? 1 : -1)) ) / f ;
  var idx = zahl.indexOf('.');
  if( idx == -1) idx = zahl.length;
  else neu = ',' + zahl.substr(idx + 1, 2);
  while(idx > 0) {
    if(idx - 3 > 0)
    neu = '.' + zahl.substring( idx - 3, idx) + neu;
    else
    neu = zahl.substring(0, idx) + neu;
    idx -= 3;
  }
  return neu;
}
function strip_tags(str) {
  var x_tag = /(\<.[^\>]*\>)/;
  str = str.replace(x_tag, "");
  return str;
}
if(document.getElementById("upsimtoolbar")) {
  var fpos = 1;
}
else {
  var fpos = 0;
}
var x_bar = /Bargeld: (.[0-9\.,]*)/;
var bar;
for(var a = 25; a < 28; a++) {
  var zelle = document.getElementsByTagName("td")[a];
  bar = zelle.innerHTML.match(x_bar);
  if(bar) break;
}
var bargeld = de2en(bar[1]);
var formular = document.getElementsByTagName("form")[fpos];
var x_preis = /\<b\>(.[0-9\.,]*)/gi;
var ergebnis = formular.innerHTML.match(x_preis);
if(ergebnis) {
var menge = de2en(ergebnis[0]);
var preis = de2en(ergebnis[1]);
var kosten = de2en(ergebnis[2]);
var gewinn = menge * preis - kosten;
var geldzwischen = bargeld - kosten;
var gelddanach = bargeld*1 + gewinn;
var x_einf = /(.*)\<br\>\<b\>(.*)/;
formular.innerHTML = formular.innerHTML.replace(x_einf, "$1<br>" +
  "Nach dem Angebot hast du noch <b>" + formatZahl(geldzwischen) + "¢</b> übrig.<br>" +
  "Durch den Verkauf hast du am Ende <b>" + formatZahl(gelddanach) + "¢</b>.<br><br><b>$2");
}