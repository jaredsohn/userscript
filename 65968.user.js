// ==UserScript==
// @name           WDK Abonnementer
// @namespace      warez-dk
// @description    Tilføjer "Abonnementer" til top-menuen
// @include        http://warez-dk.org/*
// ==/UserScript==

var menu = document.getElementById('navtabs');
var href = window.location.href;


var liTag = document.createElement("li");

liTag.id = "abonnementer";


liTag.innerHTML = '<a class="navtab" href="subscription.php">Abonnementer</a>';

menu.appendChild(liTag);


if (href == "http://warez-dk.org/subscription.php")
{
	menu.childNodes[3].className = "";
	liTag.className = "selected";
	var append = menu.childNodes[3].childNodes[2];
	liTag.appendChild(append);
}