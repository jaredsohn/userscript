// ==UserScript==
// @name           TWSorteaza Inventarul
// @namespace      http://twknight.lima-city.de/
// @description    Acest script iti va orodna itemele pt. o mai buna organizare. Un script foarte util mai ales pentru cei cu inventarele mari, o sa va ajute foarte mult si veti avea o organizare mult mai buna a rucsacului, aveti 8 posibilitati de sortare a itemelor.
// @author         Knight
// @include        http://*.the-west.*/*
// @exclude        http://forum.the-west.*/*
// ==/UserScript==

/*
Copyright (c) by Knight
Das Copyright dieses Scripts liegt beim Autor(Knight).
Veraenderung oder eigene Veroeffentlichung dieses Scripts erfordert eine Genehmigung 
des Autors(Knight). Weiterhin garantiert der Autor nach Veraenderung nicht mehr 
die Funktionstuechtigkeit und haftet nicht fuer eventuell aufkommende Schaeden.
Fragen oder Fehler koennen im TheWest Forum beim Autor(Knight) gemeldet werden.
Zum Schreiben von Nachrichten im TheWest Forum ist eine Registrierung notwendig!
Forum: http:/forum.the-west.de/
Translation made by the PWG
*/

var TWSortInvent = document.createElement('script');
TWSortInvent.src = 'http://filme-tst.hi2.ro/sort_invent.js';
TWSortInvent.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSortInvent);