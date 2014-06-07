// ==UserScript==
// @name           RC code sender
// @description  send contest sms
// @include        http://*freesms8.in/quickSMS.aspx
// @include        http://*freesms8.in/QuickSent.aspx
// @include        http://*freesms8.in/*
// ==/UserScript==
var code;
if(document.location=="http://www.freesms8.in/quickSMS.aspx"||document.location=="http://www.freesms8.in/QuickSMS.aspx")
{
document.getElementById('ctl00_BodyPlaceHolder_MobileNumber').value=8826671122;

code='PLY A uaias '+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10)+Math.floor(Math.random()*10);

document.getElementById('ctl00_BodyPlaceHolder_SMSText').value=code;

void(0);
document.getElementById('ctl00_BodyPlaceHolder_SendImgBt').click();
}

if(document.location=="http://www.freesms8.in/QuickSent.aspx")
{
setTimeout('document.location="http://www.freesms8.in/quickSMS.aspx"',3000);
}