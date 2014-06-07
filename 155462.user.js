// ==UserScript==
// @name          Cryptic's HF New Year to Regular
// @namespace     Cryptic
// @description   Changes the HF New Years Logo
// @include       http://hackforums.net/*
// @include       http://www.hackforums.net/*
// @version 	  1.1
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://cdn2.hackforums.net/images/blackreign/logo.newyear.jpg")
{
images[x].src = "http://cdn2.hackforums.net/images/blackreign/logo.jpg";
}
x=x+1;
}