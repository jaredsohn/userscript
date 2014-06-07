// ==UserScript==
// @name           Random Colored Websites
// @description    BECAUSE I CAN.
// @namespace      TurtleHax
// @include        http://*
// @include        https://*
// ==/UserScript==

function randColor() {
return "#"+Math.floor(Math.random()*16777215).toString(16);
}
var Elements = document.getElementsByTagName('*');

for(var i = 0; i < Elements.length; i++)
{
	Elements[i].style.color = randColor();
	Elements[i].style.backgroundColor = randColor();
}