// ==UserScript==
// @name       HF Logo Changer
// @version    1.0
// @description  This changes the HF NSFW Logo
// @match      http://*/*
// @copyright  2013, Connected
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.jpg")
{
images[x].src = "http://i.imgur.com/8KEW6UX.png";
}
x=x+1;
}
