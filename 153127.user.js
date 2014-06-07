// ==UserScript==
// @name       Google Background
// @description Lets you add a background image to Google, even after Google stopped supporting it on November 16, 2012.
// @version    2.0
// @include    http://www.google.com/
// @include    https://www.google.com/
// @include    https://www.google.com/webhp*
// ==/UserScript==
GM_addStyle('body {background-image: url("http://i.imgur.com/lB2j0U6.png")}');
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "https://www.google.com/images/srpr/logo11w.png")
{
images[x].src = "http://i.imgur.com/Tbu0yUH.jpg";
}
x=x+1;
}