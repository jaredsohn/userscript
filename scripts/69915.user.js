// ==UserScript==
// @name                KASKUS 2009 Signature By anjeng
// @description         Pasang Signature Khusus junker2 sejati™ Untuk Mempromosikan SG, Penambahan Fitur Spoiler Link Ke DIrect Grup, Gambar Monyet + Direct Ke Grup Dapat Digunakan Di M.Kaskus.Us
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @include             http://m.kaskus.us/*
// @author              *JagoWand | Edited By Henry Trianta | Penambahan Fitur m.kaskus.us + Spoiler Link & Gambar Monyet Yang :gila: :ngakak
// ==/UserScript==

var signature = "[CENTER][img]http://i53.tinypic.com/x3dbur.jpg[/img]\n[URL=http://www.kaskus.us/showthread.php?t=6072316]:iloveindonesias ♥♥ PERSIRAJA ♥♥ Lantak Laju ► 2010 - 2011]:iloveindonesias[/URL][/CENTER]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)