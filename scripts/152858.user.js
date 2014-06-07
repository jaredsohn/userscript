// ==UserScript==
// @name           inci sözlük olan biten butonu kaldır
// @description    inci sözlüğün sağ tarafındaki olan biten butonunu kaldırır.
// @include        http://inci.sozlukspot.com/*
// @include        http://ccc.incisozluk.cc/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1.0
// ==/UserScript==
var olanbiten = $("td.sag_tablo_ic_yeni:contains('olan biten')");
var olanbiten2 = $("td.sag_tablo_ic:contains('olan biten')");

olanbiten.parent().remove();
olanbiten2.parent().remove();