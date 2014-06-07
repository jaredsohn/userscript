// ==UserScript==
// @name           The West - Weiterleitung ohne Klick
// @namespace      The West
// @description    Dieses Script macht, das man ohne Klick auf die seite kommt, auf die ein anderer Mitspieler verlinkt hat.
// @include        http://www.the-west.de/index.php?page=redirect&url=*
// ==/UserScript==

// Weitergabe dieses (Kleinen) Scripten dürfen nur mit der Ausdrücklichen genehmigung des Autors weitergegeben werden.
// © MagierJack. Mail ingame an: maartenfricke (Welt 10)

document.location.href = document.links[24];

// Viel Spaß damit.
// Funktion:
// Es greift auf den 24. Link zu und leitet weiter.

