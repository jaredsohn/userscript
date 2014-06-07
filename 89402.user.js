// ==UserScript==
// @name           Mafiosi drank waarde
// @namespace      Mafiois Drank
// @include        http://www.mafiosi.nl/drank.php
// @include        http://mafiosi.nl/drank.php
// ==/UserScript==

function calc(){
var tabel = document.getElementsByTagName('table')[0];

var prijs1 = tabel.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank1 = document.getElementsByName('wijn')[0].value;
var drank1 = drank1 * prijs1;

var prijs2 = tabel.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank2 = document.getElementsByName('cognac')[0].value;
var drank2 = drank2 * prijs2;

var prijs3 = tabel.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank3 = document.getElementsByName('whisky')[0].value;
var drank3 = drank3 * prijs3;

var prijs4 = tabel.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank4 = document.getElementsByName('amaretto')[0].value;
var drank4 = drank4 * prijs4;

var prijs5 = tabel.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank5 = document.getElementsByName('bier')[0].value;
var drank5 = drank5 * prijs5;

var prijs6 = tabel.getElementsByTagName('tr')[7].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank6 = document.getElementsByName('port')[0].value;
var drank6 = drank6 * prijs6;

var prijs7 = tabel.getElementsByTagName('tr')[8].getElementsByTagName('td')[1].textContent.substr(1,6);
var drank7 = document.getElementsByName('rum')[0].value;
var drank7 = drank7 * prijs7;

var totaal = drank1 + drank2 + drank3 + drank4 + drank5 + drank6 + drank7;
var half = totaal / '2';

var div = document.getElementById('waarde')
div.innerHTML = 'Totaal waarde geselecteerde drank: ' + totaal + '<br />Indien Overval, buit per persoon: ' + half;
}

var div = document.createElement("div");
div.id = 'waarde';
var tekst = 'Totaal waarde geselecteerde drank: 0<br />Indien Overval, buit per persoon: 0';
div.innerHTML = tekst;
var submit = document.getElementsByName('submit')[0];
submit.parentNode.insertBefore(div,submit);

var soort1 = document.getElementsByName('wijn')[0];
soort1.addEventListener('change', calc, false);

var soort2 = document.getElementsByName('cognac')[0];
soort2.addEventListener('change', calc, false);

var soort3 = document.getElementsByName('whisky')[0];
soort3.addEventListener('change', calc, false);

var soort4 = document.getElementsByName('amaretto')[0];
soort4.addEventListener('change', calc, false);

var soort5 = document.getElementsByName('bier')[0];
soort5.addEventListener('change', calc, false);

var soort6 = document.getElementsByName('port')[0];
soort6.addEventListener('change', calc, false);

var soort7 = document.getElementsByName('rum')[0];
soort7.addEventListener('change', calc, false);