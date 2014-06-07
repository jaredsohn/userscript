// ==UserScript==
// @name        Stay Away
// @namespace   Guardian
// @include     http://*.ponychan.net/*
// @version     1
// ==/UserScript==
var tD = new Date();
var tZ = new Date(2012,7,10);
if (tZ>tD){document.innerHTML='';window.location.href='http://www.google.com'}