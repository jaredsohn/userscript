// ==UserScript==
// @name        Spooky Food Contest Player
// @namespace   Zachafer
// @description Plays the Spooky Food Contest Event.
// @include     *neopets.com/halloween/sfc/*
// @version     1
// ==/UserScript==

var wait = (Math.floor(Math.random() * 6) + 300) * 1000;
document.title = Math.round(wait / 1000);

var vote = Math.floor(Math.random() * 4) + 1;
location.href = 'javascript:vote(' + vote + ');';

setTimeout("window.location.reload();", wait);
setInterval('document.title--;', 1000);