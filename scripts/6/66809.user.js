// ==UserScript==
// @name           pwnage.js
// @namespace      lol
// @description    lol
// @include        http://www.conquerclub.com/*
// ==/UserScript==

var log = document.getElementById('log')
var div = document.createElement('div');
div.id = "bla";
div.innerHTML = "<h3>BOOYAKAZAMMM!!!! YOU GOT KP'ED BITCH!!!<h3>";
log.parentNode.insertBefore(div, document.getElementById('dashboard').previousSibling)