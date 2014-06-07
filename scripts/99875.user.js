// ==UserScript==
// @name           MonkeyLiterate
// @namespace      http://etwasn.eu
// @description    Google Transliterate API for Greasemonkey
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

var head = document.getElementsByTagName('head')[0];
var monkey_script = document.createElement('script');
monkey_script.src = window.location.protocol+'//monkeyliterate.googlecode.com/files/monkey_en_zh.js';
head.appendChild(monkey_script);

