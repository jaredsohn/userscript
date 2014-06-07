// ==UserScript==
// @name       LeakForums Logo Change
// @namespace  http://www.leakforums.org/member.php?action=profile&uid=27660
// @version    0.1
// @description  Changes the current LeakForums logo to your desired image.
// @match      http://*/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://netdna.leakforums.org/images/LeakForumsFour/lf.png")
{
images[x].src = "http://i.imgur.com/wNtiDRk.png";
}
x=x+1;
}