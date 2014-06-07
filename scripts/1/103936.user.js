// ==UserScript==
// @name                KASKUS Not Junker Sign
// @description         pasang Not Junker Sign
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              Not Junker
// ==/UserScript==

var format = "[img]";
var signature = "[RIGHT][quote][SIZE="1"][B]I'm Not a Junker
I do not like Junker
If I can
I will bann all Junker[/B][/SIZE][/quote][/RIGHT]";
var quote = document.getElementsByTagName("textarea").item(0).value;

function arunim () {
document.getElementsByTagName("textarea").item(0).value = quote + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)