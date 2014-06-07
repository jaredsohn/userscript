// ==UserScript==
// @name           Pennergame: The easy Werbeblocker
// @include        http://*pennergame.de/*
// ==/UserScript==

eraseCookie("adblock_alert");
createCookie('adblock_alert','True',(60*60*999999999999999999999999999999999999999999999999999999999999999999999999999999999999));
var keinwerbeblocker = true; // falls jemand Adblock nutzt, wird hiermit auch die Meldung, man solle es deaktivieren, ausgeschaltet.