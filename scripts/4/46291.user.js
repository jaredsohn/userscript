// ==UserScript==
// @name           AIJ Scrolling Background
// @namespace      Aaron (I have no idea how to spell his last name)
// @description    Scrolls the background on AIJ
// @include        http://aaronin.jp/boards/*
// ==/UserScript==

var backgroundOffset = 0;
var bgObject = eval('document.body');
var ScrollTimer = window.setInterval(function() { 	backgroundOffset = backgroundOffset + 1; 	if (backgroundOffset > 511)   backgroundOffset = 0; 	bgObject.style.backgroundPosition = "0 " + backgroundOffset; },64); 