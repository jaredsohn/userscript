// ==UserScript==
// @name                KASKUS Signature Auto Paste
// @description         Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus Sendiri :D
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @include             http://livebeta.kaskus.us/*
// @author              JagoWand 
// ==/UserScript==

var signature = "Nice Info Om [IMG]http://a.deviantart.net/avatars/i/m/imbishieplz.png?1[/IMG] ";

var signature = "Nice Info Gan :D [IMG]http://a.deviantart.net/avatars/i/m/imbishieplz.png?1[/IMG] ";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)