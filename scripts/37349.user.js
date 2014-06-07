// ==UserScript==
// @name           Hiji	
// @description    Hiji
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        Hiji
// ==/UserScript==

var signature = ""[center][img]http://i219.photobucket.com/albums/cc202/Turnbelt/WindowVistaUser.png[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)
