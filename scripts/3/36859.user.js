// ==UserScript==
// @name           Rhamonez
// @description    Rhamonez
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        Rhamonez
// ==/UserScript==

var signature = "[center][img]http://img126.imageshack.us/img126/3548/userbar693123ta0.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature;
clearInterval (arunimid)
}
arunimid = setInterval (arunim,2000)