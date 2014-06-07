// ==UserScript==
// @name  SEXY
// @author  Connected
// @namespace  http://Connected.tutorialex.com
// @version    1.0
// @description  Noobs!
// @match  http://*/*
// @copyright  Copyright 2013, Connected
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/empire.gif")
{
images[x].src = "http://i.imgur.com/XomIE.png";
}
x=x+1;
}