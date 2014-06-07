// ==UserScript==
// @name          Uni Watermelon
// @include       http://unichan2.org*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://unichan2.org/css/logo.png")
{
images[x].src = "http://i.imgur.com/cI3fp.gif";
}
x=x+1;
}

(document.title = "unichan")

