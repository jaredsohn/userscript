

// Silmek icin  Tools/Manage User Scripts,
// "Hocam Internal Server Error Killer"i secin,
// Uninstall'a tiklayin
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hocam Internal Server Error Killer
// @namespace     http://www.hocam.com
// @description   Internal Server Error verirse otomatik sayfa yeniler
// @include       http://www.hocam.com/*
// ==/UserScript==

var icerik = document.body.innerHTML;
var hata = "Internal Server Error";
var i = icerik.indexOf(hata, 0);
if (i != (-1) && icerik.length < 1000) {
   // alert(i);
    location.reload(true);
}