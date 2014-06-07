// ==UserScript==
// @name           BYBS Ikariam Notifier
// @namespace      domz
// @description    A script which creates a popup message when one of the 4 advisors has something to say, it also moves you to the ikariam tab (if you are doing something else).
// @include        http://*.Ikariam.*/*
// @include        http://Ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

if (['advCities', 'advMilitary', 'advResearch', 'advDiplomacy'].some(function(e) {
    if (document.evaluate('.//a[@class="normalactive"]', document.getElementById(e), null, 8, null).singleNodeValue) return true;
})) alert('One of your Advisors has something to report to you!');