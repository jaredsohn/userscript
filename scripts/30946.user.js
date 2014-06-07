// ==UserScript==
// @name         OiFY Link
// @namespace     AddOIFY
// @description   Adds a OIFY link to the more menu.
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==
var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"/forumdisplay.php?f=56\" style=\"\">OiFY</a> - This is   the HOttEST place ON THE Web"
moremenu.appendChild(menuadd);
