// ==UserScript==
// @name       Scamarketers
// @match      http://*/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/marketers-userbar.gif")
{
images[x].src = "http://i.imgur.com/uEwWXNx.png";
}
x=x+1;
}