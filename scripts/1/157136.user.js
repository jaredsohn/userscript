// ==UserScript==
// @name       Userbar Changer
// @namespace  http://connected.tutorialex.com
// @version    1.0
// @description  This changes a selected userbar.
// @match      http://*/*
// @copyright  2013, Connected
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "original userbar url")
{
images[x].src = "new userbar url";
}
x=x+1;
}