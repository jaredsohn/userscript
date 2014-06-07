// ==UserScript==
// @name                KASKUS Signature semutcorp
// @description         pasang signature semutcorp
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              editan kok 
// ==/UserScript==

var format = "[img]";
var signature = "[RIGHT][SIZE="1"][B][COLOR="Red"]Ant[/COLOR]Republique™[/B][/SIZE][/RIGHT]";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)