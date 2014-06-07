// ==UserScript==
// @name       LeakForums Logo
// @namespace  Vanilla
// @version    1.0
// @description  Logo Changer
// @include         *leakforums.org/*
// ==/UserScript==


var images = document.getElementsByTagName ("img");
var x=0;

while(x<images.length)
{
if(images[x].src == "http://x.leakforums.org/images/leakforums/logo.png")
{
images[x].src = "http://i.imgur.com/zAypCOd.png";
}
x=x+1;
}
