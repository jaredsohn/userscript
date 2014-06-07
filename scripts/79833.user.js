// ==UserScript==
// @name           reklamsız inci sözlük
// @description    inci sözlüğün sağ tarafında gösterilen reklamları kaldırır
// @include        http://inci.sozlukspot.com/w/*
// @include        http://ccc.incisozluk.cc/w/*
// @include        http://ccc.incisozluk.cc/ss_entry.php*
// @include        http://inci.sozlukspot.com/ss_entry.php*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        1.0
// ==/UserScript==
var genel = $("iframe");
var sag_kalinti = $("table#ucubekisim4");
sag_kalinti.remove();
genel.remove();
