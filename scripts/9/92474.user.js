// ==UserScript==
// @name                KASKUS Signature Auto Paste
// @description         Pasang signature di kaskus secara Otomatis TAnpa Membebani ServerKaskus
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              mHc@DAL.net
// ==/UserScript==

var signature = "[CENTER][spoiler=nanya dong gan][url="http://www.kaskus.us/showthread.php?p=327818745#post327818745"]Film Maker Association[/url] [/spoiler][/CENTER]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)