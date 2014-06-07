// ==UserScript==
// @name        No Steam Link Filter
// @namespace   nada
// @include     https://steamcommunity.com/linkfilter/*
// @run-at      document-start
// @version     1
// @grant       none
// ==/UserScript==
window.location.href = window.location.href.substring(38);