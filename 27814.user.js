// ==UserScript==
// @name           Wer kennt wen? Autoreload
// @namespace      http://felix-kloft.invalid/werkenntwenautoreload
// @description    Lädt die "Wer kennt wen?"-Startseite automatisch neu, um automatisches Ausloggen zu verhindern
// @include        http://www.wer-kennt-wen.de/*start*
// ==/UserScript==


var interval = 1000*60*10; // 10 Minuten

window.gm_auto_reload = window.setTimeout("location.href='http://www.wer-kennt-wen.de/start';", interval);
