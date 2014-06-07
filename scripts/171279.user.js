// ==UserScript==
// @name       LeakForums Reliance userbar change
// @namespace  http://www.leakforums.org/member.php?action=profile&uid=27660
// @version    0.1
// @description  Changes the current LeakForums Reliance userbar to your desired image.
// @match      http://*/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.leakforums.org/images/groupimages/english/Spectrum.png")
{
images[x].src = "http://i.imgur.com/OjEHOxK.png";
}
x=x+1;
}