// ==UserScript==
// @name       SW Banner
// @version    1.0
// @description  Changer la bannière de Share-World
// @match      http://*/*
// @copyright  2013, Xenocode
// ==/UserScript==

// Credit to DeNial.

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://share-world.fr/images/acenavy/logo.png")
{
images[x].src = "http://puu.sh/3tChe.png";
}
x=x+1;
}
