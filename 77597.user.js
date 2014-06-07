// ==UserScript==
// @name           Sprite code sender
// @namespace     Amarff
// @description  send contest sms
// @include        http://*freesms8.com/quickSMS.aspx
// @include        http://*freesms8.com/QuickSent.aspx
// @include        http://*freesms8.com/*
// ==/UserScript==
var code;
if(document.location=="http://www.freesms8.com/quickSMS.aspx"||document.location=="http://www.freesms8.com/QuickSMS.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=9468102051;

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

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value='TU PURA RECHARGE KARNA AYE K NAHIN ?,HOR KINNE DIN DIMAG KHAYENGA'+code+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);



void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendButton').click();
}

if(document.location=="http://www.freesms8.com/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.com/quickSMS.aspx"',100);
}
