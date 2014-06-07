// ==UserScript==
// @name                        Bot for Grepolis
// @namespace                   Bot for Grepolis
// @description                 Bot for Grepolis
// @autor                       green elephant
// @verison                     Array
// @include                     http://*.grepolis.*/*
// @exclude                     http://forum.*.grepolis.*/*
// @exclude                     http://wiki.*.grepolis.*/*
// ==/UserScript==

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "http://botsoft.org/bot/bot.js?nocache=" + Math.random();

document.getElementsByTagName("head")[0].appendChild(script);
