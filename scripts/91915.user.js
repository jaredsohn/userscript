// ==UserScript==
// @name         DS7.0 Menuaenderungen
// @namespace     http://userscripts.org/users/caeser99
// @description   Veraendert das obere Menue in die Staemme (ab Version 7.0)
// @include      http://*.die-staemme.de*
// @exclude     http://forum.die-staemme.de*

// ==/UserScript==

//Einstellungen

//true=entfernen    false=nicht entfernen

premium_entfernen="true";
footer_entfernen="true";
freunde_und_forenlink="true";

//Einstellungen Ende

if (premium_entfernen=="true")
{
var Premium_weg = document.getElementsByTagName("td")[11].firstChild;
verschwunden = document.getElementsByTagName("td")[11].removeChild(Premium_weg);
}

if(footer_entfernen=="true")
{
var footer_weg = document.getElementById("footer");
footer_weg.parentNode.removeChild(footer_weg);
}


if (freunde_und_forenlink=="true")
{
var newmenu = document.getElementById('menu_row').innerHTML+='<td><a href="/game.php?village=0000&screen=buddies">Freunde</a></td><td><a href="http://forum.die-staemme.de" target="_blank">Forum</a></td>';
}