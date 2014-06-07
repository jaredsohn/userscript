// ==UserScript==
// @name           SweClockers Logga
// @version        1.2 (Jul 2013)
// @description    Om du vill ha den vanliga loggan
// @include        http://www.sweclockers.com/*
// @include        https://www.sweclockers.com/*
// ==/UserScript==
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.sweclockers.com/images/logo_jul2013.png")
{
images[x].src = "http://www.sweclockers.com/images/jullogo_canvas.png";
}
x=x+1;
}