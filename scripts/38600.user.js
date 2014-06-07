// Changelog
// 18.12.08. - StudiVZ & MeinVZ wurden als Anwendungsgebiet hinzugefuegt.
// 05.02.09. - Nach den Änderungen ist das Script wieder am laufen
// ==UserScript==
// @name          SchülerVZ & StudiVZ Auto-Logout
// @description   Das Script Loggt dich nach 20 Minuten automatisch aus.
// @include       http://www.schuelervz.net/*
// @include       http://www.studivz.net/*
// @include       http://www.meinvz.net/*
// @version		1.1
// ==/UserScript==
setTimeout("self.location.href='http://schuelervz.net/Logout'",2000000);