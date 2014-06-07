// ==UserScript==
// @name          Fussballcup Restaurant
// @namespace     24Shorty
// @description   Fuellt automatisch alle Bestellfenster mit der maximalen Anzahl
// @include       http://fussballcup.de/index.php?w=301&area=user&module=restaurant&action=purchase
// @exclude       
// ==/UserScript==

var ganzer_wert = document.getElementById('amount[13]').nextSibling.nextSibling.firstChild.data;
// das "(moegl. " und die schliessende runde Klammer wegschneiden
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
// den ausgelesenen Wert in das Formular-Feld einfuegen
document.getElementById('amount[13]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[14]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[14]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[15]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[15]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[16]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[16]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[17]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[17]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[18]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[18]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[21]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[21]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[22]').nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[22]').value = zahlenwert;