// ==UserScript==
// @name        DSO-Karten Rechtsklick
// @namespace   elbea64
// @description Entfernt die kindische Rechtsklickbeschränkung
// @include     http://dso-karten.de/*
// @version     1
// @grant       none
// ==/UserScript==
document.onmousedown = null;
document.oncontextmenu = null;
