// ==UserScript==
// @name        Backpack.tf - remove ads
// @namespace   http://userscripts.org/users/376429
// @description Remove ads from backpack.tf
// @include     http://backpack.tf/*
// @version     0.06
// @grant       none
// ==/UserScript==

$('div[id=supmanx]').remove();
$('div[id=supmanx2]').remove();

if (document.URL === 'http://backpack.tf/') {
    $('.col-xs-7').width("100%");
    var myList = document.getElementsByClassName("col-xs-5");
    myList[0].remove();
}