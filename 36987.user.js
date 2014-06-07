// ==UserScript==
// @name           Nyit-Nyit
// @description    Deskripsi script
// @include        http://www.nyit-nyit.net/*
// @include        http://nyit-nyit.net/*
// @author        nyit-nyit
// ==/UserScript==

var signature = "NO DAYAK INSIDE !!!";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature ; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,2000)
