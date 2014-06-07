// ==UserScript==
// @name        BF4 Boat temp fix
// @namespace   http://userscripts.org/users/511121
// @include     http://battlelog.battlefield.com/bf4/*
// @version     1
// @grant       none
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://d34ymitoc1pg7m.cloudfront.net/bf4/soldier/small/ch_water-e678d306.png.png")
{
images[x].src = "http://d34ymitoc1pg7m.cloudfront.net/bf4/soldier/small/ch_water-e678d306.png";
}
x=x+1;
} 