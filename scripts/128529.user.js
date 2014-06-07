// ==UserScript==
// @name          Tested 2.0 Header
// @namespace     http://clarketk.com
// @description   header replacement script
// @include       http://www.tested.com/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://files.tested.com/static/site/img/logo/tested-header.png")
{
images[x].src = "http://i.imgur.com/Q7FHV.png";
}
x=x+1;
}