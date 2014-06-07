// ==UserScript==
// @name       SG Banner
// @version    1.0
// @description  Changer la bannière de SG
// @match      http://*/*
// @copyright  2013, Xenocode
// ==/UserScript==

//credit to DeNial

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "https://dl.dropboxusercontent.com/u/48383906/bot/1.png")
{
images[x].src = "http://i.imgur.com/eUkZcyX.png";
}
x=x+1;
}
