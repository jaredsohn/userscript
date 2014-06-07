// ==UserScript==
// @name           The-West Envanter Boyutu
// @namespace      http://the-west.org/
// @description    Envanterinizdeki eşyaların simgelerini küçülterek, eşyaları daha hızlı bulmanızı sağlar.
// @author         Knight
// @translator     JohnCooper
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
*/


var TWSmallInventPics = document.createElement('script');
TWSmallInventPics.src = 'http://userscripts.org/scripts/source/85260.user.js';
TWSmallInventPics.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(TWSmallInventPics);
