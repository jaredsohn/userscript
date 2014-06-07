// ==UserScript==
// @name            Commander-Werbung entfernen v0.77c
// @namespace       ogame
// @description     Entfernt die Commander-Werbung in der Übersicht
// @include         http://uni*.ogame.*/game/index.php?page=overview&session=*
// ==UserScript==


var alles = document.getElementsByTagName('*');

document.getElementById('combox_container').style.visibility = 'hidden';

document.getElementById('combox_container').innerHTML = alles;