// ==UserScript==
// @name         Log Out
// @namespace     AddLogOut
// @description   Adds a Log Out link to the more menu.
// @include       http://forums.facepunchstudios.com/*
// ==/UserScript==
var moremenu = document.getElementById("ListSpecialPages");
menuadd = document.createElement('p')
menuadd.innerHTML = "<a href=\"/login.php?do=logout\" style=\"\">Log Out</a> - It's The Fucking Log Out Button"
moremenu.appendChild(menuadd);
