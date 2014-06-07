// ==UserScript==
// @name        Temple Calendar
// @namespace   http://localhost
// @include     http://www.zeldauniverse.net/*
// @version     1
// ==/UserScript==


var images = document.getElementsByTagName ("img");
var t=0;
while(t<images.length)
{
if(images[t].src == "http://www.zeldauniverse.net/images/zutemple/misc/calendar_popup.png")
{
images[t].src = "http://www.zeldauniverse.net/forums/members/5354883-albums3659-picture32554.png";
}
t=t+1;
}