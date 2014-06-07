// ==UserScript==
// @name           Preytech - Bob Signature Fixer
// @version			0.2
// @namespace      http://userscripts.org/users/490200
// @description    Fixes Bob's Preytech.com Signature
// @include        http://www.preytech.com/forum/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://25.media.tumblr.com/tumblr_lj3wvscEDc1qgwrego1_400.jpg")
{
images[x].src = "https://dl.dropbox.com/u/2149114/archive/permanent/bob.png";
}
x=x+1;
}

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://img202.imageshack.us/img202/3097/creepypigmane.gif")
{
images[x].src = "null";
}
x=x+1;
}

//bob is dumb