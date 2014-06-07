// ==UserScript==
// @name           Pfandalarm by Pennertools.com
// @namespace      Pennertools.com
// @include        http://*pennergame.de/*
// ==/UserScript==


var my_kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML;

if(my_kurs > 16){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid #FFFF00";
}

if(my_kurs > 17){
document.getElementById("pfandflaschen_kurs_ajax_style").style.border = "2px solid #FF0000";
}

if(my_kurs > 18){
alert('Achtung! Der Pfandkurs steht bei '+my_kurs+' Cent!');
}
