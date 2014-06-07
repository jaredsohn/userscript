// ==UserScript==
// @name       Fix EDT Miage UPO
// @namespace  https://miage.u-paris10.fr/
// @version    0.1
// @description  Corrige le bug d'affichage du menu sur les navigateurs modernes
// @include       https://miage.u-paris10.fr/EDT/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==
$('div[id="menu2"]').remove();
$('div[id="sousmenu1"]').attr("style","visibility:visible;");