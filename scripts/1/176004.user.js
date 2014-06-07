// ==UserScript==
// @name       HF Logo Changer
// @version    1.0
// @description  This changes the HF logo to say Skid Forums
// @match      http://*/*
// @copyright  Orange
// @icon           http://x.hackforums.net/uploads/awards/toilet-paper_24.png
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://x.hackforums.net/images/blackreign/logo.jpg")
{
images[x].src = "http://images.cooltext.com/3290573.png";
}
x=x+1;
}