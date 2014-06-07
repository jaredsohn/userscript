// ==UserScript==
// @name           Wer kennt wen? Autoreload
// @namespace      MetaIIica
// @description    Lädt die "Wer kennt wen?"-Startseite automatisch neu
// @include        http://www.wer-kennt-wen.de/start
// ==/UserScript==


(function()
{
    setTimeout("document.location.reload();", 120000);
})();