// Changelog
// 18.12.08. - StudiVZ & MeinVZ wurden als Anwednungsgebiet hinzugefuegt
// 05.02.09. - Nach den Änderungen ist das Script wieder am laufen
// ==UserScript==
// @name          SchülerVZ & StudiVZ auto Refresh
// @description   Dieses Script aktuallisiert das VZ alle 10 Minuten. Also wirst du dann nicht automatisch ausgeloggt. Ausserdem besteht die Möglichkeit automatisch die Seite zu aktuallisieren!
// @include       http://www.schuelervz.net/*
// @include       http://www.studivz.net/*
// @include       http://www.meinvz.net/*
// @version		1.1
// ==/UserScript==
void(setInterval("document.location.reload()",1000000));
var logo  = document.getElementById('Logo');
logo.innerHTML = 'Seite aktuallisieren?     <a onclick="location.reload();">Ja.</a>'+logo.innerHTML;