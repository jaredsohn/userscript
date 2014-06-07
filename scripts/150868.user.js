// ==UserScript==
// @name           Preytech - Bob Avatar Fixer
// @version			0.2
// @namespace      http://userscripts.org/users/490200
// @description    Fixes Bob's Preytech.com Signature
// @include        http://www.preytech.com/forum/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.preytech.com/forum/image.php?u=10&dateline=1282611724")
{
images[x].src = " https://dl.dropbox.com/u/2149114/NEW/images/12%20june/7.png";
}
x=x+1;
}