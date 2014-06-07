// ==UserScript==
// @name           DJanzok
// @description    DJanzok
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        DJanzok
// ==/UserScript==

var signature = "[center][img]http://img384.imageshack.us/img384/4199/userbar697491hp9.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)