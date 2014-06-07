// ==UserScript==
// @name           Hide Swagbucks Right Gutter
// @namespace      http://swagbucks.com/*
// @description    Hide Swagbucks right side column in search results
// @include        http://swagbucks.com/*
// ==/UserScript==

var d = document;
function hide(id) { var e = d.getElementById(id); if(e) e.style.display = "none"; }
hide("rightGutter");