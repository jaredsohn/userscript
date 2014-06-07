// ==UserScript==
// @name           You Tube Logo
// @namespace      YTL
// @description    you tubes logo changes color depeding on the day of the week monday = red, tuesday = orange, ect.
// @include        http://www.youtube.com/*
// ==/UserScript==

var today = new Date();
var number = today.getDay();
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif")
{
images[x].src = "http://top-tutorial.webs.com/images/" + number + ".png";
}
x=x+1;
}