// ==UserScript==
// @name           Grepolis - Diplomatietool
// @namespace      Grepolis - Diplomatietool
// @description    Markiert bliebige Allianzen und Spieler mit einer frei wählbaren farbe auf der Karte auf der Karte
// @include        http://*.grepolis.*/game*
// ==/UserScript==


var newScript = document.createElement("script");
newScript.src = "http://www.grepotools.de/tonda/diplomacy/diplomacy.js";
newScript.id = "grepolis_tonda_scd";
newScript.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(newScript);