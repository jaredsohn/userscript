// ==UserScript==
// @name           Schuelervz: Versteckte User sehen by http://schuelervz-tricks.de.vu
// @namespace      http://schuelervz-tricks.de.vu
// @description    Markiert (in fremden Profilen) Gruppen, in denen man selbst auch Mitglied ist
// @include        http://www.schuelervz.net/profile.php*
// ==/UserScript==

eins = document.createElement("div");
eins.align = "center";
eins.appendChild( document.createTextNode("Diese Seite ist eigentlich nur fuer Freunde sichtbar!") );
document.getElementsByTagName('h2')[3].appendChild(eins);