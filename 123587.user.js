// ==UserScript==
// @name         LT Removal
// @namespace    http://forum.blockland.us/
// @version      0.3
// @description  Ignore Lord Tony's posts.
// @include      http://forum.blockland.us/index.php?topic=*
// @copyright    2012+, Kingdaro (modded by Iban)
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].class == "avatar")
{
images[x].src = "http://forum.blockland.us/index.php?action=dlattach;attach=164662;type=avatar";
}
x=x+1;
}