// ==UserScript==
// @name           Stefanus
// @description    Stefanus
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        Stefanus
// ==/UserScript==

var signature = "[center][img]http://img360.imageshack.us/img360/5301/nokiauserol5.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature;
clearInterval (arunimid)
}
arunimid = setInterval (arunim,2000)