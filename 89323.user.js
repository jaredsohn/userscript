// ==UserScript==
// @name           mafiosi garage waarde
// @namespace      mafiosi garage waarde
// @include        http://mafiosi.nl/garage.php
// @include        http://www.mafiosi.nl/garage.php
// ==/UserScript==

var totaal = "0";
var aantal = document.getElementsByTagName('table')[0].rows.length;
for(teller = 2; teller < aantal; teller++){
var waarde = document.getElementsByTagName('table')[0].getElementsByTagName('tr')[teller].getElementsByTagName('td')[4].textContent.substr(1,9);
var totaal = eval(totaal) + eval(waarde);
}


var div = document.createElement("div");
div.id = 'waarde';
var tekst = '<center>Totaalwaarde garage: ' + totaal + '</center>';
div.innerHTML = tekst;
var voor = document.getElementsByName('form1')[0];
voor.parentNode.insertBefore(div,voor);