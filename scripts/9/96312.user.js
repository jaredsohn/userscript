// ==UserScript==
// @name           Koohii Kanji font changer
// @namespace      Drrobotnik 1.0
// @description    Changes the default big kanji on kanji.koohii.com to a stroke order font. 
//Install the kanji stroke order font from: http://sites.google.com/site/nihilistorguk/
// @include http://kanji.koohii.com/*
// ==/UserScript==

alert("hello world");
Event.observe(window, 'load', function() {
$('kanjibig').setStyle({fontFamily: 'KanjiStrokeOrders'});
});