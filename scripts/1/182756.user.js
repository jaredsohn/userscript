// ==UserScript==
// @name        WKW Statusbeitragumleitung
// @namespace   WKW Statusbeitragumleitung
// @description Wenn du einen Statusbeitrag kommentiert hast, leitet dich das Script auf die Seite zurück von der du gekommen bist. 
// @include     http://www.wer-kennt-wen.de/*
// @updateURL   http://userscripts.org/scripts/review/182756
// @version     1
// @grant       none
// ==/UserScript==

///
var wait = 0000; // Zeit in Millisekunden | 1000ms == 1 Sekunde
//

var url = document.URL;
var referrer = document.referrer;
function foo(){
    if (url.indexOf("activity/show/activity") >-1 ) {
        if (referrer.indexOf("person") >-1 || referrer.indexOf("river") >-1 || referrer == "http://www.wer-kennt-wen.de/" ) {
            window.location = referrer;
        }
    }
}
    setTimeout(function(){foo();}, wait);