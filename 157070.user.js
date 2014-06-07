// ==UserScript==
// @name  Noob Admins
// @author  Connected
// @namespace  http://connected.tutorialex.com
// @version    1.0
// @description  Admins are noobs.
// @match  http://*/*
// @copyright  Copyright 2013, Connected
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/admin.jpg")
{
images[x].src = "http://i.imgur.com/AZJXQxb.png";
}
x=x+1;
}