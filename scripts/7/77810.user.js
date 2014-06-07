// ==UserScript==
// @name           Sprite code sender
// @namespace     Amarff
// @description  send contest sms
// @include        http://*freesms8.in/quickSMS.aspx
// @include        http://*freesms8.in/QuickSent.aspx
// @include        http://*freesms8.in/*
// ==/UserScript==
var code;
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=9999098122;

var a=Math.floor(Math.random()*7);
if(a==0)
code='A12';
if(a==1)
code='C12';
if(a==2)
code='H12';
if(a==3)
code='L12';
if(a==4)
code='N12';
if(a==5)
code='P12';
if(a==6)
code='K12';

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='hi hello, am i disturbing u??;-) ';



void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.in/quickSMS.aspx"',5000);
}