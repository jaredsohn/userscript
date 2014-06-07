// ==UserScript==
// @name          BUTTHERT
// @description   vk yoba pack
// @include       https://vk.com/*
// @run-at         document-start
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "https://vk.com/images/stickers/114/128.png")
{
images[x].src = "http://i.imgur.com/wJqZVJb.png";
}
x=x+1;
}