// ==UserScript==
// @name           PW bez warstwy
// @description    Skrypt wyłącza warstwę dla PW pisanych z profilu
// @namespace      http://www.fotka.pl/profil/suchar
// @version        1.4
// @include        http://www.fotka.pl/profil/*
// @copyright      2014, suchar
// @author         suchar
// ==/UserScript==
var $ = unsafeWindow.$;
if (!unsafeWindow.myProfile){
    var wiadomosc = $('#profile-actions-list a[href*="wiadomosci"]');
    wiadomosc[0].removeAttribute("onclick");
}
