// ==UserScript==
// @name           avare be gelişmiş gül butonu
// @description    avare be gelişmiş gül butonu
// @include        http://avare.be/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @version        2.0
// ==/UserScript==

function gul_amk(uzunluk, karakterler) {
    var sonuc = '';
    for (var i = uzunluk; i > 0; --i) sonuc += karakterler[Math.round(Math.random() * (karakterler.length - 1))];
    return sonuc;
}
var gul_sec = gul_amk(20, 'abcçdefgğhıijklmnoöprsştuüvwxyz');
var son_buton = $(".dash input.but:last");
var eski_gul_buton = $("input[value='heheuhehaheahueh']");
eski_gul_buton.remove();
son_buton.after('<input class="but" type="button" name="bkz" value="Random Gül" onclick="hen(\'aciklama\',\''+gul_sec+' =)\',\'\')" accesskey="s">');