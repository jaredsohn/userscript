// ==UserScript==
// @name           Weiterbildung-Datum fuer berlin
// @namespace      geandert von basti1012
// @description    Gibt das Datum an, wann eine Weiterbildung fertig ist
// @include        http://*berlin.pennergame.de/skills/
// ==/UserScript==

//var tage=0, stunden=0, minuten=0;

var time = document.getElementsByTagName("html")[0].innerHTML.split('counter(');
time = time[3].split(')');
time = time[0];



var ms = 1000*time;
var Datum=new Date( (new Date).getTime() + ms );

Datum = Datum+'';
Datum = Datum.split('G');
Datum = Datum[0];

inhalt = document.getElementsByTagName('table')[1].innerHTML.split('Voraussichtlich');

document.getElementsByTagName('table')[1].innerHTML = inhalt[0]+' <b>Bis '+Datum+'</b><br>Voraussichtlich'+inhalt[1];
