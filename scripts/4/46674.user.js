// ==UserScript==
// @name           Fehlerhafte Spenden reloaden
// @namespace      Jonny_Be
// @description    Reloadet fehlerhafte Spenden
// @include        http://*pennergame.de/change_please/*
// ==/UserScript==

if(!document.getElementById("navigation")){
location.reload();
}