// ==UserScript==
// @name           DJanzok
// @description    DJanzok
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        DJanzok
// ==/UserScript==

var signature = "[img]http://img209.imageshack.us/img209/742/userbar696537jl9.gif[/img]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)