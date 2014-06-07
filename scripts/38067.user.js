// ==UserScript==
// @name           milday
// @description    milday
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author         milday
// ==/UserScript==

var signature = "[center][img]http://img88.imageshack.us/img88/1193/userbar698721qh1.gif[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature;
clearInterval (arunimid)
}
arunimid = setInterval (arunim,2000)
