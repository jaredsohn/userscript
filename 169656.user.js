// ==UserScript==
// @name        HS-Anhalt-Mail-Login-Merker
// @namespace   mail.wi.hs-anhalt.de
// @description Ergänzt die Seite um die Möglichkeit Passwörter abzuspeichern
// @include     https://mail.wi.hs-anhalt.de/gw/*
// @include     https://www.hs-anhalt.de/moodle/*
// @version     1.3
// ==/UserScript==

////////////////////////////////////////////////////////


document.getElementById("username").autocomplete = 'on';
document.getElementById("password").autocomplete = 'on';
document.getElementById("login").autocomplete = 'on';