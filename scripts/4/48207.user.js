// ==UserScript==
// @name           Zdrapka-Bot
// @namespace      by anonym. Tlumaczenie by PaWmArCc
// @description    Kupuje automatycznie 500 zdrapek
// @include        http://*menelgame.pl/city/games/*
// ==/UserScript==


var divs = document.getElementsByTagName("div").length;
var menu = document.getElementsByTagName("div")[divs-4];
menu.innerHTML += "<ul><a href='http://www.menelgame.pl/city/games/' target='blank'>Zdrapka-Bot start</a><a href='http://www.menelgame.pl/city/games/lotto/' alt='Lotto' title='Lotto'>Lotto</a></ul>";



function Bot(){
if(window.location.href == "http://www.menelgame.pl/city/games/"){
document.getElementById("menge1").value = "10";
document.getElementById("submitForm1").click();
};

if(window.location.href == "http://www.menelgame.pl/city/games/buy/"){
window.location.href = "http://www.menelgame.pl/city/games/";
};
}

window.setTimeout(Bot, 2000);

