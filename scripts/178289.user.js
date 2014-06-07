// ==UserScript==
// @name       LeakForums Logo - Updated to change with color
// @namespace  Fuck Vanilla
// @version    1.0
// @description  Replaces current logo, with one that changes with color. 
// @include         *leakforums.org/*
// ==/UserScript==


var images = document.getElementsByTagName ("img");
var x=0;

while(x<images.length)
{
if(images[x].src == "http://x.leakforums.org/images/leakforums/logo.png")
{
images[x].src = "http://i.imgur.com/b1JHo5R.png";
}
x=x+1;
}

//This is ripped, not sure from where. Vanilla did the ripping, but credits to whomever created this. #YOLO