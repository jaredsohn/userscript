// ==UserScript==
// @name           zeit.de printerredirect
// @namespace
// @description    redirect pages on zeit.de to the print version
// @include        http://www.zeit.de/online/*
// ==/UserScript==

(function() {
    window.location.href = window.location.href.replace(/www\.zeit\.de/g, 'zeus.zeit.de/text');
})();

