// ==UserScript==
// @name                KASKUS 2009 Signature By henrytrianta
// @description         Pasang Signature Khusus Angkatan 2009™ Untuk Mempromosikan SG, Penambahan Fitur Spoiler Link Ke DIrect Grup, Gambar Monyet + Direct Ke Grup Dapat Digunakan Di M.Kaskus.Us
// @include             http://www.kaskus.us/*
// @include             http://kaskus.us/*
// @include             http://m.kaskus.us/*
// @author              *JagoWand | Edited By Henry Trianta | Penambahan Fitur m.kaskus.us + Spoiler Link & Gambar Monyet Yang :gila: :ngakak
// ==/UserScript==

var signature = "[RIGHT][URL=http://www.kaskus.us/group.php?groupid=4066][img]http://u.kaskus.us/1/cqlrv3tf.gif[/img][/URL]\n[URL=http://www.kaskus.us/group.php?groupid=4066][spoiler=Join Angkatan 2009™]:iloveindonesias VM/PM :iloveindonesias[/spoiler][/URL][/RIGHT]";

function arunim () {
document.getElementsByTagName("textarea").item(0).value = "\n\n\n\n\n" + signature; 
clearInterval (arunimid) 
}
arunimid = setInterval (arunim,0)