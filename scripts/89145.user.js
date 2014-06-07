// ==UserScript==
// @name           mafiosi drugs waarde
// @namespace      mafisoi drugs waarde
// @include        http://mafiosi.nl/drugs.php
// @include        http://www.mafiosi.nl/drugs.php
// ==/UserScript==

function calc(){
var tabel = document.getElementsByTagName('table')[0];


var prijs1 = tabel.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs1 = document.getElementsByName('opium')[0].value;
var drugs1 = drugs1 * prijs1;

var prijs2 = tabel.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs2 = document.getElementsByName('heroine')[0].value;
var drugs2 = drugs2 * prijs2;

var prijs3 = tabel.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs3 = document.getElementsByName('marihuana')[0].value;
var drugs3 = drugs3 * prijs3;

var prijs4 = tabel.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs4 = document.getElementsByName('cocaine')[0].value;
var drugs4 = drugs4 * prijs4;

var prijs5 = tabel.getElementsByTagName('tr')[6].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs5 = document.getElementsByName('paddo')[0].value;
var drugs5 = drugs5 * prijs5;

var prijs6 = tabel.getElementsByTagName('tr')[7].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs6 = document.getElementsByName('morfine')[0].value;
var drugs6 = drugs6 * prijs6;

var prijs7 = tabel.getElementsByTagName('tr')[8].getElementsByTagName('td')[1].textContent.substr(1,6);
var drugs7 = document.getElementsByName('lijm')[0].value;
var drugs7 = drugs7 * prijs7;

var totaal = drugs1 + drugs2 + drugs3 + drugs4 + drugs5 + drugs6 + drugs7;
var half = totaal / '2';

var div = document.getElementById('waarde')
div.innerHTML = 'Totaal waarde geselecteerde drugs: ' + totaal + '<br />Indien Overval, buit per persoon: ' + half;
}

var div = document.createElement("div");
div.id = 'waarde';
var tekst = 'Totaal waarde geselecteerde drugs: 0<br />Indien Overval, buit per persoon: 0';
div.innerHTML = tekst;
var submit = document.getElementsByName('submit')[0];
submit.parentNode.insertBefore(div,submit);

var soort1 = document.getElementsByName('opium')[0];
soort1.addEventListener('change', calc, false);

var soort2 = document.getElementsByName('heroine')[0];
soort2.addEventListener('change', calc, false);

var soort3 = document.getElementsByName('marihuana')[0];
soort3.addEventListener('change', calc, false);

var soort4 = document.getElementsByName('cocaine')[0];
soort4.addEventListener('change', calc, false);

var soort5 = document.getElementsByName('paddo')[0];
soort5.addEventListener('change', calc, false);

var soort6 = document.getElementsByName('morfine')[0];
soort6.addEventListener('change', calc, false);

var soort7 = document.getElementsByName('lijm')[0];
soort7.addEventListener('change', calc, false);