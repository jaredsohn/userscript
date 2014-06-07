// ==UserScript==
// @name           Buadahe
// @description    This Is Mine
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        Buadahe
// ==/UserScript==

var signature = "[center][img]http://img65.imageshack.us/img65/5418/userbar692060sc8.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)
