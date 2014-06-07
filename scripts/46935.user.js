// ==UserScript==
// @name           Facebook Timelock
// @namespace      Aaron Russell
// @include        http://www.facebook.com/home.php
// ==/UserScript==

//Time is in hours counting from midnight
var start = "0";
var end = "8";
var message = "You're Too Drunk";
var redirect = "http://www.google.com";
var d=new Date();
var time=d.getHours();

if (start<=time && time<=end) 
{
alert(message);
window.location=redirect;
}