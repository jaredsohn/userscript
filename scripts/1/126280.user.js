// ==UserScript==
// @name   KilllerPandas Userbar Switcher
// @namespace  http://www.nextgenupdate.com/
// @description Replace Userbars with User defined ones
// @include  http://www.nextgenupdate.com/*
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.nextgenupdate.com/forums/images/premium-3.png")
{
images[x].src = "http://c8v.me/s/ugitq9.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/formerstaff-4.png")
{
images[x].src = "http://c8v.me/s/71xjkc.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/sectional-7.png")
{
images[x].src = "http://c8v.me/s/t5cchh.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/mod-1.png")
{
images[x].src = "http://c8v.me/s/47beja.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/vbookie-9.png")
{
images[x].src = "http://c8v.me/s/m2opie.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/admin-10.png")
{
images[x].src = "http://c8v.me/s/72gmto.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/super-8.png")
{
images[x].src = "http://c8v.me/s/hg6wai.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/reporter-6.png")
{
images[x].src = "http://c8v.me/s/nbt19g.png";
}
if(images[x].src == "http://www.nextgenupdate.com/forums/images/media-5.png")
{
images[x].src = "http://c8v.me/s/breiw2.png";
}
x=x+1;
}
