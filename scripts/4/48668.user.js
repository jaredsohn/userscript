// ==UserScript==

// @name           Lose-Bot

// @namespace      by anonym

// @description    Kauft alle 500 Lose automatisch. Umgestellt auf Berlin

// @include        http://*pennergame.de/city/games/*

// ==/UserScript==



var divs = document.getElementsByTagName("div").length;

var menu = document.getElementsByTagName("div")[divs-4];

menu.innerHTML += "<ul><a href='http://berlin.pennergame.de/city/games/' target='blank'>Lose-Bot starten</a><a href='http://berlin.pennergame.de/city/games/lotto/' alt='Lotto' title='Lotto'>Lotto</a></ul>";




function Bot(){
if(window.location.href == "http://berlin.pennergame.de/city/games/"){
document.getElementById("menge1").value = "10";
document.getElementById("submitForm1").click();
};


if(window.location.href == "http://berlin.pennergame.de/city/games/buy/"){
window.location.href = "http://berlin.pennergame.de/city/games/";
};
}


window.setTimeout(Bot, 2000);

