// ==UserScript==
// @name           flaschen timer datum + werbung geblockt
// @namespace      pennergame-basti1012.foren-city.de    by basti1012
// @description    Gibt das Datum an,wenn der penner fertig mit sammeln anzeige blockt werbung 
// @include        http://*pennergame.de/activities*
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

inhalt = document.getElementsByTagName('table')[1];
document.getElementsByTagName('table')[2].innerHTML = 'Ende des Flaschensammelns an '+Datum+'';
//copiright by basti1012