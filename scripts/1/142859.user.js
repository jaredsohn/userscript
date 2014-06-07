// ==UserScript==
// @name redirect
// @description redirect url
// @include https://google.com.au/*
// ==/UserScript==




var desiredImage    = "https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/buildings/Castle_lvl11_red_26.png?4568";

//--- Straight image swap:
$('img#hplogo').attr ('src', desiredImage);
