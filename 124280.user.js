// ==UserScript==
// @name           X3F.Dark.Filter
// @namespace      http://www.xbox360forum.com
// @description    X3f filter management
// @include        *
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == http://images1.ientrymail.com/xbox360/v4/body-bg-dark-2011.jpg)
{
images[x].src = http://i42.tinypic.com/4h9x8x.jpg;
}
x=x+1;
}