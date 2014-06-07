// ==UserScript==
// @name         Hackforums Logic to admin
// @namespace     Logic to admin
// @description   Changes Logic's userbar to the one of admins.
// @include       *hackforums.net/*
// @version 	  1.0
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/logic.gif")
{
images[x].src = "http://cdn2.hackforums.net/images/blackreign/groupimages/english/admin.jpg";
}
x=x+1;
}
