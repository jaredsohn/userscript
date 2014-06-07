// ==UserScript==
// @name           GOnline Daily Chance Autoclicker
// @namespace      Gonline Daily Chance Autoclicker
// @description    This will automatically click Daily Chances that appear.
// @include        http://www.gonline.com/*
// @include        http://gonline.com/*
// ==/UserScript==



var tDailyChance = document.getElementById("dailyChance_clawMachine").href;
window.location = tDailyChance;