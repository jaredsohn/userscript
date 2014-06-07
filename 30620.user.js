// ==UserScript==
// @name    heise-titlecleaner
// @namespace    heise
// @description    Entfernt "heise online - " aus dem Titel
// @include    http://www.heise.de/*/meldung/*
// ==/UserScript==
(function(){
document.title=document.title.replace(/^[^-]* - /gi, "");
})();