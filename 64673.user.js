// ==UserScript==
// @name          Fussballcup Fanshop
// @namespace     24Shorty
// @description   Fuellt automatisch alle Bestellfenster mit der maximalen Anzahl
// @include       http://fussballcup.de/index.php?w=301&area=user&module=fanshop&action=purchase
// @exclude       
// ==/UserScript==

var ganzer_wert = document.getElementById('amount[1]').nextSibling.nextSibling.nextSibling.firstChild.data;
// das "(moegl. " und die schliessende runde Klammer wegschneiden
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
// den ausgelesenen Wert in das Formular-Feld einfuegen
document.getElementById('amount[1]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[2]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[2]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[3]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[3]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[4]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[4]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[5]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[5]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[6]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[6]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[8]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[8]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[9]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[9]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[11]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[11]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[12]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[12]').value = zahlenwert;

var ganzer_wert = document.getElementById('amount[19]').nextSibling.nextSibling.nextSibling.firstChild.data;
var zahlenwert = ganzer_wert.substring(8, ganzer_wert.length - 1);
document.getElementById('amount[19]').value = zahlenwert;

