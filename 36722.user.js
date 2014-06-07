// ==UserScript==
// @name           Rhamonez
// @description    Rhamonez
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        Rhamonez
// ==/UserScript==

var signature = "[center][img]http://img220.imageshack.us/img220/6426/userbar691987ca4.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)