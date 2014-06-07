// ==UserScript==
// @name           Diansyah	
// @description    Diansyah
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author         Diansyah
// ==/UserScript==

var signature = "[center][img]http://www4.indowebster.com/bfbced44a43cffe9b4e9c0e73ba14bda.jpg[/img][/center]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature;
clearInterval (arunimid)
}
arunimid = setInterval (arunim,2000)