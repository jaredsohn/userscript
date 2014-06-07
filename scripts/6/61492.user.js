// ==UserScript==
// @name                KASKUS Auto Siggy
// @description         Pasang signature di kaskus secara otomatis tanpa perlu copy-paste gan :D By katim (UserID=555871)
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @author              Katim
// ==/UserScript==

var signature = "TARUH KODE SIGNATURE AGAN DISINI";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)