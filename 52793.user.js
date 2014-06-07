// ==UserScript==
// @name Größeres_Antwortfeld 
// @description Erweitert die Textara im Forum um 80 Zeilen.
// @author Frozen_byte
// @namespace none
// // @include       http://*.die-staemme.de/forum.php*
// ==/UserScript==

var Area = document.getElementById("message"); //Zugriff auf die Textarea
Area.rows = 160; //Zuweisen 160 kann beliebig geändert werden!
