// ==UserScript==
// @name		L2M Forum Logo Replacer
// @namespace		http://leprosorium.ru/
// @author		Morhine
// @include		f.l2m.ru/*
// @include		http://f.l2m.ru/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://f.l2m.ru/public/style_images/master/logo.png")
{
images[x].src = "http://monitor.zone-game.info/check.php?do=status&ip=85.17.229.2&port=7777&id=16";
}
x=x+1;
}