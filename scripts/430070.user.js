// ==UserScript==
// @name        Blokace diskuse na novinky.cz
// @namespace   kupcza
// @include     http://*.novinky.cz/*
// @version     1
// @grant       none
// ==/UserScript==
var c = document.getElementById('discussionEntry');
c.style.display = 'none';
