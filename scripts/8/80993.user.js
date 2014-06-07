// ==UserScript==
// @name           Gaia Online - Daily Chance Auto Clicker
// @namespace      Gaia Online - Daily Chance Auto Clicker
// @description    This will automatically click Daily Chances that appear.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// ==/UserScript==



var tDailyChance = document.getElementById("dailyChance_clawMachine").href;
window.location = tDailyChance;