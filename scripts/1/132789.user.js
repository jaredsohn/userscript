// ==UserScript==
// @name Blizzard Diablo III Tooltips for Gaming Stack Exchange
// @namespace http://gaming.stackexchange.com/
// @version 1.0
// @description Adds D3 tooltip link support
// @match http://gaming.stackexchange.com/*
// @copyright 2012, public domain
// ==/UserScript==
var head = document.getElementsByTagName("head")[0]; 
var nScript = document.createElement('script');
nScript.type = 'text/javascript';
nScript.src = 'http://us.battle.net/d3/static/js/tooltips.js';
head.appendChild(nScript);
