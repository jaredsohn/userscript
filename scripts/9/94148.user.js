// ==UserScript==
// @name                KASKUS Signature Auto Paste
// @description         Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              mHc@DAL.net
// ==/UserScript==

var signature = "[RIGHT][Img]http://oi51.tinypic.com/29pozh2.jpg[/img][/RIGHT]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)
