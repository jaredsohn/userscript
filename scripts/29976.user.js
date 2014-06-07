// ==UserScript==
// @name         Add Ticker
// @namespace     AddTicker
// @description   Adds the facepunch ticker to the more menu.
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==
var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"/ticker.php\" style=\"\">Ticker</a> - Shows live forum activity"
moremenu.appendChild(menuadd);