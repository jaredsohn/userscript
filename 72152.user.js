// ==UserScript==
// @name           Redirect weiterleitung überspringen hamburg berlin muenchen
// @namespace      Boggler pennerhack.foren-city.de pennerhack.de.tc
// @description    ueberspringt die scheiss weiterleitung auf profil in der motd un ueberall by Boggler
// @include        *pennergame.de/redirect/?site=*
// ==/UserScript==


var seite = document.location.href;
var link = seite.substr(seite.indexOf('site=')+5); 
document.location.href = link;
